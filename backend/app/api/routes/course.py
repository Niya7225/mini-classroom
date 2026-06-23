from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.course import Course
from app.schemas.course import CourseResponse

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)

@router.get(
    "",
    response_model=list[CourseResponse]
)
def get_courses(
    db: Session = Depends(get_db)
):
    courses = db.query(Course).all()

    return courses

@router.get(
    "/{course_id}",
    response_model=CourseResponse
)
def get_course(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = (
        db.query(Course)
        .filter(Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    return course