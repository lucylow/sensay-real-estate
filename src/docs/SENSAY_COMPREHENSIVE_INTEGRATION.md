# Sensay Comprehensive API Integration for PropGuard Real Estate

## 📋 Overview

This comprehensive integration implements **all Sensay API endpoints** as specified in the documentation at https://docs.sensay.io/. The implementation provides complete coverage of the Sensay AI platform for PropGuard Real Estate, enabling advanced AI-powered property analysis, conversational interfaces, and multi-channel deployment.

## 🎯 Implemented Endpoints

| Endpoint Category | Status | Implementation |
|------------------|--------|---------------|
| **Conversations** | ✅ Complete | `SensayComprehensiveAPI` |
| **Analytics** | ✅ Complete | Historical & Source analytics |
| **Replicas** | ✅ Complete | CRUD operations |
| **API Keys** | ✅ Complete | Invitation redemption |
| **Chat History** | ✅ Complete | Multi-source history tracking |
| **Chat Completions** | ✅ Complete | Streaming & non-streaming |
| **Users** | ✅ Complete | User management |
| **Knowledge Base** | ✅ Complete | Text, website, file sources |
| **Usage** | ✅ Complete | Metrics & billing data |
| **Telegram Integration** | ✅ Complete | Bot deployment & chat |
| **Discord Integration** | ✅ Complete | Server bot integration |
| **Chat-widget Integration** | ✅ Complete | Web embed functionality |
| **Experimental** | ✅ Complete | OpenAI-compatible API |

## 📁 File Structure

```
src/
├── services/
│   ├── sensayComprehensiveAPI.ts           # 🔥 Main comprehensive API service
│   ├── sensayConversationService.ts        # Existing conversation service
│   └── sensayService.ts                   # Existing Sensay service
├── components/
│   └── sensay/
│       └── ComprehensiveSensayDashboard.tsx  # 🎨 Management dashboard
├── utils/
│   └── sensayAPITesting.ts               # 🧪 Comprehensive testing suite
└── docs/
    └── SENSAY_COMPREHENSIVE_INTEGRATION.md  # 📖 This documentation
```

## 🚀 Quick Start Guide

### 1. Configuration

Update your environment variables in `.env`:

```env
VITE_SENSAY_API_KEY=your_sensay_api_key_here
VITE_SENSAY_ORG_ID=your_sensay_organization_id_here
VITE_SENSAY_REPLICA_ID=propguard-real-estate-agent
```

### 2. Basic Usage

```typescript
import { sensayComprehensiveAPI, propGuardSensayWrapper } from '@/services/sensayComprehensiveAPI';

// Initialize API client
const api = sensayComprehensiveAPI;

// Validate credentials
const isValid = await api.validateCredentials();

// Create a PropGuard-specific replica
const replica = await propGuardSensayWrapper.createPropGuardReplica(
  'Custom PropGuard Assistant',
  'user-id-123'
);

// Send property analysis request
const response = await propGuardSensayWrapper.analyzeProperty(
  '123 Main Street, Melbourne',
  'valuation'
);

// Stream real-time responses
for await (const chunk of propGuardSensayWrapper.streamPropertyAnalysis(
  '123 Main Street, Melbourne',
  'risk'
)) {
  console.log(chunk);
}
```

### 3. Dashboard Integration

Add the comprehensive dashboard to your application:

```tsx
import { ComprehensiveSensayDashboard } from '@/components/sensay/ComprehensiveSensayDashboard';

function App() {
  return (
    <div>
      <ComprehensiveSensayDashboard className="max-w-7xl mx-auto p-6" />
    </div>
  );
}
```

## 🔧 Core API Capabilities

### Conversations Management

```typescript
// List conversations with pagination
const conversations = await api.listConversations(replicaUUID, {
  limit: 20,
  source: ['web', 'telegram']
});

// Get detailed conversation data
const conversation = await api.getConversationDetails(replicaUUID, conversationUUID);

// Access conversation messages
const messages = await api.listConversationMessages(replicaUUID, conversationUUID, {
  limit: 50,
  beforeUUID: 'some-message-uuid'
});
```

### Analytics & Insights

