// This script prepares a netlify-specific build of the client application
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.resolve(projectRoot, 'dist');

// Make sure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy the index.html file
fs.copyFileSync(
  path.resolve(__dirname, 'index.html'),
  path.resolve(distDir, 'index.html')
);

console.log('✅ Project prepared for Netlify deployment');
console.log('Run "npm run build" to build the frontend application');
console.log('The output will be in the dist/ directory which can be deployed to Netlify');