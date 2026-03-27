import axios, { AxiosInstance } from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types';

/**
 * Authentication Service
 * Handles all API calls for user authentication
 */
class AuthService {
  private apiClient: AxiosInstance;
  private readonly API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  constructor() {
    this.apiClient = axios.create({
      baseURL: this.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to attach token
    this.apiClient.interceptors.request.use((config) => {
      const token = this.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  /**
   * User Registration
   * @param credentials - User registration data
   * @returns Auth response with token
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      console.log('AuthService: Starting registration with credentials:', credentials);
      
      const response = await this.apiClient.post<any>(
        '/auth/register',
        credentials
      );

      console.log('AuthService: Registration response:', response.data);

      // After successful registration, login to get token
      if (response.data.username) {
        console.log('AuthService: Registration successful, attempting login...');
        const loginResponse = await this.login({
          username: credentials.username,
          password: credentials.password
        });
        return loginResponse;
      }

      return response.data;
    } catch (error) {
      console.error('AuthService: Registration error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * User Login
   * @param credentials - User login data
   * @returns Auth response with token
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      console.log('AuthService: Starting login with credentials:', credentials);
      
      // Convert to form data for OAuth2PasswordRequestForm
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);

      console.log('AuthService: Sending request to:', `${this.API_BASE_URL}/auth/login`);
      console.log('AuthService: Form data:', formData.toString());

      const response = await this.apiClient.post<AuthResponse>(
        '/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log('AuthService: Login response:', response.data);

      if (response.data.access_token) {
        this.setToken(response.data.access_token);
        console.log('AuthService: Token stored');
        
        // Get user info from protected endpoint
        const userResponse = await this.getCurrentUser();
        console.log('AuthService: User data:', userResponse);
        this.setUser(userResponse);
      }

      return response.data;
    } catch (error) {
      console.error('AuthService: Login error:', error);
      throw this.handleError(error);
    }
  }

  /**
   * User Logout
   * Clears stored token and user data
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Get current user from API
   */
  async getCurrentUser() {
    try {
      const response = await this.apiClient.get('/protected');
      return response.data;
    } catch (error) {
      // If API call fails, try to get from storage
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Store authentication token
   */
  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Store user data
   */
  private setUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        error.message ||
        'An error occurred';

      return new Error(message);
    }

    return error;
  }
}

// Export singleton instance
export const authService = new AuthService();

export default AuthService;
