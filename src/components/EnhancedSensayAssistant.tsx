import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, User, Send, Sparkles, TrendingUp, AlertCircle, Key, Settings, 
  Search, Calculator, Calendar, HelpCircle, Users, Globe, MapPin,
  Home, Building, DollarSign, Clock, Star, Shield, FileText
} from 'lucide-react';
import { sensayAPI, SensayResponse } from '@/services/api/sensay';
import { llmAPI } from '@/services/api/llm';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
  confidence?: number;
  metadata?: any;
  conversationFlow?: string;
}

interface EnhancedSensayAssistantProps {
  property?: any;
  analysis?: any;
  className?: string;
  initialFlow?: 'property_search' | 'valuation' | 'booking' | 'faq' | 'lead_qualification';
  context?: 'dashboard' | 'risk-analysis' | 'blockchain' | 'compliance' | 'reports' | 'pricing' | 'property-search';
}

export const EnhancedSensayAssistant: React.FC<EnhancedSensayAssistantProps> = ({ 
  property, 
  analysis, 
  className = '',
  initialFlow = 'property_search',
  context = 'dashboard'
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sensayStatus, setSensayStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [apiKeyStatus, setApiKeyStatus] = useState<'valid' | 'invalid' | 'missing'>('checking');
  const [currentFlow, setCurrentFlow] = useState(initialFlow);
  const [userProfile, setUserProfile] = useState<any>({});
  const [detectedLanguage, setDetectedLanguage] = useState<string>('en');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message based on context and flow
  useEffect(() => {
    const contextMessages = {
      dashboard: {
        content: '🏠 Welcome to PropGuard AI Dashboard! I can help you analyze properties, assess risks, and provide market insights. What would you like to explore?',
        suggestions: ['Analyze a property', 'Check market trends', 'Assess investment risks', 'Get property recommendations']
      },
      'risk-analysis': {
        content: '⚠️ Welcome to Risk Analysis! I can help you understand climate risks, market volatility, and property vulnerabilities. Which property would you like me to assess?',
        suggestions: ['Assess flood risk', 'Check fire risk', 'Analyze market volatility', 'Get risk mitigation advice']
      },
      blockchain: {
        content: '🔗 Welcome to Blockchain Dashboard! I can help you mint NFT certificates, verify property data, and manage blockchain transactions. What would you like to do?',
        suggestions: ['Mint property NFT', 'Verify certificate', 'Check blockchain status', 'View audit trail']
      },
      compliance: {
        content: '🛡️ Welcome to APRA Compliance! I can help you understand regulatory requirements, compliance scores, and reporting obligations. What compliance question do you have?',
        suggestions: ['Check compliance status', 'Explain APRA requirements', 'Generate compliance report', 'Review LVR analysis']
      },
      reports: {
        content: '📊 Welcome to Reports Center! I can help you generate property reports, analyze data, and create comprehensive documentation. What type of report do you need?',
        suggestions: ['Generate valuation report', 'Create risk assessment', 'Export compliance data', 'Analyze market trends']
      },
      pricing: {
        content: '💰 Welcome to Pricing Center! I can help you understand our plans, compare features, and choose the right subscription for your needs. What pricing question do you have?',
        suggestions: ['Compare plans', 'Explain features', 'Calculate costs', 'Get custom quote']
      },
      'property-search': {
        content: '🔍 Welcome to Property Search! I can help you find properties, filter results, and provide market insights. What are you looking for?',
        suggestions: ['Find properties by location', 'Filter by price range', 'Search by property type', 'Get market insights']
      }
    };

    const flowMessages = {
      property_search: {
        content: '🏠 I can help you find the perfect property based on your preferences. What type of property are you looking for?',
        suggestions: ['Find houses under $500K', 'Search apartments in Melbourne', 'Show investment properties', 'Help me choose location']
      },
      valuation: {
        content: '📊 I can provide comprehensive property valuations with AI-powered risk assessment. What property would you like me to analyze?',
        suggestions: ['Value my property', 'Compare property values', 'Get market analysis', 'Risk assessment report']
      },
      booking: {
        content: '📅 I can help you schedule property viewings and manage appointments. Which property would you like to view?',
        suggestions: ['Book a viewing', 'Check availability', 'Schedule virtual tour', 'Contact agent']
      },
      faq: {
        content: '❓ I can answer questions about real estate processes, risks, regulations, and PropGuard technology. What would you like to know?',
        suggestions: ['How does PropGuard work?', 'What are property risks?', 'Explain LVR certificates', 'Market trends explained']
      },
      lead_qualification: {
        content: '👥 I can help assess your investment goals and qualify leads. Tell me about your property investment experience.',
        suggestions: ['I\'m a first-time buyer', 'I\'m an experienced investor', 'I\'m a property professional', 'Help me understand options']
      }
    };

    const contextMessage = contextMessages[context] || contextMessages.dashboard;
    const flowMessage = flowMessages[currentFlow];
    
    const welcome = {
      content: `${contextMessage.content} ${flowMessage.content}`,
      suggestions: [...contextMessage.suggestions, ...flowMessage.suggestions].slice(0, 4)
    };

    setMessages([{
      id: '1',
      type: 'assistant',
      content: welcome.content,
      timestamp: new Date(),
      suggestions: welcome.suggestions,
      confidence: 95,
      conversationFlow: currentFlow
    }]);
  }, [currentFlow, context]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    checkSensayStatus();
  }, []);

  const checkSensayStatus = async () => {
    try {
      const healthCheck = await sensayAPI.healthCheck();
      setSensayStatus(healthCheck.status === 'healthy' ? 'connected' : 'disconnected');
      setApiKeyStatus('valid');
    } catch (error) {
      setSensayStatus('disconnected');
      setApiKeyStatus('invalid');
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Detect language if Sensay is available
    if (sensayStatus === 'connected') {
      try {
        const langDetection = await sensayAPI.detectLanguage(message);
        setDetectedLanguage(langDetection.language);
      } catch (error) {
        console.warn('Language detection failed:', error);
      }
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date(),
      conversationFlow: currentFlow
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponse: SensayResponse;
      let suggestions: string[] = [];
      let responseData: any = null;

      // Route to appropriate handler based on conversation flow
      if (sensayStatus === 'connected') {
        try {
          switch (currentFlow) {
            case 'property_search':
              aiResponse = await sensayAPI.handlePropertySearch(message, userProfile);
              break;
            case 'valuation':
              aiResponse = await sensayAPI.handlePropertyValuation(message, property);
              break;
            case 'booking':
              aiResponse = await sensayAPI.handleViewingBooking(message, userProfile);
              break;
            case 'faq':
              aiResponse = await sensayAPI.handleFAQ(message);
              break;
            case 'lead_qualification':
              aiResponse = await sensayAPI.handleLeadQualification(userProfile, messages);
              break;
            default:
              aiResponse = await sensayAPI.chat(message, {
                property,
                analysis,
                sessionId: `propguard_${Date.now()}`,
                conversationFlow: currentFlow,
                userProfile,
                context
              });
          }
          
          suggestions = aiResponse.suggestions || [];
          responseData = aiResponse.metadata;
        } catch (sensayError) {
          console.warn('Sensay API failed, falling back to local LLM:', sensayError);
          aiResponse = await handleLocalLLMRequest(message);
          suggestions = aiResponse.suggestions || [];
        }
      } else {
        aiResponse = await handleLocalLLMRequest(message);
        suggestions = aiResponse.suggestions || [];
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse.response,
        timestamp: new Date(),
        suggestions,
        data: responseData,
        confidence: aiResponse.confidence,
        metadata: aiResponse.metadata,
        conversationFlow: currentFlow
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        suggestions: ['Try a different question', 'Switch conversation flow', 'Get help'],
        confidence: 0,
        conversationFlow: currentFlow
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalLLMRequest = async (message: string): Promise<SensayResponse> => {
    const context = { property, analysis, timestamp: new Date().toISOString(), conversationFlow: currentFlow };
    
    try {
      if (message.toLowerCase().includes('risk') || message.toLowerCase().includes('assess')) {
        const riskAssessment = await llmAPI.getRiskAssessment(context);
        return {
          response: (riskAssessment as any)?.explanation || 'I\'ve analyzed the risk factors for this property.',
          confidence: 85,
          suggestions: ['Show detailed risk breakdown', 'Compare with market averages', 'Generate risk mitigation plan']
        };
      } else if (message.toLowerCase().includes('market') || message.toLowerCase().includes('trend')) {
        const marketSentiment = await llmAPI.getMarketSentiment(context);
        return {
          response: `Based on current market analysis: ${(marketSentiment as any)?.summary || 'Market conditions appear favorable.'}`,
          confidence: 80,
          suggestions: ['Show market comparisons', 'Analyze price trends', 'Forecast future performance']
        };
      } else if (message.toLowerCase().includes('valuation') || message.toLowerCase().includes('worth')) {
        const comprehensive = await llmAPI.getComprehensiveAnalysis(context);
        return {
          response: (comprehensive as any)?.analysis_summary || 'I\'ve conducted a comprehensive property analysis.',
          confidence: 88,
          suggestions: ['Generate detailed report', 'Show investment metrics', 'Compare with benchmarks']
        };
      } else {
        const chatResponse = await llmAPI.getChatResponse(message, context);
        return {
          response: (chatResponse as any)?.response || 'I understand your question about property analysis.',
          confidence: 75,
          suggestions: ['Tell me about market conditions', 'What are the investment risks?', 'Generate a detailed report']
        };
      }
    } catch (error) {
      return {
        response: 'I understand your question about property analysis. Let me help you with specific insights about this property or market conditions.',
        confidence: 70,
        suggestions: ['Ask about property risks', 'Request market analysis', 'Get valuation insights']
      };
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleFlowChange = (newFlow: string) => {
    setCurrentFlow(newFlow as any);
    // Clear messages and show new welcome message
    setMessages([]);
  };

  const getStatusBadge = () => {
    if (sensayStatus === 'connected') {
      return (
        <Badge variant="default" className="ml-auto">
          <Sparkles className="h-3 w-3 mr-1" />
          Sensay Powered
        </Badge>
      );
    } else if (sensayStatus === 'disconnected') {
      return (
        <Badge variant="secondary" className="ml-auto">
          <AlertCircle className="h-3 w-3 mr-1" />
          Local Mode
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="ml-auto">
          <Settings className="h-3 w-3 mr-1 animate-spin" />
          Checking...
        </Badge>
      );
    }
  };

  const getFlowIcon = (flow: string) => {
    switch (flow) {
      case 'property_search': return <Search className="h-4 w-4" />;
      case 'valuation': return <Calculator className="h-4 w-4" />;
      case 'booking': return <Calendar className="h-4 w-4" />;
      case 'faq': return <HelpCircle className="h-4 w-4" />;
      case 'lead_qualification': return <Users className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getFlowTitle = (flow: string) => {
    switch (flow) {
      case 'property_search': return 'Property Search';
      case 'valuation': return 'Property Valuation';
      case 'booking': return 'Viewing Booking';
      case 'faq': return 'FAQ & Support';
      case 'lead_qualification': return 'Lead Qualification';
      default: return 'General Chat';
    }
  };

  const getContextTitle = () => {
    switch (context) {
      case 'dashboard': return 'Dashboard Assistant';
      case 'risk-analysis': return 'Risk Analysis Assistant';
      case 'blockchain': return 'Blockchain Assistant';
      case 'compliance': return 'Compliance Assistant';
      case 'reports': return 'Reports Assistant';
      case 'pricing': return 'Pricing Assistant';
      case 'property-search': return 'Search Assistant';
      default: return 'AI Assistant';
    }
  };

  return (
    <Card className={`flex flex-col h-[700px] ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {getContextTitle()}
          {getStatusBadge()}
        </CardTitle>
        
        {/* Conversation Flow Tabs */}
        <Tabs value={currentFlow} onValueChange={handleFlowChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="property_search" className="flex items-center gap-1 text-xs">
              <Search className="h-3 w-3" />
              Search
            </TabsTrigger>
            <TabsTrigger value="valuation" className="flex items-center gap-1 text-xs">
              <Calculator className="h-3 w-3" />
              Valuation
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              Booking
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-1 text-xs">
              <HelpCircle className="h-3 w-3" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="lead_qualification" className="flex items-center gap-1 text-xs">
              <Users className="h-3 w-3" />
              Leads
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {apiKeyStatus === 'missing' && (
          <Alert className="mt-2">
            <Key className="h-4 w-4" />
            <AlertDescription>
              Sensay API key not configured. <Button variant="link" size="sm" className="p-0 h-auto">Set up API key</Button> for enhanced AI capabilities.
            </AlertDescription>
          </Alert>
        )}

        {/* Language Detection */}
        {detectedLanguage !== 'en' && (
          <Alert className="mt-2">
            <Globe className="h-4 w-4" />
            <AlertDescription>
              Detected language: {detectedLanguage.toUpperCase()}. Multilingual support enabled.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4 h-[400px] overflow-hidden" ref={scrollAreaRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div key={message.id} className="space-y-2">
                <div className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}>
                  <div className={`p-2 rounded-full ${
                    message.type === 'user' 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className={`flex-1 space-y-2 ${
                    message.type === 'user' ? 'text-right' : ''
                  }`}>
                    <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      {message.confidence && message.type === 'assistant' && (
                        <div className="text-xs opacity-70 mt-2">
                          Confidence: {message.confidence}%
                          {message.metadata?.model && ` • ${message.metadata.model}`}
                          {message.conversationFlow && ` • ${getFlowTitle(message.conversationFlow)}`}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </div>

                    {message.suggestions && message.type === 'assistant' && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-xs h-7"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-muted">
                  <Bot className="h-4 w-4 text-muted-foreground animate-pulse" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      {sensayStatus === 'connected' ? 'Sensay AI analyzing...' : 'Analyzing...'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask me about ${getFlowTitle(currentFlow).toLowerCase()}...`}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(inputValue);
                }
              }}
              disabled={isLoading}
            />
            <Button
              onClick={() => handleSendMessage(inputValue)}
              disabled={isLoading || !inputValue.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2 flex items-center justify-between">
            <span>
              {sensayStatus === 'connected' 
                ? 'Powered by Sensay Wisdom Engine' 
                : 'Using local AI analysis'
              }
            </span>
            <span className="flex items-center gap-1">
              {getFlowIcon(currentFlow)}
              {getFlowTitle(currentFlow)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
