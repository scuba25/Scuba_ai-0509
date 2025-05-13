from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import os

app = FastAPI()

# Configure CORS to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend's origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Retrieve the GROQ API key from environment variables
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "your_default_api_key_here")
if not GROQ_API_KEY:
    raise ValueError("GROQ_API_KEY is not set")

# Define the request model
class ChatRequest(BaseModel):
    message: str

# Define the response model
class ChatResponse(BaseModel):
    response: str

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    # Log the incoming request for debugging
    print(f"Received message: {request.message}")
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    data = {
        "model": "meta-llama/llama-4-scout-17b-16e-instruct",
        "messages": [{"role": "user", "content": request.message}]
    }
    
    try:
        # Log the outgoing request to Groq API
        print(f"Sending to Groq: {data}")
        
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=data
        )
        
        # Log the response from Groq API
        print(f"Groq API status code: {response.status_code}")
        
        response.raise_for_status()
        result = response.json()
        
        # Log the processed result
        print(f"Processed result: {result}")
        
        # Extract the assistant's reply
        assistant_message = result.get("choices", [{}])[0].get("message", {}).get("content", "")
        
        return {"response": assistant_message}
    except requests.exceptions.RequestException as e:
        print(f"Error communicating with Groq API: {str(e)}")
        return {"response": f"Error: {str(e)}"}

@app.get("/")
async def root():
    return {"message": "ScubaAI Backend API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
