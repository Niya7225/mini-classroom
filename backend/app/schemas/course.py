from pydantic import BaseModel


class CourseCreate(BaseModel):
    title: str
    description: str | None = None

class CourseUpdate(BaseModel):
    title: str
    description: str
class TeacherResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True
class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    teacher_id: int
    teacher: TeacherResponse

    class Config:
        from_attributes = True