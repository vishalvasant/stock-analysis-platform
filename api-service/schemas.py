from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    """Base user schema with common fields"""
    email: EmailStr
    username: str

class UserCreate(UserBase):
    """Schema for user registration"""
    password: str

class User(UserBase):
    """User response schema"""
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    """Authentication token response"""
    access_token: str
    token_type: str

class TokenData(BaseModel):
    """Token payload data"""
    username: Optional[str] = None

class HealthResponse(BaseModel):
    """Health check response"""
    status: str

class MessageResponse(BaseModel):
    """Generic message response"""
    message: str