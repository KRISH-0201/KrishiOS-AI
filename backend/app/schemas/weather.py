from pydantic import BaseModel
from typing import List, Optional


class WeatherCurrent(BaseModel):
    city: str
    country: str
    temperature_c: float
    feels_like_c: float
    humidity_percent: int
    wind_speed_kmh: float
    description: str
    icon: str
    uv_index: Optional[float] = None


class ForecastDay(BaseModel):
    date: str
    day_name: str
    temp_max_c: float
    temp_min_c: float
    humidity_percent: int
    rain_probability_percent: int
    description: str
    icon: str


class DiseaseRiskAlert(BaseModel):
    disease: str
    risk_level: str          # "LOW", "MODERATE", "HIGH", "CRITICAL"
    risk_color: str          # "green", "yellow", "orange", "red"
    reason: str
    action: str


class IrrigationRecommendation(BaseModel):
    should_irrigate_today: bool
    recommended_time: Optional[str]
    reason: str
    next_review_in_hours: int


class PesticideRecommendation(BaseModel):
    safe_to_spray: bool
    recommended_window: Optional[str]
    avoid_reason: Optional[str]
    tips: List[str]


class WeatherAdvisoryResponse(BaseModel):
    current: WeatherCurrent
    forecast: List[ForecastDay]
    disease_risk_alerts: List[DiseaseRiskAlert]
    irrigation: IrrigationRecommendation
    pesticide: PesticideRecommendation
    advisory_summary: str
