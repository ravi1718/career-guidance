# Career Guidance Application

A full-stack web application that helps students find suitable colleges and take aptitude tests, while allowing colleges to manage their information and test questions.

## Features

### For Students

- Browse colleges by location and courses
- Take aptitude tests
- View personalized recommendations
- User authentication and profile management

### For Colleges

- Manage college information
- Create and manage aptitude test questions
- View student applications and test results
- Dashboard for administrative tasks

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express.js, MongoDB, JWT Authentication
- **Deployment**: Vercel (both frontend and backend)

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Page components
│   │   ├── contexts/   # React contexts (Auth, etc.)
│   │   ├── config/     # Configuration files (API setup)
│   │   └── hooks/      # Custom React hooks
│   ├── .env            # Development environment variables
│   └── .env.production # Production environment variables
├── backend/            # Express.js backend API
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── .env            # Backend environment variables
└── DEPLOYMENT.md       # Detailed deployment guide
```

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/career-guidance
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. The `.env` file is already configured for development:

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:8080`

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deployment Steps

1. **Deploy Backend**: Deploy the backend to Vercel or your preferred platform
2. **Update Frontend Config**: Update `frontend/.env.production` with your backend URL
3. **Deploy Frontend**: Build and deploy the frontend

```bash
# Update production environment
echo "VITE_API_BASE_URL=https://your-backend-url.vercel.app" > frontend/.env.production

# Build for production
cd frontend
npm run build

# Deploy the dist folder
```

## API Configuration

The application uses a centralized API configuration that automatically:

- Uses the correct base URL for development vs production
- Includes authentication headers
- Handles common error responses
- Provides consistent timeout and error handling

## Environment Variables

📋 **For detailed environment setup instructions, see [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)**

### Frontend

- `VITE_API_BASE_URL`: Base URL for API calls

### Backend

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend application URL for CORS configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
