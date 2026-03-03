from fastapi import APIRouter

from models.schemas import SimulationRequest, SimulationResponse
from services.llm_service import LLMService

router = APIRouter()
llm_service = LLMService()


@router.post("/generate-simulation", response_model=SimulationResponse)
async def generate_simulation(request: SimulationRequest):
    result = await llm_service.generate_simulation(
        request.company_name, request.department, request.simulation_type
    )
    return SimulationResponse(**result)
