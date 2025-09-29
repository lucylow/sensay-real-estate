/**
 * Comprehensive Sensay API Testing Utilities
 * Provides automated testing and validation for all Sensay API endpoints
 */

import { 
  sensayComprehensiveAPI, 
  propGuardSensayWrapper,
  SensayDetailedReplica,
  SensayCredentials 
} from '@/services/sensayComprehensiveAPI';

export interface APITestResult {
  endpoint: string;
  method: string;
  success: boolean;
  responseTime: number;
  error?: string;
  response?: any;
}

export interface TestSuiteResult {
  suiteName: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  totalTime: number;
  results: APITestResult[];
}

export class SensayAPITester {
  private credentials?: SensayCredentials;
  private testReplicaId?: string;

  constructor(credentials?: SensayCredentials) {
    this.credentials = credentials;
  }

  /**
   * Run comprehensive API test suite
   */
  async runCompleteTestSuite(): Promise<TestSuiteResult[]> {
    const startTime = Date.now();
    const results: TestSuiteResult[] = [];

    // Test Credential Validation
    results.push(await this.testCredentialValidation());

    // Test Core API Endpoints
    results.push(await this.testReplicasAPI());
    results.push(await this.testUsersAPI());
    results.push(await this.testKnowledgeBaseAPI());
    results.push(await this.testConversationsAPI());
    results.push(await this.testAnalyticsAPI());
    results.push(await this.testChatCompletionsAPI());
    results.push(await this.testUsageAPI());

    // Test Integration Endpoints
    results.push(await this.testTelegramIntegration());
    results.push(await this.testDiscordIntegration());
    results.push(await this.testChatWidgetIntegration());

    // Test Experimental Endpoints
    results.push(await this.testExperimentalAPI());

    console.log(`Complete test suite finished in ${Date.now() - startTime}ms`);
    return results;
  }

