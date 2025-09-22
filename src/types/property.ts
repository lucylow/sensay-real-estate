export interface PropertyData {
  address: string;
  bedrooms: number;
  bathrooms: number;
  land_size: number;
  year_built: number;
  property_type: string;
  lat: number;
  lng: number;
}

export interface PropertyAnalysis {
  current_valuation: number;
  valuation_range: {
    min: number;
    max: number;
  };
  risk_score: number;
  confidence: number;
  lvr?: number;
  analysis_result: any;
}

export interface SentimentAnalysis {
  sentiment: number;
  risk_level: number;
}

export interface MarketSentiment {
  sentiment_score: number;
  trend: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  summary: string;
  detailed_metrics?: {
    cap_rate: number;
    noi: number;
    cash_on_cash: number;
    debt_coverage: number;
  };
}