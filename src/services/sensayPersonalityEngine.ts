/**
 * PropGuard AI Sensay Personality Engine
 * 
 * Implements the complete personality framework for the Sensay chatbot,
 * including tone adaptation, emotional intelligence, and multilingual support.
 */

import { 
  SENSAY_PERSONALITY_CONFIG,
  PersonalityTraits,
  ToneSettings,
  UserType,
  EmotionalContext,
  LanguageSettings,
  InteractionRule,
  ResponseTemplate,
  EmotionalResponse,
  PlatformAdaptation,
  FeedbackMechanism
} from '@/data/sensayPersonalityTraining';

// ============================================================================
// INTERFACES AND TYPES
// ============================================================================

export interface UserProfile {
  id: string;
  type: keyof typeof SENSAY_PERSONALITY_CONFIG.userTypes;
  language: string;
  platform: string;
  emotionalContext: EmotionalContext;
  interactionHistory: InteractionHistory[];
  preferences: UserPreferences;
  lastInteraction: Date;
}

export interface InteractionHistory {
  timestamp: Date;
  message: string;
  response: string;
  emotion: string;
  satisfaction?: number;
  context: string;
}

export interface UserPreferences {
  communicationStyle: 'formal' | 'casual' | 'mixed';
  responseLength: 'brief' | 'detailed' | 'comprehensive';
  technicalLevel: 'beginner' | 'intermediate' | 'advanced';
  urgency: 'low' | 'medium' | 'high';
}

export interface ConversationContext {
  currentTopic: string;
  userIntent: string;
  conversationStage: 'greeting' | 'qualification' | 'analysis' | 'scheduling' | 'followup';
  emotionalState: string;
  userType: string;
  platform: string;
  language: string;
}

export interface PersonalityResponse {
  content: string;
  tone: ToneSettings;
  emotionalContext: EmotionalContext;
  nextSteps: string[];
  actions: string[];
  confidence: number;
  metadata: {
    userType: string;
    platform: string;
    language: string;
    responseTemplate: string;
    emotionalAdaptation: string;
  };
}

// ============================================================================
// MAIN PERSONALITY ENGINE CLASS
// ============================================================================

export class SensayPersonalityEngine {
  private userProfiles: Map<string, UserProfile> = new Map();
  private conversationContexts: Map<string, ConversationContext> = new Map();
  private feedbackData: Map<string, any[]> = new Map();

  constructor() {
    this.initializeEngine();
  }

  private initializeEngine(): void {
    console.log('Initializing PropGuard AI Sensay Personality Engine...');
    // Initialize any required services or configurations
  }

  // ============================================================================
  // USER PROFILE MANAGEMENT
  // ============================================================================

  /**
   * Create or update user profile with personality adaptations
   */
  public createUserProfile(
    userId: string,
    userType: keyof typeof SENSAY_PERSONALITY_CONFIG.userTypes,
    language: string = 'en',
    platform: string = 'web'
  ): UserProfile {
    const profile: UserProfile = {
      id: userId,
      type: userType,
      language,
      platform,
      emotionalContext: {
        stress: 'low',
        urgency: 'low',
        uncertainty: 'low',
        excitement: 'low'
      },
      interactionHistory: [],
      preferences: {
        communicationStyle: 'mixed',
        responseLength: 'detailed',
        technicalLevel: 'intermediate',
        urgency: 'medium'
      },
      lastInteraction: new Date()
    };

    this.userProfiles.set(userId, profile);
    return profile;
  }

  /**
   * Get user profile with fallback to default
   */
  public getUserProfile(userId: string): UserProfile {
    let profile = this.userProfiles.get(userId);
    
    if (!profile) {
      profile = this.createUserProfile(userId, 'first_time_buyer', 'en', 'web');
    }

    return profile;
  }

  /**
   * Update user emotional context based on conversation
   */
  public updateEmotionalContext(userId: string, message: string, emotion: string): void {
    const profile = this.getUserProfile(userId);
    
    // Analyze emotional keywords in message
    const emotionalKeywords = this.analyzeEmotionalKeywords(message);
    
    // Update emotional context based on detected emotions
    if (emotionalKeywords.includes('stressed') || emotionalKeywords.includes('worried')) {
      profile.emotionalContext.stress = 'high';
    } else if (emotionalKeywords.includes('excited') || emotionalKeywords.includes('thrilled')) {
      profile.emotionalContext.excitement = 'high';
    } else if (emotionalKeywords.includes('urgent') || emotionalKeywords.includes('asap')) {
      profile.emotionalContext.urgency = 'high';
    } else if (emotionalKeywords.includes('unsure') || emotionalKeywords.includes('confused')) {
      profile.emotionalContext.uncertainty = 'high';
    }

    // Add to interaction history
    profile.interactionHistory.push({
      timestamp: new Date(),
      message,
      response: '',
      emotion,
      context: 'user_message'
    });

    this.userProfiles.set(userId, profile);
  }

