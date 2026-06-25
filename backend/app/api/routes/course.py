from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.course import Course
from app.models.enrollment import Enrollment
from app.models.user import User
from app.schemas.course import CourseCreate, CourseResponse, CourseUpdate
from app.schemas.enrollment import EnrollmentResponse


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
    "/my-teaching",
    response_model=list[CourseResponse]
)
def get_my_courses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "teacher":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can view teaching courses"
        )


    courses = db.query(Course).filter(
        Course.teacher_id == current_user.id
    ).all()


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

@router.post(
    "",
    response_model=CourseResponse,
    status_code=status.HTTP_201_CREATED
)
def create_course(
    course_data: CourseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != "teacher":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only teachers can create courses"
        )

    new_course = Course(
        title=course_data.title,
        description=course_data.description,
        teacher_id=current_user.id
    )

    db.add(new_course)
    db.commit()
    db.refresh(new_course)

    return new_course

@router.put(
    "/{course_id}",
    response_model=CourseResponse
)
def update_course(
    course_id: int,
    course_data: CourseUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    if course.teacher_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot edit this course"
        )

    course.title = course_data.title
    course.description = course_data.description

    db.commit()
    db.refresh(course)

    return course
@router.delete("/{course_id}")
def delete_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    if course.teacher_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You cannot delete this course"
        )

    db.delete(course)
    db.commit()

    return {
        "message": "Course deleted successfully"
    }
