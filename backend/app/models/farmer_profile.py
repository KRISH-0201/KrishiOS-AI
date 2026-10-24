from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class FarmerProfile(Base):
    __tablename__ = "farmer_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    farm_size_acres = Column(Float, default=5.0)
    primary_crop = Column(String, default="Tomato & Eggplant")
    state = Column(String, default="Gujarat")
    district = Column(String, default="Anand")
    soil_type = Column(String, default="Black Cotton Loam")
    irrigation_type = Column(String, default="Drip Irrigation")
    location_lat = Column(Float, default=22.5645)
    location_lon = Column(Float, default=72.9289)

    owner = relationship("User", back_populates="profile")
