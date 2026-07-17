from pydantic import BaseModel

class SaveInternship(BaseModel):
    user_email: str
    internship_id: str