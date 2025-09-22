export interface PropertyNFT {
  tokenId: string;
  propertyAddress: string;
  mintDate: string;
  blockNumber: number;
  transactionHash: string;
  owner: string;
  valuation: number;
  riskScore: number;
  apraCompliant: boolean;
  verified: boolean;
  gasUsed: number;
  network: string;
  metadata: {
    bedrooms?: number;
    bathrooms?: number;
    landSize: number;
    buildingSize: number;
    yearBuilt: number;
    propertyType: string;
  };
}

export interface AuditTrail {
  timestamp: string;
  action: string;
  nodes?: string[];
  result: 'success' | 'pending' | 'failed';
  details: string;
  transactionHash?: string;
  gasUsed?: number;
}

export interface SmartContract {
  name: string;
  address: string;
  version: string;
  verified: boolean;
  deployedAt: string;
  functions: string[];
}

export interface BlockchainMetrics {
  totalNFTs: number;
  totalValuation: number;
  averageGasPrice: number;
  networkStatus: 'healthy' | 'congested' | 'down';
  blockHeight: number;
  transactionThroughput: number;
}

export const mockNFTCollection: PropertyNFT[] = [
  {
    tokenId: "PG-V-123COLLINS-20240108",
    propertyAddress: "123 Collins Street, Melbourne VIC",
    mintDate: "2024-01-08T09:22:00Z",
    blockNumber: 42817291,
    transactionHash: "0x4a7c2f8b9e1d3c5a7f9b2e4d6c8a0f3e5b7d9c1a",
    owner: "0x3F5CE5A7D9B2E4C6A8F0D3E5B7C9A1F4E6D8B0C2",
    valuation: 8500000,
    riskScore: 66,
    apraCompliant: true,
    verified: true,
    gasUsed: 0.0234,
    network: "Polygon",
    metadata: {
      landSize: 1200,
      buildingSize: 15000,
      yearBuilt: 1985,
      propertyType: "commercial"
    }
  },
  {
    tokenId: "PG-R-BONDI45-20240110",
    propertyAddress: "45 Ocean Drive, Bondi Beach NSW",
    mintDate: "2024-01-10T14:15:00Z",
    blockNumber: 42819455,
    transactionHash: "0x7f9b2e4d6c8a0f3e5b7d9c1a4e6d8b0c2f5a7d9b",
    owner: "0x8A1F4E6D8B0C2F5A7D9B3C5F8A1E4D7B0C3F6A8D",
    valuation: 2850000,
    riskScore: 78,
    apraCompliant: true,
    verified: true,
    gasUsed: 0.0189,
    network: "Polygon",
    metadata: {
      bedrooms: 3,
      bathrooms: 2,
      landSize: 0,
      buildingSize: 180,
      yearBuilt: 2018,
      propertyType: "residential"
    }
  },
  {
    tokenId: "PG-C-QUEEN200-20240112",
    propertyAddress: "200 Queen Street, Brisbane QLD",
    mintDate: "2024-01-12T11:30:00Z",
    blockNumber: 42821678,
    transactionHash: "0x1a4e6d8b0c2f5a7d9b3c5f8a1e4d7b0c3f6a8d1e",
    owner: "0x2F5A7D9B3C5F8A1E4D7B0C3F6A8D1E5B8A2C4F7D",
    valuation: 12500000,
    riskScore: 45,
    apraCompliant: true,
    verified: true,
    gasUsed: 0.0267,
    network: "Polygon",
    metadata: {
      landSize: 2500,
      buildingSize: 8500,
      yearBuilt: 2010,
      propertyType: "commercial"
    }
  }
];

