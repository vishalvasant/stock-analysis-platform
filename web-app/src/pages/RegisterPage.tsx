import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { RegisterCredentials } from '../types';

// SVG Icons
const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface RegisterPageProps {
  onRegisterSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegisterSuccess,
  onSwitchToLogin,
}) => {
  const { register, loading, error, clearError } = useAuth();

  const [formData, setFormData] = useState<RegisterCredentials & { confirmPassword: string }>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<typeof formData> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (): Promise<void> => {
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData as RegisterCredentials);
      onRegisterSuccess?.();
    } catch (err) {
      // Error handled by useAuth
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Decorations */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          filter: 'blur(80px)',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)',
          filter: 'blur(60px)',
          zIndex: 0,
        }}
      />

      {/* Main Container */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              marginBottom: '16px',
            }}
          >
            <span style={{ color: '#38A169' }}>
              <TrendingUpIcon />
            </span>
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'white',
              margin: '0 0 4px 0',
              letterSpacing: '-0.5px',
            }}
          >
            Stock Analysis
          </h1>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
              fontWeight: 500,
            }}
          >
            Join the Trading Revolution
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Card Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1a202c',
                margin: '0 0 4px 0',
              }}
            >
              Create Account
            </h2>
            <p
              style={{
                fontSize: '14px',
                color: '#718096',
                margin: 0,
              }}
            >
              Start your trading journey today
            </p>
          </div>

          {/* Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#4a5568',
                  marginBottom: '6px',
                }}
              >
                Email
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: errors.email ? '2px solid #fc8181' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#f7fafc',
                  gap: '10px',
                }}
              >
                <span style={{ color: errors.email ? '#fc8181' : '#a0aec0', flexShrink: 0 }}>
                  <MailIcon />
                </span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    color: '#2d3748',
                    outline: 'none',
                    padding: 0,
                  }}
                />
              </div>
              {errors.email && (
                <p style={{ fontSize: '12px', color: '#e53e3e', margin: '4px 0 0 0' }}>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Username */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#4a5568',
                  marginBottom: '6px',
                }}
              >
                Username
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: errors.username ? '2px solid #fc8181' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#f7fafc',
                  gap: '10px',
                }}
              >
                <span style={{ color: errors.username ? '#fc8181' : '#a0aec0', flexShrink: 0 }}>
                  <UserIcon />
                </span>
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    color: '#2d3748',
                    outline: 'none',
                    padding: 0,
                  }}
                />
              </div>
              {errors.username && (
                <p style={{ fontSize: '12px', color: '#e53e3e', margin: '4px 0 0 0' }}>
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#4a5568',
                  marginBottom: '6px',
                }}
              >
                Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: errors.password ? '2px solid #fc8181' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#f7fafc',
                  gap: '10px',
                }}
              >
                <span style={{ color: errors.password ? '#fc8181' : '#a0aec0', flexShrink: 0 }}>
                  <LockIcon />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    color: '#2d3748',
                    outline: 'none',
                    padding: 0,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#a0aec0',
                    flexShrink: 0,
                  }}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontSize: '12px', color: '#e53e3e', margin: '4px 0 0 0' }}>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#4a5568',
                  marginBottom: '6px',
                }}
              >
                Confirm Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: errors.confirmPassword ? '2px solid #fc8181' : '2px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  backgroundColor: '#f7fafc',
                  gap: '10px',
                }}
              >
                <span style={{ color: errors.confirmPassword ? '#fc8181' : '#a0aec0', flexShrink: 0 }}>
                  <CheckIcon />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '15px',
                    color: '#2d3748',
                    outline: 'none',
                    padding: 0,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: '#a0aec0',
                    flexShrink: 0,
                  }}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={{ fontSize: '12px', color: '#e53e3e', margin: '4px 0 0 0' }}>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Create Account Button */}
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                border: 'none',
                background: loading
                  ? '#a0aec0'
                  : 'linear-gradient(135deg, #38A169 0%, #2F855A 100%)',
                color: 'white',
                fontSize: '15px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading
                  ? 'none'
                  : '0 4px 14px 0 rgba(56, 161, 105, 0.39)',
                marginTop: '6px',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px 0 rgba(56, 161, 105, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = loading
                  ? 'none'
                  : '0 4px 14px 0 rgba(56, 161, 105, 0.39)';
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '2px',
              }}
            >
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
              <span style={{ fontSize: '13px', color: '#a0aec0' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
            </div>

            {/* Social Sign Up */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '10px',
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
                <svg width="18" height="18" viewBox="0 0 24 24">
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
                  borderRadius: '10px',
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>

            {/* Login Link */}
            <div
              style={{
                textAlign: 'center',
                marginTop: '6px',
              }}
            >
              <span style={{ fontSize: '14px', color: '#718096' }}>
                Already have an account?{' '}
              </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#38A169',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            margin: '16px 0 0 0',
          }}
        >
          © 2024 Stock Analysis Platform. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
