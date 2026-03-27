# API Service

Main API service for the Stock Analysis Platform with JWT authentication.

## Setup
1. Create venv: `python3 -m venv venv`
2. Activate: `source venv/bin/activate`
3. Install: `pip install -r requirements.txt`

## Running the Server

```bash
cd /Users/vishal/Desktop/UpStox/stock-analysis-platform/api-service
/Users/vishal/Desktop/UpStox/stock-analysis-platform/api-service/venv/bin/python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Or with full path:
```bash
./venv/bin/python3 -m uvicorn main:app --reload
```

## Documentation

### Swagger UI (Interactive API Docs)
Visit: **http://localhost:8000/docs**

This provides an interactive interface where you can:
- View all available endpoints
- See request/response schemas
- Test endpoints directly
- Track all APIs in one place

### Alternative Documentation
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI Schema**: http://localhost:8000/openapi.json

## Endpoints

See [API_ENDPOINTS.md](./API_ENDPOINTS.md) for complete endpoint documentation.

### Quick Reference
- `GET /` - Welcome message
- `GET /health` - Health check
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /protected` - Protected route (requires auth token)

## Authentication

1. Register a user with `/auth/register`
2. Login with `/auth/login` to get JWT token
3. Use the token in `Authorization: Bearer {token}` header for protected endpoints

## Database

Requires PostgreSQL running on port 5432. Start it with:
```bash
cd ../docker && docker-compose up -d
```

## Migrations

Create a new migration:
```bash
./venv/bin/alembic revision --autogenerate -m "Description of changes"
```

Apply migrations:
```bash
./venv/bin/alembic upgrade head
```

## Project Structure
```
api-service/
├── main.py                 # FastAPI application entry point
├── database.py             # Database connection and session
├── models.py               # SQLAlchemy ORM models
├── schemas.py              # Pydantic request/response schemas
├── auth.py                 # Authentication logic
├── routers/
│   ├── __init__.py
│   └── auth.py            # Authentication endpoints
├── alembic/               # Database migrations
├── requirements.txt       # Python dependencies
└── venv/                  # Virtual environment
```

## All endpoints are automatically documented in Swagger UI at /docs!