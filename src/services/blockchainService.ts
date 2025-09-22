import { supabase } from '@/integrations/supabase/client';

export interface NFTMintRequest {
  propertyData: {
    address: string;
    valuation: number;
    riskScore: number;
    confidence: number;
  };
  valuationData: {
    estimated_value: number;
    confidence_score: number;
    risk_grade: string;
    compliance_status: any;
  };
}

export interface NFTVerificationRequest {
  tokenId?: string;
  transactionHash?: string;
}

export interface BlockchainNFT {
  token_id: string;
  property_address: string;
  valuation_amount: number;
  mint_date: string;
  owner: string;
  transaction_hash: string;
  verification_status: 'Verified' | 'Pending' | 'Failed';
  compliance_grade: string;
}

export class BlockchainService {
  
  async mintValuationNFT(request: NFTMintRequest) {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-valuation', {
        body: {
          action: 'mint',
          propertyData: request.propertyData,
          valuationData: request.valuationData
        }
      });

      if (error) throw error;

      return {
        success: true,
        transaction: data.transaction,
        metadata: data.metadata,
        ipfs_hash: data.ipfs_hash,
        verification_url: data.verification_url,
        opensea_url: data.opensea_url
      };
    } catch (error) {
      console.error('NFT minting failed:', error);
      throw new Error(`Failed to mint NFT: ${error.message}`);
    }
  }

  async verifyNFT(request: NFTVerificationRequest) {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-valuation', {
        body: {
          action: 'verify',
          tokenId: request.tokenId,
          transactionHash: request.transactionHash
        }
      });

      if (error) throw error;

      return {
        verified: data.verified,
        nft_details: data.nft_details,
        compliance_status: data.compliance_status,
        blockchain_proof: data.blockchain_proof
      };
    } catch (error) {
      console.error('NFT verification failed:', error);
      throw new Error(`Failed to verify NFT: ${error.message}`);
    }
  }

  async listNFTCollection(): Promise<BlockchainNFT[]> {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-valuation', {
        body: {
          action: 'list'
        }
      });

      if (error) throw error;

      return data.nfts || [];
    } catch (error) {
      console.error('Failed to list NFT collection:', error);
      throw new Error(`Failed to list NFTs: ${error.message}`);
    }
  }

  async getBlockchainHealth() {
    try {
      const { data, error } = await supabase.functions.invoke('blockchain-valuation', {
        body: {
          action: 'health'
        }
      });

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Blockchain health check failed:', error);
      throw new Error(`Blockchain health check failed: ${error.message}`);
    }
  }

  async generateAPRAComplianceReport(propertyData: any) {
    try {
      // Get comprehensive analysis first
      const { data: analysisData, error: analysisError } = await supabase.functions.invoke('enhanced-property-analysis', {
        body: {
          address: propertyData.address,
          analysisType: 'apra-compliance',
          loanAmount: propertyData.loanAmount
        }
      });

      if (analysisError) throw analysisError;

      const compliance = analysisData.analysis.compliance_analysis;

      return {
        property_details: propertyData,
        compliance_status: {
          apra_cps230_compliant: compliance.apra_cps230_compliant,
          basel_iii_compliant: compliance.basel_iii_compliant,
          overall_grade: compliance.lvr_analysis.risk_category,
          regulatory_notes: compliance.regulatory_notes
        },
        risk_assessment: analysisData.analysis.risk_assessment,
        lvr_analysis: compliance.lvr_analysis,
        generated_at: new Date().toISOString(),
        blockchain_verified: true,
        certificate_id: `APRA-${Date.now()}`
      };
    } catch (error) {
      console.error('APRA compliance report generation failed:', error);
      throw new Error(`Failed to generate APRA report: ${error.message}`);
    }
  }
}

export const blockchainService = new BlockchainService();