# Stock Analysis Platform

A microservices-based platform for Stocks/Futures/Options analysis with web and mobile apps.

## Architecture Overview
- **Backend**: Python (FastAPI) microservices
- **Database**: PostgreSQL (Docker)
- **Services**:
  - API Service: Main CRUD and business logic
  - ML Service: Analysis and predictions
  - News Fetch Service: News aggregation and sentiment
  - Websocket Service: Real-time data streaming
- **Frontend**:
  - Web App: React
  - Mobile App: React Native
- **Communication**: REST APIs (for now)

## Roadmap
See [ROADMAP.md](docs/ROADMAP.md) for detailed phases.

## Setup
1. Ensure Docker is installed.
2. Start PostgreSQL: `cd docker && docker-compose up -d`
3. For each service, navigate to its folder and set up Python venv: `python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`
4. Run services individually (details in each service's README).

## Development
- Deployment: Local (expand to cloud later)
- No team/timeline constraints - iterative development