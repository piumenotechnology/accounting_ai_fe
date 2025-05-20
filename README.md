# AccountingAI Chatbot

A responsive React chatbot frontend that connects to an accounting AI API with table type selection and clean UI.

## Features

- Table type selection (Closed Deal, Payment, Invoice, AR, AP)
- Responsive design for mobile and desktop
- Clean, professional UI
- Session tracking
- Error handling

## Deployment to Netlify

Follow these steps to deploy this application to Netlify:

1. **Sign up for Netlify**
   - Create an account at [netlify.com](https://www.netlify.com/)

2. **Deploy from Git**
   - Log in to Netlify
   - Click "New site from Git"
   - Connect your Git provider (GitHub, GitLab, or Bitbucket)
   - Select this repository

3. **Configure build settings**
   - Build command: `./netlify_build.sh`
   - Publish directory: `dist`

4. **Deploy**
   - Click "Deploy site"

## Alternatively: Deploy from the Netlify UI

1. **Create a production build locally**
   ```
   ./netlify_build.sh
   ```

2. **Drag and drop**
   - Go to Netlify dashboard
   - Drag and drop the `dist` folder to the Netlify UI

Your site will be live with a Netlify subdomain (e.g., your-site-name.netlify.app) which you can customize later with your own domain.

## API Integration

This chatbot uses the AccountingAI API at:
```
https://accountingai-production.up.railway.app/chat
```

The API accepts requests in this format:
```json
{
  "session_id": "test-session-0123",
  "table": "closed_deal",
  "message": "can compare revenue for Q1 and Q3 in 2024 closed for sponsors"
}
```

And returns responses like:
```json
{
  "response": "The latest sponsorship deal is with Denodo, amounting to $15,000. It was closed on April 4, 2025, and is associated with the \"Big Data 2025 (Live)\" conference. The deal has been marked as successfully closed."
}
```