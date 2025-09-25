// Chatflow Quality Engine for PropGuard AI with Sensay Integration
import { sensayAPI, SensayResponse, SensayContext } from '@/services/api/sensay';
import { llmAPI } from '@/services/api/llm';

export enum ConversationState {
  GREETING = 'greeting',
  NEEDS_ASSESSMENT = 'needs_assessment',
  PROPERTY_SEARCH = 'property_search',
  VALUATION_REQUEST = 'valuation_request',
  RISK_ASSESSMENT = 'risk_assessment',
  SCHEDULING = 'scheduling',
  FOLLOW_UP = 'follow_up',
  COMPLEX_QUERY = 'complex_query',
  ERROR_RECOVERY = 'error_recovery'
}

export enum FlowQualityScore {
  EXCELLENT = 90,
  GOOD = 70,
  FAIR = 50,
  POOR = 30
}

export interface ConversationMetrics {
  responseTime: number;
  messageLength: number;
  userSentiment: number;
  engagementLevel: number;
  completionRate: number;
  clarificationRequests: number;
  confidenceScore: number;
  personalizationScore: number;
}

export interface UserContext {
  userId: string;
  currentState: ConversationState;
  previousStates: ConversationState[];
  preferences: Record<string, any>;
  interactionHistory: Array<{
    timestamp: Date;
    userMessage: string;
    botResponse: string;
    state: ConversationState;
    qualityScore: number;
  }>;
  lastActivity: Date;
  conversationStart: Date;
  sessionId: string;
  language: string;
}

export interface QualityResponse {
  message: string;
  quickActions?: Array<{
    action: string;
    label: string;
    icon?: string;
  }>;
  richMedia?: {
    type: 'image' | 'video' | 'document' | 'map';
    url: string;
    caption?: string;
  };
  fallbackOptions?: Array<{
    type: 'clarification' | 'information_gap' | 'alternative';
    message: string;
    options?: string[];
  }>;
  metadata?: {
    confidence: number;
    processingTime: number;
    model: string;
  };
}

export interface MessageAnalysis {
  clarityScore: number;
  intentConfidence: number;
  sentimentScore: number;
  completenessScore: number;
  potentialAmbiguities: string[];
  detectedIntent: string;
  entities: Array<{
    type: string;
    value: string;
    confidence: number;
  }>;
}

export class ChatFlowQualityEngine {
  private sensayAPI: typeof sensayAPI;
  private llmAPI: typeof llmAPI;
  private userContexts: Map<string, UserContext> = new Map();
  private flowTemplates: Map<ConversationState, any> = new Map();
  private qualityMetrics: Map<string, ConversationMetrics[]> = new Map();
  private t: (key: string, params?: Record<string, string | number>) => string;

  constructor(translationFunction: (key: string, params?: Record<string, string | number>) => string) {
    this.sensayAPI = sensayAPI;
    this.llmAPI = llmAPI;
    this.t = translationFunction;
    this.initializeFlowTemplates();
  }

