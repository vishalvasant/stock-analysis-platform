# API Endpoints Documentation

## Base URL
```
http://localhost:8000
```

## Swagger UI
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs (ReDoc)**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

## Endpoints Overview

### Health Checks
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/` | Welcome message | No |
| GET | `/health` | Check API and database health | No |

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login and get JWT token | No |

### Protected Routes
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/protected` | Get current user info | Yes (Bearer Token) |

## Authentication Flow

1. **Register**
   ```bash
   POST /auth/register
   Content-Type: application/json
   
   {
     "email": "user@example.com",
     "username": "johndoe",
     "password": "securepassword"
   }
   ```

2. **Login**
   ```bash
   POST /auth/login
   Content-Type: application/x-www-form-urlencoded
   
   username=johndoe&password=securepassword
   ```
   
   Returns:
   ```json
   {
     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "token_type": "bearer"
   }
   ```

3. **Access Protected Route**
   ```bash
   GET /protected
   Authorization: Bearer {access_token}
   ```

## Response Schemas

### User
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "created_at": "2026-03-27T12:00:00",
  "updated_at": "2026-03-27T12:00:00"
}
```

### Token
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

### HealthResponse
```json
{
  "status": "healthy"
}
```

### MessageResponse
```json
{
  "message": "string"
}
```

## Error Responses

All errors follow this format:
```json
{
  "detail": "Error message"
}
```

Common Error Codes:
- `400` - Bad Request (validation error, duplicate email/username)
- `401` - Unauthorized (invalid credentials)
- `422` - Unprocessable Entity (invalid input format)

## Future Endpoints to be Added

### Stock Data Service
- `GET /stocks/{symbol}` - Get stock information
- `GET /stocks/{symbol}/historical` - Get historical data

### ML Analysis Service
- `GET /analysis/{symbol}/predictions` - Get ML predictions
- `GET /analysis/{symbol}/signals` - Get trading signals

### News Service
- `GET /news/feed` - Get news feed
- `GET /news/{symbol}` - Get news for specific symbol
- `GET /news/{symbol}/sentiment` - Get sentiment analysis

### WebSocket Service
- `WS /ws/stream/{symbol}` - Real-time price stream
- `WS /ws/alerts` - Real-time alerts

## Testing with Curl

```bash
# Health check
curl -X GET "http://localhost:8000/health"

# Register
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "username": "testuser", "password": "password123"}'

# Login
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=password123"

# Protected route (replace TOKEN with actual token)
curl -X GET "http://localhost:8000/protected" \
  -H "Authorization: Bearer TOKEN"
```

## Tracking Progress

- ✅ Health & Basic Endpoints (Phase 2 - Complete)
- ✅ Authentication (Phase 2 - Complete)
- 🚧 ML Analysis Service (Phase 3)
- 🚧 News Fetch Service (Phase 3)
- 🚧 WebSocket Service (Phase 3)
- ⏳ Stock Data Endpoints (Phase 4+)
