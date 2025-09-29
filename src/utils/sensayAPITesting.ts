// Sensay API Testing Utilities
// Comprehensive testing suite for Sensay API endpoints and functionality

export interface SensayTestResult {
  endpoint: string;
  method: string;
  success: boolean;
  responseTime: number;
  response: any;
  error?: string;
}

export interface SensayTestSuite {
  name: string;
  results: SensayTestResult[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  averageResponseTime: number;
}

/**
 * Test Sensay API connectivity and basic functionality
 */
export async function testSensayConnectivity(): Promise<SensayTestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.sensay.io/v1/health', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const responseTime = Date.now() - startTime;
    const data = await response.json();
    
    return {
      endpoint: '/health',
      method: 'GET',
      success: response.ok,
      responseTime,
      response: data,
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
    };
  } catch (error) {
    return {
      endpoint: '/health',
      method: 'GET',
      success: false,
      responseTime: Date.now() - startTime,
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test Sensay authentication
 */
export async function testSensayAuthentication(apiKey: string, organizationId: string): Promise<SensayTestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.sensay.io/v1/auth/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Organization-ID': organizationId,
      },
    });
    
    const responseTime = Date.now() - startTime;
    const data = await response.json();
    
    return {
      endpoint: '/auth/validate',
      method: 'POST',
      success: response.ok,
      responseTime,
      response: data,
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
    };
  } catch (error) {
    return {
      endpoint: '/auth/validate',
      method: 'POST',
      success: false,
      responseTime: Date.now() - startTime,
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test Sensay chat functionality
 */
export async function testSensayChat(
  message: string,
  apiKey: string,
  organizationId: string,
  context?: any
): Promise<SensayTestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.sensay.io/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Organization-ID': organizationId,
      },
      body: JSON.stringify({
        message,
        context: context || {},
        replica_id: 'propguard-real-estate-agent',
        organization_id: organizationId
      }),
    });
    
    const responseTime = Date.now() - startTime;
    const data = await response.json();
    
    return {
      endpoint: '/chat',
      method: 'POST',
      success: response.ok,
      responseTime,
      response: data,
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
    };
  } catch (error) {
    return {
      endpoint: '/chat',
      method: 'POST',
      success: false,
      responseTime: Date.now() - startTime,
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Test Sensay replica management
 */
export async function testSensayReplicas(apiKey: string, organizationId: string): Promise<SensayTestResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch('https://api.sensay.io/v1/replicas', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'X-Organization-ID': organizationId,
      },
    });
    
    const responseTime = Date.now() - startTime;
    const data = await response.json();
    
    return {
      endpoint: '/replicas',
      method: 'GET',
      success: response.ok,
      responseTime,
      response: data,
      error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
    };
  } catch (error) {
    return {
      endpoint: '/replicas',
      method: 'GET',
      success: false,
      responseTime: Date.now() - startTime,
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Run comprehensive Sensay API test suite
 */
export async function runSensayTestSuite(
  apiKey?: string,
  organizationId?: string
): Promise<SensayTestSuite> {
  const results: SensayTestResult[] = [];
  
  // Test 1: Basic connectivity
  console.log('Testing Sensay connectivity...');
  const connectivityTest = await testSensayConnectivity();
  results.push(connectivityTest);
  
  // If credentials are provided, run authenticated tests
  if (apiKey && organizationId) {
    // Test 2: Authentication
    console.log('Testing Sensay authentication...');
    const authTest = await testSensayAuthentication(apiKey, organizationId);
    results.push(authTest);
    
    // Test 3: Chat functionality
    console.log('Testing Sensay chat...');
    const chatTest = await testSensayChat(
      'Hello, this is a test message for PropGuard AI integration.',
      apiKey,
      organizationId,
      { source: 'testing', timestamp: new Date().toISOString() }
    );
    results.push(chatTest);
    
    // Test 4: Replica management
    console.log('Testing Sensay replicas...');
    const replicasTest = await testSensayReplicas(apiKey, organizationId);
    results.push(replicasTest);
  }
  
  // Calculate metrics
  const passedTests = results.filter(r => r.success).length;
  const failedTests = results.length - passedTests;
  const averageResponseTime = results.length > 0 
    ? results.reduce((sum, r) => sum + r.responseTime, 0) / results.length 
    : 0;
  
  return {
    name: 'Sensay API Test Suite',
    results,
    totalTests: results.length,
    passedTests,
    failedTests,
    averageResponseTime
  };
}

/**
 * Test Sensay Edge Function integration
 */
export async function testSensayEdgeFunction(
  message: string,
  context?: any,
  credentials?: { apiKey?: string; organizationId?: string }
): Promise<SensayTestResult> {
  const startTime = Date.now();
  
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    
    const response = await supabase.functions.invoke('sensay-chat', {
      body: {
        message,
        context,
        credentials,
        endpoint: '/chat',
        method: 'POST'
      }
    });
    
    const responseTime = Date.now() - startTime;
    
    return {
      endpoint: 'sensay-chat (Edge Function)',
      method: 'POST',
      success: !response.error,
      responseTime,
      response: response.data,
      error: response.error ? response.error.message : undefined
    };
  } catch (error) {
    return {
      endpoint: 'sensay-chat (Edge Function)',
      method: 'POST',
      success: false,
      responseTime: Date.now() - startTime,
      response: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Mock data for testing when Sensay API is not available
 */
export function generateMockSensayResponse(message: string): any {
  const responses = [
    {
      response: "I'd be happy to help you analyze that property. Based on the location you've mentioned, I can provide insights on market trends, risk factors, and investment potential.",
      confidence: 92,
      suggestions: [
        "Get detailed market analysis",
        "Check flood and fire risk",
        "Compare with similar properties",
        "Calculate ROI potential"
      ]
    },
    {
      response: "Let me pull up the latest market data for that area. The property market has been showing positive trends with steady growth over the past 12 months.",
      confidence: 88,
      suggestions: [
        "View price history",
        "See comparable sales",
        "Check neighborhood amenities",
        "Review investment timeline"
      ]
    },
    {
      response: "That's an interesting property choice! I can see why you're considering it. Let me help you understand the key factors that make this a solid investment opportunity.",
      confidence: 90,
      suggestions: [
        "Risk assessment report",
        "Financial projections",
        "Local market insights",
        "Property inspection tips"
      ]
    }
  ];
  
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  return {
    ...randomResponse,
    conversationId: `mock-${Date.now()}`,
    timestamp: new Date().toISOString(),
    insights: {
      marketTrend: "positive",
      riskLevel: "low",
      investmentPotential: "high"
    }
  };
}

/**
 * Utility to format test results for display
 */
export function formatTestResults(testSuite: SensayTestSuite): string {
  const { name, totalTests, passedTests, failedTests, averageResponseTime, results } = testSuite;
  
  let output = `\n=== ${name} ===\n`;
  output += `Total Tests: ${totalTests}\n`;
  output += `Passed: ${passedTests}\n`;
  output += `Failed: ${failedTests}\n`;
  output += `Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%\n`;
  output += `Average Response Time: ${averageResponseTime.toFixed(0)}ms\n\n`;
  
  output += "Individual Test Results:\n";
  results.forEach((result, index) => {
    output += `${index + 1}. ${result.endpoint} (${result.method})\n`;
    output += `   Status: ${result.success ? '✅ PASS' : '❌ FAIL'}\n`;
    output += `   Response Time: ${result.responseTime}ms\n`;
    if (result.error) {
      output += `   Error: ${result.error}\n`;
    }
    output += '\n';
  });
  
  return output;
}

/**
 * Export test functions for external use
 */
export const SensayAPITesting = {
  testConnectivity: testSensayConnectivity,
  testAuthentication: testSensayAuthentication,
  testChat: testSensayChat,
  testReplicas: testSensayReplicas,
  testEdgeFunction: testSensayEdgeFunction,
  runTestSuite: runSensayTestSuite,
  generateMockResponse: generateMockSensayResponse,
  formatResults: formatTestResults
};

export default SensayAPITesting;