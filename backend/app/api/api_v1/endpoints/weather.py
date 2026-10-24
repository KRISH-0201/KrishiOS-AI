"""
Weather Advisory API Endpoint
GET /api/v1/weather/advisory?city=Surat
GET /api/v1/weather/advisory?city=Ahmedabad
"""

from fastapi import APIRouter, HTTPException, Query
from app.schemas.weather import WeatherAdvisoryResponse
from app.services.weather_service import get_weather_advisory

router = APIRouter()


@router.get("/advisory", response_model=WeatherAdvisoryResponse)
async def weather_advisory(
    city: str = Query(
        ...,
        description="City name (e.g. Surat, Ahmedabad, Mumbai, Delhi)",
        examples=["Surat"]
    )
):
    """
    ## Smart Weather Advisory for KrishiOS AI

    Returns:
    - **Current weather** (temperature, humidity, wind speed, description)
    - **5-day forecast** (daily min/max, rain probability)
    - **Disease risk alerts** based on weather conditions (Early Blight, Leaf Curl, etc.)
    - **Irrigation recommendation** (should water today? best time?)
    - **Pesticide spray window** (safe to spray? wind/rain check)
    - **Advisory summary** in plain language

    ### Example:
    `GET /api/v1/weather/advisory?city=Surat`
    """
    try:
        advisory = await get_weather_advisory(city)
        return advisory
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Weather service unavailable: {str(e)}"
        )
