export interface MarketData {
  nationalTrends: {
    medianPrice: number;
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
    auctionClearanceRate: number;
    rentalYield: number;
    vacancyRate: number;
  };
  regionalBreakdown: RegionalData[];
  climateProjections: ClimateProjections;
  investmentMetrics: InvestmentMetrics[];
}

export interface RegionalData {
  region: string;
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
    bushfires: { frequency: string; intensity: string };
    floods: { frequency: string; severity: string };
    cyclones: { frequency: string; intensity: string };
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
  nationalTrends: {
    medianPrice: 750000,
    priceGrowth: { 
      quarterly: 2.3, 
      annual: 8.7, 
      fiveYear: 45.2 
    },
    salesVolume: {
      current: 12450,
      previousQuarter: 11890,
      change: 4.7
    },
    daysOnMarket: 32,
    auctionClearanceRate: 68.5,
    rentalYield: 4.2,
    vacancyRate: 2.8
  },
  
  regionalBreakdown: [
    {
      region: "Sydney",
      medianPrice: 1250000,
      growth: 6.2,
      riskFactors: {
        climate: "High coastal exposure",
        market: "Overvaluation concerns",
        regulatory: "Stamp duty changes pending"
      },
      topSuburbs: [
        { name: "Bondi", median: 2100000, growth: 8.1 },
        { name: "Surry Hills", median: 1850000, growth: 5.9 },
        { name: "Paddington", median: 1650000, growth: 7.2 },
        { name: "Newtown", median: 1200000, growth: 9.5 }
      ]
    },
    {
      region: "Melbourne",
      medianPrice: 920000,
      growth: 8.4,
      riskFactors: {
        climate: "Bushfire and flood risks",
        market: "Strong population growth",
        regulatory: "Foreign buyer restrictions"
      },
      topSuburbs: [
        { name: "South Yarra", median: 1450000, growth: 6.8 },
        { name: "Richmond", median: 1180000, growth: 9.2 },
        { name: "Carlton", median: 1050000, growth: 7.9 },
        { name: "Fitzroy", median: 980000, growth: 8.8 }
      ]
    },
    {
      region: "Brisbane",
      medianPrice: 680000,
      growth: 12.8,
      riskFactors: {
        climate: "Flood and cyclone exposure",
        market: "Interstate migration surge",
        regulatory: "Infrastructure investment"
      },
      topSuburbs: [
        { name: "New Farm", median: 890000, growth: 15.2 },
        { name: "West End", median: 750000, growth: 14.1 },
        { name: "Paddington", median: 720000, growth: 13.8 },
        { name: "Woolloongabba", median: 680000, growth: 16.3 }
      ]
    },
    {
      region: "Perth",
      medianPrice: 520000,
      growth: 15.6,
      riskFactors: {
        climate: "Bushfire and heat exposure",
        market: "Mining boom recovery",
        regulatory: "Land release programs"
      },
      topSuburbs: [
        { name: "Cottesloe", median: 1250000, growth: 12.4 },
        { name: "Subiaco", median: 780000, growth: 18.7 },
        { name: "Fremantle", median: 650000, growth: 16.9 },
        { name: "Mount Lawley", median: 620000, growth: 17.2 }
      ]
    },
    {
      region: "Adelaide",
      medianPrice: 485000,
      growth: 10.2,
      riskFactors: {
        climate: "Bushfire and drought risks",
        market: "Affordable alternative market",
        regulatory: "First home buyer incentives"
      },
      topSuburbs: [
        { name: "North Adelaide", median: 720000, growth: 8.9 },
        { name: "Unley", median: 680000, growth: 11.5 },
        { name: "Norwood", median: 650000, growth: 9.7 },
        { name: "Prospect", median: 580000, growth: 12.3 }
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
      bushfires: { frequency: "+25%", intensity: "+40%" },
      floods: { frequency: "+15%", severity: "+30%" },
      cyclones: { frequency: "No change", intensity: "+20%" }
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

export const getTopPerformingRegions = (limit: number = 3): RegionalData[] => {
  return mockMarketData.regionalBreakdown
    .sort((a, b) => b.growth - a.growth)
    .slice(0, limit);
};

export const getInvestmentTrend = (quarters: number = 4): InvestmentMetrics[] => {
  return mockMarketData.investmentMetrics.slice(0, quarters);
};