// Mock data for PropGuard AI features and capabilities
export interface PropGuardFeature {
  id: string;
  name: string;
  description: string;
  category: 'valuation' | 'risk' | 'market' | 'investment' | 'compliance' | 'chat';
  icon: string;
  capabilities: string[];
  useCases: string[];
  benefits: string[];
  examples: {
    input: string;
    output: string;
    context?: string;
  }[];
  pricing: {
    tier: 'basic' | 'premium' | 'enterprise';
    price: number;
    currency: string;
    features: string[];
  }[];
  languages: string[];
  accuracy: number; // percentage
  responseTime: number; // seconds
}

export interface AIInsight {
  id: string;
  type: 'market_trend' | 'risk_alert' | 'investment_opportunity' | 'compliance_update';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;
  data: any;
  recommendations: string[];
  timestamp: Date;
  region: string;
  category: string;
}

export interface PropGuardCapability {
  id: string;
  name: string;
  description: string;
  category: string;
  features: string[];
  integrations: string[];
  apiEndpoints: string[];
  documentation: string;
  examples: any[];
}

// Mock PropGuard AI Features
export const mockPropGuardFeatures: PropGuardFeature[] = [
  {
    id: 'instant-valuation',
    name: 'Instant Property Valuation',
    description: 'Get AI-powered property valuations in seconds with market data integration',
    category: 'valuation',
    icon: '💰',
    capabilities: [
      'Real-time market analysis',
      'Comparative market analysis (CMA)',
      'Automated valuation model (AVM)',
      'Historical price tracking',
      'Neighborhood trend analysis',
      'Property feature impact assessment'
    ],
    useCases: [
      'Home buying decisions',
      'Property selling pricing',
      'Refinancing assessments',
      'Investment analysis',
      'Insurance valuations',
      'Tax assessments'
    ],
    benefits: [
      'Save 80% of traditional valuation time',
      'Reduce valuation costs by 90%',
      'Access to real-time market data',
      'Unbiased, data-driven results',
      'Multiple valuation methodologies',
      'Risk-adjusted pricing'
    ],
    examples: [
      {
        input: 'What is the current value of 123 Main Street, San Francisco?',
        output: 'Based on recent market data and comparable sales, the estimated value is $1,450,000 with a confidence level of 94%. The property has appreciated 8.2% in the past year.',
        context: 'Recent sales in the area range from $1,380,000 to $1,520,000'
      },
      {
        input: 'How much should I list my 3-bedroom condo in Miami for?',
        output: 'Recommended listing price: $485,000 - $495,000. This range accounts for current market conditions, comparable properties, and optimal days on market (30-45 days).',
        context: 'Miami condo market showing 4.1% annual growth'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 5,
        currency: 'USD',
        features: ['5 valuations per month', 'Basic market data', 'Email support']
      },
      {
        tier: 'premium',
        price: 25,
        currency: 'USD',
        features: ['Unlimited valuations', 'Advanced analytics', 'API access', 'Priority support']
      },
      {
        tier: 'enterprise',
        price: 100,
        currency: 'USD',
        features: ['Custom integrations', 'White-label options', 'Dedicated support', 'SLA guarantees']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de'],
    accuracy: 94.2,
    responseTime: 1.8
  },

  {
    id: 'climate-risk-assessment',
    name: 'Climate Risk Assessment',
    description: 'Comprehensive climate risk analysis using NASA data and climate models',
    category: 'risk',
    icon: '🌍',
    capabilities: [
      'Flood risk analysis',
      'Wildfire risk assessment',
      'Hurricane/tornado risk',
      'Sea level rise projections',
      'Extreme weather patterns',
      'Climate adaptation recommendations'
    ],
    useCases: [
      'Property investment decisions',
      'Insurance risk assessment',
      'Climate adaptation planning',
      'Long-term property value forecasting',
      'Environmental compliance',
      'Disaster preparedness'
    ],
    benefits: [
      'NASA-grade climate data',
      '30-year climate projections',
      'Risk scoring and mitigation strategies',
      'Insurance premium optimization',
      'Investment risk reduction',
      'Regulatory compliance support'
    ],
    examples: [
      {
        input: 'What are the climate risks for properties in Miami Beach?',
        output: 'HIGH RISK: Sea level rise (3.2ft by 2050), Hurricane exposure (Category 3+ every 7 years), Flood risk (FEMA Zone AE). Recommended mitigation: Elevation certificates, flood insurance, hurricane shutters.',
        context: 'Based on IPCC climate models and historical hurricane data'
      },
      {
        input: 'Assess wildfire risk for properties in Malibu, CA',
        output: 'EXTREME RISK: High wildfire probability (85%), Fire weather index: Very High, Evacuation routes: Limited. Mitigation: Defensible space, fire-resistant materials, evacuation plan.',
        context: 'CalFire data and climate projections'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 10,
        currency: 'USD',
        features: ['Basic risk scores', '5 assessments per month', 'Email reports']
      },
      {
        tier: 'premium',
        price: 50,
        currency: 'USD',
        features: ['Detailed risk analysis', 'Unlimited assessments', 'API access', 'Custom reports']
      },
      {
        tier: 'enterprise',
        price: 200,
        currency: 'USD',
        features: ['Portfolio analysis', 'Custom risk models', 'White-label reports', 'Dedicated support']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de'],
    accuracy: 89.7,
    responseTime: 3.2
  },

  {
    id: 'market-intelligence',
    name: 'Market Intelligence',
    description: 'AI-powered market analysis and trend forecasting',
    category: 'market',
    icon: '📊',
    capabilities: [
      'Market trend analysis',
      'Price forecasting',
      'Supply and demand metrics',
      'Neighborhood comparisons',
      'Investment hotspot identification',
      'Market timing recommendations'
    ],
    useCases: [
      'Investment timing',
      'Market entry/exit strategies',
      'Portfolio optimization',
      'Market research',
      'Competitive analysis',
      'Strategic planning'
    ],
    benefits: [
      'Predictive market insights',
      'Data-driven investment decisions',
      'Risk mitigation strategies',
      'Competitive advantage',
      'Portfolio optimization',
      'Market opportunity identification'
    ],
    examples: [
      {
        input: 'What are the market trends for luxury condos in Manhattan?',
        output: 'Market showing signs of stabilization after 18-month correction. Luxury segment ($3M+) down 15% from peak, but showing 2% quarterly growth. Inventory levels declining, suggesting potential recovery in 6-12 months.',
        context: 'Based on 24-month market data and economic indicators'
      },
      {
        input: 'Which neighborhoods in Austin are showing the best investment potential?',
        output: 'Top investment neighborhoods: East Austin (+12% YoY), Mueller (+8% YoY), South Lamar (+6% YoY). Key factors: Tech job growth, infrastructure development, entertainment district expansion.',
        context: 'Analysis of job growth, development permits, and price appreciation'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 15,
        currency: 'USD',
        features: ['Basic market reports', '5 analyses per month', 'Standard data']
      },
      {
        tier: 'premium',
        price: 75,
        currency: 'USD',
        features: ['Advanced analytics', 'Unlimited analyses', 'Forecasting models', 'API access']
      },
      {
        tier: 'enterprise',
        price: 300,
        currency: 'USD',
        features: ['Custom market models', 'Portfolio optimization', 'White-label reports', 'Dedicated analyst']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de'],
    accuracy: 87.3,
    responseTime: 2.5
  },

  {
    id: 'investment-analysis',
    name: 'Investment Analysis',
    description: 'Comprehensive ROI analysis and investment recommendations',
    category: 'investment',
    icon: '📈',
    capabilities: [
      'ROI calculations',
      'Cash flow analysis',
      'Cap rate analysis',
      'Investment grading',
      'Risk-return optimization',
      'Portfolio diversification'
    ],
    useCases: [
      'Property investment decisions',
      'Portfolio management',
      'Risk assessment',
      'Investment strategy development',
      'Performance tracking',
      'Exit strategy planning'
    ],
    benefits: [
      'Data-driven investment decisions',
      'Risk-adjusted returns',
      'Portfolio optimization',
      'Market timing insights',
      'Investment grading system',
      'Performance benchmarking'
    ],
    examples: [
      {
        input: 'Should I invest in a rental property in Denver for $450K?',
        output: 'INVESTMENT GRADE: B+ (Good potential with moderate risk). Projected ROI: 8.2% annually, Cash flow: +$280/month, Cap rate: 4.8%. Key factors: Strong job growth, rental demand increasing, moderate price appreciation expected.',
        context: 'Based on 5-year market projections and rental data'
      },
      {
        input: 'Compare investment potential: Austin vs Nashville rental properties',
        output: 'Austin: Higher growth potential (12% YoY), higher risk, tech-driven market. Nashville: Steady growth (6% YoY), lower risk, diverse economy. Recommendation: Austin for growth, Nashville for stability.',
        context: 'Comparative analysis of job markets, rental yields, and price appreciation'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 20,
        currency: 'USD',
        features: ['Basic ROI analysis', '5 analyses per month', 'Standard metrics']
      },
      {
        tier: 'premium',
        price: 100,
        currency: 'USD',
        features: ['Advanced analytics', 'Unlimited analyses', 'Portfolio optimization', 'Risk modeling']
      },
      {
        tier: 'enterprise',
        price: 400,
        currency: 'USD',
        features: ['Custom investment models', 'Portfolio management', 'White-label reports', 'Dedicated analyst']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de'],
    accuracy: 91.5,
    responseTime: 2.8
  },

  {
    id: 'compliance-monitoring',
    name: 'Compliance Monitoring',
    description: 'Real-time regulatory compliance and APRA monitoring',
    category: 'compliance',
    icon: '🛡️',
    capabilities: [
      'APRA CPS 230 compliance',
      'Regulatory change tracking',
      'Risk management frameworks',
      'Audit trail generation',
      'Compliance reporting',
      'Policy updates'
    ],
    useCases: [
      'Financial institution compliance',
      'Risk management',
      'Audit preparation',
      'Regulatory reporting',
      'Policy development',
      'Compliance training'
    ],
    benefits: [
      'Automated compliance monitoring',
      'Real-time regulatory updates',
      'Reduced compliance costs',
      'Risk mitigation',
      'Audit readiness',
      'Regulatory expertise'
    ],
    examples: [
      {
        input: 'Check APRA CPS 230 compliance for our property lending portfolio',
        output: 'COMPLIANCE STATUS: 94% compliant. Areas needing attention: Data governance (2 gaps), Risk assessment processes (1 gap), Incident response procedures (1 gap). Recommended actions provided.',
        context: 'Based on latest APRA guidelines and internal audit findings'
      },
      {
        input: 'What are the latest regulatory changes affecting property investment?',
        output: 'Recent changes: New lending standards (effective Q2 2024), Enhanced disclosure requirements, Updated risk weighting for commercial properties. Impact assessment and implementation timeline provided.',
        context: 'Regulatory monitoring covering APRA, ASIC, and international standards'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 50,
        currency: 'USD',
        features: ['Basic compliance checks', 'Monthly reports', 'Email alerts']
      },
      {
        tier: 'premium',
        price: 200,
        currency: 'USD',
        features: ['Advanced monitoring', 'Real-time alerts', 'Custom reporting', 'API access']
      },
      {
        tier: 'enterprise',
        price: 500,
        currency: 'USD',
        features: ['Full compliance suite', 'Custom frameworks', 'White-label solutions', 'Dedicated compliance officer']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de'],
    accuracy: 96.8,
    responseTime: 1.5
  },

  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Assistant',
    description: 'Multilingual AI assistant for real estate queries and support',
    category: 'chat',
    icon: '🤖',
    capabilities: [
      'Natural language processing',
      'Multilingual support',
      'Context-aware responses',
      'Property search assistance',
      'Market insights',
      'Customer support'
    ],
    useCases: [
      'Customer service',
      'Lead qualification',
      'Property information',
      'Market research',
      'Investment advice',
      'General inquiries'
    ],
    benefits: [
      '24/7 availability',
      'Instant responses',
      'Multilingual support',
      'Consistent service quality',
      'Cost-effective support',
      'Scalable operations'
    ],
    examples: [
      {
        input: 'I\'m looking for a 3-bedroom house in San Francisco under $1.5M',
        output: 'I found 5 properties matching your criteria. Here are the top 3: 123 Market Street ($1.4M), 456 Castro Ave ($1.3M), 789 Bay View ($1.45M). Would you like to schedule viewings or get detailed information?',
        context: 'Real-time property search with market analysis'
      },
      {
        input: 'What\'s the investment potential for rental properties in Austin?',
        output: 'Austin shows strong rental investment potential: 6.2% average rental yield, 8% annual appreciation, growing tech job market. Top neighborhoods: East Austin, Mueller, South Lamar. Would you like detailed ROI analysis for specific areas?',
        context: 'Investment analysis with market data integration'
      }
    ],
    pricing: [
      {
        tier: 'basic',
        price: 0,
        currency: 'USD',
        features: ['Basic queries', 'Standard responses', 'Community support']
      },
      {
        tier: 'premium',
        price: 29,
        currency: 'USD',
        features: ['Advanced queries', 'Priority responses', 'API access', 'Custom integrations']
      },
      {
        tier: 'enterprise',
        price: 150,
        currency: 'USD',
        features: ['White-label chatbot', 'Custom training', 'Dedicated support', 'Advanced analytics']
      }
    ],
    languages: ['en', 'es', 'pt', 'zh', 'fr', 'de', 'ja', 'ko', 'ar', 'hi', 'ru', 'it'],
    accuracy: 94.7,
    responseTime: 1.2
  }
];

// Mock AI Insights
export const mockAIInsights: AIInsight[] = [
  {
    id: 'insight-001',
    type: 'market_trend',
    title: 'San Francisco Market Stabilization',
    description: 'San Francisco real estate market showing signs of stabilization after 18-month correction period',
    severity: 'medium',
    confidence: 87.5,
    data: {
      priceChange: -2.3,
      inventoryChange: -15.2,
      daysOnMarket: 28,
      pricePerSqft: 1250
    },
    recommendations: [
      'Monitor inventory levels closely',
      'Consider market entry for long-term investments',
      'Price properties competitively for quick sales'
    ],
    timestamp: new Date('2024-01-15T10:00:00Z'),
    region: 'San Francisco Bay Area',
    category: 'residential'
  },
  {
    id: 'insight-002',
    type: 'risk_alert',
    title: 'Increased Flood Risk - Miami Properties',
    description: 'Climate models indicate 15% increase in flood risk for Miami properties over next 5 years',
    severity: 'high',
    confidence: 92.3,
    data: {
      floodRiskIncrease: 15.2,
      affectedProperties: 45000,
      seaLevelRise: 0.8,
      insuranceCostIncrease: 25.5
    },
    recommendations: [
      'Review flood insurance coverage',
      'Consider elevation certificates',
      'Factor climate risk into investment decisions'
    ],
    timestamp: new Date('2024-01-14T14:30:00Z'),
    region: 'Miami-Dade County',
    category: 'climate'
  },
  {
    id: 'insight-003',
    type: 'investment_opportunity',
    title: 'Austin Tech Corridor Growth',
    description: 'Strong investment potential in East Austin due to tech company expansion and infrastructure development',
    severity: 'low',
    confidence: 89.7,
    data: {
      jobGrowth: 12.5,
      priceAppreciation: 8.2,
      rentalYield: 6.8,
      newDevelopments: 45
    },
    recommendations: [
      'Consider rental property investments',
      'Monitor development permits',
      'Evaluate long-term appreciation potential'
    ],
    timestamp: new Date('2024-01-13T09:15:00Z'),
    region: 'Austin, Texas',
    category: 'investment'
  },
  {
    id: 'insight-004',
    type: 'compliance_update',
    title: 'New APRA Lending Standards',
    description: 'Updated APRA lending standards for property investment loans effective Q2 2024',
    severity: 'medium',
    confidence: 98.1,
    data: {
      effectiveDate: '2024-04-01',
      affectedProducts: ['Investment loans', 'Interest-only loans'],
      newRequirements: ['Enhanced serviceability', 'Higher deposit requirements']
    },
    recommendations: [
      'Review lending policies',
      'Update borrower assessment processes',
      'Train staff on new requirements'
    ],
    timestamp: new Date('2024-01-12T16:45:00Z'),
    region: 'Australia',
    category: 'regulatory'
  }
];

// Mock PropGuard Capabilities
export const mockPropGuardCapabilities: PropGuardCapability[] = [
  {
    id: 'api-integration',
    name: 'API Integration',
    description: 'Seamless integration with existing systems and workflows',
    category: 'Integration',
    features: [
      'RESTful API endpoints',
      'GraphQL support',
      'Webhook notifications',
      'Batch processing',
      'Rate limiting',
      'Authentication & security'
    ],
    integrations: [
      'CRM systems',
      'Property management software',
      'Financial platforms',
      'Marketing tools',
      'Analytics platforms',
      'Mobile applications'
    ],
    apiEndpoints: [
      'GET /api/v1/valuation/{property_id}',
      'POST /api/v1/risk-assessment',
      'GET /api/v1/market-analysis/{location}',
      'POST /api/v1/investment-analysis',
      'GET /api/v1/compliance-status',
      'POST /api/v1/chat/query'
    ],
    documentation: 'https://docs.propguard.ai/api',
    examples: [
      {
        endpoint: '/api/v1/valuation',
        method: 'POST',
        request: { address: '123 Main St, SF, CA', property_type: 'house' },
        response: { value: 1450000, confidence: 0.94, market_trend: 'rising' }
      }
    ]
  },
  {
    id: 'data-sources',
    name: 'Data Sources',
    description: 'Comprehensive data integration from multiple authoritative sources',
    category: 'Data',
    features: [
      'Real-time market data',
      'Historical price data',
      'Climate data (NASA)',
      'Demographic information',
      'Economic indicators',
      'Regulatory data'
    ],
    integrations: [
      'Multiple Listing Service (MLS)',
      'Zillow API',
      'Redfin API',
      'NASA Climate Data',
      'Census Bureau',
      'Federal Reserve Economic Data'
    ],
    apiEndpoints: [
      'GET /api/v1/data/market/{location}',
      'GET /api/v1/data/climate/{coordinates}',
      'GET /api/v1/data/demographics/{zipcode}',
      'GET /api/v1/data/economic/{region}',
      'GET /api/v1/data/regulatory/{jurisdiction}',
      'GET /api/v1/data/property/{address}'
    ],
    documentation: 'https://docs.propguard.ai/data-sources',
    examples: [
      {
        source: 'MLS',
        dataType: 'Property listings',
        updateFrequency: 'Real-time',
        coverage: 'National'
      }
    ]
  }
];

// Helper functions
export const getFeatureById = (id: string): PropGuardFeature | undefined => {
  return mockPropGuardFeatures.find(feature => feature.id === id);
};

export const getFeaturesByCategory = (category: string): PropGuardFeature[] => {
  return mockPropGuardFeatures.filter(feature => feature.category === category);
};

export const getInsightsByType = (type: string): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.type === type);
};

export const getInsightsBySeverity = (severity: string): AIInsight[] => {
  return mockAIInsights.filter(insight => insight.severity === severity);
};

export const getCapabilityById = (id: string): PropGuardCapability | undefined => {
  return mockPropGuardCapabilities.find(capability => capability.id === id);
};