  /**
   * Test credential validation
   */
  private async testCredentialValidation(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];
    
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.validateCredentials();
      });
      
      results.push({
        endpoint: '/validation',
       <｜tool▁sep｜> method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/validation',
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Credential Validation', results);
  }

  /**
   * Test Replicas API endpoints
   */
  private async testReplicasAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    // Test list replicas
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.listReplicas({ page_size: 5 });
      });
      
      results.push({
        endpoint: '/replicas',
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });

      // Store first replica ID for other tests
      if (result.success && result.data?.items?.length > 0) {
        this.testReplicaId = result.data.items[0].uuid;
      }
    } catch (error) {
      results.push({
        endpoint: '/replicas',
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test get replica details if we have a replica ID
    if (this.testReplicaId) {
      try {
        const result = await this.timeExecution(async () => {
          return await sensayComprehensiveAPI.getReplicaDetails(this.testReplicaId!);
        });
        
        results.push({
          endpoint: `/replicas/${this.testReplicaId}`,
          method: 'GET',
          success: result.success,
          responseTime: result.time,
          response: result.data
        });
      } catch (error) {
        results.push({
          endpoint: `/replicas/${this.testReplicaId}`,
          method: 'GET',
          success: false,
          responseTime: 0,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return this.createTestSuiteResult('Replicas API', results);
  }

  /**
   * Test Users API endpoints
   */
  private async testUsersAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];
    const testUserId = 'sensay-api-test-user';

    // Test create user
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.createUser({
          name: 'API Test用户',
          email: 'test@propguardai.com'
        });
      });
      
      results.push({
        endpoint: '/users',
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/users',
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test get user by ID
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getUserById(testUserId);
      });
      
      results.push({
        endpoint: `/users/${testUserId}`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/users/${testUserId}`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Users API', results);
  }

  /**
   * Test Knowledge Base API endpoints
   */
  private async testKnowledgeBaseAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Knowledge Base API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test list knowledge base entries
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.listKnowledgeBaseEntries(this.testReplicaId!, { page_size: 10 });
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/knowledge-base`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/knowledge-base`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test create knowledge base entry
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.createKnowledgeBaseEntryFromText(this.testReplicaId!, {
          title: 'PropGuard API Test Knowledge',
          content: 'This is a test knowledge entry created by the PropGuard comprehensive API tester.',
          language: 'en'
        });
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/knowledge-base/text`,
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/knowledge-base/text`,
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Knowledge Base API', results);
  }

  /**
   * Test Conversations API endpoints
   */
  private async testConversationsAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Conversations API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test list conversations
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.listConversations(this.testReplicaId!, { limit: 10 });
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/conversations`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/conversations`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test get chat history
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getChatHistory(this.testReplicaId!, { limit: 10 });
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Conversations API', results);
  }

  /**
   * Test Analytics API endpoints
   */
  private async testAnalyticsAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Analytics API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test historical analytics
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getHistoricalConversationAnalytics(this.testReplicaId!);
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/analytics/conversations/historical`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/analytics/conversations/historical`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test source analytics
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getSourceAnalytics(this.testReplicaId!);
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/analytics/conversations/sources`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/analytics/conversations/sources`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Analytics API', results);
  }

  /**
   * Test Chat Completions API endpoints
   */
  private async testChatCompletionsAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Chat Completions API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test chat completion
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.generateChatCompletion(this.testReplicaId!, {
          content: 'Hello PropGuard AI! Please test the property analysis API.',
          source: 'web',
          store: true
        });
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/completions`,
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/completions`,
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Chat Completions API', results);
  }

  /**
   * Test Usage API endpoints
   */
  private async testUsageAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    // Test combined usage
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getCombinedUsage();
      });
      
      results.push({
        endpoint: '/usage',
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/usage',
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test conversation usage
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getConversationUsage();
      });
      
      results.push({
        endpoint: '/usage/conversations',
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/usage/conversations',
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Usage API', results);
  }

  /**
   * Test Telegram Integration API endpoints
   */
  private async testTelegramIntegration(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Telegram Integration API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test get Telegram chat history
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getTelegramChatHistory(this.testReplicaId!);
      });
 });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/telegram`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/telegram`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Telegram Integration API', results);
  }

  /**
   * Test Discord Integration API endpoints
   */
  private async testDiscordIntegration(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Discord Integration API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test get Discord chat history
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getDiscordChatHistory(this.testReplicaId!);
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/discord`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/discord`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Discord Integration API', results);
  }

  /**
   * Test Chat Widget Integration API endpoints
   */
  private async testChatWidgetIntegration(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Chat Widget Integration API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test get embed chat history
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.getEmbedChatHistory(this.testReplicaId!);
      });
      
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/embed`,
        method: 'GET',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/replicas/${this.testReplicaId}/chat/history/embed`,
        method: 'GET',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Chat Widget Integration API', results);
  }

  /**
   * Test Experimental API endpoints
   */
  private async testExperimentalAPI(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Experimental API', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    // Test OpenAI-compatible completion
    try {
      const result = await this.timeExecution(async () => {
        return await sensayComprehensiveAPI.generateExperimentalCompletion(this.testReplicaId!, {
          messages: [
            {
              role: 'user',
              content: 'Test OpenAI-compatible chat completion for PropGuard AI.'
            }
          ],
          store: true,
          source: 'web'
        });
      });
      
      results.push({
        endpoint: `/experimental/replicas/${this.testReplicaId}/chat/completions`,
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: `/experimental/replicas/${this.testReplicaId}/chat/completions`,
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Experimental API', results);
  }

  /**
   * Time execution of a function call
   */
  private async timeExecution<T>(fn: () => Promise<T>): Promise<{ data: T | undefined; time: number; success: boolean }> {
    const startTime = Date.now();
    try {
      const result = await fn();
      const endTime = Date.now();
      return {
        data: result,
        time: endTime - startTime,
        success: true
      };
    } catch (error) {
      const endTime = Date.now();
      return {
        data: undefined,
        time: endTime - startTime,
        success: false
      };
    }
  }

  /**
   * Create test suite result
   */
  private createTestSuiteResult(suiteName: string, results: APITestResult[]): TestSuiteResult {
    const passedTests = results.filter(r => r.success).length;
    const totalTime = results.reduce((sum, r) => sum + r.responseTime, 0);

    return {
      suiteName,
      totalTests: results.length,
      passedTests,
      failedTests: results.length - passedTests,
      totalTime,
      results
    };
  }

  /**
   * Generate test report
   */
  generateTestReport(testResults: TestSuiteResult[]): string {
    let report = `# Sensay API Test Report\\n\\n`;
    report += `Generated: ${new Date().toISOString()}\\n\\n`;

    const overallStats = {
      totalSuites: testResults.length,
      totalTests: testResults.reduce((sum, suite) => sum + suite.totalTests, 0),
      totalPassed: testResults.reduce((sum, suite) => sum + suite.passedTests, 0),
      totalFailed: testResults.reduce((sum, suite) => sum + suite.failedTests, 0),
      totalTime: testResults.reduce((sum, suite) => sum + suite.totalTime, 0)
    };

    report += `## Overall Statistics\\n`;
    report += `- **Test Suites**: ${overallStats.totalSuites}\\n`;
    report += `- **Total Tests**: ${overallStats.totalTests}\\n`;
    report += `- **Passed**: ${overallStats.totalPassed} (${((overallStats.totalPassed / overallStats.totalTests) * 100).toFixed(1)}%)\\n`;
    report += `- **Failed**: ${overallStats.totalFailed} (${((overallStats.totalFailed / overallStats.totalTests) * 100).toFixed(1)}%)\\n`;
    report += `- **Total Time**: ${(overallStats.totalTime / 1000).toFixed(2)}s\\n\\n`;

    report += `## Test Suite Results\\n\\n`;
    
    testResults.forEach(suite => {
      report += `### ${suite.suiteName}\\n`;
      report += `- **Tests**: ${suite.passedTests}/${suite.totalTests} passed\\n`;
      report += `- **Time**: ${suite.totalTime}ms\\n`;
      report += `- **Status**: ${suite.failedTests === 0 ? '✅ All Passed' : '❌ Issues Found'}\\n\\n`;
      
      if (suite.failedTests > 0) {
        report += `**Failed Tests:**\\n`;
        suite.results.filter(r => !r.success).filter(r => r.error).forEach(result => {
          report += `- ${result.endpoint} (**${result.method}**): ${result.error}\\n`;
        });
        report += `\\n\\n`;
      }
    });

    return report;
  }

  /**
   * Run PropGuard-specific tests
   */
  async runPropGuardTests(): Promise<TestSuiteResult[]> {
    const results: TestSuiteResult[] = [];

    // Test property analysis intent
    const intentResult = await this.testPropertyAnalysisIntent();
    results.push(intentResult);

    // Test property-specific replica creation
    const replicaResult = await this.testPropGuardReplicaCreation();
    results.push(replicaResult);

    // Test knowledge base with property data
    const knowledgeResult = await this.testPropertyKnowledgeBase();
    results.push(knowledgeResult);

    return results;
  }

  private async testPropertyAnalysisIntent(): Promise<TestSuiteResult> {
    const testCases = [
      'What\'s the value of this property?',
      'Show me environmental risks for this address',
      'How is the market performing in this area?',
      'Analyze investment potential of this property'
    ];

    const results: APITestResult[] = [];

    testCases.forEach(message => {
      const intentAnalysis = propGuardSensayWrapper.analyzePropertyIntent(message);
      results.push({
        endpoint: 'Property Intent Analysis',
        method: 'LOCAL',
        success: intentAnalysis.confidence > 0.5,
        responseTime: 1, // Mock timing for local analysis
        response: intentAnalysis
      });
    });

    return this.createTestSuiteResult('Property Analysis Intent', results);
  }

  private async testPropGuardReplicaCreation(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    try {
      const result = await this.timeExecution(async () => {
        return await propGuardSensayWrapper.createPropGuardReplica(
          'Automated Test Replica',
          'test-user-123'
        );
      });

      results.push({
        endpoint: '/replicas (PropGuard)',
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/replicas (PropGuard)',
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('PropGuard Replica Creation', results);
  }

  private async testPropertyKnowledgeBase(): Promise<TestSuiteResult> {
    const results: APITestResult[] = [];

    if (!this.testReplicaId) {
      return this.createTestSuiteResult('Property Knowledge Base', [{
        endpoint: 'N/A - No test replica',
        method: 'N/A',
        success: false,
        responseTime: 0,
        error: 'No test replica available'
      }]);
    }

    try {
      const result = await this.timeExecution(async () => {
        return await propGuardSensayWrapper.addPropertyKnowledge(
          this.testReplicaId!,
          'PropGuard API Testing Guide',
          'Property analysis fundamentals and best practices for PropGuard AI integration.'
        );
      });

      results.push({
        endpoint: '/knowledge-base (Property)',
        method: 'POST',
        success: result.success,
        responseTime: result.time,
        response: result.data
      });
    } catch (error) {
      results.push({
        endpoint: '/knowledge-base (Property)',
        method: 'POST',
        success: false,
        responseTime: 0,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return this.createTestSuiteResult('Property Knowledge Base', results);
  }
}

// Export singleton instance
export const sensayAPITester = new SensayAPITester();

// Utility function to run comprehensive tests
export async function runComprehensiveTests(credentials?: SensayCredentials): Promise<{
  apiResults: TestSuiteResult[];
  propguardResults: TestSuiteResult[];
  report: string;
}> {
  const tester = new SensayAPITester(credentials);
  
  const [apiResults, propguardResults] = await Promise.all([
    tester.runCompleteTestSuite(),
    tester.runPropGuardTests()
  ]);

  const allResults = [...apiResults, ...propguardResults];
  const report = tester.generateTestReport(allResults);

  return {
    apiResults,
    propguardResults,
    report
  };
}
