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


# News Article Schemas
class NewsArticleBase(BaseModel):
    """Base news article schema"""
    title: str
    summary: Optional[str] = None
    url: str
    source: str
    category: Optional[str] = None
    published_at: Optional[datetime] = None

class NewsArticleCreate(NewsArticleBase):
    """Schema for creating news article"""
    content: Optional[str] = None
    related_stocks: Optional[str] = None
    related_sectors: Optional[str] = None

class NewsArticleResponse(NewsArticleBase):
    """News article response schema"""
    id: int
    content: Optional[str] = None
    fetched_at: datetime
    sentiment_score: Optional[float] = None
    sentiment_label: Optional[str] = None
    related_stocks: Optional[str] = None
    related_sectors: Optional[str] = None

    class Config:
        from_attributes = True

class NewsFetchRequest(BaseModel):
    """Request to fetch news from sources"""
    source: Optional[str] = None  # 'the_hindu', 'all', etc.
    limit: int = 10

class NewsFetchResponse(BaseModel):
    """Response after fetching news"""
    message: str
    articles_fetched: int
    articles_saved: int
    source: str

class NewsListResponse(BaseModel):
    """Response for listing news articles"""
    total: int
    articles: list[NewsArticleResponse]