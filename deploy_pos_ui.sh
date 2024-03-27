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
sudo docker stop "$CONTAINER_NAME" || true  # Ignore errors if container doesn't exist
sudo docker rm "$CONTAINER_NAME" || true    # Ignore errors if container doesn't exist
sudo docker build -t "$DOCKER_IMAGE_NAME" .
sudo docker run -d -p "$PORT_MAPPING" --restart unless-stopped --name "$CONTAINER_NAME" "$DOCKER_IMAGE_NAME"

# Cleanup
sudo docker system prune -af   # Remove all stopped containers, unused networks, and dangling images
sudo docker volume prune -f    # Remove all unused volumes

# Logging
echo "List of running Docker containers:"
sudo docker ps