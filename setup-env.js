#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up environment files for Career Guidance App...\n");

// Frontend setup
const frontendEnvPath = path.join("frontend", ".env.production");
const frontendExamplePath = path.join("frontend", ".env.production.example");

if (!fs.existsSync(frontendEnvPath) && fs.existsSync(frontendExamplePath)) {
  fs.copyFileSync(frontendExamplePath, frontendEnvPath);
  console.log("✅ Created frontend/.env.production from example");
} else if (fs.existsSync(frontendEnvPath)) {
  console.log("ℹ️  frontend/.env.production already exists");
} else {
  console.log("❌ frontend/.env.production.example not found");
}

// Backend setup
const backendEnvPath = path.join("backend", ".env.production");
const backendExamplePath = path.join("backend", ".env.production.example");

if (!fs.existsSync(backendEnvPath) && fs.existsSync(backendExamplePath)) {
  fs.copyFileSync(backendExamplePath, backendEnvPath);
  console.log("✅ Created backend/.env.production from example");
} else if (fs.existsSync(backendEnvPath)) {
  console.log("ℹ️  backend/.env.production already exists");
} else {
  console.log("❌ backend/.env.production.example not found");
}

console.log("\n📝 Next steps:");
console.log("1. Edit frontend/.env.production with your backend URL");
console.log("2. Edit backend/.env.production with your database and secrets");
console.log(
  "3. For Vercel deployment, set environment variables in Vercel dashboard instead"
);
console.log("\n📚 See ENVIRONMENT_SETUP.md for detailed instructions");
