from pydantic import BaseModel, Field
from typing import List, Optional


class ChatMessage(BaseModel):
    role: str = Field(..., description="'user' or 'assistant' or 'system'")
    content: str = Field(..., description="Message text")


class ChatRequest(BaseModel):
    message: str = Field(..., description="Farmer's query in English, Hindi, Gujarati, or any regional language", min_length=1)
    language: Optional[str] = Field(default="auto", description="Preferred language code ('auto', 'hi', 'gu', 'en', 'mr')")
    crop_context: Optional[str] = Field(default=None, description="Optional crop name (e.g., 'Tomato', 'Cotton', 'Wheat', 'Potato')")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Previous conversation turns for context")


class ChatResponse(BaseModel):
    reply: str = Field(..., description="Detailed agricultural advisory reply")
    detected_language: str = Field(..., description="Language detected or used for the reply")
    suggested_followups: List[str] = Field(default=[], description="Relevant follow-up questions the farmer can ask next")
    source: str = Field(..., description="'gemini_ai' or 'krishios_knowledge_engine'")


class QuickTopic(BaseModel):
    id: str
    category: str
    question_hi: str
    question_gu: str
    question_en: str
