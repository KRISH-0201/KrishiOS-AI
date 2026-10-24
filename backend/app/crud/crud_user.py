from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import get_password_hash

def normalize_indic_digits(text: Optional[str]) -> Optional[str]:
    if not text:
        return text
    indic_digits = "०१२३४५६७८९૦૧૨૩૪૫૬૭૮૯০১২৩৪৫৬৭৮৯੦੧੨੩੪੫੬੭੮੯౦౧౨౩౪౫౬౭౮౯௦௧௨௩௪௫௬௭௮௯"
    ascii_digits = "012345678901234567890123456789012345678901234567890123456789"
    trans_table = str.maketrans(indic_digits, ascii_digits)
    return text.translate(trans_table)

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    norm = normalize_indic_digits(email)
    return db.query(User).filter((User.email == email) | (User.email == norm)).first()

def get_user_by_email_or_phone(db: Session, identifier: str) -> Optional[User]:
    norm = normalize_indic_digits(identifier)
    return db.query(User).filter(
        (User.email == identifier) | (User.email == norm) |
        (User.phone == identifier) | (User.phone == norm)
    ).first()

def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def create_user(db: Session, user_in: UserCreate) -> User:
    db_obj = User(
        email=user_in.email,
        phone=user_in.phone,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        is_superuser=user_in.is_superuser,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def update_user(db: Session, db_obj: User, obj_in: UserUpdate) -> User:
    update_data = obj_in.model_dump(exclude_unset=True)
    if "password" in update_data:
        hashed_password = get_password_hash(update_data["password"])
        del update_data["password"]
        update_data["hashed_password"] = hashed_password
    for field in update_data:
        setattr(db_obj, field, update_data[field])
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def delete_user(db: Session, id: int) -> User:
    obj = db.get(User, id)
    if not obj:
        return None
    db.delete(obj)
    db.commit()
    return obj
