#!/usr/bin/env node

/**
 * Sensay Wisdom API Integration Demo
 * 
 * This script demonstrates how to use the Sensay API integration
 * for property analysis and AI-powered conversations.
 * 
 * Usage:
 * 1. Set your API key: export VITE_SENSAY_API_KEY=your_key_here
 * 2. Run: node sensay-demo.js
 */

const API_KEY = process.env.VITE_SENSAY_API_KEY || 'your_api_key_here';
const ORG_ID = process.env.VITE_SENSAY_ORG_ID || 'your_organization_id_here';
const BASE_URL = 'https://api.sensay.io/v1';

// Sample property data for demonstration
const sampleProperty = {
  address: "123 Collins Street, Melbourne VIC 3000",
  type: "Commercial Office",
  size: "5000 sqm",
  features: ["Premium location", "Modern facilities", "High-end finishes"],
  location: {
    suburb: "Melbourne",
    state: "VIC",
    postcode: "3000"
  }
};

const sampleAnalysis = {
  current_valuation: 8500000,
  risk_score: 35,
  confidence: 92,
  market_data: {
    trend: "stable",
    sentiment: "positive"
  }
};

async function makeSensayRequest(endpoint, data) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  };

  // Add organization ID if available
  if (ORG_ID && ORG_ID !== 'your_organization_id_here') {
    headers['X-Organization-ID'] = ORG_ID;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

async function demonstrateSensayIntegration() {
  console.log('🚀 Sensay Wisdom API Integration Demo\n');
  
  if (API_KEY === 'your_api_key_here' || ORG_ID === 'your_organization_id_here') {
    console.log('❌ Please set your Sensay API credentials:');
    console.log('   export VITE_SENSAY_API_KEY=your_actual_key_here');
    console.log('   export VITE_SENSAY_ORG_ID=your_actual_org_id_here\n');
    return;
  }

  try {
    // 1. Health Check
    console.log('1️⃣ Testing API connection...');
    const healthCheck = await makeSensayRequest('/health', {});
    console.log(`   ✅ API Status: ${healthCheck.status || 'healthy'}\n`);

    // 2. Basic Chat
    console.log('2️⃣ Testing basic chat functionality...');
    const chatResponse = await makeSensayRequest('/chat', {
      message: "Hello! I'm interested in property investment. Can you help me understand the basics?",
      context: {
        session_id: 'demo_session',
        timestamp: new Date().toISOString()
      }
    });
    console.log(`   💬 Response: ${chatResponse.message || chatResponse.response}\n`);

    // 3. Property Analysis
    console.log('3️⃣ Testing property analysis...');
    const analysisResponse = await makeSensayRequest('/chat', {
      message: "Please analyze this property for investment potential: 123 Collins Street, Melbourne",
      context: {
        property: sampleProperty,
        analysis: sampleAnalysis,
        session_id: 'demo_session'
      }
    });
    console.log(`   🏠 Analysis: ${analysisResponse.message || analysisResponse.response}\n`);

    // 4. Risk Assessment
    console.log('4️⃣ Testing risk assessment...');
    const riskResponse = await makeSensayRequest('/chat', {
      message: "What are the main risks for this property and how can I mitigate them?",
      context: {
        property: sampleProperty,
        analysis: sampleAnalysis,
        session_id: 'demo_session'
      }
    });
    console.log(`   ⚠️  Risk Assessment: ${riskResponse.message || riskResponse.response}\n`);

    // 5. Market Intelligence
    console.log('5️⃣ Testing market intelligence...');
    const marketResponse = await makeSensayRequest('/chat', {
      message: "Provide market insights for Melbourne commercial properties",
      context: {
        marketData: {
          location: "Melbourne",
          propertyType: "Commercial"
        },
        session_id: 'demo_session'
      }
    });
    console.log(`   📊 Market Insights: ${marketResponse.message || marketResponse.response}\n`);

    console.log('✅ Demo completed successfully!');
    console.log('\n📝 Next Steps:');
    console.log('   1. Visit /sensay in your application');
    console.log('   2. Set up your API key using the invite code');
    console.log('   3. Try the enhanced AI assistant');
    console.log('   4. Explore property analysis features');

  } catch (error) {
    console.error('❌ Demo failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Verify your API key and Organization ID are correct');
    console.log('   2. Check your internet connection');
    console.log('   3. Ensure the Sensay API is accessible');
    console.log('   4. Review the API documentation at https://docs.sensay.io');
  }
}

// Run the demo
demonstrateSensayIntegration();
