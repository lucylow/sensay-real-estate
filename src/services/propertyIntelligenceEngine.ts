import { PropertyListing, MarketInsight, UserPreferences } from './sensayService';

export interface PropGuardValuation {
  estimatedValue: number;
  confidenceScore: number;
  riskAnalysis: {
    overallRisk: number;
    floodRisk: number;
    fireRisk: number;
    coastalErosion: number;
    marketRisk: number;
  };
  environmentalFactors: string[];
  marketComparables: Array<{
    address: string;
    price: number;
    similarity: number;
  }>;
  investmentPotential: {
    score: number;
    factors: string[];
    recommendations: string[];
  };
}

export interface RiskAssessment {
  overallRisk: number;
  floodRisk: number;
  fireRisk: number;
  coastalErosion: number;
  marketVolatility: number;
  environmentalFactors: string[];
  mitigationStrategies: string[];
}

export class PropertyIntelligenceEngine {
  private propguardApiKey: string;
  private baseUrl: string = 'https://api.propguard.ai/v1';

  constructor() {
    this.propguardApiKey = import.meta.env.VITE_PROPGUARD_API_KEY || 'demo-key';
  }

  async searchProperties(criteria: Record<string, any>, preferences?: UserPreferences): Promise<PropertyListing[]> {
    // Mock property data - in production, this would call your property database
    const mockProperties: PropertyListing[] = [
      {
        id: 'prop_1',
        address: '123 Collins Street, Melbourne VIC 3000',
        price: 1250000,
        propertyType: 'house',
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        location: 'Melbourne',
        features: ['garden', 'garage', 'city views', 'balcony'],
        imageUrls: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
        ],
        virtualTourUrl: 'https://virtualtour.example.com/prop1',
        riskScore: 0.35,
        propguardValuation: 1280000,
        environmentalRisks: ['moderate flood risk'],
        marketTrend: 'rising',
        daysOnMarket: 12
      },
      {
        id: 'prop_2',
        address: '456 Bourke Street, Melbourne VIC 3000',
        price: 850000,
        propertyType: 'apartment',
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        location: 'Melbourne',
        features: ['gym', 'pool', 'concierge', 'parking'],
        imageUrls: [
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
        ],
        virtualTourUrl: 'https://virtualtour.example.com/prop2',
        riskScore: 0.28,
        propguardValuation: 875000,
        environmentalRisks: ['low flood risk'],
        marketTrend: 'stable',
        daysOnMarket: 8
      },
      {
        id: 'prop_3',
        address: '789 Chapel Street, South Yarra VIC 3141',
        price: 2100000,
        propertyType: 'house',
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        location: 'South Yarra',
        features: ['pool', 'wine cellar', 'home office', 'garden'],
        imageUrls: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
        ],
        virtualTourUrl: 'https://virtualtour.example.com/prop3',
        riskScore: 0.42,
        propguardValuation: 2050000,
        environmentalRisks: ['high fire risk', 'moderate flood risk'],
        marketTrend: 'rising',
        daysOnMarket: 5
      }
    ];

    // Filter properties based on criteria
    let filteredProperties = mockProperties;

    if (criteria.budget) {
      const budget = criteria.budget;
      const tolerance = budget * 0.1; // 10% tolerance
      filteredProperties = filteredProperties.filter(p => 
        p.price >= (budget - tolerance) && p.price <= (budget + tolerance)
      );
    }

    if (criteria.location) {
      filteredProperties = filteredProperties.filter(p => 
        p.location.toLowerCase().includes(criteria.location.toLowerCase()) ||
        p.address.toLowerCase().includes(criteria.location.toLowerCase())
      );
    }

    if (criteria.propertyType) {
      filteredProperties = filteredProperties.filter(p => 
        p.propertyType.toLowerCase() === criteria.propertyType.toLowerCase()
      );
    }

    if (criteria.bedrooms) {
      filteredProperties = filteredProperties.filter(p => p.bedrooms >= criteria.bedrooms);
    }

    // Apply user preferences for personalization
    if (preferences) {
      filteredProperties = this.personalizeResults(filteredProperties, preferences);
    }

    return filteredProperties;
  }

  private personalizeResults(properties: PropertyListing[], preferences: UserPreferences): PropertyListing[] {
    // Calculate personalized scores for each property
    const scoredProperties = properties.map(prop => {
      let score = 0;

      // Budget match (30% weight)
      if (preferences.budgetMin && preferences.budgetMax) {
        if (prop.price >= preferences.budgetMin && prop.price <= preferences.budgetMax) {
          score += 0.3;
        } else if (prop.price <= preferences.budgetMax * 1.1) {
          score += 0.15; // 10% over budget tolerance
        }
      }

      // Location match (25% weight)
      if (preferences.preferredLocations) {
        const locationMatch = preferences.preferredLocations.some(loc => 
          prop.location.toLowerCase().includes(loc.toLowerCase())
        );
        if (locationMatch) score += 0.25;
      }

      // Property type match (20% weight)
      if (preferences.propertyTypes) {
        if (preferences.propertyTypes.includes(prop.propertyType)) {
          score += 0.20;
        }
      }

      // Features match (15% weight)
      if (preferences.mustHaveFeatures) {
        const matchingFeatures = preferences.mustHaveFeatures.filter(feature =>
          prop.features.some(propFeature => 
            propFeature.toLowerCase().includes(feature.toLowerCase())
          )
        ).length;
        score += (matchingFeatures / preferences.mustHaveFeatures.length) * 0.15;
      }

      // Risk tolerance match (10% weight)
      if (preferences.riskTolerance) {
        const riskToleranceMap = { low: 0.2, medium: 0.5, high: 0.8 };
        const targetRisk = riskToleranceMap[preferences.riskTolerance];
        const riskDiff = Math.abs(prop.riskScore - targetRisk);
        score += (1 - riskDiff) * 0.10;
      }

      return { property: prop, score };
    });

    // Sort by score and return properties
    scoredProperties.sort((a, b) => b.score - a.score);
    return scoredProperties.map(item => item.property);
  }

  async getRiskScore(property: PropertyListing): Promise<number> {
    // Mock risk assessment - in production, call PropGuard AI API
    const riskFactors = {
      flood: this.calculateFloodRisk(property),
      fire: this.calculateFireRisk(property),
      coastal: this.calculateCoastalRisk(property),
      market: this.calculateMarketRisk(property)
    };

    const overallRisk = (riskFactors.flood + riskFactors.fire + riskFactors.coastal + riskFactors.market) / 4;
    return Math.min(overallRisk, 1.0);
  }

  private calculateFloodRisk(property: PropertyListing): number {
    // Simplified flood risk calculation
    const floodProneAreas = ['southbank', 'docklands', 'port melbourne'];
    const isFloodProne = floodProneAreas.some(area => 
      property.location.toLowerCase().includes(area)
    );
    return isFloodProne ? 0.7 : 0.2;
  }

  private calculateFireRisk(property: PropertyListing): number {
    // Simplified fire risk calculation
    const highFireRiskAreas = ['south yarra', 'toorak', 'brighton'];
    const isHighRisk = highFireRiskAreas.some(area => 
      property.location.toLowerCase().includes(area)
    );
    return isHighRisk ? 0.6 : 0.3;
  }

  private calculateCoastalRisk(property: PropertyListing): number {
    // Simplified coastal erosion risk
    const coastalAreas = ['brighton', 'st kilda', 'south melbourne'];
    const isCoastal = coastalAreas.some(area => 
      property.location.toLowerCase().includes(area)
    );
    return isCoastal ? 0.5 : 0.1;
  }

  private calculateMarketRisk(property: PropertyListing): number {
    // Market volatility based on price range and location
    if (property.price > 2000000) return 0.4; // High-end properties more volatile
    if (property.price < 500000) return 0.6; // Lower-end properties more volatile
    return 0.3; // Mid-range properties more stable
  }

  async getValuation(property: PropertyListing): Promise<number> {
    // Mock PropGuard AI valuation
    const basePrice = property.price;
    const marketTrend = property.marketTrend;
    const riskAdjustment = 1 - (property.riskScore * 0.1); // 10% adjustment for risk
    
    let trendMultiplier = 1.0;
    switch (marketTrend) {
      case 'rising': trendMultiplier = 1.05; break;
      case 'declining': trendMultiplier = 0.95; break;
      case 'stable': trendMultiplier = 1.0; break;
    }

    return Math.round(basePrice * trendMultiplier * riskAdjustment);
  }

  async getEnvironmentalRisks(property: PropertyListing): Promise<string[]> {
    const risks: string[] = [];
    
    if (this.calculateFloodRisk(property) > 0.5) {
      risks.push('Flood Risk');
    }
    
    if (this.calculateFireRisk(property) > 0.5) {
      risks.push('Fire Risk');
    }
    
    if (this.calculateCoastalRisk(property) > 0.4) {
      risks.push('Coastal Erosion');
    }

    return risks;
  }

  async getDetailedValuation(address: string): Promise<PropGuardValuation> {
    // Mock detailed PropGuard AI valuation
    const baseValue = 1200000 + Math.random() * 800000; // Random value between 1.2M and 2M
    
    return {
      estimatedValue: Math.round(baseValue),
      confidenceScore: 0.87,
      riskAnalysis: {
        overallRisk: 0.35,
        floodRisk: 0.3,
        fireRisk: 0.4,
        coastalErosion: 0.2,
        marketRisk: 0.45
      },
      environmentalFactors: [
        'Moderate flood risk due to proximity to water',
        'Low fire risk in urban setting',
        'Stable coastal conditions'
      ],
      marketComparables: [
        { address: '125 Collins Street', price: 1180000, similarity: 0.92 },
        { address: '127 Collins Street', price: 1220000, similarity: 0.88 },
        { address: '121 Collins Street', price: 1150000, similarity: 0.85 }
      ],
      investmentPotential: {
        score: 78,
        factors: [
          'Strong location in CBD',
          'Good rental yield potential',
          'Limited supply in area'
        ],
        recommendations: [
          'Consider as investment property',
          'Monitor market trends closely',
          'Good for long-term hold'
        ]
      }
    };
  }

  async getMarketInsights(location: string): Promise<MarketInsight> {
    // Mock market insights - in production, call real market data APIs
    const insights: Record<string, MarketInsight> = {
      melbourne: {
        location: 'Melbourne',
        averagePrice: 950000,
        priceChange: 5.2,
        volumeChange: -2.1,
        riskTrend: 'stable',
        marketSentiment: 'bullish',
        topFeatures: ['gardens', 'parking', 'city views', 'modern kitchens'],
        investmentOpportunities: [
          'CBD apartments for rental yield',
          'Suburban houses for capital growth',
          'Development sites in growth corridors'
        ]
      },
      sydney: {
        location: 'Sydney',
        averagePrice: 1200000,
        priceChange: 3.8,
        volumeChange: -5.2,
        riskTrend: 'increasing',
        marketSentiment: 'neutral',
        topFeatures: ['harbor views', 'beaches', 'schools', 'transport'],
        investmentOpportunities: [
          'Inner city apartments',
          'Waterfront properties',
          'Investment grade houses'
        ]
      }
    };

    return insights[location.toLowerCase()] || insights.melbourne;
  }

  async generateBookingOptions(property: PropertyListing): Promise<Array<{
    type: 'virtual' | 'in-person' | 'hybrid';
    availableSlots: Array<{
      date: string;
      time: string;
      agent: string;
    }>;
  }>> {
    // Mock booking options
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const dayAfter = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);

    return [
      {
        type: 'virtual',
        availableSlots: [
          { date: tomorrow.toISOString().split('T')[0], time: '14:00', agent: 'Agent Smith' },
          { date: tomorrow.toISOString().split('T')[0], time: '16:00', agent: 'Agent Johnson' },
          { date: dayAfter.toISOString().split('T')[0], time: '10:00', agent: 'Agent Smith' }
        ]
      },
      {
        type: 'in-person',
        availableSlots: [
          { date: tomorrow.toISOString().split('T')[0], time: '11:00', agent: 'Agent Smith' },
          { date: dayAfter.toISOString().split('T')[0], time: '14:00', agent: 'Agent Johnson' }
        ]
      }
    ];
  }
}
