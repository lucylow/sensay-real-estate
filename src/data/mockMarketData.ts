export interface MarketData {
  globalTrends: {
    medianPrice: number;
    currency: string;
    priceGrowth: {
      quarterly: number;
      annual: number;
      fiveYear: number;
    };
    salesVolume: {
      current: number;
      previousQuarter: number;
      change: number;
    };
    daysOnMarket: number;
    clearanceRate: number;
    rentalYield: number;
    vacancyRate: number;
  };
  regionalBreakdown: RegionalData[];
  climateProjections: ClimateProjections;
  investmentMetrics: InvestmentMetrics[];
}

export interface RegionalData {
  region: string;
  country: string;
  currency: string;
  medianPrice: number;
  growth: number;
  riskFactors: {
    climate: string;
    market: string;
    regulatory: string;
  };
  topSuburbs: Array<{
    name: string;
    median: number;
    growth: number;
  }>;
}

export interface ClimateProjections {
  temperature: {
    current: number;
    projection2030: number;
    projection2050: number;
  };
  rainfall: {
    current: number;
    projection2030: number;
    projection2050: number;
  };
  seaLevel: {
    current: number;
    projection2030: number;
    projection2050: number;
  };
  extremeEvents: {
    wildfires: { frequency: string; intensity: string };
    floods: { frequency: string; severity: string };
    hurricanes: { frequency: string; intensity: string };
    earthquakes: { frequency: string; intensity: string };
    typhoons: { frequency: string; intensity: string };
  };
}

export interface InvestmentMetrics {
  quarter: string;
  capitalGrowth: number;
  rentalYield: number;
  totalReturn: number;
  riskAdjustedReturn: number;
}

