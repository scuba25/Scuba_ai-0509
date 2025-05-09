#!/bin/bash

# Navigate to the frontend directory
cd ~/scuba_ai/frontend

# Start a simple Python HTTP server in the background on port 8080
echo "Starting front-end server on http://localhost:8080"
python3 -m http.server 5000 &

# Keep the script running in the background (optional)
tail -f /dev/null
