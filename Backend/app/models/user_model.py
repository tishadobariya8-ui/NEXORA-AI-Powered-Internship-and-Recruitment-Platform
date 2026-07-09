from app.schemas.user_schema import UserSignup

def create_user(user: UserSignup, hashed_password: str):

    return {
        "fullName": user.fullName,
        "email": user.email,
        "password": hashed_password,
        "mobile": user.mobile,
        "role": user.role,
        "college": "",
        "degree": "",
        "branch": "",
        "graduationYear": "",
        "skills": [],
        "linkedin": "",
        "github": "",
        "resume": "",
        "profileCompleted": False
    }