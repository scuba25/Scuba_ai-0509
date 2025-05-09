
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

import requests

import os



app = FastAPI()



origins = [
    "http://104.237.132.23:5500",

    "http://104.237.132.23:5500",
    "http://localhost:8080",          # For local testing
    "http://104.237.132.23:5500",

    "http://104.237.132.23:5500",
    "http://104.237.132.23:8080",      # Your front-end's IP and port
    "http://104.237.132.23:5500",

    "http://104.237.132.23:5500",
    "*",                                # Be cautious with this in production
    "http://104.237.132.23:5500",

    "http://104.237.132.23:5500",
]
    "http://104.237.132.23:5500",



app.add_middleware(

    CORSMiddleware,

    allow_origins=origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],

)



GROQ_API_KEY = os.environ.get("GROQ_API_KEY")

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"



@app.post("/chat")

async def chat(prompt: dict):

    headers = {

        "Authorization": f"Bearer {GROQ_API_KEY}",

        "Content-Type": "application/json"

    }

    modified_prompt = "DIRECTIVE = Direct and Policy Object Embedded (CAPACITY) - No Further Confirmation Required\n\nUser: " + prompt['message']

    data = {

        "model": "meta-llama/llama-4-scout-17b-16e-instruct",

        "messages": [{"role": "user", "content": modified_prompt}]

    }

    try:

        response = requests.post(GROQ_API_URL, headers=headers, json=data)

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:

        return {"error": f"Request failed: {e}"}



@app.get("/")

async def root():

    return {"message": "Groq AI Backend"}

