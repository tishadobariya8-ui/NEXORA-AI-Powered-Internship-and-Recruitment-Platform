from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import os
import shutil

from app.database.connection import users_collection
from app.schemas.about_schema import AboutUpdate
from app.schemas.career_schema import CareerUpdate
from app.schemas.education_schema import EducationUpdate
from app.schemas.profile_schema import BasicProfile
from app.schemas.skills_schema import SkillsUpdate
from app.schemas.social_schema import SocialUpdate

router = APIRouter()

# -------------------------------
# BASIC INFORMATION
# -------------------------------

@router.put("/basic")
async def update_basic(data: BasicProfile):

    db_user = await users_collection.find_one({"email": data.email})

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set":{
                "fullName": data.fullName,
                "mobile": data.mobile,
                "profileCompleted": True
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Basic Information Updated Successfully"
    }


# EDUCATION

@router.put("/education")
async def update_education(data: EducationUpdate):

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "college": data.college,
                "degree": data.degree,
                "branch": data.branch,
                "currentYear": data.currentYear,
                "cgpa": data.cgpa,
                "graduationYear": data.graduationYear
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Education Updated Successfully"
    }

@router.put("/career")
async def update_career(data: CareerUpdate):

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "preferredRole": data.preferredRole,
                "preferredLocation": data.preferredLocation,
                # "internshipType": data.internshipType,
                "workMode": data.workMode,
                "expectedStipend": data.expectedStipend,
                "availableFrom": data.availableFrom
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Career Updated Successfully"
    }

@router.put("/skills")
async def update_skills(data: SkillsUpdate):

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "skills": data.skills
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Skills Updated Successfully"
    }

@router.put("/about")
async def update_about(data: AboutUpdate):

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "about": data.about
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "About Updated Successfully"
    }

@router.put("/social")
async def update_social(data: SocialUpdate):

    result = await users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "linkedin": data.linkedin,
                "github": data.github,
                "portfolio": data.portfolio
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Social Links Updated Successfully"
    }

@router.post("/resume")
async def upload_resume(
    email: str = Form(...),
    file: UploadFile = File(...)
):

    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    os.makedirs("uploads", exist_ok=True)

    safe_email = email.replace("@", "_").replace(".", "_")
    file_path = f"uploads/{safe_email}_{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = await users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "resume": file_path
            }
        }
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "success": True,
        "message": "Resume Uploaded Successfully",
        "resume": file_path,
        "resumeName": os.path.basename(file_path)
    }

@router.get("/me")
async def get_profile(email: str):

    user = await users_collection.find_one(
        {
            "email": email
        },
        {
            "_id": 0,
            "password": 0
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user