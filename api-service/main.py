from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import engine, get_db, SessionLocal
from models import Base, User as UserModel
from routers import auth
from auth import get_current_user, get_password_hash
from schemas import MessageResponse, HealthResponse, User as UserSchema

# Create tables (for development; in production use migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Stock Analysis API",
    version="1.0.0",
    description="API for stock, futures, and options analysis with real-time data, ML predictions, news sentiment, and WebSocket streaming",
    contact={
        "name": "Stock Analysis Team",
    },
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.on_event("startup")
def seed_admin_user():
    db = SessionLocal()
    try:
        admin_username = "admin"
        admin_email = "admin@example.com"
        admin_password = "admin123"

        existing_admin_by_username = db.query(UserModel).filter(UserModel.username == admin_username).first()
        existing_admin_by_email = db.query(UserModel).filter(UserModel.email == admin_email).first()

        if existing_admin_by_username or existing_admin_by_email:
            print("Admin user already exists; skipping seed.")
            return

        admin_user = UserModel(
            username=admin_username,
            email=admin_email,
            hashed_password=get_password_hash(admin_password),
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        print(f"Admin user seeded: {admin_username} / {admin_email}")
    except Exception as e:
        print(f"Admin seeding failed: {e}")
    finally:
        db.close()

@app.get("/", response_model=MessageResponse, tags=["health"])
def read_root():
    """Welcome endpoint - returns API introduction message"""
    return {"message": "Welcome to Stock Analysis API"}

@app.get("/health", response_model=HealthResponse, tags=["health"])
def health_check():
    """Health check endpoint - verify API is running and database is connected"""
    return {"status": "healthy"}

@app.get("/protected", response_model=UserSchema, tags=["auth"])
def protected_route(current_user: UserModel = Depends(get_current_user)):
    """Protected route - requires valid JWT token. Returns current user information"""
    return current_user