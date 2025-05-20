#!/bin/bash

# Create a client-only build for Netlify
echo "Starting Netlify build process..."

# Create the dist directory for netlify
mkdir -p dist

# Copy the client HTML file to dist
cp client/index.html dist/

# Create a build directory for client assets
mkdir -p dist/assets

# Build client with vite
cd client
npm run build

# Move all built assets to the dist directory
mv dist/* ../dist/

echo "Build completed successfully!"