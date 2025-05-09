#!/bin/bash


# --- Configuration ---

IMAGE_NAME="scuba-ai-backend"

CONTAINER_NAME="scuba-ai-backend-container"

HOST_PORT="8080"

CONTAINER_PORT="5000"


# --- Automation Steps ---


echo "--- Building Docker image: $IMAGE_NAME ---"

# Build the image (the '.' means build from the current directory)

# Use set -e to exit immediately if a command exits with a non-zero status.

set -e

cd ~/scuba_ai
if ! sudo docker build -t "$IMAGE_NAME:latest" .; then

    echo "Error: Docker build failed."

    exit 1

fi

set +e # Turn off exiting on error for subsequent steps that might fail expectedly (like stopping a non-existent container)


echo "--- Stopping and removing old container: $CONTAINER_NAME ---"

# Stop the running container (if it exists)

# &>/dev/null suppresses output, || true prevents script from failing if container doesn't exist

sudo docker stop "$CONTAINER_NAME" &>/dev/null || true

# Remove the container (if it exists)

sudo docker rm "$CONTAINER_NAME" &>/dev/null || true


echo "--- Running new container: $CONTAINER_NAME ---"

# Run the new container

# -d: run in detached mode

# -p: port mapping (host_port:container_port)

# --name: assign a name to the container

if sudo docker run -d --name "$CONTAINER_NAME" -p "$HOST_PORT":"$CONTAINER_PORT" "$IMAGE_NAME:latest"; then

    echo "--- Container started successfully! ---"

    echo "You can check its status with: sudo docker ps"

    echo "You can view logs with: sudo docker logs $CONTAINER_NAME"

else

    echo "Error: Failed to start the container."

    exit 1

fi