  private initializeFlowTemplates(): void {
    // Define optimal conversation flow templates for each state
    this.flowTemplates.set(ConversationState.GREETING, {
      requiredElements: ['welcome_message', 'agenda_setting', 'quick_actions'],
      optimalResponseTime: 2.0,
      expectedUserResponseTypes: ['property_search', 'valuation', 'general_help'],
      template: {
        message: this.t('chatflow.greeting.welcome'),
        services: [
          this.t('chatflow.greeting.services.propertySearch'),
          this.t('chatflow.greeting.services.valuations'),
          this.t('chatflow.greeting.services.riskAssessment'),
          this.t('chatflow.greeting.services.scheduling'),
          this.t('chatflow.greeting.services.marketInsights')
        ],
        prompt: this.t('chatflow.greeting.prompt'),
        quickActions: [
          { action: 'property_search', label: this.t('chatflow.greeting.quickActions.propertySearch') },
          { action: 'get_valuation', label: this.t('chatflow.greeting.quickActions.getValuation') },
          { action: 'market_insights', label: this.t('chatflow.greeting.quickActions.marketInsights') },
          { action: 'risk_assessment', label: this.t('chatflow.greeting.quickActions.riskAssessment') }
        ]
      }
    });

    this.flowTemplates.set(ConversationState.NEEDS_ASSESSMENT, {
      requiredElements: ['qualification_questions', 'progressive_disclosure', 'context_preservation'],
      optimalResponseTime: 3.0,
      expectedUserResponseTypes: ['budget', 'location', 'property_type'],
      template: {
        message: this.t('chatflow.needsAssessment.prompt'),
        questions: [
          this.t('chatflow.needsAssessment.questions.budget'),
          this.t('chatflow.needsAssessment.questions.location'),
          this.t('chatflow.needsAssessment.questions.propertyType'),
          this.t('chatflow.needsAssessment.questions.timeline')
        ],
        progressiveDisclosure: true
      }
    });

    this.flowTemplates.set(ConversationState.PROPERTY_SEARCH, {
      requiredElements: ['personalized_results', 'rich_media', 'action_buttons'],
      optimalResponseTime: 5.0,
      expectedUserResponseTypes: ['property_selection', 'refinement', 'scheduling_request'],
      template: {
        message: this.t('chatflow.propertySearch.resultsFound'),
        actionButtons: [
          { action: 'schedule_viewing', label: this.t('chatflow.propertySearch.actionButtons.scheduleViewing') },
          { action: 'get_details', label: this.t('chatflow.propertySearch.actionButtons.getDetails') },
          { action: 'risk_report', label: this.t('chatflow.propertySearch.actionButtons.riskReport') },
          { action: 'get_valuation', label: this.t('chatflow.propertySearch.actionButtons.getValuation') }
        ]
      }
    });
  }

  async processMessage(
    userId: string, 
    message: string, 
    channel: string = 'web'
  ): Promise<{
    response: QualityResponse;
    qualityMetrics: ConversationMetrics;
    suggestedActions: string[];
    conversationState: ConversationState;
    messageAnalysis: MessageAnalysis;
  }> {
    const startTime = Date.now();
    
    // Get or create user context
    const userContext = this.getUserContext(userId);
    
    // Analyze message quality and intent
    const messageAnalysis = await this.analyzeMessageQuality(message, userContext);
    
    // Determine conversation state transition
    const newState = this.determineStateTransition(userContext.currentState, messageAnalysis);
    
    // Generate quality-controlled response
    const response = await this.generateQualityResponse(
      userContext, message, newState, messageAnalysis
    );
    
    // Calculate response metrics
    const responseTime = (Date.now() - startTime) / 1000;
    const qualityMetrics = this.calculateFlowQuality(userContext, response, responseTime, messageAnalysis);
    
    // Update user context
    this.updateUserContext(userId, newState, message, response, qualityMetrics);
    
    return {
      response,
      qualityMetrics,
      suggestedActions: this.getSuggestedActions(newState),
      conversationState: newState,
      messageAnalysis
    };
  }

  private getUserContext(userId: string): UserContext {
    if (!this.userContexts.has(userId)) {
      this.userContexts.set(userId, {
        userId,
        currentState: ConversationState.GREETING,
        previousStates: [],
        preferences: {},
        interactionHistory: [],
        lastActivity: new Date(),
        conversationStart: new Date(),
        sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        language: 'en'
      });
    }
    return this.userContexts.get(userId)!;
  }

  private async analyzeMessageQuality(message: string, userContext: UserContext): Promise<MessageAnalysis> {
    return {
      clarityScore: this.calculateMessageClarity(message),
      intentConfidence: await this.detectIntentConfidence(message),
      sentimentScore: this.analyzeSentiment(message),
      completenessScore: this.assessMessageCompleteness(message, userContext),
      potentialAmbiguities: this.identifyAmbiguities(message),
      detectedIntent: await this.detectIntent(message),
      entities: await this.extractEntities(message)
    };
  }

