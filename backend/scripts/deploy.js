#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Check if .env.production exists
const envProductionPath = path.join(__dirname, "..", ".env.production");

if (!fs.existsSync(envProductionPath)) {
  console.error("❌ Error: .env.production file not found!");
  console.log(
    "📝 Please create backend/.env.production with your production settings:"
  );
  console.log("   PORT=5000");
  console.log("   MONGODB_URI=your_production_mongodb_uri");
  console.log("   JWT_SECRET=your_secure_jwt_secret_key");
  console.log("   NODE_ENV=production");
  console.log(
    "   FRONTEND_URL=https://your-frontend-deployment-url.vercel.app"
  );
  process.exit(1);
}

// Read the production environment file
const envContent = fs.readFileSync(envProductionPath, "utf8");

// Check required variables
const requiredVars = ["MONGODB_URI", "JWT_SECRET", "FRONTEND_URL"];
const missingVars = [];

requiredVars.forEach((varName) => {
  const regex = new RegExp(`${varName}=(.+)`);
  const match = envContent.match(regex);

  if (!match || match[1].includes("your_") || match[1].includes("your-")) {
    missingVars.push(varName);
  }
});

if (missingVars.length > 0) {
  console.error(
    "❌ Error: Please update the following variables in .env.production:"
  );
  missingVars.forEach((varName) => {
    console.log(`   - ${varName}`);
  });
  console.log("📝 Current content:", envContent);
  process.exit(1);
}

console.log("✅ Backend environment configuration looks good!");
console.log("🚀 Ready for production deployment!");

// Show configured values (without sensitive data)
const frontendUrl = envContent.match(/FRONTEND_URL=(.+)/)?.[1];
const nodeEnv = envContent.match(/NODE_ENV=(.+)/)?.[1];
console.log("📦 Frontend URL:", frontendUrl);
console.log("🌍 Environment:", nodeEnv);
