import React, { useState, useEffect } from 'react';
import { NativeBaseProvider, Box, Center, Spinner } from 'native-base';
import { customTheme } from './theme';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage, RegisterPage, DashboardPage, NewsPage } from './pages';
import { authService } from './services/authService';

type PageType = 'login' | 'register' | 'dashboard' | 'news';

/**
 * Main App Component
 * Handles routing based on authentication state
 */
function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('login');
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleSwitchToNews = () => {
    setCurrentPage('news');
  };

  const handleSwitchToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleSwitchToRegister = () => {
    setCurrentPage('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentPage('login');
  };

  if (isLoading) {
    return (
      <Center flex={1} bg="primary.500">
        <Spinner size="lg" color="white" />
      </Center>
    );
  }

  return (
    <Box
      flex={1}
      minH="100vh"
      bgGradient="linear(to-br, primary.500, secondary.500)"
      p={0}
    >
      {currentPage === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSwitchToRegister={handleSwitchToRegister}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage
          onRegisterSuccess={handleRegisterSuccess}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage 
          onLogout={handleLogout} 
          onSwitchToNews={handleSwitchToNews}
        />
      )}
      {currentPage === 'news' && (
        <NewsPage 
          onLogout={handleLogout}
          onBackToDashboard={handleSwitchToDashboard}
        />
      )}
    </Box>
  );
}

/**
 * Root App Component
 * Wraps with NativeBase provider and Auth context
 */
export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
