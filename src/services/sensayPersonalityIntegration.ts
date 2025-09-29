/**
 * PropGuard AI Sensay Personality Integration Service
 * 
 * Integrates the personality engine with the Sensay API to provide
 * personalized, emotionally intelligent responses for real estate interactions.
 */

import { SensayComprehensiveAPI, PropGuardSensayWrapper } from './sensayComprehensiveAPI';
import { 
  sensayPersonalityEngine, 
  PersonalityResponse, 
  UserProfile, 
  ConversationContext 
} from './sensayPersonalityEngine';
import { SENSAY_PERSONALITY_CONFIG } from '@/data/sensayPersonalityTraining';

// ============================================================================
// INTERFACES AND TYPES
// ============================================================================

export interface EnhancedSensayRequest {
  userId: string;
  message: string;
  context?: {
    platform?: string;
    language?: string;
    userType?: string;
    conversationId?: string;
    previousMessages?: Array<{
      role: 'user' | 'assistant';
      content: string;
      timestamp: Date;
    }>;
  };
}

export interface EnhancedSensayResponse {
  content: string;
  personality: PersonalityResponse;
  sensay: {
    conversationUUID?: string;
    confidence: number;
    metadata?: any;
  };
  actions: {
    immediate: string[];
    followUp: string[];
    scheduled: string[];
  };
  analytics: {
    userType: string;
    emotionalState: string;
    conversationStage: string;
    satisfactionPrediction: number;
  };
}

export interface PropertyAnalysisRequest {
  userId: string;
  address: string;
  analysisType: 'valuation' | 'risk' | 'market' | 'comprehensive';
  context?: {
    userType?: string;
    urgency?: string;
    language?: string;
  };
}

export interface PropertyAnalysisResponse {
  analysis: any;
  personality: PersonalityResponse;
  recommendations: string[];
  nextSteps: string[];
  riskMitigation?: string[];
}

// ============================================================================
// MAIN INTEGRATION SERVICE CLASS
// ============================================================================

export class SensayPersonalityIntegration {
  private sensayAPI: SensayComprehensiveAPI;
  private propGuardWrapper: PropGuardSensayWrapper;
  private personalityEngine: typeof sensayPersonalityEngine;

  constructor() {
    this.sensayAPI = new SensayComprehensiveAPI();
    this.propGuardWrapper = new PropGuardSensayWrapper();
    this.personalityEngine = sensayPersonalityEngine;
  }

  // ============================================================================
  // ENHANCED CHAT COMPLETION WITH PERSONALITY
  // ============================================================================

