// This script helps build only the client-side code for Netlify deployment
const fs = require('fs');
const { execSync } = require('child_process');

console.log('Building frontend for Netlify deployment...');

// Create a temporary vite.config.js just for frontend build
const tempViteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
      '@assets': path.resolve(__dirname, './assets')
    }
  },
  build: {
    outDir: 'dist'
  }
});
`;

// Write temporary config
fs.writeFileSync('netlify-vite.config.js', tempViteConfig);

try {
  // Build the frontend only using the temporary config
  execSync('npx vite build --config netlify-vite.config.js', { stdio: 'inherit' });
  console.log('Frontend build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Clean up temporary file
  fs.unlinkSync('netlify-vite.config.js');
}