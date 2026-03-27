# Stock Analysis Platform - Web App

A professional TypeScript-based React web application for stock analysis, built with NativeBase for consistent UI/UX and TypeScript for type safety.

## 📁 Project Structure

```
web-app/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page-level components (Login, Register, Dashboard)
│   ├── layouts/             # Layout wrappers and templates
│   ├── services/            # API service layer
│   ├── hooks/               # Custom React hooks
│   ├── contexts/            # React Context providers
│   ├── types/               # TypeScript type definitions
│   ├── utils/               # Utility functions
│   ├── constants/           # Constants and configuration
│   ├── assets/              # Images and static files
│   ├── App.tsx              # Main app component with routing
│   ├── theme.ts             # NativeBase theme configuration
│   ├── main.tsx             # React entry point
│   └── index.css             # Global styles
├── public/                  # Static files
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🏗️ Architecture Overview

### Component Layer
- **Pages**: Full-page components (LoginPage, RegisterPage, DashboardPage)
- **Components**: Reusable UI components
- **Layouts**: Common layout templates and wrappers

### State Management
- **AuthContext**: Global authentication state management
- **useAuth Hook**: Authentication logic and user management
- **useApi Hook**: Generic API call wrapper with loading/error states

### Services
- **authService**: Centralized authentication API calls with token management
- **Axios Interceptors**: Automatic token injection for protected routes

### Type Safety
- **TypeScript Types**: Comprehensive type definitions for all data structures
- **Strict Mode**: Enabled for maximum type checking
- **Path Aliases**: Clean imports using @ prefixes

## 🎨 UI Framework: NativeBase

### Theme System
- **Colors**: Comprehensive color palette (primary, secondary, success, danger, warning, info, gray)
- **Typography**: Consistent font sizing and line heights
- **Spacing**: Standardized spacing scale
- **Components**: Pre-styled NativeBase components

### How to Use NativeBase Components
```typescript
import { Button, Box, VStack, Text, Input, FormControl } from 'native-base';

// Example usage
<Box bg="primary.500" p={4} rounded="lg">
  <Text color="white">Hello World</Text>
  <Button mt={2}>Click me</Button>
</Box>
```

## 🔐 Authentication Flow

### Registration
1. User fills registration form (email, username, password)
2. Form validation on client side
3. API call to `/auth/register`
4. Token stored in localStorage
5. Auto-redirect to dashboard

### Login
1. User enters email and password
2. Form validation
3. API call to `/auth/login`
4. Token stored and user redirected to dashboard
5. AuthContext updated with user data

### Token Management
- **Storage**: JWT token stored in localStorage
- **Injection**: Axios interceptor automatically adds token to API headers
- **Persistence**: Token checked on app initialization
- **Expiry**: Handled by background validation

## 📝 Key Files

### App.tsx
Main app component with routing logic:
- Checks authentication status on mount
- Routes between Login/Register/Dashboard pages
- Wraps with NativeBase and AuthProvider

### types/index.ts
TypeScript interfaces:
- `User`: User data structure
- `LoginCredentials`: Login form data
- `RegisterCredentials`: Registration form data
- `AuthResponse`: API response for auth
- `ApiResponse<T>`: Generic API response
- `AuthContextType`: Auth context type

### services/authService.ts
Authentication service singleton:
- `register()`: Create new account
- `login()`: Authenticate user
- `logout()`: Clear auth state
- `getToken()`: Retrieve stored token
- `isAuthenticated()`: Check auth status
- Axios interceptors for token injection

### hooks/useAuth.ts
Custom hook for authentication:
- Provides `login()`, `register()`, `logout()` functions
- Manages loading and error states
- Initializes auth on mount
- Returns user data and auth status

### hooks/useApi.ts
Generic API call hook:
- Methods: `get()`, `post()`, `put()`, `delete()`, `patch()`
- Automatic token injection via headers
- Loading and error state management
- Supports config customization

## 🚀 Getting Started

### Installation
```bash
# Navigate to web-app directory
cd web-app

# Install dependencies
npm install

# Install additional types if needed
npm install -D @types/react @types/react-dom @types/node
```

### Development
```bash
# Start development server
npm run dev

# TypeScript compilation check
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create `.env` file in web-app directory:
```
REACT_APP_API_URL=http://localhost:8000/api
```

## 🔌 API Integration

### Making API Calls

#### Using useApi Hook
```typescript
const { data, loading, error, post } = useApi();

const handleSubmit = async () => {
  try {
    const result = await post('/endpoint', { data });
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
```

#### Using authService
```typescript
import { authService } from '@services/authService';

const handleLogin = async (email, password) => {
  const response = await authService.login({ email, password });
  console.log(response.user);
};
```

## 📦 Dependencies

### Core
- `react`: UI library
- `react-dom`: React DOM rendering
- `native-base`: UI component library
- `expo-linear-gradient`: Linear gradients

### HTTP & API
- `axios`: HTTP client
- `typescript`: Type checking

### Development
- `vite`: Build tool
- `vitest`: Testing framework (optional)
- `tailwindcss`: CSS framework (optional)

## 🎯 Features

✅ TypeScript for type safety
✅ JWT authentication with token management
✅ Responsive UI with NativeBase
✅ Custom hooks for state management
✅ Centralized API service
✅ Theme system with consistent branding
✅ Form validation on client side
✅ Error handling and user feedback
✅ Auto-redirect based on auth status
✅ Clean architecture with separation of concerns

## 🔮 Future Enhancements

- [ ] Add React Router for multi-page navigation
- [ ] Implement Redux/Zustand for complex state management
- [ ] Add PWA support for offline functionality
- [ ] Implement real-time data streaming (WebSocket)
- [ ] Add charting library for stock price visualizations
- [ ] Implement service workers for caching
- [ ] Add unit and integration tests
- [ ] Deploy to production environment

## 📚 Best Practices Implemented

1. **Component Organization**: Logical folder structure for scalability
2. **Type Safety**: Strict TypeScript configuration
3. **Single Responsibility**: Each component handles one concern
4. **Reusability**: Custom hooks and utility functions
5. **Error Handling**: Comprehensive error messages and user feedback
6. **State Management**: Context API for global state
7. **API Integration**: Centralized service for API calls
8. **Configuration**: Environment variables for flexibility

## 🤝 Contributing

When adding new features:
1. Follow the existing folder structure
2. Use TypeScript for all files
3. Add appropriate type definitions
4. Use NativeBase components consistently
5. Update this README with new features
6. Test thoroughly before committing

## 📞 Support

For issues or questions, please refer to:
- NativeBase Documentation: https://docs.nativebase.io/
- React Documentation: https://react.dev/
- TypeScript Documentation: https://www.typescriptlang.org/docs/

---

**Built with ❤️ using React, TypeScript, and NativeBase**
