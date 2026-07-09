from pydantic import BaseModel

class SocialUpdate(BaseModel):

    email: str

    linkedin: str
    github: str
    portfolio: str

    leetcode: str
    hackerrank: str