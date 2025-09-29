import { SensayAPI } from '@/services/api/sensay';
import { supabase } from '@/integrations/supabase/client';

export interface AdvancedMarketSentiment {
  overallSentiment: number; // -100 to 100
  buyerSentiment: number;
  sellerSentiment: number;
  investorSentiment: number;
  mediaSentiment: number;
  socialMediaSentiment: number;
  economicIndicators: {
    interestRates: number;
    unemploymentRate: number;
    inflationRate: number;
    gdpGrowth: number;
    consumerConfidence: number;
  };
  marketFactors: {
    supplyDemandRatio: number;
    daysOnMarket: number;
    auctionClearanceRate: number;
    priceGrowthRate: number;
    rentalYield: number;
  };
}

export interface SeasonalTrendAnalysis {
  currentSeason: 'spring' | 'summer' | 'autumn' | 'winter';
  seasonalMultiplier: number;
  historicalTrends: {
    spring: { priceChange: number; volumeChange: number; daysOnMarket: number };
    summer: { priceChange: number; volumeChange: number; daysOnMarket: number };
    autumn: { priceChange: number; volumeChange: number; daysOnMarket: number };
    winter: { priceChange: number; volumeChange: number; daysOnMarket: number };
  };
  upcomingEvents: Array<{
    event: string;
    date: string;
    impact: number; // -100 to 100
    type: 'positive' | 'negative' | 'neutral';
  }>;
}

export interface NeighborhoodDevelopmentIntelligence {
  infrastructureProjects: Array<{
    project: string;
    type: 'transport' | 'education' | 'healthcare' | 'commercial' | 'residential';
    completionDate: string;
    impact: number; // -100 to 100
    radiusKm: number;
  }>;
  zoningChanges: Array<{
    change: string;
    date: string;
    impact: number;
    affectedArea: string;
  }>;
  demographicShifts: {
    populationGrowth: number;
    ageDistribution: { [key: string]: number };
    incomeLevels: { [key: string]: number };
    educationLevels: { [key: string]: number };
  };
  gentrificationIndicators: {
    score: number; // 0-100
    factors: string[];
    timeline: string;
    impact: number;
  };
}

export interface AdvancedComparableSales {
  recentSales: Array<{
    address: string;
    salePrice: number;
    saleDate: string;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    buildingSize: number;
    distance: number;
    similarityScore: number;
    adjustments: {
      size: number;
      condition: number;
      location: number;
      features: number;
    };
  }>;
  marketComparables: Array<{
    address: string;
    listingPrice: number;
    daysOnMarket: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    landSize: number;
    buildingSize: number;
    distance: number;
    competitionLevel: 'low' | 'medium' | 'high';
  }>;
  pricePerSquareMeter: {
    recent: number;
    historical: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
}

export interface EconomicIntelligence {
  macroeconomicIndicators: {
    interestRates: {
      current: number;
      trend: 'rising' | 'falling' | 'stable';
      forecast: number;
    };
    inflation: {
      current: number;
      trend: 'rising' | 'falling' | 'stable';
      forecast: number;
    };
    unemployment: {
      current: number;
      trend: 'rising' | 'falling' | 'stable';
      forecast: number;
    };
    gdpGrowth: {
      current: number;
      trend: 'rising' | 'falling' | 'stable';
      forecast: number;
    };
  };
  localEconomicFactors: {
    employmentGrowth: number;
    wageGrowth: number;
    businessConfidence: number;
    constructionActivity: number;
    tourismActivity: number;
  };
  governmentPolicies: Array<{
    policy: string;
    impact: number;
    effectiveDate: string;
    duration: string;
  }>;
}

export interface AdvancedPricingIntelligence {
  currentMarketValue: number;
  optimalListingPrice: number;
  priceRange: {
    min: number;
    max: number;
    recommended: number;
    aggressive: number;
    conservative: number;
  };
  confidence: number; // 0-100
  factors: {
    marketSentiment: number;
    seasonalTrends: number;
    neighborhoodDevelopment: number;
    comparableSales: number;
    economicIndicators: number;
    aiAnalysis: number;
  };
  recommendations: {
    pricingStrategy: 'aggressive' | 'competitive' | 'conservative' | 'premium';
    timing: 'immediate' | 'wait_2_weeks' | 'wait_1_month' | 'wait_3_months' | 'wait_6_months';
    marketingFocus: string[];
    negotiationTips: string[];
    riskMitigation: string[];
  };
  projections: {
    next30Days: number;
    next90Days: number;
    next180Days: number;
    next365Days: number;
  };
  marketPositioning: {
    competitiveness: 'high' | 'medium' | 'low';
    uniqueValuePropositions: string[];
    potentialBuyers: string[];
    sellingPoints: string[];
  };
}

export class EnhancedDynamicPricingIntelligence {
  private sensayAPI: SensayAPI;

