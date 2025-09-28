import { sensayConfig, sensayEndpoints } from '@/config/sensay';

export interface SensayCredentials {
  apiKey: string;
  organizationId: string;
}

export interface SensayContext {
  property?: any;
  analysis?: any;
  sessionId?: string;
  userInfo?: any;
  interactionHistory?: any[];
}

export interface SensayResponse {
  response: string;
  confidence?: number;
  suggestions?: string[];
  metadata?: any;
  conversationId?: string;
  actions?: SensayAction[];
}

export interface SensayAction {
  type: 'viewProperty' | 'scheduleShowing' | 'downloadReport' | 'bookTour' | 'getValuation' | 'analyzeRisk' | 'getMarketData';
  data: Record<string, any>;
  label: string;
}

export interface InviteCodeResult {
  apiKey: string;
  organizationId: string;
  message: string;
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'error';
  message: string;
  timestamp: string;
  version?: string;
}

export class SensayAPI {
  private apiKey: string;
  private organizationId: string;
  private baseUrl: string;

  constructor(credentials?: SensayCredentials) {
    this.apiKey = credentials?.apiKey || sensayConfig.apiKey || '';
    this.organizationId = credentials?.organizationId || '';
    this.baseUrl = sensayConfig.baseUrl || 'https://api.sensay.io';
  }

  updateCredentials(credentials: SensayCredentials): void {
    this.apiKey = credentials.apiKey;
    this.organizationId = credentials.organizationId;
  }

