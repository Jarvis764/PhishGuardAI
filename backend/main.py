from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import auth, email_analyzer, dashboard, simulation, training

app = FastAPI(title="PhishGuard AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api", tags=["auth"])
app.include_router(email_analyzer.router, prefix="/api", tags=["email"])
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])
app.include_router(simulation.router, prefix="/api", tags=["simulation"])
app.include_router(training.router, prefix="/api", tags=["training"])


@app.get("/")
async def root():
    return {"message": "PhishGuard AI API", "version": "1.0.0"}
