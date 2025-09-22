// XNode Distributed Computing API
import { propGuardAPI } from './propguard';

export class XNodeAPI {
  async getDistributedValuation(propertyData: any, comparables: any[], riskData: any, marketFactors: any) {
    return propGuardAPI.getDistributedValuation(propertyData, comparables, riskData, marketFactors);
  }

  async getDistributedRiskAssessment(propertyData: any) {
    return propGuardAPI.request('/xnode/distributed-risk-assessment', {
      method: 'POST',
      body: JSON.stringify({ property_data: propertyData })
    });
  }

  async getXNodeHealth() {
    return propGuardAPI.request('/xnode/xnode-health');
  }
}

export const xnodeAPI = new XNodeAPI();