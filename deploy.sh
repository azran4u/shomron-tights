#!/bin/bash

# read the service name to deploy from the first arg
SERVICE_NAME=$1

#  if the service name is empty, exit
if [ -z "$SERVICE_NAME" ]; then
  echo "Please provide a service name to deploy"
  exit 1
fi

# Source nvm script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Save the current working directory
CWD=$(pwd)

CURRENT_NODE_VERSION=$(nvm current)

function build-react-app() {
  echo "Building React app"
  nvm use v18.19.1
  npm install
  npm run build
}

function firebase-cli-node() {
  echo "Deploying to Firebase"
  nvm use v18.19.1
}

# if the service name is "frontend", deploy the frontend service
if [ "$SERVICE_NAME" == "customer-frontend" ]; then
  echo "Deploying frontend service"
  cd customer-frontend
  build-react-app
  firebase-cli-node
  firebase deploy --only hosting:customer-frontend
fi

# if the service name is "backend", deploy the backend service
if [ "$SERVICE_NAME" == "fn1" ]; then
  echo "Deploying backend service fn1"  
  cd functions/fn1
  source venv/bin/activate
  python3 -m pip install -r requirements.txt
  firebase-cli-node
  firebase deploy --only functions:fn1
fi

cd $CWD
nvm use $CURRENT_NODE_VERSION