  // ============================================================================
  // PERSONALITY ADAPTATION ENGINE
  // ============================================================================

  /**
   * Generate personalized response based on user profile and context
   */
  public generatePersonalizedResponse(
    userId: string,
    message: string,
    intent: string,
    context: Partial<ConversationContext> = {}
  ): PersonalityResponse {
    const profile = this.getUserProfile(userId);
    const userType = SENSAY_PERSONALITY_CONFIG.userTypes[profile.type];
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[profile.language];
    const platformAdaptation = SENSAY_PERSONALITY_CONFIG.platformAdaptations[profile.platform];

    // Update conversation context
    const conversationContext: ConversationContext = {
      currentTopic: context.currentTopic || intent,
      userIntent: intent,
      conversationStage: context.conversationStage || 'greeting',
      emotionalState: this.detectEmotionalState(message),
      userType: profile.type,
      platform: profile.platform,
      language: profile.language,
      ...context
    };

    this.conversationContexts.set(userId, conversationContext);

    // Analyze emotional state and adapt tone
    const emotionalResponse = this.getEmotionalResponse(message);
    const adaptedTone = this.adaptToneForUser(profile, emotionalResponse);

    // Select appropriate response template
    const responseTemplate = this.selectResponseTemplate(intent, conversationContext, profile);

    // Generate personalized content
    const content = this.generateContent(
      responseTemplate,
      message,
      profile,
      conversationContext,
      languageSettings
    );

    // Determine next steps and actions
    const nextSteps = this.generateNextSteps(intent, conversationContext, profile);
    const actions = this.generateActions(intent, conversationContext, profile);

    // Calculate confidence score
    const confidence = this.calculateConfidence(intent, conversationContext, profile);

    const response: PersonalityResponse = {
      content,
      tone: adaptedTone,
      emotionalContext: profile.emotionalContext,
      nextSteps,
      actions,
      confidence,
      metadata: {
        userType: profile.type,
        platform: profile.platform,
        language: profile.language,
        responseTemplate: responseTemplate.id,
        emotionalAdaptation: emotionalResponse.emotion
      }
    };

    // Update interaction history
    this.updateInteractionHistory(userId, message, content, emotionalResponse.emotion);

    return response;
  }

  /**
   * Adapt tone based on user type and emotional context
   */
  private adaptToneForUser(profile: UserProfile, emotionalResponse: EmotionalResponse): ToneSettings {
    const userType = SENSAY_PERSONALITY_CONFIG.userTypes[profile.type];
    const baseTone = userType.preferredTone;
    const emotionalAdjustment = emotionalResponse.toneAdjustment;

    // Merge base tone with emotional adjustments
    return {
      warmth: Math.min(10, baseTone.warmth + (emotionalAdjustment.warmth || 0)),
      formality: Math.max(1, baseTone.formality + (emotionalAdjustment.formality || 0)),
      enthusiasm: Math.min(10, baseTone.enthusiasm + (emotionalAdjustment.enthusiasm || 0)),
      confidence: Math.min(10, baseTone.confidence + (emotionalAdjustment.confidence || 0)),
      empathy: Math.min(10, baseTone.empathy + (emotionalAdjustment.empathy || 0))
    };
  }

  /**
   * Select appropriate response template based on context
   */
  private selectResponseTemplate(
    intent: string,
    context: ConversationContext,
    profile: UserProfile
  ): ResponseTemplate {
    const templates = SENSAY_PERSONALITY_CONFIG.responseTemplates;
    
    // Map intents to template categories
    const intentMapping: Record<string, string> = {
      'property_search': 'property_discovery_short',
      'lead_qualification': 'lead_qualification',
      'risk_assessment': 'risk_analysis',
      'schedule_viewing': 'scheduling_confirmation',
      'greeting': 'initial_greeting'
    };

    const templateKey = intentMapping[intent] || 'property_discovery_short';
    return templates[templateKey];
  }

  /**
   * Generate content based on template and user context
   */
  private generateContent(
    template: ResponseTemplate,
    message: string,
    profile: UserProfile,
    context: ConversationContext,
    languageSettings: LanguageSettings
  ): string {
    // Select appropriate template variation
    const templateIndex = Math.floor(Math.random() * template.templates.length);
    let content = template.templates[templateIndex];

    // Replace placeholders with dynamic content
    content = this.replacePlaceholders(content, message, profile, context);

    // Apply language-specific adaptations
    content = this.applyLanguageAdaptations(content, languageSettings);

    // Apply platform-specific formatting
    content = this.applyPlatformFormatting(content, profile.platform);

    return content;
  }

