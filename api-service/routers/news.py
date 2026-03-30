"""
News Router
API endpoints for fetching and managing news articles
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from models import NewsArticle
from schemas import (
    NewsArticleResponse, 
    NewsFetchRequest, 
    NewsFetchResponse,
    NewsListResponse
)
from services.news_scraper import news_scraper_service, TheHinduScraper
from auth import get_current_user
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/news", tags=["news"])


@router.post("/fetch", response_model=NewsFetchResponse)
async def fetch_news(
    request: NewsFetchRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Fetch latest news from specified source and store in database
    
    - **source**: News source to fetch from ('the_hindu', 'all')
    - **limit**: Maximum number of articles to fetch (default: 10)
    """
    try:
        source = request.source or 'the_hindu'
        limit = request.limit or 10
        
        logger.info(f"Fetching news from source: {source}, limit: {limit}")
        
        # Fetch articles based on source
        if source == 'all':
            articles_data = news_scraper_service.fetch_all_news(limit_per_source=limit)
        else:
            articles_data = news_scraper_service.fetch_from_source(source, limit=limit)
        
        if not articles_data:
            return NewsFetchResponse(
                message="No articles found",
                articles_fetched=0,
                articles_saved=0,
                source=source
            )
        
        # Save articles to database (skip duplicates based on URL)
        saved_count = 0
        for article_data in articles_data:
            try:
                # Check if article already exists
                existing = db.query(NewsArticle).filter(
                    NewsArticle.url == article_data['url']
                ).first()
                
                if existing:
                    logger.info(f"Article already exists: {article_data['title'][:50]}...")
                    continue
                
                # Create new article
                new_article = NewsArticle(
                    title=article_data['title'],
                    summary=article_data.get('summary', ''),
                    content=article_data.get('content', ''),
                    url=article_data['url'],
                    source=article_data['source'],
                    category=article_data.get('category', 'business'),
                    published_at=article_data.get('published_at')
                )
                
                db.add(new_article)
                saved_count += 1
                logger.info(f"Saved article: {article_data['title'][:50]}...")
                
            except Exception as e:
                logger.error(f"Error saving article: {str(e)}")
                continue
        
        db.commit()
        
        return NewsFetchResponse(
            message=f"Successfully fetched and saved news articles",
            articles_fetched=len(articles_data),
            articles_saved=saved_count,
            source=source
        )
        
    except Exception as e:
        logger.error(f"Error fetching news: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch news: {str(e)}")


@router.get("/articles", response_model=NewsListResponse)
async def get_news_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    source: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """
    Get news articles from database with filtering options
    
    - **skip**: Number of articles to skip (pagination)
    - **limit**: Maximum number of articles to return
    - **source**: Filter by news source
    - **category**: Filter by category
    """
    try:
        query = db.query(NewsArticle)
        
        # Apply filters
        if source:
            query = query.filter(NewsArticle.source == source)
        if category:
            query = query.filter(NewsArticle.category == category)
        
        # Order by fetched_at (newest first)
        query = query.order_by(NewsArticle.fetched_at.desc())
        
        # Get total count
        total = query.count()
        
        # Get paginated results
        articles = query.offset(skip).limit(limit).all()
        
        return NewsListResponse(
            total=total,
            articles=articles
        )
        
    except Exception as e:
        logger.error(f"Error fetching articles: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch articles: {str(e)}")


@router.get("/articles/{article_id}", response_model=NewsArticleResponse)
async def get_article_by_id(
    article_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get a specific news article by ID"""
    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    return article


@router.delete("/articles/{article_id}")
async def delete_article(
    article_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete a news article (admin only)"""
    article = db.query(NewsArticle).filter(NewsArticle.id == article_id).first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    db.delete(article)
    db.commit()
    
    return {"message": "Article deleted successfully"}


@router.get("/sources")
async def get_available_sources(
    current_user = Depends(get_current_user)
):
    """Get list of available news sources"""
    return {
        "sources": [
            {
                "id": "the_hindu",
                "name": "The Hindu",
                "url": "https://www.thehindu.com/business/",
                "description": "Indian business news from The Hindu"
            }
        ]
    }
