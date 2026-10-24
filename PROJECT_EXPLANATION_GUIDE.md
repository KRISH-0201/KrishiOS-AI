# KrishiOS AI: Complete System Architecture & Line-by-Line Code Explanation Guide

> **Target Audience:** For presenting, pitching, or defending this project with **zero prior knowledge**.  
> Every module, component, and technical decision is explained in plain, simple language so you can answer any question confidently.

---

## 1. Executive Summary & Problem Solved

### What is KrishiOS AI?
**KrishiOS AI** is an end-to-end, multi-lingual, precision agricultural decision support system designed for Indian smallholder farmers and agronomy technicians.

### What Problems Does It Solve?
1. **Misdiagnosis of Crop Disease:** Farmers often confuse early blight, late blight, or bacterial spot, applying the wrong chemical pesticides and wasting thousands of rupees. KrishiOS provides deep-learning pathology detection down to pathogen identification and measured lesion severity percentage.
2. **Spray Timing Disasters:** Farmers often spray expensive fungicides right before heavy rain or during strong wind drifts, washing away the chemicals or harming adjacent crops. KrishiOS correlates micro-climate telemetry (humidity, wind speed, rain probability) to compute an exact **Safe Spray Window** and **Irrigation Recommendation**.
3. **Language & Digital Illiteracy Barriers:** Most agricultural apps are in English. KrishiOS AI provides **zero-leakage localization across 8 Indian languages** (Hindi, Gujarati, Marathi, Bengali, Punjabi, Telugu, Tamil, English), including Indic numeral rendering (e.g. `९८२५०१२३४५`) and Indic credential authentication.
4. **Lack of Pathology Records:** In traditional farming, there is no history of what disease affected which plot. KrishiOS persists every diagnostic scan into a database linked to the farmer's account.

---

## 2. High-Level Architecture Overview

KrishiOS follows a modern, decoupled client-server architecture:

```
┌────────────────────────────────────────────────────────┐
│            Farmer / User Browser (React + Vite)        │
│  - Multilingual Engine (localization.js)               │
│  - 5 Operational Modules (App.jsx)                     │
│  - Indic Digit & Language Converter                    │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON / FormData)
                            │ Bearer JWT Authentication
┌───────────────────────────▼────────────────────────────┐
│              FastAPI Backend Server (Python)           │
│  - main.py (FastAPI application & CORS)                │
│  - /api/v1/endpoints/                                  │
│      ├── auth.py (Indic Digit Normalization & JWT)     │
│      ├── predict.py (Disease Vision Pathology)         │
│      ├── weather.py (Spray Safe & Weather Advisory)    │
│      ├── chat.py (Gemini LLM Agronomy Advisor)         │
│      └── user.py (Farmer Profile & Scan History)       │
│  - SQLAlchemy ORM & SQLite / PostgreSQL Engine         │
└────────────────────────────────────────────────────────┘
```

---

## 3. Detailed Component Breakdown

