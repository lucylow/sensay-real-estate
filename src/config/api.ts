// API Configuration for Manus Backend Integration

// Type definitions for API responses
export interface PropertyAnalysisResponse {
  address?: string;
  valuation?: number;
  story?: string;
  risk?: {
    flood: number;
    fire: number;
    coastalErosion: number;
    subsidence: number;
    market: number;
  };
  compliance?: {
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
    reasons: string[];
    lvr: number;
    dti: number;
  };
  analysis_result?: {
    current_valuation?: number;
    risk_score?: number;
    climate_risk?: string;
    lvr?: number;
    confidence?: number;
  };
}

export interface SentimentResponse {
  sentiment_analysis?: {
    sentiment: number;
    keywords?: [string, number][];
  };
}

export interface MarketResponse {
  market_sentiment?: {
    sentiment_score: number;
    trend: string;
    confidence: number;
    summary: string;
  };
}

export const API_CONFIG = {
  BASE_URL: 'https://9yhyi3c8nkjv.manus.space/api',
  ENDPOINTS: {
    // Core PropGuard endpoints
    PROPERTY_ANALYSIS: '/propguard/process-command',
    HEALTH_CHECK: '/propguard/health',
    
    // LLM Integration endpoints
    LLM_HEALTH: '/llm/health',
    PROPERTY_SENTIMENT: '/llm/property-sentiment',
    MARKET_SENTIMENT: '/llm/market-sentiment',
    GENERATE_LVR_REPORT: '/llm/generate-lvr-report',
    RISK_ASSESSMENT: '/llm/risk-assessment',
    COMPREHENSIVE_ANALYSIS: '/llm/comprehensive-analysis',
    
    // Blockchain endpoints
    MINT_NFT: '/blockchain/mint-valuation-nft',
    BLOCKCHAIN_HEALTH: '/blockchain/blockchain-health',
    APRA_COMPLIANCE: '/blockchain/apra-compliance-report',
    
    // XNode distributed computing
    DISTRIBUTED_VALUATION: '/xnode/distributed-valuation',
    DISTRIBUTED_RISK: '/xnode/distributed-risk-assessment',
    XNODE_HEALTH: '/xnode/xnode-health',
    
    // Data pipeline
    FINANCIAL_IMPACT: '/pipeline/financial-impact-assessment',
    MARKET_ANALYSIS: '/pipeline/market-analysis',
    PIPELINE_HEALTH: '/pipeline/pipeline-health',
    
    // Enhanced AI features
    ENHANCED_ANALYSIS: '/ai/enhanced-analysis',
    CLIMATE_RISK: '/ai/climate-risk-calculator',
    MARKET_SENTIMENT_AI: '/ai/market-sentiment-analysis'
  }
};

// HTTP Client with error handling
export class PropGuardAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Property Analysis Methods
  async analyzeProperty(command: string) {
    return this.request(API_CONFIG.ENDPOINTS.PROPERTY_ANALYSIS, {
      method: 'POST',
      body: JSON.stringify({ command })
    });
  }

  async getPropertySentiment(description: string) {
    return this.request(API_CONFIG.ENDPOINTS.PROPERTY_SENTIMENT, {
      method: 'POST',
      body: JSON.stringify({ description })
    });
  }

  async getMarketSentiment(marketData: any) {
    return this.request(API_CONFIG.ENDPOINTS.MARKET_SENTIMENT, {
      method: 'POST',
      body: JSON.stringify({ market_data: marketData })
    });
  }

  async generateLVRReport(propertyData: any) {
    return this.request(API_CONFIG.ENDPOINTS.GENERATE_LVR_REPORT, {
      method: 'POST',
      body: JSON.stringify({ property_data: propertyData })
    });
  }

  async getFinancialImpactAssessment(propertyData: any, loanAmount: number) {
    return this.request(API_CONFIG.ENDPOINTS.FINANCIAL_IMPACT, {
      method: 'POST',
      body: JSON.stringify({ property_data: propertyData, loan_amount: loanAmount })
    });
  }

  async getDistributedValuation(propertyData: any, comparables: any[], riskData: any, marketFactors: any) {
    return this.request(API_CONFIG.ENDPOINTS.DISTRIBUTED_VALUATION, {
      method: 'POST',
      body: JSON.stringify({
        property_data: propertyData,
        comparables,
        risk_data: riskData,
        market_factors: marketFactors
      })
    });
  }

  async mintPropertyNFT(propertyData: any, valuationData: any) {
    return this.request(API_CONFIG.ENDPOINTS.MINT_NFT, {
      method: 'POST',
      body: JSON.stringify({
        property_data: propertyData,
        valuation_data: valuationData
      })
    });
  }

  // Health check methods
  async checkSystemHealth() {
    const [propguardHealth, llmHealth, blockchainHealth, xnodeHealth, pipelineHealth] = await Promise.allSettled([
      this.request(API_CONFIG.ENDPOINTS.HEALTH_CHECK),
      this.request(API_CONFIG.ENDPOINTS.LLM_HEALTH),
      this.request(API_CONFIG.ENDPOINTS.BLOCKCHAIN_HEALTH),
      this.request(API_CONFIG.ENDPOINTS.XNODE_HEALTH),
      this.request(API_CONFIG.ENDPOINTS.PIPELINE_HEALTH)
    ]);

    return {
      propguard: propguardHealth.status === 'fulfilled' ? propguardHealth.value : null,
      llm: llmHealth.status === 'fulfilled' ? llmHealth.value : null,
      blockchain: blockchainHealth.status === 'fulfilled' ? blockchainHealth.value : null,
      xnode: xnodeHealth.status === 'fulfilled' ? xnodeHealth.value : null,
      pipeline: pipelineHealth.status === 'fulfilled' ? pipelineHealth.value : null
    };
  }
}

export const propGuardAPI = new PropGuardAPI();