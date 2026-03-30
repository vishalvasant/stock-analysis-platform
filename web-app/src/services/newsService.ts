import { authService } from './authService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

interface NewsArticle {
  id: number;
  title: string;
  summary: string | null;
  url: string;
  source: string;
  category: string | null;
  published_at: string | null;
  fetched_at: string;
  sentiment_score: number | null;
  sentiment_label: string | null;
}

interface NewsFetchResponse {
  message: string;
  articles_fetched: number;
  articles_saved: number;
  source: string;
}

interface NewsListResponse {
  total: number;
  articles: NewsArticle[];
}

/**
 * News Service
 * Handles API calls for news articles
 */
class NewsService {
  private getAuthHeaders(): HeadersInit {
    const token = authService.getToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  /**
   * Fetch latest news from sources and store in database
   */
  async fetchNews(source: string = 'the_hindu', limit: number = 10): Promise<NewsFetchResponse> {
    const response = await fetch(`${API_BASE_URL}/news/fetch`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ source, limit }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch news');
    }

    return response.json();
  }

  /**
   * Get stored news articles
   */
  async getArticles(skip: number = 0, limit: number = 20): Promise<NewsListResponse> {
    const response = await fetch(
      `${API_BASE_URL}/news/articles?skip=${skip}&limit=${limit}`,
      {
        method: 'GET',
        headers: this.getAuthHeaders(),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to load articles');
    }

    return response.json();
  }

  /**
   * Get a specific article by ID
   */
  async getArticleById(id: number): Promise<NewsArticle> {
    const response = await fetch(`${API_BASE_URL}/news/articles/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to load article');
    }

    return response.json();
  }

  /**
   * Get available news sources
   */
  async getSources(): Promise<{ sources: Array<{ id: string; name: string; url: string; description: string }> }> {
    const response = await fetch(`${API_BASE_URL}/news/sources`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to load sources');
    }

    return response.json();
  }
}

// Export singleton instance
export const newsService = new NewsService();

export default NewsService;
