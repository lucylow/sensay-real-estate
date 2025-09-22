export interface MockProperty {
  id: string;
  address: string;
  coordinates: { lat: number; lng: number };
  type: 'residential' | 'commercial' | 'industrial' | 'retail';
  subtype: string;
  valuation: number;
  valuationRange: { min: number; max: number };
  confidence: number;
  riskScore: number;
  bedrooms?: number;
  bathrooms?: number;
  parking: number;
  landSize: number;
  buildingSize: number;
  yearBuilt: number;
  lastSold?: { date: string; price: number };
  risks: {
    flood: number;
    fire: number;
    coastal: number;
    cyclone: number;
    earthquake: number;
    subsidence: number;
  };
  marketMetrics: {
    capRate?: number;
    cashOnCash?: number;
    noi?: number;
    dscr?: number;
    occupancyRate?: number;
    avgRent?: number;
    rentalYield?: number;
    weeklyRent?: number;
    daysOnMarket?: number;
  };
  compliance: {
    apra: number;
    nccp: number;
    basel3: number;
    cps234: number;
  };
  nftData: {
    tokenId: string;
    minted: boolean;
    blockNumber?: number;
    transactionHash?: string;
  };
}

export const mockProperties: MockProperty[] = [
  // CBD Commercial Properties
  {
    id: "prop_001",
    address: "123 Collins Street, Melbourne VIC 3000",
    coordinates: { lat: -37.8136, lng: 144.9631 },
    type: "commercial",
    subtype: "office_tower",
    valuation: 8500000,
    valuationRange: { min: 8200000, max: 8900000 },
    confidence: 92,
    riskScore: 66,
    parking: 50,
    landSize: 1200,
    buildingSize: 15000,
    yearBuilt: 1985,
    lastSold: { date: "2019-03-15", price: 7200000 },
    risks: {
      flood: 72, fire: 45, coastal: 38, cyclone: 10,
      earthquake: 25, subsidence: 30
    },
    marketMetrics: {
      capRate: 5.2, cashOnCash: 7.4, noi: 442000, dscr: 1.8,
      occupancyRate: 94, avgRent: 850
    },
    compliance: {
      apra: 98, nccp: 95, basel3: 92, cps234: 88
    },
    nftData: {
      tokenId: "PG-V-123COLLINS-20240108",
      minted: true,
      blockNumber: 42817291,
      transactionHash: "0x4a7c2f8b9e1d3c5a7f9b2e4d6c8a0f3e5b7d9c1a"
    }
  },
  
  // Sydney Residential
  {
    id: "prop_002", 
    address: "45 Ocean Drive, Bondi Beach NSW 2026",
    coordinates: { lat: -33.8915, lng: 151.2767 },
    type: "residential",
    subtype: "apartment",
    valuation: 2850000,
    valuationRange: { min: 2650000, max: 3100000 },
    confidence: 89,
    riskScore: 78,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    landSize: 0,
    buildingSize: 180,
    yearBuilt: 2018,
    risks: {
      flood: 45, fire: 25, coastal: 85, cyclone: 15,
      earthquake: 30, subsidence: 20
    },
    marketMetrics: {
      rentalYield: 3.8, weeklyRent: 1200, daysOnMarket: 28
    },
    compliance: {
      apra: 92, nccp: 88, basel3: 85, cps234: 90
    },
    nftData: {
      tokenId: "PG-R-BONDI45-20240110",
      minted: true,
      blockNumber: 42819455,
      transactionHash: "0x7f9b2e4d6c8a0f3e5b7d9c1a4e6d8b0c2f5a7d9b"
    }
  },

  // Brisbane Commercial
  {
    id: "prop_003",
    address: "200 Queen Street, Brisbane QLD 4000",
    coordinates: { lat: -27.4698, lng: 153.0251 },
    type: "commercial",
    subtype: "retail_complex",
    valuation: 12500000,
    valuationRange: { min: 11800000, max: 13200000 },
    confidence: 94,
    riskScore: 45,
    parking: 120,
    landSize: 2500,
    buildingSize: 8500,
    yearBuilt: 2010,
    risks: {
      flood: 65, fire: 35, coastal: 20, cyclone: 45,
      earthquake: 15, subsidence: 25
    },
    marketMetrics: {
      capRate: 6.8, cashOnCash: 8.2, noi: 850000, dscr: 2.1,
      occupancyRate: 97, avgRent: 450
    },
    compliance: {
      apra: 96, nccp: 94, basel3: 90, cps234: 93
    },
    nftData: {
      tokenId: "PG-C-QUEEN200-20240112",
      minted: true,
      blockNumber: 42821678,
      transactionHash: "0x1a4e6d8b0c2f5a7d9b3c5f8a1e4d7b0c3f6a8d1e"
    }
  },

  // Perth Mining Region
  {
    id: "prop_004",
    address: "88 St Georges Terrace, Perth WA 6000",
    coordinates: { lat: -31.9505, lng: 115.8605 },
    type: "commercial",
    subtype: "office_tower",
    valuation: 15200000,
    valuationRange: { min: 14500000, max: 15900000 },
    confidence: 87,
    riskScore: 52,
    parking: 80,
    landSize: 1800,
    buildingSize: 22000,
    yearBuilt: 1998,
    risks: {
      flood: 15, fire: 55, coastal: 35, cyclone: 25,
      earthquake: 20, subsidence: 30
    },
    marketMetrics: {
      capRate: 7.2, cashOnCash: 9.1, noi: 1094400, dscr: 1.9,
      occupancyRate: 92, avgRent: 520
    },
    compliance: {
      apra: 94, nccp: 91, basel3: 88, cps234: 89
    },
    nftData: {
      tokenId: "PG-C-PERTH88-20240115",
      minted: false
    }
  },

  // Adelaide Wine Country
  {
    id: "prop_005",
    address: "156 North Terrace, Adelaide SA 5000",
    coordinates: { lat: -34.9285, lng: 138.6007 },
    type: "residential",
    subtype: "heritage_home",
    valuation: 1850000,
    valuationRange: { min: 1650000, max: 2050000 },
    confidence: 85,
    riskScore: 38,
    bedrooms: 5,
    bathrooms: 3,
    parking: 3,
    landSize: 850,
    buildingSize: 320,
    yearBuilt: 1895,
    risks: {
      flood: 25, fire: 45, coastal: 15, cyclone: 5,
      earthquake: 35, subsidence: 40
    },
    marketMetrics: {
      rentalYield: 4.2, weeklyRent: 1500, daysOnMarket: 45
    },
    compliance: {
      apra: 89, nccp: 92, basel3: 86, cps234: 88
    },
    nftData: {
      tokenId: "PG-R-ADELAIDE156-20240118",
      minted: true,
      blockNumber: 42825901,
      transactionHash: "0x3c5f8a1e4d7b0c3f6a8d1e5b8a2c4f7d0a3e6b9c"
    }
  },

  // Darwin Tropical
  {
    id: "prop_006",
    address: "25 Mitchell Street, Darwin NT 0800",
    coordinates: { lat: -12.4634, lng: 130.8456 },
    type: "residential",
    subtype: "tropical_apartment",
    valuation: 650000,
    valuationRange: { min: 580000, max: 720000 },
    confidence: 78,
    riskScore: 85,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    landSize: 0,
    buildingSize: 95,
    yearBuilt: 2005,
    risks: {
      flood: 55, fire: 75, coastal: 45, cyclone: 90,
      earthquake: 10, subsidence: 25
    },
    marketMetrics: {
      rentalYield: 6.8, weeklyRent: 850, daysOnMarket: 65
    },
    compliance: {
      apra: 85, nccp: 82, basel3: 80, cps234: 83
    },
    nftData: {
      tokenId: "PG-R-DARWIN25-20240120",
      minted: false
    }
  },

  // Hobart Heritage
  {
    id: "prop_007",
    address: "78 Sandy Bay Road, Hobart TAS 7005",
    coordinates: { lat: -42.8821, lng: 147.3272 },
    type: "residential",
    subtype: "heritage_cottage",
    valuation: 950000,
    valuationRange: { min: 870000, max: 1030000 },
    confidence: 82,
    riskScore: 42,
    bedrooms: 4,
    bathrooms: 2,
    parking: 2,
    landSize: 650,
    buildingSize: 180,
    yearBuilt: 1920,
    risks: {
      flood: 35, fire: 40, coastal: 55, cyclone: 20,
      earthquake: 45, subsidence: 30
    },
    marketMetrics: {
      rentalYield: 4.8, weeklyRent: 880, daysOnMarket: 38
    },
    compliance: {
      apra: 91, nccp: 89, basel3: 87, cps234: 90
    },
    nftData: {
      tokenId: "PG-R-HOBART78-20240122",
      minted: true,
      blockNumber: 42828134,
      transactionHash: "0x5b8a2c4f7d0a3e6b9c1f4a7d0b3e6c9a2f5d8b1c"
    }
  },

  // Canberra Government
  {
    id: "prop_008",
    address: "45 Commonwealth Avenue, Canberra ACT 2600",
    coordinates: { lat: -35.2809, lng: 149.1300 },
    type: "commercial",
    subtype: "government_building",
    valuation: 25000000,
    valuationRange: { min: 23500000, max: 26800000 },
    confidence: 96,
    riskScore: 28,
    parking: 200,
    landSize: 5000,
    buildingSize: 35000,
    yearBuilt: 2008,
    risks: {
      flood: 20, fire: 30, coastal: 5, cyclone: 5,
      earthquake: 25, subsidence: 15
    },
    marketMetrics: {
      capRate: 4.8, cashOnCash: 6.2, noi: 1200000, dscr: 2.5,
      occupancyRate: 100, avgRent: 400
    },
    compliance: {
      apra: 99, nccp: 98, basel3: 96, cps234: 97
    },
    nftData: {
      tokenId: "PG-G-CANBERRA45-20240125",
      minted: true,
      blockNumber: 42830567,
      transactionHash: "0x7d0a3e6b9c1f4a7d0b3e6c9a2f5d8b1c4f7a0d3e"
    }
  }
];

