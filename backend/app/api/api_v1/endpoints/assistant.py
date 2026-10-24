"""
AI Agriculture Assistant Endpoints (Module 2)
POST /api/v1/assistant/chat
GET /api/v1/assistant/quick-topics
"""

from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.chat import ChatRequest, ChatResponse, QuickTopic
from app.services.assistant_service import get_assistant_reply, QUICK_TOPICS

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    """
    ## Multilingual AI Agriculture Assistant (Module 2)

    Accepts farmer's questions in **Hindi, Gujarati, English, Hinglish, Marathi**, etc.
    Returns:
    - Detailed advice on disease remedies, chemical & organic treatments
    - Exact pesticide dosages and spray safety timings
    - Relevant follow-up questions
    - Uses Gemini LLM with instant offline agronomy fallback
    """
    try:
        response = await get_assistant_reply(
            message=request.message,
            history=request.history or [],
            crop=request.crop_context,
            language=request.language or "auto"
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Assistant service error: {str(e)}")


@router.get("/quick-topics", response_model=List[QuickTopic])
def list_quick_topics():
    """
    ## Quick Topics for Farmer UI

    Returns predefined frequently asked questions in English, Hindi, and Gujarati
    for 1-click prompt chips on the frontend.
    """
    return QUICK_TOPICS
