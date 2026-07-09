import json
from app.ai.gemini_config import model

def analyze_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Resume:
{resume_text}

Return ONLY valid JSON.

Format:
{{
    "score": 85,
    "strengths": [
        "...",
        "...",
        "..."
    ],
    "weaknesses": [
        "...",
        "...",
        "..."
    ],
    "missing_skills": [
        "...",
        "...",
        "..."
    ],
    "suggestions": [
        "...",
        "...",
        "..."
    ],
    "career_recommendation": "..."
}}
"""
    response = model.generate_content(prompt)

    result = response.text.strip()

    # Gemini sometimes wraps JSON inside ```json ... ```
    result = result.replace("```json", "")
    result = result.replace("```", "")
    result = result.strip()

    return json.loads(result)

def match_resume_with_job(
    resume_text,
    job_description
):

    import json
    prompt = f"""
You are an expert ATS and Recruitment AI.
Compare the resume with the internship description.

Resume

{resume_text}

Internship Description

{job_description}

Return ONLY valid JSON.

{{
    "match_score":90,

    "strengths":[
        "...",
        "...",
        "..."
    ],

    "missing_skills":[
        "...",
        "...",
        "..."
    ],

    "recommendation":"..."
}}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    result = result.replace("```json", "")
    result = result.replace("```", "")

    return json.loads(result)

def generate_cover_letter(
    resume_text,
    internship
):

    import json

    prompt = f"""
You are an expert HR recruiter.

Write a professional internship cover letter.

Student Resume

{resume_text}

Internship

Title:
{internship.get("title")}

Company:
{internship.get("company")}

Description:
{internship.get("description")}

Required Skills:
{", ".join(internship.get("skills", []))}

Return ONLY JSON.

{{
    "cover_letter":"..."
}}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    result = result.replace("```json","")
    result = result.replace("```","")

    return json.loads(result)

def generate_interview_questions(
    resume_text,
    internship
):

    import json

    prompt = f"""
You are an expert technical interviewer.

Based on the student's resume and internship description,
generate interview preparation questions.

For every question provide:

- interview question
- ideal answer (80-120 words)
- one interview tip

Resume

{resume_text}

Internship

Title:
{internship.get("title")}

Company:
{internship.get("company")}

Description:
{internship.get("description")}

Required Skills:
{", ".join(internship.get("skills", []))}

Return ONLY valid JSON.

{{
    "technical":[
        {{
            "question":"...",
            "answer":"...",
            "tip":"..."
        }}
    ],

    "hr":[
        {{
            "question":"...",
            "answer":"...",
            "tip":"..."
        }}
    ],

    "project":[
        {{
            "question":"...",
            "answer":"...",
            "tip":"..."
        }}
    ]
}}
"""

    response = model.generate_content(prompt)

    result = response.text.strip()

    result = result.replace("```json","")
    result = result.replace("```","")

    return json.loads(result)