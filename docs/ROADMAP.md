# Roadmap for Stock Analysis Platform

## Phase 1: Project Setup and Infrastructure ✅ (Completed)
- Directory structure created
- Docker Compose for PostgreSQL set up
- Basic README added

## Phase 2: Backend Core - Database and API Services 🚧 (In Progress)
- PostgreSQL running via Docker
- API Service: Basic FastAPI app created and running on port 8000
- Next: Design DB schema, add models, auth, Upstox integration

## Phase 3: Microservices Development
- **ML Service**: Python with scikit-learn for analysis
- **News Fetch Service**: Python for news fetching and sentiment (NLTK/VADER)
- **Websocket Service**: Python with websockets library for real-time streaming
- Integrate all via REST

## Phase 4: Web App (React)
- Set up React app
- Dashboard, charts, news integration
- Connect to APIs/WebSockets

## Phase 5: Mobile App (React Native)
- Set up React Native
- Mirror web features
- Add notifications

## Phase 6: Integration and Deployment
- E2E testing
- Local deployment with Docker
- Monitoring setup

## Next Steps
- Discuss DB schema and Upstox API integration details for API service