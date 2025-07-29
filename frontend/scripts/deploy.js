#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  console.warn("⚠️  Warning: VITE_API_BASE_URL contains placeholder value");
  console.log("📝 Current content:", envContent);
  console.log(
    "📝 For production deployment, update to: VITE_API_BASE_URL=https://your-actual-backend-url.vercel.app"
  );

  // Check if this is a test build (allow placeholder for development)
  if (
    process.env.NODE_ENV !== "development" &&
    !process.argv.includes("--allow-placeholder")
  ) {
    console.error(
      "❌ Error: Please update VITE_API_BASE_URL for production deployment"
    );
    process.exit(1);
  }

  console.log("🔧 Continuing with placeholder URL for development build...");
}

console.log("✅ Environment configuration looks good!");
console.log("🚀 API Base URL:", apiBaseUrl);
console.log("📦 Ready for production build!");
