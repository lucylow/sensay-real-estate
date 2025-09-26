import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Home, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Globe,
  Zap
} from 'lucide-react';
import { SensayAPI } from '@/services/api/sensay';
import { usePropertyAnalysis } from '@/hooks/usePropertyAnalysis';

interface LeadData {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  budgetRange?: { min: number; max: number };
  preferredLocations?: string[];
  propertyTypes?: string[];
  timeline?: string;
  financingStatus?: string;
  leadScore: number;
  status: 'new' | 'qualified' | 'contacted' | 'appointment_scheduled' | 'converted' | 'lost';
  interactions: Array<{
    timestamp: Date;
    message: string;
    response: string;
    channel: string;
    intent: string;
  }>;
  lastContact?: Date;
  nextFollowup?: Date;
}

interface PropertyRecommendation {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  image: string;
  personalizationScore: number;
  matchPercentage: number;
  features: string[];
  riskAssessment?: {
    score: number;
    factors: string[];
  };
}

interface ConversationMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    intent?: string;
    entities?: any;
    confidence?: number;
    actions?: string[];
  };
}

const SensayRealEstateChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [propertyRecommendations, setPropertyRecommendations] = useState<PropertyRecommendation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [conversationId, setConversationId] = useState<string>('');
  
  const sensayAPI = useRef(new SensayAPI());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { analyzeProperty } = usePropertyAnalysis();

  // Initialize conversation
  useEffect(() => {
    const initConversation = async () => {
      try {
        const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setConversationId(id);
        
        // Add welcome message
        const welcomeMessage: ConversationMessage = {
          id: `msg_${Date.now()}`,
          type: 'assistant',
          content: getWelcomeMessage(),
          timestamp: new Date(),
          metadata: {
            intent: 'greeting',
            confidence: 1.0,
            actions: ['find_properties', 'get_valuation', 'schedule_viewing', 'ask_questions']
          }
        };
        
        setConversationHistory([welcomeMessage]);
      } catch (error) {
        console.error('Failed to initialize conversation:', error);
      }
    };

    initConversation();
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory]);

  const getWelcomeMessage = (): string => {
    const messages = {
      en: `Hi! I'm your AI real estate assistant powered by PropGuard AI and Sensay. I can help you:

🏠 Find properties matching your needs
📊 Get instant property valuations  
📅 Schedule viewings
💬 Answer questions about buying/selling
🌍 Support multiple languages

What brings you here today?`,
      es: `¡Hola! Soy tu asistente inmobiliario AI impulsado por PropGuard AI y Sensay. Puedo ayudarte con:

🏠 Encontrar propiedades que coincidan con tus necesidades
📊 Obtener valoraciones instantáneas de propiedades
📅 Programar visitas
💬 Responder preguntas sobre compra/venta
🌍 Soporte para múltiples idiomas

¿Qué te trae aquí hoy?`,
      zh: `你好！我是由PropGuard AI和Sensay驱动的AI房地产助手。我可以帮助您：

🏠 找到符合您需求的房产
📊 获得即时房产估值
📅 安排看房
💬 回答买卖相关问题
🌍 支持多种语言

今天是什么风把您吹来了？`
    };
    
    return messages[currentLanguage as keyof typeof messages] || messages.en;
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: ConversationMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setConversationHistory(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      // Process message with Sensay API
      const response = await sensayAPI.current.sendMessage(currentMessage, conversationId);
      
      // Analyze intent and entities
      const intent = response.metadata?.intent || 'general';
      const entities = response.metadata?.entities || {};
      
      // Update lead data based on conversation
      await updateLeadData(userMessage, intent, entities);
      
      // Generate appropriate response
      const assistantResponse = await generateResponse(intent, entities, response);
      
      const assistantMessage: ConversationMessage = {
        id: `msg_${Date.now() + 1}`,
        type: 'assistant',
        content: assistantResponse.content,
        timestamp: new Date(),
        metadata: {
          intent,
          entities,
          confidence: response.confidence,
          actions: assistantResponse.actions
        }
      };

      setConversationHistory(prev => [...prev, assistantMessage]);
      
      // Trigger follow-up actions
      await handleFollowUpActions(intent, entities, assistantResponse.actions);
      
    } catch (error) {
      console.error('Error processing message:', error);
      
      const errorMessage: ConversationMessage = {
        id: `msg_${Date.now() + 1}`,
        type: 'assistant',
        content: 'I apologize, but I encountered an error processing your message. Please try again or contact our support team.',
        timestamp: new Date(),
        metadata: { intent: 'error', confidence: 0 }
      };
      
      setConversationHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateLeadData = async (message: ConversationMessage, intent: string, entities: any) => {
    if (!leadData) {
      // Initialize new lead
      const newLead: LeadData = {
        id: `lead_${Date.now()}`,
        leadScore: 0,
        status: 'new',
        interactions: []
      };
      setLeadData(newLead);
    }

    // Extract information from entities
    const updatedLead = { ...leadData! };
    
    if (entities.budget) {
      updatedLead.budgetRange = entities.budget;
    }
    if (entities.location) {
      updatedLead.preferredLocations = entities.location;
    }
    if (entities.propertyType) {
      updatedLead.propertyTypes = entities.propertyType;
    }
    if (entities.timeline) {
      updatedLead.timeline = entities.timeline;
    }
    if (entities.financing) {
      updatedLead.financingStatus = entities.financing;
    }
    if (entities.email) {
      updatedLead.email = entities.email;
    }
    if (entities.phone) {
      updatedLead.phone = entities.phone;
    }
    if (entities.name) {
      updatedLead.name = entities.name;
    }

    // Add interaction
    updatedLead.interactions.push({
      timestamp: message.timestamp,
      message: message.content,
      response: '',
      channel: 'web',
      intent
    });

    // Calculate lead score
    updatedLead.leadScore = calculateLeadScore(updatedLead, intent);
    
    // Update status based on score
    if (updatedLead.leadScore >= 80) {
      updatedLead.status = 'qualified';
    } else if (updatedLead.leadScore >= 60) {
      updatedLead.status = 'contacted';
    }

    setLeadData(updatedLead);
  };

  const calculateLeadScore = (lead: LeadData, currentIntent: string): number => {
    let score = 0;
    
    // Budget scoring (30% weight)
    if (lead.budgetRange) {
      const avgBudget = (lead.budgetRange.min + lead.budgetRange.max) / 2;
      if (avgBudget > 500000) score += 30;
      else if (avgBudget > 300000) score += 20;
      else score += 10;
    }
    
    // Timeline scoring (25% weight)
    if (lead.timeline) {
      switch (lead.timeline) {
        case 'immediate': score += 25; break;
        case '3_months': score += 20; break;
        case '6_months': score += 15; break;
        case '1_year': score += 10; break;
      }
    }
    
    // Financing scoring (20% weight)
    if (lead.financingStatus) {
      switch (lead.financingStatus) {
        case 'pre_approved': score += 20; break;
        case 'pre_qualified': score += 15; break;
        case 'exploring': score += 10; break;
        case 'not_started': score += 5; break;
      }
    }
    
    // Contact info scoring (15% weight)
    if (lead.email) score += 8;
    if (lead.phone) score += 7;
    
    // Engagement scoring (10% weight)
    const interactionCount = lead.interactions.length;
    if (interactionCount >= 5) score += 10;
    else if (interactionCount >= 3) score += 7;
    else if (interactionCount >= 1) score += 5;
    
    return Math.min(score, 100);
  };

  const generateResponse = async (intent: string, entities: any, sensayResponse: any): Promise<{content: string, actions: string[]}> => {
    const actions: string[] = [];
    let content = sensayResponse.response || '';

    switch (intent) {
      case 'find_properties':
        content = await generatePropertySearchResponse(entities);
        actions.push('show_properties', 'schedule_viewing');
        break;
        
      case 'get_valuation':
        content = await generateValuationResponse(entities);
        actions.push('show_valuation', 'download_report');
        break;
        
      case 'schedule_viewing':
        content = await generateSchedulingResponse(entities);
        actions.push('book_appointment', 'check_availability');
        break;
        
      case 'qualify_lead':
        content = await generateQualificationResponse(entities);
        actions.push('continue_qualification', 'schedule_call');
        break;
        
      case 'ask_questions':
        content = await generateFAQResponse(entities);
        actions.push('show_faq', 'contact_agent');
        break;
        
      default:
        content = sensayResponse.response || 'I understand you\'re looking for real estate assistance. How can I help you today?';
        actions.push('find_properties', 'get_valuation', 'ask_questions');
    }

    return { content, actions };
  };

  const generatePropertySearchResponse = async (entities: any): Promise<string> => {
    try {
      // Search for properties using PropGuard AI
      const searchCriteria = {
        location: entities.location || 'Sydney',
        priceRange: entities.budget || { min: 300000, max: 800000 },
        propertyType: entities.propertyType || 'house',
        bedrooms: entities.bedrooms || 3
      };

      const properties = await searchProperties(searchCriteria);
      setPropertyRecommendations(properties);

      if (properties.length > 0) {
        return `I found ${properties.length} properties that match your criteria! Here are the top recommendations:

🏡 **${properties[0].address}** - $${properties[0].price.toLocaleString()}
✅ ${properties[0].bedrooms} bed, ${properties[0].bathrooms} bath, ${properties[0].squareFeet} sq ft
🎯 ${properties[0].matchPercentage}% match with your preferences

Would you like to see more details or schedule a viewing?`;
      } else {
        return 'I couldn\'t find properties matching your exact criteria, but I can help you refine your search. What specific features are most important to you?';
      }
    } catch (error) {
      return 'I\'m having trouble searching for properties right now. Please try again or contact our support team.';
    }
  };

  const generateValuationResponse = async (entities: any): Promise<string> => {
    try {
      const address = entities.address || entities.location;
      if (!address) {
        return 'I\'d be happy to provide a property valuation! Please provide the property address you\'d like me to analyze.';
      }

      const analysis = await analyzeProperty(address);
      
      return `Here's the valuation analysis for ${address}:

💰 **Estimated Value**: $${analysis.estimatedValue?.toLocaleString() || 'N/A'}
📈 **Market Trend**: ${analysis.marketTrend || 'Stable'}
⚠️ **Risk Factors**: ${analysis.riskFactors?.join(', ') || 'Low risk'}
🏘️ **Neighborhood Score**: ${analysis.neighborhoodScore || 'N/A'}/10

Would you like a detailed report or to schedule a professional appraisal?`;
    } catch (error) {
      return 'I\'m having trouble accessing the valuation data right now. Please try again or contact our support team for assistance.';
    }
  };

  const generateSchedulingResponse = async (entities: any): Promise<string> => {
    const property = entities.property || 'the property';
    const preferredTime = entities.time || 'your preferred time';
    
    return `I can help you schedule a viewing for ${property}! 

📅 **Available Times**:
• Weekdays: 9 AM - 6 PM
• Weekends: 10 AM - 4 PM
• Virtual tours available 24/7

Please let me know your preferred date and time, and I'll check availability. You can also provide your contact information for confirmation.`;
  };

  const generateQualificationResponse = async (entities: any): Promise<string> => {
    const missingInfo = [];
    
    if (!leadData?.budgetRange) missingInfo.push('budget range');
    if (!leadData?.timeline) missingInfo.push('timeline');
    if (!leadData?.financingStatus) missingInfo.push('financing status');
    if (!leadData?.email) missingInfo.push('email address');
    
    if (missingInfo.length === 0) {
      return `Great! I have all the information I need. Based on your preferences, I'll prepare personalized property recommendations and connect you with our best agent for your area.`;
    }
    
    return `To provide you with the best service, I need a bit more information:

❓ **Still needed**:
${missingInfo.map(info => `• ${info}`).join('\n')}

This helps me match you with the perfect properties and agent!`;
  };

  const generateFAQResponse = async (entities: any): Promise<string> => {
    const question = entities.question || 'general';
    
    const faqAnswers: Record<string, string> = {
      'financing': 'We work with multiple lenders to find the best mortgage rates. Our pre-approval process typically takes 24-48 hours.',
      'inspection': 'We recommend professional inspections for all properties. Our network includes certified inspectors with same-day availability.',
      'closing': 'The closing process typically takes 30-45 days. We\'ll guide you through every step and ensure all paperwork is completed correctly.',
      'fees': 'Our commission structure varies by property type and location. We provide transparent pricing with no hidden fees.',
      'timeline': 'The buying process typically takes 2-3 months from offer to closing, depending on financing and inspection requirements.'
    };
    
    return faqAnswers[question] || 'I\'m here to answer any real estate questions you have! What specific information are you looking for?';
  };

  const searchProperties = async (criteria: any): Promise<PropertyRecommendation[]> => {
    // Mock property data - in production, this would integrate with MLS/PropGuard AI
    const mockProperties: PropertyRecommendation[] = [
      {
        id: 'prop_1',
        address: '123 Oak Street, Sydney NSW',
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        image: '/placeholder.svg',
        personalizationScore: 85,
        matchPercentage: 85,
        features: ['Modern kitchen', 'Garden', 'Parking'],
        riskAssessment: { score: 7, factors: ['Low crime', 'Good schools'] }
      },
      {
        id: 'prop_2',
        address: '456 Pine Avenue, Melbourne VIC',
        price: 520000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        image: '/placeholder.svg',
        personalizationScore: 78,
        matchPercentage: 78,
        features: ['Pool', 'Garage', 'Study'],
        riskAssessment: { score: 8, factors: ['Excellent location', 'High growth area'] }
      }
    ];

    return mockProperties.filter(prop => 
      prop.price >= criteria.priceRange.min && 
      prop.price <= criteria.priceRange.max
    );
  };

  const handleFollowUpActions = async (intent: string, entities: any, actions: string[]) => {
    for (const action of actions) {
      switch (action) {
        case 'show_properties':
          // Properties are already loaded in state
          break;
        case 'schedule_viewing':
          // Could trigger calendar widget
          break;
        case 'show_valuation':
          // Could show detailed valuation modal
          break;
        case 'contact_agent':
          // Could trigger agent contact form
          break;
      }
    }
  };

  const handleQuickAction = (action: string) => {
    const quickMessages: Record<string, string> = {
      'find_properties': 'I\'m looking for properties to buy',
      'get_valuation': 'I need a property valuation',
      'schedule_viewing': 'I want to schedule a property viewing',
      'ask_questions': 'I have questions about real estate'
    };

    setCurrentMessage(quickMessages[action] || '');
  };

  const toggleLanguage = () => {
    const languages = ['en', 'es', 'zh'];
    const currentIndex = languages.indexOf(currentLanguage);
    const nextLanguage = languages[(currentIndex + 1) % languages.length];
    setCurrentLanguage(nextLanguage);
  };

  const getLeadPriority = (score: number): { label: string; color: string } => {
    if (score >= 80) return { label: 'Hot Lead', color: 'bg-red-500' };
    if (score >= 60) return { label: 'Warm Lead', color: 'bg-orange-500' };
    if (score >= 40) return { label: 'Cool Lead', color: 'bg-blue-500' };
    return { label: 'Cold Lead', color: 'bg-gray-500' };
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-green-500 text-white">Live</Badge>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <Card className="w-96 h-full shadow-2xl border-0 bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Home className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">PropGuard AI</CardTitle>
                <p className="text-blue-100 text-sm">Real Estate Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-white hover:bg-white/20"
              >
                <Globe className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/20"
              >
                {isMinimized ? '↑' : '↓'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 h-full flex flex-col">
            <Tabs defaultValue="chat" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="flex-1 flex flex-col m-0">
                {/* Conversation Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversationHistory.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t">
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('find_properties')}
                      className="text-xs"
                    >
                      <Home className="h-3 w-3 mr-1" />
                      Find Properties
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('get_valuation')}
                      className="text-xs"
                    >
                      <DollarSign className="h-3 w-3 mr-1" />
                      Get Valuation
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('schedule_viewing')}
                      className="text-xs"
                    >
                      <Calendar className="h-3 w-3 mr-1" />
                      Schedule Viewing
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('ask_questions')}
                      className="text-xs"
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Ask Questions
                    </Button>
                  </div>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!currentMessage.trim() || isTyping}
                      size="sm"
                    >
                      <Zap className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="flex-1 m-0 p-4">
                {leadData ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Lead Information</h3>
                      <Badge className={getLeadPriority(leadData.leadScore).color}>
                        {getLeadPriority(leadData.leadScore).label}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Lead Score</label>
                        <Progress value={leadData.leadScore} className="mt-1" />
                        <p className="text-xs text-gray-500 mt-1">{leadData.leadScore}% qualified</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Budget:</span>
                          <p className="font-medium">
                            {leadData.budgetRange 
                              ? `$${leadData.budgetRange.min.toLocaleString()} - $${leadData.budgetRange.max.toLocaleString()}`
                              : 'Not specified'
                            }
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Timeline:</span>
                          <p className="font-medium">{leadData.timeline || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Financing:</span>
                          <p className="font-medium">{leadData.financingStatus || 'Not specified'}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <p className="font-medium capitalize">{leadData.status}</p>
                        </div>
                      </div>
                      
                      {leadData.email && (
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{leadData.email}</span>
                        </div>
                      )}
                      
                      {leadData.phone && (
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{leadData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No lead data yet</p>
                    <p className="text-sm text-gray-400">Start a conversation to begin lead qualification</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="properties" className="flex-1 m-0 p-4">
                {propertyRecommendations.length > 0 ? (
                  <div className="space-y-4">
                    <h3 className="font-semibold">Recommended Properties</h3>
                    {propertyRecommendations.map((property) => (
                      <Card key={property.id} className="p-3">
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
                            <img 
                              src={property.image} 
                              alt={property.address}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{property.address}</h4>
                            <p className="text-lg font-bold text-blue-600">
                              ${property.price.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {property.bedrooms} bed • {property.bathrooms} bath • {property.squareFeet} sqft
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {property.matchPercentage}% match
                              </Badge>
                              {property.riskAssessment && (
                                <Badge variant="outline" className="text-xs">
                                  Risk: {property.riskAssessment.score}/10
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No properties found yet</p>
                    <p className="text-sm text-gray-400">Ask me to find properties matching your criteria</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default SensayRealEstateChatbot;
