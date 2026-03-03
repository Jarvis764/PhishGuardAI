from fastapi import APIRouter
from typing import List

from models.schemas import DashboardStats, EmployeeRisk

router = APIRouter()

HIGH_RISK_EMPLOYEES = [
    EmployeeRisk(id=1, name="Alice Johnson", email="alice@company.com", department="Finance", risk_score=87, risk_level="High"),
    EmployeeRisk(id=2, name="Bob Martinez", email="bob@company.com", department="HR", risk_score=74, risk_level="High"),
    EmployeeRisk(id=3, name="Carol White", email="carol@company.com", department="IT", risk_score=68, risk_level="High"),
    EmployeeRisk(id=4, name="David Lee", email="david@company.com", department="Sales", risk_score=61, risk_level="High"),
    EmployeeRisk(id=5, name="Eva Brown", email="eva@company.com", department="Marketing", risk_score=58, risk_level="Medium"),
]


@router.get("/dashboard", response_model=DashboardStats)
async def get_dashboard():
    return DashboardStats(
        total_employees=247,
        active_simulations=12,
        company_risk_index=43,
        click_rate=18.5,
        high_risk_employees=HIGH_RISK_EMPLOYEES,
    )


@router.get("/risk-distribution")
async def get_risk_distribution():
    return {
        "data": [
            {"name": "Low Risk", "value": 142, "color": "#10b981"},
            {"name": "Medium Risk", "value": 73, "color": "#f59e0b"},
            {"name": "High Risk", "value": 32, "color": "#ef4444"},
        ]
    }


@router.get("/risk-trend")
async def get_risk_trend():
    return {
        "data": [
            {"day": "Mon", "risk": 48, "simulations": 3},
            {"day": "Tue", "risk": 52, "simulations": 5},
            {"day": "Wed", "risk": 45, "simulations": 2},
            {"day": "Thu", "risk": 61, "simulations": 7},
            {"day": "Fri", "risk": 43, "simulations": 4},
            {"day": "Sat", "risk": 38, "simulations": 1},
            {"day": "Sun", "risk": 43, "simulations": 2},
        ]
    }
