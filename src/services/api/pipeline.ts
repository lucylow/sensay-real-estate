// Data Pipeline API Service
import { propGuardAPI } from './propguard';

export class PipelineAPI {
  async getFinancialImpactAssessment(propertyData: any, loanAmount: number) {
    return propGuardAPI.getFinancialImpactAssessment(propertyData, loanAmount);
  }

  async getMarketAnalysis(locationData: any) {
    return propGuardAPI.request('/pipeline/market-analysis', {
      method: 'POST',
      body: JSON.stringify({ location_data: locationData })
    });
  }

  async getPipelineHealth() {
    return propGuardAPI.request('/pipeline/pipeline-health');
  }
}

export const pipelineAPI = new PipelineAPI();