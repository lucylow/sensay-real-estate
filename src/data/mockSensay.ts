/**
 * Mock data for Sensay API integration
 * Provides realistic Sensay platform data and responses
 */

export interface MockSensayUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  created_at: string;
  last_active: string;
  properties_analyzed: number;
  total_valuations: number;
}

export interface MockSensayProperty {
  id: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  car_spaces: number;
  land_size: number;
  building_size: number;
  year_built: number;
  estimated_value: number;
  confidence_score: number;
  risk_score: number;
  last_updated: string;
  features: string[];
}

export interface MockSensayAnalysis {
  property_id: string;
  valuation: {
    estimated_value: number;
    confidence_score: number;
    methodology: string;
    comparable_sales: Array<{
      address: string;
      sale_price: number;
      sale_date: string;
      distance_km: number;
    }>;
  };
  risk_assessment: {
    overall_risk_score: number;
    flood_risk: 'low' | 'medium' | 'high';
    fire_risk: 'low' | 'medium' | 'high';
    environmental_risk: 'low' | 'medium' | 'high';
    market_risk: 'low' | 'medium' | 'high';
  };
  market_analysis: {
    suburb_median: number;
    growth_rate_12m: number;
    growth_rate_5y: number;
    days_on_market: number;
    market_sentiment: 'positive' | 'neutral' | 'negative';
  };
  investment_metrics: {
    rental_yield: number;
    capital_growth_projection: number;
    total_return_projection: number;
    rental_demand: 'high' | 'medium' | 'low';
  };
}

export interface MockSensayReport {
  id: string;
  property_id: string;
  report_type: 'valuation' | 'risk_assessment' | 'investment_analysis' | 'comprehensive';
  generated_at: string;
  expires_at: string;
  status: 'completed' | 'processing' | 'failed';
  download_url?: string;
  summary: string;
}

export const mockSensayUsers: MockSensayUser[] = [
  {
    id: 'user_001',
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    subscription_tier: 'pro',
    created_at: '2024-01-15T10:30:00Z',
    last_active: '2024-01-25T14:22:00Z',
    properties_analyzed: 47,
    total_valuations: 89
  },
  {
    id: 'user_002',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    subscription_tier: 'enterprise',
    created_at: '2023-11-20T09:15:00Z',
    last_active: '2024-01-25T16:45:00Z',
    properties_analyzed: 156,
    total_valuations: 312
  },
  {
    id: 'user_003',
    name: 'Emma Thompson',
    email: 'emma.thompson@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    subscription_tier: 'free',
    created_at: '2024-01-20T16:45:00Z',
    last_active: '2024-01-25T11:30:00Z',
    properties_analyzed: 8,
    total_valuations: 12
  }
];

export const mockSensayProperties: MockSensayProperty[] = [
  {
    id: 'prop_001',
    address: '123 Collins Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    property_type: 'Apartment',
    bedrooms: 2,
    bathrooms: 2,
    car_spaces: 1,
    land_size: 0,
    building_size: 85,
    year_built: 2018,
    estimated_value: 850000,
    confidence_score: 92,
    risk_score: 25,
    last_updated: '2024-01-25T10:30:00Z',
    features: ['Balcony', 'Air Conditioning', 'Gym', 'Pool', 'Concierge']
  },
  {
    id: 'prop_002',
    address: '456 Bourke Street',
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    property_type: 'Office',
    bedrooms: 0,
    bathrooms: 4,
    car_spaces: 8,
    land_size: 0,
    building_size: 450,
    year_built: 2015,
    estimated_value: 3200000,
    confidence_score: 88,
    risk_score: 35,
    last_updated: '2024-01-25T11:15:00Z',
    features: ['Parking', 'Air Conditioning', 'Elevator', 'Security', 'Reception']
  },
  {
    id: 'prop_003',
    address: '789 St Kilda Road',
    suburb: 'St Kilda',
    state: 'VIC',
    postcode: '3182',
    property_type: 'House',
    bedrooms: 4,
    bathrooms: 3,
    car_spaces: 2,
    land_size: 650,
    building_size: 280,
    year_built: 1995,
    estimated_value: 1850000,
    confidence_score: 95,
    risk_score: 18,
    last_updated: '2024-01-25T09:45:00Z',
    features: ['Pool', 'Garden', 'Garage', 'Study', 'Ducted Heating']
  },
  {
    id: 'prop_004',
    address: '321 Chapel Street',
    suburb: 'South Yarra',
    state: 'VIC',
    postcode: '3141',
    property_type: 'Townhouse',
    bedrooms: 3,
    bathrooms: 2,
    car_spaces: 2,
    land_size: 320,
    building_size: 180,
    year_built: 2010,
    estimated_value: 1450000,
    confidence_score: 90,
    risk_score: 22,
    last_updated: '2024-01-25T08:20:00Z',
    features: ['Courtyard', 'Storage', 'Security', 'Built-in Wardrobes', 'Dishwasher']
  }
];

