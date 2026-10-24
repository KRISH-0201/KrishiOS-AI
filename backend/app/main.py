from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.api_v1.api import api_router
from app.core.config import settings
from app.db.base import Base
from app.db.session import engine

# Import all models before create_all
from app.models import User, FarmerProfile, DiseasePrediction, PredictionHistory
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "details": str(exc)},
    )

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():
    from app.services.disease_service import disease_service
    status = disease_service.get_models_status()
    if status.get("tomato_classifier_available"):
        print(f"[OK] KrishiOS AI: PlantVillage Tomato Model loaded ({status.get('num_classes')} classes) from {status.get('tomato_classifier_path')}")
    else:
        print("[WARN] KrishiOS AI Warning: Tomato Classification Model is offline.")

@app.get("/")
def root():
    return {"message": "Welcome to KrishiOS AI Backend API"}
