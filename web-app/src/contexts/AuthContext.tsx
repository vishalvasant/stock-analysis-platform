import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { AuthContextType, User } from '../types';
import { authService } from '../services/authService';

/**
 * AuthContext
 * Global authentication context for the application
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * Wraps the app with authentication context
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Initialize authentication on mount
   * Check if user has a valid token
   */
  useEffect(() => {
    const initializeAuth = () => {
      const currentUser = authService.getCurrentUser();
      const hasToken = authService.isAuthenticated();

      if (currentUser && hasToken) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
