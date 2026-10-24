from fastapi import APIRouter
from app.api.api_v1.endpoints import auth, users, weather, assistant, disease

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(weather.router, prefix="/weather", tags=["weather"])
api_router.include_router(assistant.router, prefix="/assistant", tags=["assistant"])
api_router.include_router(disease.router, prefix="/disease", tags=["disease"])
