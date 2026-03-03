from pydantic import BaseModel
from typing import List, Optional


class EmailAnalysisRequest(BaseModel):
    email_content: str


class EmailAnalysisResponse(BaseModel):
    classification: str
    risk_score: int
    explanation: str
    highlighted_phrases: List[str]


class SimulationRequest(BaseModel):
    company_name: str
    department: str
    simulation_type: str


class SimulationResponse(BaseModel):
    subject: str
    body: str
    fake_link: str
    simulation_id: str


class TrainingRequest(BaseModel):
    user_id: str
    simulation_id: str
    mistake_type: str


class TrainingResponse(BaseModel):
    mistake_explanation: str
    why_dangerous: str
    prevention_tips: List[str]
    awareness_summary: str


class EmployeeRisk(BaseModel):
    id: int
    name: str
    email: str
    department: str
    risk_score: int
    risk_level: str


class DashboardStats(BaseModel):
    total_employees: int
    active_simulations: int
    company_risk_index: int
    click_rate: float
    high_risk_employees: List[EmployeeRisk]


class Token(BaseModel):
    access_token: str
    token_type: str


class UserLogin(BaseModel):
    username: str
    password: str
