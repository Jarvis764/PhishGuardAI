from fastapi import APIRouter

from models.schemas import EmailAnalysisRequest, EmailAnalysisResponse
from services.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()


@router.post("/analyze-email", response_model=EmailAnalysisResponse)
async def analyze_email(request: EmailAnalysisRequest):
    result = await llm_service.analyze_email(request.email_content)
    return EmailAnalysisResponse(**result)
