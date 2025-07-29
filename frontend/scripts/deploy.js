#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're running on Vercel (or other CI/CD platform)
const isVercelBuild = process.env.VERCEL || process.env.CI;
const envProductionPath = path.join(__dirname, "..", ".env.production");

// If running on Vercel, check for environment variables instead of files
if (isVercelBuild) {
  console.log("🚀 Detected Vercel/CI environment");

  const apiBaseUrl = process.env.VITE_API_BASE_URL;

  if (!apiBaseUrl) {
    console.error("❌ Error: VITE_API_BASE_URL environment variable not set!");
    console.log("📝 Please set VITE_API_BASE_URL in your Vercel dashboard:");
    console.log("   Go to Project Settings > Environment Variables");
    console.log(
      "   Add: VITE_API_BASE_URL = https://your-backend-url.vercel.app"
    );
    process.exit(1);
  }

  if (
    apiBaseUrl.includes("your-backend-deployment-url") ||
    apiBaseUrl.includes("localhost")
  ) {
    console.error(
      "❌ Error: VITE_API_BASE_URL contains placeholder or localhost URL!"
    );
    console.log("📝 Current value:", apiBaseUrl);
    console.log(
      "📝 Please update to your actual backend URL in Vercel dashboard"
    );
    process.exit(1);
  }

  console.log("✅ Vercel environment configuration looks good!");
  console.log("🚀 API Base URL:", apiBaseUrl);
  console.log("📦 Ready for Vercel build!");
  process.exit(0);
}

// For local builds, check for .env.production file
if (!fs.existsSync(envProductionPath)) {
  console.error("❌ Error: .env.production file not found!");
  console.log(
    "📝 Please create frontend/.env.production with your backend URL:"
  );
  console.log(
    "   VITE_API_BASE_URL=https://your-backend-deployment-url.vercel.app"
  );
  console.log("");
  console.log("💡 Or copy from example:");
  console.log(
    "   cp frontend/.env.production.example frontend/.env.production"
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
