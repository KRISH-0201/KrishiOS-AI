from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    prediction_id = Column(Integer, ForeignKey("disease_predictions.id"), nullable=True)
    crop_name = Column(String, default="Tomato")
    disease_name = Column(String, default="Unknown")
    stage = Column(String, default="Initial")
    severity = Column(Float, default=0.0)
    risk_level = Column(String, default="Low")
    pathogen = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    confidence_score = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="predictions")
    prediction = relationship("DiseasePrediction", back_populates="history")
