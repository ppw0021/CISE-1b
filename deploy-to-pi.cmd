@echo off
setlocal

REM Define variables for paths
set "REMOTE_USER=pi_five"
set "REMOTE_HOST=bachpad.ddns.net"
set "REMOTE_FRONTEND_PATH=/home/pi/frontend"
set "REMOTE_BACKEND_PATH=/home/pi/nest_backend"

REM Build and push frontend
echo Building frontend...
docker build --platform linux/arm64/v8 -t dec5star/ciseass1b_frontend:arm64 ./frontend
echo Pushing frontend image to Docker Hub...
docker push dec5star/ciseass1b_frontend:arm64

REM Build and push backend
echo Building backend...
docker build --platform linux/arm64/v8 -t dec5star/ciseass1b_backend:arm64 ./nest_backend
echo Pushing backend image to Docker Hub...
docker push dec5star/ciseass1b_backend:arm64

echo Build and push completed!

REM Copy frontend and backend directories to Raspberry Pi
echo Copying frontend and backend to Raspberry Pi...
pscp -r ./frontend %REMOTE_USER%@%REMOTE_HOST%:%REMOTE_FRONTEND_PATH%
pscp -r ./nest_backend %REMOTE_USER%@%REMOTE_HOST%:%REMOTE_BACKEND_PATH%

REM SSH into Raspberry Pi and pull and run Docker images
echo Connecting to Raspberry Pi...
plink -ssh -P 4321 %REMOTE_USER%@%REMOTE_HOST% ^
  "docker kill $(docker ps -q) && \
   docker container prune -f && \
   docker pull dec5star/ciseass1b_frontend:arm64 && \
   docker run -d --name frontend_container -p 3000:3000 -v %REMOTE_FRONTEND_PATH%:/app/frontend -v /app/frontend/node_modules dec5star/ciseass1b_frontend:arm64 && \
   docker pull dec5star/ciseass1b_backend:arm64 && \
   docker run -d --name backend_container -p 6000:6000 -v %REMOTE_BACKEND_PATH%:/app/backend -v /app/backend/node_modules dec5star/ciseass1b_backend:arm64"

echo Deployment on Raspberry Pi completed!
