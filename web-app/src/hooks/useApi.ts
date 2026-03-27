import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse } from '../types';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * useApi Hook
 * Generic hook for making API calls with loading and error handling
 */
export const useApi = <T = any>() => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Execute API call
   */
  const execute = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete' | 'patch',
      url: string,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      try {
        setState({
          data: null,
          loading: true,
          error: null,
        });

        const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
        const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`;

        // Get token from localStorage
        const token = localStorage.getItem('auth_token');
        const headers = {
          ...config?.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        };

        const response = await axios<ApiResponse<T>>({
          method,
          url: fullUrl,
          headers,
          ...config,
        });

        const responseData = response.data.data || response.data;

        setState({
          data: responseData as T,
          loading: false,
          error: null,
        });

        return responseData as T;
      } catch (err) {
        const errorMessage =
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : err instanceof Error
            ? err.message
            : 'An error occurred';

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        throw new Error(errorMessage);
      }
    },
    []
  );

  /**
   * HTTP GET request
   */
  const get = useCallback(
    (url: string, config?: AxiosRequestConfig) =>
      execute('get', url, config),
    [execute]
  );

  /**
   * HTTP POST request
   */
  const post = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      execute('post', url, { ...config, data }),
    [execute]
  );

  /**
   * HTTP PUT request
   */
  const put = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      execute('put', url, { ...config, data }),
    [execute]
  );

  /**
   * HTTP DELETE request
   */
  const delete_ = useCallback(
    (url: string, config?: AxiosRequestConfig) =>
      execute('delete', url, config),
    [execute]
  );

  /**
   * HTTP PATCH request
   */
  const patch = useCallback(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      execute('patch', url, { ...config, data }),
    [execute]
  );

  /**
   * Clear error
   */
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  /**
   * Reset state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    get,
    post,
    put,
    delete: delete_,
    patch,
    clearError,
    reset,
  };
};

export default useApi;
