import { sensayConfig, sensayEndpoints } from '@/config/sensay';
import { MultilingualHandler } from './multilingualHandler';
import { PropertyIntelligenceEngine } from './propertyIntelligenceEngine';
import { LeadManager } from './leadManager';

export interface SensayMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  metadata?: Record<string, any>;
  language?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

export interface SensayChatResponse {
  message: string;
  conversationId: string;
  metadata?: Record<string, any>;
  actions?: SensayAction[];
  intent?: SensayIntent;
  entities?: Record<string, any>;
  confidence?: number;
  suggestedResponses?: string[];
  richContent?: RichContent;
}

export interface SensayAction {
  type: 'viewProperty' | 'scheduleShowing' | 'downloadReport' | 'bookTour' | 'getValuation' | 'marketInsights' | 'leadQualification' | 'virtualTour';
  data: Record<string, any>;
  label: string;
  icon?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface SensayIntent {
  name: string;
  confidence: number;
  category: 'property_search' | 'valuation' | 'scheduling' | 'market_data' | 'faq' | 'lead_nurturing' | 'multilingual';
}

export interface RichContent {
  type: 'property_cards' | 'market_chart' | 'valuation_report' | 'calendar_widget' | 'image_gallery';
  data: Record<string, any>;
  interactive?: boolean;
}

export interface ConversationState {
  currentState: 'initial' | 'property_search' | 'valuation' | 'viewing_scheduling' | 'lead_nurturing' | 'market_insights';
  userPreferences?: UserPreferences;
  searchHistory?: PropertySearch[];
  lastSearchResults?: PropertyListing[];
  leadScore?: number;
  language: string;
  sessionStart: Date;
  interactionCount: number;
}

export interface UserPreferences {
  budgetMin?: number;
  budgetMax?: number;
  preferredLocations?: string[];
  propertyTypes?: string[];
  bedrooms?: number;
  bathrooms?: number;
  mustHaveFeatures?: string[];
  riskTolerance?: 'low' | 'medium' | 'high';
  investmentGoals?: string[];
}

export interface PropertyListing {
  id: string;
  address: string;
  price: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  location: string;
  features: string[];
  imageUrls: string[];
  virtualTourUrl?: string;
  riskScore: number;
  propguardValuation?: number;
  environmentalRisks?: string[];
  marketTrend?: 'rising' | 'stable' | 'declining';
  daysOnMarket?: number;
}

export interface PropertySearch {
  id: string;
  timestamp: Date;
  criteria: Record<string, any>;
  results: PropertyListing[];
  userFeedback?: string;
}

export interface MarketInsight {
  location: string;
  averagePrice: number;
  priceChange: number;
  volumeChange: number;
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  marketSentiment: 'bullish' | 'neutral' | 'bearish';
  topFeatures: string[];
  investmentOpportunities: string[];
}

export class SensayService {
  private conversationId: string | null = null;
  private conversationState: ConversationState;
  private userSessions: Map<string, ConversationState> = new Map();
  private multilingualHandler: MultilingualHandler;
  private propertyIntelligence: PropertyIntelligenceEngine;
  private leadManager: LeadManager;

  constructor() {
    this.conversationState = {
      currentState: 'initial',
      language: 'en',
      sessionStart: new Date(),
      interactionCount: 0
    };
    this.multilingualHandler = new MultilingualHandler();
    this.propertyIntelligence = new PropertyIntelligenceEngine();
    this.leadManager = new LeadManager();
  }

  async sendMessage(message: string, userId: string = 'default'): Promise<SensayChatResponse> {
    try {
      // Get or create user session
      const session = this.getUserSession(userId);
      
      // Detect language and translate if needed
      const detectedLang = await this.multilingualHandler.detectLanguage(message);
      if (detectedLang !== session.language) {
        message = await this.multilingualHandler.translateMessage(message, detectedLang, session.language);
        session.language = detectedLang;
      }

      // Analyze intent and entities
      const intentAnalysis = await this.analyzeIntent(message, session);
      
      // Route conversation based on intent
      const response = await this.routeConversation(session, intentAnalysis, message);
      
      // Update session state
      this.updateSessionState(session, intentAnalysis, response);
      
      // Store updated session
      this.userSessions.set(userId, session);

      return response;
    } catch (error) {
      console.error('Sensay API error:', error);
      return {
        message: 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
        conversationId: this.conversationId || '',
        actions: [],
        intent: { name: 'error', confidence: 0, category: 'faq' }
      };
    }
  }

