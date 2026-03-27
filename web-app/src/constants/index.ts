/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

/**
 * Authentication
 */
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  USER_KEY: 'user_data',
  TOKEN_EXPIRY: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Validation Rules
 */
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 20,
  PASSWORD_MIN_LENGTH: 6,
  PASSWORD_MAX_LENGTH: 50,
} as const;

/**
 * Stock Market Constants
 */
export const MARKET_CONFIG = {
  MARKET_OPEN: '09:15',
  MARKET_CLOSE: '15:30',
  TRADING_DAYS: ['MON', 'TUE', 'WED', 'THU', 'FRI'],
  STOCK_SYMBOLS: [
    'INFY', 'TCS', 'WIPRO', 'HCL', 'LT',
    'RELIANCE', 'BAJAJ', 'MARUTI', 'HDFC', 'ICICI'
  ],
} as const;

/**
 * UI Messages
 */
export const MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  REGISTER_SUCCESS: 'Account created successfully',
  REGISTER_ERROR: 'Registration failed. Please try again.',
  LOGOUT_SUCCESS: 'Logged out successfully',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  VALIDATION_ERROR: 'Please fill in all fields correctly.',
} as const;

/**
 * Toast Duration (ms)
 */
export const TOAST_DURATION = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 5000,
} as const;

export default {
  API_CONFIG,
  AUTH_CONFIG,
  VALIDATION,
  MARKET_CONFIG,
  MESSAGES,
  TOAST_DURATION,
};
