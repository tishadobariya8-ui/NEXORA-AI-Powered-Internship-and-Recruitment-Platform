from fastapi import APIRouter
from datetime import datetime
from typing import List

from app.database.connection import internships_collection
from app.schemas.internship_schema import InternshipCreate
from fastapi import HTTPException
from bson import ObjectId

router = APIRouter()

@router.post("/create")
async def create_internship(data: InternshipCreate):

    internship = {
        "title": data.title,
        "company": data.company,
        "location": data.location,
        "workMode": data.workMode,
        "stipend": data.stipend,
        "duration": data.duration,
        "skills": data.skills,
        "description": data.description,
        "createdAt": datetime.utcnow()
    }

    result = await internships_collection.insert_one(
        internship
    )

    return {
        "success": True,
        "message": "Internship Created Successfully",
        "id": str(result.inserted_id)
    }

@router.get("/")
async def get_all_internships():
    internships = []
    cursor = internships_collection.find()
    async for internship in cursor:
        internship["_id"] = str(internship["_id"])
        internships.append(internship)
    return internships

@router.get("/{internship_id}")
async def get_internship(internship_id: str):
    internship = await internships_collection.find_one(
        {
            "_id": ObjectId(internship_id)
        }
    )

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )
    internship["_id"] = str(internship["_id"])
    return internship

@router.post("/create-many")
async def create_many_internships(data: List[InternshipCreate]):

    internships = []

    for item in data:
        internships.append({
            "title": item.title,
            "company": item.company,
            "location": item.location,
            "workMode": item.workMode,
            "stipend": item.stipend,
            "duration": item.duration,
            "skills": item.skills,
            "description": item.description,
            "createdAt": datetime.utcnow()
        })

    result = await internships_collection.insert_many(internships)

    return {
        "success": True,
        "message": f"{len(result.inserted_ids)} internships created successfully."
    }