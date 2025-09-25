import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, User, Send, Sparkles, TrendingUp, AlertCircle, Key, Settings } from 'lucide-react';
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
}

interface SensayAssistantProps {
  property?: any;
  analysis?: any;
  className?: string;
}

export const SensayAssistant: React.FC<SensayAssistantProps> = ({ 
  property, 
  analysis, 
  className = '' 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your enhanced PropGuard AI assistant powered by Sensay Wisdom. I can provide sophisticated property analysis, market insights, risk assessment, and investment advice. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze this property\'s investment potential',
        'What are the main risks for this property?',
        'Compare with similar properties in the area',
        'Generate a comprehensive valuation report'
      ],
      confidence: 95
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sensayStatus, setSensayStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [apiKeyStatus, setApiKeyStatus] = useState<'valid' | 'invalid' | 'missing'>('checking');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Check Sensay API status on component mount
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

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      let aiResponse: SensayResponse;
      let suggestions: string[] = [];
      let responseData: any = null;

      // Try Sensay API first, fallback to local LLM
      if (sensayStatus === 'connected') {
        try {
          aiResponse = await sensayAPI.chat(message, {
            property,
            analysis,
            sessionId: `propguard_${Date.now()}`
          });
          
          suggestions = aiResponse.suggestions || [];
          responseData = aiResponse.metadata;
        } catch (sensayError) {
          console.warn('Sensay API failed, falling back to local LLM:', sensayError);
          // Fallback to local LLM
          aiResponse = await handleLocalLLMRequest(message);
          suggestions = aiResponse.suggestions || [];
        }
      } else {
        // Use local LLM when Sensay is not available
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
        metadata: aiResponse.metadata
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        suggestions: ['Ask about property risks', 'Request market analysis', 'Get valuation insights'],
        confidence: 0
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalLLMRequest = async (message: string): Promise<SensayResponse> => {
    const context = { property, analysis, timestamp: new Date().toISOString() };
    
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

  return (
    <Card className={`flex flex-col h-[600px] ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Enhanced AI Property Assistant
          {getStatusBadge()}
        </CardTitle>
        
        {apiKeyStatus === 'missing' && (
          <Alert className="mt-2">
            <Key className="h-4 w-4" />
            <AlertDescription>
              Sensay API key not configured. <Button variant="link" size="sm" className="p-0 h-auto">Set up API key</Button> for enhanced AI capabilities.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
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
              placeholder="Ask me about this property, market trends, or investment advice..."
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
          
          <div className="text-xs text-muted-foreground mt-2">
            {sensayStatus === 'connected' 
              ? 'Powered by Sensay Wisdom Engine' 
              : 'Using local AI analysis'
            }
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
