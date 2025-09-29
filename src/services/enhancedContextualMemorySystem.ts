import { SensayAPI } from '@/services/api/sensay';
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedUserProfile {
  id: string;
  sessionId: string;
  personalInfo: {
    name?: string;
    email?: string;
    phone?: string;
    preferredContact: 'email' | 'phone' | 'whatsapp' | 'telegram' | 'voice';
    timezone: string;
    language: string;
    communicationStyle: 'formal' | 'casual' | 'friendly' | 'professional';
    responseTime: 'immediate' | 'within_hour' | 'within_day';
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
    investmentGoals: string[];
    riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  };
  lifestyle: {
    familySize: number;
    pets: boolean;
    workFromHome: boolean;
    commutePreferences: string[];
    lifestyleType: 'urban' | 'suburban' | 'rural' | 'coastal' | 'mountain';
    hobbies: string[];
    socialPreferences: string[];
  };
  behavioralData: {
    searchHistory: Array<{
      timestamp: Date;
      query: string;
      filters: any;
      resultsViewed: number;
      timeSpent: number;
      actions: string[];
    }>;
    interactionPatterns: {
      preferredTimeOfDay: string;
      sessionDuration: number;
      messageFrequency: number;
      responseTime: number;
      preferredPlatform: 'web' | 'whatsapp' | 'telegram' | 'voice';
      deviceType: 'desktop' | 'mobile' | 'tablet';
    };
    emotionalState: {
      current: 'excited' | 'stressed' | 'confused' | 'satisfied' | 'frustrated' | 'neutral' | 'curious';
      history: Array<{
        timestamp: Date;
        state: string;
        trigger: string;
        duration: number;
      }>;
      stressIndicators: string[];
      satisfactionFactors: string[];
    };
    engagementLevel: {
      score: number; // 0-100
      trend: 'increasing' | 'stable' | 'decreasing';
      lastActive: Date;
      totalSessions: number;
      averageSessionLength: number;
      completionRate: number;
    };
    learningStyle: {
      prefers: 'visual' | 'audio' | 'text' | 'interactive';
      detailLevel: 'high' | 'medium' | 'low';
      examplesNeeded: boolean;
      stepByStep: boolean;
    };
  };
  conversationContext: {
    currentIntent: string;
    conversationStage: 'discovery' | 'qualification' | 'search' | 'viewing' | 'negotiation' | 'closing' | 'follow_up';
    previousTopics: string[];
    unresolvedQuestions: string[];
    nextSteps: string[];
    conversationFlow: Array<{
      timestamp: Date;
      intent: string;
      response: string;
      satisfaction: number;
    }>;
    contextSwitches: number;
    topicDepth: number;
  };
  crossPlatformData: {
    platforms: string[];
    conversationIds: string[];
    lastSync: Date;
    syncStatus: 'synced' | 'pending' | 'error';
    dataConsistency: number; // 0-100
  };
  aiPersonality: {
    preferredTone: 'professional' | 'friendly' | 'casual' | 'expert';
    communicationStyle: 'direct' | 'conversational' | 'detailed' | 'concise';
    expertiseLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    culturalContext: string;
    languagePreferences: string[];
  };
}

export interface PredictiveConversationFlow {
  nextLikelyIntents: Array<{
    intent: string;
    probability: number;
    triggers: string[];
    context: string;
  }>;
  suggestedResponses: Array<{
    response: string;
    context: string;
    confidence: number;
    personalization: string[];
  }>;
  proactiveSuggestions: Array<{
    suggestion: string;
    timing: 'immediate' | 'next_session' | 'follow_up';
    priority: 'high' | 'medium' | 'low';
    reasoning: string;
  }>;
  conversationOptimization: {
    flowImprovements: string[];
    engagementBoosters: string[];
    satisfactionEnhancers: string[];
  };
}

export interface EmotionalIntelligence {
  currentEmotion: string;
  emotionHistory: Array<{
    timestamp: Date;
    emotion: string;
    intensity: number;
    trigger: string;
    context: string;
  }>;
  stressLevel: number; // 0-100
  satisfactionLevel: number; // 0-100
  engagementLevel: number; // 0-100
  emotionalTriggers: {
    positive: string[];
    negative: string[];
    neutral: string[];
  };
  adaptationStrategies: {
    stressReduction: string[];
    satisfactionEnhancement: string[];
    engagementImprovement: string[];
  };
  sentimentAnalysis: {
    overall: 'positive' | 'negative' | 'neutral';
    confidence: number;
    factors: string[];
    trends: string[];
  };
}

