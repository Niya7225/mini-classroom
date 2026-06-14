from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "temporary-secret-key"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
  token_data = data.copy()
  expire = datetime.utcnow() + timedelta(minutes=30)
  token_data.update({"exp":expire})

  return jwt.encode(token_data,SECRET_KEY,algorithm=ALGORITHM) 

def hash_password(password):
    return pwd_context.hash(password)

