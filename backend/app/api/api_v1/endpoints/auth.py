from datetime import timedelta
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.api import deps
from app.core import security
from app.core.config import settings
from app.crud import crud_user
from app.schemas.token import Token
from app.schemas.user import UserCreate, User, UserLogin
from app.models.farmer_profile import FarmerProfile

router = APIRouter()

@router.post("/login", response_model=Token)
def login_access_token(db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    user = crud_user.get_user_by_email_or_phone(db, identifier=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email/mobile or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": security.create_access_token(user.id, expires_delta=access_token_expires),
        "token_type": "bearer",
    }

@router.post("/login-json")
def login_json(login_in: UserLogin, db: Session = Depends(deps.get_db)) -> Any:
    """Farmer login supporting either Mobile Number or Email + Password."""
    raw_ident = login_in.identifier.strip()
    norm_ident = crud_user.normalize_indic_digits(raw_ident)
    user = crud_user.get_user_by_email_or_phone(db, identifier=norm_ident)
    if not user and raw_ident != norm_ident:
        user = crud_user.get_user_by_email_or_phone(db, identifier=raw_ident)
    if not user or not security.verify_password(login_in.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect mobile number/email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Account is deactivated")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = security.create_access_token(user.id, expires_delta=access_token_expires)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name or "Farmer",
            "email": user.email,
            "phone": user.phone
        }
    }

@router.post("/register")
def register_user(user_in: UserCreate, db: Session = Depends(deps.get_db)) -> Any:
    """Register farmer via Email or Mobile Number."""
    if user_in.phone:
        user_in.phone = crud_user.normalize_indic_digits(user_in.phone.strip())
    if user_in.email:
        user_in.email = crud_user.normalize_indic_digits(user_in.email.strip())

    identifier = (user_in.phone or user_in.email or "").strip()
    if not identifier:
        raise HTTPException(status_code=400, detail="Please provide an email or mobile number")

    existing = crud_user.get_user_by_email_or_phone(db, identifier=identifier)
    if existing:
        raise HTTPException(status_code=400, detail="A farmer account with this mobile/email already exists")

    # If identifier looks like phone digits, store in phone
    clean_digits = identifier.replace("+", "").replace("-", "").replace(" ", "")
    if not user_in.phone and clean_digits.isdigit():
        user_in.phone = clean_digits

    user = crud_user.create_user(db, user_in=user_in)

    # Initialize FarmerProfile
    profile = FarmerProfile(
        user_id=user.id,
        farm_size_acres=5.0,
        primary_crop="Tomato & Eggplant",
        state="Gujarat",
        district="Anand",
        soil_type="Black Cotton Loam",
        irrigation_type="Drip Irrigation"
    )
    db.add(profile)
    db.commit()

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    token = security.create_access_token(user.id, expires_delta=access_token_expires)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name or "Farmer",
            "email": user.email,
            "phone": user.phone
        }
    }
