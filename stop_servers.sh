#!/bin/bash
echo "[*] Stopping ScubaAI servers..."
# Find and kill the Python HTTP server
pkill -f "python3 -m http.server 5500" || true
# Stop the Docker containers
docker stop scuba-ai-backend-container || true
docker rm scuba-ai-backend-container || true
echo "[*] Servers stopped"
