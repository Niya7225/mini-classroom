from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)

    due_date = Column(DateTime(timezone=True), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    course_id = Column(
        Integer,
        ForeignKey("courses.id"),
        nullable=False
    )

    course = relationship(
        "Course",
        back_populates="assignments"
    )