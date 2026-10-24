from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api import deps
from app.crud import crud_user
from app.schemas.user import User, UserUpdate
from app.schemas.farmer_profile import FarmerProfileOut, FarmerProfileUpdate, FarmDashboardStats
from app.models.user import User as UserModel
from app.models.farmer_profile import FarmerProfile as FarmerProfileModel

router = APIRouter()

@router.get("/me", response_model=User)
def read_user_me(current_user: UserModel = Depends(deps.get_current_active_user)) -> Any:
    return current_user

@router.put("/me", response_model=User)
def update_user_me(user_in: UserUpdate, current_user: UserModel = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
    return crud_user.update_user(db, db_obj=current_user, obj_in=user_in)

@router.delete("/me", response_model=User)
def delete_user_me(current_user: UserModel = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
    return crud_user.delete_user(db, id=current_user.id)

@router.get("/me/profile", response_model=FarmerProfileOut)
def get_farmer_profile(current_user: UserModel = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
    profile = db.query(FarmerProfileModel).filter(FarmerProfileModel.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfileModel(
            user_id=current_user.id,
            farm_size_acres=5.0,
            primary_crop="Tomato & Eggplant",
            state="Gujarat",
            district="Anand",
            soil_type="Black Cotton Loam",
            irrigation_type="Drip Irrigation"
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

@router.put("/me/profile", response_model=FarmerProfileOut)
def update_farmer_profile(profile_in: FarmerProfileUpdate, current_user: UserModel = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
    profile = db.query(FarmerProfileModel).filter(FarmerProfileModel.user_id == current_user.id).first()
    if not profile:
        profile = FarmerProfileModel(user_id=current_user.id)
        db.add(profile)
    
    update_data = profile_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/me/dashboard", response_model=FarmDashboardStats)
def get_farm_dashboard(current_user: UserModel = Depends(deps.get_current_active_user), db: Session = Depends(deps.get_db)) -> Any:
    from app.models.prediction_history import PredictionHistory as PHModel
    profile = db.query(FarmerProfileModel).filter(FarmerProfileModel.user_id == current_user.id).first()
    total_scans = db.query(PHModel).filter(PHModel.user_id == current_user.id).count()
    # Active alerts = scans in last 7 days with confidence < 0.7 (possible disease)
    from datetime import datetime, timedelta, timezone
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    recent_scans = db.query(PHModel).filter(
        PHModel.user_id == current_user.id,
        PHModel.created_at >= week_ago
    ).all()
    active_alerts = sum(1 for s in recent_scans if s.confidence_score is not None and s.confidence_score < 0.7)
    # Farm health = 100 - (active_alerts * 10), floored at 40
    health_score = max(40, 100 - (active_alerts * 10))
    return FarmDashboardStats(
        farmer_name=current_user.full_name or "Farmer",
        farm_size_acres=profile.farm_size_acres if profile else 5.0,
        state=profile.state if profile else "Gujarat",
        district=profile.district if profile else "Anand",
        primary_crop=profile.primary_crop if profile else "Tomato & Eggplant",
        soil_type=profile.soil_type if profile else "Black Cotton Loam",
        irrigation_type=profile.irrigation_type if profile else "Drip Irrigation",
        total_scans_performed=total_scans,
        active_pathology_alerts=active_alerts,
        farm_health_score=health_score,
        recent_disease_detected="No recent detections" if not recent_scans else "Recent scan recorded"
    )

from pydantic import BaseModel
from typing import Optional

class ScanHistoryCreate(BaseModel):
    crop_name: str = "Tomato"
    disease_name: str
    stage: str = "Initial"
    severity: float = 0.0
    risk_level: str = "Low"
    pathogen: Optional[str] = None
    confidence_score: Optional[float] = None
    image_url: Optional[str] = None

@router.get("/me/history")
def get_user_history(
    current_user: UserModel = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db)
) -> Any:
    from app.models.prediction_history import PredictionHistory as PHModel
    scans = (
        db.query(PHModel)
        .filter(PHModel.user_id == current_user.id)
        .order_by(PHModel.created_at.desc())
        .all()
    )
    return [
        {
            "id": f"REC-{s.id}",
            "crop": (s.crop_name or "Tomato").lower(),
            "cropLabel": s.crop_name or "Tomato",
            "cropLatin": "Solanum lycopersicum" if (s.crop_name or "").lower() == "tomato" else "Solanum melongena",
            "disease": s.disease_name,
            "pathogen": s.pathogen or "Pathogen strain",
            "stage": s.stage,
            "severity": round(s.severity, 1) if s.severity is not None else 0.0,
            "confidence": round((s.confidence_score or 0.9) * 100),
            "risk": f"{s.risk_level} Risk" if "Risk" not in (s.risk_level or "") else s.risk_level,
            "image_url": s.image_url,
            "created_at": s.created_at.isoformat() if s.created_at else None,
            "timestamp": s.created_at.strftime("%d %b %Y, %H:%M") if s.created_at else "Earlier"
        }
        for s in scans
    ]

@router.post("/me/history")
def save_user_scan(
    scan_in: ScanHistoryCreate,
    current_user: UserModel = Depends(deps.get_current_active_user),
    db: Session = Depends(deps.get_db)
) -> Any:
    from app.models.prediction_history import PredictionHistory as PHModel
    new_scan = PHModel(
        user_id=current_user.id,
        crop_name=scan_in.crop_name,
        disease_name=scan_in.disease_name,
        stage=scan_in.stage,
        severity=scan_in.severity,
        risk_level=scan_in.risk_level,
        pathogen=scan_in.pathogen,
        confidence_score=scan_in.confidence_score,
        image_url=scan_in.image_url
    )
    db.add(new_scan)
    db.commit()
    db.refresh(new_scan)
    return {
        "success": True,
        "id": f"REC-{new_scan.id}",
        "message": "Scan recorded in farmer history"
    }
