#!/bin/bash
cd ~/scuba_ai/frontend || exit 1
echo "[*] Starting frontend on http://localhost:5500"
python3 -m http.server 5500 &
