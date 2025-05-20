// This script builds just the client side for Netlify deployment
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function buildClient() {
  try {
    await build({
      root: __dirname,
      build: {
        outDir: '../dist',
        emptyOutDir: true
      }
    });
    console.log('✅ Client build completed successfully');
  } catch (error) {
    console.error('❌ Client build failed:', error);
    process.exit(1);
  }
}

buildClient();