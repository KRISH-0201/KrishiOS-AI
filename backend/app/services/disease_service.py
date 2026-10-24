"""
KrishiOS AI — Plant Disease Diagnostic Service
=============================================
Integrates the trained MobileNetV3-Large 10-Class Tomato disease classification model
trained on the PlantVillage dataset.

Architectural & Scientific Principles:
1. The trained PyTorch model is loaded once at application startup into memory/device.
2. Inference preprocessing matches training preprocessing exactly:
   Resize(256), CenterCrop(224), ToTensor, ImageNet Normalize(mean, std).
3. Class mapping and model configuration are read dynamically from Kaggle artifact files.
4. If model artifacts are missing or unreadable, the service fails fast with an explicit
   HTTP 503 error; it NEVER silently returns hardcoded fake disease predictions.
5. Disease classification is performed via real deep learning inference.
   Severity and progression are explicitly marked as experimental heuristics until
   validated lesion segmentation and multi-temporal progression models are integrated.
"""

import io
import json
import logging
from pathlib import Path
from typing import Dict, Any, Optional, List

import numpy as np
from PIL import Image, UnidentifiedImageError
from fastapi import HTTPException

import torch
import torch.nn as nn
from torchvision import transforms, models

logger = logging.getLogger("krishios.disease_service")


