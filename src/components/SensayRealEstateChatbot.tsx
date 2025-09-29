import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
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
  Zap,
  Mic,
  MicOff,
  Smile,
  Frown,
  Meh,
  Brain,
  Target,
  BarChart3
} from 'lucide-react';
import { SensayAPI } from '@/services/api/sensay';
import { aiRiskPredictionEngine } from '@/services/aiRiskPredictionEngine';
import { dynamicPricingIntelligence } from '@/services/dynamicPricingIntelligence';
import { contextualMemorySystem } from '@/services/contextualMemorySystem';
import { usePropertyAnalysis } from '@/hooks/usePropertyAnalysis';
import { sensayPersonalityIntegration } from '@/services/sensayPersonalityIntegration';
import { SENSAY_PERSONALITY_CONFIG } from '@/data/sensayPersonalityTraining';

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
    entities?: Record<string, unknown>;
    confidence?: number;
    actions?: string[];
    personality?: {
      tone?: any;
      userType?: string;
      language?: string;
      emotionalState?: string;
    };
    analytics?: {
      userType?: string;
      emotionalState?: string;
      conversationStage?: string;
      satisfactionPrediction?: number;
    };
  };
}

interface SensayRealEstateChatbotProps {
  className?: string;
  context?: 'dashboard' | 'risk-analysis' | 'blockchain' | 'compliance' | 'reports' | 'pricing' | 'property-search';
}