export const mockAuditTrail: AuditTrail[] = [
  {
    timestamp: "2024-01-08T09:15:00Z",
    action: "Valuation consensus reached",
    nodes: ["node_001", "node_002", "node_003"],
    result: "success",
    details: "3/3 nodes agreed on $8.5M valuation for 123 Collins Street",
    transactionHash: "0x4a7c2f8b9e1d3c5a7f9b2e4d6c8a0f3e5b7d9c1a",
    gasUsed: 0.0234
  },
  {
    timestamp: "2024-01-08T09:18:00Z", 
    action: "APRA compliance check",
    result: "success",
    details: "All CPS 230 requirements met - Score: 98/100",
    transactionHash: "0x5b7d9c1a4e6d8b0c2f5a7d9b3c5f8a1e4d7b0c3f"
  },
  {
    timestamp: "2024-01-08T09:22:00Z",
    action: "NFT minting",
    result: "success",
    details: "Property NFT successfully minted - Token ID: PG-V-123COLLINS-20240108",
    transactionHash: "0x4a7c2f8b9e1d3c5a7f9b2e4d6c8a0f3e5b7d9c1a",
    gasUsed: 0.0234
  },
  {
    timestamp: "2024-01-10T14:10:00Z",
    action: "Risk assessment update",
    nodes: ["node_001", "node_004", "node_005"],
    result: "success",
    details: "Climate risk factors updated for Bondi Beach property - New risk score: 78",
    transactionHash: "0x7f9b2e4d6c8a0f3e5b7d9c1a4e6d8b0c2f5a7d9b"
  },
  {
    timestamp: "2024-01-12T11:25:00Z",
    action: "Multi-node validation",
    nodes: ["node_002", "node_003", "node_006"],
    result: "success",
    details: "Brisbane commercial property validated across 3 nodes - Consensus achieved",
    transactionHash: "0x1a4e6d8b0c2f5a7d9b3c5f8a1e4d7b0c3f6a8d1e"
  }
];

export const mockSmartContracts: SmartContract[] = [
  {
    name: "PropertyValuation",
    address: "0x7b2F8c9A1e3D5f7B9c2E4a6D8f0B3e5C7a9F1d4E",
    version: "2.1.0",
    verified: true,
    deployedAt: "2023-11-15T10:00:00Z",
    functions: ["assessProperty", "updateValuation", "getConsensus", "validateRisk"]
  },
  {
    name: "PropertyNFT",
    address: "0x9c1E4a6D8f0B3e5C7a9F1d4E6b8A0c2F4e7D9b1C",
    version: "1.8.2",
    verified: true,
    deployedAt: "2023-10-22T14:30:00Z",
    functions: ["mintNFT", "transferOwnership", "updateMetadata", "burnNFT"]
  },
  {
    name: "APRACompliance",
    address: "0x1d4E6b8A0c2F4e7D9b1C3f5A8c0E2d4F6a8C0e2D",
    version: "3.0.1",
    verified: true,
    deployedAt: "2023-12-01T09:15:00Z",
    functions: ["checkCompliance", "auditTrail", "generateReport", "validateCPS230"]
  }
];

export const mockBlockchainMetrics: BlockchainMetrics = {
  totalNFTs: 1247,
  totalValuation: 2340000000,
  averageGasPrice: 0.0203,
  networkStatus: "healthy",
  blockHeight: 42825000,
  transactionThroughput: 156
};

export const getPropertyNFT = (tokenId: string): PropertyNFT | undefined => {
  return mockNFTCollection.find(nft => nft.tokenId === tokenId);
};

export const getNFTsByOwner = (owner: string): PropertyNFT[] => {
  return mockNFTCollection.filter(nft => nft.owner === owner);
};

export const getRecentAuditTrail = (limit: number = 10): AuditTrail[] => {
  return mockAuditTrail
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getAuditTrailByProperty = (propertyAddress: string): AuditTrail[] => {
  return mockAuditTrail.filter(audit => 
    audit.details.toLowerCase().includes(propertyAddress.toLowerCase())
  );
};

export const getContractByName = (name: string): SmartContract | undefined => {
  return mockSmartContracts.find(contract => contract.name === name);
};