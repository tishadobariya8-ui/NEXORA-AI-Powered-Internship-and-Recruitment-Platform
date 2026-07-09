from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):

    fullName: str
    email: EmailStr
    password: str
    mobile: str
    role: str