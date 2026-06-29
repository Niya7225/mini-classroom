from datetime import datetime

from pydantic import BaseModel


class SubmissionCreate(BaseModel):
    content: str


class SubmissionResponse(BaseModel):
    id: int
    assignment_id: int
    student_id: int
    content: str
    grade: float | None
    submitted_at: datetime

    class Config:
        from_attributes = True

class SubmissionGrade(BaseModel):
    grade: float