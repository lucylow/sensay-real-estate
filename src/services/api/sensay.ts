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
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    if (this.organizationId) {
      headers['X-Organization-ID'] = this.organizationId;
    }

    const config: RequestInit = {
      method,
      headers,
    };

    if (method !== 'GET' && Object.keys(data).length > 0) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${errorText}`);
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
          features: ['property-analysis', 'risk-assessment', 'market-intelligence', 'valuation']
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
      // Fallback to local response when API is unavailable
      return {
        response: `I understand you're asking about: "${message}". While I'm having trouble connecting to the full AI service right now, I can still help with basic property analysis. Could you please provide more details about what specific information you need?`,
        confidence: 0.3,
        suggestions: [
          'Tell me about this property',
          'What's the market value?',
          'Show me risk factors',
          'Get investment analysis'
        ],
        metadata: { fallback: true, error: error.message }
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
}

// Global instance
export const sensayAPI = new SensayAPI();
