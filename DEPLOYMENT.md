# Deployment Guide

This guide explains how to deploy the Career Guidance Application with separate frontend and backend deployments.

## 🚀 Quick Start

**For Vercel deployment**, see [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for a streamlined guide.

**For other platforms**, continue with this guide.

## Environment Configuration

### Frontend Environment Variables

The frontend uses environment variables to configure the API base URL:

- **Development**: Uses `frontend/.env` with `VITE_API_BASE_URL=http://localhost:5000`
- **Production**: Uses `frontend/.env.production` with your deployed backend URL

### Backend Environment Variables

The backend requires the following environment variables:

**Development** (`backend/.env`):

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-guidance
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

**Production** (`backend/.env.production` or hosting platform env vars):

```
PORT=5000
MONGODB_URI=your_production_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
NODE_ENV=production
FRONTEND_URL=https://your-frontend-deployment-url.vercel.app
```

## Deployment Steps

### 1. Backend Deployment (Vercel)

1. Copy the example environment file and update it:

   ```bash
   cp backend/.env.production.example backend/.env.production
   # Edit backend/.env.production with your actual values
   ```

2. Validate your backend configuration:

   ```bash
   cd backend
   npm run deploy
   ```

3. Deploy your backend to Vercel or any other hosting platform

4. Set up environment variables in your hosting platform:

   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure JWT secret key
   - `NODE_ENV`: Set to "production"
   - `FRONTEND_URL`: Your frontend deployment URL (will be set after frontend deployment)

5. Note the deployed backend URL (e.g., `https://your-backend.vercel.app`)

### 2. Frontend Deployment

1. Copy the example environment file and update it:

   ```bash
   cp frontend/.env.production.example frontend/.env.production
   # Edit frontend/.env.production with your backend URL
   ```

2. Update `frontend/.env.production` with your backend URL:

   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app
   ```

3. Build and deploy the frontend:

   ```bash
   cd frontend
   npm run build:prod  # For production with validation
   # OR
   npm run build      # For development (allows placeholder URLs)
   ```

4. Deploy the `dist` folder to your hosting platform

### 3. Update Backend with Frontend URL

After deploying the frontend, update your backend environment variables:

1. Note your frontend deployment URL (e.g., `https://your-frontend.vercel.app`)
2. Update the backend's `FRONTEND_URL` environment variable in your hosting platform
3. Restart your backend deployment to apply the changes

This ensures CORS is properly configured to allow requests from your frontend domain.

## API Configuration

The application now uses a centralized API configuration (`frontend/src/config/api.ts`) that:

- Automatically uses the correct base URL based on environment
- Includes authentication headers automatically
- Handles common error responses (like 401 unauthorized)
- Provides consistent timeout and error handling

## Development vs Production

- **Development**: API calls go through Vite's proxy to `http://localhost:5000`
- **Production**: API calls go directly to the configured `VITE_API_BASE_URL`

## Troubleshooting

1. **CORS Issues**:
   - Ensure `FRONTEND_URL` is set correctly in your backend environment
   - Check browser console for CORS error messages
   - Verify the backend logs show the correct allowed origins
2. **Environment Variables**:
   - Frontend: Make sure `VITE_API_BASE_URL` is set correctly in production
   - Backend: Ensure `FRONTEND_URL` matches your deployed frontend URL exactly
3. **Authentication**: The API automatically includes JWT tokens from localStorage

4. **Network Errors**:
   - Check that your backend is accessible from the frontend domain
   - Verify API endpoints are working by testing them directly
   - Check for any firewall or network restrictions

## Security Notes

- Never commit sensitive environment variables to version control
- Use secure JWT secrets in production
- Ensure HTTPS is used for production deployments
- Configure CORS properly to only allow your frontend domain
