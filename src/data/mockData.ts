import { PropertyAnalysis, SentimentAnalysis, MarketSentiment } from '@/types/property';

// Enhanced mock data for "123 Collins Street, Melbourne VIC" - HACKATHON DEMO
export const COLLINS_STREET_MOCK_DATA = {
  // Property Details
  propertyData: {
    address: '123 Collins Street, Melbourne VIC',
    bedrooms: 2,
    bathrooms: 2,
    land_size: 0, // Apartment
    year_built: 1985,
    property_type: 'Commercial Office Building',
    lat: -37.8136,
    lng: 144.9631,
    size_sqm: 2450,
    floors: 15,
    heritage_listed: true,
    last_renovated: 2015
  },

  // Enhanced Property Analysis
  propertyAnalysis: {
    current_valuation: 8500000,
    valuation_range: {
      min: 8200000,
      max: 8900000
    },
    risk_score: 66,
    confidence: 92,
    lvr: 0.72,
    analysis_result: {
      current_valuation: 8500000,
      risk_score: 66,
      climate_risk: 'High',
      lvr: 0.72,
      confidence: 92,
      story: 'Prime Collins Street location with exposure to Yarra River flooding. Heritage-listed building with strong fundamentals but climate adaptation required.',
      detailed_breakdown: {
        land_value: 5200000,
        building_value: 3100000,
        intangible_assets: 200000
      },
      market_comparables: [
        { address: '111 Collins St', value: 8100000, premium: 0.12 },
        { address: '130 Collins St', value: 7800000, premium: 0.08 },
        { address: '150 Lonsdale St', value: 6900000, premium: 0.23 }
      ],
      valuation_drivers: [
        { factor: 'Prime CBD location', impact: '+18% premium' },
        { factor: 'Heritage facade', impact: '+5% value' },
        { factor: 'Recent HVAC upgrade', impact: '+2.3% value' },
        { factor: 'Flood risk discount', impact: '-3.5%' }
      ],
      risk: {
        flood: 72,
        fire: 45,
        coastalErosion: 38,
        subsidence: 15,
        market: 25,
        detailed: {
          flood: {
            score: 72,
            level: 'High',
            factors: ['800m to Yarra River', '1.2m historical flood depth', 'Flood Zone 2B'],
            mitigation_cost: 42000,
            roi_years: 3.2
          },
          fire: {
            score: 45,
            level: 'Moderate',
            factors: ['4.2km to bushland', 'Fire station 850m away', 'Heritage materials'],
            bal_rating: 12.5
          },
          coastal: {
            score: 38,
            level: 'Low',
            factors: ['No direct coastal exposure', 'Future sea level impact minimal']
          }
        }
      },
      compliance: {
        status: 'APPROVED' as const,
        reasons: ['APRA CPS 230 Compliant', 'Climate risk assessed'],
        lvr: 0.72,
        dti: 4.2,
        detailed: {
          cps230: { score: 98, status: 'Compliant', last_audit: '2024-01-05' },
          nccp: { score: 95, status: 'Compliant', last_audit: '2023-12-15' },
          basel3: { score: 92, status: 'Compliant', last_audit: '2023-12-10' },
          cps234: { score: 88, status: 'Review Required', last_audit: '2023-11-20' }
        }
      }
    }
  } as PropertyAnalysis,

  // Enhanced Sentiment Analysis
  sentimentAnalysis: {
    sentiment: 7.8,
    risk_level: 2.1,
    market_trends: {
      momentum: 'Positive',
      volume_change: '+12.4%',
      price_velocity: '+4.2%'
    }
  } as SentimentAnalysis,

  // Enhanced Market Sentiment
  marketSentiment: {
    sentiment_score: 4.2,
    trend: 'bullish' as const,
    confidence: 85,
    summary: 'Melbourne CBD showing positive momentum with 4.2% growth over 12 months. Strong demand in premium Collins Street corridor despite climate risk considerations.',
    detailed_metrics: {
      cap_rate: 5.2,
      noi: 442000,
      cash_on_cash: 7.4,
      debt_coverage: 1.8
    }
  } as MarketSentiment,

  // Climate Projections Data
  climateProjections: [
    { year: '2030', temp: '+1.4°C', rainfall: '-8%', seaLevel: '+12cm', flood_risk: 74 },
    { year: '2050', temp: '+2.3°C', rainfall: '-15%', seaLevel: '+28cm', flood_risk: 78 },
    { year: '2070', temp: '+3.1°C', rainfall: '-22%', seaLevel: '+46cm', flood_risk: 82 }
  ],

  // Enhanced Risk Mitigation
  riskMitigation: [
    {
      priority: 'High',
      type: 'Flood Risk',
      cost: '$42,000',
      roi: '3.2 years',
      timeline: '3-6 months',
      impact: 'Reduces flood risk by 35%',
      actions: [
        'Install flood sensors and early warning system',
        'Upgrade stormwater drainage capacity',
        'Waterproof basement and lower levels',
        'Emergency evacuation protocols'
      ]
    },
    {
      priority: 'Medium',
      type: 'Fire Risk',
      cost: '$62,000',
      roi: 'Risk reduction 18%',
      timeline: '6-12 months',
      impact: 'Improves insurance rating',
      actions: [
        'Install fire-resistant building cladding',
        'Upgrade fire suppression systems',
        'Create defensible space planning',
        'Emergency response training'
      ]
    },
    {
      priority: 'Medium',
      type: 'Heritage Compliance',
      cost: '$120,000',
      roi: 'Regulatory compliance',
      timeline: '12-18 months',
      impact: 'Maintains heritage value premium',
      actions: [
        'Facade restoration using approved materials',
        'Window frame restoration',
        'Heritage impact assessment',
        'Council liaison and approvals'
      ]
    }
  ],

  // Blockchain & NFT Data
  blockchain: {
    nft_collection: [
      {
        id: 'PG-V-123COLLINS-20240108',
        property: '123 Collins Street, Melbourne VIC',
        minted_date: '2024-01-08T14:22:18.000Z',
        block_number: 42817291,
        transaction_hash: '0x4a7c2f8b9e1d3c5a7f9b2e4d6c8a0f3e5b7d9c1a4f6e8b0d2c5a7f9b3e1d6c8a',
        owner: '0x3F5CE5A7D9B2F4E6C8A0D3F5E7B9C1A4F6E8B0D2',
        verified: true,
        apra_compliant: true
      },
      {
        id: 'PG-V-456BOURKE-20240105',
        property: '456 Bourke Street, Melbourne VIC',
        minted_date: '2024-01-05T09:15:32.000Z',
        block_number: 42815847,
        transaction_hash: '0x7b9c1a4f6e8b0d2c5a7f9b3e1d6c8a0f3e5b7d9c1a4f6e8b0d2c5a7f9b3e1d',
        owner: '0x8B0D2C5A7F9B3E1D6C8A0F3E5B7D9C1A4F6E8B0D',
        verified: true,
        apra_compliant: true
      }
    ],
    audit_trail: [
      { timestamp: '2024-01-08T14:15:00.000Z', event: 'Valuation consensus reached (3/3 nodes)', status: 'success' },
      { timestamp: '2024-01-08T14:18:00.000Z', event: 'APRA compliance check passed', status: 'success' },
      { timestamp: '2024-01-08T14:20:00.000Z', event: 'NFT minted on Polygon', status: 'success' },
      { timestamp: '2024-01-08T14:25:00.000Z', event: 'Certificate added to bank ledger', status: 'success' }
    ]
  },

  // System Health Data
  systemHealth: {
    propguard: { success: true, message: 'Online', latency: '142ms', last_check: '2024-01-08T15:30:00.000Z' },
    llm: { success: true, message: 'OpenAI GPT-4 Active', latency: '89ms', last_check: '2024-01-08T15:30:00.000Z' },
    blockchain: { success: true, message: 'Syncing (98%)', latency: '256ms', last_check: '2024-01-08T15:30:00.000Z' },
    xnode: { success: true, message: 'Real Estate API Connected', latency: '134ms', last_check: '2024-01-08T15:30:00.000Z' },
    pipeline: { success: true, message: 'Data Pipeline Active', latency: '67ms', last_check: '2024-01-08T15:30:00.000Z' },
    nasa: { success: true, message: 'NASA FIRMS Connected', latency: '298ms', last_check: '2024-01-08T15:30:00.000Z' }
  },

  // Analytics Confidence Timeline
  confidenceGrowth: [
    { date: '2023-01', confidence: 82, valuation: 7800000 },
    { date: '2023-06', confidence: 85, valuation: 8100000 },
    { date: '2023-12', confidence: 88, valuation: 8300000 },
    { date: '2024-01', confidence: 92, valuation: 8500000 }
  ],

  // Property History Timeline
  propertyHistory: [
    { year: 1928, event: 'Built as commercial headquarters', value: null },
    { year: 1985, event: 'Heritage listing (facade only)', value: null },
    { year: 2015, event: 'Major renovation', value: 6200000, cost: 2100000 },
    { year: 2022, event: 'Flood damage', value: 7500000, cost: 350000 },
    { year: 2023, event: 'HVAC system upgrade', value: 8100000, cost: 420000 },
    { year: 2024, event: 'Current valuation', value: 8500000, cost: null }
  ],

  // Financial Analysis
  financialMetrics: {
    investment_metrics: {
      cap_rate: 5.2,
      noi: 442000,
      cash_on_cash: 7.4,
      debt_coverage: 1.8,
      dscr: 1.8
    },
    sensitivity_analysis: [
      { scenario: 'Base Case', valuation: 8500000, change: 0 },
      { scenario: 'Interest Rate +2%', valuation: 7900000, change: -7.1 },
      { scenario: 'Flood Risk Materializes', valuation: 7200000, change: -15.3 },
      { scenario: 'Heritage Listing Premium', valuation: 8800000, change: 3.5 }
    ],
    financing_options: [
      { type: 'Traditional Mortgage', rate: 4.85, lvr: 70, description: 'Standard commercial loan' },
      { type: 'Green Loan', rate: 4.35, lvr: 70, description: 'Requires risk mitigation' },
      { type: 'Portfolio Loan', rate: 5.15, lvr: 80, description: 'Multi-property facility' },
      { type: 'Mezzanine Finance', rate: 9.2, lvr: 90, description: 'Higher risk premium' }
    ]
  },

  // Sample Reports Data
  reports: [
    {
      id: 'PG-VR-2024-123COLLINS',
      title: 'Comprehensive Valuation Report',
      property: '123 Collins Street, Melbourne VIC',
      date: '2024-01-08',
      type: 'Valuation',
      status: 'Complete',
      pages: 24,
      size: '2.4 MB'
    },
    {
      id: 'PG-RA-2024-123COLLINS',
      title: 'Climate Risk Assessment',
      property: '123 Collins Street, Melbourne VIC',
      date: '2024-01-05',
      type: 'Risk Analysis',
      status: 'Complete',
      pages: 18,
      size: '1.8 MB'
    },
    {
      id: 'PG-AC-2024-123COLLINS',
      title: 'APRA Compliance Report',
      property: '123 Collins Street, Melbourne VIC',
      date: '2024-01-03',
      type: 'Compliance',
      status: 'Complete',
      pages: 12,
      size: '1.2 MB'
    }
  ],

  // Pricing Tiers
  pricing: {
    plans: [
      {
        name: 'Starter',
        price: 299,
        period: 'month',
        features: [
          'Up to 50 valuations/month',
          'Basic risk assessment',
          'Standard reporting',
          'Email support',
          'API access (1000 calls/month)'
        ],
        popular: false
      },
      {
        name: 'Professional',
        price: 899,
        period: 'month',
        features: [
          'Up to 500 valuations/month',
          'Advanced risk modeling',
          'Custom reporting',
          'Priority support',
          'API access (10,000 calls/month)',
          'Blockchain verification',
          'APRA compliance tools'
        ],
        popular: true
      },
      {
        name: 'Enterprise',
        price: 2499,
        period: 'month',
        features: [
          'Unlimited valuations',
          'AI-powered risk predictions',
          'White-label reporting',
          'Dedicated support',
          'Unlimited API access',
          'Custom blockchain solutions',
          'Full compliance suite',
          'On-premise deployment'
        ],
        popular: false
      }
    ]
  }
};

