#!/bin/bash -x

set -e

# Configuration
GIT_BRANCH="master"
DOCKER_IMAGE_NAME="pos.ui"
CONTAINER_NAME="pos-web.ui"
PORT_MAPPING="3000:3000"

# Deployment Steps
cd PointOfSaleWeb.UI
git checkout "$GIT_BRANCH"
git config pull.rebase false
git pull
docker stop "$CONTAINER_NAME" || true  # Ignore errors if container doesn't exist
docker rm "$CONTAINER_NAME" || true    # Ignore errors if container doesn't exist
docker build -t "$DOCKER_IMAGE_NAME" .
docker run -d -p "$PORT_MAPPING" --restart unless-stopped --name "$CONTAINER_NAME" "$DOCKER_IMAGE_NAME"
docker image prune -f

# Logging
echo "List of running Docker containers:"
docker ps