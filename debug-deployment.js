#!/usr/bin/env node

// Quick diagnostic script for deployment issues

console.log("🔍 Career Guidance App - Deployment Diagnostics\n");

async function checkBackendHealth(backendUrl) {
  try {
    console.log(`📡 Checking backend health: ${backendUrl}/api/health`);

    const response = await fetch(`${backendUrl}/api/health`);
    const data = await response.json();

    console.log("✅ Backend Response:", JSON.stringify(data, null, 2));

    if (data.database?.state === "connected") {
      console.log("✅ Database: Connected");
    } else {
      console.log("❌ Database: Not connected -", data.database?.state);
    }

    return true;
  } catch (error) {
    console.log("❌ Backend Health Check Failed:", error.message);
    return false;
  }
}

async function testAuthEndpoint(backendUrl) {
  try {
    console.log(
      `\n📡 Testing auth endpoint: ${backendUrl}/api/auth/register/student`
    );

    const testUser = {
      name: "Test User",
      email: "test@example.com",
      password: "testpassword",
      location: "Test City",
    };

    const response = await fetch(`${backendUrl}/api/auth/register/student`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testUser),
    });

    const data = await response.text();
    console.log("📝 Auth Response Status:", response.status);
    console.log("📝 Auth Response:", data);

    if (response.status === 201 || response.status === 400) {
      console.log("✅ Auth endpoint is responding");
    } else {
      console.log("❌ Auth endpoint issue");
    }
  } catch (error) {
    console.log("❌ Auth Test Failed:", error.message);
  }
}

async function main() {
  const backendUrl = process.argv[2];

  if (!backendUrl) {
    console.log("❌ Please provide your backend URL:");
    console.log(
      "   node debug-deployment.js https://your-backend-url.vercel.app"
    );
    process.exit(1);
  }

  console.log(`🎯 Testing backend: ${backendUrl}\n`);

  const healthOk = await checkBackendHealth(backendUrl);

  if (healthOk) {
    await testAuthEndpoint(backendUrl);
  }

  console.log("\n📋 Next Steps:");
  console.log('1. If database shows "disconnected", set up MongoDB Atlas');
  console.log("2. If auth fails, check CORS and environment variables");
  console.log("3. See DATABASE_SETUP.md for detailed instructions");
}

main().catch(console.error);
