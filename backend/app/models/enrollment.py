from sqlalchemy import Column, ForeignKey, Integer, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
        nullable=False
    )

    enrolled_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    student = relationship(
    "User",
    back_populates="enrollments",
    foreign_keys=[student_id]
    )

    course = relationship(
        "Course",
        back_populates="enrollments"
    )