class DiseaseService:
    def __init__(self):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = None
        self.model_dir: Optional[Path] = None
        self.weights_path: Optional[Path] = None
        self.config_path: Optional[Path] = None
        self.mapping_path: Optional[Path] = None
        
        self.idx_to_class: Dict[int, str] = {}
        self.clean_names: Dict[str, str] = {}
        self.model_config: Dict[str, Any] = {}
        self.transform = None
        self.is_ready: bool = False
        self.load_error: Optional[str] = None

        self._init_model()

    def _find_artifacts_dir(self) -> Optional[Path]:
        """Locates the directory containing the PlantVillage model artifacts."""
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        candidates = [
            base_dir / "models" / "plantvillage",
            base_dir / "models",
            base_dir / "backend" / "models" / "plantvillage",
            base_dir / "backend" / "models",
            Path("models/plantvillage"),
            Path("models")
        ]
        for candidate in candidates:
            if candidate.exists() and (candidate / "best_model.pth").exists() and (candidate / "class_mapping.json").exists():
                return candidate.resolve()
        return None

    def _init_model(self):
        """Loads model weights, configuration, and preprocessing transform once at startup."""
        self.model_dir = self._find_artifacts_dir()
        
        if self.model_dir is None:
            self.load_error = "Model artifacts directory not found. Expected best_model.pth and class_mapping.json in models/plantvillage/ or models/."
            logger.error(f"[DiseaseService] {self.load_error}")
            self.is_ready = False
            self.model = None
            return

        self.weights_path = self.model_dir / "best_model.pth"
        self.mapping_path = self.model_dir / "class_mapping.json"
        self.config_path = self.model_dir / "model_config.json"

        try:
            # 1. Read class_mapping.json (Do not assume indexes)
            with open(self.mapping_path, "r", encoding="utf-8") as f:
                mapping_data = json.load(f)
                self.idx_to_class = {int(k): v for k, v in mapping_data["idx_to_class"].items()}
                self.clean_names = mapping_data.get("clean_class_names", {})

            num_classes = len(self.idx_to_class)
            if num_classes == 0:
                raise ValueError("class_mapping.json contains 0 classes.")

            # 2. Read model_config.json (Do not assume normalization constants)
            if self.config_path.exists():
                with open(self.config_path, "r", encoding="utf-8") as f:
                    self.model_config = json.load(f)
            else:
                self.model_config = {}

            input_size = tuple(self.model_config.get("input_size", [224, 224]))
            mean = self.model_config.get("mean", [0.485, 0.456, 0.406])
            std = self.model_config.get("std", [0.229, 0.224, 0.225])

            # 3. Setup exact inference preprocessing transform matching training
            self.transform = transforms.Compose([
                transforms.Resize((256, 256)),
                transforms.CenterCrop(input_size),
                transforms.ToTensor(),
                transforms.Normalize(mean=mean, std=std)
            ])

            # 4. Construct MobileNetV3-Large architecture dynamically
            net = models.mobilenet_v3_large(weights=None)
            in_features = net.classifier[3].in_features
            net.classifier[3] = nn.Linear(in_features, num_classes)

            # 5. Load trained weights state_dict
            state = torch.load(str(self.weights_path), map_location=self.device)
            net.load_state_dict(state)
            net.to(self.device)
            net.eval()

            self.model = net
            self.is_ready = True
            self.load_error = None
            logger.info(f"[DiseaseService] Successfully loaded MobileNetV3-Large ({num_classes} classes) from {self.weights_path} on {self.device}")
            print(f"[OK] [DiseaseService] PlantVillage Tomato model loaded ({num_classes} classes) from: {self.weights_path}")

        except Exception as e:
            self.load_error = f"Failed to initialize model: {str(e)}"
            logger.exception(f"[DiseaseService] {self.load_error}")
            print(f"[ERROR] [DiseaseService] {self.load_error}")
            self.is_ready = False
            self.model = None

    def get_models_status(self) -> Dict[str, Any]:
        """Returns the operational status and metadata of active models."""
        return {
            "tomato_classifier_available": self.is_ready,
            "tomato_classifier_path": str(self.weights_path) if self.weights_path else None,
            "architecture": self.model_config.get("model_name", "MobileNetV3-Large"),
            "num_classes": len(self.idx_to_class),
            "dataset": self.model_config.get("dataset", "PlantVillage"),
            "classes": list(self.idx_to_class.values()),
            "unetpp_available": False,
            "unetpp_path": None,
            "yolo_progression_available": False,
            "yolo_progression_path": None,
            "eggplant_classifier_available": False,
            "eggplant_classifier_path": None
        }

    async def predict(self, image_bytes: bytes, crop_type: str = "tomato") -> Dict[str, Any]:
        """
        Runs neural inference on the uploaded leaf image.
        Never silently falls back to hardcoded predictions.
        """
        # 1. Fail fast if model is not loaded
        if not self.is_ready or self.model is None:
            detail_msg = f"Disease classification model is offline: {self.load_error or 'Weights not loaded.'}"
            logger.error(detail_msg)
            raise HTTPException(status_code=503, detail=detail_msg)

        # 2. Validate crop support
        norm_crop = crop_type.strip().lower()
        if norm_crop != "tomato":
            raise HTTPException(
                status_code=400,
                detail=f"The active PlantVillage classification model currently supports 'tomato'. Received: '{crop_type}'."
            )

        # 3. Decode image bytes safely
        try:
            image = Image.open(io.BytesIO(image_bytes))
            image.verify()  # Verify image integrity
            # Reopen after verify to get image data
            image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        except (UnidentifiedImageError, OSError, Exception) as e:
            logger.warning(f"[DiseaseService] Image decoding failed: {e}")
            raise HTTPException(
                status_code=400,
                detail="Invalid image format or corrupted image file. Please upload a valid JPEG or PNG leaf image."
            )

        # 4. Neural inference
        try:
            tensor = self.transform(image).unsqueeze(0).to(self.device)
            with torch.no_grad():
                logits = self.model(tensor)
                probs = torch.softmax(logits, dim=1)[0].cpu().numpy()

            top_idx = int(np.argmax(probs))
            confidence = round(float(probs[top_idx]), 4)
            raw_class = self.idx_to_class.get(top_idx, f"Unknown_Class_{top_idx}")

        except Exception as e:
            logger.exception(f"[DiseaseService] Forward pass inference failed: {e}")
            raise HTTPException(status_code=500, detail=f"Inference computation error: {str(e)}")

        # 5. Clinical mapping and response synthesis
        return self._build_clinical_response(raw_class, confidence, image)

    def _build_clinical_response(self, raw_class: str, confidence: float, image: Image.Image) -> Dict[str, Any]:
        """
        Maps the predicted PlantVillage class to clinical symptoms, remedies, and advisory.
        Maintains transparent boundaries between validated classification and experimental fields.
        """
        parts = raw_class.split("___")
        disease_key = parts[1] if len(parts) > 1 else raw_class

        CLINICAL_DATABASE = {
            "healthy": {
                "display": "Healthy Tomato Leaf",
                "risk": "Minimal",
                "symptoms": "Uniform deep green color, intact foliar margins, absence of chlorotic halos or necrotic lesions.",
                "organic": "Maintain routine applications of well-composted organic matter and preventive neem cake soil amendments.",
                "chemical": "No chemical intervention warranted. Continue standard cultural sanitation.",
                "preventive": [
                    "Maintain drip irrigation scheduling to prevent water stress",
                    "Ensure adequate 60cm plant spacing for ventilation",
                    "Conduct weekly routine scouting for early vector presence"
                ]
            },
            "Early_blight": {
                "display": "Early Blight (Alternaria solani)",
                "risk": "Moderate",
                "symptoms": "Dark brown circular spots with concentric target-board rings on mature lower leaves surrounded by yellow chlorotic halos.",
                "organic": "Foliar application of Bacillus subtilis or cold-pressed neem oil (5ml/L) at 5-7 day intervals. Prune infected lower foliage.",
                "chemical": "Protective spray of Mancozeb 75% WP (2.5g/L) or Chlorothalonil 75% WP (2g/L) ensuring thorough abaxial coverage.",
                "preventive": [
                    "Implement a 3-year crop rotation outside the Solanaceae family",
                    "Utilize drip irrigation to avoid foliar wetness duration > 3 hours",
                    "Prune bottom 30cm of foliage to prevent soil-splash inoculum"
                ]
            },
            "Late_blight": {
                "display": "Late Blight (Phytophthora infestans)",
                "risk": "Critical",
                "symptoms": "Large, irregular water-soaked pale-to-dark green lesions that rapidly turn purplish-brown with white downy mildew on leaf undersides.",
                "organic": "Apply Copper Oxychloride 50% WP (2.5g/L) as a protective barrier; immediately rogue and destroy heavily blighted plants.",
                "chemical": "Systemic treatment with Metalaxyl 8% + Mancozeb 64% WP (2.5g/L) or Cymoxanil 8% + Mancozeb 64% WP (2g/L).",
                "preventive": [
                    "Destroy all volunteer solanaceous weeds and infected cull piles",
                    "Ensure rapid canopy drying by optimizing row orientation with prevailing wind",
                    "Avoid overhead irrigation during evening hours"
                ]
            },
            "Bacterial_spot": {
                "display": "Bacterial Spot (Xanthomonas campestris)",
                "risk": "High",
                "symptoms": "Small, dark, water-soaked angular lesions (1-3mm) that turn brown with greasy appearance and slight yellow halo.",
                "organic": "Foliar application of Copper Hydroxide combined with Bacillus amyloliquefaciens biocontrol.",
                "chemical": "Spray Streptocycline (0.5g/L) mixed with Copper Oxychloride (2.0g/L) at 7-day intervals.",
                "preventive": [
                    "Plant only certified disease-free hot-water treated seeds",
                    "Avoid field cultivation and harvesting while foliage is wet",
                    "Sanitize pruning shears and stakes between rows with 10% sodium hypochlorite"
                ]
            },
            "Leaf_Mold": {
                "display": "Leaf Mold (Passalora fulva)",
                "risk": "Moderate",
                "symptoms": "Diffused pale green to light yellow patches on upper leaf surface, corresponding to olive-green to brown velvety fungal patches underneath.",
                "organic": "Foliar spray of Potassium Bicarbonate (3g/L) or garlic extract bio-formulation.",
                "chemical": "Apply Difenoconazole 25% EC (0.5ml/L) or Azoxystrobin 23% SC (1ml/L).",
                "preventive": [
                    "Increase row ventilation to maintain greenhouse relative humidity below 85%",
                    "Prune dense interior canopy leaves to promote airflow",
                    "Select resistant tomato cultivars"
                ]
            },
            "Septoria_leaf_spot": {
                "display": "Septoria Leaf Spot (Septoria lycopersici)",
                "risk": "Moderate",
                "symptoms": "Abundant small circular spots (2-3mm) with dark brown margins and light gray/tan centers dotted with tiny black pycnidia.",
                "organic": "Apply bio-fungicide Trichoderma harzianum (5g/L); remove and dispose of infected lower leaves.",
                "chemical": "Apply Chlorothalonil 75% WP (2g/L) or Zineb 75% WP (2g/L) at first symptom onset.",
                "preventive": [
                    "Apply straw mulch around base to prevent fungal spores from splashing from soil",
                    "Stake and cage plants to elevate canopy from ground surface",
                    "Eliminate horsenettle and nightshade weed hosts"
                ]
            },
            "Spider_mites Two-spotted_spider_mite": {
                "display": "Two-Spotted Spider Mite (Tetranychus urticae)",
                "risk": "Moderate",
                "symptoms": "Fine speckled chlorotic stippling across leaf lamina; leaves turn bronze and brittle with fine silk webbing on leaf undersides.",
                "organic": "Foliar spray of 1% horticultural mineral oil, potassium salt insecticidal soap, or release predatory mites (Phytoseiulus persimilis).",
                "chemical": "Apply Spiromesifen 22.9% SC (1ml/L) or Abamectin 1.9% EC (0.5ml/L).",
                "preventive": [
                    "Keep field perimeters free of dry dusty weeds that host mite reservoirs",
                    "Maintain adequate irrigation; water-stressed crops are highly vulnerable",
                    "Avoid broad-spectrum pyrethroid insecticides that decimate natural predators"
                ]
            },
            "Target_Spot": {
                "display": "Target Spot (Corynespora cassiicola)",
                "risk": "Moderate",
                "symptoms": "Pinpoint brown necrotic spots that enlarge up to 10mm with distinct concentric target rings and dark brown borders.",
                "organic": "Foliar bio-fungicide spray of Ampelomyces quisqualis or bio-copper.",
                "chemical": "Apply Pyraclostrobin 20% WG (0.5g/L) or Boscalid (1g/L).",
                "preventive": [
                    "Practice minimum 2-year crop rotation away from solanaceous and cucurbit hosts",
                    "Maintain proper weed management to reduce relative canopy humidity",
                    "Ensure adequate nitrogen-potassium balance to prevent tissue senescence"
                ]
            },
            "Tomato_Yellow_Leaf_Curl_Virus": {
                "display": "Tomato Yellow Leaf Curl Virus (TYLCV)",
                "risk": "Critical",
                "symptoms": "Severe upward rolling and cupping of leaflets, marked chlorosis of margins, bushy stunted plant stature, and flower drop.",
                "organic": "Install yellow sticky traps (15-20 traps/acre); spray 5% Neem Seed Kernel Extract (NSKE) to disrupt whitefly feeding.",
                "chemical": "Vector control with Acetamiprid 20% SP (0.5g/L), Thiamethoxam 25% WG (0.3g/L), or Diafenthiuron 50% WP (1g/L).",
                "preventive": [
                    "Install 40-50 mesh insect-proof netting in nurseries",
                    "Use UV-reflective silver plastic mulches to repel vector whiteflies",
                    "Strictly rogue and incinerate virus-infected plants immediately"
                ]
            },
            "Tomato_mosaic_virus": {
                "display": "Tomato Mosaic Virus (ToMV)",
                "risk": "High",
                "symptoms": "Mottled light and dark green mosaic patterns on foliage, leaf curling, blistering, and characteristic 'fern-leaf' distortion.",
                "organic": "Spray 10% non-fat dry milk solution before pruning to inactivate mechanical virion transfer.",
                "chemical": "No curative viricide exists. Immediately remove and destroy symptomatic plants. Disinfect hands with 10% TSP.",
                "preventive": [
                    "Prohibit tobacco use near greenhouse and fields (tobacco carries mosaic viruses)",
                    "Disinfect all pruning knives and stakes in 20% bleach solution between rows",
                    "Utilize certified virus-free seed stock with genetic Tm-2 resistance"
                ]
            }
        }

        clinical = CLINICAL_DATABASE.get(disease_key, {
            "display": self.clean_names.get(raw_class, raw_class.replace("Tomato___", "").replace("_", " ")),
            "risk": "Moderate",
            "symptoms": f"Pathological foliar symptoms consistent with {raw_class}.",
            "organic": "Apply biological neem extract and broad-spectrum bio-fungicide.",
            "chemical": "Consult local agricultural extension authority for certified fungicides.",
            "preventive": ["Maintain crop rotation", "Ensure adequate ventilation", "Monitor field regularly"]
        })

        # Transparent scientific boundary:
        # Severity and progression are explicitly heuristic estimations
        if "healthy" in disease_key.lower():
            severity = 0.0
            progression_stage = "Healthy"
            future_projection = "Plant exhibits normal foliar characteristics with no detected lesions."
        else:
            # Color-threshold heuristic for severity indication
            img_np = np.array(image.resize((256, 256)))
            r, g, b = img_np[:, :, 0], img_np[:, :, 1], img_np[:, :, 2]
            green_mask = (g > r) & (g > b) & (g > 60)
            lesion_mask = ((r > g) | (np.abs(r.astype(int) - g.astype(int)) < 25)) & (g < 140) & (b < 100)
            plant_pixels = np.count_nonzero(green_mask | lesion_mask)
            lesion_pixels = np.count_nonzero(lesion_mask)
            if plant_pixels > 0:
                severity = round(float((lesion_pixels / plant_pixels) * 100), 1)
            else:
                severity = 15.0
            severity = min(max(severity, 5.0), 85.0)

            stage_name = "Initial" if severity < 20 else ("Intermediate" if severity < 50 else "Advanced")
            progression_stage = f"{stage_name} (Experimental Heuristic)"
            future_projection = (
                f"[Experimental Heuristic] {clinical['display']} identified with {round(confidence * 100, 1)}% confidence. "
                f"Without timely management, lesions are projected to spread across adjacent canopy."
            )

        return {
            "crop_type": "Tomato",
            "disease_name": clinical["display"],
            "progression_stage": progression_stage,
            "severity_percentage": severity,
            "confidence": confidence,
            "risk_level": clinical["risk"],
            "future_projection": future_projection,
            "symptoms": clinical["symptoms"],
            "organic_treatment": clinical["organic"],
            "chemical_treatment": clinical["chemical"],
            "preventive_measures": clinical["preventive"],
            "detections": []  # Empty: classification models output class categories, not spatial bounding boxes
        }


# Pre-instantiate singleton service once at application startup
disease_service = DiseaseService()
