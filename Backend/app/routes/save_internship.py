from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database.connection import (
    saved_collection,
    internships_collection
)

from app.schemas.save_internship_schema import SaveInternship

router = APIRouter(
    prefix="/api/save",
    tags=["Saved Internships"]
)

@router.post("/")
async def save_internship(data: SaveInternship):

    # Check if already saved
    existing = await saved_collection.find_one({
        "user_email": data.user_email,
        "internship_id": data.internship_id
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Internship already saved."
        )

    await saved_collection.insert_one({
        "user_email": data.user_email,
        "internship_id": data.internship_id
    })

    return {
        "message": "Internship saved successfully."
    }

@router.get("/{user_email}")
async def get_saved_internships(user_email: str):

    saved = await saved_collection.find({
        "user_email": user_email
    }).to_list(None)

    internships = []

    for item in saved:

        internship = await internships_collection.find_one({
            "_id": ObjectId(item["internship_id"])
        })

        if internship:
            internship["_id"] = str(internship["_id"])
            internships.append(internship)

    return internships

@router.delete("/")
async def remove_saved_internship(data: SaveInternship):

    result = await saved_collection.delete_one({
        "user_email": data.user_email,
        "internship_id": data.internship_id
    })

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Saved internship not found."
        )

    return {
        "message": "Internship removed successfully."
    }