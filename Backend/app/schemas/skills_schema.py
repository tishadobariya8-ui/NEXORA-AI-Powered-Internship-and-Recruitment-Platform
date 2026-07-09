from pydantic import BaseModel
from typing import List


class SkillsUpdate(BaseModel):
    email: str
    skills: List[str]