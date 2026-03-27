# API Service

Main API service for the Stock Analysis Platform.

## Setup
1. Create venv: `python -m venv venv`
2. Activate: `source venv/bin/activate`
3. Install: `pip install -r requirements.txt`
4. Run: `uvicorn main:app --reload`

## Endpoints
- GET /: Welcome message
- GET /health: Health check

## Next: Add DB models, auth, Upstox integration