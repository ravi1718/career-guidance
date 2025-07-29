# Environment Setup Guide

This guide explains how to properly set up environment variables for the Career Guidance Application.

## 🔒 **IMPORTANT SECURITY NOTE**

**NEVER commit actual environment files to git!** They contain sensitive information like database credentials, API keys, and secrets.

## Environment Files Overview

### What's Tracked in Git ✅

- `.env.example` files - Templates with placeholder values
- `.env.production.example` files - Production templates

### What's NOT Tracked in Git ❌

- `.env` - Development environment
- `.env.production` - Production environment
- `.env.local` - Local overrides
- Any file containing real credentials

## Setup Instructions

### For Development

1. **Backend Setup**:

   ```bash
   cd backend
   cp .env.production.example .env
   # Edit .env with your development values
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   cp .env.production.example .env
   # Edit .env with development API URL (usually http://localhost:5000)
   ```

### For Production Deployment

1. **Backend Production**:

   ```bash
   cd backend
   cp .env.production.example .env.production
   # Edit .env.production with real production values
   ```

2. **Frontend Production**:
   ```bash
   cd frontend
   cp .env.production.example .env.production
   # Edit .env.production with real backend URL
   ```

## Environment Variables Reference

### Backend Variables

| Variable       | Description           | Example                                     |
| -------------- | --------------------- | ------------------------------------------- |
| `PORT`         | Server port           | `5000`                                      |
| `MONGODB_URI`  | Database connection   | `mongodb://localhost:27017/career-guidance` |
| `JWT_SECRET`   | JWT signing secret    | `your-super-secret-key`                     |
| `NODE_ENV`     | Environment mode      | `development` or `production`               |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8080`                     |

### Frontend Variables

| Variable            | Description     | Example                 |
| ------------------- | --------------- | ----------------------- |
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000` |

## Validation Scripts

Both frontend and backend have validation scripts to check your environment setup:

```bash
# Backend validation
cd backend
npm run deploy

# Frontend validation
cd frontend
npm run build:prod
```

## Common Issues

### 1. Environment File Not Found

**Error**: `❌ Error: .env.production file not found!`
**Solution**: Copy the example file and edit it with your values

### 2. Placeholder Values

**Error**: `❌ Error: Please update VITE_API_BASE_URL`
**Solution**: Replace placeholder URLs with actual deployment URLs

### 3. CORS Issues

**Error**: CORS errors in browser console
**Solution**: Ensure `FRONTEND_URL` in backend matches your frontend domain exactly

## Security Best Practices

1. **Use Strong Secrets**: Generate random, long JWT secrets
2. **Different Secrets Per Environment**: Don't reuse development secrets in production
3. **Secure Database**: Use authentication for MongoDB in production
4. **HTTPS Only**: Use HTTPS URLs for production deployments
5. **Environment Isolation**: Keep development and production environments separate

## Example Values

### Development

```bash
# backend/.env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-guidance
JWT_SECRET=dev-secret-key-change-in-production
NODE_ENV=development
FRONTEND_URL=http://localhost:8080

# frontend/.env
VITE_API_BASE_URL=http://localhost:5000
```

### Production

```bash
# backend/.env.production (or hosting platform env vars)
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/career-guidance
JWT_SECRET=super-secure-random-production-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app

# frontend/.env.production
VITE_API_BASE_URL=https://your-backend.vercel.app
```
