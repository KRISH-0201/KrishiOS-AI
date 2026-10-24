"""
KrishiOS AI — Smart Weather Advisory Service
Module 3: Weather-based Irrigation & Pesticide Recommendations

Uses OpenWeatherMap API:
  - Current weather: api.openweathermap.org/data/2.5/weather
  - 5-day forecast:  api.openweathermap.org/data/2.5/forecast
"""

import httpx
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any
from app.core.config import settings
from app.schemas.weather import (
    WeatherCurrent, ForecastDay, DiseaseRiskAlert,
    IrrigationRecommendation, PesticideRecommendation,
    WeatherAdvisoryResponse
)

OWM_BASE = "https://api.openweathermap.org/data/2.5"

# --------------------------------------------------------------------------- #
#  Disease risk rules based on temperature + humidity + rainfall              #
# --------------------------------------------------------------------------- #
DISEASE_RULES = [
    {
        "disease": "Early Blight (Alternaria solani)",
        "conditions": lambda t, h, rain: t > 28 and h > 70,
        "risk_level": "HIGH",
        "risk_color": "orange",
        "reason": "Temperature > 28°C and humidity > 70% creates ideal conditions for fungal spore germination.",
        "action": "Inspect leaves closely. Apply mancozeb or copper-based fungicide in the evening."
    },
    {
        "disease": "Early Blight (Alternaria solani)",
        "conditions": lambda t, h, rain: 24 <= t <= 28 and 60 <= h <= 70,
        "risk_level": "MODERATE",
        "risk_color": "yellow",
        "reason": "Temperature and humidity are within moderate risk range for early blight development.",
        "action": "Monitor crop regularly. Ensure proper field drainage."
    },
    {
        "disease": "Leaf Curl Virus (TYLCV)",
        "conditions": lambda t, h, rain: t > 30 and h < 60,
        "risk_level": "HIGH",
        "risk_color": "orange",
        "reason": "Hot & dry conditions increase whitefly (virus vector) activity, spreading Leaf Curl Virus.",
        "action": "Apply imidacloprid or thiamethoxam to control whitefly population. Use yellow sticky traps."
    },
    {
        "disease": "Downy Mildew / Fungal Diseases",
        "conditions": lambda t, h, rain: rain > 2.0 and h > 85,
        "risk_level": "CRITICAL",
        "risk_color": "red",
        "reason": "Heavy rainfall combined with high humidity creates critical outbreak risk for multiple fungal diseases.",
        "action": "URGENT: Apply preventive fungicide before rain if possible. Ensure drainage canals are clear."
    },
    {
        "disease": "General Pest Activity",
        "conditions": lambda t, h, rain: 22 <= t <= 30 and 50 <= h <= 75 and rain < 1.0,
        "risk_level": "MODERATE",
        "risk_color": "yellow",
        "reason": "Mild weather conditions are favorable for general pest (aphids, mites, leaf miners) activity.",
        "action": "Scout field edges. Check undersides of leaves for pest colonies."
    },
]


def _kelvin_to_celsius(k: float) -> float:
    return round(k - 273.15, 1)


def _mps_to_kmh(mps: float) -> float:
    return round(mps * 3.6, 1)


def _day_name(dt_unix: int, tz_offset: int = 0) -> str:
    dt = datetime.fromtimestamp(dt_unix + tz_offset, tz=timezone.utc)
    today = datetime.now(timezone.utc).date()
    if dt.date() == today:
        return "Today"
    elif dt.date() == today + timedelta(days=1):
        return "Tomorrow"
    return dt.strftime("%A")  # Monday, Tuesday, etc.


# --------------------------------------------------------------------------- #
#  Core API calls                                                              #
# --------------------------------------------------------------------------- #

