from fastapi import APIRouter , Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
  user = db.query(User).filter(User.email == data.email).first()

  if not user:
    raise HTTPException(status_code=401,detail="Invalid email or password")
  if not verify_password(data.password, user.hashed_password):
    raise HTTPException(status_code=401,detail="Invalid email or password")
  token = create_access_token({"sub": user.email})
  return {
    "access_token": token,
    "token_type": "bearer"
  }