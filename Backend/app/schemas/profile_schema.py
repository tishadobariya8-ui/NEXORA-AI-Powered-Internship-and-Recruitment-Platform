from pydantic import BaseModel
from typing import List, Optional

class BasicProfile(BaseModel):
    fullName: str
    email: str
    mobile: str

    college: str = ""
    degree: str = ""
    branch: str = ""
    currentYear: Optional[str] = ""
    graduationYear: str = ""
    cgpa: Optional[str] = ""

    skills: List[str] = []

    linkedin: str = ""
    github: str = ""
    portfolio: Optional[str] = ""
    leetcode: Optional[str] = ""
    hackerrank: Optional[str] = ""