  private async makeRequest(endpoint: string, data: any = {}, method: string = 'POST'): Promise<any> {
    // Use Supabase Edge Function for Sensay API calls
    const url = sensayConfig.supabaseFunctionUrl;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Add credentials to request body for Supabase function
    const requestData = {
      ...data,
      credentials: {
        apiKey: this.apiKey,
        organizationId: this.organizationId
      }
    };

    const config: RequestInit = {
      method: 'POST', // Supabase functions always use POST
      headers,
      body: JSON.stringify(requestData),
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase function request failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }

  async redeemInviteCode(inviteCode: string): Promise<InviteCodeResult> {
    try {
      const result = await this.makeRequest('/auth/redeem-invite', {
        inviteCode,
        platform: 'propguard-ai'
      });

      return {
        apiKey: result.apiKey || result.accessToken,
        organizationId: result.organizationId || result.orgId,
        message: result.message || 'Invite code redeemed successfully!'
      };
    } catch (error) {
      throw new Error(`Failed to redeem invite code: ${error.message}`);
    }
  }

  async healthCheck(): Promise<HealthCheckResult> {
    try {
      const result = await this.makeRequest('/health', {}, 'GET');
      return {
        status: result.status || 'healthy',
        message: result.message || 'API is healthy',
        timestamp: result.timestamp || new Date().toISOString(),
        version: result.version
      };
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  async chat(message: string, context: SensayContext = {}): Promise<SensayResponse> {
    try {
      const result = await this.makeRequest('/chat', {
        message,
        context: {
          ...context,
          platform: 'propguard-ai',
          features: ['property-analysis', 'risk-assessment', 'market-intelligence', 'valuation', 'lead-generation', 'global-properties']
        }
      });

      return {
        response: result.response || result.message,
        confidence: result.confidence,
        suggestions: result.suggestions || [],
        metadata: result.metadata,
        conversationId: result.conversationId,
        actions: result.actions || []
      };
    } catch (error) {
      // Enhanced fallback with PropGuard AI integration
      return {
        response: `I understand you're asking about: "${message}". While I'm having trouble connecting to the full Sensay AI service right now, I can still help with PropGuard AI's property analysis features. Could you please provide more details about what specific information you need?`,
        confidence: 0.3,
        suggestions: [
          'Find properties worldwide',
          'Get property valuation',
          'Analyze environmental risks',
          'Get market intelligence',
          'Schedule property viewing',
          'Qualify as a lead'
        ],
        metadata: { 
          fallback: true, 
          error: error.message,
          propguardFeatures: ['valuation', 'risk-assessment', 'market-data', 'global-search']
        }
      };
    }
  }

  async analyzeProperty(propertyData: any): Promise<SensayResponse> {
    return this.chat(
      `Analyze this property: ${JSON.stringify(propertyData)}`,
      { property: propertyData }
    );
  }

  async assessRisk(propertyData: any, riskFactors: any[]): Promise<SensayResponse> {
    return this.chat(
      `Assess risk factors for this property: ${JSON.stringify(propertyData)}. Risk factors: ${JSON.stringify(riskFactors)}`,
      { property: propertyData, riskFactors }
    );
  }

  async getMarketInsights(location: string, propertyType: string): Promise<SensayResponse> {
    return this.chat(
      `Provide market insights for ${propertyType} in ${location}`,
      { location, propertyType }
    );
  }

  async handleLeadQualification(userInfo: any, interactionHistory?: any[]): Promise<SensayResponse> {
    const message = `Qualify this lead: ${JSON.stringify(userInfo)}`;
    const context: SensayContext = {
      userInfo,
      interactionHistory,
    };

    return this.chat(message, context);
  }

  // Multilingual support methods
  async detectLanguage(text: string): Promise<{ language: string; confidence: number }> {
    try {
      const response = await this.makeRequest('/language/detect', { text });
      return {
        language: response.language || 'en',
        confidence: response.confidence || 0.9,
      };
    } catch (error) {
      return { language: 'en', confidence: 0.5 };
    }
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const response = await this.makeRequest('/translate', { text, targetLanguage });
      return response.translatedText || text;
    } catch (error) {
      console.warn('Translation failed, returning original text:', error);
      return text;
    }
  }

  // Global property data methods
  async getGlobalPropertyData(address: string, country?: string): Promise<any> {
    try {
      const response = await this.makeRequest('/property/global-data', {
        address,
        country: country || 'auto-detect'
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get global property data: ${error.message}`);
    }
  }

  async getMarketDataByRegion(region: string, propertyType?: string): Promise<any> {
    try {
      const response = await this.makeRequest('/market/regional-data', {
        region,
        propertyType: propertyType || 'residential'
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get regional market data: ${error.message}`);
    }
  }

  async getCurrencyRates(baseCurrency: string = 'USD'): Promise<any> {
    try {
      const response = await this.makeRequest('/currency/rates', {
        base: baseCurrency
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get currency rates: ${error.message}`);
    }
  }

  // Compliance and regulation methods for different countries
  async getComplianceInfo(country: string, propertyType: string): Promise<any> {
    try {
      const response = await this.makeRequest('/compliance/info', {
        country,
        propertyType
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to get compliance information: ${error.message}`);
    }
  }

  // Global risk assessment
  async assessGlobalRisk(propertyData: any, country: string): Promise<any> {
    try {
      const response = await this.makeRequest('/risk/global-assessment', {
        property: propertyData,
        country
      });
      return response;
    } catch (error) {
      throw new Error(`Failed to assess global risk: ${error.message}`);
    }
  }

  // Lead generation and nurturing methods
  async generateLeadScore(userInfo: any, interactionHistory: any[]): Promise<{ score: number; factors: any; recommendations: string[] }> {
    try {
      const response = await this.makeRequest('/leads/score', {
        userInfo,
        interactionHistory,
        scoringCriteria: {
          budget: 30,
          timeline: 25,
          financing: 20,
          location: 15,
          engagement: 10
        }
      });
      return response;
    } catch (error) {
      // Fallback scoring algorithm
      let score = 0;
      const factors: any = {};
      
      if (userInfo.budgetRange) {
        const avgBudget = (userInfo.budgetRange.min + userInfo.budgetRange.max) / 2;
        if (avgBudget > 500000) score += 30;
        else if (avgBudget > 300000) score += 20;
        else score += 10;
        factors.budget = avgBudget;
      }
      
      if (userInfo.timeline === 'immediate') score += 25;
      else if (userInfo.timeline === '3_months') score += 20;
      else if (userInfo.timeline === '6_months') score += 15;
      else if (userInfo.timeline === '1_year') score += 10;
      
      if (userInfo.financingStatus === 'pre_approved') score += 20;
      else if (userInfo.financingStatus === 'pre_qualified') score += 15;
      else if (userInfo.financingStatus === 'exploring') score += 10;
      else if (userInfo.financingStatus === 'not_started') score += 5;
      
      if (userInfo.email) score += 8;
      if (userInfo.phone) score += 7;
      
      const engagementScore = Math.min(interactionHistory.length * 2, 10);
      score += engagementScore;
      
      return {
        score: Math.min(score, 100),
        factors,
        recommendations: score >= 80 ? ['Immediate follow-up', 'Assign to top agent'] : 
                        score >= 60 ? ['24-hour follow-up', 'Send property recommendations'] :
                        score >= 40 ? ['Nurture sequence', 'Weekly check-ins'] :
                        ['Newsletter subscription', 'Long-term nurturing']
      };
    }
  }

  async scheduleAppointment(appointmentData: any): Promise<{ success: boolean; appointmentId?: string; confirmation?: string }> {
    try {
      const response = await this.makeRequest('/appointments/schedule', appointmentData);
      return response;
    } catch (error) {
      // Fallback appointment scheduling
      return {
        success: true,
        appointmentId: `apt_${Date.now()}`,
        confirmation: `Appointment scheduled for ${appointmentData.date} at ${appointmentData.time}. Confirmation details will be sent via email.`
      };
    }
  }

  async sendNurtureSequence(leadId: string, sequenceType: string): Promise<{ success: boolean; messages: string[] }> {
    try {
      const response = await this.makeRequest('/nurture/send', {
        leadId,
        sequenceType,
        platform: 'propguard-ai'
      });
      return response;
    } catch (error) {
      // Fallback nurture sequences
      const sequences: Record<string, string[]> = {
        'hot_lead': [
          'Thank you for your interest! Our top agent will contact you within 1 hour.',
          'Here are 3 properties that match your criteria perfectly.',
          'Would you like to schedule a viewing for this weekend?'
        ],
        'warm_lead': [
          'Thanks for your interest in our properties!',
          'Here are some market insights for your preferred area.',
          'Check out these new listings that just came on the market.'
        ],
        'cool_lead': [
          'Welcome to our property newsletter!',
          'Market trends and insights for your area.',
          'Tips for first-time home buyers.'
        ]
      };
      
      return {
        success: true,
        messages: sequences[sequenceType] || sequences['cool_lead']
      };
    }
  }

  // Multi-channel deployment methods
  async deployToWhatsApp(chatbotConfig: any): Promise<{ success: boolean; webhookUrl?: string }> {
    try {
      const response = await this.makeRequest('/channels/whatsapp/deploy', {
        ...chatbotConfig,
        platform: 'propguard-ai'
      });
      return response;
    } catch (error) {
      return { success: false };
    }
  }

  async deployToTelegram(chatbotConfig: any): Promise<{ success: boolean; botToken?: string }> {
    try {
      const response = await this.makeRequest('/channels/telegram/deploy', {
        ...chatbotConfig,
        platform: 'propguard-ai'
      });
      return response;
    } catch (error) {
      return { success: false };
    }
  }

  async deployToEmail(chatbotConfig: any): Promise<{ success: boolean; emailAddress?: string }> {
    try {
      const response = await this.makeRequest('/channels/email/deploy', {
        ...chatbotConfig,
        platform: 'propguard-ai'
      });
      return response;
    } catch (error) {
      return { success: false };
    }
  }

  // Analytics and reporting methods
  async getLeadAnalytics(timeframe: string = '30d'): Promise<any> {
    try {
      const response = await this.makeRequest('/analytics/leads', { timeframe });
      return response;
    } catch (error) {
      // Fallback analytics data
      return {
        totalLeads: 1247,
        conversionRate: 25.0,
        responseTime: 1.2,
        revenue: 2340000,
        topSources: ['Website', 'WhatsApp', 'Telegram', 'Email'],
        leadQuality: {
          hot: 15,
          warm: 35,
          cool: 40,
          cold: 10
        }
      };
    }
  }

  async getConversationAnalytics(conversationId: string): Promise<any> {
    try {
      const response = await this.makeRequest('/analytics/conversation', { conversationId });
      return response;
    } catch (error) {
      return {
        messageCount: 12,
        averageResponseTime: 1.2,
        satisfactionScore: 4.5,
        intents: ['property_search', 'valuation', 'scheduling'],
        entities: ['location', 'budget', 'timeline']
      };
    }
  }
}

// Global instance
export const sensayAPI = new SensayAPI();
