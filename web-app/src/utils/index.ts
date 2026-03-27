/**
 * String Utilities
 */
export const stringUtils = {
  /**
   * Capitalize first letter of a string
   */
  capitalize: (str: string): string => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  },

  /**
   * Truncate string to specified length
   */
  truncate: (str: string, length: number, suffix = '...'): string => {
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  },

  /**
   * Convert camelCase to space-separated words
   */
  camelToTitle: (str: string): string => {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  },
};

/**
 * Number Utilities
 */
export const numberUtils = {
  /**
   * Format number as currency
   */
  formatCurrency: (value: number, currency: string = '₹'): string => {
    return `${currency}${value.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  },

  /**
   * Format percentage
   */
  formatPercent: (value: number, decimals: number = 2): string => {
    return `${(value / 100).toFixed(decimals)}%`;
  },

  /**
   * Round to specified decimal places
   */
  round: (value: number, decimals: number = 2): number => {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  },

  /**
   * Format large numbers with abbreviations
   */
  formatLarge: (value: number): string => {
    if (value >= 1e7) return (value / 1e7).toFixed(1) + 'Cr';
    if (value >= 1e5) return (value / 1e5).toFixed(1) + 'L';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toString();
  },
};

/**
 * Date Utilities
 */
export const dateUtils = {
  /**
   * Format date to readable string
   */
  formatDate: (date: Date | string, format: 'short' | 'long' = 'short'): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    if (format === 'short') {
      return d.toLocaleDateString('en-IN');
    }
    return d.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },

  /**
   * Format time to HH:MM format
   */
  formatTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  },

  /**
   * Get relative time (e.g., "2 hours ago")
   */
  getRelativeTime: (date: Date | string): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString('en-IN');
  },
};

/**
 * Validation Utilities
 */
export const validationUtils = {
  /**
   * Validate email format
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate username
   */
  isValidUsername: (username: string): boolean => {
    return username.length >= 3 && username.length <= 20;
  },

  /**
   * Validate password strength
   */
  isStrongPassword: (password: string): { strong: boolean; score: number } => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*]/.test(password)) score++;

    return {
      strong: score >= 4,
      score,
    };
  },

  /**
   * Validate phone number
   */
  isValidPhone: (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  },
};

/**
 * Storage Utilities
 */
export const storageUtils = {
  /**
   * Get item from localStorage
   */
  getItem: <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  },

  /**
   * Set item in localStorage
   */
  setItem: <T = any>(key: string, value: T): boolean => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage
   */
  clear: (): boolean => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage', error);
      return false;
    }
  },
};

/**
 * Array Utilities
 */
export const arrayUtils = {
  /**
   * Remove duplicates from array
   */
  unique: <T = any>(arr: T[]): T[] => {
    return Array.from(new Set(arr));
  },

  /**
   * Chunk array into smaller arrays
   */
  chunk: <T = any>(arr: T[], size: number): T[][] => {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  },

  /**
   * Sort array of objects by key
   */
  sortBy: <T = any>(arr: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
    return [...arr].sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });
  },
};

export default {
  stringUtils,
  numberUtils,
  dateUtils,
  validationUtils,
  storageUtils,
  arrayUtils,
};
