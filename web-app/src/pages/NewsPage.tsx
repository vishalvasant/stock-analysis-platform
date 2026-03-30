import React, { useState, useEffect } from 'react';
import { newsService } from '../services/newsService';

// SVG Icons
const NewspaperIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M18 18h-8" />
    <path d="M18 10h-8" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

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

interface NewsPageProps {
  onLogout?: () => void;
  onBackToDashboard?: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onLogout, onBackToDashboard }) => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await newsService.getArticles();
      setArticles(data.articles || []);
    } catch (err) {
      setError('Failed to load news articles');
    } finally {
      setLoading(false);
    }
  };

  const handleFetchNews = async () => {
    try {
      setFetching(true);
      setError(null);
      setMessage(null);
      
      const result = await newsService.fetchNews('the_hindu', 10);
      setMessage(`Fetched ${result.articles_saved} new articles`);
      
      // Reload articles
      await loadNews();
    } catch (err) {
      setError('Failed to fetch news');
    } finally {
      setFetching(false);
    }
  };

  const getCategoryColor = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case 'markets':
        return '#3182ce';
      case 'industry':
        return '#38a169';
      case 'economy':
        return '#d69e2e';
      case 'agri-business':
        return '#38b2ac';
      default:
        return '#667eea';
    }
  };

  const getSentimentColor = (label: string | null) => {
    switch (label?.toLowerCase()) {
      case 'positive':
        return '#38a169';
      case 'negative':
        return '#e53e3e';
      case 'neutral':
        return '#718096';
      default:
        return '#a0aec0';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7fafc' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px 24px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
              }}
            >
              <span style={{ color: 'white' }}>
                <NewspaperIcon />
              </span>
            </div>
            <div>
              <h1
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                  margin: 0,
                }}
              >
                News & Analysis
              </h1>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                }}
              >
                Latest business and market news
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onBackToDashboard}
              style={{
                padding: '10px 18px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }}
            >
              Dashboard
            </button>
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 18px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
              }}
            >
              <LogoutIcon />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        {/* Controls */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '20px 24px',
            marginBottom: '24px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a202c',
                margin: '0 0 4px 0',
              }}
            >
              News Articles
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: '#718096',
                margin: 0,
              }}
            >
              {articles.length} articles in database
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={loadNews}
              disabled={loading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                borderRadius: '10px',
                border: '1.5px solid #e2e8f0',
                backgroundColor: 'white',
                color: '#4a5568',
                fontSize: '14px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = '#f7fafc';
                  e.currentTarget.style.borderColor = '#cbd5e0';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <RefreshIcon />
              {loading ? 'Loading...' : 'Refresh'}
            </button>
            <button
              onClick={handleFetchNews}
              disabled={fetching}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '12px 20px',
                borderRadius: '10px',
                border: 'none',
                background: fetching
                  ? '#a0aec0'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                cursor: fetching ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: fetching
                  ? 'none'
                  : '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
              }}
              onMouseEnter={(e) => {
                if (!fetching) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = fetching
                  ? 'none'
                  : '0 4px 14px 0 rgba(102, 126, 234, 0.39)';
              }}
            >
              {fetching ? 'Fetching...' : 'Fetch Latest News'}
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div
            style={{
              backgroundColor: '#fed7d7',
              border: '1px solid #fc8181',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              color: '#c53030',
              fontSize: '14px',
            }}
          >
            {error}
          </div>
        )}
        {message && (
          <div
            style={{
              backgroundColor: '#c6f6d5',
              border: '1px solid #9ae6b4',
              borderRadius: '10px',
              padding: '12px 16px',
              marginBottom: '20px',
              color: '#22543d',
              fontSize: '14px',
            }}
          >
            {message}
          </div>
        )}

        {/* Articles List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {articles.length === 0 && !loading ? (
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '60px 24px',
                textAlign: 'center',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#f7fafc',
                  borderRadius: '16px',
                  marginBottom: '16px',
                }}
              >
                <span style={{ color: '#a0aec0' }}>
                  <NewspaperIcon />
                </span>
              </div>
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#4a5568',
                  margin: '0 0 8px 0',
                }}
              >
                No news articles yet
              </h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#718096',
                  margin: '0 0 20px 0',
                }}
              >
                Click "Fetch Latest News" to get the latest articles from The Hindu
              </p>
            </div>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px 0 rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Article Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#1a202c',
                        margin: '0 0 8px 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {article.title}
                    </h3>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      {/* Category Badge */}
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          backgroundColor: `${getCategoryColor(article.category)}20`,
                          color: getCategoryColor(article.category),
                        }}
                      >
                        {article.category || 'Business'}
                      </span>

                      {/* Source */}
                      <span
                        style={{
                          fontSize: '13px',
                          color: '#718096',
                        }}
                      >
                        {article.source === 'the_hindu' ? 'The Hindu' : article.source}
                      </span>

                      {/* Date */}
                      <span
                        style={{
                          fontSize: '13px',
                          color: '#a0aec0',
                        }}
                      >
                        {formatDate(article.published_at)}
                      </span>

                      {/* Sentiment Badge (if available) */}
                      {article.sentiment_label && (
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            backgroundColor: `${getSentimentColor(article.sentiment_label)}20`,
                            color: getSentimentColor(article.sentiment_label),
                          }}
                        >
                          {article.sentiment_label} ({article.sentiment_score?.toFixed(2)})
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read More Link */}
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 16px',
                      backgroundColor: '#f7fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      color: '#667eea',
                      fontSize: '13px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#edf2f7';
                      e.currentTarget.style.borderColor = '#cbd5e0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f7fafc';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    Read
                    <ExternalLinkIcon />
                  </a>
                </div>

                {/* Summary */}
                {article.summary && (
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#4a5568',
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {article.summary}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
