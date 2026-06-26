from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models

from app.api.routes.health import router as health_router
from app.api.routes.auth import router as auth_router
from app.api.routes.course import router as course_router
from app.api.routes.assignment import router as assignment_router
from app.db.database import Base, engine

app = FastAPI(title="Mini Classroom API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(course_router)
app.include_router(assignment_router)