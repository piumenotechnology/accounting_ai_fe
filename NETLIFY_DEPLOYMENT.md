# Deploying AccountingAI Chatbot to Netlify

This guide provides instructions on how to deploy the AccountingAI Chatbot frontend to Netlify.

## Prerequisites

- A [Netlify account](https://app.netlify.com/signup)
- Git repository with your code (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Export Your Code to GitHub

First, you need to push your code to a Git repository:

```bash
# Initialize a Git repository if you haven't already
git init
git add .
git commit -m "Initial commit"

# Create a repository on GitHub and push your code
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Connect to Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories
5. Select your AccountingAI chatbot repository

### 3. Configure Build Settings

Configure the following build settings:

- **Build command**: `npm run build`
- **Publish directory**: `dist`

### 4. Advanced Build Settings

Add these environment variables:

- `NODE_ENV`: `production`

### 5. Deploy Your Site

Click "Deploy site" and wait for the build process to complete.

## Post-Deployment Steps

After deployment, you'll get a unique Netlify URL (like `https://your-site-name.netlify.app`). You can:

1. Set up a custom domain in the Netlify dashboard
2. Configure HTTPS (automatically handled by Netlify)
3. Set up continuous deployment

## Troubleshooting

If your deployment fails, check:

1. Build logs in the Netlify dashboard
2. Make sure all dependencies are correctly listed in `package.json`
3. Verify that the API endpoint in `client/src/lib/api.ts` is correctly pointing to the external API: `https://accountingai-production.up.railway.app/chat`

## Important Notes

- The application uses an external API at `https://accountingai-production.up.railway.app/chat`
- All server-side logic is handled by this external API
- The Netlify deployment contains only the frontend React application