  /**
   * Replace placeholders in templates with dynamic content
   */
  private replacePlaceholders(
    content: string,
    message: string,
    profile: UserProfile,
    context: ConversationContext
  ): string {
    // Extract entities from message
    const entities = this.extractEntities(message);

    // Replace common placeholders
    content = content.replace('{count}', entities.count || '3');
    content = content.replace('{property_type}', entities.property_type || 'properties');
    content = content.replace('{location}', entities.location || 'your area');
    content = content.replace('{date}', this.formatDate(new Date()));
    content = content.replace('{time}', this.formatTime(new Date()));

    return content;
  }

  /**
   * Apply language-specific adaptations
   */
  private applyLanguageAdaptations(content: string, languageSettings: LanguageSettings): string {
    // Apply cultural adaptations
    if (languageSettings.culturalAdaptations.includes('Warmer, more personal communication')) {
      content = this.addWarmthToContent(content);
    }

    if (languageSettings.culturalAdaptations.includes('Emphasis on family and community aspects')) {
      content = this.addCommunityFocus(content);
    }

    return content;
  }

  /**
   * Apply platform-specific formatting
   */
  private applyPlatformFormatting(content: string, platform: string): string {
    const platformAdaptation = SENSAY_PERSONALITY_CONFIG.platformAdaptations[platform];

    switch (platformAdaptation.responseLength) {
      case 'short':
        return this.truncateContent(content, 100);
      case 'medium':
        return this.truncateContent(content, 300);
      case 'long':
        return content;
      default:
        return content;
    }
  }

  // ============================================================================
  // EMOTIONAL INTELLIGENCE ENGINE
  // ============================================================================

  /**
   * Detect emotional state from message content
   */
  private detectEmotionalState(message: string): string {
    const messageLower = message.toLowerCase();
    
    for (const emotionalResponse of SENSAY_PERSONALITY_CONFIG.emotionalResponses) {
      if (emotionalResponse.keywords.some(keyword => messageLower.includes(keyword))) {
        return emotionalResponse.emotion;
      }
    }

    return 'neutral';
  }

  /**
   * Get emotional response configuration
   */
  private getEmotionalResponse(message: string): EmotionalResponse {
    const emotion = this.detectEmotionalState(message);
    
    return SENSAY_PERSONALITY_CONFIG.emotionalResponses.find(
      response => response.emotion === emotion
    ) || SENSAY_PERSONALITY_CONFIG.emotionalResponses.find(
      response => response.emotion === 'neutral'
    )!;
  }

  /**
   * Analyze emotional keywords in message
   */
  private analyzeEmotionalKeywords(message: string): string[] {
    const messageLower = message.toLowerCase();
    const detectedKeywords: string[] = [];

    for (const emotionalResponse of SENSAY_PERSONALITY_CONFIG.emotionalResponses) {
      for (const keyword of emotionalResponse.keywords) {
        if (messageLower.includes(keyword)) {
          detectedKeywords.push(keyword);
        }
      }
    }

    return detectedKeywords;
  }

  // ============================================================================
  // MULTILINGUAL SUPPORT
  // ============================================================================

  /**
   * Get language-specific greeting
   */
  public getLanguageSpecificGreeting(language: string): string {
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[language];
    return languageSettings?.greeting || SENSAY_PERSONALITY_CONFIG.languageSettings.en.greeting;
  }

  /**
   * Translate property terms to user's language
   */
  public translatePropertyTerm(term: string, language: string): string {
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[language];
    return languageSettings?.propertyTerms[term] || term;
  }