// Helper functions
export const getPropertyByAddress = (address: string): MockProperty | undefined => {
  return mockProperties.find(prop => 
    prop.address.toLowerCase().includes(address.toLowerCase()) ||
    address.toLowerCase().includes(prop.address.toLowerCase())
  );
};

export const getPropertiesByCity = (city: string): MockProperty[] => {
  return mockProperties.filter(prop => 
    prop.address.toLowerCase().includes(city.toLowerCase())
  );
};

export const getPropertiesByType = (type: string): MockProperty[] => {
  return mockProperties.filter(prop => prop.type === type);
};

export const getRandomProperty = (): MockProperty => {
  return mockProperties[Math.floor(Math.random() * mockProperties.length)];
};

// Search function that matches addresses or cities
export const searchProperties = (query: string): MockProperty[] => {
  const searchTerm = query.toLowerCase().trim();
  
  // First try exact address match
  const exactMatch = getPropertyByAddress(searchTerm);
  if (exactMatch) {
    return [exactMatch];
  }
  
  // Then try city matches
  const cityMatches = mockProperties.filter(prop =>
    prop.address.toLowerCase().includes(searchTerm)
  );
  
  if (cityMatches.length > 0) {
    return cityMatches;
  }
  
  // Finally, return a random property for demo purposes
  return [getRandomProperty()];
};