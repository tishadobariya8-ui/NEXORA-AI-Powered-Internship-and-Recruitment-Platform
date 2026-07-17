from pydantic import BaseModel

class EducationUpdate(BaseModel):

    email: str
    college: str
    degree: str
    branch: str
    currentYear: str
    graduationYear: str
    cgpa: str