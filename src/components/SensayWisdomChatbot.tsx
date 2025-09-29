import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  Mic, 
  Video, 
  Send, 
  Loader2, 
  User, 
  Bot,
  Zap,
  TrendingUp,
  Shield,
  FileText,
  Globe,
  MessageSquare,
  BarChart3,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'voice' | 'video' | 'analysis';
  features?: string[];
}

interface SensayWisdomChatbotProps {
  className?: string;
}

export const SensayWisdomChatbot: React.FC<SensayWisdomChatbotProps> = ({ className = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    setMessages([
      {
        id: '1',
        content: "Hello! I'm your Sensay Wisdom AI assistant, powered by the advanced Wisdom Engine. I can help you with property analysis, market intelligence, risk assessment, and investment insights. What would you like to explore today?",
        role: 'assistant',
        timestamp: new Date(),
        type: 'text',
        features: ['Enhanced AI', 'Market Intelligence', 'Risk Assessment', 'Smart Reports']
      }
    ]);
  }, []);

  const wisdomFeatures = [
    {
      id: 'enhanced-ai',
      name: 'Enhanced AI',
      icon: <Brain className="h-4 w-4" />,
      description: 'Advanced conversation engine',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'market-intelligence',
      name: 'Market Intelligence',
      icon: <TrendingUp className="h-4 w-4" />,
      description: 'Real-time market analysis',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment',
      icon: <Shield className="h-4 w-4" />,
      description: 'Comprehensive risk analysis',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'smart-reports',
      name: 'Smart Reports',
      icon: <FileText className="h-4 w-4" />,
      description: 'Automated report generation',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'voice-audio',
      name: 'Voice & Audio',
      icon: <Mic className="h-4 w-4" />,
      description: 'Speech recognition & synthesis',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'video-avatars',
      name: 'Video Avatars',
      icon: <Video className="h-4 w-4" />,
      description: 'AI-powered video presentations',
      color: 'bg-pink-100 text-pink-800'
    }
  ];

  const generateWisdomResponse = async (userMessage: string): Promise<Message> => {
    // Simulate AI processing with Sensay Wisdom Engine
    await new Promise(resolve => setTimeout(resolve, 1500));

    const responses = {
      'property analysis': {
        content: "I've analyzed the property using Sensay's advanced AI algorithms. Here's what I found:\n\n📊 **Market Analysis**: Current market value estimated at $850K with 12% annual growth potential\n🏠 **Property Features**: 4BR/3BA, 2,400 sq ft, premium location\n⚠️ **Risk Assessment**: Low environmental risk, moderate market volatility\n💡 **Investment Insight**: Strong rental yield potential at 6.2%\n\nWould you like me to generate a detailed report or explore specific aspects?",
        features: ['Enhanced AI', 'Market Intelligence', 'Risk Assessment', 'Smart Reports']
      },
      'market trends': {
        content: "Based on real-time market data and Sensay's predictive analytics:\n\n📈 **Current Trends**: Market showing 8.5% YoY growth\n🏘️ **Hot Areas**: Downtown district up 15%, waterfront properties +22%\n💰 **Price Predictions**: Expected 10-12% increase over next 12 months\n🎯 **Investment Opportunities**: Emerging neighborhoods with 20%+ potential\n\nI can provide detailed neighborhood analysis or investment recommendations.",
        features: ['Market Intelligence', 'Enhanced AI', 'Smart Reports']
      },
      'risk assessment': {
        content: "Comprehensive risk analysis completed using Sensay's advanced algorithms:\n\n🌊 **Environmental Risks**: Low flood risk (Zone X), moderate earthquake exposure\n🔥 **Fire Risk**: Minimal wildfire risk, good emergency access\n📉 **Market Volatility**: Moderate risk, diversified local economy\n💼 **Financial Analysis**: Strong rental demand, stable cash flow potential\n\n**Mitigation Strategies**: Insurance coverage, emergency fund, market diversification\n\nWould you like specific risk mitigation recommendations?",
        features: ['Risk Assessment', 'Enhanced AI', 'Smart Reports']
      },
      'investment advice': {
        content: "Investment analysis powered by Sensay's Wisdom Engine:\n\n🎯 **ROI Projection**: 12-15% annual return potential\n📊 **Cash Flow**: Positive cash flow from day 1\n🏗️ **Development Potential**: Upzoning opportunities in 2-3 years\n💎 **Value Add**: Cosmetic improvements could increase value by 20%\n\n**Recommendation**: Strong buy for long-term investors\n**Timeline**: Optimal purchase window next 3-6 months\n\nShall I prepare a detailed investment report with financial projections?",
        features: ['Market Intelligence', 'Risk Assessment', 'Smart Reports', 'Enhanced AI']
      },
      'voice': {
        content: "🎤 Voice features activated! I can now process speech input and respond with natural-sounding speech using Sensay's advanced TTS technology.\n\n**Available Voice Features**:\n• Real-time speech recognition\n• 8 realistic voice options\n• Multi-language support\n• Voice cloning capabilities\n\nTry speaking your next question - I'll respond with voice!",
        features: ['Voice & Audio', 'Enhanced AI']
      },
      'video': {
        content: "🎥 Video avatar activated! I can now provide visual presentations using Sensay's advanced video AI technology.\n\n**Video Capabilities**:\n• Realistic avatar generation\n• Lip-sync technology\n• Gesture and expression control\n• Custom avatar creation\n\nI'm now appearing as your AI real estate consultant!",
        features: ['Video Avatars', 'Enhanced AI']
      },
      'report': {
        content: "📋 Generating comprehensive property analysis report using Sensay's Smart Reports feature...\n\n**Report Contents**:\n• Executive Summary\n• Market Analysis & Trends\n• Risk Assessment Matrix\n• Investment Recommendations\n• Financial Projections\n• Visual Analytics & Charts\n\nReport will be ready in 30 seconds. Would you like it exported as PDF or shared via email?",
        features: ['Smart Reports', 'Enhanced AI', 'Market Intelligence', 'Risk Assessment']
      }
    };

    const lowerMessage = userMessage.toLowerCase();
    let response = responses['property analysis']; // default

    if (lowerMessage.includes('market') || lowerMessage.includes('trend')) {
      response = responses['market trends'];
    } else if (lowerMessage.includes('risk') || lowerMessage.includes('safe')) {
      response = responses['risk assessment'];
    } else if (lowerMessage.includes('invest') || lowerMessage.includes('buy')) {
      response = responses['investment advice'];
    } else if (lowerMessage.includes('voice') || lowerMessage.includes('speak')) {
      response = responses['voice'];
    } else if (lowerMessage.includes('video') || lowerMessage.includes('avatar')) {
      response = responses['video'];
    } else if (lowerMessage.includes('report') || lowerMessage.includes('analysis')) {
      response = responses['report'];
    }

    return {
      id: Date.now().toString(),
      content: response.content,
      role: 'assistant',
      timestamp: new Date(),
      type: 'analysis',
      features: response.features
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateWisdomResponse(input);
      setMessages(prev => [...prev, response]);
      setActiveFeatures(response.features || []);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoice = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would start/stop voice recording
  };

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Sensay Wisdom Engine</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    Organization ID: E0b1218c-e817-4994-a45b-43e092bd6d4b
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVoice}
                className={isRecording ? 'bg-red-100 text-red-600' : ''}
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={toggleVideo}
                className={showVideo ? 'bg-blue-100 text-blue-600' : ''}
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Active Features */}
      {activeFeatures.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600 mr-2">Active Features:</span>
            {activeFeatures.map((feature, index) => {
              const featureData = wisdomFeatures.find(f => f.name === feature);
              return featureData ? (
                <Badge key={index} className={`${featureData.color} text-xs`}>
                  {featureData.icon}
                  <span className="ml-1">{featureData.name}</span>
                </Badge>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Messages */}
      <Card className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4 h-[500px] overflow-hidden">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <div className="flex items-center space-x-1">
                        <Bot className="h-4 w-4" />
                        {message.features && (
                          <Sparkles className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                    )}
                    <span className="text-xs opacity-70">
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap text-sm">
                    {message.content}
                  </div>
                  {message.features && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Sensay Wisdom is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about property analysis, market trends, risk assessment..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Analyze this property for investment potential")}
              disabled={isLoading}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Investment Analysis
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("What are the current market trends?")}
              disabled={isLoading}
            >
              <BarChart3 className="h-3 w-3 mr-1" />
              Market Trends
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Assess the risks for this property")}
              disabled={isLoading}
            >
              <Shield className="h-3 w-3 mr-1" />
              Risk Assessment
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput("Generate a comprehensive property report")}
              disabled={isLoading}
            >
              <FileText className="h-3 w-3 mr-1" />
              Smart Report
            </Button>
          </div>
        </div>
      </Card>

      {/* Video Avatar Overlay */}
      {showVideo && (
        <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-blue-500 flex items-center justify-center">
          <div className="text-center text-white">
            <Video className="h-8 w-8 mx-auto mb-2" />
            <p className="text-xs">Sensay Video Avatar</p>
            <p className="text-xs opacity-70">AI Real Estate Consultant</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SensayWisdomChatbot;
