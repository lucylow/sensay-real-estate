# Mock Data Integration for Sensay Real Estate

This document provides a comprehensive overview of the mock data integration for Sensay, ElevenLabs, and HeyGen APIs, along with the extensive real estate FAQ database.

## 📊 **Mock Data Files Created**

### 1. **ElevenLabs Mock Data** (`src/data/mockElevenLabs.ts`)
- **8 Premium Voices**: Adam, Bella, Arnold, Domi, Elli, Josh, Rachel, Sam
- **3 AI Models**: Monolingual v1, Multilingual v1, Multilingual v2
- **User Subscription Info**: Character limits, usage tracking, tier information
- **Voice Settings**: Stability, similarity boost, style, speaker boost
- **Cloned Voices**: Custom Sensay and Property Analyst voices
- **Audio Tracks**: Pre-generated audio samples for demos
- **Error Responses**: API errors, rate limiting, character limits
- **Subscription Tiers**: Free, Starter, Creator, Pro with detailed features

### 2. **Sensay Mock Data** (`src/data/mockSensay.ts`)
- **3 Sample Users**: Different subscription tiers and usage patterns
- **4 Properties**: Melbourne apartments, offices, houses, townhouses
- **2 Detailed Analyses**: Comprehensive property valuations and risk assessments
- **3 Generated Reports**: Valuation, risk assessment, investment analysis
- **API Responses**: Success, error, and processing states
- **6 Core Features**: Real-time valuation, risk assessment, market intelligence
- **3 Pricing Plans**: Free, Professional, Enterprise tiers

### 3. **HeyGen Mock Data** (`src/data/mockHeyGen.ts`)
- **6 Professional Avatars**: Marianne, Adam, Sarah, Marcus, Lisa, David
- **5 Voice Options**: English, Australian, British, Spanish voices
- **3 Sample Videos**: Completed, processing, and failed states
- **Task Management**: Pending, processing, completed, failed tasks
- **Usage Tracking**: Monthly limits, storage, character usage
- **3 Templates**: Property introduction, investment analysis, market update

### 4. **Real Estate FAQ Database** (`src/data/mockRealEstateFAQs.ts`)
- **52 Comprehensive FAQs** covering:
  - General Real Estate (4 FAQs)
  - PropGuard AI Features (25 FAQs)
  - Property Search & Analysis (3 FAQs)
  - Investment Strategies (4 FAQs)
  - Commercial Real Estate (3 FAQs)
  - Sustainability & Climate (3 FAQs)
  - Legal & Compliance (3 FAQs)
  - Benefits & Future Vision (5 FAQs)

## 🎯 **Key Features Implemented**

### **ElevenLabs Integration**
- ✅ Voice selection with 8 realistic voices
- ✅ Voice cloning with file upload simulation
- ✅ Audio playback with queue management
- ✅ Voice settings customization
- ✅ Subscription tier management
- ✅ Error handling and rate limiting

### **Sensay Integration**
- ✅ Property analysis with real-time valuations
- ✅ Risk assessment (flood, fire, environmental, market)
- ✅ Investment metrics (rental yield, capital growth)
- ✅ User management and subscription tracking
- ✅ Report generation and download
- ✅ Market intelligence and sentiment analysis

### **HeyGen Integration**
- ✅ Avatar selection for real estate presentations
- ✅ Video generation with task tracking
- ✅ Voice synchronization with avatars
- ✅ Template-based content creation
- ✅ Usage monitoring and quota management
- ✅ Premium avatar access control

### **FAQ System**
- ✅ Intelligent question matching
- ✅ Category-based browsing
- ✅ Difficulty level filtering
- ✅ Tag-based search
- ✅ Related question suggestions
- ✅ Voice-enabled responses

## 🔧 **Components Created**

### 1. **VoiceSelector** (`src/components/VoiceSelector.tsx`)
- Voice selection dropdown
- Real-time settings adjustment
- Voice preview functionality
- User subscription info display

### 2. **AudioPlayer** (`src/components/AudioPlayer.tsx`)
- Audio queue management
- Playback controls (play, pause, stop, skip)
- Volume and speed adjustment
- Progress tracking and visualization

### 3. **VoiceCloner** (`src/components/VoiceCloner.tsx`)
- File upload interface
- Voice metadata management
- Progress tracking during cloning
- Label and description support

