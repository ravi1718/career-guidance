#!/usr/bin/env node

async function testBackend() {
  const backendUrl = "https://career-guidance-xi.vercel.app";

  console.log("🔍 Testing Backend:", backendUrl);
  console.log("");

  try {
    // Test 1: Root endpoint
    console.log("1️⃣ Testing root endpoint...");
    const rootResponse = await fetch(backendUrl);
    const rootText = await rootResponse.text();
    console.log("Status:", rootResponse.status);
    console.log("Content preview:", rootText.substring(0, 100));
    console.log("Is HTML?", rootText.includes("<!DOCTYPE"));
    console.log("");

    // Test 2: Health endpoint
    console.log("2️⃣ Testing health endpoint...");
    const healthResponse = await fetch(`${backendUrl}/api/health`);
    const healthText = await healthResponse.text();
    console.log("Status:", healthResponse.status);
    console.log("Content preview:", healthText.substring(0, 100));
    console.log("Is HTML?", healthText.includes("<!DOCTYPE"));
    console.log("");

    // Test 3: Check if it's actually a backend
    if (rootText.includes("<!DOCTYPE") || healthText.includes("<!DOCTYPE")) {
      console.log(
        "❌ This appears to be serving HTML (frontend), not a backend API"
      );
      console.log(
        "💡 Make sure you deployed the backend folder, not the frontend"
      );
    } else {
      console.log("✅ This appears to be a backend API");

      // Test 4: Try auth endpoint
      console.log("3️⃣ Testing auth endpoint...");
      const authResponse = await fetch(`${backendUrl}/api/auth/test`);
      console.log("Auth Status:", authResponse.status);
      console.log("Auth Response:", await authResponse.text());
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

testBackend();
