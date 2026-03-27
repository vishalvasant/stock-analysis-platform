from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base
from routers import auth

# Create tables (for development; in production use migrations)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Stock Analysis API", version="1.0.0")

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Stock Analysis API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/protected")
def protected_route(current_user: dict = Depends(auth.get_current_user)):
    return {"message": f"Hello {current_user.username}"}