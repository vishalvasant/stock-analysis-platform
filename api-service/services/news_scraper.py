"""
News Scraper Service
Fetches news from various sources like The Hindu, Economic Times, etc.
"""
import requests
from bs4 import BeautifulSoup
from datetime import datetime
from typing import List, Dict, Optional
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class NewsScraper:
    """Base class for news scrapers"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })

class TheHinduScraper(NewsScraper):
    """Scraper for The Hindu business news"""
    
    BASE_URL = "https://www.thehindu.com"
    BUSINESS_URL = "https://www.thehindu.com/business/"
    
    def fetch_business_news(self, limit: int = 10) -> List[Dict]:
        """
        Fetch latest business news from The Hindu
        
        Args:
            limit: Maximum number of articles to fetch
            
        Returns:
            List of article dictionaries
        """
        try:
            logger.info(f"Fetching news from {self.BUSINESS_URL}")
            response = self.session.get(self.BUSINESS_URL, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            articles = []
            seen_urls = set()
            
            # Find all links containing business articles
            all_links = soup.find_all('a', href=True)
            
            for link in all_links:
                href = link.get('href', '')
                
                # Filter for business article URLs
                if '/business/' in href and '/article' in href:
                    # Make URL absolute
                    if href.startswith('/'):
                        full_url = f"{self.BASE_URL}{href}"
                    elif href.startswith('http'):
                        full_url = href
                    else:
                        full_url = f"{self.BASE_URL}/{href}"
                    
                    # Skip duplicates
                    if full_url in seen_urls:
                        continue
                    seen_urls.add(full_url)
                    
                    # Get title
                    title = link.get_text(strip=True)
                    
                    # Skip if no valid title
                    if not title or len(title) < 15:
                        continue
                    
                    # Clean up title
                    title = title.replace('\n', ' ').replace('\t', ' ')
                    
                    article = {
                        'title': title,
                        'summary': '',
                        'url': full_url,
                        'source': 'the_hindu',
                        'category': self._detect_category(href),
                        'published_at': None,
                        'content': ''
                    }
                    
                    articles.append(article)
                    
                    if len(articles) >= limit:
                        break
            
            logger.info(f"Successfully fetched {len(articles)} articles")
            return articles
            
        except requests.RequestException as e:
            logger.error(f"Error fetching news from The Hindu: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return []
    
    def _detect_category(self, url: str) -> str:
        """Detect news category from URL"""
        if '/markets/' in url:
            return 'markets'
        elif '/industry/' in url:
            return 'industry'
        elif '/economy/' in url:
            return 'economy'
        elif '/agri-business/' in url:
            return 'agri-business'
        else:
            return 'business'
    
    def _parse_article(self, element) -> Optional[Dict]:
        """Parse a single article element"""
        try:
            # Try to find title
            title_elem = element.find(['h3', 'h2', 'h1', 'a'], class_=lambda x: x and ('title' in x.lower() if x else False))
            if not title_elem:
                title_elem = element.find(['h3', 'h2', 'h1'])
            
            # If element is an anchor tag itself
            if element.name == 'a':
                title = element.get_text(strip=True)
                url = element.get('href', '')
            else:
                title = title_elem.get_text(strip=True) if title_elem else ''
                # Find URL
                link_elem = element.find('a', href=True)
                url = link_elem.get('href', '') if link_elem else ''
            
            # Make URL absolute
            if url and url.startswith('/'):
                url = f"{self.BASE_URL}{url}"
            elif url and not url.startswith('http'):
                url = f"{self.BASE_URL}/{url}"
            
            # Skip if no valid title or URL
            if not title or not url or len(title) < 10:
                return None
            
            # Try to find summary/description
            summary_elem = element.find(['p', 'div'], class_=lambda x: x and ('summary' in x.lower() or 'desc' in x.lower() if x else False))
            summary = summary_elem.get_text(strip=True) if summary_elem else ''
            
            # Try to find published date
            time_elem = element.find('time')
            published_at = None
            if time_elem:
                datetime_str = time_elem.get('datetime', '')
                if datetime_str:
                    try:
                        published_at = datetime.fromisoformat(datetime_str.replace('Z', '+00:00'))
                    except:
                        pass
            
            return {
                'title': title,
                'summary': summary,
                'url': url,
                'source': 'the_hindu',
                'category': 'business',
                'published_at': published_at,
                'content': ''  # Will be fetched separately if needed
            }
            
        except Exception as e:
            logger.warning(f"Error parsing article: {str(e)}")
            return None
    
    def fetch_article_content(self, url: str) -> str:
        """Fetch full content of a specific article"""
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Try multiple content selectors
            content_selectors = [
                'div.article-body',
                'div.story-details',
                'div.content',
                'article',
                'div[itemprop="articleBody"]',
                '.article-content'
            ]
            
            for selector in content_selectors:
                content_elem = soup.select_one(selector)
                if content_elem:
                    # Get all paragraphs
                    paragraphs = content_elem.find_all('p')
                    content = ' '.join([p.get_text(strip=True) for p in paragraphs])
                    return content
            
            return ''
            
        except Exception as e:
            logger.error(f"Error fetching article content: {str(e)}")
            return ''


class NewsScraperService:
    """Service to manage multiple news scrapers"""
    
    def __init__(self):
        self.scrapers = {
            'the_hindu': TheHinduScraper()
        }
    
    def fetch_all_news(self, limit_per_source: int = 10) -> List[Dict]:
        """Fetch news from all configured sources"""
        all_articles = []
        
        for source_name, scraper in self.scrapers.items():
            try:
                if isinstance(scraper, TheHinduScraper):
                    articles = scraper.fetch_business_news(limit=limit_per_source)
                    all_articles.extend(articles)
            except Exception as e:
                logger.error(f"Error fetching from {source_name}: {str(e)}")
        
        return all_articles
    
    def fetch_from_source(self, source: str, limit: int = 10) -> List[Dict]:
        """Fetch news from a specific source"""
        scraper = self.scrapers.get(source)
        if not scraper:
            logger.error(f"Unknown source: {source}")
            return []
        
        if isinstance(scraper, TheHinduScraper):
            return scraper.fetch_business_news(limit=limit)
        
        return []


# Singleton instance
news_scraper_service = NewsScraperService()
