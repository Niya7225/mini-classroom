from pydantic import BaseModel


class CourseCreate(BaseModel):
    title: str
    description: str | None = None


class CourseResponse(BaseModel):
    id: int
    title: str
    description: str | None
    teacher_id: int

    class Config:
        from_attributes = True