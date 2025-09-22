export interface PropertyNFT {
  token_id: string;
  property_address: string;
  valuation: number;
  risk_score: number;
  minted_at: string;
  owner: string;
}

export interface ComplianceStatus {
  APRA_CPS230: boolean;
  NCCP_Act: boolean;
  Basel_III: boolean;
}

export interface BlockchainHealth {
  status: string;
  block_height: number;
  network: string;
  gas_price: number;
}