# Vercel Deployment Guide

This guide explains how to deploy the Career Guidance Application to Vercel.

## 🚀 Quick Deployment Steps

### 1. Deploy Backend to Vercel

1. **Create a new Vercel project** for the backend:

   ```bash
   cd backend
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:

   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_connection_string
     JWT_SECRET = your_secure_jwt_secret
     NODE_ENV = production
     FRONTEND_URL = https://your-frontend-url.vercel.app
     ```

3. **Note your backend URL** (e.g., `https://career-guidance-backend.vercel.app`)

### 2. Deploy Frontend to Vercel

1. **Create a new Vercel project** for the frontend:

   ```bash
   cd frontend
   vercel
   ```

2. **Set environment variables** in Vercel dashboard:

   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add this variable:
     ```
     VITE_API_BASE_URL = https://your-backend-url.vercel.app
     ```

3. **Deploy**: Vercel will automatically build and deploy

### 3. Update Backend CORS

1. Go back to your **backend** Vercel project
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL
3. Redeploy the backend

## 🔧 Local Development vs Vercel

### Local Development

- Uses `.env.production` files
- Requires manual file creation and editing
- Build command: `npm run build` (with local validation)

### Vercel Deployment

- Uses Vercel dashboard environment variables
- No local `.env.production` files needed
- Build command: `npm run build:vercel` (skips file validation)

## 📋 Environment Variables Reference

### Backend (Vercel Dashboard)

| Variable       | Value                          | Example                                                       |
| -------------- | ------------------------------ | ------------------------------------------------------------- |
| `MONGODB_URI`  | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/career-guidance` |
| `JWT_SECRET`   | Secure random string           | `super-secure-random-key-here`                                |
| `NODE_ENV`     | `production`                   | `production`                                                  |
| `FRONTEND_URL` | Your frontend Vercel URL       | `https://career-guidance-frontend.vercel.app`                 |

### Frontend (Vercel Dashboard)

| Variable            | Value                   | Example                                      |
| ------------------- | ----------------------- | -------------------------------------------- |
| `VITE_API_BASE_URL` | Your backend Vercel URL | `https://career-guidance-backend.vercel.app` |

## 🛠️ Build Configuration

The frontend `vercel.json` is configured to:

- Use `npm run build:vercel` (skips local file validation)
- Handle SPA routing with rewrites

```json
{
  "buildCommand": "npm run build:vercel",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 🔍 Troubleshooting

### Build Fails with ".env.production file not found"

**Solution**: This happens when running local build commands. For Vercel:

1. Set environment variables in Vercel dashboard
2. Vercel will automatically use them during build

### CORS Errors

**Solution**:

1. Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
2. No trailing slashes
3. Use HTTPS URLs

### API Calls Fail

**Solution**:

1. Check `VITE_API_BASE_URL` is set correctly in frontend
2. Verify backend is deployed and accessible
3. Check browser network tab for actual URLs being called

## 📱 Testing Your Deployment

1. **Backend Health Check**:

   ```bash
   curl https://your-backend-url.vercel.app/api/health
   ```

2. **Frontend Access**:

   - Visit your frontend URL
   - Check browser console for errors
   - Test login/registration functionality

3. **CORS Verification**:
   - Open browser dev tools
   - Check for CORS errors in console
   - Verify API calls are successful

## 🔐 Security Checklist

- ✅ Use strong, unique JWT secrets
- ✅ Use secure MongoDB connection (authentication enabled)
- ✅ Set `NODE_ENV=production`
- ✅ Use HTTPS URLs for all environment variables
- ✅ Don't commit actual environment files to git

## 🚀 Automatic Deployments

Once set up, Vercel will automatically:

- Deploy on every git push to main branch
- Use the environment variables from dashboard
- Build using the configured build command
- Handle SSL certificates and CDN

Your application will be live and automatically updated with each code change!
