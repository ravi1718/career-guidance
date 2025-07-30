#!/usr/bin/env node

// Simple backend test script

async function testBackend() {
  console.log("🔍 Testing Backend Connection...\n");

  // You need to replace this with your actual backend URL
  const BACKEND_URL = "https://your-backend-url.vercel.app";

  console.log(`Testing: ${BACKEND_URL}`);

  try {
    // Test 1: Basic connectivity
    console.log("\n1️⃣ Testing basic connectivity...");
    const response = await fetch(BACKEND_URL);
    console.log("Status:", response.status);
    console.log("Response:", await response.text());

    // Test 2: Health endpoint
    console.log("\n2️⃣ Testing health endpoint...");
    const healthResponse = await fetch(`${BACKEND_URL}/api/health`);
    console.log("Health Status:", healthResponse.status);
    const healthData = await healthResponse.text();
    console.log("Health Response:", healthData);

    // Test 3: Auth endpoint structure
    console.log("\n3️⃣ Testing auth endpoint...");
    const authResponse = await fetch(`${BACKEND_URL}/api/auth/test`, {
      method: "GET",
    });
    console.log("Auth Status:", authResponse.status);
    console.log("Auth Response:", await authResponse.text());
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

testBackend();