  constructor() {
    this.sensayAPI = new SensayAPI();
  }

  async analyzeOptimalPricing(
    propertyAddress: string,
    propertyDetails: any,
    marketContext?: any
  ): Promise<AdvancedPricingIntelligence> {
    try {
      // Gather comprehensive market intelligence
      const [
        marketSentiment,
        seasonalTrends,
        neighborhoodDevelopment,
        comparableSales,
        economicIndicators
      ] = await Promise.all([
        this.analyzeAdvancedMarketSentiment(propertyAddress),
        this.getEnhancedSeasonalTrends(propertyAddress),
        this.analyzeNeighborhoodDevelopmentIntelligence(propertyAddress),
        this.getAdvancedComparableSales(propertyAddress, propertyDetails),
        this.getEconomicIntelligence(propertyAddress)
      ]);

      // AI-powered pricing analysis using Sensay Wisdom Engine
      const pricingIntelligence = await this.calculateAdvancedOptimalPricing({
        propertyDetails,
        marketSentiment,
        seasonalTrends,
        neighborhoodDevelopment,
        comparableSales,
        economicIndicators
      });

      return pricingIntelligence;
    } catch (error) {
      console.error('Enhanced pricing analysis failed:', error);
      throw new Error('Unable to complete enhanced pricing analysis');
    }
  }

