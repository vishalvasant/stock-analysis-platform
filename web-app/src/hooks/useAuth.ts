import { useState, useCallback, useEffect } from 'react';
import { LoginCredentials, RegisterCredentials, User } from '../types';
import { authService } from '../services/authService';

/**
 * useAuth Hook
 * Manages authentication state and provides auth functions
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const hasToken = authService.isAuthenticated();

    if (hasToken) {
      // Get user data from API or storage
      authService.getCurrentUser().then((currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Token exists but user data is invalid, clear auth
          authService.logout();
          setIsAuthenticated(false);
        }
      });
    }
  }, []);

  /**
   * Handle user login
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);

      await authService.login(credentials);
      
      // Get user data after successful login
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);

      return { user: currentUser };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle user registration
   */
  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      setLoading(true);
      setError(null);

      await authService.register(credentials);
      
      // Get user data after successful registration
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setIsAuthenticated(true);

      return { user: currentUser };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Handle user logout
   */
  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  }, []);

  /**
   * Clear error message
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };
};

export default useAuth;
