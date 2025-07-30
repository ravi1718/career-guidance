# Database Setup for Production Deployment

## 🚨 **Problem**: Local MongoDB Compass Won't Work on Vercel

When you deploy to Vercel, your backend runs on Vercel's servers, not your local machine. It can't access `mongodb://localhost:27017` because that's your local computer.

## ✅ **Solution**: Use MongoDB Atlas (Cloud Database)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project
4. Build a cluster (choose **FREE** M0 Sandbox)

### Step 2: Configure Database Access

1. **Create Database User:**
   - Go to "Database Access" in Atlas sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `career-guidance-user` (or any name)
   - Password: Generate a secure password
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

### Step 3: Configure Network Access

1. **Allow Vercel Access:**
   - Go to "Network Access" in Atlas sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - This allows Vercel to connect to your database
   - Click "Confirm"

### Step 4: Get Connection String

1. **Get Connection URI:**

   - Go to "Clusters" in Atlas
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string
   - It looks like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

2. **Customize Connection String:**
   - Replace `<password>` with your actual password
   - Add your database name at the end: `/career-guidance`
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-guidance?retryWrites=true&w=majority`

### Step 5: Update Vercel Environment Variables

1. **Go to Backend Vercel Project:**

   - Vercel Dashboard → Your Backend Project → Settings → Environment Variables

2. **Update MONGODB_URI:**

   - Variable: `MONGODB_URI`
   - Value: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-guidance?retryWrites=true&w=majority`
   - Environment: Production (and Preview if needed)

3. **Set Other Variables:**
   ```
   JWT_SECRET = your-super-secure-random-string-here
   NODE_ENV = production
   FRONTEND_URL = https://your-frontend-url.vercel.app
   ```

### Step 6: Redeploy Backend

1. **Trigger Redeploy:**
   - Go to "Deployments" tab in Vercel
   - Click "Redeploy" on the latest deployment
   - OR push a new commit to trigger automatic deployment

## 🔄 **Migrate Your Local Data (Optional)**

If you have existing data in MongoDB Compass:

### Export from Local MongoDB

```bash
# Install MongoDB Database Tools if not installed
# https://www.mongodb.com/try/download/database-tools

# Export collections
mongoexport --host localhost:27017 --db career-guidance --collection users --out users.json
mongoexport --host localhost:27017 --db career-guidance --collection colleges --out colleges.json
mongoexport --host localhost:27017 --db career-guidance --collection questions --out questions.json
```

### Import to Atlas

```bash
# Replace with your actual Atlas connection string
mongoimport --uri "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-guidance" --collection users --file users.json
mongoimport --uri "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-guidance" --collection colleges --file colleges.json
mongoimport --uri "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/career-guidance" --collection questions --file questions.json
```

## 🧪 **Test Your Setup**

### 1. Check Backend Health

Visit: `https://your-backend-url.vercel.app/api/health`

You should see:

```json
{
  "status": "ok",
  "database": {
    "state": "connected",
    "uri": "configured"
  },
  "environment": "production"
}
```

### 2. Test Registration

- Go to your frontend
- Try to register a new user
- Check browser console for errors

### 3. Check Vercel Logs

- Go to Vercel Dashboard → Your Backend Project → Functions
- Click on any function to see logs
- Look for MongoDB connection messages

## 🚨 **Common Issues & Solutions**

### Issue: "MongoNetworkError: failed to connect"

**Solution**: Check Network Access in Atlas allows 0.0.0.0/0

### Issue: "Authentication failed"

**Solution**: Verify username/password in connection string

### Issue: "Database not found"

**Solution**: Ensure database name is in connection string: `/career-guidance`

### Issue: CORS errors

**Solution**: Update `FRONTEND_URL` in Vercel environment variables

## 💡 **Pro Tips**

1. **Use Environment-Specific Databases:**

   - Production: Atlas cluster
   - Development: Local MongoDB Compass
   - This keeps your data separate

2. **Monitor Usage:**

   - Atlas free tier has 512MB storage limit
   - Monitor usage in Atlas dashboard

3. **Backup Strategy:**
   - Atlas provides automatic backups
   - Consider periodic exports for critical data

## 🔐 **Security Best Practices**

- ✅ Use strong, unique passwords
- ✅ Enable IP whitelisting when possible
- ✅ Use different credentials for dev/prod
- ✅ Never commit connection strings to git
- ✅ Rotate passwords periodically

Your login/register functionality should work once the database connection is established!