const SensayRealEstateChatbot: React.FC<SensayRealEstateChatbotProps> = ({ 
  className = '',
  context = 'dashboard'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [propertyRecommendations, setPropertyRecommendations] = useState<PropertyRecommendation[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [conversationId, setConversationId] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [riskAnalysis, setRiskAnalysis] = useState<any>(null);
  const [pricingIntelligence, setPricingIntelligence] = useState<any>(null);
  
  // Additional state variables for enhanced features
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral');
  const [userEmotion, setUserEmotion] = useState<string>('');
  const [language, setLanguage] = useState('en');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [predictiveSuggestions, setPredictiveSuggestions] = useState<string[]>([]);
  const [conversationQuality, setConversationQuality] = useState<number>(0);
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  
  // Personality system state
  const [userType, setUserType] = useState<string>('first_time_buyer');
  const [personalityAnalytics, setPersonalityAnalytics] = useState<any>(null);
  const [emotionalState, setEmotionalState] = useState<string>('neutral');
  const [personalityEnabled, setPersonalityEnabled] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const sensayAPI = useRef(new SensayAPI());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { analyzeProperty } = usePropertyAnalysis();

  // Helper function to calculate conversation quality
  const calculateConversationQuality = (messages: ConversationMessage[]): number => {
    if (messages.length === 0) return 0;
    
    let qualityScore = 0;
    const totalMessages = messages.length;
    
    messages.forEach(msg => {
      if (msg.metadata?.confidence) {
        qualityScore += msg.metadata.confidence;
      }
      if (msg.metadata?.intent && msg.metadata.intent !== 'greeting') {
        qualityScore += 0.2; // Bonus for intent recognition
      }
    });
    
    return Math.min(qualityScore / totalMessages, 1.0);
  };

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

  // Enhanced AI Features
  useEffect(() => {
    // Initialize voice recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCurrentMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };
    }
  }, [language]);

  // Analyze sentiment and emotion
  const analyzeSentiment = (text: string) => {
    const positiveWords = ['love', 'great', 'amazing', 'perfect', 'excellent', 'wonderful', 'fantastic', 'excited', 'happy'];
    const negativeWords = ['hate', 'terrible', 'awful', 'bad', 'disappointed', 'frustrated', 'angry', 'worried', 'stressed'];
    
    const words = text.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount > negativeCount) {
      setSentiment('positive');
      setUserEmotion('excited');
    } else if (negativeCount > positiveCount) {
      setSentiment('negative');
      setUserEmotion('stressed');
    } else {
      setSentiment('neutral');
      setUserEmotion('neutral');
    }
  };

  // Generate AI insights
  const generateAIInsights = (conversation: ConversationMessage[]) => {
    const insights = [];
    
    if (conversation.length > 5) {
      insights.push('User is highly engaged - consider advanced property options');
    }
    
    if (sentiment === 'positive') {
      insights.push('User shows strong buying intent - prioritize high-value properties');
    }
    
    if (userEmotion === 'stressed') {
      insights.push('User may need reassurance - focus on risk mitigation and support');
    }
    
    if (leadData && leadData.leadScore > 80) {
      insights.push('High-quality lead detected - schedule immediate follow-up');
    }
    
    setAiInsights(insights);
  };

  // Generate predictive suggestions
  const generatePredictiveSuggestions = (context: any) => {
    const suggestions = [];
    
    if (context.budgetRange) {
      suggestions.push(`Properties in $${context.budgetRange.min}K-$${context.budgetRange.max}K range`);
    }
    
    if (context.preferredLocations) {
      suggestions.push(`Properties in ${context.preferredLocations.join(', ')}`);
    }
    
    if (context.propertyTypes) {
      suggestions.push(`${context.propertyTypes.join(' or ')} properties`);
    }
    
    if (context.timeline === 'immediate') {
      suggestions.push('Available properties for immediate viewing');
    }
    
    setPredictiveSuggestions(suggestions);
  };

  // Voice interaction
  const toggleVoiceInput = () => {
    if (!isVoiceEnabled) {
      setIsVoiceEnabled(true);
      return;
    }
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  // Language detection and switching
  const detectLanguage = (text: string) => {
    const spanishWords = ['hola', 'gracias', 'por favor', 'casa', 'propiedad'];
    const chineseWords = ['你好', '谢谢', '房子', '房产'];
    
    const words = text.toLowerCase().split(' ');
    
    if (words.some(word => spanishWords.includes(word))) {
      setLanguage('es');
    } else if (words.some(word => chineseWords.includes(word))) {
      setLanguage('zh');
    } else {
      setLanguage('en');
    }
  };

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

    // Enhanced AI Processing
    analyzeSentiment(currentMessage);
    detectLanguage(currentMessage);

    // Initialize user profile if not exists
    if (!userId) {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setUserId(newUserId);
      await contextualMemorySystem.createOrUpdateUserProfile(newUserId, conversationId);
    }

    const userMessage: ConversationMessage = {
      id: `msg_${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
      metadata: {
        intent: 'user_message',
        entities: {},
        confidence: 1.0,
        actions: []
      }
    };

    setConversationHistory(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      let assistantMessage: ConversationMessage;

      if (personalityEnabled) {
        // Use personality integration for enhanced responses
        const personalityResponse = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
          userId,
          message: currentMessage,
          context: {
            platform: 'web',
            language,
            userType,
            conversationId,
            previousMessages: conversationHistory.slice(-5).map(msg => ({
              role: msg.type === 'user' ? 'user' : 'assistant',
              content: msg.content,
              timestamp: msg.timestamp
            }))
          }
        });

        // Update emotional state and analytics
        setEmotionalState(personalityResponse.analytics.emotionalState);
        setPersonalityAnalytics(personalityResponse.analytics);

        assistantMessage = {
          id: `msg_${Date.now() + 1}`,
          type: 'assistant',
          content: personalityResponse.content,
          timestamp: new Date(),
          metadata: {
            intent: 'personality_enhanced',
            entities: {},
            confidence: personalityResponse.personality.confidence,
            actions: personalityResponse.actions.immediate,
            personality: {
              tone: personalityResponse.personality.tone,
              userType: personalityResponse.personality.metadata.userType,
              language: personalityResponse.personality.metadata.language,
              emotionalState: personalityResponse.personality.metadata.emotionalAdaptation
            },
            analytics: personalityResponse.analytics
          }
        };

        // Update lead data based on personality insights
        await updateLeadDataWithPersonality(userMessage, personalityResponse);

      } else {
        // Fallback to original Sensay API processing
        const intentPrediction = await contextualMemorySystem.predictUserIntent(userId, currentMessage);
        
        const response = await sensayAPI.current.chat(currentMessage, {
          property: leadData,
          analysis: riskAnalysis,
          sessionId: conversationId,
          userInfo: { userId, language },
          interactionHistory: conversationHistory.slice(-5)
        });
        
        const intent = intentPrediction.intent || response.metadata?.intent || 'general';
        const entities = response.metadata?.entities || {};
        
        await updateLeadData(userMessage, intent, entities);
        
        const assistantResponse = await generateResponse(intent, entities, response);
        
        const contextualResponse = await contextualMemorySystem.generateContextualResponse(
          userId,
          currentMessage,
          assistantResponse.content
        );
        
        assistantMessage = {
          id: `msg_${Date.now() + 1}`,
          type: 'assistant',
          content: contextualResponse,
          timestamp: new Date(),
          metadata: {
            intent,
            entities,
            confidence: response.confidence,
            actions: assistantResponse.actions
          }
        };
      }

      setConversationHistory(prev => [...prev, assistantMessage]);
      
      // Generate AI insights and suggestions
      generateAIInsights([...conversationHistory, userMessage, assistantMessage]);
      generatePredictiveSuggestions(leadData);
      
      // Update conversation quality score
      const qualityScore = calculateConversationQuality([...conversationHistory, userMessage, assistantMessage]);
      setConversationQuality(qualityScore);
      
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

  const updateLeadDataWithPersonality = async (message: ConversationMessage, personalityResponse: any) => {
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

    // Update lead data based on personality insights
    const updatedLead = { ...leadData! };
    const analytics = personalityResponse.analytics;
    const personality = personalityResponse.personality;
    
    // Extract information from personality-enhanced response
    const entities = personalityResponse.sensay?.metadata || {};
    if (entities.budget) updatedLead.budgetRange = entities.budget;
    if (entities.location) updatedLead.preferredLocations = entities.location;
    if (entities.propertyType) updatedLead.propertyTypes = entities.propertyType;
    if (entities.timeline) updatedLead.timeline = entities.timeline;
    if (entities.financing) updatedLead.financingStatus = entities.financing;
    if (entities.email) updatedLead.email = entities.email;
    if (entities.phone) updatedLead.phone = entities.phone;
    if (entities.name) updatedLead.name = entities.name;
    
    // Add interaction with personality metadata
    updatedLead.interactions.push({
      timestamp: message.timestamp,
      message: message.content,
      response: personalityResponse.content,
      channel: 'web',
      intent: 'personality_enhanced'
    });

    // Calculate lead score with personality enhancements
    updatedLead.leadScore = calculateLeadScoreWithPersonality(updatedLead, analytics, personality);
    
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

  const calculateLeadScoreWithPersonality = (lead: LeadData, analytics: any, personality: any): number => {
    let score = 0;
    
    // Standard lead scoring (70% weight)
    score += calculateLeadScore(lead, 'personality_enhanced') * 0.7;
    
    // Personality enhancements (30% weight)
    const personalityScore = 0;
    
    // Emotional state scoring
    const emotionalScore = getEmotionalScore(analytics.emotionalState);
    
    // User type scoring
    const userTypeScore = getUserTypeScore(personality.metadata.userType);
    
    // Confidence scoring
    const confidenceScore = (personality.confidence || 0.8) * 20;
    
    score += (emotionalScore + userTypeScore + confidenceScore) * 0.3;
    
    return Math.min(score, 100);
  };

  const getEmotionalScore = (emotionalState: string): number => {
    switch (emotionalState) {
      case 'excited': return 25;
      case 'urgent': return 20;
      case 'neutral': return 15;
      case 'uncertain': return 10;
      case 'stressed': return 5;
      case 'frustrated': return 0;
      default: return 15;
    }
  };

  const getUserTypeScore = (userType: string): number => {
    switch (userType) {
      case 'investor': return 25;
      case 'seller': return 20;
      case 'agent': return 18;
      case 'professional': return 16;
      case 'first_time_buyer': return 12;
      case 'renter': return 10;
      default: return 12;
    }
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
        
      case 'risk_analysis':
        content = await generateRiskAnalysisResponse(entities);
        actions.push('show_risk_analysis', 'get_insurance_quote');
        break;
        
      case 'pricing_intelligence':
        content = await generatePricingIntelligenceResponse(entities);
        actions.push('show_pricing_analysis', 'schedule_consultation');
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
      
      if (!analysis) {
        return 'I apologize, but I couldn\'t retrieve the property analysis at this time. Please try again later.';
      }
      
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

  const generateRiskAnalysisResponse = async (entities: any): Promise<string> => {
    try {
      const address = entities.address || entities.location;
      if (!address) {
        return 'I\'d be happy to provide an environmental risk analysis! Please provide the property address you\'d like me to analyze.';
      }

      const riskAnalysis = await aiRiskPredictionEngine.analyzePropertyRisk(address);
      setRiskAnalysis(riskAnalysis);
      
      return await aiRiskPredictionEngine.generateRiskAnalysisConversation(riskAnalysis);
    } catch (error) {
      return 'I\'m having trouble accessing the risk analysis data right now. Please try again or contact our support team for assistance.';
    }
  };

  const generatePricingIntelligenceResponse = async (entities: any): Promise<string> => {
    try {
      const address = entities.address || entities.location;
      const propertyDetails = entities.propertyDetails || {};
      
      if (!address) {
        return 'I\'d be happy to provide pricing intelligence! Please provide the property address you\'d like me to analyze.';
      }

      const pricingIntelligence = await dynamicPricingIntelligence.analyzeOptimalPricing(address, propertyDetails);
      setPricingIntelligence(pricingIntelligence);
      
      return await dynamicPricingIntelligence.generatePricingConversation(pricingIntelligence);
    } catch (error) {
      return 'I\'m having trouble accessing the pricing intelligence data right now. Please try again or contact our support team for assistance.';
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
      'find_properties': 'I\'m looking for properties to buy worldwide',
      'get_valuation': 'I need a property valuation with risk assessment',
      'risk_analysis': 'I want to analyze environmental and climate risks for a property',
      'pricing_intelligence': 'I need pricing intelligence for optimal listing price globally',
      'schedule_viewing': 'I want to schedule a property viewing or virtual tour',
      'ask_questions': 'I have questions about real estate investment globally',
      'lead_qualification': 'I\'d like to be qualified as a potential buyer',
      'market_analysis': 'Show me market trends and investment opportunities',
      'financing_options': 'What financing options are available for international buyers?',
      'legal_compliance': 'What legal requirements do I need to know for buying property?'
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
              {/* AI Status Indicators */}
              <div className="flex items-center space-x-1">
                {sentiment === 'positive' && <Smile className="h-4 w-4 text-green-300" />}
                {sentiment === 'negative' && <Frown className="h-4 w-4 text-red-300" />}
                {sentiment === 'neutral' && <Meh className="h-4 w-4 text-yellow-300" />}
                {conversationQuality > 80 && <Star className="h-4 w-4 text-yellow-300" />}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceInput}
                className={`text-white hover:bg-white/20 ${isListening ? 'bg-red-500' : ''}`}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                className="text-white hover:bg-white/20"
              >
                <Brain className="h-4 w-4" />
              </Button>
              
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
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {conversationHistory.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.05,
                            type: "spring",
                            stiffness: 100
                          }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="flex items-start space-x-2 max-w-[80%]">
                            {message.type === 'assistant' && (
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                                  <Bot className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            
                            <motion.div
                              className={`rounded-2xl p-4 shadow-sm ${
                                message.type === 'user'
                                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-12'
                                  : 'bg-white border border-gray-200 mr-12'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                              
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                  {message.metadata?.personality?.emotionalState && (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex items-center space-x-1">
                                          {message.metadata.personality.emotionalState === 'excited' && <Smile className="h-3 w-3" />}
                                          {message.metadata.personality.emotionalState === 'stressed' && <Frown className="h-3 w-3" />}
                                          {message.metadata.personality.emotionalState === 'neutral' && <Meh className="h-3 w-3" />}
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p>Emotional State: {message.metadata.personality.emotionalState}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                  
                                  {message.metadata?.personality?.userType && (
                                    <Badge variant="outline" className="text-xs">
                                      {message.metadata.personality.userType.replace('_', ' ')}
                                    </Badge>
                                  )}
                                </div>
                                
                                <p className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {message.timestamp.toLocaleTimeString()}
                                </p>
                              </div>
                            </motion.div>
                            
                            {message.type === 'user' && (
                              <Avatar className="h-8 w-8 mt-1">
                                <AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 text-white text-xs">
                                  <Users className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                            <div className="flex space-x-1">
                              <motion.div 
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                              />
                              <motion.div 
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              />
                              <motion.div 
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

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
                      onClick={() => handleQuickAction('risk_analysis')}
                      className="text-xs"
                    >
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Risk Analysis
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('pricing_intelligence')}
                      className="text-xs"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Pricing Intel
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('lead_qualification')}
                      className="text-xs"
                    >
                      <Target className="h-3 w-3 mr-1" />
                      Get Qualified
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction('market_analysis')}
                      className="text-xs"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Market Analysis
                    </Button>
                  </div>

                  {/* Message Input */}
                  <motion.div 
                    className="flex space-x-3 p-3 bg-gray-50 rounded-2xl border border-gray-200"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex-1 relative">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Ask me anything about real estate..."
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        className="border-0 bg-transparent focus:ring-0 text-sm placeholder:text-gray-500 resize-none"
                        disabled={isTyping}
                      />
                      {currentMessage.trim() && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          <Badge variant="secondary" className="text-xs">
                            {currentMessage.length}/500
                          </Badge>
                        </motion.div>
                      )}
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isTyping}
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 rounded-full h-10 w-10 p-0"
                      >
                        {isTyping ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <Zap className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </TabsContent>

              <TabsContent value="leads" className="flex-1 m-0 p-4">
                <ScrollArea className="h-full">
                  {leadData ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center space-x-2">
                              <Users className="h-5 w-5 text-blue-600" />
                              <span>Lead Information</span>
                            </CardTitle>
                            <Badge className={`${getLeadPriority(leadData.leadScore).color} text-white font-medium`}>
                              {getLeadPriority(leadData.leadScore).label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium text-gray-700">Lead Score</label>
                              <span className="text-sm font-bold text-blue-600">{leadData.leadScore}%</span>
                            </div>
                            <Progress value={leadData.leadScore} className="h-2" />
                            <p className="text-xs text-gray-500">{leadData.leadScore >= 80 ? 'Highly qualified lead' : leadData.leadScore >= 60 ? 'Qualified lead' : 'Needs qualification'}</p>
                          </div>
                          
                          <Separator />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="p-3 bg-white/50">
                              <div className="flex items-center space-x-2 mb-2">
                                <DollarSign className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-medium text-gray-700">Budget Range</span>
                              </div>
                              <p className="font-semibold text-gray-900">
                                {leadData.budgetRange 
                                  ? `$${leadData.budgetRange.min.toLocaleString()} - $${leadData.budgetRange.max.toLocaleString()}`
                                  : 'Not specified'
                                }
                              </p>
                            </Card>
                            
                            <Card className="p-3 bg-white/50">
                              <div className="flex items-center space-x-2 mb-2">
                                <Clock className="h-4 w-4 text-orange-600" />
                                <span className="text-sm font-medium text-gray-700">Timeline</span>
                              </div>
                              <p className="font-semibold text-gray-900">{leadData.timeline || 'Not specified'}</p>
                            </Card>
                            
                            <Card className="p-3 bg-white/50">
                              <div className="flex items-center space-x-2 mb-2">
                                <Home className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-gray-700">Financing</span>
                              </div>
                              <p className="font-semibold text-gray-900">{leadData.financingStatus || 'Not specified'}</p>
                            </Card>
                            
                            <Card className="p-3 bg-white/50">
                              <div className="flex items-center space-x-2 mb-2">
                                <CheckCircle className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-medium text-gray-700">Status</span>
                              </div>
                              <p className="font-semibold text-gray-900 capitalize">{leadData.status}</p>
                            </Card>
                          </div>
                          
                          {(leadData.email || leadData.phone) && (
                            <>
                              <Separator />
                              <div className="space-y-3">
                                <h4 className="font-medium text-gray-900">Contact Information</h4>
                                {leadData.email && (
                                  <div className="flex items-center space-x-3 p-2 bg-white/50 rounded-lg">
                                    <Mail className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{leadData.email}</span>
                                  </div>
                                )}
                                
                                {leadData.phone && (
                                  <div className="flex items-center space-x-3 p-2 bg-white/50 rounded-lg">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{leadData.phone}</span>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Users className="h-12 w-12 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Lead Data Yet</h3>
                      <p className="text-gray-500 mb-4">Start a conversation to begin lead qualification</p>
                      <Button 
                        onClick={() => handleQuickAction('lead_qualification')}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Begin Qualification
                      </Button>
                    </motion.div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="properties" className="flex-1 m-0 p-4">
                <ScrollArea className="h-full">
                  {propertyRecommendations.length > 0 ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold flex items-center space-x-2">
                          <Home className="h-5 w-5 text-blue-600" />
                          <span>Recommended Properties</span>
                        </h3>
                        <Badge variant="outline" className="text-sm">
                          {propertyRecommendations.length} properties
                        </Badge>
                      </div>
                      
                      <div className="grid gap-4">
                        {propertyRecommendations.map((property, index) => (
                          <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow">
                              <div className="flex">
                                <div className="w-32 h-24 bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0 relative overflow-hidden">
                                  <img 
                                    src={property.image} 
                                    alt={property.address}
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute top-2 right-2">
                                    <Badge className="bg-green-500 text-white text-xs">
                                      {property.matchPercentage}% match
                                    </Badge>
                                  </div>
                                </div>
                                
                                <div className="flex-1 p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-gray-900 truncate pr-2">
                                      {property.address}
                                    </h4>
                                    <p className="text-lg font-bold text-blue-600 whitespace-nowrap">
                                      ${property.price.toLocaleString()}
                                    </p>
                                  </div>
                                  
                                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                                    <div className="flex items-center space-x-1">
                                      <Home className="h-4 w-4" />
                                      <span>{property.bedrooms} bed</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Home className="h-4 w-4" />
                                      <span>{property.bathrooms} bath</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <Home className="h-4 w-4" />
                                      <span>{property.squareFeet.toLocaleString()} sqft</span>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      {property.riskAssessment && (
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <Badge 
                                              variant="outline" 
                                              className={`text-xs ${
                                                property.riskAssessment.score <= 3 
                                                  ? 'border-green-500 text-green-700' 
                                                  : property.riskAssessment.score <= 6 
                                                    ? 'border-yellow-500 text-yellow-700' 
                                                    : 'border-red-500 text-red-700'
                                              }`}
                                            >
                                              Risk: {property.riskAssessment.score}/10
                                            </Badge>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Risk Assessment: {property.riskAssessment.description}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      )}
                                      
                                      <Badge variant="secondary" className="text-xs">
                                        AI Recommended
                                      </Badge>
                                    </div>
                                    
                                    <Button size="sm" variant="outline" className="text-xs">
                                      View Details
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                        <Home className="h-12 w-12 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Found Yet</h3>
                      <p className="text-gray-500 mb-4">Ask me to find properties matching your criteria</p>
                      <Button 
                        onClick={() => handleQuickAction('property_search')}
                        className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Find Properties
                      </Button>
                    </motion.div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export { SensayRealEstateChatbot };
export default SensayRealEstateChatbot;
