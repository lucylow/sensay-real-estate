// Blockchain API Service
import { propGuardAPI } from './propguard';

export class BlockchainAPI {
  async mintPropertyNFT(propertyData: any, valuationData: any) {
    return propGuardAPI.mintPropertyNFT(propertyData, valuationData);
  }

  async getBlockchainHealth() {
    return propGuardAPI.checkSystemHealth();
  }

  async getComplianceReport(propertyId: string) {
    // Implementation for APRA compliance reporting
    return propGuardAPI.request('/blockchain/apra-compliance-report', {
      method: 'POST',
      body: JSON.stringify({ property_id: propertyId })
    });
  }
}

export const blockchainAPI = new BlockchainAPI();