from pydantic import BaseModel


class AboutUpdate(BaseModel):
    email: str
    about: str