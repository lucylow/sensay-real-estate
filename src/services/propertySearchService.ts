import { SensayAPI } from '@/services/api/sensay';

export interface PropertySearchCriteria {
  location?: string;
  priceRange?: { min: number; max: number };
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: { min: number; max: number };
  features?: string[];
  keywords?: string[];
}

export interface PropertyRecommendation {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  image: string;
  images?: string[];
  personalizationScore: number;
  matchPercentage: number;
  features: string[];
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: { lat: number; lng: number };
  };
  riskAssessment?: {
    score: number;
    factors: string[];
    recommendations: string[];
  };
  marketData?: {
    estimatedValue: number;
    pricePerSqFt: number;
    marketTrend: 'rising' | 'falling' | 'stable';
    daysOnMarket: number;
    comparableSales: Array<{
      address: string;
      price: number;
      soldDate: string;
      sqFt: number;
    }>;
  };
  financing?: {
    estimatedMonthlyPayment: number;
    downPayment: number;
    interestRate: number;
    loanAmount: number;
  };
  virtualTour?: {
    available: boolean;
    link?: string;
    type: 'video' | 'interactive' | 'photos';
  };
  agent?: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
}

export interface SearchFilters {
  priceRange: { min: number; max: number };
  propertyTypes: string[];
  bedrooms: { min: number; max: number };
  bathrooms: { min: number; max: number };
  squareFeet: { min: number; max: number };
  features: string[];
  locations: string[];
  sortBy: 'price' | 'date' | 'relevance' | 'size';
  sortOrder: 'asc' | 'desc';
}

export interface UserPreferences {
  id: string;
  budgetRange: { min: number; max: number };
  preferredLocations: string[];
  propertyTypes: string[];
  mustHaveFeatures: string[];
  niceToHaveFeatures: string[];
  dealBreakers: string[];
  timeline: string;
  financingStatus: string;
  lifestyle: {
    familySize: number;
    pets: boolean;
    workFromHome: boolean;
    commutePreferences: string[];
  };
  investmentGoals?: {
    primaryResidence: boolean;
    rentalProperty: boolean;
    flipProperty: boolean;
    longTermInvestment: boolean;
  };
}

export class PropertySearchEngine {
  private sensayAPI: SensayAPI;
  private mockProperties: PropertyRecommendation[];

  constructor() {
    this.sensayAPI = new SensayAPI();
    this.mockProperties = this.initializeMockProperties();
  }