  /**
   * Generate enhanced chat completion with personality adaptation
   */
  public async generateEnhancedChatCompletion(
    request: EnhancedSensayRequest
  ): Promise<EnhancedSensayResponse> {
    try {
      const { userId, message, context = {} } = request;

      // Determine user type if not provided
      const userType = context.userType || await this.detectUserType(userId, message);
      
      // Create or update user profile
      const userProfile = this.personalityEngine.createUserProfile(
        userId,
        userType as any,
        context.language || 'en',
        context.platform || 'web'
      );

      // Analyze message intent and emotional state
      const intent = await this.analyzeIntent(message, userProfile);
      const conversationContext = await this.buildConversationContext(
        userId, 
        message, 
        intent, 
        context
      );

      // Generate personality-adapted response
      const personalityResponse = this.personalityEngine.generatePersonalizedResponse(
        userId,
        message,
        intent,
        conversationContext
      );

      // Generate Sensay API response
      const sensayResponse = await this.generateSensayResponse(
        message,
        userProfile,
        personalityResponse,
        context.conversationId
      );

      // Determine actions based on intent and personality
      const actions = await this.determineActions(intent, personalityResponse, userProfile);

      // Generate analytics insights
      const analytics = this.generateAnalytics(userProfile, personalityResponse, intent);

      return {
        content: personalityResponse.content,
        personality: personalityResponse,
        sensay: {
          conversationUUID: sensayResponse.conversationUUID,
          confidence: sensayResponse.confidence || 0.8,
          metadata: sensayResponse.messageMetadata
        },
        actions,
        analytics
      };

    } catch (error) {
      console.error('Enhanced chat completion error:', error);
      throw new Error(`Failed to generate enhanced response: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Stream enhanced chat completion for real-time responses
   */
  public async *streamEnhancedChatCompletion(
    request: EnhancedSensayRequest
  ): AsyncGenerator<Partial<EnhancedSensayResponse>> {
    try {
      const { userId, message, context = {} } = request;

      // Get initial personality response
      const userType = context.userType || await this.detectUserType(userId, message);
      const userProfile = this.personalityEngine.createUserProfile(
        userId,
        userType as any,
        context.language || 'en',
        context.platform || 'web'
      );

      const intent = await this.analyzeIntent(message, userProfile);
      const personalityResponse = this.personalityEngine.generatePersonalizedResponse(
        userId,
        message,
        intent
      );

      // Stream Sensay response with personality adaptation
      const sensayRequest = {
        content: this.adaptMessageForSensay(message, personalityResponse),
        source: context.platform || 'web'
      };

      let streamedContent = '';
      
      for await (const chunk of this.propGuardWrapper.streamPropertyAnalysis(
        message,
        intent.includes('property') ? 'valuation' : 'market'
      )) {
        streamedContent += chunk;
        
        yield {
          content: this.adaptStreamedContent(chunk, personalityResponse),
          personality: {
            ...personalityResponse,
            content: streamedContent
          },
          actions: {
            immediate: ['continue_streaming'],
            followUp: [],
            scheduled: []
          }
        };
      }

      // Final response with complete content
      yield {
        content: streamedContent,
        personality: {
          ...personalityResponse,
          content: streamedContent
        },
        actions: await this.determineActions(intent, personalityResponse, userProfile),
        analytics: this.generateAnalytics(userProfile, personalityResponse, intent)
      };

    } catch (error) {
      console.error('Streaming enhanced chat completion error:', error);
      yield {
        content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
        personality: {
          content: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment.',
          tone: SENSAY_PERSONALITY_CONFIG.defaultTone,
          emotionalContext: { stress: 'low', urgency: 'low', uncertainty: 'low', excitement: 'low' },
          nextSteps: ['retry_request'],
          actions: ['apologize', 'suggest_retry'],
          confidence: 0.3,
          metadata: {
            userType: 'general',
            platform: 'web',
            language: 'en',
            responseTemplate: 'error_handling',
            emotionalAdaptation: 'apologetic'
          }
        }
      };
    }
  }

  // ============================================================================
  // PROPERTY-SPECIFIC PERSONALITY INTEGRATION
  // ============================================================================

  /**
   * Enhanced property analysis with personality adaptation
   */
  public async generatePersonalizedPropertyAnalysis(
    request: PropertyAnalysisRequest
  ): Promise<PropertyAnalysisResponse> {
    try {
      const { userId, address, analysisType, context = {} } = request;

      // Create user profile for property analysis
      const userType = context.userType || 'first_time_buyer';
      const userProfile = this.personalityEngine.createUserProfile(
        userId,
        userType as any,
        context.language || 'en',
        'web'
      );

      // Generate property analysis
      const analysis = await this.propGuardWrapper.analyzeProperty(
        address,
        analysisType as any
      );

      // Create personality-adapted explanation
      const personalityResponse = this.personalityEngine.generatePersonalizedResponse(
        userId,
        `Please analyze the property at ${address} for ${analysisType} analysis`,
        'property_analysis',
        {
          currentTopic: 'property_analysis',
          userIntent: analysisType,
          conversationStage: 'analysis',
          emotionalState: 'neutral',
          userType: userType,
          platform: 'web',
          language: context.language || 'en'
        }
      );

      // Generate personalized recommendations
      const recommendations = this.generatePropertyRecommendations(
        analysis,
        userProfile,
        analysisType
      );

      // Generate next steps
      const nextSteps = this.generatePropertyNextSteps(
        analysis,
        userProfile,
        analysisType
      );

      // Generate risk mitigation strategies if applicable
      const riskMitigation = analysisType === 'risk' || analysisType === 'comprehensive' 
        ? this.generateRiskMitigationStrategies(analysis, userProfile)
        : undefined;

      return {
        analysis,
        personality: personalityResponse,
        recommendations,
        nextSteps,
        riskMitigation
      };

    } catch (error) {
      console.error('Personalized property analysis error:', error);
      throw new Error(`Failed to generate personalized property analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  // ============================================================================
  // MULTILINGUAL AND CULTURAL ADAPTATION
  // ============================================================================

  /**
   * Generate response in user's preferred language with cultural adaptation
   */
  public async generateLocalizedResponse(
    userId: string,
    message: string,
    language: string,
    context?: any
  ): Promise<EnhancedSensayResponse> {
    // Get language-specific settings
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[language];
    
    if (!languageSettings) {
      throw new Error(`Language ${language} not supported`);
    }

    // Create user profile with language preference
    const userProfile = this.personalityEngine.createUserProfile(
      userId,
      'first_time_buyer',
      language,
      'web'
    );

    // Translate message if needed
    const translatedMessage = await this.translateMessage(message, language);
    
    // Generate personality response
    const personalityResponse = this.personalityEngine.generatePersonalizedResponse(
      userId,
      translatedMessage,
      'general',
      context
    );

    // Apply cultural adaptations
    const culturallyAdaptedContent = this.applyCulturalAdaptations(
      personalityResponse.content,
      languageSettings
    );

    return {
      content: culturallyAdaptedContent,
      personality: {
        ...personalityResponse,
        content: culturallyAdaptedContent
      },
      sensay: {
        confidence: personalityResponse.confidence
      },
      actions: {
        immediate: ['provide_localized_response'],
        followUp: ['cultural_followup'],
        scheduled: []
      },
      analytics: {
        userType: userProfile.type,
        emotionalState: 'neutral',
        conversationStage: 'greeting',
        satisfactionPrediction: 0.8
      }
    };
  }

  // ============================================================================
  // USER TYPE DETECTION AND ADAPTATION
  // ============================================================================

  /**
   * Detect user type based on message content and interaction history
   */
  private async detectUserType(userId: string, message: string): Promise<string> {
    const messageLower = message.toLowerCase();
    
    // Define user type indicators
    const userTypeIndicators = {
      first_time_buyer: [
        'first time', 'new to', 'never bought', 'don\'t know', 'help me understand',
        'what do i need', 'how does this work', 'beginner'
      ],
      investor: [
        'roi', 'return on investment', 'capital growth', 'rental yield', 'portfolio',
        'investment property', 'cash flow', 'appreciation', 'market analysis'
      ],
      seller: [
        'selling my', 'want to sell', 'market value', 'how much is my', 'time to sell',
        'preparing to sell', 'staging', 'listing'
      ],
      agent: [
        'client', 'listing', 'mls', 'commission', 'buyer\'s agent', 'seller\'s agent',
        'real estate agent', 'property management'
      ],
      renter: [
        'renting', 'lease', 'apartment', 'rental', 'tenant', 'landlord', 'deposit',
        'rental agreement', 'moving in'
      ],
      professional: [
        'compliance', 'regulatory', 'audit', 'legal', 'due diligence', 'risk assessment',
        'portfolio management', 'institutional'
      ]
    };

    // Score message against each user type
    let bestMatch = 'first_time_buyer';
    let highestScore = 0;

    for (const [userType, indicators] of Object.entries(userTypeIndicators)) {
      const score = indicators.reduce((acc, indicator) => {
        return acc + (messageLower.includes(indicator) ? 1 : 0);
      }, 0);

      if (score > highestScore) {
        highestScore = score;
        bestMatch = userType;
      }
    }

    return bestMatch;
  }

  /**
   * Analyze message intent using NLP and context
   */
  private async analyzeIntent(message: string, userProfile: UserProfile): Promise<string> {
    const messageLower = message.toLowerCase();
    
    // Intent patterns
    const intentPatterns = {
      property_search: ['looking for', 'find', 'search', 'available', 'properties', 'homes'],
      risk_assessment: ['risk', 'safe', 'danger', 'flood', 'fire', 'environmental', 'hazard'],
      market_analysis: ['market', 'trends', 'prices', 'comparison', 'growth', 'investment'],
      schedule_viewing: ['schedule', 'book', 'viewing', 'tour', 'visit', 'appointment'],
      lead_qualification: ['buy', 'sell', 'interested', 'considering', 'thinking about'],
      document_help: ['documents', 'paperwork', 'application', 'forms', 'requirements'],
      general_inquiry: ['help', 'question', 'information', 'explain', 'how does']
    };

    // Score message against intent patterns
    let bestIntent = 'general_inquiry';
    let highestScore = 0;

    for (const [intent, patterns] of Object.entries(intentPatterns)) {
      const score = patterns.reduce((acc, pattern) => {
        return acc + (messageLower.includes(pattern) ? 1 : 0);
      }, 0);

      if (score > highestScore) {
        highestScore = score;
        bestIntent = intent;
      }
    }

    return bestIntent;
  }

  /**
   * Build conversation context from current interaction
   */
  private async buildConversationContext(
    userId: string,
    message: string,
    intent: string,
    context: any
  ): Promise<ConversationContext> {
    const userProfile = this.personalityEngine.getUserProfile(userId);
    
    return {
      currentTopic: intent,
      userIntent: intent,
      conversationStage: this.determineConversationStage(intent, userProfile),
      emotionalState: this.personalityEngine['detectEmotionalState'](message),
      userType: userProfile.type,
      platform: context.platform || 'web',
      language: context.language || 'en'
    };
  }

  /**
   * Determine conversation stage based on intent and history
   */
  private determineConversationStage(intent: string, userProfile: UserProfile): string {
    const historyLength = userProfile.interactionHistory.length;
    
    if (historyLength === 0) return 'greeting';
    if (intent === 'lead_qualification') return 'qualification';
    if (intent.includes('analysis') || intent.includes('risk')) return 'analysis';
    if (intent.includes('schedule') || intent.includes('viewing')) return 'scheduling';
    if (historyLength > 5) return 'followup';
    
    return 'greeting';
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  /**
   * Generate Sensay API response
   */
  private async generateSensayResponse(
    message: string,
    userProfile: UserProfile,
    personalityResponse: PersonalityResponse,
    conversationId?: string
  ): Promise<any> {
    try {
      const request = {
        content: message,
        source: userProfile.platform,
        store: true
      };

      return await this.sensayAPI.generateChatCompletion(
        process.env.SENSAY_REPLICA_ID || 'default-replica-id',
        request
      );
    } catch (error) {
      console.error('Sensay API error:', error);
      return {
        content: personalityResponse.content,
        confidence: 0.7
      };
    }
  }

  /**
   * Adapt message for Sensay API
   */
  private adaptMessageForSensay(message: string, personalityResponse: PersonalityResponse): string {
    // Add context about user type and emotional state
    return `${message} [User Type: ${personalityResponse.metadata.userType}, Emotional State: ${personalityResponse.metadata.emotionalAdaptation}]`;
  }

  /**
   * Adapt streamed content with personality
   */
  private adaptStreamedContent(chunk: string, personalityResponse: PersonalityResponse): string {
    // Apply tone and style to streamed content
    return chunk;
  }

  /**
   * Determine actions based on intent and personality
   */
  private async determineActions(
    intent: string,
    personalityResponse: PersonalityResponse,
    userProfile: UserProfile
  ): Promise<any> {
    const actions = {
      immediate: personalityResponse.actions,
      followUp: [],
      scheduled: []
    };

    // Add intent-specific actions
    switch (intent) {
      case 'property_search':
        actions.followUp.push('send_property_recommendations', 'schedule_viewing_options');
        break;
      case 'risk_assessment':
        actions.followUp.push('provide_mitigation_strategies', 'send_insurance_quotes');
        break;
      case 'lead_qualification':
        actions.scheduled.push('follow_up_qualification', 'send_market_analysis');
        break;
    }

    return actions;
  }

  /**
   * Generate analytics insights
   */
  private generateAnalytics(
    userProfile: UserProfile,
    personalityResponse: PersonalityResponse,
    intent: string
  ): any {
    return {
      userType: userProfile.type,
      emotionalState: personalityResponse.metadata.emotionalAdaptation,
      conversationStage: 'active',
      satisfactionPrediction: personalityResponse.confidence
    };
  }

  /**
   * Generate property recommendations
   */
  private generatePropertyRecommendations(
    analysis: any,
    userProfile: UserProfile,
    analysisType: string
  ): string[] {
    const recommendations: string[] = [];

    // User type specific recommendations
    const userType = SENSAY_PERSONALITY_CONFIG.userTypes[userProfile.type];
    
    if (userProfile.type === 'first_time_buyer') {
      recommendations.push('Consider getting pre-approved for financing');
      recommendations.push('Schedule a professional inspection');
      recommendations.push('Research the neighborhood thoroughly');
    } else if (userProfile.type === 'investor') {
      recommendations.push('Calculate potential rental yield');
      recommendations.push('Analyze market trends and growth potential');
      recommendations.push('Consider tax implications and deductions');
    }

    return recommendations;
  }

  /**
   * Generate property next steps
   */
  private generatePropertyNextSteps(
    analysis: any,
    userProfile: UserProfile,
    analysisType: string
  ): string[] {
    return [
      'Review detailed analysis report',
      'Schedule property viewing',
      'Consult with real estate professional',
      'Consider financing options'
    ];
  }

  /**
   * Generate risk mitigation strategies
   */
  private generateRiskMitigationStrategies(analysis: any, userProfile: UserProfile): string[] {
    return [
      'Obtain comprehensive insurance coverage',
      'Implement recommended safety measures',
      'Consider professional risk assessment',
      'Explore government assistance programs'
    ];
  }

  /**
   * Apply cultural adaptations to content
   */
  private applyCulturalAdaptations(content: string, languageSettings: any): string {
    // Apply cultural adaptations based on language settings
    if (languageSettings.culturalAdaptations.includes('Warmer, more personal communication')) {
      content = `¡Hola! ${content}`;
    }
    
    return content;
  }

  /**
   * Translate message to target language
   */
  private async translateMessage(message: string, language: string): Promise<string> {
    // In a real implementation, this would use a translation service
    // For now, return the original message
    return message;
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const sensayPersonalityIntegration = new SensayPersonalityIntegration();

export default sensayPersonalityIntegration;
