# Simple Netlify Deployment Guide for AccountingAI Chatbot

## Step 1: Download Your Project

First, download your entire project from Replit:
1. Click the three dots menu in the top-right corner
2. Select "Download as ZIP"
3. Extract the ZIP file on your computer

## Step 2: Create a Production Build

1. Open your terminal/command prompt
2. Navigate to the directory where you extracted the ZIP file
3. Run these commands:

```bash
# Go to the client directory
cd client

# Install dependencies 
npm install

# Create a production build
npm run build
```

This will create a `dist` folder inside the client directory containing your built application.

## Step 3: Deploy to Netlify

### Option 1: Using Netlify Drop (Easiest)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop the entire `dist` folder from your client directory
3. Wait for the upload to complete
4. Your site will be live at a random Netlify domain like `random-name.netlify.app`

### Option 2: Using Netlify CLI

1. Install Netlify CLI if you haven't already:
   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:
   ```bash
   netlify login
   ```

3. Deploy your site:
   ```bash
   cd client/dist
   netlify deploy --prod
   ```

4. Follow the prompts and your site will be deployed

## Step 4: Add a Custom Domain (Optional)

1. Go to your site in the Netlify dashboard
2. Click "Domain settings"
3. Click "Add custom domain"
4. Follow the steps to connect your domain

## Troubleshooting

If your site doesn't work after deployment:

1. Check if you can see the chat interface
2. Open browser developer tools (F12) and check for errors
3. Verify the API endpoint in the Network tab is correctly pointing to:
   `https://accountingai-production.up.railway.app/chat`

## Making Updates

When you want to update your site:
1. Make your changes in Replit
2. Rebuild using the steps in Step 2
3. Re-deploy using the same method you chose in Step 3