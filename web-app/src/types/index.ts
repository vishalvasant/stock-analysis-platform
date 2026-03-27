/**
 * Authentication related types
 */
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * API Response types
 */
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  detail?: string;
  status?: string;
}

/**
 * Toast/Notification types
 */
export interface ToastOptions {
  title?: string;
  description?: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

/**
 * App Context types
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

/**
 * Component Props types
 */
export interface DashboardProps {
  token: string;
  onLogout: () => void;
}
