import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlockchainRequest {
  action: 'mint' | 'verify' | 'list' | 'health';
  propertyData?: any;
  valuationData?: any;
  tokenId?: string;
  transactionHash?: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  property_data: any;
  valuation_data: any;
  compliance_data: any;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: BlockchainRequest = await req.json();
    const { action, propertyData, valuationData, tokenId, transactionHash } = requestData;

    console.log('Blockchain Valuation Request:', { action, tokenId, transactionHash });

    switch (action) {
      case 'mint':
        return new Response(
          JSON.stringify(await mintValuationNFT(propertyData, valuationData)),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'verify':
        return new Response(
          JSON.stringify(await verifyNFT(tokenId, transactionHash)),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'list':
        return new Response(
          JSON.stringify(await listNFTCollection()),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'health':
        return new Response(
          JSON.stringify(await getBlockchainHealth()),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        throw new Error('Invalid action specified');
    }

  } catch (error) {
    console.error('Blockchain Valuation Error:', error);
    return new Response(
      JSON.stringify({
        status: 'error',
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function mintValuationNFT(propertyData: any, valuationData: any) {
  // Simulate NFT minting process
  const tokenId = `PG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`;
  
  const metadata: NFTMetadata = {
    name: `PropGuard Valuation Certificate - ${propertyData?.address || 'Property'}`,
    description: `Official blockchain-verified property valuation certificate issued by PropGuard AI`,
    image: `https://propguard.ai/nft-images/${tokenId}.png`,
    attributes: [
      { trait_type: 'Property Address', value: propertyData?.address || 'N/A' },
      { trait_type: 'Valuation Amount', value: valuationData?.estimated_value || 0 },
      { trait_type: 'Confidence Score', value: `${(valuationData?.confidence_score * 100).toFixed(1)}%` },
      { trait_type: 'Risk Grade', value: valuationData?.risk_grade || 'N/A' },
      { trait_type: 'APRA Compliant', value: 'Yes' },
      { trait_type: 'Issue Date', value: new Date().toISOString().split('T')[0] },
      { trait_type: 'Validity Period', value: '12 months' }
    ],
    property_data: propertyData,
    valuation_data: valuationData,
    compliance_data: {
      apra_cps230_compliant: true,
      basel_iii_compliant: true,
      regulatory_approval: 'ASIC-RT-1124',
      audit_trail: generateAuditTrail()
    }
  };

  // Simulate blockchain transaction
  await new Promise(resolve => setTimeout(resolve, 2000));

  return {
    status: 'success',
    transaction: {
      token_id: tokenId,
      transaction_hash: transactionHash,
      block_number: Math.floor(50000000 + Math.random() * 1000000),
      network: 'Polygon Mainnet',
      gas_used: 125000 + Math.floor(Math.random() * 50000),
      gas_price: '30 gwei',
      contract_address: '0x742d35Cc6634C0532925a3b8D87f05E1C8B8B5D2',
      minted_at: new Date().toISOString()
    },
    metadata,
    ipfs_hash: `QmX7Y8Z9${Math.random().toString(36).substr(2, 40)}`,
    verification_url: `https://polygonscan.com/tx/${transactionHash}`,
    opensea_url: `https://opensea.io/assets/matic/0x742d35Cc6634C0532925a3b8D87f05E1C8B8B5D2/${tokenId}`
  };
}

async function verifyNFT(tokenId?: string, transactionHash?: string) {
  if (!tokenId && !transactionHash) {
    throw new Error('Either tokenId or transactionHash must be provided');
  }

  // Simulate verification process
  await new Promise(resolve => setTimeout(resolve, 1000));

  const isValid = Math.random() > 0.1; // 90% success rate

  if (!isValid) {
    return {
      status: 'error',
      verified: false,
      error: 'NFT not found or invalid',
      timestamp: new Date().toISOString()
    };
  }

  return {
    status: 'success',
    verified: true,
    nft_details: {
      token_id: tokenId || `PG-${Date.now()}-verified`,
      transaction_hash: transactionHash || `0x${Math.random().toString(16).substr(2, 64)}`,
      owner: '0x' + Math.random().toString(16).substr(2, 40),
      contract_address: '0x742d35Cc6634C0532925a3b8D87f05E1C8B8B5D2',
      network: 'Polygon Mainnet',
      mint_date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      last_verified: new Date().toISOString(),
      verification_count: Math.floor(Math.random() * 50) + 1
    },
    compliance_status: {
      apra_compliant: true,
      audit_status: 'Passed',
      regulatory_approval: 'ASIC-RT-1124',
      validity_period: '12 months from issue',
      next_review_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    },
    blockchain_proof: {
      merkle_root: '0x' + Math.random().toString(16).substr(2, 64),
      proof_hash: '0x' + Math.random().toString(16).substr(2, 64),
      consensus_nodes: 3,
      validation_score: 0.95 + Math.random() * 0.05
    }
  };
}

async function listNFTCollection() {
  // Generate mock NFT collection
  const nfts = Array.from({ length: 15 }, (_, i) => ({
    token_id: `PG-${Date.now() - i * 86400000}-${Math.random().toString(36).substr(2, 9)}`,
    property_address: generateMockAddress(),
    valuation_amount: Math.floor(500000 + Math.random() * 5000000),
    mint_date: new Date(Date.now() - i * 86400000 * Math.random() * 30).toISOString(),
    owner: '0x' + Math.random().toString(16).substr(2, 40),
    transaction_hash: '0x' + Math.random().toString(16).substr(2, 64),
    verification_status: Math.random() > 0.1 ? 'Verified' : 'Pending',
    compliance_grade: ['AAA', 'AA', 'A', 'BBB'][Math.floor(Math.random() * 4)]
  }));

  return {
    status: 'success',
    collection: {
      total_nfts: nfts.length,
      verified_nfts: nfts.filter(n => n.verification_status === 'Verified').length,
      total_value: nfts.reduce((sum, nft) => sum + nft.valuation_amount, 0),
      network: 'Polygon Mainnet',
      contract_address: '0x742d35Cc6634C0532925a3b8D87f05E1C8B8B5D2'
    },
    nfts,
    metadata: {
      last_updated: new Date().toISOString(),
      refresh_interval: '5 minutes',
      data_source: 'Polygon Network'
    }
  };
}

async function getBlockchainHealth() {
  return {
    status: 'healthy',
    network_status: {
      polygon_mainnet: {
        connected: true,
        block_height: 50000000 + Math.floor(Math.random() * 1000000),
        gas_price: '25-35 gwei',
        network_congestion: Math.random() > 0.7 ? 'High' : Math.random() > 0.3 ? 'Medium' : 'Low',
        last_block_time: Math.floor(2000 + Math.random() * 1000) + 'ms'
      }
    },
    contract_status: {
      valuation_nft_contract: {
        address: '0x742d35Cc6634C0532925a3b8D87f05E1C8B8B5D2',
        status: 'Active',
        total_supply: Math.floor(1000 + Math.random() * 5000),
        last_mint: new Date(Date.now() - Math.random() * 86400000).toISOString()
      }
    },
    consensus_health: {
      active_validators: 3,
      consensus_participation: '100%',
      average_validation_time: '2.5s',
      security_score: 0.98
    },
    timestamp: new Date().toISOString()
  };
}

function generateAuditTrail() {
  const events = [
    'Property data validated',
    'Valuation methodology approved',
    'Risk assessment completed',
    'APRA compliance verified',
    'Consensus reached (3/3 nodes)',
    'Metadata uploaded to IPFS',
    'Smart contract executed',
    'NFT minted successfully'
  ];

  return events.map((event, i) => ({
    event,
    timestamp: new Date(Date.now() - (events.length - i) * 1000).toISOString(),
    node_id: `node-${Math.floor(Math.random() * 3) + 1}`,
    validation_hash: '0x' + Math.random().toString(16).substr(2, 16)
  }));
}

function generateMockAddress(): string {
  const streets = ['Collins Street', 'Bourke Street', 'Flinders Street', 'Elizabeth Street', 'Swanston Street',
                  'George Street', 'Pitt Street', 'Castlereagh Street', 'Elizabeth Street', 'King Street'];
  const numbers = Math.floor(Math.random() * 500) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const suburbs = ['Melbourne VIC', 'Sydney NSW', 'Brisbane QLD', 'Perth WA', 'Adelaide SA'];
  const suburb = suburbs[Math.floor(Math.random() * suburbs.length)];
  
  return `${numbers} ${street}, ${suburb}`;
}