  private getUserSession(userId: string): ConversationState {
    if (!this.userSessions.has(userId)) {
      this.userSessions.set(userId, {
        currentState: 'initial',
        language: 'en',
        sessionStart: new Date(),
        interactionCount: 0
      });
    }
    return this.userSessions.get(userId)!;
  }

  private async analyzeIntent(message: string, session: ConversationState): Promise<{
    primaryIntent: SensayIntent;
    entities: Record<string, any>;
    confidence: number;
  }> {
    // Enhanced intent analysis with PropGuard AI context
    const intentKeywords = {
      'property_search': ['find', 'search', 'looking for', 'property', 'house', 'apartment', 'buy', 'purchase'],
      'valuation': ['value', 'worth', 'price', 'valuation', 'estimate', 'cost', 'how much'],
      'market_insights': ['market', 'trend', 'analysis', 'data', 'statistics', 'comparison'],
      'scheduling': ['schedule', 'book', 'appointment', 'tour', 'viewing', 'visit'],
      'lead_nurturing': ['contact', 'email', 'phone', 'follow up', 'interested', 'buying'],
      'faq': ['what', 'how', 'why', 'when', 'where', 'help', 'question']
    };

    const messageLower = message.toLowerCase();
    let bestMatch = { name: 'faq', confidence: 0.3, category: 'faq' as const };
    
    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      const matches = keywords.filter(keyword => messageLower.includes(keyword)).length;
      const confidence = Math.min(matches / keywords.length + 0.2, 0.95);
      
      if (confidence > bestMatch.confidence) {
        bestMatch = {
          name: intent,
          confidence,
          category: intent as any
        };
      }
    }

    // Extract entities
    const entities = this.extractEntities(message, session);

    return {
      primaryIntent: bestMatch,
      entities,
      confidence: bestMatch.confidence
    };
  }