async def fetch_current_weather(city: str) -> Dict[str, Any]:
    """Fetch current weather from OpenWeatherMap."""
    if not settings.OPENWEATHER_API_KEY:
        raise ValueError("OPENWEATHER_API_KEY not configured in .env")

    url = f"{OWM_BASE}/weather"
    params = {
        "q": city,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric"   # celsius directly
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        if response.status_code == 404:
            raise ValueError(f"City '{city}' not found. Please check the city name.")
        if response.status_code == 401:
            raise ValueError("Invalid OpenWeatherMap API key. Check your .env file.")
        response.raise_for_status()
        return response.json()


async def fetch_forecast(city: str) -> Dict[str, Any]:
    """Fetch 5-day / 3-hour forecast from OpenWeatherMap."""
    if not settings.OPENWEATHER_API_KEY:
        raise ValueError("OPENWEATHER_API_KEY not configured in .env")

    url = f"{OWM_BASE}/forecast"
    params = {
        "q": city,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
        "cnt": 40   # max 5 days × 8 intervals/day
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params=params)
        if response.status_code == 404:
            raise ValueError(f"City '{city}' not found. Please check the city name.")
        if response.status_code == 401:
            raise ValueError("Invalid OpenWeatherMap API key. Check your .env file.")
        response.raise_for_status()
        return response.json()


# --------------------------------------------------------------------------- #
#  Business logic — risk analysis                                              #
# --------------------------------------------------------------------------- #

def _evaluate_disease_risks(temp: float, humidity: int, rain_mm: float) -> List[DiseaseRiskAlert]:
    alerts = []
    seen_diseases = set()
    for rule in DISEASE_RULES:
        if rule["conditions"](temp, humidity, rain_mm):
            disease = rule["disease"]
            if disease in seen_diseases:
                continue  # highest match per disease only
            seen_diseases.add(disease)
            alerts.append(DiseaseRiskAlert(
                disease=disease,
                risk_level=rule["risk_level"],
                risk_color=rule["risk_color"],
                reason=rule["reason"],
                action=rule["action"]
            ))
    if not alerts:
        alerts.append(DiseaseRiskAlert(
            disease="No specific disease",
            risk_level="LOW",
            risk_color="green",
            reason="Current weather conditions are within safe range for disease development.",
            action="Continue regular crop monitoring. Maintain field hygiene."
        ))
    return alerts


def _get_irrigation_recommendation(temp: float, humidity: int, rain_probability: int,
                                    forecast: List[ForecastDay]) -> IrrigationRecommendation:
    # Check if rain expected in next 24h
    rain_tomorrow = any(f.rain_probability_percent > 60 for f in forecast[:2])

    if rain_probability > 60 or rain_tomorrow:
        return IrrigationRecommendation(
            should_irrigate_today=False,
            recommended_time=None,
            reason="Rain is expected within 24 hours (probability > 60%). Skip irrigation to avoid waterlogging.",
            next_review_in_hours=24
        )
    elif humidity > 80:
        return IrrigationRecommendation(
            should_irrigate_today=False,
            recommended_time=None,
            reason="Humidity is already very high (>80%). Additional irrigation may cause root rot and fungal spread.",
            next_review_in_hours=12
        )
    elif temp > 35:
        return IrrigationRecommendation(
            should_irrigate_today=True,
            recommended_time="Early morning (6:00 AM – 8:00 AM) or evening (6:00 PM – 7:30 PM)",
            reason="Temperature is very high (>35°C). Water loss through evaporation is severe. Irrigate at cooler times.",
            next_review_in_hours=12
        )
    elif temp < 20:
        return IrrigationRecommendation(
            should_irrigate_today=False,
            recommended_time=None,
            reason="Temperature is below 20°C. Soil retains moisture longer in cool conditions. Check soil moisture manually.",
            next_review_in_hours=24
        )
    else:
        return IrrigationRecommendation(
            should_irrigate_today=True,
            recommended_time="Early morning (6:00 AM – 8:00 AM)",
            reason="Weather conditions are normal. Morning irrigation is recommended for optimal water absorption.",
            next_review_in_hours=24
        )


def _get_pesticide_recommendation(wind_kmh: float, rain_probability: int,
                                   humidity: int) -> PesticideRecommendation:
    tips = [
        "Always spray in the direction of wind to avoid inhalation.",
        "Wear PPE (gloves, mask, goggles) during spraying.",
        "Do not spray within 4 hours before expected rain.",
        "Check pesticide label for crop and pest specificity."
    ]

    if rain_probability > 50:
        return PesticideRecommendation(
            safe_to_spray=False,
            recommended_window=None,
            avoid_reason=f"Rain probability is {rain_probability}%. Pesticide will wash off before absorption.",
            tips=tips
        )
    elif wind_kmh > 20:
        return PesticideRecommendation(
            safe_to_spray=False,
            recommended_window=None,
            avoid_reason=f"Wind speed is {wind_kmh} km/h (too high). Spray drift may damage neighbouring crops or reach water bodies.",
            tips=tips
        )
    elif humidity > 85:
        return PesticideRecommendation(
            safe_to_spray=False,
            recommended_window=None,
            avoid_reason="Humidity is very high (>85%). Foliage stays wet longer, reducing pesticide adhesion.",
            tips=tips
        )
    else:
        return PesticideRecommendation(
            safe_to_spray=True,
            recommended_window="Early morning (6:00 AM – 9:00 AM) or evening (5:00 PM – 7:00 PM)",
            avoid_reason=None,
            tips=tips
        )


def _generate_summary(current: WeatherCurrent, alerts: List[DiseaseRiskAlert],
                       irrigation: IrrigationRecommendation) -> str:
    risk_count = sum(1 for a in alerts if a.risk_level in ("HIGH", "CRITICAL"))
    irr = "Irrigate today (morning preferred)." if irrigation.should_irrigate_today else "Skip irrigation today."
    if risk_count == 0:
        return f"Conditions look good today in {current.city}. {irr} Continue regular monitoring."
    else:
        diseases = ", ".join(a.disease for a in alerts if a.risk_level in ("HIGH", "CRITICAL"))
        return (f"Weather in {current.city} poses {risk_count} HIGH/CRITICAL disease risk(s): {diseases}. "
                f"{irr} Take preventive action immediately.")


# --------------------------------------------------------------------------- #
#  Main service function                                                        #
# --------------------------------------------------------------------------- #

async def get_weather_advisory(city: str) -> WeatherAdvisoryResponse:
    """Main entry point — fetches weather and computes full advisory."""

    # 1. Fetch raw data
    raw_current = await fetch_current_weather(city)
    raw_forecast = await fetch_forecast(city)

    tz_offset = raw_current.get("timezone", 0)

    # 2. Parse current weather
    current = WeatherCurrent(
        city=raw_current["name"],
        country=raw_current["sys"]["country"],
        temperature_c=round(raw_current["main"]["temp"], 1),
        feels_like_c=round(raw_current["main"]["feels_like"], 1),
        humidity_percent=raw_current["main"]["humidity"],
        wind_speed_kmh=_mps_to_kmh(raw_current["wind"]["speed"]),
        description=raw_current["weather"][0]["description"].title(),
        icon=raw_current["weather"][0]["icon"],
    )

    # 3. Parse 5-day forecast (daily rollup — take noon reading per day)
    daily_map: Dict[str, List] = {}
    for item in raw_forecast["list"]:
        date_str = datetime.utcfromtimestamp(item["dt"] + tz_offset).strftime("%Y-%m-%d")
        daily_map.setdefault(date_str, []).append(item)

    forecast_days: List[ForecastDay] = []
    for date_str, items in list(daily_map.items())[:5]:
        temps = [i["main"]["temp"] for i in items]
        humidities = [i["main"]["humidity"] for i in items]
        rains = [i.get("pop", 0) for i in items]   # pop = probability of precipitation
        # Pick midday item for description
        mid = items[len(items) // 2]
        forecast_days.append(ForecastDay(
            date=date_str,
            day_name=_day_name(mid["dt"], tz_offset),
            temp_max_c=round(max(temps), 1),
            temp_min_c=round(min(temps), 1),
            humidity_percent=int(sum(humidities) / len(humidities)),
            rain_probability_percent=int(max(rains) * 100),
            description=mid["weather"][0]["description"].title(),
            icon=mid["weather"][0]["icon"],
        ))

    # 4. Business logic
    rain_mm = raw_current.get("rain", {}).get("1h", 0.0)
    rain_prob_today = forecast_days[0].rain_probability_percent if forecast_days else 0

    disease_alerts = _evaluate_disease_risks(
        current.temperature_c, current.humidity_percent, rain_mm
    )
    irrigation = _get_irrigation_recommendation(
        current.temperature_c, current.humidity_percent, rain_prob_today, forecast_days
    )
    pesticide = _get_pesticide_recommendation(
        current.wind_speed_kmh, rain_prob_today, current.humidity_percent
    )
    summary = _generate_summary(current, disease_alerts, irrigation)

    return WeatherAdvisoryResponse(
        current=current,
        forecast=forecast_days,
        disease_risk_alerts=disease_alerts,
        irrigation=irrigation,
        pesticide=pesticide,
        advisory_summary=summary,
    )
