// PropGuard API Service - Main backend integration
export class PropGuardAPI {
  private baseURL = 'https://9yhyi3c8nkjv.manus.space/api';

  async analyzeProperty(command: string) {
    return this.request('/propguard/process-command', {
      method: 'POST',
      body: JSON.stringify({ command })
    });
  }

  async getPropertySentiment(description: string) {
    return this.request('/llm/property-sentiment', {
      method: 'POST',
      body: JSON.stringify({ description })
    });
  }

  async getMarketSentiment(marketData: any) {
    return this.request('/llm/market-sentiment', {
      method: 'POST',
      body: JSON.stringify({ market_data: marketData })
    });
  }

  async getFinancialImpactAssessment(propertyData: any, loanAmount: number) {
    return this.request('/pipeline/financial-impact-assessment', {
      method: 'POST',
      body: JSON.stringify({ property_data: propertyData, loan_amount: loanAmount })
    });
  }

  async getDistributedValuation(propertyData: any, comparables: any[], riskData: any, marketFactors: any) {
    return this.request('/xnode/distributed-valuation', {
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
    return this.request('/blockchain/mint-valuation-nft', {
      method: 'POST',
      body: JSON.stringify({
        property_data: propertyData,
        valuation_data: valuationData
      })
    });
  }

  async checkSystemHealth() {
    const [propguardHealth, llmHealth, blockchainHealth, xnodeHealth, pipelineHealth] = await Promise.allSettled([
      this.request('/propguard/health'),
      this.request('/llm/health'),
      this.request('/blockchain/blockchain-health'),
      this.request('/xnode/xnode-health'),
      this.request('/pipeline/pipeline-health')
    ]);

    return {
      propguard: propguardHealth.status === 'fulfilled' ? propguardHealth.value : null,
      llm: llmHealth.status === 'fulfilled' ? llmHealth.value : null,
      blockchain: blockchainHealth.status === 'fulfilled' ? blockchainHealth.value : null,
      xnode: xnodeHealth.status === 'fulfilled' ? xnodeHealth.value : null,
      pipeline: pipelineHealth.status === 'fulfilled' ? pipelineHealth.value : null
    };
  }

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
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
}

export const propGuardAPI = new PropGuardAPI();