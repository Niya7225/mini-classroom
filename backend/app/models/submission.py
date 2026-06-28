from sqlalchemy import Column, Integer, Float, ForeignKey, Text, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)

    assignment_id = Column(
        Integer,
        ForeignKey("assignments.id"),
        nullable=False
    )

    student_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    content = Column(
        Text,
        nullable=False
    )
    grade = Column(
        Float,
        nullable=True
    )    

    submitted_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    assignment = relationship(
        "Assignment",
        back_populates="submissions"
    )

    student = relationship(
        "User",
        back_populates="submissions"
    )