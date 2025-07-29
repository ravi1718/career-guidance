#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Check if .env.production exists
const envProductionPath = path.join(__dirname, "..", ".env.production");

if (!fs.existsSync(envProductionPath)) {
  console.error("❌ Error: .env.production file not found!");
  console.log(
    "📝 Please create frontend/.env.production with your backend URL:"
  );
  console.log(
    "   VITE_API_BASE_URL=https://your-backend-deployment-url.vercel.app"
  );
  process.exit(1);
}

// Read the production environment file
const envContent = fs.readFileSync(envProductionPath, "utf8");
const apiBaseUrl = envContent.match(/VITE_API_BASE_URL=(.+)/)?.[1];

if (!apiBaseUrl || apiBaseUrl.includes("your-backend-deployment-url")) {
  console.error("❌ Error: Please update VITE_API_BASE_URL in .env.production");
  console.log("📝 Current content:", envContent);
  console.log(
    "📝 Expected format: VITE_API_BASE_URL=https://your-actual-backend-url.vercel.app"
  );
  process.exit(1);
}

console.log("✅ Environment configuration looks good!");
console.log("🚀 API Base URL:", apiBaseUrl);
console.log("📦 Ready for production build!");