export const mockSensayAnalyses: MockSensayAnalysis[] = [
  {
    property_id: 'prop_001',
    valuation: {
      estimated_value: 850000,
      confidence_score: 92,
      methodology: 'Automated Valuation Model with comparable sales analysis',
      comparable_sales: [
        {
          address: '125 Collins Street',
          sale_price: 820000,
          sale_date: '2024-01-10',
          distance_km: 0.1
        },
        {
          address: '119 Collins Street',
          sale_price: 875000,
          sale_date: '2023-12-15',
          distance_km: 0.05
        },
        {
          address: '127 Collins Street',
          sale_price: 835000,
          sale_date: '2023-11-28',
          distance_km: 0.08
        }
      ]
    },
    risk_assessment: {
      overall_risk_score: 25,
      flood_risk: 'low',
      fire_risk: 'low',
      environmental_risk: 'low',
      market_risk: 'medium'
    },
    market_analysis: {
      suburb_median: 875000,
      growth_rate_12m: 8.5,
      growth_rate_5y: 45.2,
      days_on_market: 28,
      market_sentiment: 'positive'
    },
    investment_metrics: {
      rental_yield: 4.2,
      capital_growth_projection: 7.5,
      total_return_projection: 11.7,
      rental_demand: 'high'
    }
  },
  {
    property_id: 'prop_002',
    valuation: {
      estimated_value: 3200000,
      confidence_score: 88,
      methodology: 'Income capitalization approach with market comparison',
      comparable_sales: [
        {
          address: '450 Bourke Street',
          sale_price: 3150000,
          sale_date: '2023-12-20',
          distance_km: 0.2
        },
        {
          address: '470 Bourke Street',
          sale_price: 3350000,
          sale_date: '2023-11-10',
          distance_km: 0.3
        }
      ]
    },
    risk_assessment: {
      overall_risk_score: 35,
      flood_risk: 'low',
      fire_risk: 'low',
      environmental_risk: 'low',
      market_risk: 'medium'
    },
    market_analysis: {
      suburb_median: 2850000,
      growth_rate_12m: 5.2,
      growth_rate_5y: 28.7,
      days_on_market: 45,
      market_sentiment: 'neutral'
    },
    investment_metrics: {
      rental_yield: 5.8,
      capital_growth_projection: 4.2,
      total_return_projection: 10.0,
      rental_demand: 'medium'
    }
  }
];

export const mockSensayReports: MockSensayReport[] = [
  {
    id: 'report_001',
    property_id: 'prop_001',
    report_type: 'comprehensive',
    generated_at: '2024-01-25T10:30:00Z',
    expires_at: '2024-02-25T10:30:00Z',
    status: 'completed',
    download_url: 'https://sensay-reports.com/reports/report_001.pdf',
    summary: 'Comprehensive property analysis showing strong investment potential with low risk profile and positive market sentiment.'
  },
  {
    id: 'report_002',
    property_id: 'prop_002',
    report_type: 'risk_assessment',
    generated_at: '2024-01-25T11:15:00Z',
    expires_at: '2024-02-25T11:15:00Z',
    status: 'completed',
    download_url: 'https://sensay-reports.com/reports/report_002.pdf',
    summary: 'Risk assessment indicates moderate overall risk with low environmental risks and stable market conditions.'
  },
  {
    id: 'report_003',
    property_id: 'prop_003',
    report_type: 'investment_analysis',
    generated_at: '2024-01-25T09:45:00Z',
    expires_at: '2024-02-25T09:45:00Z',
    status: 'processing',
    summary: 'Investment analysis in progress, evaluating rental yield and capital growth potential.'
  }
];

export const mockSensayAPIResponses = {
  success: {
    status: 'success',
    data: {
      message: 'Analysis completed successfully',
      timestamp: '2024-01-25T10:30:00Z',
      request_id: 'req_12345'
    }
  },
  error: {
    status: 'error',
    error: {
      code: 'INVALID_PROPERTY_ADDRESS',
      message: 'The provided property address could not be found or validated.',
      details: 'Please ensure the address is complete and properly formatted.'
    }
  },
  processing: {
    status: 'processing',
    data: {
      message: 'Analysis in progress',
      estimated_completion: '2024-01-25T10:35:00Z',
      progress: 65
    }
  }
};

export const mockSensayFeatures = [
  {
    id: 'feature_001',
    name: 'Real-time Valuation',
    description: 'Get instant property valuations using AI-powered analysis',
    icon: 'Calculator',
    category: 'valuation'
  },
  {
    id: 'feature_002',
    name: 'Risk Assessment',
    description: 'Comprehensive environmental and market risk analysis',
    icon: 'Shield',
    category: 'risk'
  },
  {
    id: 'feature_003',
    name: 'Market Intelligence',
    description: 'Real-time market trends and sentiment analysis',
    icon: 'TrendingUp',
    category: 'market'
  },
  {
    id: 'feature_004',
    name: 'Investment Metrics',
    description: 'ROI calculations and investment potential analysis',
    icon: 'BarChart',
    category: 'investment'
  },
  {
    id: 'feature_005',
    name: 'Blockchain Verification',
    description: 'Immutable property records and transaction verification',
    icon: 'Link',
    category: 'blockchain'
  },
  {
    id: 'feature_006',
    name: 'Regulatory Compliance',
    description: 'APRA CPS 230 compliance reporting and audit trails',
    icon: 'FileCheck',
    category: 'compliance'
  }
];

export const mockSensayPricing = [
  {
    name: 'Free',
    price: 0,
    period: 'month',
    features: [
      '5 property valuations per month',
      'Basic risk assessment',
      'Standard market analysis',
      'Email support'
    ],
    limitations: [
      'Limited report downloads',
      'No API access',
      'Basic features only'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: 99,
    period: 'month',
    features: [
      'Unlimited property valuations',
      'Advanced risk assessment',
      'Comprehensive market analysis',
      'Investment metrics',
      'Report downloads',
      'Priority support',
      'API access (limited)'
    ],
    limitations: [
      'Limited API calls',
      'No white-label options'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 299,
    period: 'month',
    features: [
      'Everything in Professional',
      'Unlimited API access',
      'White-label solutions',
      'Custom integrations',
      'Dedicated support',
      'Advanced analytics',
      'Multi-user accounts'
    ],
    limitations: [],
    popular: false
  }
];
