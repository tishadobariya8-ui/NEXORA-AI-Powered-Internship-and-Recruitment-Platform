from pydantic import BaseModel
from typing import List


class BasicProfile(BaseModel):
    fullName: str
    email: str
    mobile: str
    college: str
    degree: str
    branch: str
    currentYear: str
    graduationYear: str
    cgpa: str
    skills: List[str]
    linkedin: str
    github: str
    portfolio: str
    leetcode: str
    hackerrank: str