  private initializeMockProperties(): PropertyRecommendation[] {
    return [
      {
        id: 'prop_1',
        address: '123 Oak Street',
        price: 450000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        image: '/placeholder.svg',
        images: ['/placeholder.svg', '/placeholder.svg'],
        personalizationScore: 85,
        matchPercentage: 85,
        features: ['Modern kitchen', 'Garden', 'Parking', 'Hardwood floors'],
        description: 'Beautiful family home in a quiet neighborhood with modern amenities and excellent schools nearby.',
        location: {
          address: '123 Oak Street',
          city: 'Sydney',
          state: 'NSW',
          zipCode: '2000',
          coordinates: { lat: -33.8688, lng: 151.2093 }
        },
        riskAssessment: {
          score: 7,
          factors: ['Low crime rate', 'Good schools', 'Stable neighborhood'],
          recommendations: ['Consider flood insurance', 'Check for termite history']
        },
        marketData: {
          estimatedValue: 460000,
          pricePerSqFt: 255,
          marketTrend: 'rising',
          daysOnMarket: 15,
          comparableSales: [
            { address: '121 Oak Street', price: 440000, soldDate: '2024-01-15', sqFt: 1750 },
            { address: '125 Oak Street', price: 470000, soldDate: '2024-02-01', sqFt: 1850 }
          ]
        },
        financing: {
          estimatedMonthlyPayment: 2100,
          downPayment: 90000,
          interestRate: 6.5,
          loanAmount: 360000
        },
        virtualTour: {
          available: true,
          link: 'https://virtualtour.example.com/prop1',
          type: 'interactive'
        },
        agent: {
          name: 'Sarah Johnson',
          phone: '+61 2 1234 5678',
          email: 'sarah@propguard.ai',
          photo: '/placeholder.svg'
        }
      },
      {
        id: 'prop_2',
        address: '456 Pine Avenue',
        price: 520000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        image: '/placeholder.svg',
        images: ['/placeholder.svg', '/placeholder.svg'],
        personalizationScore: 78,
        matchPercentage: 78,
        features: ['Pool', 'Garage', 'Study', 'Master suite'],
        description: 'Luxury home with pool and modern finishes, perfect for entertaining and family living.',
        location: {
          address: '456 Pine Avenue',
          city: 'Melbourne',
          state: 'VIC',
          zipCode: '3000',
          coordinates: { lat: -37.8136, lng: 144.9631 }
        },
        riskAssessment: {
          score: 8,
          factors: ['Excellent location', 'High growth area', 'Low maintenance'],
          recommendations: ['Pool maintenance required', 'Consider security system']
        },
        marketData: {
          estimatedValue: 530000,
          pricePerSqFt: 236,
          marketTrend: 'stable',
          daysOnMarket: 8,
          comparableSales: [
            { address: '454 Pine Avenue', price: 510000, soldDate: '2024-01-20', sqFt: 2150 },
            { address: '458 Pine Avenue', price: 540000, soldDate: '2024-02-10', sqFt: 2250 }
          ]
        },
        financing: {
          estimatedMonthlyPayment: 2430,
          downPayment: 104000,
          interestRate: 6.5,
          loanAmount: 416000
        },
        virtualTour: {
          available: true,
          link: 'https://virtualtour.example.com/prop2',
          type: 'video'
        },
        agent: {
          name: 'Michael Chen',
          phone: '+61 3 9876 5432',
          email: 'michael@propguard.ai',
          photo: '/placeholder.svg'
        }
      },
      {
        id: 'prop_3',
        address: '789 Maple Drive',
        price: 380000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1400,
        image: '/placeholder.svg',
        images: ['/placeholder.svg'],
        personalizationScore: 72,
        matchPercentage: 72,
        features: ['Updated kitchen', 'Balcony', 'Storage'],
        description: 'Modern apartment with city views and convenient location near public transport.',
        location: {
          address: '789 Maple Drive',
          city: 'Brisbane',
          state: 'QLD',
          zipCode: '4000',
          coordinates: { lat: -27.4698, lng: 153.0251 }
        },
        riskAssessment: {
          score: 6,
          factors: ['Urban location', 'Good transport links'],
          recommendations: ['Check strata fees', 'Review building maintenance']
        },
        marketData: {
          estimatedValue: 375000,
          pricePerSqFt: 268,
          marketTrend: 'rising',
          daysOnMarket: 22,
          comparableSales: [
            { address: '787 Maple Drive', price: 370000, soldDate: '2024-01-10', sqFt: 1350 },
            { address: '791 Maple Drive', price: 385000, soldDate: '2024-02-05', sqFt: 1450 }
          ]
        },
        financing: {
          estimatedMonthlyPayment: 1780,
          downPayment: 76000,
          interestRate: 6.5,
          loanAmount: 304000
        },
        virtualTour: {
          available: false,
          type: 'photos'
        },
        agent: {
          name: 'Emma Wilson',
          phone: '+61 7 5555 1234',
          email: 'emma@propguard.ai',
          photo: '/placeholder.svg'
        }
      }
    ];
  }

  async searchProperties(
    criteria: PropertySearchCriteria,
    userPreferences?: UserPreferences,
    filters?: SearchFilters
  ): Promise<PropertyRecommendation[]> {
    try {
      // Filter properties based on criteria
      let filteredProperties = this.mockProperties.filter(property => {
        return this.matchesCriteria(property, criteria);
      });

      // Apply additional filters if provided
      if (filters) {
        filteredProperties = this.applyFilters(filteredProperties, filters);
      }

      // Personalize recommendations if user preferences are available
      if (userPreferences) {
        filteredProperties = this.personalizeRecommendations(filteredProperties, userPreferences);
      }

      // Sort results
      const sortBy = filters?.sortBy || 'relevance';
      const sortOrder = filters?.sortOrder || 'desc';
      filteredProperties = this.sortProperties(filteredProperties, sortBy, sortOrder);

      // Enhance with AI-powered insights
      const enhancedProperties = await this.enhanceWithAIInsights(filteredProperties, criteria);

      return enhancedProperties;
    } catch (error) {
      console.error('Property search error:', error);
      throw new Error('Failed to search properties');
    }
  }