export const mockMarketData: MarketData = {
  globalTrends: {
    medianPrice: 450000,
    currency: 'USD',
    priceGrowth: { 
      quarterly: 1.8, 
      annual: 6.2, 
      fiveYear: 32.1 
    },
    salesVolume: {
      current: 245000,
      previousQuarter: 238000,
      change: 2.9
    },
    daysOnMarket: 28,
    clearanceRate: 65.2,
    rentalYield: 4.8,
    vacancyRate: 3.2
  },
  
  regionalBreakdown: [
    // North America
    {
      region: "New York",
      country: "United States",
      currency: "USD",
      medianPrice: 750000,
      growth: 4.2,
      riskFactors: {
        climate: "Hurricane and flooding exposure",
        market: "High demand, limited supply",
        regulatory: "Tax reform impacts"
      },
      topSuburbs: [
        { name: "Manhattan", median: 1200000, growth: 3.8 },
        { name: "Brooklyn", median: 850000, growth: 5.2 },
        { name: "Queens", median: 650000, growth: 6.1 },
        { name: "Bronx", median: 480000, growth: 7.3 }
      ]
    },
    {
      region: "Los Angeles",
      country: "United States",
      currency: "USD",
      medianPrice: 850000,
      growth: 3.8,
      riskFactors: {
        climate: "Wildfire and earthquake risks",
        market: "Tech industry influence",
        regulatory: "Prop 13 tax limitations"
      },
      topSuburbs: [
        { name: "Beverly Hills", median: 2800000, growth: 2.1 },
        { name: "Santa Monica", median: 1800000, growth: 4.5 },
        { name: "Hollywood", median: 1200000, growth: 5.8 },
        { name: "Venice", median: 1500000, growth: 3.9 }
      ]
    },
    {
      region: "Toronto",
      country: "Canada",
      currency: "CAD",
      medianPrice: 950000,
      growth: 8.7,
      riskFactors: {
        climate: "Winter weather and flooding",
        market: "Immigration-driven demand",
        regulatory: "Foreign buyer taxes"
      },
      topSuburbs: [
        { name: "Yorkville", median: 1800000, growth: 7.2 },
        { name: "Distillery District", median: 1200000, growth: 9.1 },
        { name: "Liberty Village", median: 850000, growth: 10.3 },
        { name: "King West", median: 950000, growth: 8.8 }
      ]
    },
    // Europe
    {
      region: "London",
      country: "United Kingdom",
      currency: "GBP",
      medianPrice: 650000,
      growth: 2.1,
      riskFactors: {
        climate: "Flooding and heat island effects",
        market: "Brexit uncertainty",
        regulatory: "Stamp duty changes"
      },
      topSuburbs: [
        { name: "Westminster", median: 1200000, growth: 1.8 },
        { name: "Camden", median: 850000, growth: 2.5 },
        { name: "Islington", median: 750000, growth: 3.1 },
        { name: "Hackney", median: 650000, growth: 4.2 }
      ]
    },
    {
      region: "Berlin",
      country: "Germany",
      currency: "EUR",
      medianPrice: 450000,
      growth: 12.5,
      riskFactors: {
        climate: "Heat waves and flooding",
        market: "Tech hub development",
        regulatory: "Rent control measures"
      },
      topSuburbs: [
        { name: "Mitte", median: 680000, growth: 10.8 },
        { name: "Prenzlauer Berg", median: 520000, growth: 13.2 },
        { name: "Kreuzberg", median: 480000, growth: 14.1 },
        { name: "Friedrichshain", median: 450000, growth: 15.3 }
      ]
    },
    // Asia-Pacific
    {
      region: "Sydney",
      country: "Australia",
      currency: "AUD",
      medianPrice: 1250000,
      growth: 6.2,
      riskFactors: {
        climate: "Coastal flooding and bushfires",
        market: "Interest rate sensitivity",
        regulatory: "Foreign buyer restrictions"
      },
      topSuburbs: [
        { name: "Bondi", median: 2100000, growth: 8.1 },
        { name: "Surry Hills", median: 1850000, growth: 5.9 },
        { name: "Paddington", median: 1650000, growth: 7.2 },
        { name: "Newtown", median: 1200000, growth: 9.5 }
      ]
    },
    {
      region: "Tokyo",
      country: "Japan",
      currency: "JPY",
      medianPrice: 65000000,
      growth: 4.8,
      riskFactors: {
        climate: "Typhoons and earthquakes",
        market: "Aging population",
        regulatory: "Olympics legacy effects"
      },
      topSuburbs: [
        { name: "Minato", median: 120000000, growth: 3.2 },
        { name: "Shibuya", median: 95000000, growth: 5.1 },
        { name: "Shinjuku", median: 85000000, growth: 4.7 },
        { name: "Ginza", median: 150000000, growth: 2.8 }
      ]
    },
    {
      region: "Singapore",
      country: "Singapore",
      currency: "SGD",
      medianPrice: 1200000,
      growth: 3.2,
      riskFactors: {
        climate: "Sea level rise and flooding",
        market: "Government cooling measures",
        regulatory: "Additional buyer stamp duty"
      },
      topSuburbs: [
        { name: "Orchard", median: 2800000, growth: 2.1 },
        { name: "Marina Bay", median: 2200000, growth: 3.5 },
        { name: "Sentosa", median: 3500000, growth: 1.8 },
        { name: "Holland Village", median: 1800000, growth: 4.2 }
      ]
    }
  ],
  
  climateProjections: {
    temperature: { 
      current: 22.5, 
      projection2030: 24.1, 
      projection2050: 26.3 
    },
    rainfall: { 
      current: 650, 
      projection2030: 590, 
      projection2050: 520 
    },
    seaLevel: { 
      current: 0, 
      projection2030: 12, 
      projection2050: 28 
    },
    extremeEvents: {
      wildfires: { frequency: "+30%", intensity: "+45%" },
      floods: { frequency: "+20%", severity: "+35%" },
      hurricanes: { frequency: "+15%", intensity: "+25%" },
      earthquakes: { frequency: "No change", intensity: "+10%" },
      typhoons: { frequency: "+18%", intensity: "+22%" }
    }
  },

  investmentMetrics: [
    { quarter: "Q4 2023", capitalGrowth: 8.7, rentalYield: 4.2, totalReturn: 12.9, riskAdjustedReturn: 9.8 },
    { quarter: "Q3 2023", capitalGrowth: 6.1, rentalYield: 4.1, totalReturn: 10.2, riskAdjustedReturn: 8.5 },
    { quarter: "Q2 2023", capitalGrowth: 4.8, rentalYield: 4.0, totalReturn: 8.8, riskAdjustedReturn: 7.9 },
    { quarter: "Q1 2023", capitalGrowth: 3.2, rentalYield: 3.9, totalReturn: 7.1, riskAdjustedReturn: 6.8 },
    { quarter: "Q4 2022", capitalGrowth: 2.1, rentalYield: 3.8, totalReturn: 5.9, riskAdjustedReturn: 5.2 },
    { quarter: "Q3 2022", capitalGrowth: 1.8, rentalYield: 3.7, totalReturn: 5.5, riskAdjustedReturn: 4.9 },
    { quarter: "Q2 2022", capitalGrowth: 4.5, rentalYield: 3.6, totalReturn: 8.1, riskAdjustedReturn: 6.8 },
    { quarter: "Q1 2022", capitalGrowth: 6.2, rentalYield: 3.5, totalReturn: 9.7, riskAdjustedReturn: 7.9 }
  ]
};

export const getRegionalData = (region: string): RegionalData | undefined => {
  return mockMarketData.regionalBreakdown.find(
    data => data.region.toLowerCase() === region.toLowerCase()
  );
};

export const getRegionalDataByCountry = (country: string): RegionalData[] => {
  return mockMarketData.regionalBreakdown.filter(
    data => data.country.toLowerCase() === country.toLowerCase()
  );
};

export const getTopPerformingRegions = (limit: number = 3): RegionalData[] => {
  return mockMarketData.regionalBreakdown
    .sort((a, b) => b.growth - a.growth)
    .slice(0, limit);
};

export const getInvestmentTrend = (quarters: number = 4): InvestmentMetrics[] => {
  return mockMarketData.investmentMetrics.slice(0, quarters);
};