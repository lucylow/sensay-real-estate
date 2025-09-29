import React, { useState, useEffect } from 'react';
import { 
  sensayComprehensiveAPI, 
  propGuardSensayWrapper,
  SensayDetailedReplica,
  SensayConversation 
} from '@/services/sensayComprehensiveAPI';
import { runComprehensiveTests } from '@/utils/sensayAPITesting';
import { ComprehensiveSensayDashboard } from './ComprehensiveSensayDashboard';

export const SensayIntegrationShowcase: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [testResults, setTestResults] = useState<string | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runAPITests = async () => {
    setIsRunningTests(true);
    try {
      const results = await runComprehensiveTests();
      setTestResults(results.report);
    } catch (error) {
      setTestResults(`Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunningTests(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Sensay Comprehensive API Integration
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Complete integration of all Sensay API endpoints for PropGuard Real Estate Platform
        </p>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">14</div>
            <div className="text-sm text-blue-600 dark:text-blue-300">API Endpoint Categories</div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">100+</div>
            <div className="text-sm text-green-600 dark:text-green-300">Individual Endpoints</div>
          </div>
          <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</div>
            <div className="text-sm text-purple-600 dark:text-purple-300">Integration Channels</div>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">∞</div>
            <div className="text-sm text-orange-600 dark:text-orange-300">Possibilities</div>
          </div>
        </div>
      </div>

      {/* Feature Overview */}
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🎯 Implemented Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core API Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🔌 Core API Endpoints
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>✅ Conversations Management</li>
              <li>✅ Analytics & Insights</li>
              <li>✅ Replicas CRUD</li>
              <li>✅ API Keys Management</li>
              <li>✅ Chat History Tracking</li>
              <li>✅ Chat Completions (Streaming)</li>
              <li>✅ Users Management</li>
              <li>✅ Knowledge Base Management</li>
              <li>✅ Usage Monitoring</li>
            </ul>
          </div>

          {/* Integration Channels */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🚀 Integration Channels
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>💒 Telegram Bot Integration</li>
              <li>💠 Discord Server Integration</li>
              <li>🌐 Website Chat Widget</li>
              <li>⚗️ Experimental OpenAI-compatible API</li>
              <li>📱 Multi-platform Support</li>
              <li>🔄 Real-time Streaming</li>
              <li>📊 Analytics Dashboard</li>
              <li>🧪 Comprehensive Testing</li>
              <li>🔐 Secure Authentication</li>
            </ul>
          </div>

          {/* PropGuard Features */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              🏠 PropGuard Specializations
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>🏠 Property Analysis AI</li>
              <li>🔄 Environmental Risk Assessment</li>
              <li>📊 Market Intelligence</li>
              <li>🎯 Investment Analysis</li>
              <li>🎰 Intelligent Intent Recognition</li>
              <li>🤖 Specialized Replica Creation</li>
              <li>💾 Property Knowledge Management</li>
              <li>🌐 Global Real Estate Coverage</li>
              <li>⚖️ Compliance & Regulation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          💡 Quick Implementation Examples
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Usage */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Basic Property Analysis</h3>
            <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded text-sm overflow-x-auto">
{`// Property valuation
const response = await propGuardSensayWrapper.analyzeProperty(
  '123 Main Street, Melbourne',
  'valuation'
);

// Stream real-time analysis
for await (const chunk of propGuardSensayWrapper.streamPropertyAnalysis(
  '456 Oak Avenue, Sydney',
  'risk'
)) {
  console.log(chunk);
}`}
            </pre>
          </div>

          {/* Advanced Features */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Multi-Channel Deployment</h3>
            <pre className="bg-gray-100 dark:text-gray-700 p-4 rounded text-sm overflow-x-auto">
{`// Create PropGuard replica
const replica = await propGuardSensayWrapper.createPropGuardReplica(
  'Real Estate Expert',
  'owner-id-123'
);

// Deploy to all platforms
await Promise.all([
  api.createTelegramIntegration(replica.uuid, { token: 'telegram-token' }),
  api.createDiscordIntegration(replica.uuid, { token: 'discord-token' })
]);

// Comprehensive analytics
const analytics = await propGuardSensayWrapper.getPropertyAnalytics(replica.uuid);`}
            </pre>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setShowDashboard(true)}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
        >
          🎛️ Open Management Dashboard
        </button>
        
        <button
          onClick={runAPITests}
          disabled={isRunningTests}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          {isRunningTests ? '🧪 Running Tests...' : '🧪 Run API Test Suite'}
        </button>
        
        <button
          onClick={() => window.open('https://docs.sensay.io/', '_blank')}
          className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
        >
          📚 Sensay Documentation
        </button>
      </div>

      {/* Test Results */}
      {testResults && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🧪 API Test Results
          </h3>
          <div className="bg-white dark:bg-gray-700 p-4 rounded border">
            <pre className="text-sm whitespace-pre-wrap overflow-x-auto">
              {testResults}
            </pre>
          </div>
        </div>
      )}

      {/* Documentation Links */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📚 Documentation & Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/docs/SENSAY_COMPREHENSIVE_INTEGRATION.md"
            className="block p-4 bg-blue-100 dark:bg-blue-900/30 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">📖 Integration Guide</h4>
            <p className="text-sm text-blue-600 dark:text-blue-300">Complete setup and usage guide</p>
          </a>
          
          <a
            href="https://docs.sensay.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-green-100 dark:bg-green-900/30 rounded hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
          >
            <h4 className="font-semibold text-green-800 dark:text-green-200">🌐 API Reference</h4>
            <p className="text-sm text-green-600 dark:text-green-300">Official Sensay documentation</p>
          </a>
          
          <a
            href="/components/sensay/"
            className="block p-4 bg-purple-100 dark:bg-purple-900/30 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          >
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">🎨 Components</h4>
            <p className="text-sm text-purple-600 dark:text-purple-300">React components and examples</p>
          </a>
        </div>
      </div>

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Sensay Comprehensive Dashboard
                  </h3>
                  <button
                    onClick={() => setShowDashboard(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Close</span>
                    ✕
                  </button>
                </div>
                <ComprehensiveSensayDashboard />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
