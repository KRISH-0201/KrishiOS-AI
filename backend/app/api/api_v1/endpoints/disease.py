from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.schemas.disease import DiseasePredictionResponse, ModelStatusResponse
from app.services.disease_service import disease_service

router = APIRouter()

@router.get("/models-status", response_model=ModelStatusResponse)
def get_models_status():
    """
    Check the current availability and path of all trained Phase 1 ML models.
    """
    return disease_service.get_models_status()

@router.post("/predict", response_model=DiseasePredictionResponse)
async def predict_disease(
    file: UploadFile = File(...),
    crop_type: str = Form(default="tomato")
):
    """
    Analyze crop leaf photograph for disease identification, severity percentage,
    progression stage, and actionable treatment recommendations.
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image format.")
    
    image_bytes = await file.read()
    if len(image_bytes) == 0:
        raise HTTPException(status_code=400, detail="Empty image uploaded.")

    result = await disease_service.predict(image_bytes, crop_type=crop_type)
    return result
