import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

def _create_engine():
    """Try PostgreSQL first, silently fall back to SQLite for local dev."""
    try:
        eng = create_engine(
            settings.SQLALCHEMY_DATABASE_URI,
            pool_pre_ping=True,
            connect_args={} if "postgresql" in settings.SQLALCHEMY_DATABASE_URI else {}
        )
        # Test the connection
        with eng.connect():
            pass
        return eng
    except Exception:
        # Fallback: SQLite stored beside the backend folder
        sqlite_path = Path(__file__).resolve().parent.parent.parent / "krishios_local.db"
        sqlite_url = f"sqlite:///{sqlite_path}"
        print(f"[KrishiOS] PostgreSQL unavailable — using SQLite fallback: {sqlite_path}")
        return create_engine(
            sqlite_url,
            connect_args={"check_same_thread": False},
        )

engine = _create_engine()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
