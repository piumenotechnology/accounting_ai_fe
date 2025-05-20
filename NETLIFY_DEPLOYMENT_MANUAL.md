# Manual Deployment to Netlify

This guide will walk you through manually deploying the AccountingAI chatbot to Netlify.

## Step 1: Prepare Your Frontend Build

1. In your project, navigate to the client directory:
   ```
   cd client
   ```

2. Build your frontend application:
   ```
   npm run build
   ```

3. This will create a `dist` folder in your client directory with the built frontend app.

## Step 2: Deploy to Netlify Using the Drop Method

1. Log in to [Netlify](https://app.netlify.com/)

2. On your Netlify dashboard, look for the deployment area that says "Drag and drop your site folder here"

3. Open your file explorer and navigate to the `client/dist` folder in your project

4. Drag and drop this entire `dist` folder onto the designated area on the Netlify dashboard

5. Wait for upload and deployment to complete

6. Netlify will provide you with a unique URL for your deployed site (e.g., https://your-site-name.netlify.app)

## Step 3: Configure Redirects (Important for Single Page Apps)

After your site is deployed:

1. Go to your site settings in Netlify

2. Navigate to "Deploys" tab > "Deploy settings" > "Redirects"

3. Add the following redirect rule:
   ```
   From: /*
   To: /index.html
   Status: 200
   ```

4. Click "Save"

## Step 4: Configure Your Custom Domain (Optional)

1. In your site settings, go to "Domain management"

2. Click "Add custom domain"

3. Follow the instructions to connect your domain

## Troubleshooting

If you face issues with your deployed site:

1. Ensure your API endpoint in `src/lib/api.ts` is correctly set to: `https://accountingai-production.up.railway.app/chat`

2. If you make changes, rebuild your app and re-deploy by dragging the new `dist` folder to Netlify

3. Check the deploy logs in Netlify for any build errors

## Benefits of Manual Deployment

1. Bypasses complex configuration issues with Netlify's build system
2. Gives you direct control over what gets deployed
3. Often faster for simple frontend apps
4. Easier to troubleshoot deployment issues