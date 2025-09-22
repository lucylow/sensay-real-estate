// Application Constants
export const APP_CONSTANTS = {
  APP_NAME: 'PropGuard AI',
  APP_DESCRIPTION: 'AI-Powered Property Risk Assessment & Valuation',
  API_VERSION: 'v1',
  DEFAULT_TIMEOUT: 10000,
  REFRESH_INTERVAL: 30000,
  
  // API Configuration - Using Supabase Edge Functions
  API_BASE_URL: 'https://mpbwpixpuonkczxgkjks.supabase.co/functions/v1',
  
  // API Endpoints
  ENDPOINTS: {
    // Supabase Edge Functions
    SUPABASE: {
      PROPERTY_ANALYSIS: '/property-analysis',
      ENHANCED_ANALYSIS: '/enhanced-property-analysis',
      MARKET_INTELLIGENCE: '/market-intelligence',
      BLOCKCHAIN_VALUATION: '/blockchain-valuation',
      NASA_FIRE_RISK: '/nasa-fire-risk',
      DOMAIN_SEARCH: '/domain-au-search',
      MAPBOX_TOKEN: '/get-mapbox-token'
    },
    
    // PropGuard main endpoints (fallback)
    PROPGUARD: {
      PROCESS_COMMAND: '/propguard/process-command',
      MARKET_SENTIMENT: '/propguard/market-sentiment',
      COMPLIANCE_CHECK: '/propguard/compliance-check',
      HEALTH: '/propguard/health'
    },
    
    // AI Features endpoints
    AI: {
      ENHANCED_ANALYSIS: '/ai/enhanced-analysis',
      SENTIMENT_ANALYSIS: '/ai/market-sentiment-analysis',
      RISK_SIMULATION: '/ai/risk-simulation',
      FINANCIAL_IMPACT: '/ai/financial-impact-assessment'
    },
    
    // Blockchain endpoints
    BLOCKCHAIN: {
      MINT_NFT: '/blockchain/mint-valuation-nft',
      VERIFY_NFT: '/blockchain/verify-nft',
      COLLECTION: '/blockchain/nft-collection',
      APRA_REPORT: '/blockchain/apra-compliance-report',
      HEALTH: '/blockchain/blockchain-health'
    },
    
    // XNode endpoints
    XNODE: {
      SIMPLE_ANALYSIS: '/xnode/simple-analysis',
      NETWORK_STATUS: '/xnode/network-status'
    },
    
    // Data Pipeline endpoints
    PIPELINE: {
      DATA_SYNC: '/pipeline/sync-data',
      STATUS: '/pipeline/status'
    },
    
    // LLM endpoints
    LLM: {
      PROPERTY_ANALYSIS: '/llm/property-analysis',
      RISK_ASSESSMENT: '/llm/risk-assessment'
    }
  },
  
  // Risk thresholds
  RISK_THRESHOLDS: {
    LOW: 0.3,
    MEDIUM: 0.6,
    HIGH: 0.8
  },
  
  // LVR limits
  LVR_LIMITS: {
    RESIDENTIAL: 0.8,
    INVESTMENT: 0.7,
    COMMERCIAL: 0.65
  },
  
  // Supported property types
  PROPERTY_TYPES: [
    'house',
    'apartment',
    'townhouse',
    'unit',
    'commercial',
    'land'
  ] as const
};

export type PropertyType = typeof APP_CONSTANTS.PROPERTY_TYPES[number];