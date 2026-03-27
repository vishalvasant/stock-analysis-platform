from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base
from routers import auth
from auth import get_current_user
from schemas import MessageResponse, HealthResponse, User

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

app.include_router(auth.router)

@app.get("/", response_model=MessageResponse, tags=["health"])
def read_root():
    """Welcome endpoint - returns API introduction message"""
    return {"message": "Welcome to Stock Analysis API"}

@app.get("/health", response_model=HealthResponse, tags=["health"])
def health_check():
    """Health check endpoint - verify API is running and database is connected"""
    return {"status": "healthy"}

@app.get("/protected", response_model=User, tags=["auth"])
def protected_route(current_user: User = Depends(get_current_user)):
    """Protected route - requires valid JWT token. Returns current user information"""
    return current_user