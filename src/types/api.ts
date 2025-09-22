// API Response Types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SystemHealthResponse {
  propguard: APIResponse;
  llm: APIResponse;
  blockchain: APIResponse;
  xnode: APIResponse;
  pipeline: APIResponse;
}

export interface PropertyAnalysisResponse {
  address?: string;
  valuation?: number;
  story?: string;
  risk?: {
    flood: number;
    fire: number;
    coastalErosion: number;
    subsidence: number;
    market: number;
  };
  compliance?: {
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
    reasons: string[];
    lvr: number;
    dti: number;
  };
  analysis_result?: {
    current_valuation?: number;
    risk_score?: number;
    climate_risk?: string;
    lvr?: number;
    confidence?: number;
  };
}