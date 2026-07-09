from fastapi import APIRouter, HTTPException
from datetime import datetime
from bson import ObjectId

from app.database.connection import (
    applications_collection,
    internships_collection,
    users_collection
)

from app.schemas.application_schema import ApplyInternship

router = APIRouter()

@router.post("/apply")
async def apply_internship(data: ApplyInternship):

    # Check if student exists
    student = await users_collection.find_one(
        {"email": data.email}
    )

    if not student:
        raise HTTPException(
            status_code=404,
            detail="Student not found"
        )

    # Check if internship exists
    internship = await internships_collection.find_one(
        {"_id": ObjectId(data.internshipId)}
    )

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    # Check duplicate application
    existing_application = await applications_collection.find_one(
        {
            "email": data.email,
            "internshipId": data.internshipId
        }
    )

    if existing_application:
        raise HTTPException(
            status_code=400,
            detail="You have already applied for this internship."
        )

    # Save application
    application = {
        "email": data.email,
        "internshipId": data.internshipId,
        "appliedAt": datetime.utcnow()
    }

    await applications_collection.insert_one(application)

    return {
        "success": True,
        "message": "Application submitted successfully."
    }

@router.get("/my-applications")
async def get_my_applications(email: str):

    applications = []

    cursor = applications_collection.find(
        {
            "email": email
        }
    )

    async for application in cursor:

        internship = await internships_collection.find_one(
            {
                "_id": ObjectId(application["internshipId"])
            }
        )

        if internship:

            internship["_id"] = str(internship["_id"])

            internship["appliedAt"] = application["appliedAt"]

            applications.append(internship)

    return applications

@router.get("/check")
async def check_application(
    email: str,
    internshipId: str
):

    application = await applications_collection.find_one(
        {
            "email": email,
            "internshipId": internshipId
        }
    )

    return {
        "applied": application is not None
    }