import React, { useState, useEffect } from 'react';
import { 
  sensayComprehensiveAPI, 
  propGuardSensayWrapper,
  SensayDetailedReplica,
  SensayUser,
  SensayConversation,
  SensayKnowledgeBaseEntry,
  SensayHistoricalAnalytics,
  SensaySourceAnalytics
} from '@/services/sensayComprehensiveAPI';

interface ComprehensiveSensayDashboardProps {
  className?: string;
}

export const ComprehensiveSensayDashboard: React.FC<ComprehensiveSensayDashboardProps> = ({ className }) => {
  // State management
  const [activeTab, setActiveTab] = useState<'overview' | 'replicas' | 'users' | 'knowledge' | 'analytics' | 'integrations'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [replicas, setReplicas] = useState<SensayDetailedReplica[]>([]);
  const [selectedReplica, setSelectedReplica] = useState<SensayDetailedReplica | null>(null);
  const [conversations, setConversations] = useState<SensayConversation[]>([]);
  const [knowledgeEntries, setKnowledgeEntries] = useState<SensayKnowledgeBaseEntry[]>([]);
  const [analytics, setAnalytics] = useState<{
    historical: SensayHistoricalAnalytics;
    sources: SensaySourceAnalytics;
  } | null>(null);

  // Stream states for real-time features
  const [streamingResponse, setStreamingResponse] = useState('');

  useEffect(() => {
    initializeDashboard();
  }, []);

  const initializeDashboard = async () => {
    setIsLoading(true);
    try {
      // Validate credentials
      const isValid = await sensayComprehensiveAPI.validateCredentials();
      if (!isValid) {
        setError('Invalid Sensay API credentials. Please check your configuration.');
        return;
      }

      // Load initial data
      await loadOverviewData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const loadOverviewData = async () => {
    try {
      const replicaData = await sensayComprehensiveAPI.listReplicas({ page_size: 10 });
      setReplicas(replicaData.items);
      
      if (replicaData.items.length > 0) {
        setSelectedReplica(replicaData.items[0]);
      }
    } catch (err) {
      console.error('Failed to load overview data:', err);
    }
  };

  const loadReplicaData = async (replicaUuid: string) => {
    try {
      const [replicaDetails, conversationData, knowledgeData] = await Promise.all([
        sensayComprehensiveAPI.getReplicaDetails(replicaUuid),
        sensayComprehensiveAPI.listConversations(replicaUuid, { limit: 10 }),
        sensayComprehensiveAPI.listKnowledgeBaseEntries(replicaUuid, { page_size: 20 })
      ]);

      setSelectedReplica(replicaDetails);
      setConversations(conversationData.items);
      setKnowledgeEntries(knowledgeData.items);
    } catch (err) {
      console.error('Failed to load replica data:', err);
    }
  };

  const loadAnalytics = async (replicaUuid: string) => {
    try {
      const analyticsData = await propGuardSensayWrapper.getPropertyAnalytics(replicaUuid);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load analytics:', err);
    }
  };

  const handleCreateReplica = async () => {
    try {
      setIsLoading(true);
      const newReplica = await sensayComprehensiveAPI.createReplica({
        name: 'PropGuard Real Estate Assistant',
        shortDescription: 'Advanced Property Analysis and Risk Assessment AI',
        greeting: 'Hello! I\'m PropGuard AI, your intelligent property analysis assistant.',
        ownerID: 'propguard-user',
        slug: 'propguard-real-estate-assistant',
        llm: {
          model: 'gpt-4o',
          systemMessage: 'You are PropGuard AI, specializing in real estate analysis, valuations, and risk assessment.'
        },
        private: false,
        purpose: 'Property analysis and real estate intelligence',
        tags: ['real-estate', 'property-analysis', 'risk-assessment', 'valuation']
      });

      setReplicas(prev => [newReplica, ...prev]);
      setSelectedReplica(newReplica);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create replica');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddKnowledge = async (replicaUuid: string, title: string, content: string) => {
    try {
      const newEntry = await sensayComprehensiveAPI.createKnowledgeBaseEntryFromText(replicaUuid, {
        title,
        content,
        language: 'en'
      });

      setKnowledgeEntries(prev => [newEntry, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add knowledge entry');
    }
  };

  const handleChatTest = async (replicaUuid: string, message: string) => {
    try {
      setStreamingResponse('');
      const response = await sensayComprehensiveAPI.generateChatCompletion(replicaUuid, {
        content: message,
        source: 'web',
        store: true
      });

      setStreamingResponse(response.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate chat completion');
    }
  };

  const handleStreamChatTest = async (replicaUuid: string, message: string) => {
    try {
      setStreamingResponse('');
      
      // Use streaming for real-time response
      for await (const chunk of sensayComprehensiveAPI.streamChatCompletion(replicaUuid, {
        content: message,
        source: 'web',
        store: true
      })) {
        setStreamingResponse(prev => prev + chunk);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stream chat completion');
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Active Replicas</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{replicas.length}</p>
          <p className="text-sm text-blue-700 dark:text-blue-300">Property Analysis AI</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">Knowledge Entries</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {knowledgeEntries.reduce((sum, entry) => sum + (entry.status === 'READY' ? 1 : 0), 0)}
          </p>
          <p className="text-sm text-green-700 dark:text-green-300">Property Knowledge Base</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Total Conversations</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{conversations.length}</p>
          <p className="text-sm text-purple-700 dark:text-purple-300">User Interactions</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={handleCreateReplica}
            disabled={isLoading}
            className="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            🍬 Create Replica
          </button>
          
          <button
            onClick={() => setActiveTab('knowledge')}
            className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            📚 Add Knowledge
          </button>
          
          <button
            onClick={() => setActiveTab('analytics')}
            className="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            📊 View Analytics
          </button>
          
          <button
            onClick={() => setActiveTab('integrations')}
            className="p-4 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
          >
            🔗 Manage Integrations
          </button>
        </div>
      </div>
    </div>
  );

  const renderReplicas = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Replicas</h2>
        <button
          onClick={handleCreateReplica}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50"
        >
          Create New Replica
        </button>
      </div>

      <div className="grid gap-4">
        {replicas.map((replica) => (
          <div
            key={replica.uuid}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedReplica?.uuid === replica.uuid
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => loadReplicaData(replica.uuid)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{replica.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{replica.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {replica.tags?.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded">
                      ❤️ {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Created: {new Date(replica.createdAt).toLocaleDateString()}</p>
                <p>Status: {replica.private ? 'Private' : 'Public'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedReplica && (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Replica Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Configuration</h4>
              <p><strong>Model:</strong> {selectedReplica.llm.model}</p>
              <p><strong>Owner:</strong> {selectedReplica.ownerID}</p>
              <p><strong>Slug:</strong> {selectedReplica.slug}</p>
            </div>
            <div>
              <h4 className="font-semibold">Greeting Message</h4>
              <p className="bg-white dark:bg-gray-700 p-3 rounded text-sm">
                {selectedReplica.greeting}
              </p>
            </div>
          </div>
          
          {selectedReplica.suggestedQuestions && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Suggested Questions</h4>
              <div className="space-y-1">
                {selectedReplica.suggestedQuestions.map((question, index) => (
                  <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                    • {question}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Knowledge Base</h2>
        {selectedReplica && (
          <button
            onClick={() => {
              const title = prompt('Enter knowledge title:');
              const content = prompt('Enter knowledge content:');
              if (title && content) {
                handleAddKnowledge(selectedReplica.uuid, title, content);
              }
            }}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
          >
            Add Knowledge Entry
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {knowledgeEntries.map((entry) => (
          <div key={entry.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{entry.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Type: {entry.type}</p>
                <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                  entry.status === 'READY' ? 'bg-green-100 text-green-800' :
                  entry.status === 'NEW' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {entry.status}
                </span>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>Created: {new Date(entry.createdAt).toLocaleDateString()}</p>
                {entry.processedAt && (
                  <p>Processed: {new Date(entry.processedAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>
      
      {analytics ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Historical Trends</h3>
            <div className="space-y-2">
              {analytics.historical.items.slice(-7).map((item, index) => (
                <div key={item.date} className="flex justify-between">
                  <span className="text-sm">{item.date}</span>
                  <span className="text-sm font-semibold">{item.cumulativeConversations}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Conversation Sources</h3>
            <div className="space-y-2">
              {analytics.sources.items.map((source, index) => (
                <div key={source.source} className="flex justify-between">
                  <span className="text-sm">{source.source}</span>
                  <span className="text-sm font-semibold">{source.conversations}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
       ): (
        <div className="text-center py-8">
          <button
            onClick={() => selectedReplica && loadAnalytics(selectedReplica.uuid)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
          >
            Load Analytics Data
          </button>
        </div>
      )}
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Integrations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🤏 Telegram</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Integrate with Telegram for property analysis and real estate chat
          </p>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
            Configure Telegram Bot
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">🈈 Discord</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Deploy PropGuard AI to Discord servers for automated property insights
          </p>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm">
            Setup Discord Bot
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">💒 Chat Widget</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Embed PropGuard AI chat widget on your real estate websites
          </p>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
            Embed Widget
          </button>
        </div>
      </div>
    </div>
  );

  const renderChatTest = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chat Test</h2>
      
      {selectedReplica && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Test message for PropGuard AI..."
              className="flex-1 p-3 border rounded-lg"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const target = e.target as HTMLInputElement;
                  handleChatTest(selectedReplica.uuid, target.value);
                  target.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Test message for PropGuard AI..."]') as HTMLInputElement;
                if (input.value) {
                  handleChatTest(selectedReplica.uuid, input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Send
            </button>
            <button
              onClick={() => {
                const input = document.querySelector('input[placeholder="Test message for PropGuard AI..."]') as HTMLInputElement;
                if (input.value) {
                  handleStreamChatTest(selectedReplica.uuid, input.value);
                  input.value = '';
                }
              }}
              className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            >
              Stream
            </button>
          </div>
          
          {streamingResponse && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">AI Response:</h4>
              <p className="whitespace-pre-wrap">{streamingResponse}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading Sensay Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg ${className}`}>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Error</h3>
        <p className="text-red-700 dark:text-red-300">{error}</p>
        <button
          onClick={() => {
            setError(null);
            initializeDashboard();
          }}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="border-b">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', emoji: '📊' },
            { id: 'replicas', label: 'Replicas', emoji: '🤖' },
            { id: 'knowledge', label: 'Knowledge', emoji: '📚' },
            { id: 'analytics', label: 'Analytics', emoji: '📈' },
            { id: 'integrations', label: 'Integrations', emoji: '🔗' },
            { id: 'chat-test', label: 'Chat Test', emoji: '💬' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              {tab.emoji} {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'replicas' && renderReplicas()}
      {activeTab === 'knowledge' && renderKnowledge()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'integrations' && renderIntegrations()}
      {activeTab === 'chat-test' && renderChatTest()}
    </div>
  );
};