// Helper functions
export const isCollinsStreetAddress = (address: string): boolean => {
  return address.toLowerCase().includes('123 collins street') || 
         address.toLowerCase().includes('collins street, melbourne');
};

export const getCollinsStreetPropertyAnalysis = (): PropertyAnalysis => 
  COLLINS_STREET_MOCK_DATA.propertyAnalysis;

export const getCollinsStreetSentiment = (): SentimentAnalysis => 
  COLLINS_STREET_MOCK_DATA.sentimentAnalysis;

export const getCollinsStreetMarketSentiment = (): MarketSentiment => 
  COLLINS_STREET_MOCK_DATA.marketSentiment;

export const getCollinsStreetRiskData = () => 
  COLLINS_STREET_MOCK_DATA.propertyAnalysis.analysis_result.risk;

export const getCollinsStreetSystemHealth = () => 
  COLLINS_STREET_MOCK_DATA.systemHealth;

export const getCollinsStreetBlockchainData = () =>
  COLLINS_STREET_MOCK_DATA.blockchain;

export const getCollinsStreetFinancialData = () =>
  COLLINS_STREET_MOCK_DATA.financialMetrics;

export const getCollinsStreetReports = () =>
  COLLINS_STREET_MOCK_DATA.reports;

export const getCollinsStreetPricing = () =>
  COLLINS_STREET_MOCK_DATA.pricing;