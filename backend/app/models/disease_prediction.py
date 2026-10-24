from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.db.base import Base

class DiseasePrediction(Base):
    __tablename__ = "disease_predictions"

    id = Column(Integer, primary_key=True, index=True)
    disease_name = Column(String, index=True)
    symptoms = Column(Text)
    treatment_recommendation = Column(Text)

    history = relationship("PredictionHistory", back_populates="prediction")
