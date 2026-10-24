from pydantic import BaseModel
from typing import Optional

class FarmerProfileBase(BaseModel):
    farm_size_acres: Optional[float] = 5.0
    primary_crop: Optional[str] = "Tomato & Eggplant"
    state: Optional[str] = "Gujarat"
    district: Optional[str] = "Anand"
    soil_type: Optional[str] = "Black Cotton Loam"
    irrigation_type: Optional[str] = "Drip Irrigation"
    location_lat: Optional[float] = 22.5645
    location_lon: Optional[float] = 72.9289

class FarmerProfileCreate(FarmerProfileBase):
    pass

class FarmerProfileUpdate(FarmerProfileBase):
    pass

class FarmerProfileOut(FarmerProfileBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class FarmDashboardStats(BaseModel):
    farmer_name: str
    farm_size_acres: float
    state: str
    district: str
    primary_crop: str
    soil_type: str
    irrigation_type: str
    total_scans_performed: int
    active_pathology_alerts: int
    farm_health_score: int
    recent_disease_detected: str