```typescript
// Get historical conversation trends
const historical = await api.getHistoricalConversationAnalytics(replicaUUID);

// Get source-based analytics
const sources = await api.getSourceAnalytics(replicaUUID);

// Comprehensive PropGuard analytics
const propguardAnalytics = await propGuardSensayWrapper.getPropertyAnalytics(replicaUUID);
```

### Replica Management

```typescript
// List all replicas with filtering
const replicas = await api.listReplicas({
  page: 1,
  page_size: 24,
  tags: ['real-estate', 'property-analysis'],
  owner_uuid: 'specific-owner-id'
});

// Create specialized replica
const replica = await api.createReplica({
  name: 'Real Estate Expert',
  shortDescription: 'Property analysis specialist',
  greeting: 'Hello! I can help with property valuations and market insights.',
  ownerID: 'owner-id',
  slug: 'real-estate-expert',
  llm: {
    model: 'gpt-4o',
    systemMessage: 'You are a real estate expert specializing in property analysis.'
  },
  private: false,
  purpose: 'Property analysis and investment advice',
  tags: ['real-estate', 'valuation', 'investment']
});

// Update replica configuration
const updatedReplica = await api.updateReplica(replicaUUID, {
  greeting: 'Updated greeting message',
  tags: ['updated', 'tags']
});
```

### Knowledge Base Management

```typescript
// Add property knowledge from text
const knowledgeEntry = await api.createKnowledgeBaseEntryFromText(replicaUUID, {
  title: 'Melbourne Property Market Insights',
  content: 'Comprehensive analysis of Melbourne real estate trends...',
  language: 'en'
});

// Add knowledge from website
const websiteEntry = await api.createKnowledgeBaseEntryFromWebsite(replicaUUID, {
  url: 'https://example.com/property-insights',
  title: 'Property Insights Website',
  autoRefresh: true
});

// List knowledge base entries
const entries = await api.listKnowledgeBaseEntries(replicaUUID, {
  status: ['READY', 'NEW'],
  type: ['text', 'website'],
  page: 1,
  page_size: 20
});

// Update knowledge entry
await api.updateKnowledgeBaseEntry(replicaUUID, entryId, {
  title: 'Updated title',
  content: 'Updated content'
});
```

### Chat Completions & Streaming

```typescript
// Standard chat completion
const response = await api.generateChatCompletion(replicaUUID, {
  content: 'What\'s the valuation of 123 Oak Street in Melbourne?',
  source: 'web',
  store: true
});

// Streaming chat completion (real-time)
for await (const chunk of api.streamChatCompletion(replicaUUID, {
  content: 'Analyze risk factors for coastal properties',
  source: 'web'
})) {
  console.log('Real-time chunk:', chunk);
}

// Platform-specific completions
const telegramResponse = await api.generateTelegramCompletion(replicaUUID, {
  content: 'Hello from Telegram!',
  telegram_data: {
    chatId: 'telegram-chat-id',
    messageId: 'telegram-message-id',
    threadId: 'telegram-thread-id'
  }
});

const discordResponse = await api.generateDiscordCompletion(replicaUUID, {
  content: 'Hello from Discord!',
  discord_data: {
    channelId: 'discord-channel-id',
    channelName: 'Property-Chat',
    authorId: 'discord-user-id',
    authorName: 'PropertyBotUser',
    messageId: 'discord-message-id'
  }
});
```

### Multi-Channel Integration

```typescript
// Telegram Bot Integration
await api.createTelegramIntegration(replicaUUID, {
  token: 'telegram-bot-token',
  service_name: 'PropGuard-Telegram-Bot'
});

// Discord Bot Integration
await api.createDiscordIntegration(replicaUUID, {
  token: 'discord-bot-token',
  service_name: 'PropGuard-Discord-Bot'
});

// Chat Widget (for web embedding)
const embedResponse = await api.generateEmbedCompletion(replicaUUID, {
  content: 'User message from embedded chat widget',
  user_uuid: 'web-user-id'
});
```

### Usage Monitoring

```typescript
// Combined usage metrics
const usage = await api.getCombinedUsage();

// Conversation usage specifically
const conversationUsage = await api.getConversationUsage();

// Knowledge base entry usage
const knowledgeUsage = await api.getKnowledgeBaseUsage();
```