  private matchesCriteria(property: PropertyRecommendation, criteria: PropertySearchCriteria): boolean {
    // Location match
    if (criteria.location && !property.location.city.toLowerCase().includes(criteria.location.toLowerCase())) {
      return false;
    }

    // Price range match
    if (criteria.priceRange) {
      if (property.price < criteria.priceRange.min || property.price > criteria.priceRange.max) {
        return false;
      }
    }

    // Property type match
    if (criteria.propertyType && !property.features.some(f => f.toLowerCase().includes(criteria.propertyType!.toLowerCase()))) {
      return false;
    }

    // Bedrooms match
    if (criteria.bedrooms && property.bedrooms < criteria.bedrooms) {
      return false;
    }

    // Bathrooms match
    if (criteria.bathrooms && property.bathrooms < criteria.bathrooms) {
      return false;
    }

    // Square feet match
    if (criteria.squareFeet) {
      if (property.squareFeet < criteria.squareFeet.min || property.squareFeet > criteria.squareFeet.max) {
        return false;
      }
    }

    // Features match
    if (criteria.features && criteria.features.length > 0) {
      const hasRequiredFeatures = criteria.features.every(feature =>
        property.features.some(propFeature => 
          propFeature.toLowerCase().includes(feature.toLowerCase())
        )
      );
      if (!hasRequiredFeatures) {
        return false;
      }
    }

    return true;
  }

