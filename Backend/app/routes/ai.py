import os

from bson import ObjectId
from fastapi import APIRouter, HTTPException
from app.database.connection import (users_collection, internships_collection)
from app.utils.pdf_reader import extract_text_from_pdf
from app.ai.analyzer import (analyze_resume, match_resume_with_job, generate_cover_letter, generate_interview_questions)
from google.api_core.exceptions import ResourceExhausted

router = APIRouter(
    prefix="/api/ai",
    tags=["AI"]
)

@router.post("/resume-analyzer")
async def resume_analyzer(email: str):

    # Find user
    user = await users_collection.find_one(
        {"email": email}
    )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Check if analysis already exists

    saved_analysis = user.get("ai_analysis")
    if saved_analysis:
        return {
            "success": True,
            "analysis": saved_analysis
        }

    # Check resume
    resume_path = user.get("resume")

    if not resume_path:
        raise HTTPException(
            status_code=404,
            detail="Please upload your resume first."
        )

    try:
        with open(resume_path, "rb") as pdf:
            resume_text = extract_text_from_pdf(pdf)

        if not resume_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from resume."
            )

        analysis = analyze_resume(resume_text)

        # Save analysis into MongoDB

        await users_collection.update_one(
            {"_id": user["_id"]},
            {
                "$set": {
                    "ai_analysis": analysis
                }
            }
        )

        return {
            "success": True,
            "analysis": analysis
        }

    except ResourceExhausted:

        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please try again later."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    
@router.post("/job-match")
async def job_match(
    email: str,
    internship_id: str
):

    # Find User
    user = await users_collection.find_one(
        {
            "email": email
        }
    )
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    # ----------------------------
    # Check Cached Job Match
    # ----------------------------

    saved_matches = user.get("job_matches", {})

    if internship_id in saved_matches:
        return {
            "success": True,
            "analysis": saved_matches[internship_id]
        }

    # Resume

    resume_path = user.get("resume")

    if not resume_path:
        raise HTTPException(
            status_code=404,
            detail="Please upload your resume."
        )

    # Internship

    internship = await internships_collection.find_one(
        {
            "_id": ObjectId(internship_id)
        }
    )

    if not internship:

        raise HTTPException(
            status_code=404,
            detail="Internship not found."
        )

    # Read Resume

    with open(resume_path, "rb") as pdf:
        resume_text = extract_text_from_pdf(pdf)

    # Create Job Description

    job_description = f"""
Title: {internship.get("title")}

Company: {internship.get("company")}

Description:

{internship.get("description")}

Required Skills:

{", ".join(internship.get("skills", []))}
"""

    # Gemini

    try:

        result = match_resume_with_job(
            resume_text,
            job_description
        )

        # Save Job Match
        await users_collection.update_one(
            {
                "_id": user["_id"]
            },
            {
                "$set": {
                    f"job_matches.{internship_id}": result
                }
            }
        )
        return {
            "success": True,
            "analysis": result
        }

    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please try again later."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/cover-letter")
async def cover_letter(
    email: str,
    internship_id: str
):

    user = await users_collection.find_one(
        {"email": email}
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Check Cached Cover Letter

    saved_letters = user.get(
        "cover_letters",
        {}
    )

    if internship_id in saved_letters:
        return {
            "success": True,
            "cover_letter": saved_letters[internship_id]
        }

    resume_path = user.get("resume")

    if not resume_path:
        raise HTTPException(
            status_code=404,
            detail="Please upload resume."
        )

    internship = await internships_collection.find_one(
        {
            "_id": ObjectId(internship_id)
        }
    )

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found."
        )

    with open(resume_path, "rb") as pdf:
        resume_text = extract_text_from_pdf(pdf)

    try:

        result = generate_cover_letter(
            resume_text,
            internship
        )

        # Save Cover Letter

        await users_collection.update_one(
            {
                "_id": user["_id"]
            },
            {
                "$set": {
                    f"cover_letters.{internship_id}": result
                }
            }
        )

        return {
            "success": True,
            "cover_letter": result
        }

    except ResourceExhausted:

        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please try again later."
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

@router.post("/interview-questions")
async def interview_questions(
    email: str,
    internship_id: str
):

    # Find User
    user = await users_collection.find_one(
        {
            "email": email
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    
    # Check Cached Interview Questions

    saved_questions = user.get(
        "interview_questions",
        {}
    )
    if internship_id in saved_questions:
        return {
            "success": True,
            "questions": saved_questions[internship_id]
        }

    # Check Resume
    resume_path = user.get("resume")

    if not resume_path:
        raise HTTPException(
            status_code=404,
            detail="Please upload your resume."
        )

    # Find Internship
    internship = await internships_collection.find_one(
        {
            "_id": ObjectId(internship_id)
        }
    )

    if not internship:
        raise HTTPException(
            status_code=404,
            detail="Internship not found."
        )

    # Read Resume
    with open(resume_path, "rb") as pdf:

        resume_text = extract_text_from_pdf(pdf)

    # Generate Questions
    try:

        result = generate_interview_questions(
            resume_text,
            internship
        )

        # Save Interview Questions
        await users_collection.update_one(
            {
                "_id": user["_id"]
            },
            {
                "$set": {
                    f"interview_questions.{internship_id}": result
                }
            }
        )

        return {
            "success": True,
            "questions": result
        }

    except ResourceExhausted:
        raise HTTPException(
            status_code=429,
            detail="Gemini API quota exceeded. Please try again later."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )