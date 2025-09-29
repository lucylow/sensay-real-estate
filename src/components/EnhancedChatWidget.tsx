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
  Maximize2
} from 'lucide-react';
import { MultimodalAIAssistant } from './MultimodalAIAssistant';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    leadScore?: number;
    propertyMatches?: any[];
    quickActions?: QuickAction[];
    isTyping?: boolean;
  };
}

interface QuickAction {
  id: string;
  label: string;
  action: string;
  icon?: React.ReactNode;
}

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  budget: { min: number; max: number };
  locations: string[];
  propertyType: string;
  timeline: string;
  qualificationScore: number;
  status: 'new' | 'qualified' | 'contacted' | 'scheduled' | 'converted';
}

interface PropertyMatch {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  image: string;
  matchScore: number;
  riskScore: number;
  features: string[];
}

export const EnhancedChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hi! I'm Alex, your AI-powered real estate assistant. I can help you find properties, get valuations, schedule viewings, and answer any real estate questions. How can I assist you today?",
      timestamp: new Date(),
      metadata: {
        quickActions: [
          { id: 'find-properties', label: 'Find Properties', action: 'find-properties', icon: <Home className="h-4 w-4" /> },
          { id: 'get-valuation', label: 'Get Valuation', action: 'get-valuation', icon: <DollarSign className="h-4 w-4" /> },
          { id: 'schedule-viewing', label: 'Schedule Viewing', action: 'schedule-viewing', icon: <Calendar className="h-4 w-4" /> },
          { id: 'market-analysis', label: 'Market Analysis', action: 'market-analysis', icon: <TrendingUp className="h-4 w-4" /> }
        ]
      }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLead, setCurrentLead] = useState<LeadData | null>(null);
  const [propertyMatches, setPropertyMatches] = useState<PropertyMatch[]>([]);
  const [showMultimodal, setShowMultimodal] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await processUserMessage(message);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        metadata: {
          leadScore: response.leadScore,
          propertyMatches: response.propertyMatches,
          quickActions: response.quickActions
        }
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Update lead data if provided
      if (response.leadData) {
        setCurrentLead(response.leadData);
      }

      // Update property matches if provided
      if (response.propertyMatches) {
        setPropertyMatches(response.propertyMatches);
      }

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
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

  const processUserMessage = async (message: string): Promise<any> => {
    // Simulate AI processing based on message content
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('looking for') || lowerMessage.includes('find') || lowerMessage.includes('property')) {
      return {
        content: "Great! I'd be happy to help you find properties. To provide the best matches, could you tell me:\n\n• Your budget range\n• Preferred locations\n• Property type (house, apartment, etc.)\n• Timeline for purchase\n• Number of bedrooms/bathrooms needed",
        leadScore: 75,
        quickActions: [
          { id: 'budget-500k', label: 'Under $500K', action: 'set-budget-500k' },
          { id: 'budget-1m', label: '$500K - $1M', action: 'set-budget-1m' },
          { id: 'budget-2m', label: '$1M - $2M', action: 'set-budget-2m' },
          { id: 'budget-2m+', label: 'Over $2M', action: 'set-budget-2m+' }
        ]
      };
    }

    if (lowerMessage.includes('valuation') || lowerMessage.includes('worth') || lowerMessage.includes('value')) {
      return {
        content: "I can help you get an instant property valuation using PropGuard AI's advanced analytics. Please provide the property address or I can analyze a property you're interested in.",
        quickActions: [
          { id: 'valuation-form', label: 'Enter Address', action: 'valuation-form' },
          { id: 'valuation-upload', label: 'Upload Details', action: 'valuation-upload' }
        ]
      };
    }

    if (lowerMessage.includes('schedule') || lowerMessage.includes('viewing') || lowerMessage.includes('tour')) {
      return {
        content: "I can help you schedule property viewings! I'll find available time slots and coordinate with the property owner. Which property would you like to view?",
        quickActions: [
          { id: 'select-property', label: 'Select Property', action: 'select-property' },
          { id: 'virtual-tour', label: 'Virtual Tour', action: 'virtual-tour' }
        ]
      };
    }

    if (lowerMessage.includes('market') || lowerMessage.includes('trends') || lowerMessage.includes('analysis')) {
      return {
        content: "I can provide comprehensive market analysis for any area! This includes price trends, inventory levels, neighborhood insights, and investment potential. Which location interests you?",
        quickActions: [
          { id: 'market-sf', label: 'San Francisco', action: 'market-sf' },
          { id: 'market-la', label: 'Los Angeles', action: 'market-la' },
          { id: 'market-sd', label: 'San Diego', action: 'market-sd' }
        ]
      };
    }

    // Default response
    return {
      content: "I understand you're interested in real estate. I can help you with property search, valuations, market analysis, scheduling viewings, and more. What would you like to explore?",
      quickActions: [
        { id: 'find-properties', label: 'Find Properties', action: 'find-properties', icon: <Home className="h-4 w-4" /> },
        { id: 'get-valuation', label: 'Get Valuation', action: 'get-valuation', icon: <DollarSign className="h-4 w-4" /> },
        { id: 'market-analysis', label: 'Market Analysis', action: 'market-analysis', icon: <TrendingUp className="h-4 w-4" /> }
      ]
    };
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      'find-properties': 'I\'m looking for properties in my area',
      'get-valuation': 'I need a property valuation',
      'schedule-viewing': 'I\'d like to schedule a property viewing',
      'market-analysis': 'Show me market analysis for my area',
      'set-budget-500k': 'My budget is under $500,000',
      'set-budget-1m': 'My budget is $500,000 to $1,000,000',
      'set-budget-2m': 'My budget is $1,000,000 to $2,000,000',
      'set-budget-2m+': 'My budget is over $2,000,000'
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
          className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          1
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96">
      <Card className={`shadow-2xl border-2 ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
        <CardHeader className="pb-2 bg-primary text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/alex.jpg" />
                <AvatarFallback>AX</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">Alex - PropGuard AI</CardTitle>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMinimize}
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleWidget}
                className="h-6 w-6 p-0 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            {/* Lead Status Bar */}
            {currentLead && (
              <div className="p-3 bg-muted border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{currentLead.name}</span>
                    <Badge variant={currentLead.qualificationScore > 70 ? "default" : "secondary"}>
                      Score: {currentLead.qualificationScore}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {currentLead.status}
                  </div>
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[400px] overflow-hidden" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <Avatar className="h-6 w-6">
                        {message.type === 'user' ? (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <User className="h-3 w-3" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback className="bg-muted">
                            <Bot className="h-3 w-3" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <div className={`rounded-lg px-3 py-2 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
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
                        
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-muted">
                          <Bot className="h-3 w-3" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Loader2 className="h-3 w-3 animate-spin" />
                          Alex is typing...
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Property Matches */}
            {propertyMatches.length > 0 && (
              <div className="p-3 border-t bg-muted/50">
                <div className="text-xs font-medium mb-2">Property Matches:</div>
                <div className="space-y-2">
                  {propertyMatches.slice(0, 2).map((property) => (
                    <div key={property.id} className="flex items-center gap-2 p-2 bg-background rounded border">
                      <div className="w-8 h-8 bg-muted rounded"></div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{property.address}</div>
                        <div className="text-xs text-muted-foreground">
                          ${property.price.toLocaleString()} • {property.bedrooms}bd {property.bathrooms}ba
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {property.matchScore}% match
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Alex about properties, valuations, or market trends..."
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
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="text-xs text-muted-foreground">
                  Powered by PropGuard AI
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMultimodal(true)}
                  className="text-xs h-6"
                >
                  Video Chat
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Multimodal Modal */}
      {showMultimodal && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Alex - Multimodal AI Assistant</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setShowMultimodal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="h-full">
              <MultimodalAIAssistant
                className="h-full"
                persona="alex"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EnhancedChatWidget;