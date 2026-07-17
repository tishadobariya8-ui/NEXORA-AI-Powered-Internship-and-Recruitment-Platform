from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

client = AsyncIOMotorClient(MONGO_URL)

database = client["nexora"]
users_collection = database["users"]
internships_collection = database["internships"]
applications_collection = database["applications"]
saved_collection = database["saved_internships"]