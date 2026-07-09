from pydantic import BaseModel


class CareerUpdate(BaseModel):
    email: str
    preferredRole: str
    preferredLocation: str
    # internshipType: str
    workMode: str
    expectedStipend: str
    availableFrom: str