## 🎨 Comprehensive Dashboard Features

The `ComprehensiveSensayDashboard` component provides:

### 📊 Overview Tab
- Real-time statistics on replicas, knowledge entries, and conversations
- Quick action buttons for common operations
- System health indicators

### 🤖 Replicas Tab
- List all replicas with filtering and search
- Create new replicas with PropGuard specialization
- View detailed replica configurations
- Manage replica settings and gre消息格式

### 📚 Knowledge Tab
- Browse knowledge base entries by status and type
- Add new knowledge entries (text/website/file sources)
- Update and delete entries
- Monitor processing status

### 📈 Analytics Tab
- Historical conversation trends with visual charts
- Source-based analytics (web, Discord, Telegram, etc.)
- Growth patterns and engagement metrics
- Export capabilities

### 🔗 Integrations Tab
- Configure Telegram bot deployments
- Setup Discord server integrations
- Embed chat widgets on websites
- Multi-channel deployment management

### 💬 Chat Test Tab
- Real-time chat testing with any replica
- Streaming response testing
- Message history and conversation context
- Performance monitoring

## 🧪 Comprehensive Testing Suite

The `SensayAPITester` class provides automated testing for all endpoints:

```typescript
import { runComprehensiveTests } from '@/utils/sensayAPITesting';

// Run complete test suite
const testResults = await runComprehensiveTests({
  apiKey: 'your-api-key',
  organizationId: 'your-org-id'
});

console.log('Test Report:', testResults.report);

// Test individual endpoint groups
const apiTester = new SensayAPITester();
const conversationsTests = await apiTester.testConversationsAPI();
const analyticsTests = await apiTester.testAnalyticsAPI();
const integrationsTests = await apiTester.testTelegramIntegration();
```

### Testing Features

🐙 **Automated Test Coverage**
- All 14 Sensay API endpoint categories
- PropGuard-specific functionality tests
- Performance benchmarking
- Error handling validation

🔄 **Real-time Monitoring**
- Response time tracking
- Success/failure rate analysis
- Detailed error reporting
- Automated health checks

📊 **Comprehensive Reporting**
- Markdown-formatted test reports
- Pass/fail statistics
- Performance metrics
- Actionable recommendations

## 🏠 PropGuard Real Estate Specializations

### Property Analysis Intelligence

```typescript
// Analyze property valuation
const valuation = await propGuardSensayWrapper.analyzeProperty(
  '123 Property Street, Sydney',
  'valuation'
);

// Assess environmental risks
const riskAnalysis = await propGuardSensayWrapper.analyzeProperty(
  '456 Coastal Drive, Gold Coast',
  'risk'
);

// Market insights and trends
const marketData = await propGuardSensayWrapper.analyzeProperty(
  '789 Urban Avenue, Melbourne',
  'market'
);
```

### Intelligent Intent Recognition

```typescript
const intent = propGuardSensayWrapper.analyzePropertyIntent(
  'What\'s the flood risk for properties near the river?'
);

console.log(intent);
// Output: {
//   intent: 'risk',
//   confidence: 0.85,
//   entities: {
//     location: 'properties near the river',
//     propertyType: undefined
//   }
// }
```

### Specialized Replica Creation

```typescript
const propGuardReplica = await propGuardSensayWrapper.createPropGuardReplica(
  'PropGuard Commercial Specialist',
  'commercial-investor-123'
);

// Automatically configured with:
// - Real estate expertise system prompt
// - Property analysis capabilities
// - Risk assessment knowledge
// - Market intelligence features
// - Investment analysis tools
```

## 🔌 Integration Examples

### Real Estate Chatbot Deployment

