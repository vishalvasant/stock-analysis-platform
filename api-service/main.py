from fastapi import FastAPI

app = FastAPI(title="Stock Analysis API", version="1.0.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to Stock Analysis API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}