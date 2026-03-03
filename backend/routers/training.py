from fastapi import APIRouter

from models.schemas import TrainingRequest, TrainingResponse
from services.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()


@router.post("/generate-training", response_model=TrainingResponse)
async def generate_training(request: TrainingRequest):
    result = await llm_service.generate_training(request.mistake_type)
    return TrainingResponse(**result)
