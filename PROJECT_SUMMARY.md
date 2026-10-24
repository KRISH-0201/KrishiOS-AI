# KrishiOS AI — Complete Project Summary & Progress Documentation

**Project Title:** Plant Leaf Disease Segmentation & Severity Extraction  
**Domain:** Artificial Intelligence in Agriculture / Computer Vision  
**Date:** September 22, 2026  
**Status:** Preprocessing Complete | UNet++ Training Pipeline Active  
**Storage Path:** `d:\KrishiOS AI\`

---

## 📋 Executive Overview

**KrishiOS AI** is an end-to-end deep learning system designed to analyze tomato leaf images, detect disease types, segment infected lesion regions at the pixel level, and extract quantitative **severity scores** (percentage of leaf area affected by disease).

---

## 📁 1. Dataset Audit, Cleaning & Segregation

### 1.1 Source Raw Data Audit
The initial raw dataset provided in `data/` consisted of **7 unorganized ZIP extraction folders** containing field photos taken between November 2025 and January 2026.

### 1.2 Data Segregation (`01_segregate_data2.py`)
An automated python script scanned the raw folders and structured them into a clean, normalized working directory (`data2/`) with **4 distinct classes**:

| Class | Directory | Disease Agent / Category | Final Clean Count | Date Range |
|-------|-----------|--------------------------|-------------------|------------|
| **Early Blight** | `data2/01_early_blight/` | *Alternaria solani* (Fungal) | **572 images** | Nov 14, 2025 – Jan 13, 2026 |
| **Leaf Curl** | `data2/02_leaf_curl/` | TYLCV (Viral) | **483 images** | Dec 4, 2025 – Jan 13, 2026 |
| **Insect Damage** | `data2/03_insect_damage/` | *Liriomyza* sp. / Leaf Miner (Pest) | **1,018 images** | Jan 6, 2026 |
| **Healthy Reference** | `data2/04_healthy_reference/` | Healthy Leaf Baseline | **92 images** | Jan 13, 2026 |
| **TOTAL** | | | **2,165 images** | |

### 1.3 Deduplication & File Filtering (`03_fix_duplicates.py`)
* **Byte/MD5 Hashing Check:** Scanned all images to detect identical copy pairs (`_dup1`, `_dup2`). Removed **192 duplicate files** to prevent data leakage between training and validation sets.
* **Non-Image Exclusions:** Identified and excluded non-image files, including two `.fsta` (FASTA DNA sequence) files in the Leaf Curl directory and low-resolution WhatsApp thumbnail copies.

---

## 🔍 2. Exploratory Data Analysis (EDA) & Inspection

* **Temporal Coverage Analysis:** Confirmed that field photography was conducted during irregular field walks (every 3 days to 3 weeks) rather than daily fixed tracking.
* **Metadata & EXIF Inspection (`00_full_dataset_scan.py`):** Verified that images represent cross-sectional field walks across multiple plants rather than longitudinal tracking of the exact same plant over time.
* **Class Imbalance:**
  * Insect Damage: ~47.0%
  * Early Blight: ~26.4%
  * Leaf Curl: ~22.3%
  * Healthy: ~4.3%
* **Resolution Standardization:** Input images normalized and resized to **512×512 pixels** for uniform tensor processing.

---

## 🎨 3. Self-Supervised Pseudo-Mask Generation

Since pixel-level manual segmentation annotations were not provided in the raw dataset, an automated **HSV Color Thresholding + Morphological Pipeline** was implemented inside the custom `TomatoLeafDataset` PyTorch class:

* **Early Blight:** HSV range tuned for dark brown, black, and necrotic lesion regions.
* **Leaf Curl:** HSV range tuned for yellow-green chlorotic mottling.
* **Insect Damage:** HSV range tuned for pale, white, and silvery serpentine mining trails.
* **Healthy Reference:** All-zero (background) target binary mask.
* **Morphological Filtering:** Applied Elliptical Kernel Opening (remove noise) and Closing (fill lesion holes).

---

## 🧠 4. Deep Learning Model Architecture (`02_unetpp_train.py`)

### 4.1 Model Specifications
* **Architecture:** **UNet++** (Nested UNet for multi-scale semantic segmentation).
* **Encoder Backbone:** `efficientnet-b4` (pretrained on ImageNet).
* **Library:** `segmentation_models_pytorch` (SMP).
* **Input Resolution:** 512 × 512 × 3 (RGB).
* **Output:** 512 × 512 × 1 (Binary Sigmoid Lesion Mask).

### 4.2 Loss Function & Metrics
* **Loss Function:** Combined **BCE With Logits Loss** + **Dice Loss**:
  $$\text{Loss}_{\text{combined}} = 0.5 \times \text{BCE} + 0.5 \times \text{DiceLoss}$$
* **Evaluation Metrics:**
  * **IoU (Intersection over Union)**: Overlap ratio of predicted vs. pseudo mask.
  * **Dice Coefficient**: F1-score of pixel classification.
  * **Severity Score (%)**: Percentage of leaf surface area occupied by lesion pixels.

### 4.3 Data Augmentations (Albumentations)
* `RandomResizedCrop(512, 512, scale=(0.7, 1.0))`
* `HorizontalFlip(p=0.5)` & `VerticalFlip(p=0.3)`
* `RandomRotate90(p=0.5)`
* `ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2, hue=0.05)`
* `GaussNoise(var_limit=(10.0, 50.0))`
* `Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])`

### 4.4 Auto-Resume Checkpoint Mechanism
* Automatically scans `d:\KrishiOS AI\models\` for saved `.pth` checkpoints.
* Restores model state dict, optimizer parameters, learning rate scheduler state, and epoch counters.
* Allows training to seamlessly resume if interrupted (e.g., from Epoch 13 to Epoch 30).

---

## 🛠️ 5. Utility & Runner Batch Files (`backend/`)

| Batch Script | Purpose |
|--------------|---------|
| `install_ml_deps.bat` | Virtual environment & dependencies installer (`torch`, `smp`, `albumentations`, `opencv`). |
| `run_segregate.bat` | Executes data segregation from `data/` to `data2/`. |
| `run_fix_duplicates.bat` | Scans and deletes duplicate images. |
| `run_train.bat` | Launches UNet++ training loop with real-time logs. |

---

## 📄 6. Reports & Documentation Generated

1. `DATASET_INSPECTION_REPORT.md` — Formal academic inspection report for seniors/professors.
2. `PROJECT_SUMMARY.md` — Complete summary of all research, cleaning, and model development steps.
3. Journal Entries — Structured daily research logs detailing decision rationale.

---

## 🚀 7. Phase Progression Status

### ✅ Phase 1: Deep Learning Models & Training Pipeline (COMPLETED)
- **UNet++ Semantic Lesion Segmentation**: Trained EfficientNet-B4 model with dice loss (`models/unetpp_latest.pth`).
- **YOLOv11 Progression Detector**: Multi-stage detection script (`research/04_train_yolo_progression.py`) for 9 classes across Early Blight, Miner, and Fusarium.
- **Eggplant Leaf Disease Classifier**: PyTorch transfer learning script (`research/05_train_eggplant_classifier.py`) for 6 classes.
- **Master Kaggle Runner**: Self-contained GPU runner (`research/Kaggle_Phase1_Master.py`) for cloud training.

### ✅ Phase 2: Full-Stack Web App & Diagnostic Dashboard (COMPLETED)
- **FastAPI Endpoints**: `/api/v1/disease/predict` & `/api/v1/disease/models-status` integrated.
- **Modern Responsive React Frontend**: Scanned leaf upload, instant sample preview, and progression gauge.
- **7–10 Day Severity Progression Forecast**: Dynamic prediction of disease spread over time.
- **Bilingual Support**: Instant toggle between Hindi (हिंदी) and English.
- **Integrated Krishi Mitra AI Chatbot**: Real-time agronomist chat assistant.
- **1-Click Full Stack Launcher**: [`run_krishios_all.bat`](file:///d:/KrishiOS%20AI/run_krishios_all.bat).
