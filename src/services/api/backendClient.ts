import { APP_CONSTANTS } from '@/config/constants';

export class BackendClient {
  private baseURL = APP_CONSTANTS.API_BASE_URL;

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Backend API request failed: ${url}`, error);
      throw error;
    }
  }

  // PropGuard endpoints
  async processCommand(command: string) {
    return this.request(APP_CONSTANTS.ENDPOINTS.PROPGUARD.PROCESS_COMMAND, {
      method: 'POST',
      body: JSON.stringify({ command })
    });
  }

  async getMarketSentiment(location: string) {
    return this.request(APP_CONSTANTS.ENDPOINTS.PROPGUARD.MARKET_SENTIMENT, {
      method: 'POST',
      body: JSON.stringify({ location })
    });
  }

  async checkCompliance(propertyValue: number, loanAmount: number) {
    return this.request(APP_CONSTANTS.ENDPOINTS.PROPGUARD.COMPLIANCE_CHECK, {
      method: 'POST',
      body: JSON.stringify({ property_value: propertyValue, loan_amount: loanAmount })
    });
  }

  // AI Features endpoints
  async enhancedAnalysis(address: string) {
    return this.request(APP_CONSTANTS.ENDPOINTS.AI.ENHANCED_ANALYSIS, {
      method: 'POST',
      body: JSON.stringify({ address })
    });
  }

  async riskSimulation(scenario: string, propertyValue: number, location: string) {
    return this.request(APP_CONSTANTS.ENDPOINTS.AI.RISK_SIMULATION, {
      method: 'POST',
      body: JSON.stringify({ scenario, property_value: propertyValue, location })
    });
  }

  // Blockchain endpoints
  async mintNFT(propertyData: any, valuationData: any, riskMetrics: any) {
    return this.request(APP_CONSTANTS.ENDPOINTS.BLOCKCHAIN.MINT_NFT, {
      method: 'POST',
      body: JSON.stringify({
        bank_address: 'demo_bank_001',
        property_data: propertyData,
        valuation_data: valuationData,
        risk_metrics: riskMetrics
      })
    });
  }

  async getNFTCollection() {
    return this.request(APP_CONSTANTS.ENDPOINTS.BLOCKCHAIN.COLLECTION);
  }

  async getAPRAReport(propertyId: string) {
    return this.request(APP_CONSTANTS.ENDPOINTS.BLOCKCHAIN.APRA_REPORT, {
      method: 'POST',
      body: JSON.stringify({ property_id: propertyId })
    });
  }

  // XNode endpoints
  async getXNodeAnalysis(propertyData: any) {
    return this.request(APP_CONSTANTS.ENDPOINTS.XNODE.SIMPLE_ANALYSIS, {
      method: 'POST',
      body: JSON.stringify(propertyData)
    });
  }

  async getXNodeStatus() {
    return this.request(APP_CONSTANTS.ENDPOINTS.XNODE.NETWORK_STATUS);
  }
}

export const backendClient = new BackendClient();