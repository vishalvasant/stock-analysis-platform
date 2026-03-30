import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';

// SVG Icons
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

const RefreshIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="M20 12h-4a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h4" />
  </svg>
);

const TrendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
  </svg>
);

const PackageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

interface DashboardPageProps {
  onLogout?: () => void;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const { user, logout } = useAuth();

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const mockStocks: StockData[] = [
    { symbol: 'INFY', price: 1650.50, change: 12.50, changePercent: 0.77, high: 1680, low: 1620 },
    { symbol: 'TCS', price: 3850.00, change: -25.00, changePercent: -0.65, high: 3920, low: 3800 },
    { symbol: 'WIPRO', price: 495.25, change: 18.75, changePercent: 3.93, high: 510, low: 480 },
    { symbol: 'HCL', price: 1280.00, change: 5.00, changePercent: 0.39, high: 1300, low: 1250 },
    { symbol: 'LT', price: 2450.00, change: -30.00, changePercent: -1.21, high: 2500, low: 2400 },
  ];

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setRefreshing(true);
      setStocks(mockStocks);
    } catch (err) {
      console.error('Failed to load stock data');
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    logout();
    onLogout?.();
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
                <TrendingUpIcon />
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
                Dashboard
              </h1>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.8)',
                  margin: 0,
                }}
              >
                Welcome back, {user?.username || 'Trader'}!
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
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

      {/* Main Content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Portfolio Summary Card */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1a202c',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#667eea' }}>
                <WalletIcon />
              </span>
              Portfolio Summary
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '24px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#718096',
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Total Value
                </p>
                <p
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#667eea',
                    margin: 0,
                  }}
                >
                  ₹2,50,000
                </p>
              </div>

              <div
                style={{
                  borderLeft: '1px solid #e2e8f0',
                  borderRight: '1px solid #e2e8f0',
                  padding: '0 24px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: '#718096',
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Today's Gain
                </p>
                <p
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#38a169',
                    margin: 0,
                  }}
                >
                  +₹1,250
                </p>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontSize: '12px',
                    color: '#718096',
                    margin: '0 0 4px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Holdings
                </p>
                <p
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#3182ce',
                    margin: 0,
                  }}
                >
                  12
                </p>
              </div>
            </div>
          </div>

          {/* Watchlist Section */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Watchlist Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
              }}
            >
              <h2
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#1a202c',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#667eea' }}>
                  <TrendingIcon />
                </span>
                Watchlist
              </h2>
              <button
                onClick={loadStocks}
                disabled={refreshing}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  backgroundColor: 'transparent',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  color: '#667eea',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: refreshing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!refreshing) {
                    e.currentTarget.style.backgroundColor = '#f7fafc';
                    e.currentTarget.style.borderColor = '#cbd5e0';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <RefreshIcon />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>

            {/* Stock List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px 20px',
                    backgroundColor: '#f7fafc',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#edf2f7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f7fafc';
                  }}
                >
                  {/* Left: Symbol & Details */}
                  <div>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1a202c',
                        margin: '0 0 4px 0',
                      }}
                    >
                      {stock.symbol}
                    </p>
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#718096',
                        margin: 0,
                      }}
                    >
                      H: ₹{stock.high.toFixed(2)} · L: ₹{stock.low.toFixed(2)}
                    </p>
                  </div>

                  {/* Right: Price & Change */}
                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#1a202c',
                        margin: '0 0 4px 0',
                      }}
                    >
                      ₹{stock.price.toFixed(2)}
                    </p>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: stock.change >= 0 ? '#c6f6d5' : '#fed7d7',
                        color: stock.change >= 0 ? '#22543d' : '#c53030',
                      }}
                    >
                      {stock.change >= 0 ? '↑' : '↓'}
                      {Math.abs(stock.change).toFixed(2)} (
                      {Math.abs(stock.changePercent).toFixed(2)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#1a202c',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#667eea' }}>
                <PackageIcon />
              </span>
              Quick Actions
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '12px',
              }}
            >
              <button
                style={{
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: '1.5px solid #667eea',
                  backgroundColor: 'white',
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#667eea';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#667eea';
                }}
              >
                View All Holdings
              </button>
              <button
                style={{
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: '1.5px solid #38a169',
                  backgroundColor: 'white',
                  color: '#38a169',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#38a169';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#38a169';
                }}
              >
                Place Trade
              </button>
              <button
                style={{
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: '1.5px solid #3182ce',
                  backgroundColor: 'white',
                  color: '#3182ce',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3182ce';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = '#3182ce';
                }}
              >
                Watchlist Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
