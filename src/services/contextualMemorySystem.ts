import { SensayAPI } from '@/services/api/sensay';

export interface UserProfile {
  id: string;
  sessionId: string;
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    preferredContact: 'email' | 'phone' | 'whatsapp' | 'telegram';
    timezone: string;
    language: string;
  };
  preferences: {
    budgetRange: { min: number; max: number };
    preferredLocations: string[];
    propertyTypes: string[];
    mustHaveFeatures: string[];
    niceToHaveFeatures: string[];
    dealBreakers: string[];
    timeline: string;
    financingStatus: string;
  };
  lifestyle: {
    familySize: number;
    pets: boolean;
    workFromHome: boolean;
    commutePreferences: string[];
    lifestyleType: 'urban' | 'suburban' | 'rural';
  };
  investmentGoals: {
    primaryResidence: boolean;
    rentalProperty: boolean;
    flipProperty: boolean;
    longTermInvestment: boolean;
    investmentTimeline: string;
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
  behavioralData: {
    searchHistory: Array<{
      timestamp: Date;
      query: string;
      filters: any;
      resultsViewed: number;
    }>;
    interactionPatterns: {
      preferredTimeOfDay: string;
      sessionDuration: number;
      messageFrequency: number;
      responseTime: number;
    };
    emotionalState: {
      current: 'excited' | 'stressed' | 'confused' | 'satisfied' | 'frustrated';
      history: Array<{
        timestamp: Date;
        state: string;
        trigger: string;
      }>;
    };
    engagementLevel: {
      score: number; // 0-100
      trend: 'increasing' | 'stable' | 'decreasing';
      lastActive: Date;
    };
  };
  conversationContext: {
    currentIntent: string;
    conversationStage: 'discovery' | 'qualification' | 'search' | 'viewing' | 'negotiation' | 'closing';
    previousTopics: string[];
    unresolvedQuestions: string[];
    nextSteps: string[];
  };
  crossPlatformData: {
    platforms: string[];
    conversationIds: string[];
    lastSync: Date;
  };
}

export interface ContextualMemory {
  userProfile: UserProfile;
  conversationHistory: Array<{
    id: string;
    timestamp: Date;
    platform: string;
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      intent?: string;
      entities?: any;
    }>;
    outcome?: string;
  }>;
  propertyInteractions: Array<{
    propertyId: string;
    timestamp: Date;
    action: 'viewed' | 'saved' | 'shared' | 'scheduled_viewing';
    duration?: number;
    feedback?: string;
  }>;
  leadScore: {
    current: number;
    history: Array<{
      timestamp: Date;
      score: number;
      factors: any;
    }>;
    trend: 'improving' | 'stable' | 'declining';
  };
}

export class ContextualMemorySystem {
  private sensayAPI: SensayAPI;
  private userProfiles: Map<string, UserProfile> = new Map();
  private contextualMemories: Map<string, ContextualMemory> = new Map();

  constructor() {
    this.sensayAPI = new SensayAPI();
    this.loadStoredProfiles();
  }

  async createOrUpdateUserProfile(
    userId: string,
    sessionId: string,
    initialData?: Partial<UserProfile>
  ): Promise<UserProfile> {
    let profile = this.userProfiles.get(userId);
    
    if (!profile) {
      profile = this.createDefaultProfile(userId, sessionId);
    }

    // Update with new data
    if (initialData) {
      profile = this.mergeProfileData(profile, initialData);
    }

    // Update session and cross-platform data
    profile.sessionId = sessionId;
    profile.crossPlatformData.conversationIds.push(sessionId);
    profile.crossPlatformData.lastSync = new Date();

    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);

