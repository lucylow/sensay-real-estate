import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Home, 
  Shield, 
  Zap,
  Globe
} from 'lucide-react';
import { 
  mockPropertyListings, 
  mockConversationFlows 
} from '@/data/sensayRealEstateMockData';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'property_card';
  data?: any;
}

interface SensayChatbotDemoProps {
  className?: string;
}

export const SensayChatbotDemo: React.FC<SensayChatbotDemoProps> = ({
  className = ''
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const predefinedQueries = [
    "Find homes in San Francisco under $1M",
    "What's the Austin market like?", 
    "Show me high PropGuard score properties",
    "I want to sell my property",
    "¿Cuánto vale mi casa?",
    "Schedule a viewing"
  ];

  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      content: mockConversationFlows.buyerJourney.greeting.responses[0],
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    };
    setMessages([welcomeMessage]);
  }, []);

  const simulateBotResponse = async (userMessage: string): Promise<Message> => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    let response = '';
    let messageType: 'text' | 'property_card' = 'text';
    let data: any = null;

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('property') || lowerMessage.includes('home') || lowerMessage.includes('house')) {
      const property = mockPropertyListings[0];
      response = `🏠 **${property.address}**\n💰 $${property.listingPrice.toLocaleString()}\n📊 PropGuard Score: ${property.propguardRiskAnalysis.overallRiskScore}/10\n🛏️ ${property.bedrooms} bed, ${property.bathrooms} bath\n\n✨ **Key Features:**\n• ${property.propguardRiskAnalysis.investmentGrade} investment grade\n• ${property.marketInsights.marketTrend} market trend\n• Ocean views & smart home features`;
      messageType = 'property_card';
      data = property;
    } else if (lowerMessage.includes('market')) {
      response = `📊 **Live Market Intelligence**\n\n**San Francisco:** $1.65M median (+4.7%)\n**Austin:** $485K median (+3.2%)\n**Miami:** $545K median (+1.8%)\n\n🔥 Seller's market conditions\n📈 Inventory at historic lows\n⚡ PropGuard AI tracking 50K+ properties\n\nNeed specific area analysis?`;
    } else if (lowerMessage.includes('sell') || lowerMessage.includes('vale')) {
      response = `🏡 **Instant AI Valuation**\n\n📍 Your Property Analysis:\n💰 Estimated Value: $875,000\n📊 Confidence: 94%\n📈 Market Position: Strong\n⚠️ Risk Score: 8.5/10\n\n**Market Insights:**\n• 25 days avg. time on market\n• Rising neighborhood trend\n• Low environmental risk\n\nSchedule professional CMA?`;
    } else if (lowerMessage.includes('spanish') || lowerMessage.includes('hola')) {
      response = `¡Hola! 👋 Perfecto - hablo español fluido.\n\n🏠 **Puedo ayudarte con:**\n• Buscar propiedades ideales\n• Valuación instantánea AI\n• Análisis de riesgo PropGuard\n• Agendar visitas virtuales\n\n¿Qué necesitas hoy? ¡Estoy aquí para ayudarte!`;
    } else {
      response = `I'm your PropGuard AI assistant! 🤖✨\n\n**What I can help with:**\n🏠 Smart property search\n💰 Instant AI valuations\n📊 Risk analysis & market insights\n📅 Schedule virtual/in-person tours\n🌍 Support in 4+ languages\n⚡ Real-time market intelligence\n\nWhat interests you most?`;
    }

    setIsTyping(false);
    
    return {
      id: Date.now().toString(),
      content: response,
      sender: 'bot',
      timestamp: new Date(),
      type: messageType,
      data
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    const botResponse = await simulateBotResponse(inputMessage);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleQuickReply = async (query: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    const botResponse = await simulateBotResponse(query);
    setMessages(prev => [...prev, botResponse]);
  };

  const renderMessage = (message: Message) => {
    if (message.sender === 'user') {
      return (
        <div key={message.id} className="flex justify-end mb-4">
          <div className="bg-blue-600 text-white p-3 rounded-lg max-w-md">
            <p className="text-sm">{message.content}</p>
            <span className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div key={message.id} className="flex items-start mb-4">
        <Avatar className="w-8 h-8 mr-3">
          <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
        </Avatar>
        <div className="bg-gray-100 p-3 rounded-lg max-w-md flex-1">
          {message.type === 'property_card' && message.data ? (
            <div className="space-y-2">
              <div className="aspect-video rounded overflow-hidden mb-2">
                <img 
                  src={message.data.images[0]} 
                  alt="Property"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-green-600">
                  Score: {message.data.propguardRiskAnalysis.overallRiskScore}/10
                </Badge>
                <Badge variant="secondary">
                  {message.data.propguardRiskAnalysis.investmentGrade}
                </Badge>
              </div>
              <Button 
                size="sm" 
                className="w-full"
                onClick={() => handleQuickReply('Schedule tour for this property')}
              >
                Schedule Tour
              </Button>
            </div>
          ) : (
            <p className="text-sm whitespace-pre-line">{message.content}</p>
          )}
          <span className="text-xs text-gray-500 mt-2 block">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col h-screen max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold">PropGuard AI Assistant</h1>
            </div>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              Powered by Sensay
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Risk Analysis Active</span>
            <Globe className="h-4 w-4 ml-4" />
            <span>4 Languages</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            {messages.map(renderMessage)}
            {isTyping && (
              <div className="flex items-start mb-4">
                <Avatar className="w-8 h-8 mr-3">
                  <AvatarFallback className="bg-blue-100 text-blue-600">AI</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="mb-4 flex flex-wrap gap-2">
              {predefinedQueries.slice(0, 3).map((query, index) => (
                <Button 
                  key={index}
                  variant="outline" 
                  size="sm"
                  onClick={() => handleQuickReply(query)}
                  className="text-xs"
                >
                  {query}
                </Button>
              ))}
            </div>
            
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about properties, market trends, or schedule viewings..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-72 border-l bg-gray-50 p-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">PropGuard AI Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Risk Analysis</span>
                <Badge variant="outline" className="text-xs">Live</Badge>
              </div>
              <div className="flex justify-between">
                <span>Market Intelligence</span>
                <Badge variant="outline" className="text-xs">Real-time</Badge>
              </div>
              <div className="flex justify-between">
                <span>AI Valuation</span>
                <Badge variant="outline" className="text-xs">94% Accurate</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Featured Properties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockPropertyListings.slice(0, 2).map((property) => (
                <div key={property.id} className="p-2 border rounded text-xs">
                  <p className="font-medium">{property.city}, {property.state}</p>
                  <p className="text-gray-600">${property.listingPrice.toLocaleString()}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    Score: {property.propguardRiskAnalysis.overallRiskScore}/10
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 px-4 py-2 border-t">
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              System Online
            </span>
            <span>Response Time: 1.8s</span>
            <span>Accuracy: 94%</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-3 w-3" />
            <span>Multi-Platform Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