  private extractEntities(message: string, session: ConversationState): Record<string, any> {
    const entities: Record<string, any> = {};
    
    // Price extraction
    const priceMatch = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:k|thousand|m|million)?/i);
    if (priceMatch) {
      let price = parseFloat(priceMatch[1].replace(/,/g, ''));
      if (message.toLowerCase().includes('k') || message.toLowerCase().includes('thousand')) {
        price *= 1000;
      } else if (message.toLowerCase().includes('m') || message.toLowerCase().includes('million')) {
        price *= 1000000;
      }
      entities.budget = price;
    }

    // Location extraction
    const locations = ['melbourne', 'sydney', 'brisbane', 'perth', 'adelaide', 'canberra', 'hobart'];
    const foundLocation = locations.find(loc => message.toLowerCase().includes(loc));
    if (foundLocation) {
      entities.location = foundLocation;
    }

    // Property type extraction
    const propertyTypes = ['house', 'apartment', 'unit', 'townhouse', 'villa', 'studio', 'condo'];
    const foundType = propertyTypes.find(type => message.toLowerCase().includes(type));
    if (foundType) {
      entities.propertyType = foundType;
    }

    // Bedroom count
    const bedroomMatch = message.match(/(\d+)\s*(?:bed|bedroom)/i);
    if (bedroomMatch) {
      entities.bedrooms = parseInt(bedroomMatch[1]);
    }

    // Address extraction (simplified)
    const addressMatch = message.match(/\d+\s+[a-zA-Z\s]+(?:street|st|avenue|ave|road|rd|drive|dr|lane|ln|way|blvd|boulevard)/i);
    if (addressMatch) {
      entities.address = addressMatch[0];
    }

    return entities;
  }

  private async routeConversation(session: ConversationState, intentAnalysis: any, message: string): Promise<SensayChatResponse> {
    const { primaryIntent, entities, confidence } = intentAnalysis;
    
    if (confidence < 0.6) {
      return this.handleAmbiguousQuery(session, message);
    }

    switch (primaryIntent.name) {
      case 'property_search':
        return this.handlePropertySearch(session, entities, message);
      case 'valuation':
        return this.handleValuationRequest(session, entities, message);
      case 'market_insights':
        return this.handleMarketInsights(session, entities, message);
      case 'scheduling':
        return this.handleScheduling(session, entities, message);
      case 'lead_nurturing':
        return this.handleLeadNurturing(session, entities, message);
      case 'faq':
        return this.handleFAQ(session, entities, message);
      default:
        return this.handleGeneralQuery(session, message);
    }
  }

  private async handlePropertySearch(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    session.currentState = 'property_search';
    
    // Get property recommendations
    const properties = await this.propertyIntelligence.searchProperties(entities, session.userPreferences);
    
    // Enhance with PropGuard AI data
    const enhancedProperties = await Promise.all(
      properties.slice(0, 5).map(async (prop) => ({
        ...prop,
        riskScore: await this.propertyIntelligence.getRiskScore(prop),
        propguardValuation: await this.propertyIntelligence.getValuation(prop),
        environmentalRisks: await this.propertyIntelligence.getEnvironmentalRisks(prop)
      }))
    );

    session.lastSearchResults = enhancedProperties;
    session.searchHistory = session.searchHistory || [];
    session.searchHistory.push({
      id: Date.now().toString(),
      timestamp: new Date(),
      criteria: entities,
      results: enhancedProperties
    });

    return {
      message: this.formatPropertySearchResponse(enhancedProperties, entities),
      conversationId: this.conversationId || '',
      actions: this.generatePropertyActions(enhancedProperties),
      intent: { name: 'property_search', confidence: 0.9, category: 'property_search' },
      entities,
      richContent: {
        type: 'property_cards',
        data: { properties: enhancedProperties },
        interactive: true
      }
    };
  }

  private async handleValuationRequest(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    session.currentState = 'valuation';
    
    if (!entities.address) {
      return {
        message: "I'd be happy to provide a property valuation! Could you please share the property address?",
        conversationId: this.conversationId || '',
        actions: [
          { type: 'getValuation', data: { requiresAddress: true }, label: '📍 Enter Property Address', priority: 'high' }
        ],
        intent: { name: 'valuation', confidence: 0.8, category: 'valuation' }
      };
    }

    // Get PropGuard AI valuation
    const valuation = await this.propertyIntelligence.getDetailedValuation(entities.address);
    
    return {
      message: this.formatValuationResponse(valuation),
      conversationId: this.conversationId || '',
      actions: [
        { type: 'scheduleShowing', data: { address: entities.address }, label: '📅 Schedule Viewing', priority: 'medium' },
        { type: 'downloadReport', data: { valuation }, label: '📊 Download Report', priority: 'medium' },
        { type: 'marketInsights', data: { location: valuation.location }, label: '📈 Market Analysis', priority: 'low' }
      ],
      intent: { name: 'valuation', confidence: 0.95, category: 'valuation' },
      richContent: {
        type: 'valuation_report',
        data: { valuation },
        interactive: true
      }
    };
  }

  private async handleMarketInsights(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    session.currentState = 'market_insights';
    
    const location = entities.location || session.userPreferences?.preferredLocations?.[0] || 'Melbourne';
    const marketData = await this.propertyIntelligence.getMarketInsights(location);
    
    return {
      message: this.formatMarketInsightsResponse(marketData, location),
      conversationId: this.conversationId || '',
      actions: [
        { type: 'viewProperty', data: { location }, label: '🏠 View Properties', priority: 'medium' },
        { type: 'marketInsights', data: { location, detailed: true }, label: '📊 Detailed Analysis', priority: 'low' }
      ],
      intent: { name: 'market_insights', confidence: 0.9, category: 'market_data' },
      richContent: {
        type: 'market_chart',
        data: { marketData, location },
        interactive: true
      }
    };
  }

  private async handleScheduling(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    session.currentState = 'viewing_scheduling';
    
    const property = session.lastSearchResults?.[0];
    if (!property) {
      return {
        message: "Let's first find some properties you're interested in! What type of property are you looking for?",
        conversationId: this.conversationId || '',
        actions: [
          { type: 'viewProperty', data: {}, label: '🔍 Search Properties', priority: 'high' }
        ],
        intent: { name: 'scheduling', confidence: 0.7, category: 'scheduling' }
      };
    }

    // Generate booking options
    const bookingOptions = await this.generateBookingOptions(property);
    
    return {
      message: `Great! I can help you schedule a viewing for ${property.address}. Here are the available options:`,
      conversationId: this.conversationId || '',
      actions: [
        { type: 'bookTour', data: { propertyId: property.id, type: 'virtual' }, label: '📹 Virtual Tour', priority: 'high' },
        { type: 'bookTour', data: { propertyId: property.id, type: 'in-person' }, label: '🏠 In-Person Visit', priority: 'high' },
        { type: 'virtualTour', data: { url: property.virtualTourUrl }, label: '🎥 View Virtual Tour', priority: 'medium' }
      ],
      intent: { name: 'scheduling', confidence: 0.9, category: 'scheduling' },
      richContent: {
        type: 'calendar_widget',
        data: { property, bookingOptions },
        interactive: true
      }
    };
  }

  private async handleLeadNurturing(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    session.currentState = 'lead_nurturing';
    
    // Qualify lead
    const leadScore = await this.leadManager.qualifyLead(session, entities, message);
    session.leadScore = leadScore;
    
    return {
      message: this.formatLeadQualificationResponse(leadScore, session),
      conversationId: this.conversationId || '',
      actions: [
        { type: 'leadQualification', data: { score: leadScore }, label: '📋 Complete Profile', priority: 'high' },
        { type: 'marketInsights', data: { personalized: true }, label: '📈 Personal Market Report', priority: 'medium' }
      ],
      intent: { name: 'lead_nurturing', confidence: 0.8, category: 'lead_nurturing' }
    };
  }

  private async handleFAQ(session: ConversationState, entities: Record<string, any>, message: string): Promise<SensayChatResponse> {
    // Use existing FAQ system
    const faqResponse = await this.getFAQResponse(message);
    
    return {
      message: faqResponse.answer,
      conversationId: this.conversationId || '',
      actions: faqResponse.actions || [],
      intent: { name: 'faq', confidence: 0.8, category: 'faq' }
    };
  }

  // Helper methods for response formatting and additional functionality
  private async handleAmbiguousQuery(session: ConversationState, message: string): Promise<SensayChatResponse> {
    return {
      message: "I'd be happy to help! Could you tell me more about what you're looking for? Are you interested in finding properties, getting a valuation, or learning about market trends?",
      conversationId: this.conversationId || '',
      actions: [
        { type: 'viewProperty', data: {}, label: '🔍 Find Properties', priority: 'medium' },
        { type: 'getValuation', data: {}, label: '💰 Get Valuation', priority: 'medium' },
        { type: 'marketInsights', data: {}, label: '📈 Market Insights', priority: 'medium' }
      ],
      intent: { name: 'clarification', confidence: 0.5, category: 'faq' }
    };
  }

  private async handleGeneralQuery(session: ConversationState, message: string): Promise<SensayChatResponse> {
    return {
      message: "I'm here to help with all your real estate needs! I can help you find properties, get valuations, schedule viewings, and provide market insights. What would you like to know?",
      conversationId: this.conversationId || '',
      actions: [
        { type: 'viewProperty', data: {}, label: '🔍 Property Search', priority: 'medium' },
        { type: 'getValuation', data: {}, label: '💰 Property Valuation', priority: 'medium' },
        { type: 'marketInsights', data: {}, label: '📊 Market Data', priority: 'low' }
      ],
      intent: { name: 'general', confidence: 0.6, category: 'faq' }
    };
  }

  private async generateBookingOptions(property: PropertyListing): Promise<any[]> {
    // Generate booking options based on property availability
    return await this.propertyIntelligence.generateBookingOptions(property);
  }

  private async getFAQResponse(message: string): Promise<{ answer: string; actions?: SensayAction[] }> {
    // Simple FAQ responses - in production, integrate with knowledge base
    const faqResponses: Record<string, string> = {
      'how does propguard work': 'PropGuard AI uses advanced machine learning to analyze property data, environmental risks, and market trends to provide accurate valuations and risk assessments.',
      'what is apra compliance': 'APRA CPS 230 compliance ensures our property valuations meet Australian banking regulatory standards for risk assessment and lending decisions.',
      'how accurate are valuations': 'Our AI-powered valuations achieve 92% accuracy compared to actual sale prices, using real-time market data and comprehensive risk analysis.',
      'what environmental risks': 'We assess flood risk, fire risk, coastal erosion, and other environmental factors using NASA data and climate projections.',
      'how to schedule viewing': 'You can schedule virtual or in-person viewings directly through our chat interface. Just let me know which property interests you!'
    };

    const messageLower = message.toLowerCase();
    for (const [key, answer] of Object.entries(faqResponses)) {
      if (messageLower.includes(key)) {
        return { answer };
      }
    }

    return {
      answer: "I'd be happy to help with that! Could you provide more details about your question? I can help with property searches, valuations, scheduling, and general real estate information.",
      actions: [
        { type: 'viewProperty', data: {}, label: 'Search Properties', priority: 'medium' },
        { type: 'getValuation', data: {}, label: 'Get Valuation', priority: 'medium' }
      ]
    };
  }

  private updateSessionState(session: ConversationState, intentAnalysis: any, response: SensayChatResponse): void {
    session.interactionCount += 1;
    
    // Update user preferences based on entities
    if (intentAnalysis.entities) {
      this.updateUserPreferences(session, intentAnalysis.entities);
    }
  }

  private updateUserPreferences(session: ConversationState, entities: Record<string, any>): void {
    if (!session.userPreferences) {
      session.userPreferences = {};
    }

    if (entities.budget && !session.userPreferences.budgetMax) {
      session.userPreferences.budgetMax = entities.budget;
    }

    if (entities.location) {
      session.userPreferences.preferredLocations = session.userPreferences.preferredLocations || [];
      if (!session.userPreferences.preferredLocations.includes(entities.location)) {
        session.userPreferences.preferredLocations.push(entities.location);
      }
    }

    if (entities.propertyType) {
      session.userPreferences.propertyTypes = session.userPreferences.propertyTypes || [];
      if (!session.userPreferences.propertyTypes.includes(entities.propertyType)) {
        session.userPreferences.propertyTypes.push(entities.propertyType);
      }
    }

    if (entities.bedrooms) {
      session.userPreferences.bedrooms = entities.bedrooms;
    }
  }

  // Response formatting methods
  private formatPropertySearchResponse(properties: PropertyListing[], entities: Record<string, any>): string {
    if (properties.length === 0) {
      return "I couldn't find any properties matching your criteria. Would you like to adjust your search parameters?";
    }

    const topProperty = properties[0];
    let message = `I found ${properties.length} properties that match your criteria. Here's the top match:\n\n`;
    message += `🏠 **${topProperty.address}**\n`;
    message += `💰 **Price:** $${topProperty.price.toLocaleString()}\n`;
    message += `🛏️ **Details:** ${topProperty.bedrooms} bed, ${topProperty.bathrooms} bath, ${topProperty.squareFeet} sqft\n`;
    message += `⚠️ **Risk Score:** ${(topProperty.riskScore * 100).toFixed(0)}/100\n`;
    message += `📈 **Market Trend:** ${topProperty.marketTrend}\n\n`;
    
    if (properties.length > 1) {
      message += `I have ${properties.length - 1} more matches for you to review. Would you like to see them?`;
    }

    return message;
  }

  private formatValuationResponse(valuation: any): string {
    let message = `🏠 **Property Valuation Report**\n\n`;
    message += `💰 **Estimated Value:** $${valuation.estimatedValue.toLocaleString()}\n`;
    message += `📊 **Confidence Score:** ${(valuation.confidenceScore * 100).toFixed(0)}%\n`;
    message += `⚠️ **Overall Risk:** ${(valuation.riskAnalysis.overallRisk * 100).toFixed(0)}/100\n\n`;
    
    message += `**Risk Breakdown:**\n`;
    message += `• Flood Risk: ${(valuation.riskAnalysis.floodRisk * 100).toFixed(0)}%\n`;
    message += `• Fire Risk: ${(valuation.riskAnalysis.fireRisk * 100).toFixed(0)}%\n`;
    message += `• Market Risk: ${(valuation.riskAnalysis.marketRisk * 100).toFixed(0)}%\n\n`;
    
    message += `**Investment Potential:** ${valuation.investmentPotential.score}/100\n`;
    message += `*Powered by PropGuard AI's advanced analysis*`;

    return message;
  }

  private formatMarketInsightsResponse(marketData: any, location: string): string {
    let message = `📊 **Market Insights for ${location}**\n\n`;
    message += `💰 **Average Price:** $${marketData.averagePrice.toLocaleString()}\n`;
    message += `📈 **Price Change:** ${marketData.priceChange > 0 ? '+' : ''}${marketData.priceChange}%\n`;
    message += `📊 **Volume Change:** ${marketData.volumeChange > 0 ? '+' : ''}${marketData.volumeChange}%\n`;
    message += `🎯 **Market Sentiment:** ${marketData.marketSentiment}\n`;
    message += `⚠️ **Risk Trend:** ${marketData.riskTrend}\n\n`;
    
    message += `**Top Features in Demand:**\n`;
    marketData.topFeatures.slice(0, 3).forEach((feature: string, index: number) => {
      message += `${index + 1}. ${feature}\n`;
    });

    return message;
  }

  private formatLeadQualificationResponse(leadScore: number, session: ConversationState): string {
    const level = leadScore >= 0.8 ? 'Premium' : leadScore >= 0.6 ? 'High' : leadScore >= 0.4 ? 'Medium' : 'Low';
    
    let message = `📋 **Lead Qualification Complete**\n\n`;
    message += `🎯 **Qualification Level:** ${level}\n`;
    message += `📊 **Lead Score:** ${Math.round(leadScore * 100)}/100\n`;
    message += `💬 **Interactions:** ${session.interactionCount}\n`;
    message += `🕒 **Session Duration:** ${Math.round((Date.now() - session.sessionStart.getTime()) / (1000 * 60))} minutes\n\n`;
    
    if (level === 'Premium' || level === 'High') {
      message += `🎉 **Great news!** You're a highly qualified lead. A senior agent will contact you shortly with personalized recommendations.`;
    } else if (level === 'Medium') {
      message += `👍 **Good potential!** I'll send you some market insights and property matches to help with your search.`;
    } else {
      message += `📚 **Getting started!** I'll provide you with helpful resources and market information to guide your property journey.`;
    }

    return message;
  }

  private generatePropertyActions(properties: PropertyListing[]): SensayAction[] {
    const actions: SensayAction[] = [];
    
    if (properties.length > 0) {
      actions.push({
        type: 'viewProperty',
        data: { propertyId: properties[0].id },
        label: '🏠 View Property Details',
        priority: 'high'
      });
      
      actions.push({
        type: 'bookTour',
        data: { propertyId: properties[0].id },
        label: '📅 Schedule Viewing',
        priority: 'high'
      });
      
      actions.push({
        type: 'getValuation',
        data: { address: properties[0].address },
        label: '💰 Get Valuation',
        priority: 'medium'
      });
    }

    if (properties.length > 1) {
      actions.push({
        type: 'viewProperty',
        data: { showAll: true },
        label: `📋 View All ${properties.length} Properties`,
        priority: 'medium'
      });
    }

    return actions;
  }

  async getConversationHistory(): Promise<SensayMessage[]> {
    if (!this.conversationId) return [];

    try {
      const response = await fetch(`${sensayEndpoints.conversations}/${this.conversationId}`, {
        headers: {
          'Authorization': `Bearer ${sensayConfig.apiKey}`,
        },
      });

      if (!response.ok) return [];

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return [];
    }
  }

  resetConversation(): void {
    this.conversationId = null;
  }
}

export const sensayService = new SensayService();