export interface EnhancedContextualMemory {
  userProfile: EnhancedUserProfile;
  conversationHistory: Array<{
    id: string;
    timestamp: Date;
    platform: string;
    messages: Array<{
      role: 'user' | 'assistant';
      content: string;
      intent?: string;
      entities?: any;
      emotionalContext?: string;
      satisfaction?: number;
    }>;
    outcome?: string;
    satisfaction?: number;
    lessonsLearned?: string[];
  }>;
  propertyInteractions: Array<{
    propertyId: string;
    timestamp: Date;
    action: 'viewed' | 'saved' | 'shared' | 'scheduled_viewing' | 'compared' | 'rejected';
    duration?: number;
    feedback?: string;
    emotionalResponse?: string;
    followUpActions?: string[];
  }>;
  leadScore: {
    current: number;
    history: Array<{
      timestamp: Date;
      score: number;
      factors: any;
      changes: string[];
    }>;
    trend: 'improving' | 'stable' | 'declining';
    prediction: {
      nextScore: number;
      timeframe: string;
      factors: string[];
    };
  };
  learningInsights: {
    userPreferences: string[];
    behaviorPatterns: string[];
    communicationInsights: string[];
    optimizationOpportunities: string[];
  };
}

export class EnhancedContextualMemorySystem {
  private sensayAPI: SensayAPI;
  private userProfiles: Map<string, EnhancedUserProfile> = new Map();
  private contextualMemories: Map<string, EnhancedContextualMemory> = new Map();

  constructor() {
    this.sensayAPI = new SensayAPI();
    this.loadStoredProfiles();
  }

  async createOrUpdateUserProfile(
    userId: string,
    sessionId: string,
    initialData?: Partial<EnhancedUserProfile>
  ): Promise<EnhancedUserProfile> {
    try {
      let profile = this.userProfiles.get(userId);
      
      if (!profile) {
        profile = this.createDefaultProfile(userId, sessionId);
      }

      // Update with new data using AI enhancement
      if (initialData) {
        profile = await this.enhanceProfileWithAI(profile, initialData);
      }

      // Update session and cross-platform data
      profile.sessionId = sessionId;
      profile.crossPlatformData.conversationIds.push(sessionId);
      profile.crossPlatformData.lastSync = new Date();

      this.userProfiles.set(userId, profile);
      await this.persistProfile(profile);

      return profile;
    } catch (error) {
      console.error('Failed to create/update user profile:', error);
      throw new Error('Unable to create or update user profile');
    }
  }

  async updateUserPreferences(
    userId: string,
    preferences: Partial<EnhancedUserProfile['preferences']>
  ): Promise<EnhancedUserProfile> {
    try {
      const profile = this.userProfiles.get(userId);
      if (!profile) {
        throw new Error('User profile not found');
      }

      // Use AI to intelligently merge preferences
      const enhancedPreferences = await this.enhancePreferencesWithAI(profile.preferences, preferences);
      
      profile.preferences = { ...profile.preferences, ...enhancedPreferences };
      
      // Update behavioral data
      profile.behavioralData.searchHistory.push({
        timestamp: new Date(),
        query: 'preferences_updated',
        filters: preferences,
        resultsViewed: 0,
        timeSpent: 0,
        actions: ['preferences_updated']
      });

      this.userProfiles.set(userId, profile);
      await this.persistProfile(profile);

      return profile;
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      throw new Error('Unable to update user preferences');
    }
  }

