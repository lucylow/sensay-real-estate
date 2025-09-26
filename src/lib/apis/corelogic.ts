export interface LocationData {
  country: string;
  region: string;
  basePrice: number;
  currency: string;
  jurisdictionType: string;
}

export interface PropertyFeatures {
  id: string;
  address: string;
  propertyType: 'House' | 'Apartment' | 'Townhouse' | 'Villa' | 'Condo' | 'Townhome' | 'Duplex';
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize: number; // 0 for apartments/condos
  buildYear: number;
  lastSaleDate?: string;
  lastSalePrice?: number;
  estimatedValue: number;
  pricePerSqm?: number;
  currency: string;
  city: string;
  region: string;
  country: string;
  postalCode: string;
  zoning: string;
  jurisdiction: string;
  schoolDistrict: string[];
  nearbyAmenities: {
    publicTransport: number;
    shoppingCenters: number;
    hospitals: number;
    schools: number;
    parks: number;
  };
  marketTrends: {
    medianPrice: number;
    priceGrowth12m: number;
    daysOnMarket: number;
    clearanceRate: number;
  };
}

export class CoreLogicClient {
  private readonly MOCK_MODE = true; // Set to true for hackathon
  private readonly API_BASE = 'https://api.globalpropertydata.com/v1';

  async getPropertyData(address: string): Promise<PropertyFeatures> {
    // Force mock mode for hackathon demo
    if (this.MOCK_MODE || !process.env.VITE_CORELOGIC_API_KEY) {
      return this.generateMockPropertyData(address);
    }

    try {
      // Real API implementation would go here
      const response = await fetch(`${this.API_BASE}/properties/search`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VITE_CORELOGIC_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });

      if (!response.ok) {
        throw new Error('CoreLogic API error');
      }

      return await response.json();
    } catch (error) {
      console.warn('CoreLogic API unavailable, using mock data:', error);
      return this.generateMockPropertyData(address);
    }
  }

  private generateMockPropertyData(address: string): PropertyFeatures {
    // Analyze address for realistic patterns
    const addressLower = address.toLowerCase();
    const isApartment = /(apt|unit|flat|apartment|condo|\/|\d+\/)/i.test(address);
    const isTownhouse = /(townhouse|tce|terrace|townhome)/i.test(address);
    
    // Global location detection
    const location = this.detectLocation(address);
    
    // Extract city and postal code from address
    const postalCodeMatch = address.match(/(\d{4,6}|\w{2,3}\s?\d{1,2}\w{2})/);
    const postalCode = postalCodeMatch ? postalCodeMatch[1] : this.generatePostalCode(location);
    
    const cityMatch = address.match(/,\s*([^,\d]+?)(?:\s*,\s*[A-Z]{2,3}|\s+\d{4,6})/);
    const city = cityMatch ? cityMatch[1].trim() : this.generateCity(location);
    
    // Base pricing by location (median house prices as of 2024)
    const basePrice = location.basePrice;
    const currency = location.currency;
    
    // Property type adjustments
    let propertyType: PropertyFeatures['propertyType'] = 'House';
    let typeMultiplier = 1.0;
    
    if (isApartment) {
      propertyType = location.country === 'US' ? 'Condo' : 'Apartment';
      typeMultiplier = 0.65;
    } else if (isTownhouse) {
      propertyType = location.country === 'US' ? 'Townhome' : 'Townhouse';
      typeMultiplier = 0.85;
    }
    
    // Generate realistic variation (±20%)
    const variation = (Math.random() - 0.5) * 0.4;
    const estimatedValue = Math.floor(basePrice * typeMultiplier * (1 + variation));
    
    // Property features based on type
    const bedrooms = isApartment ? 
      Math.floor(Math.random() * 2) + 1 : 
      Math.floor(Math.random() * 3) + 3;
    
    const bathrooms = isApartment ? 
      Math.floor(Math.random() * 1) + 1 : 
      Math.floor(Math.random() * 2) + 2;
    
    const landSize = isApartment ? 0 : Math.floor(Math.random() * 500) + 300;
    const buildYear = Math.floor(Math.random() * 40) + 1985;
    
    // Market trends based on location
    const marketTrends = this.generateMarketTrends(location);
    
    // Generate realistic last sale data (30% chance of recent sale)
    const hasRecentSale = Math.random() < 0.3;
    const lastSaleDate = hasRecentSale ? this.generateRecentSaleDate() : undefined;
    const lastSalePrice = hasRecentSale ? Math.floor(estimatedValue * (0.85 + Math.random() * 0.2)) : undefined;
    
    return {
      id: `GPD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      address,
      propertyType,
      bedrooms,
      bathrooms,
      carSpaces: isApartment ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 2) + 2,
      landSize,
      buildYear,
      lastSaleDate,
      lastSalePrice,
      estimatedValue,
      pricePerSqm: Math.floor(estimatedValue / ((bedrooms * 15) + (bathrooms * 8) + 50)),
      currency,
      city,
      region: location.region,
      country: location.country,
      postalCode,
      zoning: isApartment ? 'Residential High Density' : 'Residential Low Density',
      jurisdiction: `${city} ${location.jurisdictionType}`,
      schoolDistrict: this.generateSchoolDistrict(city, location.country),
      nearbyAmenities: this.generateNearbyAmenities(location),
      marketTrends,
    };
  }

  private detectLocation(address: string): LocationData {
    const addressLower = address.toLowerCase();
    
    // US locations
    if (/(new york|nyc|manhattan|brooklyn|queens|bronx|staten island|\bny\b)/i.test(address)) {
      return { country: 'US', region: 'New York', basePrice: 750000, currency: 'USD', jurisdictionType: 'City' };
    }
    if (/(los angeles|la|hollywood|beverly hills|santa monica|\bca\b)/i.test(address)) {
      return { country: 'US', region: 'California', basePrice: 850000, currency: 'USD', jurisdictionType: 'City' };
    }
    if (/(chicago|illinois|\bil\b)/i.test(address)) {
      return { country: 'US', region: 'Illinois', basePrice: 350000, currency: 'USD', jurisdictionType: 'City' };
    }
    if (/(miami|florida|orlando|tampa|\bfl\b)/i.test(address)) {
      return { country: 'US', region: 'Florida', basePrice: 450000, currency: 'USD', jurisdictionType: 'City' };
    }
    if (/(seattle|washington|\bwa\b)/i.test(address)) {
      return { country: 'US', region: 'Washington', basePrice: 650000, currency: 'USD', jurisdictionType: 'City' };
    }
    
    // UK locations
    if (/(london|greater london|westminster|camden|islington)/i.test(address)) {
      return { country: 'UK', region: 'England', basePrice: 650000, currency: 'GBP', jurisdictionType: 'Borough' };
    }
    if (/(manchester|merseyside|liverpool)/i.test(address)) {
      return { country: 'UK', region: 'England', basePrice: 250000, currency: 'GBP', jurisdictionType: 'City' };
    }
    if (/(birmingham|west midlands)/i.test(address)) {
      return { country: 'UK', region: 'England', basePrice: 220000, currency: 'GBP', jurisdictionType: 'City' };
    }
    
    // Canadian locations
    if (/(toronto|ontario|mississauga|brampton)/i.test(address)) {
      return { country: 'CA', region: 'Ontario', basePrice: 950000, currency: 'CAD', jurisdictionType: 'City' };
    }
    if (/(vancouver|british columbia|burnaby|surrey)/i.test(address)) {
      return { country: 'CA', region: 'British Columbia', basePrice: 1200000, currency: 'CAD', jurisdictionType: 'City' };
    }
    if (/(montreal|quebec)/i.test(address)) {
      return { country: 'CA', region: 'Quebec', basePrice: 450000, currency: 'CAD', jurisdictionType: 'City' };
    }
    
    // Australian locations (keeping for backward compatibility)
    if (/(sydney|nsw|200\d|201\d|202\d|203\d|204\d|205\d)/i.test(address)) {
      return { country: 'AU', region: 'New South Wales', basePrice: 1350000, currency: 'AUD', jurisdictionType: 'Council' };
    }
    if (/(melbourne|vic|300\d|301\d|302\d|303\d|304\d|305\d|306\d|307\d|308\d)/i.test(address)) {
      return { country: 'AU', region: 'Victoria', basePrice: 950000, currency: 'AUD', jurisdictionType: 'Council' };
    }
    if (/(brisbane|qld|400\d|401\d|402\d|403\d|404\d|405\d)/i.test(address)) {
      return { country: 'AU', region: 'Queensland', basePrice: 750000, currency: 'AUD', jurisdictionType: 'Council' };
    }
    
    // European locations
    if (/(paris|france)/i.test(address)) {
      return { country: 'FR', region: 'Île-de-France', basePrice: 650000, currency: 'EUR', jurisdictionType: 'Commune' };
    }
    if (/(berlin|germany|munich|hamburg)/i.test(address)) {
      return { country: 'DE', region: 'Germany', basePrice: 450000, currency: 'EUR', jurisdictionType: 'Stadt' };
    }
    if (/(madrid|spain|barcelona)/i.test(address)) {
      return { country: 'ES', region: 'Spain', basePrice: 350000, currency: 'EUR', jurisdictionType: 'Municipio' };
    }
    
    // Asian locations
    if (/(tokyo|japan)/i.test(address)) {
      return { country: 'JP', region: 'Kanto', basePrice: 65000000, currency: 'JPY', jurisdictionType: 'Ward' };
    }
    if (/(singapore)/i.test(address)) {
      return { country: 'SG', region: 'Singapore', basePrice: 1200000, currency: 'SGD', jurisdictionType: 'District' };
    }
    if (/(hong kong|hk)/i.test(address)) {
      return { country: 'HK', region: 'Hong Kong', basePrice: 12000000, currency: 'HKD', jurisdictionType: 'District' };
    }
    
    // Default to US
    return { country: 'US', region: 'United States', basePrice: 400000, currency: 'USD', jurisdictionType: 'City' };
  }

  private generatePostalCode(location: LocationData): string {
    switch (location.country) {
      case 'US': return String(10000 + Math.floor(Math.random() * 90000));
      case 'UK': return String(10000 + Math.floor(Math.random() * 90000));
      case 'CA': return String(10000 + Math.floor(Math.random() * 90000));
      case 'AU': return String(1000 + Math.floor(Math.random() * 9000));
      case 'FR': return String(10000 + Math.floor(Math.random() * 90000));
      case 'DE': return String(10000 + Math.floor(Math.random() * 90000));
      case 'ES': return String(10000 + Math.floor(Math.random() * 90000));
      case 'JP': return String(100 + Math.floor(Math.random() * 900));
      case 'SG': return String(100000 + Math.floor(Math.random() * 900000));
      case 'HK': return String(100000 + Math.floor(Math.random() * 900000));
      default: return String(10000 + Math.floor(Math.random() * 90000));
    }
  }

  private generateCity(location: LocationData): string {
    const cities = {
      'US': ['Downtown', 'Midtown', 'Uptown', 'East Side', 'West Side', 'North End', 'South End'],
      'UK': ['Central', 'East End', 'West End', 'North London', 'South London'],
      'CA': ['Downtown', 'Midtown', 'East Side', 'West Side', 'North End'],
      'AU': ['CBD', 'East', 'West', 'North', 'South', 'Inner', 'Outer'],
      'FR': ['Centre', 'Nord', 'Sud', 'Est', 'Ouest'],
      'DE': ['Mitte', 'Nord', 'Süd', 'Ost', 'West'],
      'ES': ['Centro', 'Norte', 'Sur', 'Este', 'Oeste'],
      'JP': ['Minato', 'Shibuya', 'Shinjuku', 'Ginza', 'Harajuku'],
      'SG': ['Central', 'East', 'West', 'North', 'South'],
      'HK': ['Central', 'Wan Chai', 'Causeway Bay', 'Tsim Sha Tsui', 'Admiralty']
    };
    
    const cityList = cities[location.country] || cities['US'];
    return cityList[Math.floor(Math.random() * cityList.length)];
  }

  private generateMarketTrends(location: LocationData) {
    // Realistic market data based on global property trends
    const medianPrice = location.basePrice;
    let priceGrowth12m = Math.random() * 15 - 5; // -5% to +10%
    let daysOnMarket = Math.floor(Math.random() * 60) + 15; // 15-75 days
    let clearanceRate = 0.5 + Math.random() * 0.4; // 50%-90%
    
    // Adjust based on market conditions
    if (location.country === 'US' && location.region === 'California') {
      priceGrowth12m = Math.random() * 8 - 2; // Slower growth due to high base
      daysOnMarket = Math.floor(Math.random() * 45) + 20;
      clearanceRate = 0.6 + Math.random() * 0.3;
    } else if (location.country === 'UK' && location.region === 'England') {
      priceGrowth12m = Math.random() * 6 - 3; // More conservative growth
      daysOnMarket = Math.floor(Math.random() * 50) + 25;
      clearanceRate = 0.55 + Math.random() * 0.35;
    } else if (location.country === 'JP') {
      priceGrowth12m = Math.random() * 4 - 1; // Very stable market
      daysOnMarket = Math.floor(Math.random() * 30) + 30;
      clearanceRate = 0.7 + Math.random() * 0.2;
    }
    
    return {
      medianPrice,
      priceGrowth12m: Math.round(priceGrowth12m * 10) / 10,
      daysOnMarket,
      clearanceRate: Math.round(clearanceRate * 100) / 100,
    };
  }

  private generateRecentSaleDate(): string {
    const daysAgo = Math.floor(Math.random() * 365) + 30; // 30-395 days ago
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString().split('T')[0];
  }

  private generateSchoolDistrict(city: string, country: string): string[] {
    const schoolTypes = {
      'US': [`${city} Elementary School`, `${city} High School`, `${city} Middle School`],
      'UK': [`${city} Primary School`, `${city} Secondary School`, `${city} Academy`],
      'CA': [`${city} Elementary School`, `${city} High School`, `${city} Middle School`],
      'AU': [`${city} Public School`, `${city} High School`, `${city} Primary School`],
      'FR': [`École Primaire ${city}`, `Collège ${city}`, `Lycée ${city}`],
      'DE': [`Grundschule ${city}`, `Realschule ${city}`, `Gymnasium ${city}`],
      'ES': [`Escuela Primaria ${city}`, `Instituto ${city}`, `Colegio ${city}`],
      'JP': [`${city}小学校`, `${city}中学校`, `${city}高等学校`],
      'SG': [`${city} Primary School`, `${city} Secondary School`, `${city} Junior College`],
      'HK': [`${city} Primary School`, `${city} Secondary School`, `${city} College`]
    };
    
    const schools = schoolTypes[country] || schoolTypes['US'];
    return schools.slice(0, Math.floor(Math.random() * 2) + 1);
  }

  private generateNearbyAmenities(location: LocationData) {
    const baseMultiplier = ['US', 'UK', 'CA', 'AU', 'JP', 'SG', 'HK'].includes(location.country) ? 1.5 : 1.0;
    
    return {
      publicTransport: Math.floor((Math.random() * 4 + 1) * baseMultiplier),
      shoppingCenters: Math.floor((Math.random() * 3 + 1) * baseMultiplier),
      hospitals: Math.floor(Math.random() * 2 + 1),
      schools: Math.floor((Math.random() * 5 + 2) * baseMultiplier),
      parks: Math.floor((Math.random() * 3 + 1) * baseMultiplier),
    };
  }

  getDataMode(): string {
    return this.MOCK_MODE ? 
      "Demo Mode: Using realistic global property data" : 
      "Production Mode: Using Global Property Data API";
  }

  // Method to get enhanced property details for reports
  async getEnhancedPropertyDetails(address: string): Promise<PropertyFeatures & { 
    riskFactors: string[];
    investmentMetrics: {
      rentalYield: number;
      capitalGrowthPotential: string;
      liquidityRating: string;
    };
  }> {
    const baseData = await this.getPropertyData(address);
    
    // Add investment analysis
    const riskFactors = this.generateRiskFactors(baseData);
    const rentalYield = this.calculateRentalYield(baseData.estimatedValue, baseData.city);
    
    return {
      ...baseData,
      riskFactors,
      investmentMetrics: {
        rentalYield,
        capitalGrowthPotential: rentalYield > 5 ? 'Moderate' : 'High',
        liquidityRating: baseData.marketTrends.daysOnMarket < 30 ? 'High' : 'Moderate',
      },
    };
  }

  private generateRiskFactors(property: PropertyFeatures): string[] {
    const risks: string[] = [];
    
    if (property.buildYear < 1990) risks.push('Older construction may require maintenance');
    if (property.propertyType === 'Apartment') risks.push('Strata fees and body corporate decisions');
    if (property.marketTrends.priceGrowth12m < 0) risks.push('Declining market conditions');
    if (property.nearbyAmenities.publicTransport === 0) risks.push('Limited public transport access');
    
    return risks;
  }

  private calculateRentalYield(estimatedValue: number, city: string): number {
    // Realistic rental yields for global markets
    const baseYield = 0.04; // 4% base annual yield
    const weeklyRent = estimatedValue * (baseYield / 52);
    const annualRent = weeklyRent * 52;
    return Math.round((annualRent / estimatedValue) * 1000) / 10; // 1 decimal place
  }
}