  private applyFilters(properties: PropertyRecommendation[], filters: SearchFilters): PropertyRecommendation[] {
    return properties.filter(property => {
      // Price range filter
      if (property.price < filters.priceRange.min || property.price > filters.priceRange.max) {
        return false;
      }

      // Property types filter
      if (filters.propertyTypes.length > 0) {
        const propertyType = this.determinePropertyType(property);
        if (!filters.propertyTypes.includes(propertyType)) {
          return false;
        }
      }

      // Bedrooms filter
      if (property.bedrooms < filters.bedrooms.min || property.bedrooms > filters.bedrooms.max) {
        return false;
      }

      // Bathrooms filter
      if (property.bathrooms < filters.bathrooms.min || property.bathrooms > filters.bathrooms.max) {
        return false;
      }

      // Square feet filter
      if (property.squareFeet < filters.squareFeet.min || property.squareFeet > filters.squareFeet.max) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasRequiredFeatures = filters.features.every(feature =>
          property.features.some(propFeature => 
            propFeature.toLowerCase().includes(feature.toLowerCase())
          )
        );
        if (!hasRequiredFeatures) {
          return false;
        }
      }

      // Locations filter
      if (filters.locations.length > 0) {
        const matchesLocation = filters.locations.some(location =>
          property.location.city.toLowerCase().includes(location.toLowerCase()) ||
          property.location.state.toLowerCase().includes(location.toLowerCase())
        );
        if (!matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }

  private determinePropertyType(property: PropertyRecommendation): string {
    if (property.features.some(f => f.toLowerCase().includes('apartment') || f.toLowerCase().includes('condo'))) {
      return 'apartment';
    } else if (property.features.some(f => f.toLowerCase().includes('townhouse') || f.toLowerCase().includes('townhome'))) {
      return 'townhouse';
    } else if (property.features.some(f => f.toLowerCase().includes('house') || f.toLowerCase().includes('home'))) {
      return 'house';
    }
    return 'house'; // Default
  }

  private personalizeRecommendations(
    properties: PropertyRecommendation[], 
    userPreferences: UserPreferences
  ): PropertyRecommendation[] {
    return properties.map(property => {
      let personalizationScore = 0;
      
      // Budget match (30% weight)
      if (userPreferences.budgetRange) {
        const avgBudget = (userPreferences.budgetRange.min + userPreferences.budgetRange.max) / 2;
        const priceDiff = Math.abs(property.price - avgBudget) / avgBudget;
        if (priceDiff <= 0.1) personalizationScore += 30;
        else if (priceDiff <= 0.2) personalizationScore += 20;
        else if (priceDiff <= 0.3) personalizationScore += 10;
      }

      // Location match (25% weight)
      if (userPreferences.preferredLocations.length > 0) {
        const locationMatch = userPreferences.preferredLocations.some(loc =>
          property.location.city.toLowerCase().includes(loc.toLowerCase()) ||
          property.location.state.toLowerCase().includes(loc.toLowerCase())
        );
        if (locationMatch) personalizationScore += 25;
      }

      // Property type match (20% weight)
      const propertyType = this.determinePropertyType(property);
      if (userPreferences.propertyTypes.includes(propertyType)) {
        personalizationScore += 20;
      }

      // Must-have features match (15% weight)
      if (userPreferences.mustHaveFeatures.length > 0) {
        const featureMatches = userPreferences.mustHaveFeatures.filter(feature =>
          property.features.some(propFeature => 
            propFeature.toLowerCase().includes(feature.toLowerCase())
          )
        ).length;
        const featureScore = (featureMatches / userPreferences.mustHaveFeatures.length) * 15;
        personalizationScore += featureScore;
      }

      // Nice-to-have features match (10% weight)
      if (userPreferences.niceToHaveFeatures.length > 0) {
        const niceToHaveMatches = userPreferences.niceToHaveFeatures.filter(feature =>
          property.features.some(propFeature => 
            propFeature.toLowerCase().includes(feature.toLowerCase())
          )
        ).length;
        const niceToHaveScore = (niceToHaveMatches / userPreferences.niceToHaveFeatures.length) * 10;
        personalizationScore += niceToHaveScore;
      }

      return {
        ...property,
        personalizationScore,
        matchPercentage: Math.min(Math.round(personalizationScore), 100)
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  private sortProperties(
    properties: PropertyRecommendation[], 
    sortBy: string, 
    sortOrder: 'asc' | 'desc'
  ): PropertyRecommendation[] {
    return properties.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'date':
          // Mock date comparison - in real implementation, use actual listing dates
          comparison = Math.random() - 0.5;
          break;
        case 'size':
          comparison = a.squareFeet - b.squareFeet;
          break;
        case 'relevance':
        default:
          comparison = b.matchPercentage - a.matchPercentage;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private async enhanceWithAIInsights(
    properties: PropertyRecommendation[], 
    criteria: PropertySearchCriteria
  ): Promise<PropertyRecommendation[]> {
    try {
      // Use Sensay API to enhance property descriptions and insights
      const enhancedProperties = await Promise.all(
        properties.map(async (property) => {
          try {
            const insightPrompt = `Analyze this property for a real estate recommendation:
            Address: ${property.address}
            Price: $${property.price.toLocaleString()}
            Features: ${property.features.join(', ')}
            Description: ${property.description}
            
            Provide insights about:
            1. Market positioning
            2. Value proposition
            3. Potential concerns
            4. Investment potential`;
            
            const response = await this.sensayAPI.sendMessage(insightPrompt, `property_${property.id}`);
            
            // In a real implementation, you would parse the AI response and add insights
            // For now, we'll add mock enhanced insights
            return {
              ...property,
              description: `${property.description}\n\nAI Insight: This property shows strong market potential with excellent location and modern features.`,
              riskAssessment: {
                ...property.riskAssessment,
                recommendations: [
                  ...(property.riskAssessment?.recommendations || []),
                  'Consider market timing for optimal sale price',
                  'Evaluate neighborhood development plans'
                ]
              }
            };
          } catch (error) {
            console.error(`Failed to enhance property ${property.id}:`, error);
            return property;
          }
        })
      );

      return enhancedProperties;
    } catch (error) {
      console.error('Failed to enhance properties with AI insights:', error);
      return properties;
    }
  }

  async getPropertyDetails(propertyId: string): Promise<PropertyRecommendation | null> {
    const property = this.mockProperties.find(p => p.id === propertyId);
    if (!property) {
      return null;
    }

    // Enhance with additional details
    try {
      const detailPrompt = `Provide detailed analysis for property ${property.address}:
      - Market trends in the area
      - Comparable properties
      - Investment potential
      - Risk factors
      - Financing options`;
      
      const response = await this.sensayAPI.sendMessage(detailPrompt, `details_${propertyId}`);
      
      // In a real implementation, parse the response and enhance the property
      return {
        ...property,
        description: `${property.description}\n\nDetailed Analysis: This property offers excellent value in a growing neighborhood with strong rental potential.`
      };
    } catch (error) {
      console.error('Failed to get detailed property analysis:', error);
      return property;
    }
  }

  async getSimilarProperties(propertyId: string, limit: number = 5): Promise<PropertyRecommendation[]> {
    const targetProperty = this.mockProperties.find(p => p.id === propertyId);
    if (!targetProperty) {
      return [];
    }

    // Find similar properties based on price, size, and location
    const similarProperties = this.mockProperties
      .filter(p => p.id !== propertyId)
      .map(property => {
        const priceSimilarity = 1 - Math.abs(property.price - targetProperty.price) / Math.max(property.price, targetProperty.price);
        const sizeSimilarity = 1 - Math.abs(property.squareFeet - targetProperty.squareFeet) / Math.max(property.squareFeet, targetProperty.squareFeet);
        const locationSimilarity = property.location.city === targetProperty.location.city ? 1 : 0.5;
        
        const similarityScore = (priceSimilarity + sizeSimilarity + locationSimilarity) / 3;
        
        return {
          ...property,
          matchPercentage: Math.round(similarityScore * 100)
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, limit);

    return similarProperties;
  }

  async getMarketInsights(location: string): Promise<{
    averagePrice: number;
    priceTrend: 'rising' | 'falling' | 'stable';
    daysOnMarket: number;
    inventoryLevel: 'low' | 'medium' | 'high';
    recommendations: string[];
  }> {
    // Mock market insights - in real implementation, integrate with market data APIs
    const insights = {
      averagePrice: 450000,
      priceTrend: 'rising' as const,
      daysOnMarket: 25,
      inventoryLevel: 'medium' as const,
      recommendations: [
        'Market is showing strong growth potential',
        'Consider acting quickly on well-priced properties',
        'Negotiation power may be limited in current market',
        'Focus on properties with unique features or good locations'
      ]
    };

    try {
      const insightPrompt = `Provide market insights for ${location}:
      - Current market conditions
      - Price trends
      - Buyer/seller market dynamics
      - Investment opportunities
      - Risk factors`;
      
      const response = await this.sensayAPI.sendMessage(insightPrompt, `market_${location}`);
      
      // In a real implementation, parse the AI response and enhance insights
      return {
        ...insights,
        recommendations: [
          ...insights.recommendations,
          'AI Analysis: Market shows strong fundamentals with growing demand'
        ]
      };
    } catch (error) {
      console.error('Failed to get AI market insights:', error);
      return insights;
    }
  }

  // Utility methods for property search
  async searchByMapBounds(bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }): Promise<PropertyRecommendation[]> {
    return this.mockProperties.filter(property => {
      const { lat, lng } = property.location.coordinates;
      return lat >= bounds.south && lat <= bounds.north && 
             lng >= bounds.west && lng <= bounds.east;
    });
  }

  async searchByKeywords(keywords: string[]): Promise<PropertyRecommendation[]> {
    return this.mockProperties.filter(property => {
      const searchText = `${property.address} ${property.description} ${property.features.join(' ')}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });
  }

  async getSavedSearches(userId: string): Promise<PropertySearchCriteria[]> {
    // Mock saved searches - in real implementation, fetch from database
    return [
      {
        location: 'Sydney',
        priceRange: { min: 400000, max: 600000 },
        bedrooms: 3,
        propertyType: 'house'
      },
      {
        location: 'Melbourne',
        priceRange: { min: 300000, max: 500000 },
        bedrooms: 2,
        propertyType: 'apartment'
      }
    ];
  }

  async saveSearch(userId: string, criteria: PropertySearchCriteria): Promise<void> {
    // Mock save search - in real implementation, save to database
    console.log(`Saving search for user ${userId}:`, criteria);
  }
}

// Export singleton instance
export const propertySearchEngine = new PropertySearchEngine();
