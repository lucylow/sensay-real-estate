export interface PropertyFeatures {
  id: string;
  address: string;
  propertyType: 'House' | 'Apartment' | 'Townhouse' | 'Villa';
  bedrooms: number;
  bathrooms: number;
  carSpaces: number;
  landSize: number; // 0 for apartments
  buildYear: number;
  lastSaleDate?: string;
  lastSalePrice?: number;
  estimatedValue: number;
  pricePerSqm?: number;
  suburb: string;
  postcode: string;
  state: string;
  zoning: string;
  councilArea: string;
  schoolCatchment: string[];
  nearbyAmenities: {
    trainStations: number;
    shoppingCentres: number;
    hospitals: number;
    schools: number;
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
  private readonly API_BASE = 'https://api.corelogic.com.au/v1';

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
    const isApartment = /(apt|unit|flat|\/|\d+\/)/i.test(address);
    const isTownhouse = /(townhouse|tce|terrace)/i.test(address);
    
    // Australian city detection
    const isSydney = /(sydney|nsw|200\d|201\d|202\d|203\d|204\d|205\d)/i.test(address);
    const isMelbourne = /(melbourne|vic|300\d|301\d|302\d|303\d|304\d|305\d|306\d|307\d|308\d)/i.test(address);
    const isBrisbane = /(brisbane|qld|400\d|401\d|402\d|403\d|404\d|405\d)/i.test(address);
    const isPerth = /(perth|wa|600\d|601\d|602\d|603\d|604\d|605\d|606\d)/i.test(address);
    const isAdelaide = /(adelaide|sa|500\d|501\d|502\d|503\d|504\d|505\d)/i.test(address);
    
    // Extract suburb and postcode from address
    const postcodeMatch = address.match(/(\d{4})/);
    const postcode = postcodeMatch ? postcodeMatch[1] : this.generatePostcode(isSydney, isMelbourne, isBrisbane, isPerth, isAdelaide);
    
    const suburbMatch = address.match(/,\s*([^,\d]+)\s+[A-Z]{2,3}/);
    const suburb = suburbMatch ? suburbMatch[1].trim() : this.generateSuburb(isSydney, isMelbourne, isBrisbane, isPerth, isAdelaide);
    
    // Base pricing by city (median house prices as of 2024)
    let basePrice = 650000; // Default regional
    if (isSydney) basePrice = 1350000;
    else if (isMelbourne) basePrice = 950000;
    else if (isBrisbane) basePrice = 750000;
    else if (isPerth) basePrice = 620000;
    else if (isAdelaide) basePrice = 580000;
    
    // Property type adjustments
    let propertyType: PropertyFeatures['propertyType'] = 'House';
    let typeMultiplier = 1.0;
    
    if (isApartment) {
      propertyType = 'Apartment';
      typeMultiplier = 0.65;
    } else if (isTownhouse) {
      propertyType = 'Townhouse';
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
    
    // Market trends based on city
    const marketTrends = this.generateMarketTrends(isSydney, isMelbourne, isBrisbane, isPerth, isAdelaide);
    
    // Generate realistic last sale data (30% chance of recent sale)
    const hasRecentSale = Math.random() < 0.3;
    const lastSaleDate = hasRecentSale ? this.generateRecentSaleDate() : undefined;
    const lastSalePrice = hasRecentSale ? Math.floor(estimatedValue * (0.85 + Math.random() * 0.2)) : undefined;
    
    return {
      id: `CL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
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
      suburb,
      postcode,
      state: this.getState(isSydney, isMelbourne, isBrisbane, isPerth, isAdelaide),
      zoning: isApartment ? 'Residential High Density' : 'Residential Low Density',
      councilArea: `${suburb} Council`,
      schoolCatchment: this.generateSchoolCatchment(suburb),
      nearbyAmenities: this.generateNearbyAmenities(isSydney, isMelbourne),
      marketTrends,
    };
  }

  private generatePostcode(isSydney: boolean, isMelbourne: boolean, isBrisbane: boolean, isPerth: boolean, isAdelaide: boolean): string {
    if (isSydney) return String(2000 + Math.floor(Math.random() * 100));
    if (isMelbourne) return String(3000 + Math.floor(Math.random() * 100));
    if (isBrisbane) return String(4000 + Math.floor(Math.random() * 100));
    if (isPerth) return String(6000 + Math.floor(Math.random() * 100));
    if (isAdelaide) return String(5000 + Math.floor(Math.random() * 100));
    return String(2600 + Math.floor(Math.random() * 100)); // ACT/Regional
  }

  private generateSuburb(isSydney: boolean, isMelbourne: boolean, isBrisbane: boolean, isPerth: boolean, isAdelaide: boolean): string {
    const sydneySuburbs = ['Paddington', 'Surry Hills', 'Bondi', 'Manly', 'Chatswood', 'Parramatta', 'Bankstown', 'Blacktown'];
    const melbourneSuburbs = ['Richmond', 'Fitzroy', 'St Kilda', 'Toorak', 'Brighton', 'Brunswick', 'Frankston', 'Geelong'];
    const brisbaneSuburbs = ['New Farm', 'West End', 'Paddington', 'Toowong', 'Chermside', 'Indooroopilly', 'Logan', 'Ipswich'];
    const perthSuburbs = ['Subiaco', 'Fremantle', 'Cottesloe', 'Joondalup', 'Midland', 'Rockingham', 'Mandurah', 'Bunbury'];
    const adelaideSuburbs = ['North Adelaide', 'Glenelg', 'Brighton', 'Norwood', 'Prospect', 'Unley', 'Marion', 'Salisbury'];
    
    if (isSydney) return sydneySuburbs[Math.floor(Math.random() * sydneySuburbs.length)];
    if (isMelbourne) return melbourneSuburbs[Math.floor(Math.random() * melbourneSuburbs.length)];
    if (isBrisbane) return brisbaneSuburbs[Math.floor(Math.random() * brisbaneSuburbs.length)];
    if (isPerth) return perthSuburbs[Math.floor(Math.random() * perthSuburbs.length)];
    if (isAdelaide) return adelaideSuburbs[Math.floor(Math.random() * adelaideSuburbs.length)];
    return 'Canberra';
  }

  private getState(isSydney: boolean, isMelbourne: boolean, isBrisbane: boolean, isPerth: boolean, isAdelaide: boolean): string {
    if (isSydney) return 'NSW';
    if (isMelbourne) return 'VIC';
    if (isBrisbane) return 'QLD';
    if (isPerth) return 'WA';
    if (isAdelaide) return 'SA';
    return 'ACT';
  }

  private generateMarketTrends(isSydney: boolean, isMelbourne: boolean, isBrisbane: boolean, isPerth: boolean, isAdelaide: boolean) {
    // Realistic market data based on Australian property trends
    let medianPrice = 650000;
    let priceGrowth12m = Math.random() * 10 - 2; // -2% to +8%
    let daysOnMarket = Math.floor(Math.random() * 40) + 20; // 20-60 days
    let clearanceRate = 0.6 + Math.random() * 0.3; // 60%-90%
    
    if (isSydney) {
      medianPrice = 1350000;
      priceGrowth12m = Math.random() * 8 - 1; // Slower growth due to high base
      daysOnMarket = Math.floor(Math.random() * 30) + 25;
      clearanceRate = 0.65 + Math.random() * 0.25;
    } else if (isMelbourne) {
      medianPrice = 950000;
      priceGrowth12m = Math.random() * 10;
      daysOnMarket = Math.floor(Math.random() * 35) + 20;
      clearanceRate = 0.7 + Math.random() * 0.25;
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

  private generateSchoolCatchment(suburb: string): string[] {
    const primarySchools = [`${suburb} Primary School`, `${suburb} Public School`];
    const secondarySchools = [`${suburb} High School`, `${suburb} Secondary College`];
    return [...primarySchools.slice(0, 1), ...secondarySchools.slice(0, 1)];
  }

  private generateNearbyAmenities(isSydney: boolean, isMelbourne: boolean) {
    const baseMultiplier = isSydney || isMelbourne ? 1.5 : 1.0;
    
    return {
      trainStations: Math.floor((Math.random() * 3 + 1) * baseMultiplier),
      shoppingCentres: Math.floor((Math.random() * 2 + 1) * baseMultiplier),
      hospitals: Math.floor(Math.random() * 2 + 1),
      schools: Math.floor((Math.random() * 4 + 2) * baseMultiplier),
    };
  }

  getDataMode(): string {
    return this.MOCK_MODE ? 
      "Demo Mode: Using realistic CoreLogic-style property data" : 
      "Production Mode: Using CoreLogic API";
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
    const rentalYield = this.calculateRentalYield(baseData.estimatedValue, baseData.suburb);
    
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
    if (property.nearbyAmenities.trainStations === 0) risks.push('Limited public transport access');
    
    return risks;
  }

  private calculateRentalYield(estimatedValue: number, suburb: string): number {
    // Realistic rental yields for Australian markets
    const weeklyRent = estimatedValue * 0.0004; // ~4% annual yield base
    const annualRent = weeklyRent * 52;
    return Math.round((annualRent / estimatedValue) * 1000) / 10; // 1 decimal place
  }
}