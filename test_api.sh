#!/bin/bash
echo "[*] Testing backend API..."
curl -X GET http://localhost:8000/
echo ""
echo "[*] Testing chat endpoint..."
curl -X POST http://localhost:8000/chat   -H "Content-Type: application/json"   -d '{"message":"Hello, ScubaAI!"}'
echo ""
