#!/bin/bash

# Define variables for paths
REMOTE_USER="pi_five"
REMOTE_HOST="bachpad.ddns.net"
REMOTE_FRONTEND_PATH="/home/pi/frontend"
REMOTE_BACKEND_PATH="/home/pi/nest_backend"

# Build and push frontend
echo "Building frontend..."
# docker-compose build frontend
docker build --platform linux/arm64/v8 -t dec5star/ciseass1b_frontend:arm64 ./frontend
echo "Pushing frontend image to Docker Hub..."
docker push dec5star/ciseass1b_frontend:arm64

# Build and push backend
echo "Building backend..."
#docker-compose build backend
docker build --platform linux/arm64/v8 -t dec5star/ciseass1b_backend:arm64 ./nest_backend
echo "Pushing backend image to Docker Hub..."
docker push dec5star/ciseass1b_backend:arm64

echo "Build and push completed!"

# Copy frontend and backend directories to Raspberry Pi
echo "Copying frontend and backend to Raspberry Pi..."
scp -r ./frontend $REMOTE_USER@$REMOTE_HOST:$REMOTE_FRONTEND_PATH
scp -r ./nest_backend $REMOTE_USER@$REMOTE_HOST:$REMOTE_BACKEND_PATH

# SSH into Raspberry Pi and pull and run Docker images
echo "Connecting to Raspberry Pi..."
ssh -p 4321 $REMOTE_USER@$REMOTE_HOST << EOF
  echo "Killing all running containers..."
  docker kill \$(docker ps -q)
  echo "Pruning stopped containers..."
  docker container prune -f
  echo "Pulling frontend image..."
  docker pull dec5star/ciseass1b_frontend:arm64
  echo "Running frontend container..."
  docker run -d --name frontend_container \
    -p 3000:3000 \
    -v $REMOTE_FRONTEND_PATH:/app/frontend \
    -v /app/frontend/node_modules \
    dec5star/ciseass1b_frontend:arm64

  echo "Pulling backend image..."
  docker pull dec5star/ciseass1b_backend:arm64
  echo "Running backend container..."
  docker run -d --name backend_container \
    -p 6000:6000 \
    -v $REMOTE_BACKEND_PATH:/app/backend \
    -v /app/backend/node_modules \
    dec5star/ciseass1b_backend:arm64
EOF

echo "Deployment on Raspberry Pi completed!"