#!/bin/bash

# This script prepares and builds the client-side application for Netlify deployment

echo "🚀 Starting Netlify build preparation..."

# Create a clean dist directory
rm -rf dist
mkdir -p dist

# Navigate to client directory
cd client

# Build the React application
echo "📦 Building the React application..."
npx vite build

# Copy all built files to the root dist directory for Netlify
echo "📋 Copying build files to dist directory..."
cp -r dist/* ../dist/

# Back to root
cd ..

echo "✅ Build completed! The application is ready for Netlify deployment."
echo "Your app can now be deployed to Netlify from the 'dist' directory."