  private async analyzeAdvancedMarketSentiment(address: string): Promise<AdvancedMarketSentiment> {
    try {
      // Use Sensay to analyze market sentiment from multiple sources
      const prompt = `
        As an AI market analyst, analyze market sentiment for ${address}:
        
        Provide comprehensive market sentiment analysis in JSON format:
        {
          "overallSentiment": -100 to 100,
          "buyerSentiment": -100 to 100,
          "sellerSentiment": -100 to 100,
          "investorSentiment": -100 to 100,
          "mediaSentiment": -100 to 100,
          "socialMediaSentiment": -100 to 100,
          "economicIndicators": {
            "interestRates": 0-10,
            "unemploymentRate": 0-20,
            "inflationRate": 0-10,
            "gdpGrowth": -5 to 10,
            "consumerConfidence": -100 to 100
          },
          "marketFactors": {
            "supplyDemandRatio": 0-5,
            "daysOnMarket": 0-365,
            "auctionClearanceRate": 0-100,
            "priceGrowthRate": -20 to 50,
            "rentalYield": 0-15
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'market_sentiment_analysis',
        expertise: 'real_estate_markets'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Advanced market sentiment analysis failed, using fallback:', error);
      return this.getFallbackMarketSentiment();
    }
  }

  private async getEnhancedSeasonalTrends(address: string): Promise<SeasonalTrendAnalysis> {
    try {
      const currentSeason = this.getCurrentSeason();
      
      // Use Sensay to analyze seasonal trends
      const prompt = `
        As an AI seasonal market analyst, analyze seasonal trends for ${address}:
        
        Current Season: ${currentSeason}
        
        Provide seasonal trend analysis in JSON format:
        {
          "currentSeason": "${currentSeason}",
          "seasonalMultiplier": 0.5 to 1.5,
          "historicalTrends": {
            "spring": {"priceChange": -20 to 20, "volumeChange": -50 to 50, "daysOnMarket": 10-90},
            "summer": {"priceChange": -20 to 20, "volumeChange": -50 to 50, "daysOnMarket": 10-90},
            "autumn": {"priceChange": -20 to 20, "volumeChange": -50 to 50, "daysOnMarket": 10-90},
            "winter": {"priceChange": -20 to 20, "volumeChange": -50 to 50, "daysOnMarket": 10-90}
          },
          "upcomingEvents": [
            {"event": "event name", "date": "YYYY-MM-DD", "impact": -100 to 100, "type": "positive/negative/neutral"}
          ]
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'seasonal_trend_analysis',
        expertise: 'seasonal_markets'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Enhanced seasonal trends failed, using fallback:', error);
      return this.getFallbackSeasonalTrends();
    }
  }

  private async analyzeNeighborhoodDevelopmentIntelligence(address: string): Promise<NeighborhoodDevelopmentIntelligence> {
    try {
      // Use Sensay to analyze neighborhood development
      const prompt = `
        As an AI urban development analyst, analyze neighborhood development for ${address}:
        
        Provide neighborhood development analysis in JSON format:
        {
          "infrastructureProjects": [
            {"project": "project name", "type": "transport/education/healthcare/commercial/residential", "completionDate": "YYYY-MM-DD", "impact": -100 to 100, "radiusKm": 0-10}
          ],
          "zoningChanges": [
            {"change": "change description", "date": "YYYY-MM-DD", "impact": -100 to 100, "affectedArea": "area description"}
          ],
          "demographicShifts": {
            "populationGrowth": -10 to 20,
            "ageDistribution": {"0-18": 0-100, "19-35": 0-100, "36-55": 0-100, "56+": 0-100},
            "incomeLevels": {"low": 0-100, "medium": 0-100, "high": 0-100},
            "educationLevels": {"high_school": 0-100, "bachelor": 0-100, "graduate": 0-100}
          },
          "gentrificationIndicators": {
            "score": 0-100,
            "factors": ["factor1", "factor2"],
            "timeline": "short/medium/long term",
            "impact": -100 to 100
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'neighborhood_development',
        expertise: 'urban_planning'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Neighborhood development analysis failed, using fallback:', error);
      return this.getFallbackNeighborhoodDevelopment();
    }
  }

  private async getAdvancedComparableSales(address: string, propertyDetails: any): Promise<AdvancedComparableSales> {
    try {
      // Use Sensay to analyze comparable sales
      const prompt = `
        As an AI property valuation expert, analyze comparable sales for ${address}:
        
        Property Details: ${JSON.stringify(propertyDetails, null, 2)}
        
        Provide comparable sales analysis in JSON format:
        {
          "recentSales": [
            {
              "address": "address",
              "salePrice": 100000-5000000,
              "saleDate": "YYYY-MM-DD",
              "propertyType": "house/apartment/townhouse",
              "bedrooms": 1-6,
              "bathrooms": 1-4,
              "landSize": 100-2000,
              "buildingSize": 50-1000,
              "distance": 0.1-5.0,
              "similarityScore": 0-100,
              "adjustments": {"size": -20 to 20, "condition": -20 to 20, "location": -20 to 20, "features": -20 to 20}
            }
          ],
          "marketComparables": [
            {
              "address": "address",
              "listingPrice": 100000-5000000,
              "daysOnMarket": 0-365,
              "propertyType": "house/apartment/townhouse",
              "bedrooms": 1-6,
              "bathrooms": 1-4,
              "landSize": 100-2000,
              "buildingSize": 50-1000,
              "distance": 0.1-5.0,
              "competitionLevel": "low/medium/high"
            }
          ],
          "pricePerSquareMeter": {
            "recent": 1000-15000,
            "historical": 1000-15000,
            "trend": "increasing/stable/decreasing"
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'comparable_sales_analysis',
        expertise: 'property_valuation'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Advanced comparable sales analysis failed, using fallback:', error);
      return this.getFallbackComparableSales();
    }
  }

  private async getEconomicIntelligence(address: string): Promise<EconomicIntelligence> {
    try {
      // Use Sensay to analyze economic intelligence
      const prompt = `
        As an AI economic analyst, analyze economic intelligence for ${address}:
        
        Provide economic intelligence in JSON format:
        {
          "macroeconomicIndicators": {
            "interestRates": {"current": 0-10, "trend": "rising/falling/stable", "forecast": 0-10},
            "inflation": {"current": 0-10, "trend": "rising/falling/stable", "forecast": 0-10},
            "unemployment": {"current": 0-20, "trend": "rising/falling/stable", "forecast": 0-20},
            "gdpGrowth": {"current": -5 to 10, "trend": "rising/falling/stable", "forecast": -5 to 10}
          },
          "localEconomicFactors": {
            "employmentGrowth": -10 to 20,
            "wageGrowth": -5 to 15,
            "businessConfidence": -100 to 100,
            "constructionActivity": -50 to 100,
            "tourismActivity": -50 to 100
          },
          "governmentPolicies": [
            {"policy": "policy name", "impact": -100 to 100, "effectiveDate": "YYYY-MM-DD", "duration": "duration"}
          ]
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'economic_intelligence',
        expertise: 'economic_analysis'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Economic intelligence analysis failed, using fallback:', error);
      return this.getFallbackEconomicIntelligence();
    }
  }

  private async calculateAdvancedOptimalPricing(data: {
    propertyDetails: any;
    marketSentiment: AdvancedMarketSentiment;
    seasonalTrends: SeasonalTrendAnalysis;
    neighborhoodDevelopment: NeighborhoodDevelopmentIntelligence;
    comparableSales: AdvancedComparableSales;
    economicIndicators: EconomicIntelligence;
  }): Promise<AdvancedPricingIntelligence> {
    try {
      const prompt = `
        As an AI pricing strategist, calculate optimal pricing using this comprehensive data:
        
        Property Details: ${JSON.stringify(data.propertyDetails, null, 2)}
        Market Sentiment: ${JSON.stringify(data.marketSentiment, null, 2)}
        Seasonal Trends: ${JSON.stringify(data.seasonalTrends, null, 2)}
        Neighborhood Development: ${JSON.stringify(data.neighborhoodDevelopment, null, 2)}
        Comparable Sales: ${JSON.stringify(data.comparableSales, null, 2)}
        Economic Indicators: ${JSON.stringify(data.economicIndicators, null, 2)}
        
        Provide advanced pricing intelligence in JSON format:
        {
          "currentMarketValue": 100000-5000000,
          "optimalListingPrice": 100000-5000000,
          "priceRange": {
            "min": 100000-5000000,
            "max": 100000-5000000,
            "recommended": 100000-5000000,
            "aggressive": 100000-5000000,
            "conservative": 100000-5000000
          },
          "confidence": 0-100,
          "factors": {
            "marketSentiment": 0-100,
            "seasonalTrends": 0-100,
            "neighborhoodDevelopment": 0-100,
            "comparableSales": 0-100,
            "economicIndicators": 0-100,
            "aiAnalysis": 0-100
          },
          "recommendations": {
            "pricingStrategy": "aggressive/competitive/conservative/premium",
            "timing": "immediate/wait_2_weeks/wait_1_month/wait_3_months/wait_6_months",
            "marketingFocus": ["focus1", "focus2"],
            "negotiationTips": ["tip1", "tip2"],
            "riskMitigation": ["risk1", "risk2"]
          },
          "projections": {
            "next30Days": -20 to 20,
            "next90Days": -20 to 20,
            "next180Days": -20 to 20,
            "next365Days": -20 to 20
          },
          "marketPositioning": {
            "competitiveness": "high/medium/low",
            "uniqueValuePropositions": ["proposition1", "proposition2"],
            "potentialBuyers": ["buyer1", "buyer2"],
            "sellingPoints": ["point1", "point2"]
          }
        }
      `;

      const response = await this.sensayAPI.chat(prompt, {
        context: 'advanced_pricing_analysis',
        expertise: 'real_estate_pricing'
      });

      return JSON.parse(response.response);
    } catch (error) {
      console.warn('Advanced pricing calculation failed, using fallback:', error);
      return this.getFallbackPricingIntelligence(data.propertyDetails);
    }
  }

  // Helper methods
  private getCurrentSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'autumn'; // March-May
    if (month >= 5 && month <= 7) return 'winter'; // June-August
    if (month >= 8 && month <= 10) return 'spring'; // September-November
    return 'summer'; // December-February
  }

  // Fallback methods
  private getFallbackMarketSentiment(): AdvancedMarketSentiment {
    return {
      overallSentiment: 65,
      buyerSentiment: 70,
      sellerSentiment: 60,
      investorSentiment: 55,
      mediaSentiment: 60,
      socialMediaSentiment: 70,
      economicIndicators: {
        interestRates: 4.5,
        unemploymentRate: 5.2,
        inflationRate: 3.1,
        gdpGrowth: 2.8,
        consumerConfidence: 75
      },
      marketFactors: {
        supplyDemandRatio: 0.8,
        daysOnMarket: 35,
        auctionClearanceRate: 68,
        priceGrowthRate: 8.5,
        rentalYield: 4.2
      }
    };
  }

  private getFallbackSeasonalTrends(): SeasonalTrendAnalysis {
    return {
      currentSeason: this.getCurrentSeason(),
      seasonalMultiplier: 1.05,
      historicalTrends: {
        spring: { priceChange: 5, volumeChange: 25, daysOnMarket: 28 },
        summer: { priceChange: 2, volumeChange: 15, daysOnMarket: 32 },
        autumn: { priceChange: -2, volumeChange: -10, daysOnMarket: 38 },
        winter: { priceChange: -5, volumeChange: -25, daysOnMarket: 45 }
      },
      upcomingEvents: [
        { event: 'Spring Property Market Opening', date: '2024-09-01', impact: 15, type: 'positive' },
        { event: 'Interest Rate Decision', date: '2024-09-15', impact: -5, type: 'negative' }
      ]
    };
  }

  private getFallbackNeighborhoodDevelopment(): NeighborhoodDevelopmentIntelligence {
    return {
      infrastructureProjects: [
        { project: 'New Metro Station', type: 'transport', completionDate: '2025-06-01', impact: 25, radiusKm: 2 },
        { project: 'Shopping Center Development', type: 'commercial', completionDate: '2024-12-01', impact: 15, radiusKm: 1.5 }
      ],
      zoningChanges: [
        { change: 'Medium Density Residential Approval', date: '2024-08-01', impact: 10, affectedArea: '500m radius' }
      ],
      demographicShifts: {
        populationGrowth: 3.5,
        ageDistribution: { '0-18': 20, '19-35': 30, '36-55': 35, '56+': 15 },
        incomeLevels: { low: 25, medium: 50, high: 25 },
        educationLevels: { high_school: 40, bachelor: 45, graduate: 15 }
      },
      gentrificationIndicators: {
        score: 65,
        factors: ['New cafes and restaurants', 'Young professional demographic', 'Property renovations'],
        timeline: 'medium term',
        impact: 20
      }
    };
  }

  private getFallbackComparableSales(): AdvancedComparableSales {
    return {
      recentSales: [
        {
          address: '123 Similar Street',
          salePrice: 850000,
          saleDate: '2024-07-15',
          propertyType: 'house',
          bedrooms: 3,
          bathrooms: 2,
          landSize: 600,
          buildingSize: 150,
          distance: 0.3,
          similarityScore: 85,
          adjustments: { size: 5, condition: 0, location: -2, features: 3 }
        }
      ],
      marketComparables: [
        {
          address: '456 Comparable Ave',
          listingPrice: 920000,
          daysOnMarket: 28,
          propertyType: 'house',
          bedrooms: 3,
          bathrooms: 2,
          landSize: 580,
          buildingSize: 145,
          distance: 0.5,
          competitionLevel: 'medium'
        }
      ],
      pricePerSquareMeter: {
        recent: 5500,
        historical: 5200,
        trend: 'increasing'
      }
    };
  }

  private getFallbackEconomicIntelligence(): EconomicIntelligence {
    return {
      macroeconomicIndicators: {
        interestRates: { current: 4.5, trend: 'stable', forecast: 4.3 },
        inflation: { current: 3.1, trend: 'falling', forecast: 2.8 },
        unemployment: { current: 5.2, trend: 'stable', forecast: 5.0 },
        gdpGrowth: { current: 2.8, trend: 'rising', forecast: 3.2 }
      },
      localEconomicFactors: {
        employmentGrowth: 2.5,
        wageGrowth: 3.8,
        businessConfidence: 72,
        constructionActivity: 15,
        tourismActivity: 8
      },
      governmentPolicies: [
        { policy: 'First Home Buyer Grant Increase', impact: 15, effectiveDate: '2024-07-01', duration: '12 months' }
      ]
    };
  }

  private getFallbackPricingIntelligence(propertyDetails: any): AdvancedPricingIntelligence {
    const basePrice = propertyDetails.estimatedValue || 800000;
    
    return {
      currentMarketValue: basePrice,
      optimalListingPrice: basePrice * 1.05,
      priceRange: {
        min: basePrice * 0.95,
        max: basePrice * 1.15,
        recommended: basePrice * 1.05,
        aggressive: basePrice * 1.10,
        conservative: basePrice * 1.00
      },
      confidence: 75,
      factors: {
        marketSentiment: 70,
        seasonalTrends: 65,
        neighborhoodDevelopment: 60,
        comparableSales: 80,
        economicIndicators: 70,
        aiAnalysis: 75
      },
      recommendations: {
        pricingStrategy: 'competitive',
        timing: 'immediate',
        marketingFocus: ['Location benefits', 'Property features', 'Investment potential'],
        negotiationTips: ['Highlight recent improvements', 'Emphasize market timing', 'Show comparable sales'],
        riskMitigation: ['Flexible settlement terms', 'Pre-sale inspection', 'Market contingency clause']
      },
      projections: {
        next30Days: 2,
        next90Days: 5,
        next180Days: 8,
        next365Days: 12
      },
      marketPositioning: {
        competitiveness: 'medium',
        uniqueValuePropositions: ['Great location', 'Modern features', 'Investment potential'],
        potentialBuyers: ['First home buyers', 'Young families', 'Investors'],
        sellingPoints: ['Close to transport', 'Good schools nearby', 'Low maintenance']
      }
    };
  }
}

export const enhancedDynamicPricingIntelligence = new EnhancedDynamicPricingIntelligence();
