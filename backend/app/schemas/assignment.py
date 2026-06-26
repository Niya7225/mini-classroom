from datetime import datetime

from pydantic import BaseModel


class AssignmentCreate(BaseModel):
    title: str
    description: str
    due_date: datetime


class AssignmentResponse(BaseModel):
    id: int
    title: str
    description: str
    due_date: datetime
    course_id: int
    created_at: datetime

    class Config:
        from_attributes = True