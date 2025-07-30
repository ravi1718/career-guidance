#!/usr/bin/env node

async function testSetup() {
  console.log("🔍 Testing Current Setup...\n");

  const frontendUrl = "https://career-guidance-vc5b.vercel.app";

  try {
    // Test if this is frontend or backend
    console.log("📡 Testing:", frontendUrl);
    const response = await fetch(frontendUrl);
    const text = await response.text();

    if (text.includes("<!DOCTYPE html>")) {
      console.log("✅ This is your FRONTEND URL");
      console.log("❌ You need to deploy your BACKEND separately");

      // Test if there's an API endpoint
      try {
        const apiTest = await fetch(`${frontendUrl}/api/health`);
        const apiText = await apiTest.text();

        if (apiText.includes("<!DOCTYPE html>")) {
          console.log(
            "❌ API endpoints are not working - backend not deployed"
          );
        } else {
          console.log("✅ API endpoints might be working");
          console.log("API Response:", apiText);
        }
      } catch (error) {
        console.log("❌ API test failed:", error.message);
      }
    } else {
      console.log("✅ This might be your backend");
      console.log("Response preview:", text.substring(0, 200));
    }
  } catch (error) {
    console.log("❌ Error testing setup:", error.message);
  }

  console.log("\n📋 Next Steps:");
  console.log("1. Deploy your backend folder separately to Vercel");
  console.log(
    "2. Get the backend URL (e.g., career-guidance-backend-xxx.vercel.app)"
  );
  console.log("3. Update frontend VITE_API_BASE_URL with backend URL");
  console.log("4. Update backend FRONTEND_URL with frontend URL");
}

testSetup();
