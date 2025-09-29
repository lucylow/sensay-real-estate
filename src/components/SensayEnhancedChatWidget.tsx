import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  MapPin, 
  DollarSign, 
  Calendar,
  Phone,
  Mail,
  Home,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Minimize2,
  Maximize2,
  Settings,
  Key
} from 'lucide-react';
import { SensayAPIClient, SensayUtils, SensayCredentials } from '@/lib/sensay-client';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    source: 'sensay' | 'fallback';
    conversationId?: string;
    replicateInfo?: {
      name: string;
      model: string;
    };
    quickActions?: QuickAction[];
  };
}

interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface SensayAuthState {
  isAuthenticated: boolean;
  userId?: string;
  replicaId?: string;
  error?: string;
}

export const SensayEnhancedChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm your PropGuard AI assistant with Sensay integration. I can help you with property analysis, markets, valuations, and much more. How can I assist you today?",
      timestamp: new Date(),
      metadata: {
        source: 'sensay',
        quickActions: [
          { id: 'find-properties', label: 'Find Properties', action: 'find-properties', icon: <Home className="h-4 w-4" /> },
          { id: 'get-valuation', label: 'Get Valuation', action: 'get-valuation', icon: <DollarSign className="h-4 w-4" /> },
          { id: 'market-analysis', label: 'Market Analysis', action: 'market-analysis', icon: <TrendingUp className="h-4 w-4" /> },
          { id: 'risk-assessment', label: 'Risk Assessment', action: 'risk-assessment', icon: <AlertCircle className="h-4 w-4" /> }
        ]
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sensayAuth, setSensayAuth] = useState<SensayAuthState>({
    isAuthenticated: false,
  });
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<SensayAPIClient | null>(null);

  // Initialize Sensay API integration
  useEffect(() => {
    initializeSensayAPI();
  }, []);

  const scrollToBottom = () => {
    scrollAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSensayAPI = async () => {
    try {
      console.log('🚀 Initializing Sensay API integration...');
      
      const credentials: SensayCredentials = {
        apiKey: import.meta.env.VITE_SENSAY_API_KEY || '',
      };

      if (!credentials.apiKey) {
        console.log('⚠️ No Sensay API key found, using offline mode');
        setSensayAuth({
          isAuthenticated: false,
          error: undefined
        });
        return;
      }

      const client = new SensayAPIClient(credentials);
      clientRef.current = client;

      // Validate credentials
      const isValid = await client.validateCredentials();
      
      if (!isValid) {
        throw new Error('Invalid Sensay API credentials');
      }

      // Create/retrieve user
      const orgClient = client.createOrganizationClient();
      const userId = `propguard-user-${Date.now()}`;
      
      await SensayUtils.ensureUserExists(userId, orgClient);

      // Setup replica
      const userClient = client.createUserClient(userId);
      const replicaId = await SensayUtils.ensureReplicaExists(userId, userClient);

      setSensayAuth({
        isAuthenticated: true,
        userId,
        replicaId,
        error: undefined
      });

      console.log('✅ Sensay API initialized successfully');

    } catch (error: any) {
      console.error('❌ Sensay API initialization failed:', error);
      setSensayAuth({
        isAuthenticated: false,
        error: `Sensay API: ${error.message}`
      });
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      metadata: { source: 'sensay' }
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (sensayAuth.isAuthenticated && clientRef.current) {
        // Try Sensay API first
        await sendSensayMessage(message);
      } else {
        // Fallback to local AI processing
        await sendFallbackMessage(message);
      }

    } catch (error: any) {
      console.error('Error processing message:', error);
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Let me try to help you with property analysis using our fallback system.',
        timestamp: new Date(),
        metadata: { source: 'fallback' }
      };
      setMessages(prev => [...prev, errorMessage]);

      // Also try fallback
      await sendFallbackMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const sendSensayMessage = async (message: string) => {
    if (!sensayAuth.userId || !sensayAuth.replicaId || !clientRef.current) {
      throw new Error('Sensay not properly initialized');
    }

    const userClient = clientRef.current.createUserClient(sensayAuth.userId);
    
    const response = await SensayUtils.sendMessage(
      sensayAuth.replicaId,
      message,
      userClient,
      getCurrentConversationId()
    );

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      metadata: {
        source: 'sensay',
        conversationId: response.conversationId
      }
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const sendFallbackMessage = async (message: string) => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const response = await generateFallbackResponse(message);
    
    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      metadata: {
        source: 'fallback',
        quickActions: response.quickActions
      }
    };

    setMessages(prev => [...prev, assistantMessage]);
  };

  const generateFallbackResponse = async (message: string): Promise<{content: string, quickActions?: QuickAction[]}> => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('property') || lowerMessage.includes('find') || lowerMessage.includes('looking for')) {
      return {
        content: `I'd be happy to help you find properties! To provide the best matches, could you tell me:

• Your budget range
• Preferred locations  
• Property type (house, apartment, etc.)
• Timeline for purchase
• Key features you're looking for

I can analyze over 50+ global property markets and provide comprehensive insights.`,
        quickActions: [
          { id: 'budget-500k', label: 'Under $500K', action: 'set-budget-500k' },
          { id: 'budget-1m', label: '$500K - $1M', action: 'set-budget-1m' },
          { id: 'budget-2m', label: '$1M - $2M', action: 'set-budget-2m' },
          { id: 'global-search', label: 'Global Search', action: 'global-search' }
        ]
      };
    }

    if (lowerMessage.includes('valuation') || lowerMessage.includes('worth') || lowerMessage.includes('value')) {
      return {
        content: `I can help you get comprehensive property valuations using PropGuard AI's advanced analytics! Our valuations include:

💰 **Estimated Market Value**
📊 **Comparable Sales Analysis** 
📈 **Market Trend Analysis**
⚠️ **Risk Assessment** (flood, fire, earthquake, climate)
🏘️ **Neighborhood Intelligence**
🌍 **Global Market Context**

Please provide the property address or describe the property you'd like me to analyze.`,
        quickActions: [
          { id: 'valuation-form', label: 'Enter Address', action: 'valuation-form' },
          { id: 'valuation-upload', label: 'Upload Details', action: 'valuation-upload' },
          { id: 'comparative-analysis', label: 'Comparative Analysis', action: 'comparative-analysis' }
        ]
      };
    }

    if (lowerMessage.includes('risk') || lowerMessage.includes('danger') || lowerMessage.includes('safety')) {
      return {
        content: `I provide comprehensive environmental and climate risk analysis for properties worldwide:

🌊 **Flood Risk** - Detailed flooding probability maps
🔥 **Wildfire Risk** - Fire danger zones and mitigation
🌍 **Climate Impact** - Temperature, sea level rise projections  
⛰️ **Geological Risk** - Earthquake and landslide potential
🏭 **Environmental** - Air quality, water contamination risks

Our AI risk engine analyzes over 100 environmental data points to give you accurate risk scores and mitigation recommendations.`,
        quickActions: [
          { id: 'flood-analysis', label: 'Flood Risk Assessment', action: 'flood-analysis' },
          { id: 'fire-analysis', label: 'Wildfire Risk Analysis', action: 'fire-analysis' },
          { id: 'climate-impact', label: 'Climate Impact Report', action: 'climate-impact' }
        ]
      };
    }

    if (lowerMessage.includes('market') || lowerMessage.includes('trends') || lowerMessage.includes('analysis')) {
      return {
        content: `I provide comprehensive market intelligence for global real estate markets:

📈 **Price Trends** - Historical data and future projections
📊 **Market Metrics** - Inventory, days on market, price per sqft
🌍 **Global Context** - How local markets compare globally  
💰 **Investment Analysis** - ROI projections and investment hotspots
📰 **Market Sentiment** - News analysis and economic indicators

Which market would you like me to analyze?`,
        quickActions: [
          { id: 'market-sf', label: 'San Francisco Bay Area', action: 'market-sf' },
          { id: 'market-la', label: 'Los Angeles Metro', action: 'market-la' },
          { id: 'market-global', label: 'Global Markets', action: 'market-global' }
        ]
      };
    }

    // Default response
    return {
      content: `I'm your PropGuard AI assistant, specializing in global real estate analysis! I can help you with:

🏠 **Property Search** - Find properties worldwide with advanced filters
💰 **Valuations** - Comprehensive property valuations with risk analysis  
📊 **Market Intelligence** - Real-time market trends and insights
⚠️ **Risk Assessment** - Environmental and climate risk analysis
🌍 **Global Analysis** - Compare markets worldwide
📅 **Investment Planning** - ROI analysis and investment strategies

What would you like to explore?`,
      quickActions: [
        { id: 'property-search', label: 'Property Search', action: 'property-search', icon: <Home className="h-4 w-4" /> },
        { id: 'valuation', label: 'Get Valuation', action: 'valuation', icon: <DollarSign className="h-4 w-4" /> },
        { id: 'market-analysis', label: 'Market Analysis', action: 'market-analysis', icon: <TrendingUp className="h-4 w-4" /> },
        { id: 'risk-assessment', label: 'Risk Assessment', action: 'risk-assessment', icon: <AlertCircle className="h-4 w-4" /> }
      ]
    };
  };

  const getCurrentConversationId = (): string | undefined => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.metadata?.conversationId;
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      'find-properties': 'I\'m looking for properties to purchase',
      'get-valuation': 'I need a comprehensive property valuation',
      'market-analysis': 'Show me market analysis and trends',
      'risk-assessment': 'I want environmental and climate risk analysis',
      'set-budget-500k': 'My budget range is under $500,000',
      'set-budget-1m': 'My budget range is $500,000 to $1,000,000',
      'set-budget-2m': 'My budget range is $1,000,000 to $2,000,000',
      'global-search': 'I want to search properties globally',
      'valuation-form': 'I\'d like to enter a property address for valuation',
      'flood-analysis': 'Analyze flood risk for a property',
      'fire-analysis': 'Assess wildfire risk for a property',
      'market-sf': 'Show me San Francisco Bay Area market analysis',
      'market-la': 'Analyze Los Angeles Metro market trends'
    };

    const message = actionMessages[action] || `I want to ${action.replace('-', ' ')}`;
    handleSendMessage(message);
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleWidget}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          AI
        </div>
        {sensayAuth.isAuthenticated && (
          <div className="absolute -top-1 -left-1">
            <Badge className="bg-green-500 text-white text-xs">Sensay</Badge>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className={`shadow-2xl border-2 border-blue-200 ${isMinimized ? 'h-16' : 'h-[650px]'} transition-all duration-300`}>
        <CardHeader className="pb-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/propguard-ai.jpg" />
                <AvatarFallback className="bg-blue-500 text-white">PA</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">PropGuard AI</CardTitle>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleWidget}
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className="h-6 w-6">
                        {message.type === 'user' ? (
                          <AvatarFallback className="bg-blue-600 text-white">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className={message.metadata?.source === 'sensay' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}>
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className={`rounded-lg px-3 py-2 ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : message.metadata?.source === 'sensay' 
                            ? 'bg-green-100 text-green-900 border border-green-200'
                            : 'bg-gray-100 text-gray-900'
                      }`}>
                        <div className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </div>
                        
                        {message.metadata?.quickActions && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {message.metadata.quickActions.map((action) => (
                              <Button
                                key={action.id}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6"
                                onClick={() => handleQuickAction(action.action)}
                              >
                                {action.icon}
                                <span className="ml-1">{action.label}</span>
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-1 text-xs opacity-70 mt-1">
                          <span>{message.timestamp.toLocaleTimeString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-100 border border-gray-200">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Typing...
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    sensayAuth.isAuthenticated 
                      ? "Ask about properties, valuations, markets..." 
                      : "Ask PropGuard AI about real estate..."
                  }
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SensayEnhancedChatWidget;
