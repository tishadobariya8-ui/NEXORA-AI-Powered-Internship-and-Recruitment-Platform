from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes.auth import router as auth_router
from app.routes.profile import router as profile_router
from app.routes.internship import router as internship_router
from app.routes.application import router as application_router
from app.routes.ai import router as ai_router
from app.routes import save_internship

from fastapi import Request
from fastapi.responses import JSONResponse

load_dotenv()

app = FastAPI(
    title="NEXORA API",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/api/auth",
    tags=["Authentication"]
)

app.include_router(
    profile_router,
    prefix="/api/profile",
    tags=["Profile"]
)

app.include_router(
    internship_router,
    prefix="/api/internships",
    tags=["Internships"]
)

app.include_router(
    application_router,
    prefix="/api/applications",
    tags=["Applications"]
)
app.include_router(save_internship.router)
# AI Router
app.include_router(ai_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to NEXORA Backend"
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):

    print("========== ERROR ==========")
    print(exc)
    print("===========================")

    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)}
    )