  /**
   * Format currency according to user's locale
   */
  public formatCurrency(amount: number, language: string): string {
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[language];
    const format = languageSettings?.currencyFormat || '$#,##0.00';
    
    return format.replace('#,##0.00', amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Extract entities from message
   */
  private extractEntities(message: string): Record<string, string> {
    const entities: Record<string, string> = {};

    // Extract property count
    const countMatch = message.match(/(\d+)\s*(bedroom|bed|room)/i);
    if (countMatch) {
      entities.count = countMatch[1];
    }

    // Extract property type
    const propertyTypeMatch = message.match(/(house|apartment|condo|townhouse|office|commercial)/i);
    if (propertyTypeMatch) {
      entities.property_type = propertyTypeMatch[1];
    }

    // Extract location
    const locationMatch = message.match(/in\s+([A-Za-z\s]+)/i);
    if (locationMatch) {
      entities.location = locationMatch[1].trim();
    }

    return entities;
  }

  /**
   * Generate next steps based on intent and context
   */
  private generateNextSteps(intent: string, context: ConversationContext, profile: UserProfile): string[] {
    const userType = SENSAY_PERSONALITY_CONFIG.userTypes[profile.type];
    
    // Return priority actions for user type
    return userType.priorityActions.slice(0, 3);
  }

  /**
   * Generate actionable items
   */
  private generateActions(intent: string, context: ConversationContext, profile: UserProfile): string[] {
    const actions: string[] = [];

    switch (intent) {
      case 'property_search':
        actions.push('search_properties', 'provide_recommendations', 'schedule_viewing');
        break;
      case 'risk_assessment':
        actions.push('analyze_risks', 'provide_mitigation', 'generate_report');
        break;
      case 'lead_qualification':
        actions.push('capture_details', 'score_lead', 'create_profile');
        break;
      default:
        actions.push('provide_assistance', 'gather_info', 'follow_up');
    }

    return actions;
  }

  /**
   * Calculate confidence score for response
   */
  private calculateConfidence(intent: string, context: ConversationContext, profile: UserProfile): number {
    let confidence = 0.8; // Base confidence

    // Increase confidence based on user type familiarity
    if (profile.interactionHistory.length > 5) {
      confidence += 0.1;
    }

    // Increase confidence for clear intents
    const clearIntents = ['property_search', 'risk_assessment', 'schedule_viewing'];
    if (clearIntents.includes(intent)) {
      confidence += 0.1;
    }

    return Math.min(1.0, confidence);
  }

  /**
   * Update interaction history
   */
  private updateInteractionHistory(userId: string, message: string, response: string, emotion: string): void {
    const profile = this.getUserProfile(userId);
    
    // Update last response in history
    if (profile.interactionHistory.length > 0) {
      const lastInteraction = profile.interactionHistory[profile.interactionHistory.length - 1];
      if (lastInteraction.response === '') {
        lastInteraction.response = response;
        lastInteraction.emotion = emotion;
      }
    }

    profile.lastInteraction = new Date();
    this.userProfiles.set(userId, profile);
  }

  /**
   * Add warmth to content
   */
  private addWarmthToContent(content: string): string {
    const warmPhrases = ['I\'m delighted to help', 'I\'m thrilled to assist', 'It\'s my pleasure to help'];
    const randomPhrase = warmPhrases[Math.floor(Math.random() * warmPhrases.length)];
    return `${randomPhrase}! ${content}`;
  }

  /**
   * Add community focus to content
   */
  private addCommunityFocus(content: string): string {
    return content.replace('property', 'home for your family');
  }

  /**
   * Truncate content to specified length
   */
  private truncateContent(content: string, maxLength: number): string {
    if (content.length <= maxLength) return content;
    
    const truncated = content.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength * 0.8) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  /**
   * Format date according to user's locale
   */
  private formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Format time according to user's locale
   */
  private formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  }

  // ============================================================================
  // FEEDBACK AND IMPROVEMENT
  // ============================================================================

  /**
   * Record user feedback for continuous improvement
   */
  public recordFeedback(userId: string, rating: number, feedback?: string): void {
    const feedbackEntry = {
      userId,
      rating,
      feedback,
      timestamp: new Date(),
      context: this.conversationContexts.get(userId)
    };

    if (!this.feedbackData.has(userId)) {
      this.feedbackData.set(userId, []);
    }

    this.feedbackData.get(userId)!.push(feedbackEntry);

    // Trigger improvement analysis if rating is low
    if (rating < 3) {
      this.analyzeLowRating(userId, feedbackEntry);
    }
  }

  /**
   * Analyze low ratings for improvement opportunities
   */
  private analyzeLowRating(userId: string, feedbackEntry: any): void {
    console.log(`Low rating detected for user ${userId}:`, feedbackEntry);
    
    // Implement improvement logic here
    // This could include adjusting tone, response templates, or user type classification
  }

  /**
   * Get personality analytics
   */
  public getPersonalityAnalytics(): any {
    const totalUsers = this.userProfiles.size;
    const totalInteractions = Array.from(this.userProfiles.values())
      .reduce((sum, profile) => sum + profile.interactionHistory.length, 0);

    const userTypeDistribution = Array.from(this.userProfiles.values())
      .reduce((dist, profile) => {
        dist[profile.type] = (dist[profile.type] || 0) + 1;
        return dist;
      }, {} as Record<string, number>);

    const averageConfidence = Array.from(this.userProfiles.values())
      .reduce((sum, profile) => {
        // Calculate average confidence from recent interactions
        const recentInteractions = profile.interactionHistory.slice(-10);
        return sum + (recentInteractions.length > 0 ? 0.8 : 0); // Placeholder calculation
      }, 0) / totalUsers;

    return {
      totalUsers,
      totalInteractions,
      userTypeDistribution,
      averageConfidence,
      timestamp: new Date()
    };
  }
}

// ============================================================================
// EXPORT SINGLETON INSTANCE
// ============================================================================

export const sensayPersonalityEngine = new SensayPersonalityEngine();

export default sensayPersonalityEngine;