    return profile;
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<UserProfile['preferences']>
  ): Promise<UserProfile> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    profile.preferences = { ...profile.preferences, ...preferences };
    profile.behavioralData.engagementLevel.lastActive = new Date();

    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);

    return profile;
  }

  async updateBehavioralData(
    userId: string,
    interaction: {
      type: 'search' | 'message' | 'property_view' | 'appointment';
      data: any;
    }
  ): Promise<void> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return;
    }

    const now = new Date();

    // Update search history
    if (interaction.type === 'search') {
      profile.behavioralData.searchHistory.push({
        timestamp: now,
        query: interaction.data.query,
        filters: interaction.data.filters,
        resultsViewed: interaction.data.resultsViewed || 0
      });
    }

    // Update interaction patterns
    profile.behavioralData.interactionPatterns.lastActive = now;
    profile.behavioralData.interactionPatterns.sessionDuration += interaction.data.duration || 0;

    // Update engagement level
    profile.behavioralData.engagementLevel.score = this.calculateEngagementScore(profile);
    profile.behavioralData.engagementLevel.lastActive = now;

    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);
  }

  async updateEmotionalState(
    userId: string,
    state: UserProfile['behavioralData']['emotionalState']['current'],
    trigger: string
  ): Promise<void> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return;
    }

    const now = new Date();
    
    // Add to emotional state history
    profile.behavioralData.emotionalState.history.push({
      timestamp: now,
      state,
      trigger
    });

    // Update current emotional state
    profile.behavioralData.emotionalState.current = state;

    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);
  }

  async updateConversationContext(
    userId: string,
    context: Partial<UserProfile['conversationContext']>
  ): Promise<void> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return;
    }

    profile.conversationContext = { ...profile.conversationContext, ...context };
    
    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);
  }

  async getPersonalizedRecommendations(userId: string): Promise<{
    properties: any[];
    conversationSuggestions: string[];
    nextSteps: string[];
  }> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return { properties: [], conversationSuggestions: [], nextSteps: [] };
    }

    // Generate personalized property recommendations
    const properties = await this.generatePropertyRecommendations(profile);

    // Generate conversation suggestions based on context
    const conversationSuggestions = await this.generateConversationSuggestions(profile);

    // Generate next steps based on conversation stage
    const nextSteps = await this.generateNextSteps(profile);

    return {
      properties,
      conversationSuggestions,
      nextSteps
    };
  }

  async predictUserIntent(userId: string, message: string): Promise<{
    intent: string;
    confidence: number;
    contextFactors: string[];
  }> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return { intent: 'general', confidence: 0.5, contextFactors: [] };
    }

    // Use Sensay API for intent detection with user context
    const contextPrompt = `Based on this user's profile and conversation history, predict their intent for this message: "${message}"

User Profile:
- Preferences: ${JSON.stringify(profile.preferences)}
- Current Stage: ${profile.conversationContext.conversationStage}
- Previous Topics: ${profile.conversationContext.previousTopics.join(', ')}
- Emotional State: ${profile.behavioralData.emotionalState.current}

Predict the intent and provide confidence level.`;

    try {
      const response = await this.sensayAPI.sendMessage(contextPrompt, `intent_prediction_${userId}`);
      
      // Parse the response to extract intent and confidence
      const intent = this.extractIntentFromResponse(response.response);
      const confidence = response.confidence || 0.8;
      const contextFactors = this.identifyContextFactors(profile, message);

      return { intent, confidence, contextFactors };
    } catch (error) {
      console.error('Intent prediction failed:', error);
      return { intent: 'general', confidence: 0.5, contextFactors: [] };
    }
  }

  async generateContextualResponse(
    userId: string,
    message: string,
    baseResponse: string
  ): Promise<string> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return baseResponse;
    }

    // Enhance response based on user context
    const contextualPrompt = `Enhance this response based on the user's profile and context:

Original Response: "${baseResponse}"

User Context:
- Name: ${profile.personalInfo.name || 'User'}
- Emotional State: ${profile.behavioralData.emotionalState.current}
- Conversation Stage: ${profile.conversationContext.conversationStage}
- Preferences: ${JSON.stringify(profile.preferences)}
- Previous Topics: ${profile.conversationContext.previousTopics.join(', ')}

Make the response more personalized and contextually appropriate.`;

    try {
      const response = await this.sensayAPI.sendMessage(contextualPrompt, `contextual_response_${userId}`);
      return response.response;
    } catch (error) {
      console.error('Contextual response generation failed:', error);
      return baseResponse;
    }
  }

  async syncCrossPlatformData(userId: string, platform: string, conversationId: string): Promise<void> {
    const profile = this.userProfiles.get(userId);
    if (!profile) {
      return;
    }

    // Update cross-platform data
    if (!profile.crossPlatformData.platforms.includes(platform)) {
      profile.crossPlatformData.platforms.push(platform);
    }

    if (!profile.crossPlatformData.conversationIds.includes(conversationId)) {
      profile.crossPlatformData.conversationIds.push(conversationId);
    }

    profile.crossPlatformData.lastSync = new Date();

    this.userProfiles.set(userId, profile);
    await this.persistProfile(profile);
  }

  private createDefaultProfile(userId: string, sessionId: string): UserProfile {
    return {
      id: userId,
      sessionId,
      personalInfo: {
        preferredContact: 'email',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: 'en'
      },
      preferences: {
        budgetRange: { min: 300000, max: 800000 },
        preferredLocations: [],
        propertyTypes: [],
        mustHaveFeatures: [],
        niceToHaveFeatures: [],
        dealBreakers: [],
        timeline: 'flexible',
        financingStatus: 'exploring'
      },
      lifestyle: {
        familySize: 1,
        pets: false,
        workFromHome: false,
        commutePreferences: [],
        lifestyleType: 'suburban'
      },
      investmentGoals: {
        primaryResidence: true,
        rentalProperty: false,
        flipProperty: false,
        longTermInvestment: false,
        investmentTimeline: 'flexible',
        riskTolerance: 'moderate'
      },
      behavioralData: {
        searchHistory: [],
        interactionPatterns: {
          preferredTimeOfDay: 'evening',
          sessionDuration: 0,
          messageFrequency: 0,
          responseTime: 0
        },
        emotionalState: {
          current: 'satisfied',
          history: []
        },
        engagementLevel: {
          score: 50,
          trend: 'stable',
          lastActive: new Date()
        }
      },
      conversationContext: {
        currentIntent: 'discovery',
        conversationStage: 'discovery',
        previousTopics: [],
        unresolvedQuestions: [],
        nextSteps: []
      },
      crossPlatformData: {
        platforms: [],
        conversationIds: [sessionId],
        lastSync: new Date()
      }
    };
  }

  private mergeProfileData(existing: UserProfile, newData: Partial<UserProfile>): UserProfile {
    return {
      ...existing,
      ...newData,
      preferences: { ...existing.preferences, ...newData.preferences },
      lifestyle: { ...existing.lifestyle, ...newData.lifestyle },
      investmentGoals: { ...existing.investmentGoals, ...newData.investmentGoals },
      behavioralData: { ...existing.behavioralData, ...newData.behavioralData },
      conversationContext: { ...existing.conversationContext, ...newData.conversationContext }
    };
  }

  private calculateEngagementScore(profile: UserProfile): number {
    let score = 50; // Base score

    // Search history factor
    score += Math.min(profile.behavioralData.searchHistory.length * 5, 25);

    // Interaction frequency factor
    const daysSinceLastActive = (Date.now() - profile.behavioralData.engagementLevel.lastActive.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastActive < 1) score += 20;
    else if (daysSinceLastActive < 7) score += 10;

    // Emotional state factor
    if (profile.behavioralData.emotionalState.current === 'excited') score += 15;
    else if (profile.behavioralData.emotionalState.current === 'satisfied') score += 10;
    else if (profile.behavioralData.emotionalState.current === 'stressed') score -= 10;

    return Math.max(0, Math.min(100, score));
  }

  private async generatePropertyRecommendations(profile: UserProfile): Promise<any[]> {
    // Mock implementation - integrate with property search service
    return [
      {
        id: 'prop_1',
        address: '123 Personalized St',
        price: profile.preferences.budgetRange.min + (profile.preferences.budgetRange.max - profile.preferences.budgetRange.min) * 0.5,
        matchScore: 95,
        reasons: ['Matches your budget', 'In your preferred location', 'Has your must-have features']
      }
    ];
  }

  private async generateConversationSuggestions(profile: UserProfile): Promise<string[]> {
    const suggestions: string[] = [];

    // Based on conversation stage
    switch (profile.conversationContext.conversationStage) {
      case 'discovery':
        suggestions.push('Tell me about your ideal home');
        suggestions.push('What features are most important to you?');
        break;
      case 'qualification':
        suggestions.push('What\'s your timeline for buying?');
        suggestions.push('Have you been pre-approved for financing?');
        break;
      case 'search':
        suggestions.push('Would you like to see similar properties?');
        suggestions.push('Should I set up property alerts?');
        break;
    }

    // Based on emotional state
    if (profile.behavioralData.emotionalState.current === 'stressed') {
      suggestions.push('I understand this can be overwhelming. Let me help simplify things.');
    } else if (profile.behavioralData.emotionalState.current === 'excited') {
      suggestions.push('I can see you\'re excited! Let\'s find your perfect home.');
    }

    return suggestions;
  }

  private async generateNextSteps(profile: UserProfile): Promise<string[]> {
    const nextSteps: string[] = [];

    // Based on conversation stage and unresolved questions
    if (profile.conversationContext.unresolvedQuestions.length > 0) {
      nextSteps.push('Address unresolved questions');
    }

    // Based on preferences completeness
    if (!profile.preferences.timeline) {
      nextSteps.push('Determine timeline');
    }

    if (!profile.preferences.financingStatus) {
      nextSteps.push('Assess financing options');
    }

    return nextSteps;
  }

  private extractIntentFromResponse(response: string): string {
    // Simple intent extraction - in production, use more sophisticated NLP
    if (response.toLowerCase().includes('buy') || response.toLowerCase().includes('purchase')) {
      return 'buy_property';
    } else if (response.toLowerCase().includes('sell')) {
      return 'sell_property';
    } else if (response.toLowerCase().includes('rent')) {
      return 'rent_property';
    } else if (response.toLowerCase().includes('schedule') || response.toLowerCase().includes('viewing')) {
      return 'schedule_viewing';
    } else if (response.toLowerCase().includes('price') || response.toLowerCase().includes('value')) {
      return 'get_valuation';
    }
    return 'general';
  }

  private identifyContextFactors(profile: UserProfile, message: string): string[] {
    const factors: string[] = [];

    if (profile.behavioralData.emotionalState.current !== 'satisfied') {
      factors.push('emotional_state');
    }

    if (profile.conversationContext.previousTopics.length > 0) {
      factors.push('conversation_history');
    }

    if (profile.preferences.budgetRange.min > 0) {
      factors.push('budget_preferences');
    }

    if (profile.preferences.preferredLocations.length > 0) {
      factors.push('location_preferences');
    }

    return factors;
  }

  private async persistProfile(profile: UserProfile): Promise<void> {
    // In production, persist to database
    try {
      localStorage.setItem(`user_profile_${profile.id}`, JSON.stringify(profile));
    } catch (error) {
      console.error('Failed to persist user profile:', error);
    }
  }

  private loadStoredProfiles(): void {
    // Load profiles from localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('user_profile_')) {
          const profileData = JSON.parse(localStorage.getItem(key) || '{}');
          this.userProfiles.set(profileData.id, profileData);
        }
      }
    } catch (error) {
      console.error('Failed to load stored profiles:', error);
    }
  }

  getUserProfile(userId: string): UserProfile | undefined {
    return this.userProfiles.get(userId);
  }

  getAllProfiles(): UserProfile[] {
    return Array.from(this.userProfiles.values());
  }
}

// Export singleton instance
export const contextualMemorySystem = new ContextualMemorySystem();

