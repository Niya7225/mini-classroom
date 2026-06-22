from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.db.database import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100), nullable=False)

    description = Column(Text)

    teacher_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    teacher = relationship(
        "User",
        back_populates="courses"
    )