```typescript
// Create specialized replica for property analysis
const propertyBot = await propGuardSensayWrapper.createPropGuardReplica(
  'PropGuard Property Assistant',
  'real-estate-agency-123'
);

// Add market knowledge
await propGuardSensayWrapper.addPropertyKnowledge(
  propertyBot.uuid,
  'Melbourne Market Trends 2024',
  'Latest market analysis for Melbourne suburbs...'
);

// Deploy to multiple platforms
await Promise.all([
  // Telegram bot
  sensayComprehensiveAPI.createTelegramIntegration(propertyBot.uuid, {
    token: 'telegram-bot-token',
    service_name: 'PropGuard-Telegram'
  }),
  
  // Discord bot  
  sensayComprehensiveAPI.createDiscordIntegration(propertyBot.uuid, {
    token: 'discord-bot-token',
    service_name: 'PropGuard-Discord'
  })
]);

// Continuous learning from conversations
const analytics = await propGuardSensayWrapper.getPropertyAnalytics(propertyBot.uuid);
console.log('Conversation insights:', analytics.insights);
```

### Multi-Channel Property Support

```typescript
// Web chat widget
const webResponse = await sensayComprehensiveAPI.generateEmbedCompletion(propertyBot.uuid, {
  content: 'I\'m interested in properties under $1M in Melbourne',
  user_uuid: 'web-user-456'
});

// Telegram integration
const telegramResponse = await sensayComprehensiveAPI.generateTelegramCompletion(
  propertyBot.uuid,
  {
    content: 'Show me coastal properties in Sydney',
    telegram_data: {
      chatId: '1234567890',
      messageId: '987654321',
      threadId: '1122334455'
    }
  }
);

// Discord server integration
const discordResponse = await sensayComprehensiveAPI.generateDiscordCompletion(
  propertyBot.uuid,
  {
    content: 'What are the investment opportunities in Brisbane?',
    discord_data: {
      channelId: 'discord-channel-123',
      channelName: 'property-investment',
      authorId: 'discord-user-456',
      authorName: 'PropertyInvestor',
      messageId: 'discord-message-789'
    }
  }
);
```

## 🔐 Security & Best Practices

### Authentication

```typescript
// Secure credential management
const api = new SensayComprehensiveAPI({
  apiKey: process.env.SENSAY_API_KEY,
  organizationId: process.env.SENSAY_ORG_ID
});

// Validate before operations:
const isValid = await api.validateCredentials();
if (!isValid) {
  throw new Error('Invalid Sensay credentials');
}
```

### Error Handling

```typescript
try {
  const replica = await api.getReplicaDetails(replicaUUID);
} catch (error) {
  if (error.message.includes('404')) {
    console.log('Replica not found');
  } else if (error.message.includes('403')) {
    console.log('Insufficient permissions');
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### Rate Limiting

The implementation includes automatic retry logic and respects Sensay's rate limits:

```typescript
// Built-in retry mechanism for transient failures
const response = await api.generateChatCompletion(replicaUUID, request, true); // streaming with retry
```

## 📚 Additional Resources

### API Documentation
- [Sensay Official Documentation](https://docs.sensay.io/)
- [API Reference](https://docs.sensay.io/api-reference)
- [Changelog](https://docs.sensay.io/changelog)

### Integration Guides
- [PropGuard Real Estate Platform](../README.md)
- [Component Usage Examples](../../src/components/sensay/)
- [Service Architecture](../services/)

### Testing & Debugging
- [API Testing Utilities](../../src/utils/sensayAPITesting.ts)
- [Performance Monitoring](https://docs.sensay.io/analytics)
- [Error Codes Reference](https://docs.sensay.io/errors)

## 🚀 Deployment Checklist

- [ ] Configure Sensay API credentials
- [ ] Validate connection with `validateCredentials()`
- [ ] Create PropGuard-specific replica
- [ ] Add initial knowledge base content
- [ ] Test core functionality (chat completions)
- [ ] Configure desired integrations (Telegram/Discord/Web)
- [ ] Set up analytics monitoring
- [ ] Run comprehensive test suite
- [ ] Monitor usage metrics
- [ ] Scale as needed

## 🤝 Support

For support with this comprehensive integration:

1. 📖 Check this documentation first
2. 🧪 Run the automated test suite
3. 📊 Monitor analytics and usage data
4. 🐛 Review error logs and API responses
5. 💡 Consult Sensay documentation for API-specific issues

---

**Built for PropGuard Real Estate Platform**  
*Advanced AI-powered property analysis and conversational intelligence*
