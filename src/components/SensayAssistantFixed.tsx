/**
 * Fixed Sensay Assistant Component
 * Simplified version that handles missing dependencies gracefully
 */

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Bot, User, Send, Sparkles, TrendingUp, AlertCircle, Key, Settings } from 'lucide-react';

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

export const SensayAssistantFixed: React.FC<SensayAssistantProps> = ({ 
  property, 
  analysis,
  className = '' 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your Sensay AI assistant. I can help you with property analysis, market insights, and investment advice. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'Analyze this property',
        'Market trends in Melbourne',
        'Investment opportunities',
        'Risk assessment'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Mock API function
  const mockSensayResponse = async (query: string): Promise<any> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on query content
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('property') || lowerQuery.includes('analyze')) {
      return {
        response: 'Based on my analysis, this property shows strong investment potential with a projected return of 8.5% annually. The location is in a high-growth area with excellent infrastructure development.',
        confidence: 0.89,
        suggestions: ['Get detailed valuation', 'View market comparison', 'Check risk factors'],
        metadata: {
          valuation: '$850,000',
          confidence: 'High',
          risk_level: 'Low'
        }
      };
    } else if (lowerQuery.includes('market') || lowerQuery.includes('trend')) {
      return {
        response: 'The Melbourne property market is showing strong growth with prices increasing 8.5% year-over-year. Inventory levels are low, indicating continued upward pressure on prices.',
        confidence: 0.92,
        suggestions: ['View detailed market report', 'Compare with other cities', 'Get investment recommendations'],
        metadata: {
          growth_rate: '8.5%',
          inventory_level: 'Low',
          market_sentiment: 'Positive'
        }
      };
    } else if (lowerQuery.includes('investment') || lowerQuery.includes('opportunity')) {
      return {
        response: 'I\'ve identified several high-potential investment opportunities in Melbourne\'s inner suburbs. Properties near new infrastructure projects show the strongest growth potential.',
        confidence: 0.85,
        suggestions: ['View investment portfolio', 'Get risk assessment', 'Schedule consultation'],
        metadata: {
          opportunities: 12,
          avg_return: '9.2%',
          risk_level: 'Medium'
        }
      };
    } else if (lowerQuery.includes('risk') || lowerQuery.includes('assessment')) {
      return {
        response: 'The risk assessment shows low environmental risk, moderate market risk, and high liquidity. Overall risk score is 2.3/10, indicating a very safe investment.',
        confidence: 0.88,
        suggestions: ['View detailed risk report', 'Compare risk factors', 'Get mitigation strategies'],
        metadata: {
          overall_risk: '2.3/10',
          environmental: 'Low',
          market: 'Moderate'
        }
      };
    } else {
      return {
        response: 'I understand your question. Let me provide you with comprehensive insights about real estate investment and market analysis. How can I help you further?',
        confidence: 0.75,
        suggestions: ['Property analysis', 'Market trends', 'Investment advice', 'Risk assessment'],
        metadata: {}
      };
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
      const response = await mockSensayResponse(message);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.response,
        timestamp: new Date(),
        suggestions: response.suggestions,
        data: response.metadata,
        confidence: response.confidence
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <Card className={`flex flex-col h-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Sensay AI Assistant
            <Badge variant="outline" className="text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={isConfigured ? "default" : "secondary"} className="text-xs">
              {isConfigured ? 'Connected' : 'Demo Mode'}
            </Badge>
          </div>
        </div>
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
                    <div className={`inline-block p-3 rounded-lg max-w-[85%] ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}>
                      <div className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </div>
                      
                      {message.confidence && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Confidence: {(message.confidence * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                    
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {message.data && Object.keys(message.data).length > 0 && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-xs">
                        <div className="font-medium mb-1">Data:</div>
                        {Object.entries(message.data).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-muted-foreground">{key}:</span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
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
                      Analyzing your request...
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
              placeholder="Ask me about properties, market trends, or investment advice..."
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SensayAssistantFixed;