  async predictConversationFlow(userId: string): Promise<PredictiveConversationFlow> {
    try {
      const memory = this.contextualMemories.get(userId);
      if (!memory) {
        throw new Error('No contextual memory found');
      }

      // Use Sensay AI to predict conversation flow
      const prompt = `
        As an AI conversation flow predictor, analyze this user's contextual memory and predict likely next steps:
        
        User Profile: ${JSON.stringify(memory.userProfile, null, 2)}
        Recent Conversations: ${JSON.stringify(memory.conversationHistory.slice(-5), null, 2)}
        Current Context: ${JSON.stringify(memory.userProfile.conversationContext, null, 2)}
        
        Provide predictive conversation flow in JSON format:
        {
          "nextLikelyIntents": [
            {
              "intent": "intent_name",
              "probability": 0-100,
              "triggers": ["trigger1", "trigger2"],
              "context": "context_description"
            }
          ],
          "suggestedResponses": [
            {
              "response": "response_text",
              "context": "context_description",
              "confidence": 0-100,
              "personalization": ["personalization1", "personalization2"]
            }
          ],
          "proactiveSuggestions": [
            {
              "suggestion": "suggestion_text",
              "timing": "immediate/next_session/follow_up",
              "priority": "high/medium/low",
              "reasoning": "reasoning_description"
            }
          ],
          "conversationOptimization": {
            "flowImprovements": ["improvement1", "improvement2"],
            "engagementBoosters": ["booster1", "booster2"],
            "satisfactionEnhancers": ["enhancer1", "enhancer2"]
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'conversation_flow_prediction',
        expertise: 'conversation_ai'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Conversation flow prediction failed, using fallback:', error);
      return this.getFallbackConversationFlow();
    }
  }

  async analyzeEmotionalIntelligence(userId: string): Promise<EmotionalIntelligence> {
    try {
      const memory = this.contextualMemories.get(userId);
      if (!memory) {
        throw new Error('No contextual memory found');
      }

      // Use Sensay AI to analyze emotional intelligence
      const prompt = `
        As an AI emotional intelligence analyzer, analyze this user's emotional state and patterns:
        
        User Profile: ${JSON.stringify(memory.userProfile, null, 2)}
        Conversation History: ${JSON.stringify(memory.conversationHistory.slice(-10), null, 2)}
        Behavioral Data: ${JSON.stringify(memory.userProfile.behavioralData, null, 2)}
        
        Provide emotional intelligence analysis in JSON format:
        {
          "currentEmotion": "emotion_name",
          "emotionHistory": [
            {
              "timestamp": "ISO_date",
              "emotion": "emotion_name",
              "intensity": 0-100,
              "trigger": "trigger_description",
              "context": "context_description"
            }
          ],
          "stressLevel": 0-100,
          "satisfactionLevel": 0-100,
          "engagementLevel": 0-100,
          "emotionalTriggers": {
            "positive": ["trigger1", "trigger2"],
            "negative": ["trigger1", "trigger2"],
            "neutral": ["trigger1", "trigger2"]
          },
          "adaptationStrategies": {
            "stressReduction": ["strategy1", "strategy2"],
            "satisfactionEnhancement": ["strategy1", "strategy2"],
            "engagementImprovement": ["strategy1", "strategy2"]
          },
          "sentimentAnalysis": {
            "overall": "positive/negative/neutral",
            "confidence": 0-100,
            "factors": ["factor1", "factor2"],
            "trends": ["trend1", "trend2"]
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'emotional_intelligence_analysis',
        expertise: 'emotional_ai'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Emotional intelligence analysis failed, using fallback:', error);
      return this.getFallbackEmotionalIntelligence();
    }
  }

  async generatePersonalizedResponse(
    userId: string,
    message: string,
    context: any
  ): Promise<{ response: string; personalization: string[] }> {
    try {
      const memory = this.contextualMemories.get(userId);
      if (!memory) {
        throw new Error('No contextual memory found');
      }

      // Use Sensay AI to generate personalized response
      const prompt = `
        As Alex, the AI real estate assistant, generate a personalized response:
        
        User Message: "${message}"
        User Profile: ${JSON.stringify(memory.userProfile, null, 2)}
        Context: ${JSON.stringify(context, null, 2)}
        Conversation History: ${JSON.stringify(memory.conversationHistory.slice(-3), null, 2)}
        
        Generate a response that:
        - Matches the user's communication style
        - References their preferences and history
        - Maintains appropriate emotional tone
        - Provides relevant information
        - Suggests next steps
        
        Provide response in JSON format:
        {
          "response": "personalized_response_text",
          "personalization": ["personalization1", "personalization2"]
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'personalized_response_generation',
        expertise: 'conversation_ai'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Personalized response generation failed, using fallback:', error);
      return {
        response: "I understand your question. Let me help you with that based on what I know about your preferences.",
        personalization: ['preference_reference']
      };
    }
  }

  async updateConversationContext(
    userId: string,
    message: string,
    intent: string,
    entities: any,
    emotionalContext?: string
  ): Promise<void> {
    try {
      const memory = this.contextualMemories.get(userId);
      if (!memory) {
        throw new Error('No contextual memory found');
      }

      // Update conversation context
      memory.userProfile.conversationContext.currentIntent = intent;
      memory.userProfile.conversationContext.previousTopics.push(intent);
      
      // Add to conversation history
      const conversationId = `conv_${Date.now()}`;
      memory.conversationHistory.push({
        id: conversationId,
        timestamp: new Date(),
        platform: 'web',
        messages: [
          {
            role: 'user',
            content: message,
            intent,
            entities,
            emotionalContext
          }
        ]
      });

      // Update behavioral data
      memory.userProfile.behavioralData.searchHistory.push({
        timestamp: new Date(),
        query: message,
        filters: entities,
        resultsViewed: 0,
        timeSpent: 0,
        actions: [intent]
      });

      // Update emotional state if provided
      if (emotionalContext) {
        memory.userProfile.behavioralData.emotionalState.current = emotionalContext as any;
        memory.userProfile.behavioralData.emotionalState.history.push({
          timestamp: new Date(),
          state: emotionalContext,
          trigger: message,
          duration: 0
        });
      }

      this.contextualMemories.set(userId, memory);
      await this.persistContextualMemory(memory);
    } catch (error) {
      console.error('Failed to update conversation context:', error);
    }
  }

  async syncCrossPlatformData(userId: string): Promise<void> {
    try {
      const profile = this.userProfiles.get(userId);
      if (!profile) {
        throw new Error('User profile not found');
      }

      // Sync with Supabase
      const { error } = await supabase
        .from('user_profiles')
        .upsert(profile);

      if (error) {
        throw error;
      }

      // Update sync status
      profile.crossPlatformData.syncStatus = 'synced';
      profile.crossPlatformData.lastSync = new Date();
      profile.crossPlatformData.dataConsistency = 100;

      this.userProfiles.set(userId, profile);
    } catch (error) {
      console.error('Failed to sync cross-platform data:', error);
      const profile = this.userProfiles.get(userId);
      if (profile) {
        profile.crossPlatformData.syncStatus = 'error';
      }
    }
  }

  private async enhanceProfileWithAI(
    profile: EnhancedUserProfile,
    newData: Partial<EnhancedUserProfile>
  ): Promise<EnhancedUserProfile> {
    try {
      const prompt = `
        As an AI profile enhancement system, intelligently merge user profile data:
        
        Current Profile: ${JSON.stringify(profile, null, 2)}
        New Data: ${JSON.stringify(newData, null, 2)}
        
        Enhance the profile by:
        - Intelligently merging preferences
        - Updating behavioral patterns
        - Maintaining consistency
        - Adding insights
        
        Provide enhanced profile in JSON format.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'profile_enhancement',
        expertise: 'user_profiles'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Profile enhancement failed, using basic merge:', error);
      return { ...profile, ...newData };
    }
  }

  private async enhancePreferencesWithAI(
    currentPreferences: any,
    newPreferences: any
  ): Promise<any> {
    try {
      const prompt = `
        As an AI preference enhancement system, intelligently merge user preferences:
        
        Current Preferences: ${JSON.stringify(currentPreferences, null, 2)}
        New Preferences: ${JSON.stringify(newPreferences, null, 2)}
        
        Merge preferences intelligently, resolving conflicts and maintaining consistency.
        
        Provide merged preferences in JSON format.
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'preference_enhancement',
        expertise: 'user_preferences'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Preference enhancement failed, using basic merge:', error);
      return { ...currentPreferences, ...newPreferences };
    }
  }

  private createDefaultProfile(userId: string, sessionId: string): EnhancedUserProfile {
    return {
      id: userId,
      sessionId,
      personalInfo: {
        preferredContact: 'email',
        timezone: 'Australia/Sydney',
        language: 'en',
        communicationStyle: 'friendly',
        responseTime: 'within_hour'
      },
      preferences: {
        budgetRange: { min: 500000, max: 1500000 },
        preferredLocations: [],
        propertyTypes: [],
        mustHaveFeatures: [],
        niceToHaveFeatures: [],
        dealBreakers: [],
        timeline: 'flexible',
        financingStatus: 'pre-approved',
        investmentGoals: [],
        riskTolerance: 'moderate'
      },
      lifestyle: {
        familySize: 1,
        pets: false,
        workFromHome: false,
        commutePreferences: [],
        lifestyleType: 'urban',
        hobbies: [],
        socialPreferences: []
      },
      behavioralData: {
        searchHistory: [],
        interactionPatterns: {
          preferredTimeOfDay: 'morning',
          sessionDuration: 0,
          messageFrequency: 0,
          responseTime: 0,
          preferredPlatform: 'web',
          deviceType: 'desktop'
        },
        emotionalState: {
          current: 'neutral',
          history: [],
          stressIndicators: [],
          satisfactionFactors: []
        },
        engagementLevel: {
          score: 50,
          trend: 'stable',
          lastActive: new Date(),
          totalSessions: 1,
          averageSessionLength: 0,
          completionRate: 0
        },
        learningStyle: {
          prefers: 'interactive',
          detailLevel: 'medium',
          examplesNeeded: true,
          stepByStep: true
        }
      },
      conversationContext: {
        currentIntent: 'discovery',
        conversationStage: 'discovery',
        previousTopics: [],
        unresolvedQuestions: [],
        nextSteps: [],
        conversationFlow: [],
        contextSwitches: 0,
        topicDepth: 0
      },
      crossPlatformData: {
        platforms: ['web'],
        conversationIds: [sessionId],
        lastSync: new Date(),
        syncStatus: 'synced',
        dataConsistency: 100
      },
      aiPersonality: {
        preferredTone: 'friendly',
        communicationStyle: 'conversational',
        expertiseLevel: 'intermediate',
        culturalContext: 'Australian',
        languagePreferences: ['en']
      }
    };
  }

  private async persistProfile(profile: EnhancedUserProfile): Promise<void> {
    try {
      // Store in localStorage for immediate access
      localStorage.setItem(`user_profile_${profile.id}`, JSON.stringify(profile));
      
      // Store in Supabase for persistence
      const { error } = await supabase
        .from('user_profiles')
        .upsert(profile);

      if (error) {
        console.warn('Failed to persist profile to Supabase:', error);
      }
    } catch (error) {
      console.error('Failed to persist profile:', error);
    }
  }

  private async persistContextualMemory(memory: EnhancedContextualMemory): Promise<void> {
    try {
      // Store in localStorage for immediate access
      localStorage.setItem(`contextual_memory_${memory.userProfile.id}`, JSON.stringify(memory));
      
      // Store in Supabase for persistence
      const { error } = await supabase
        .from('contextual_memories')
        .upsert(memory);

      if (error) {
        console.warn('Failed to persist contextual memory to Supabase:', error);
      }
    } catch (error) {
      console.error('Failed to persist contextual memory:', error);
    }
  }

  private loadStoredProfiles(): void {
    try {
      // Load from localStorage
      const keys = Object.keys(localStorage);
      const profileKeys = keys.filter(key => key.startsWith('user_profile_'));
      
      profileKeys.forEach(key => {
        const profileData = localStorage.getItem(key);
        if (profileData) {
          const profile = JSON.parse(profileData);
          this.userProfiles.set(profile.id, profile);
        }
      });

      // Load contextual memories
      const memoryKeys = keys.filter(key => key.startsWith('contextual_memory_'));
      
      memoryKeys.forEach(key => {
        const memoryData = localStorage.getItem(key);
        if (memoryData) {
          const memory = JSON.parse(memoryData);
          this.contextualMemories.set(memory.userProfile.id, memory);
        }
      });
    } catch (error) {
      console.error('Failed to load stored profiles:', error);
    }
  }

  // Fallback methods
  private getFallbackConversationFlow(): PredictiveConversationFlow {
    return {
      nextLikelyIntents: [
        {
          intent: 'property_search',
          probability: 60,
          triggers: ['search', 'find', 'looking for'],
          context: 'User is likely to search for properties'
        }
      ],
      suggestedResponses: [
        {
          response: 'I can help you find the perfect property. What are you looking for?',
          context: 'general_assistance',
          confidence: 80,
          personalization: ['friendly_tone']
        }
      ],
      proactiveSuggestions: [
        {
          suggestion: 'Would you like me to show you some properties in your preferred locations?',
          timing: 'immediate',
          priority: 'medium',
          reasoning: 'User engagement optimization'
        }
      ],
      conversationOptimization: {
        flowImprovements: ['Ask more specific questions'],
        engagementBoosters: ['Provide visual examples'],
        satisfactionEnhancers: ['Follow up on preferences']
      }
    };
  }

  private getFallbackEmotionalIntelligence(): EmotionalIntelligence {
    return {
      currentEmotion: 'neutral',
      emotionHistory: [],
      stressLevel: 30,
      satisfactionLevel: 70,
      engagementLevel: 60,
      emotionalTriggers: {
        positive: ['helpful responses', 'quick answers'],
        negative: ['delays', 'confusion'],
        neutral: ['information requests']
      },
      adaptationStrategies: {
        stressReduction: ['Provide clear explanations', 'Offer step-by-step guidance'],
        satisfactionEnhancement: ['Acknowledge preferences', 'Provide relevant suggestions'],
        engagementImprovement: ['Ask engaging questions', 'Share interesting insights']
      },
      sentimentAnalysis: {
        overall: 'positive',
        confidence: 75,
        factors: ['helpful responses', 'quick assistance'],
        trends: ['increasing satisfaction']
      }
    };
  }
}

export const enhancedContextualMemorySystem = new EnhancedContextualMemorySystem();
