# Netlify Deployment Instructions

This document provides step-by-step instructions for deploying this chatbot interface to Netlify.

## Prerequisites

- A Netlify account
- Git repository containing this project (GitHub, GitLab, or Bitbucket)

## Deployment Steps

1. **Prepare the build command**:
   
   When deploying on Netlify, use the following settings:

   - **Build command**: `vite build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (or higher)

2. **Add environment variables** (if needed):
   
   If your project connects to external APIs that require authentication, add the necessary environment variables in the Netlify dashboard.

3. **Add the redirect rule**:
   
   Create a `_redirects` file in your project root with the following content:
   ```
   /*  /index.html  200
   ```

   This ensures that client-side routing works correctly.

## Manual Deployment

If you prefer manual deployment:

1. Build the project locally:
   ```
   npm run build
   ```

2. Deploy the `dist` folder manually via the Netlify UI by dragging and dropping it.

## Important Configuration

Make sure your Netlify site is configured to:

1. Handle client-side routing (using the redirects rule mentioned above)
2. Use Node.js version 18 or higher
3. Allow API requests to the external endpoint: `https://accountingai-production.up.railway.app/chat`

## Troubleshooting

If you encounter CORS issues when making API requests from your Netlify deployment, ensure the API at `https://accountingai-production.up.railway.app/chat` allows requests from your Netlify domain.

You may need to contact the API provider to add your Netlify domain (e.g., `your-site.netlify.app`) to their allowed origins list.