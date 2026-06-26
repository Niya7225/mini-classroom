from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.db.database import get_db
from app.models.assignment import Assignment
from app.models.course import Course
from app.models.user import User
from app.schemas.assignment import AssignmentCreate, AssignmentResponse

router = APIRouter(
    prefix="/courses",
    tags=["Assignments"]
)

@router.post(
    "/{course_id}/assignments",
    response_model=AssignmentResponse,
    status_code=status.HTTP_201_CREATED
)
def create_assignment(
    course_id: int,
    assignment_data: AssignmentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
  if current_user.role != "teacher":
      raise HTTPException(
          status_code=status.HTTP_403_FORBIDDEN,
          detail="Only teachers can create assignments"
      )
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
  if course.teacher_id != current_user.id:
      raise HTTPException(
          status_code=status.HTTP_403_FORBIDDEN,
          detail="You cannot add assignments to this course"
      )
  new_assignment = Assignment(
      title=assignment_data.title,
      description=assignment_data.description,
      due_date=assignment_data.due_date,
      course_id=course.id
  )
  db.add(new_assignment)
  db.commit()
  db.refresh(new_assignment)
  return new_assignment
    
@router.get(
    "/{course_id}/assignments",
    response_model=list[AssignmentResponse]
)
def get_course_assignments(
    course_id: int,
    db: Session = Depends(get_db)
):

    course = db.query(Course).filter(
        Course.id == course_id
    ).first()

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    assignments = db.query(Assignment).filter(
        Assignment.course_id == course_id
    ).all()

    return assignments