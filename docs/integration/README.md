# API Integration Guide

## 🔌 Sensay API Integration

### Overview
Complete integration of Sensay Wisdom Engine for conversational AI in real estate domain.

### Features Implemented
- **Multi-language Support**: English, Spanish, Chinese, French
- **Conversation Management**: Context-aware chatbot interactions
- **Lead Generation**: Automated lead qualification and scoring
- **Cross-platform Sync**: Web, WhatsApp, Telegram coordination
- **Analytics Integration**: Sensay analytics API utilization

### Configuration
```typescript
// Sensay API Configuration
const sensayConfig = {
  apiKey: process.env.VITE_SENSAY_API_KEY,
  orgId: process.env.VITE_SENSAY_ORG_ID,
  baseUrl: 'https://api.sensay.io/v1'
};
```

### Usage Examples
See `src/services/api/sensay.ts` for implementation details.

## 🏠 PropGuard AI Integration

### Property Analysis
- **Risk Assessment**: Climate, fire, flood analysis
- **Market Intelligence**: Real-time pricing and trends
- **Blockchain Verification**: NFT property certificates
- **APRA Compliance**: Regulatory monitoring

### Implementation
See `src/services/propguard.ts` for detailed API integration.

## 📊 Supabase Integration

### Database Schema
- **User Profiles**: Persistent user data and preferences
- **Conversation History**: Complete interaction logging
- **Lead Management**: Qualification and nurturing tracking
- **Analytics Storage**: Performance metrics and reporting

### Functions
- **AI Chat**: Sensay conversation handling
- **Property Analysis**: Enhanced property insights
- **Market Intelligence**: Real-time market data
- **Blockchain Valuation**: NFT certificate management

## 🔧 External Service Integrations

### ElevenLabs TTS
- **Voice Tours**: Interactive property exploration
- **Multi-language**: Voice synthesis in multiple languages
- **Natural Speech**: Human-like voice generation

### HeyGen Avatar
- **AI Avatars**: Human-like virtual tour guides
- **Multilingual**: Avatar communication in multiple languages
- **Customization**: Brand-specific avatar creation

### Calendar APIs
- **Multi-platform**: Google, Outlook, Apple Calendar
- **Automated Booking**: Instant appointment scheduling
- **Conflict Resolution**: Smart rescheduling suggestions

See individual integration files in `src/integrations/` for detailed implementation.