  private calculateMessageClarity(message: string): number {
    const words = message.split(' ');
    const sentenceCount = (message.match(/[.!?]/g) || []).length;
    
    if (words.length === 0) return 0.0;
    
    const avgSentenceLength = words.length / Math.max(sentenceCount, 1);
    let clarityScore = 100.0;
    
    // Penalize very short or very long messages
    if (words.length < 3) clarityScore -= 30;
    else if (words.length > 50) clarityScore -= 20;
    
    // Penalize run-on sentences
    if (avgSentenceLength > 20) clarityScore -= 15;
    
    return Math.max(0.0, Math.min(100.0, clarityScore));
  }

  private async detectIntentConfidence(message: string): Promise<number> {
    try {
      // Use Sensay API for intent detection
      const response = await this.sensayAPI.chat(message, {
        sessionId: 'intent_detection',
        userPreferences: { intentAnalysis: true }
      });
      
      return response.confidence || 0.7;
    } catch (error) {
      // Fallback to local analysis
      return this.localIntentAnalysis(message);
    }
  }

  private localIntentAnalysis(message: string): number {
    const lowerMessage = message.toLowerCase();
    
    // High confidence keywords
    const highConfidenceKeywords = [
      'property', 'house', 'apartment', 'condo', 'valuation', 'price',
      'budget', 'location', 'bedroom', 'bathroom', 'schedule', 'viewing'
    ];
    
    const keywordMatches = highConfidenceKeywords.filter(keyword => 
      lowerMessage.includes(keyword)
    ).length;
    
    return Math.min(0.9, 0.3 + (keywordMatches * 0.1));
  }

  private analyzeSentiment(message: string): number {
    // Simple sentiment analysis based on keywords
    const positiveWords = ['good', 'great', 'excellent', 'love', 'perfect', 'amazing', 'wonderful'];
    const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disappointed', 'frustrated', 'angry'];
    
    const words = message.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.includes(word)).length;
    const negativeCount = words.filter(word => negativeWords.includes(word)).length;
    
    if (positiveCount === 0 && negativeCount === 0) return 0.5; // Neutral
    