### 4. **FAQChatbot** (`src/components/FAQChatbot.tsx`)
- Intelligent FAQ matching
- Voice-enabled responses
- Category and difficulty filtering
- Search functionality with tags

### 5. **DemoPage** (`src/pages/DemoPage.tsx`)
- Comprehensive feature showcase
- Tabbed interface for different integrations
- Real-time demo capabilities
- Activity tracking and status monitoring

## 📋 **Mock Data Service** (`src/services/mockDataService.ts`)

### **API Simulation**
- Realistic response delays (200ms - 10s)
- Error simulation for testing
- Rate limiting simulation
- Subscription validation

### **Combined Services**
- Property presentation generation
- Dashboard data aggregation
- Cross-platform integration
- Activity tracking

### **Helper Functions**
- Environment-based mock mode detection
- Singleton pattern implementation
- Error response mapping
- Success/failure simulation

## 🎨 **FAQ Categories & Topics**

### **General Real Estate (4 FAQs)**
- Buying process, selling process, mortgages, costs

### **PropGuard AI (25 FAQs)**
- Overview, valuation methods, LVR certificates
- Risk assessment, compliance, environmental analysis
- XNode computing, confidence scores, multi-modal AI
- Data privacy, security, model updates

### **Investment & Strategy (7 FAQs)**
- Investment strategies, rental yield calculations
- Negative gearing, growth indicators
- Commercial real estate metrics and leases

### **Sustainability & Climate (3 FAQs)**
- NatHERS ratings, climate risks, future-proofing

### **Legal & Compliance (3 FAQs)**
- Stamp duty, Section 32, conveyancer roles

### **Benefits & Future (5 FAQs)**
- Cost savings, sustainability, future vision
- Customization, accuracy, comparison with traditional methods

## 🚀 **Usage Examples**

### **Voice Integration**
```typescript
// Generate voice for property analysis
const audioUrl = await speak("Property valuation: $850,000 with 92% confidence");

// Clone custom voice
const result = await cloneVoice({
  name: "Sensay Professional",
  files: audioFiles,
  description: "Custom voice for real estate presentations"
});
```

### **Property Analysis**
```typescript
// Analyze property with comprehensive data
const analysis = await analyzeProperty("123 Collins Street, Melbourne");
// Returns: valuation, risk assessment, investment metrics

// Generate presentation
const presentation = await generatePropertyPresentation(propertyId);
// Returns: text, audio URL, video task ID
```

### **FAQ Integration**
```typescript
// Search FAQs
const faqs = searchFAQs("property investment");
const categoryFAQs = getFAQsByCategory("PropGuard AI");
const difficultyFAQs = getFAQsByDifficulty("beginner");
```

## 🔐 **Environment Configuration**

### **Required Environment Variables**
```bash
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_SENSAY_API_KEY=your_sensay_api_key
VITE_HEYGEN_API_KEY=your_heygen_api_key
VITE_USE_MOCK_DATA=true  # Enable mock mode
```

### **Mock Mode Detection**
- Automatically enables when API keys are missing
- Can be manually controlled via `VITE_USE_MOCK_DATA`
- Provides seamless fallback for development/demo

## 📈 **Demo Capabilities**

### **Interactive Features**
- Real-time voice synthesis
- Property analysis simulation
- Video generation tracking
- FAQ chatbot with voice responses

### **Data Visualization**
- Property details and analysis
- Risk assessment charts
- Investment metrics
- Usage statistics

### **Multi-Modal Integration**
- Voice + Property Analysis
- Video + Voice + Data
- FAQ + Voice Responses
- Cross-platform workflows

## 🎯 **Benefits for Sensay Hackathon**

### **1. Complete Feature Demonstration**
- All APIs integrated and functional
- Realistic data for impressive demos
- Professional UI/UX components

### **2. Scalable Architecture**
- Easy to switch between mock and real APIs
- Modular component design
- Extensible FAQ system

### **3. Real Estate Expertise**
- 52 comprehensive FAQs covering all aspects
- Industry-specific terminology and concepts
- Professional-grade responses

### **4. Technical Excellence**
- TypeScript throughout
- Error handling and edge cases
- Performance optimization
- Accessibility considerations

This mock data integration provides a complete, professional-grade demonstration of Sensay's AI-powered real estate platform with voice and video capabilities, ready for the hackathon presentation.

