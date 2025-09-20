from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import os
from datetime import datetime
import uuid

app = FastAPI(title="B.Goutham Portfolio API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/portfolio_db')
client = AsyncIOMotorClient(MONGO_URL)
db = client.portfolio_db

# Pydantic models
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

class PersonalInfo(BaseModel):
    name: str
    title: str
    summary: str
    email: str
    linkedin: str
    location: str

class Skill(BaseModel):
    name: str
    level: str
    category: str

class Certification(BaseModel):
    name: str
    issuer: str
    date: str
    description: Optional[str] = None

class Achievement(BaseModel):
    title: str
    description: str
    date: str

class Project(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    technologies: List[str]
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None

# API Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Portfolio API is running"}

@app.get("/api/personal-info")
async def get_personal_info():
    try:
        info = await db.personal_info.find_one({})
        if info:
            info['_id'] = str(info['_id'])
            return info
        return {
            "name": "B.Goutham",
            "title": "BCA Student & Technology Enthusiast | KL University",
            "summary": "I am a dedicated second-year Bachelor of Computer Applications student at KL University with a passion for emerging technologies and hands-on problem-solving. Through active participation in professional organizations, competitive programming, and practical projects, I've developed a strong foundation in computer science while building valuable industry connections and leadership experience.",
            "email": "gurugoutham05@gmail.com",
            "linkedin": "https://www.linkedin.com/in/b-goutham-251726326",
            "location": "KL University, India"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/skills")
async def get_skills():
    try:
        skills = await db.skills.find({}).to_list(length=None)
        for skill in skills:
            skill['_id'] = str(skill['_id'])
        return skills or [
            {"name": "C Programming", "level": "Intermediate", "category": "Programming"},
            {"name": "Java OOPs", "level": "Intermediate", "category": "Programming"},
            {"name": "Python", "level": "Intermediate", "category": "Programming"},
            {"name": "HTML", "level": "Intermediate", "category": "Web Development"},
            {"name": "CSS", "level": "Intermediate", "category": "Web Development"},
            {"name": "Database Management Systems (DBMS)", "level": "Intermediate", "category": "Database"},
            {"name": "Computer Networks", "level": "Intermediate", "category": "Networking"},
            {"name": "Oracle Cloud Infrastructure", "level": "Foundation", "category": "Cloud"},
            {"name": "Artificial Intelligence", "level": "Foundation", "category": "AI/ML"},
            {"name": "Problem Solving", "level": "Advanced", "category": "Core"},
            {"name": "Team Leadership", "level": "Intermediate", "category": "Soft Skills"},
            {"name": "Technical Documentation", "level": "Intermediate", "category": "Communication"}
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/certifications")
async def get_certifications():
    try:
        certs = await db.certifications.find({}).to_list(length=None)
        for cert in certs:
            cert['_id'] = str(cert['_id'])
        return certs or [
            {
                "name": "Oracle OCI AI Foundation Certificate",
                "issuer": "Oracle",
                "date": "2024",
                "description": "Demonstrating proficiency in cloud computing and artificial intelligence fundamentals"
            },
            {
                "name": "Cisco Beginner-Level C Programming Certificate",
                "issuer": "Cisco",
                "date": "2024",
                "description": "Solid foundation in systems programming and algorithmic thinking"
            }
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/achievements")
async def get_achievements():
    try:
        achievements = await db.achievements.find({}).to_list(length=None)
        for achievement in achievements:
            achievement['_id'] = str(achievement['_id'])
        return achievements or [
            {
                "title": "Internal Hackathon Winner",
                "description": "Successfully led a team to victory in our college's Smart India Hackathon qualifying event, showcasing problem-solving abilities, teamwork, and innovation under pressure.",
                "date": "2024"
            },
            {
                "title": "ACM Student Member",
                "description": "Actively engaged in the global computing community, participating in technical sessions, workshops, and networking events.",
                "date": "2023-Present"
            },
            {
                "title": "IEEE Documentation Team Member",
                "description": "Contributing to technical documentation while developing professional writing skills and attention to detail.",
                "date": "2023-Present"
            }
        ]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/projects")
async def get_projects():
    try:
        projects = await db.projects.find({}).to_list(length=None)
        for project in projects:
            project['_id'] = str(project['_id'])
        return projects or []
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/contact")
async def submit_contact_message(message: ContactMessage):
    try:
        message_dict = message.dict()
        message_dict['id'] = str(uuid.uuid4())
        message_dict['timestamp'] = datetime.utcnow()
        message_dict['status'] = 'new'
        
        result = await db.contact_messages.insert_one(message_dict)
        return {"message": "Contact message sent successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/projects")
async def create_project(project: Project):
    try:
        project_dict = project.dict()
        project_dict['id'] = str(uuid.uuid4())
        project_dict['created_at'] = datetime.utcnow()
        
        result = await db.projects.insert_one(project_dict)
        return {"message": "Project created successfully", "id": str(result.inserted_id)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)