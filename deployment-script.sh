#!/bin/bash
echo "Please enter your Firebase authentication keys:"
read -p "API Key: " API_KEY
read -p "Auth Domain: " AUTH_DOMAIN
read -p "Project ID: " PROJECT_ID
read -p "Storage Bucket: " STORAGE_BUCKET
read -p "Messaging Sender ID: " MESSAGING_SENDER_ID
read -p "App ID: " APP_ID
read -p "Measurement ID: " MEASUREMENT_ID

# Export the keys as environment variables
export REACT_APP_FIREBASE_API_KEY=$API_KEY
export REACT_APP_FIREBASE_AUTH_DOMAIN=$AUTH_DOMAIN
export REACT_APP_FIREBASE_PROJECT_ID=$PROJECT_ID
export REACT_APP_FIREBASE_STORAGE_BUCKET=$STORAGE_BUCKET
export REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$MESSAGING_SENDER_ID
export REACT_APP_FIREBASE_APP_ID=$APP_ID
export REACT_APP_FIREBASE_MEASUREMENT_ID=$MEASUREMENT_ID


npm install
echo "dependencies installed correctly"

npm run build
echo "app built successfully"

firebase deploy
echo "app hosted successfully"
