# Deployment Checklist

Follow this step-by-step checklist to deploy your Career Guidance Application.

## Pre-Deployment Setup

### ✅ Backend Preparation

- [ ] Create `backend/.env.production` with production values
- [ ] Set up MongoDB production database
- [ ] Generate secure JWT secret key
- [ ] Run `npm run deploy` in backend folder to validate configuration

### ✅ Frontend Preparation

- [ ] Create `frontend/.env.production` with backend URL placeholder
- [ ] Test build process locally with `npm run build`

## Deployment Process

### Step 1: Deploy Backend

- [ ] Deploy backend to Vercel/Heroku/your hosting platform
- [ ] Set environment variables in hosting platform:
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (leave as placeholder for now)
- [ ] Test backend deployment with API calls
- [ ] Note the backend URL (e.g., `https://your-backend.vercel.app`)

### Step 2: Deploy Frontend

- [ ] Update `frontend/.env.production` with actual backend URL:
  ```
  VITE_API_BASE_URL=https://your-backend.vercel.app
  ```
- [ ] Run `npm run build` to validate and build
- [ ] Deploy frontend to Vercel/Netlify/your hosting platform
- [ ] Note the frontend URL (e.g., `https://your-frontend.vercel.app`)

### Step 3: Update Backend CORS

- [ ] Update backend's `FRONTEND_URL` environment variable with actual frontend URL
- [ ] Restart backend deployment
- [ ] Verify CORS is working by checking browser console

## Post-Deployment Testing

### ✅ Authentication Flow

- [ ] Test student registration
- [ ] Test college registration
- [ ] Test login for both user types
- [ ] Verify JWT tokens are working

### ✅ API Functionality

- [ ] Test college listing
- [ ] Test aptitude test questions loading
- [ ] Test question submission
- [ ] Test college dashboard features

### ✅ CORS and Network

- [ ] Check browser console for CORS errors
- [ ] Verify API calls are reaching the backend
- [ ] Test from different browsers/devices

## Troubleshooting

### Common Issues

1. **CORS Errors**:

   - Check `FRONTEND_URL` matches exactly (no trailing slash)
   - Verify backend logs show correct allowed origins

2. **API Not Found (404)**:

   - Verify `VITE_API_BASE_URL` is correct
   - Check backend deployment is running

3. **Authentication Issues**:

   - Verify JWT_SECRET is set correctly
   - Check token storage in browser localStorage

4. **Database Connection**:
   - Verify MONGODB_URI is correct
   - Check database allows connections from your hosting platform

## Environment Variables Summary

### Backend Production Environment

```
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/career-guidance
JWT_SECRET=your-super-secure-secret-key-here
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend Production Environment

```
VITE_API_BASE_URL=https://your-backend.vercel.app
```

## Security Checklist

- [ ] JWT secret is secure and unique
- [ ] MongoDB connection uses authentication
- [ ] HTTPS is enabled for both frontend and backend
- [ ] CORS is configured to only allow your frontend domain
- [ ] Environment variables are not committed to version control
