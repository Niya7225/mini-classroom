from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.db.database import Base, engine
from app import models
from app.api.routes.auth import router as auth_router
app = FastAPI(title="Mini Classroom API")
Base.metadata.create_all(bind=engine)
app.include_router(health_router)
app.include_router(auth_router)