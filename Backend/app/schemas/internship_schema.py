from pydantic import BaseModel
from typing import List


class InternshipCreate(BaseModel):
    title: str
    company: str
    location: str
    workMode: str
    stipend: str
    duration: str
    skills: List[str]
    description: str