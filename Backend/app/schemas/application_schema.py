from pydantic import BaseModel

class ApplyInternship(BaseModel):
    email: str
    internshipId: str