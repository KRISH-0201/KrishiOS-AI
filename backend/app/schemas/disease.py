from typing import Optional, List
from pydantic import BaseModel

class DiseasePredictionResponse(BaseModel):
    crop_type: str
    disease_name: str
    progression_stage: str
    severity_percentage: float
    confidence: float
    risk_level: str
    future_projection: str
    symptoms: str
    organic_treatment: str
    chemical_treatment: str
    preventive_measures: List[str]
    detections: Optional[List[dict]] = None
    severity_method: Optional[str] = "Color-threshold heuristic (Phase 1)"
    is_low_confidence: Optional[bool] = False
    confidence_warning: Optional[str] = None

class ModelStatusResponse(BaseModel):
    tomato_classifier_available: Optional[bool] = None
    tomato_classifier_path: Optional[str] = None
    architecture: Optional[str] = None
    num_classes: Optional[int] = None
    dataset: Optional[str] = None
    classes: Optional[List[str]] = None
    weights_sha256: Optional[str] = None
    weights_verified: Optional[bool] = None
    unetpp_available: bool = False
    unetpp_path: Optional[str] = None
    yolo_progression_available: bool = False
    yolo_progression_path: Optional[str] = None
    eggplant_classifier_available: bool = False
    eggplant_classifier_path: Optional[str] = None
