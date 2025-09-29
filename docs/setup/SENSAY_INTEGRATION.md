# Sensay Wisdom API Integration

This integration showcases the power of Sensay's Wisdom Engine for real estate applications, built for the Sensay Hackathon.

## Features

- **Enhanced AI Assistant**: Powered by Sensay's Wisdom Engine for sophisticated property analysis conversations
- **Market Intelligence**: Advanced market analysis and trend predictions
- **Risk Assessment**: Comprehensive risk analysis with mitigation strategies
- **Smart Reports**: Generate detailed property analysis reports
- **Fallback Support**: Graceful fallback to local AI when Sensay API is unavailable

## Setup Instructions

### 1. Get Your API Credentials

1. Use the invite code from your Sensay Hackathon email
2. Visit the `/sensay` page in the application
3. Enter your invite code in the "Redeem Invite Code" section
4. Your API key and Organization ID will be automatically generated and stored

### 2. Environment Configuration

For production deployment, set the following environment variables:

```bash
VITE_SENSAY_API_KEY=your_api_key_here
VITE_SENSAY_ORG_ID=your_organization_id_here
```

**Note**: The environment variable name is `VITE_SENSAY_ORG_ID` (not `VITE_SENSAY_ORG_SECRET`).

### 3. API Credentials Management

The application automatically:
- Stores your API credentials (API key + Organization ID) in localStorage for persistence
- Tests the API credentials validity
- Provides fallback to local AI when Sensay is unavailable
- Shows connection status in the UI

## Usage

### Enhanced AI Assistant

The Sensay-powered assistant provides:

- **Property Analysis**: Comprehensive valuation insights and market comparisons
- **Risk Assessment**: Environmental, market, and financial risk analysis
- **Investment Advice**: ROI projections and strategic recommendations
- **Market Intelligence**: Trend analysis and competitive positioning

### API Integration

The Sensay API service (`src/services/api/sensay.ts`) provides:

```typescript
// Initialize with credentials
const credentials = { apiKey: 'your_key', organizationId: 'your_org_id' };
const sensayAPI = new SensayAPI(credentials);

// Basic chat functionality
const response = await sensayAPI.chat(message, context);

// Specialized property analysis
const analysis = await sensayAPI.analyzeProperty(propertyData, analysisData);

// Market insights
const insights = await sensayAPI.getMarketInsights(location, propertyType);

// Investment advice
const advice = await sensayAPI.generateInvestmentAdvice(propertyData, analysisData);

// Risk assessment
const risk = await sensayAPI.getRiskAssessment(propertyData, analysisData);

// Report generation
const report = await sensayAPI.generateReport(propertyData, analysisData, 'comprehensive');

// Redeem invite code (returns both API key and Organization ID)
const credentials = await sensayAPI.redeemInviteCode(inviteCode);
```

## Components

### SensayAssistant
Enhanced AI assistant component with Sensay integration and fallback support.

### SensaySetup
Setup component for API key configuration and testing.

### SensayIntegrationPage
Main page showcasing the Sensay integration features.

## API Documentation

- **Sensay API Docs**: https://docs.sensay.io
- **Community Support**: Join the Telegram group
- **Hackathon Info**: Check your email for invite code and details

## Fallback Behavior

When the Sensay API is unavailable, the application automatically falls back to:

1. Local LLM integration via Supabase functions
2. Pre-built response templates
3. Basic property analysis capabilities

This ensures the application remains functional even without Sensay API access.

## Development

### Testing the Integration

1. Start the development server: `npm run dev`
2. Navigate to `/sensay`
3. Use the setup tab to configure your API key
4. Test the enhanced assistant in the assistant tab

### API Key Testing

The setup component includes:
- Invite code redemption
- API key validation
- Connection status monitoring
- Error handling and user feedback

## Hackathon Submission

This integration demonstrates:

- **AI-Powered Solutions**: Enhanced property analysis with Sensay's Wisdom Engine
- **Business Applications**: Real estate investment and risk assessment
- **User Experience**: Seamless integration with fallback support
- **Technical Excellence**: Robust error handling and API management

## Support

For issues or questions:
- Check the Sensay API documentation
- Join the Telegram community
- Review the error messages in the browser console
- Ensure your API key is valid and properly configured
