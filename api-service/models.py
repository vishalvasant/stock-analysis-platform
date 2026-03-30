from sqlalchemy import Column, Integer, String, DateTime, Text, Float
from sqlalchemy.sql import func
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class NewsArticle(Base):
    __tablename__ = "news_articles"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    url = Column(String, unique=True, nullable=False)
    source = Column(String, nullable=False)  # e.g., 'the_hindu', 'economic_times'
    category = Column(String, nullable=True)  # business, markets, economy
    published_at = Column(DateTime(timezone=True), nullable=True)
    fetched_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Sentiment analysis fields (to be filled later)
    sentiment_score = Column(Float, nullable=True)  # -1.0 to 1.0
    sentiment_label = Column(String, nullable=True)  # positive, negative, neutral
    
    # Related stocks/sectors
    related_stocks = Column(String, nullable=True)  # Comma-separated stock symbols
    related_sectors = Column(String, nullable=True)  # Comma-separated sectors