### Frontend: `frontend/src/localization.js`
- **Purpose:** Complete multi-language dictionary and clinical terminology translation engine.
- **Key Functions:**
  - `normalizeIndicDigits(str)`: Converts Indian numerals (`०-९`, `૦-૯`, etc.) to standard ASCII (`0-9`) for technical processing.
  - `locNum(val, lang)`: Converts ASCII numbers to Indic script digits based on the selected language.
  - `locStage(stage, lang)`: Translates clinical stages (`Initial`, `Intermediate`, `Advanced`).
  - `locRisk(risk, lang)`: Translates risk tags (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`).
  - `locDisease(diseaseName, lang)`: Converts disease technical terms (e.g., `Tomato Early Blight`) to localized terms (e.g., `टमाटर अगेती झुलसा`).
  - `locCrop(cropName, lang)`: Translates crop names across 8 languages.
  - `getTranslation(lang)`: Safe proxy object that ensures **no missing key ever renders blank or English**.

### Frontend: `frontend/src/App.jsx`
- **Purpose:** Main single-page application orchestrator.
- **Key Tabs & Modules:**
  1. **Tab 1: Disease Scanner (Vision AI):**
     - Optical reticle viewport with simulated and live camera capture.
     - Presets for rapid diagnostic verification (Eggplant, Tomato Early Blight, Wheat Rust, etc.).
     - Telemetry gauges (Confidence Score, Lesion Severity %, Pathogen Classification).
     - 14-day clinical recovery schedule and dual-formulation prescriptions (Chemical + Bio-shield).
  2. **Tab 2: Spray Safe & Meteorological Advisory:**
     - City-based live weather telemetry (Temperature, Humidity, Wind Speed, Dew Point).
     - Spray window calculator: Warns farmers if wind is $>15$ km/h or rain probability is high.
     - Irrigation recommendation: Advises whether irrigation is needed today and optimal time.
  3. **Tab 3: Krishi Mitra Agronomic Chatbot:**
     - Interactive AI assistant powered by Gemini.
     - Quick topic prompts localized to the user's selected language.
  4. **Tab 4: Persistent Diagnostic Registry (History):**
     - Linked to the logged-in farmer's account.
     - Exports scan history as JSON or CSV reports for bank loans or crop insurance claims.
  5. **Tab 5: Farm Management & Acreage Dashboard:**
     - Landholding specs (Total Acres, Soil Classification, Irrigation Type).
     - Acreage allocation breakdown (Tomato 64%, Eggplant 27%, Wheat 9%).
     - Soil health status advisory.
  6. **Clinical Pathology Prescription Modal:**
     - Printable official diagnosis sheet (`window.print()`) with Specimen ID, Date, Farmer details, Dosage, and Formulation.
  7. **Farmer Authentication Modal:**
     - Allows farmers to register or log in using mobile number or Gmail.
     - Supports Indic numerals and Indic text in login credentials.

---

### Backend: Core Architecture & Endpoints

#### 1. `backend/app/main.py`
- Initializes the `FastAPI()` application.
- Configures CORS middleware so frontend clients can securely connect.
- Mounts `/api/v1` routes and establishes database connection on startup.

#### 2. `backend/app/api/api_v1/endpoints/auth.py` & `crud/crud_user.py`
- Implements farmer registration and login.
- Normalizes Indic numerals so if a farmer enters `९८२५०१२३४५` or `9825012345`, both authenticate to the same account.
- Issues standard JSON Web Tokens (JWT) for secure, stateless session handling.

#### 3. `backend/app/api/api_v1/endpoints/predict.py`
- Accepts leaf photos from the farmer.
- Runs inference to detect crop, pathogen, disease name, stage, and severity.
- Returns chemical and organic intervention strategies with tank dosages (e.g., `Mancozeb 75% WP @ 2.5g/L`).

#### 4. `backend/app/api/api_v1/endpoints/weather.py`
- Fetches weather conditions and computes whether pesticide spraying is safe or hazardous.
- Computes soil moisture loss and advises on daily irrigation schedules.

#### 5. `backend/app/api/api_v1/endpoints/chat.py`
- Connects to Google Gemini API with agronomic system prompts to provide localized farming advice.

#### 6. `backend/app/api/api_v1/endpoints/user.py` & `models/scan_record.py`
- Persists each scan into SQLite/PostgreSQL database linked to the farmer's ID (`user_id`).
- Returns historical records so farmers can review their seasonal diagnostic logs.

---

## 4. Key Questions You Can Confidently Answer

### Q1: "What AI models are used?"
> **Answer:** KrishiOS AI utilizes a multi-stage architecture: YOLOv11 for bounding box detection of infected leaf regions and PyTorch UNet++ for semantic pixel-level segmentation to accurately compute lesion severity percentage.

### Q2: "How does the language localization work?"
> **Answer:** We built a dedicated translation engine in `localization.js` supporting 8 Indian languages. Every single text, preset, clinical stage, risk tag, and metric is mapped through language proxies, and Indic numeral mapping converts all ASCII digits to native Indic scripts.

### Q3: "What happens if a farmer types their phone number in Hindi?"
> **Answer:** Both frontend and backend implement `normalize_indic_digits()`. It translates Unicode Indic digits (`०-९`, `૦-૯`) to standard digits before database verification, allowing farmers to sign up and log in using their native keyboard.

### Q4: "How does the Spray Safe feature work?"
> **Answer:** Chemical sprays are wasted if rain washes them off or wind drifts them onto nearby plots. KrishiOS analyzes temperature, humidity, and wind speed. If wind exceeds $15$ km/h or precipitation is predicted, it alerts the farmer to halt spraying and suggests the next optimal window.

---

## 5. How to Run KrishiOS AI
Simply double-click `run_krishios_all.bat` in the root folder, or:
- **Backend:** `cd backend && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload`
- **Frontend:** `cd frontend && npm run dev`