    return Math.max(0, Math.min(1, 0.5 + (positiveCount - negativeCount) * 0.2));
  }

  private assessMessageCompleteness(message: string, userContext: UserContext): number {
    const currentState = userContext.currentState;
    let completenessScore = 100.0;
    
    if (currentState === ConversationState.NEEDS_ASSESSMENT) {
      const requiredInfo = ['budget', 'location', 'property'];
      const missingInfo = requiredInfo.filter(info => 
        !message.toLowerCase().includes(info)
      );
      
      if (missingInfo.length > 0) {
        completenessScore -= (missingInfo.length * 25);
      }
    } else if (currentState === ConversationState.VALUATION_REQUEST) {
      if (!message.toLowerCase().includes('address') && 
          !message.toLowerCase().includes('property')) {
        completenessScore -= 50;
      }
    }
    
    return Math.max(0.0, completenessScore);
  }

  private identifyAmbiguities(message: string): string[] {
    const ambiguities: string[] = [];
    const ambiguousPhrases = [
      'maybe', 'possibly', 'i think', 'not sure', 'kind of', 
      'sort of', 'around', 'approximately', 'somewhere'
    ];
    
    for (const phrase of ambiguousPhrases) {
      if (message.toLowerCase().includes(phrase)) {
        ambiguities.push(phrase);
      }
    }
    
    // Check for vague references
    const vaguePronouns = ['it', 'that', 'this', 'they', 'them'];
    const words = message.toLowerCase().split(' ');
    const vagueCount = words.filter(word => vaguePronouns.includes(word)).length;
    
    if (vagueCount > 2) {
      ambiguities.push('vague_references');
    }
    
    return ambiguities;
  }

  private async detectIntent(message: string): Promise<string> {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('looking')) {
      return 'property_search';
    } else if (lowerMessage.includes('value') || lowerMessage.includes('worth') || lowerMessage.includes('price')) {
      return 'valuation_request';
    } else if (lowerMessage.includes('risk') || lowerMessage.includes('safe') || lowerMessage.includes('danger')) {
      return 'risk_assessment';
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('viewing') || lowerMessage.includes('appointment')) {
      return 'scheduling';
    } else if (lowerMessage.includes('market') || lowerMessage.includes('trend') || lowerMessage.includes('analysis')) {
      return 'market_insights';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
      return 'greeting';
    }
    
    return 'general_inquiry';
  }

  private async extractEntities(message: string): Promise<Array<{type: string, value: string, confidence: number}>> {
    const entities: Array<{type: string, value: string, confidence: number}> = [];
    
    // Extract budget information
    const budgetMatch = message.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:million|k|thousand)?/i);
    if (budgetMatch) {
      entities.push({
        type: 'budget',
        value: budgetMatch[0],
        confidence: 0.8
      });
    }
    
    // Extract location information
    const locationPatterns = [
      /\b(?:in|at|near|around)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/g,
      /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:street|st|avenue|ave|road|rd|boulevard|blvd)/gi
    ];
    
    for (const pattern of locationPatterns) {
      const matches = message.match(pattern);
      if (matches) {
        matches.forEach(match => {
          entities.push({
            type: 'location',
            value: match.trim(),
            confidence: 0.7
          });
        });
      }
    }
    
    // Extract property type
    const propertyTypes = ['house', 'apartment', 'condo', 'townhouse', 'studio', 'loft', 'mansion'];
    for (const type of propertyTypes) {
      if (message.toLowerCase().includes(type)) {
        entities.push({
          type: 'property_type',
          value: type,
          confidence: 0.9
        });
      }
    }
    
    return entities;
  }

  private determineStateTransition(
    currentState: ConversationState, 
    messageAnalysis: MessageAnalysis
  ): ConversationState {
    const intentConfidence = messageAnalysis.intentConfidence;
    const detectedIntent = messageAnalysis.detectedIntent;
    
    const transitionRules: Record<ConversationState, Record<string, ConversationState>> = {
      [ConversationState.GREETING]: {
        'property_search': ConversationState.NEEDS_ASSESSMENT,
        'valuation_request': ConversationState.VALUATION_REQUEST,
        'risk_assessment': ConversationState.RISK_ASSESSMENT,
        'scheduling': ConversationState.SCHEDULING,
        'greeting': ConversationState.GREETING,
        'default': ConversationState.NEEDS_ASSESSMENT
      },
      [ConversationState.NEEDS_ASSESSMENT]: {
        'property_search': ConversationState.PROPERTY_SEARCH,
        'valuation_request': ConversationState.VALUATION_REQUEST,
        'default': ConversationState.NEEDS_ASSESSMENT
      },
      [ConversationState.PROPERTY_SEARCH]: {
        'scheduling': ConversationState.SCHEDULING,
        'valuation_request': ConversationState.VALUATION_REQUEST,
        'risk_assessment': ConversationState.RISK_ASSESSMENT,
        'property_search': ConversationState.PROPERTY_SEARCH,
        'default': ConversationState.PROPERTY_SEARCH
      },
      [ConversationState.VALUATION_REQUEST]: {
        'risk_assessment': ConversationState.RISK_ASSESSMENT,
        'scheduling': ConversationState.SCHEDULING,
        'property_search': ConversationState.PROPERTY_SEARCH,
        'default': ConversationState.VALUATION_REQUEST
      },
      [ConversationState.RISK_ASSESSMENT]: {
        'scheduling': ConversationState.SCHEDULING,
        'property_search': ConversationState.PROPERTY_SEARCH,
        'default': ConversationState.RISK_ASSESSMENT
      },
      [ConversationState.SCHEDULING]: {
        'follow_up': ConversationState.FOLLOW_UP,
        'property_search': ConversationState.PROPERTY_SEARCH,
        'default': ConversationState.SCHEDULING
      },
      [ConversationState.FOLLOW_UP]: {
        'property_search': ConversationState.PROPERTY_SEARCH,
        'greeting': ConversationState.GREETING,
        'default': ConversationState.FOLLOW_UP
      },
      [ConversationState.COMPLEX_QUERY]: {
        'property_search': ConversationState.PROPERTY_SEARCH,
        'valuation_request': ConversationState.VALUATION_REQUEST,
        'default': ConversationState.COMPLEX_QUERY
      },
      [ConversationState.ERROR_RECOVERY]: {
        'greeting': ConversationState.GREETING,
        'property_search': ConversationState.PROPERTY_SEARCH,
        'default': ConversationState.ERROR_RECOVERY
      }
    };
    
    const stateRules = transitionRules[currentState] || {};
    return stateRules[detectedIntent] || stateRules['default'] || currentState;
  }

  private async generateQualityResponse(
    userContext: UserContext,
    message: string,
    newState: ConversationState,
    messageAnalysis: MessageAnalysis
  ): Promise<QualityResponse> {
    const responseTemplate = this.getResponseTemplate(newState, messageAnalysis);
    const personalizedResponse = await this.personalizeResponse(
      responseTemplate, userContext, messageAnalysis
    );
    
    return this.enhanceResponseQuality(
      personalizedResponse, userContext, messageAnalysis
    );
  }

  private getResponseTemplate(state: ConversationState, messageAnalysis: MessageAnalysis): any {
    const template = this.flowTemplates.get(state);
    if (!template) {
      return {
        message: this.t('chatflow.fallbacks.noMatch'),
        quickActions: [
          { action: 'property_search', label: this.t('chatflow.greeting.quickActions.propertySearch') },
          { action: 'get_valuation', label: this.t('chatflow.greeting.quickActions.getValuation') }
        ]
      };
    }
    
    return template.template;
  }

  private async personalizeResponse(
    template: any,
    userContext: UserContext,
    messageAnalysis: MessageAnalysis
  ): Promise<QualityResponse> {
    let response: QualityResponse = {
      message: template.message,
      quickActions: template.quickActions || template.actionButtons,
      metadata: {
        confidence: messageAnalysis.intentConfidence,
        processingTime: 0,
        model: 'sensay_wisdom'
      }
    };
    
    // Add personalization based on user preferences
    if (userContext.preferences.name) {
      response.message = response.message.replace('Hello!', `Hello ${userContext.preferences.name}!`);
    }
    
    // Add contextual references
    if (userContext.interactionHistory.length > 0) {
      const lastInteraction = userContext.interactionHistory[userContext.interactionHistory.length - 1];
      if (lastInteraction.state !== userContext.currentState) {
        response.message = this.addTransitionSignal(response.message, userContext);
      }
    }
    
    return response;
  }

  private addTransitionSignal(message: string, userContext: UserContext): string {
    const previousState = userContext.previousStates[userContext.previousStates.length - 1];
    const currentState = userContext.currentState;
    
    const transitionSignals: Record<string, string> = {
      [`${ConversationState.GREETING}-${ConversationState.NEEDS_ASSESSMENT}`]: 
        this.t('chatflow.transitions.greetingToAssessment'),
      [`${ConversationState.NEEDS_ASSESSMENT}-${ConversationState.PROPERTY_SEARCH}`]: 
        this.t('chatflow.transitions.assessmentToSearch'),
      [`${ConversationState.PROPERTY_SEARCH}-${ConversationState.SCHEDULING}`]: 
        this.t('chatflow.transitions.searchToScheduling'),
      [`${ConversationState.PROPERTY_SEARCH}-${ConversationState.VALUATION_REQUEST}`]: 
        this.t('chatflow.transitions.searchToValuation'),
      [`${ConversationState.VALUATION_REQUEST}-${ConversationState.RISK_ASSESSMENT}`]: 
        this.t('chatflow.transitions.valuationToRisk')
    };
    
    const transitionKey = `${previousState}-${currentState}`;
    const signal = transitionSignals[transitionKey];
    
    if (signal) {
      return `${signal}\n\n${message}`;
    }
    
    return message;
  }

  private enhanceResponseQuality(
    response: QualityResponse,
    userContext: UserContext,
    messageAnalysis: MessageAnalysis
  ): QualityResponse {
    const enhanced = { ...response };
    
    // Add fallback options for low-confidence scenarios
    if (messageAnalysis.intentConfidence < 0.6) {
      enhanced.fallbackOptions = this.getFallbackOptions(messageAnalysis);
    }
    
    // Add rich media for property search
    if (userContext.currentState === ConversationState.PROPERTY_SEARCH) {
      enhanced.richMedia = {
        type: 'map',
        url: '/api/property-map',
        caption: 'Property locations on map'
      };
    }
    
    return enhanced;
  }

  private getFallbackOptions(messageAnalysis: MessageAnalysis): Array<{
    type: 'clarification' | 'information_gap' | 'alternative';
    message: string;
    options?: string[];
  }> {
    const fallbacks: Array<{
      type: 'clarification' | 'information_gap' | 'alternative';
      message: string;
      options?: string[];
    }> = [];
    
    if (messageAnalysis.potentialAmbiguities.includes('vague_references')) {
      fallbacks.push({
        type: 'clarification',
        message: this.t('chatflow.fallbacks.ambiguousReference'),
        options: ['The first property', 'The one with the garden', 'Another property']
      });
    }
    
    if (messageAnalysis.completenessScore < 70) {
      fallbacks.push({
        type: 'information_gap',
        message: this.t('chatflow.fallbacks.incompleteInfo'),
        options: [
          this.t('chatflow.needsAssessment.questions.budget'),
          this.t('chatflow.needsAssessment.questions.location'),
          this.t('chatflow.needsAssessment.questions.timeline')
        ]
      });
    }
    
    if (messageAnalysis.intentConfidence < 0.4) {
      fallbacks.push({
        type: 'alternative',
        message: this.t('chatflow.fallbacks.unclearIntent'),
        options: [
          this.t('chatflow.greeting.quickActions.propertySearch'),
          this.t('chatflow.greeting.quickActions.getValuation'),
          this.t('chatflow.greeting.quickActions.marketInsights')
        ]
      });
    }
    
    return fallbacks;
  }

  private calculateFlowQuality(
    userContext: UserContext,
    response: QualityResponse,
    responseTime: number,
    messageAnalysis: MessageAnalysis
  ): ConversationMetrics {
    return {
      responseTime,
      messageLength: response.message.length,
      userSentiment: messageAnalysis.sentimentScore,
      engagementLevel: this.calculateEngagementLevel(response),
      completionRate: this.calculateCompletionRate(userContext),
      clarificationRequests: messageAnalysis.potentialAmbiguities.length,
      confidenceScore: messageAnalysis.intentConfidence,
      personalizationScore: this.calculatePersonalizationScore(response, userContext)
    };
  }

  private calculateEngagementLevel(response: QualityResponse): number {
    let engagement = 50; // Base engagement
    
    // Increase engagement for interactive elements
    if (response.quickActions && response.quickActions.length > 0) {
      engagement += 20;
    }
    
    if (response.richMedia) {
      engagement += 15;
    }
    
    if (response.fallbackOptions && response.fallbackOptions.length > 0) {
      engagement += 10;
    }
    
    // Adjust based on message length (optimal range)
    const messageLength = response.message.length;
    if (messageLength >= 50 && messageLength <= 300) {
      engagement += 10;
    } else if (messageLength < 20 || messageLength > 500) {
      engagement -= 15;
    }
    
    return Math.max(0, Math.min(100, engagement));
  }

  private calculateCompletionRate(userContext: UserContext): number {
    if (userContext.interactionHistory.length === 0) return 100;
    
    const totalInteractions = userContext.interactionHistory.length;
    const completedStates = new Set(userContext.interactionHistory.map(h => h.state)).size;
    
    return (completedStates / totalInteractions) * 100;
  }

  private calculatePersonalizationScore(response: QualityResponse, userContext: UserContext): number {
    let score = 0;
    
    // Check for personalization elements
    if (userContext.preferences.name && response.message.includes(userContext.preferences.name)) {
      score += 30;
    }
    
    if (userContext.preferences.preferredLocations && 
        response.message.includes(userContext.preferences.preferredLocations[0])) {
      score += 25;
    }
    
    // Check for contextual references
    if (userContext.interactionHistory.length > 0) {
      const lastInteraction = userContext.interactionHistory[userContext.interactionHistory.length - 1];
      if (response.message.includes('previous') || response.message.includes('earlier')) {
        score += 20;
      }
    }
    
    return Math.min(100, score);
  }

  private updateUserContext(
    userId: string,
    newState: ConversationState,
    userMessage: string,
    botResponse: QualityResponse,
    qualityMetrics: ConversationMetrics
  ): void {
    const userContext = this.getUserContext(userId);
    
    // Update state
    userContext.previousStates.push(userContext.currentState);
    userContext.currentState = newState;
    userContext.lastActivity = new Date();
    
    // Add to interaction history
    userContext.interactionHistory.push({
      timestamp: new Date(),
      userMessage,
      botResponse: botResponse.message,
      state: newState,
      qualityScore: qualityMetrics.confidenceScore
    });
    
    // Store quality metrics
    if (!this.qualityMetrics.has(userId)) {
      this.qualityMetrics.set(userId, []);
    }
    this.qualityMetrics.get(userId)!.push(qualityMetrics);
    
    // Update user preferences based on entities
    // This would be implemented based on extracted entities
  }

  private getSuggestedActions(state: ConversationState): string[] {
    const actionMap: Record<ConversationState, string[]> = {
      [ConversationState.GREETING]: ['property_search', 'get_valuation', 'market_insights'],
      [ConversationState.NEEDS_ASSESSMENT]: ['provide_budget', 'specify_location', 'choose_property_type'],
      [ConversationState.PROPERTY_SEARCH]: ['schedule_viewing', 'get_details', 'risk_assessment'],
      [ConversationState.VALUATION_REQUEST]: ['provide_address', 'schedule_viewing', 'risk_assessment'],
      [ConversationState.RISK_ASSESSMENT]: ['schedule_viewing', 'get_insurance', 'mitigation_strategies'],
      [ConversationState.SCHEDULING]: ['confirm_details', 'reschedule', 'add_to_calendar'],
      [ConversationState.FOLLOW_UP]: ['provide_feedback', 'schedule_next', 'property_search'],
      [ConversationState.COMPLEX_QUERY]: ['clarify_request', 'break_down_question', 'speak_to_agent'],
      [ConversationState.ERROR_RECOVERY]: ['restart_conversation', 'contact_support', 'try_again']
    };
    
    return actionMap[state] || ['property_search', 'get_valuation'];
  }

  // Public methods for analytics and monitoring
  public getUserContext(userId: string): UserContext | undefined {
    return this.userContexts.get(userId);
  }

  public getQualityMetrics(userId: string): ConversationMetrics[] {
    return this.qualityMetrics.get(userId) || [];
  }

  public getAverageQualityScore(userId: string): number {
    const metrics = this.getQualityMetrics(userId);
    if (metrics.length === 0) return 0;
    
    const totalScore = metrics.reduce((sum, metric) => 
      sum + metric.confidenceScore + metric.personalizationScore + metric.engagementLevel, 0
    );
    
    return totalScore / (metrics.length * 3);
  }

  public getConversationFlow(userId: string): ConversationState[] {
    const userContext = this.getUserContext(userId);
    if (!userContext) return [];
    
    return userContext.interactionHistory.map(h => h.state);
  }
}

// Export singleton instance
export const chatFlowQualityEngine = new ChatFlowQualityEngine(
  (key: string, params?: Record<string, string | number>) => {
    // This will be replaced with actual translation function
    return key;
  }
);
