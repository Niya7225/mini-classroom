from pydantic import BaseModel


class CourseCreate(BaseModel):
    title: str
    description: str | None = None

class CourseUpdate(BaseModel):
    title: str
    description: str

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str | None
    teacher_id: int

    class Config:
        from_attributes = True