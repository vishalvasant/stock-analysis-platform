import React, { useState } from 'react';
import {
  VStack,
  HStack,
  FormControl,
  Input,
  Text,
  Box,
  Heading,
  useToast,
  Center,
  Pressable,
} from 'native-base';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types';

// SVG Icons
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

interface LoginPageProps {
  onLoginSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onSwitchToRegister,
}) => {
  const toast = useToast();
  const { login, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({});
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginCredentials> = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);

      toast.show({
        title: 'Welcome Back!',
        description: 'Successfully logged in',
        duration: 2000,
        placement: 'top',
      });

      onLoginSuccess?.();
    } catch (err) {
      toast.show({
        title: 'Login Failed',
        description: error || 'Invalid credentials. Please try again.',
        duration: 3000,
        placement: 'top',
      });
    }
  };

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <Center
      flex={1}
      minH="100vh"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
      px={4}
      py={8}
    >
      {/* Background Decorations */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="rgba(255,255,255,0.08)"
        style={{ filter: 'blur(80px)' }}
      />
      <Box
        position="absolute"
        bottom="5%"
        right="5%"
        width="250px"
        height="250px"
        borderRadius="full"
        bg="rgba(255,255,255,0.06)"
        style={{ filter: 'blur(60px)' }}
      />

      <VStack space={6} width="100%" maxW="440px" alignItems="center" zIndex={1}>
        {/* Logo Header */}
        <VStack space={3} alignItems="center" mb={2}>
          <Box
            bg="white"
            p={4}
            borderRadius="16px"
            shadow="lg"
          >
            <Box color="#667eea">
              <TrendingUpIcon />
            </Box>
          </Box>
          <VStack space={1} alignItems="center">
            <Heading size="xl" color="white" fontWeight="bold" letterSpacing="tight">
              Stock Analysis
            </Heading>
            <Text color="rgba(255,255,255,0.85)" fontSize="sm" fontWeight="500">
              Professional Trading Platform
            </Text>
          </VStack>
        </VStack>

        {/* Main Card */}
        <Box
          width="100%"
          bg="white"
          borderRadius="24px"
          p={8}
          shadow="2xl"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
        >
          <VStack space={6}>
            {/* Card Header */}
            <VStack space={1} alignItems="center">
              <Heading size="lg" color="gray.800" fontWeight="bold">
                Welcome Back
              </Heading>
              <Text color="gray.500" fontSize="sm">
                Sign in to continue trading
              </Text>
            </VStack>

            {/* Form */}
            <VStack space={5}>
              {/* Username */}
              <FormControl isInvalid={!!errors.username}>
                <FormControl.Label
                  _text={{
                    color: 'gray.700',
                    fontWeight: '600',
                    fontSize: 'sm',
                    mb: 1.5,
                  }}
                >
                  Username
                </FormControl.Label>
                <HStack
                  alignItems="center"
                  borderWidth={1.5}
                  borderColor={errors.username ? 'red.400' : 'gray.200'}
                  borderRadius="14px"
                  px={4}
                  py={3.5}
                  bg="gray.50"
                  space={3}
                >
                  <Box color={errors.username ? 'red.400' : 'gray.400'}>
                    <UserIcon />
                  </Box>
                  <Input
                    flex={1}
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChangeText={(value: string) => handleInputChange('username', value)}
                    isDisabled={loading}
                    fontSize="md"
                    borderWidth={0}
                    bg="transparent"
                    p={0}
                    _focus={{ bg: 'transparent' }}
                  />
                </HStack>
                {errors.username && (
                  <Text color="red.500" fontSize="xs" mt={1} ml={1}>
                    {errors.username}
                  </Text>
                )}
              </FormControl>

              {/* Password */}
              <FormControl isInvalid={!!errors.password}>
                <FormControl.Label
                  _text={{
                    color: 'gray.700',
                    fontWeight: '600',
                    fontSize: 'sm',
                    mb: 1.5,
                  }}
                >
                  Password
                </FormControl.Label>
                <HStack
                  alignItems="center"
                  borderWidth={1.5}
                  borderColor={errors.password ? 'red.400' : 'gray.200'}
                  borderRadius="14px"
                  px={4}
                  py={3.5}
                  bg="gray.50"
                  space={3}
                >
                  <Box color={errors.password ? 'red.400' : 'gray.400'}>
                    <LockIcon />
                  </Box>
                  <Input
                    flex={1}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={formData.password}
                    onChangeText={(value: string) => handleInputChange('password', value)}
                    isDisabled={loading}
                    fontSize="md"
                    borderWidth={0}
                    bg="transparent"
                    p={0}
                    _focus={{ bg: 'transparent' }}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Box color="gray.400" style={{ cursor: 'pointer' }}>
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </Box>
                  </Pressable>
                </HStack>
                {errors.password && (
                  <Text color="red.500" fontSize="xs" mt={1} ml={1}>
                    {errors.password}
                  </Text>
                )}
              </FormControl>

              {/* Forgot Password */}
              <HStack justifyContent="flex-end">
                <Text
                  color="#667eea"
                  fontSize="sm"
                  fontWeight="600"
                  style={{ cursor: 'pointer' }}
                >
                  Forgot Password?
                </Text>
              </HStack>
            </VStack>

            {/* Sign In Button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '14px',
                border: 'none',
                background: loading
                  ? '#a0aec0'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontSize: '16px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: loading
                  ? 'none'
                  : '0 4px 14px 0 rgba(102, 126, 234, 0.39)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = loading
                  ? 'none'
                  : '0 4px 14px 0 rgba(102, 126, 234, 0.39)';
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Divider */}
            <HStack alignItems="center" space={3}>
              <Box flex={1} height="1px" bg="gray.200" />
              <Text color="gray.400" fontSize="sm">
                or
              </Text>
              <Box flex={1} height="1px" bg="gray.200" />
            </HStack>

            {/* Social Login */}
            <HStack space={3} justifyContent="center">
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f7fafc';
                  e.currentTarget.style.borderColor = '#cbd5e0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1.5px solid #e2e8f0',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f7fafc';
                  e.currentTarget.style.borderColor = '#cbd5e0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </HStack>

            {/* Sign Up Link */}
            <HStack justifyContent="center" space={1} pt={2}>
              <Text color="gray.500" fontSize="sm">
                Don't have an account?
              </Text>
              <Text
                color="#667eea"
                fontSize="sm"
                fontWeight="bold"
                style={{ cursor: 'pointer' }}
                onClick={onSwitchToRegister}
              >
                Sign up
              </Text>
            </HStack>
          </VStack>
        </Box>

        {/* Footer */}
        <Text color="rgba(255,255,255,0.7)" fontSize="xs" textAlign="center">
          © 2024 Stock Analysis Platform. All rights reserved.
        </Text>
      </VStack>
    </Center>
  );
};

export default LoginPage;
