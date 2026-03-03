import logging
import os
from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, HTTPException, status
from jose import jwt
from passlib.context import CryptContext

from models.schemas import Token, UserLogin

router = APIRouter()

_default_secret = "phishguard-secret-key-change-in-production"
SECRET_KEY = os.getenv("SECRET_KEY", _default_secret)
if SECRET_KEY == _default_secret:
    logging.warning("SECRET_KEY is not set. Using insecure default — set SECRET_KEY env variable in production.")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hashed demo credentials (admin123 and emp123)
DEMO_USERS = {
    "admin": {
        "hashed_password": pwd_context.hash("admin123"),
        "role": "admin",
    },
    "employee": {
        "hashed_password": pwd_context.hash("emp123"),
        "role": "employee",
    },
}


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


@router.post("/login", response_model=Token)
async def login(user: UserLogin):
    db_user = DEMO_USERS.get(user.username)
    if not db_user or not pwd_context.verify(user.password, db_user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    token = create_access_token({"sub": user.username, "role": db_user["role"]})
    return {"access_token": token, "token_type": "bearer"}
