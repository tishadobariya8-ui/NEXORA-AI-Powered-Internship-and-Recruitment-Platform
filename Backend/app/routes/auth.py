from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from app.database.connection import users_collection
from app.schemas.user_schema import UserSignup
from app.models.user_model import create_user
from app.schemas.login_schema import UserLogin
from app.utils.auth import create_access_token

router = APIRouter()
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

@router.post("/signup")
async def signup(user: UserSignup):

    existing_user = await users_collection.find_one(
        {"email": user.email}
    )
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = pwd_context.hash(
        user.password
    )
    new_user = create_user(
        user,
        hashed_password
    )
    result = await users_collection.insert_one(
        new_user
    )

    token = create_access_token(
        {
            "email": user.email,
            "user_id": str(result.inserted_id)
        }
    )
    
    return {
        "success": True,
        "message": "Signup Successful",
        "access_token": token,
        "user": {
            "fullName": user.fullName,
            "email": user.email,
            "mobile": user.mobile,
            "role": user.role,
            "profileCompleted": False
        }
    }

@router.post("/login")
async def login(user: UserLogin):

    db_user = await users_collection.find_one(
        {
            "email": user.email
        }
    )

    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid Email or Password"
        )

    if not pwd_context.verify(
        user.password,
        db_user["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid Email or Password"
        )

    token = create_access_token(
        {
            "email": db_user["email"],
            "user_id": str(db_user["_id"])
        }
    )

    return {
        "success": True,
        "message": "Login Successful",
        "access_token": token,
        "user": {
            "fullName": db_user["fullName"],
            "email": db_user["email"],
            "role": db_user["role"],
            "profileCompleted": db_user["profileCompleted"]
        }
    }