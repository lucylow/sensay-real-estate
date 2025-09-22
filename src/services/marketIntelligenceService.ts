import { supabase } from '@/integrations/supabase/client';

export interface MarketIntelligenceRequest {
  location: string;
  propertyType?: string;
  analysisDepth?: 'basic' | 'comprehensive' | 'institutional';
  timeframe?: '1M' | '3M' | '6M' | '1Y' | '5Y';
}

export interface MarketIntelligenceData {
  market_overview: {
    location: string;
    market_size: number;
    total_transactions: number;
    average_price: number;
    market_velocity: number;
    inventory_levels: number;
  };
  price_trends: {
    current_median: number;
    yoy_growth: number;
    mom_growth: number;
    price_momentum: 'accelerating' | 'decelerating' | 'stable';
    seasonal_adjustment: number;
  };
  investment_metrics: {
    rental_yield: number;
    capital_growth_forecast: number[];
    roi_projection: number;
    payback_period: number;
    investment_score: number;
  };
  risk_factors: {
    market_volatility: number;
    economic_sensitivity: number;
    regulatory_risk: number;
    liquidity_risk: number;
    overall_risk_rating: 'Low' | 'Medium' | 'High';
  };
  recommendations: {
    investment_recommendation: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
    timing_recommendation: 'Immediate' | 'Within 3M' | 'Within 6M' | 'Wait';
    key_considerations: string[];
    exit_strategy: string;
  };
}

export class MarketIntelligenceService {

  async getMarketIntelligence(request: MarketIntelligenceRequest): Promise<MarketIntelligenceData> {
    try {
      const { data, error } = await supabase.functions.invoke('market-intelligence', {
        body: {
          location: request.location,
          propertyType: request.propertyType || 'residential',
          analysisDepth: request.analysisDepth || 'comprehensive',
          timeframe: request.timeframe || '1Y'
        }
      });

      if (error) throw error;

      return data.market_intelligence;
    } catch (error) {
      console.error('Market intelligence failed:', error);
      throw new Error(`Failed to get market intelligence: ${error.message}`);
    }
  }

  async getComparativeAnalysis(locations: string[]): Promise<any> {
    try {
      const analyses = await Promise.allSettled(
        locations.map(location => 
          this.getMarketIntelligence({ location, analysisDepth: 'basic' })
        )
      );

      const successful = analyses
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<MarketIntelligenceData>).value);

      if (successful.length === 0) {
        throw new Error('No market data available for comparison');
      }

      return {
        locations: successful.map(analysis => analysis.market_overview.location),
        comparison_matrix: {
          average_prices: successful.map(a => a.market_overview.average_price),
          growth_rates: successful.map(a => a.price_trends.yoy_growth),
          risk_ratings: successful.map(a => a.risk_factors.overall_risk_rating),
          investment_scores: successful.map(a => a.investment_metrics.investment_score),
          recommendations: successful.map(a => a.recommendations.investment_recommendation)
        },
        market_leaders: {
          highest_growth: successful.reduce((max, curr) => 
            curr.price_trends.yoy_growth > max.price_trends.yoy_growth ? curr : max
          ),
          best_value: successful.reduce((min, curr) => 
            curr.market_overview.average_price < min.market_overview.average_price ? curr : min
          ),
          lowest_risk: successful.reduce((min, curr) => 
            this.getRiskScore(curr.risk_factors) < this.getRiskScore(min.risk_factors) ? curr : min
          )
        },
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Comparative analysis failed:', error);
      throw new Error(`Failed to generate comparative analysis: ${error.message}`);
    }
  }

  async getInvestmentOpportunities(criteria: {
    budget_range: { min: number; max: number };
    risk_tolerance: 'low' | 'medium' | 'high';
    investment_timeframe: '1-3' | '3-5' | '5-10' | '10+';
    preferred_locations?: string[];
  }) {
    try {
      const locations = criteria.preferred_locations || [
        'Melbourne CBD', 'Sydney CBD', 'Brisbane', 'Perth', 'Adelaide'
      ];

      const marketData = await Promise.allSettled(
        locations.map(location => 
          this.getMarketIntelligence({ 
            location, 
            analysisDepth: 'institutional' 
          })
        )
      );

      const opportunities = marketData
        .filter(result => result.status === 'fulfilled')
        .map(result => (result as PromiseFulfilledResult<MarketIntelligenceData>).value)
        .filter(data => {
          const priceInRange = data.market_overview.average_price >= criteria.budget_range.min &&
                              data.market_overview.average_price <= criteria.budget_range.max;
          
          const riskMatch = this.matchesRiskTolerance(data.risk_factors, criteria.risk_tolerance);
          
          return priceInRange && riskMatch;
        })
        .sort((a, b) => b.investment_metrics.investment_score - a.investment_metrics.investment_score);

      return {
        total_opportunities: opportunities.length,
        top_opportunities: opportunities.slice(0, 5),
        investment_summary: {
          average_roi: opportunities.reduce((sum, opp) => 
            sum + opp.investment_metrics.roi_projection, 0) / opportunities.length,
          average_payback: opportunities.reduce((sum, opp) => 
            sum + opp.investment_metrics.payback_period, 0) / opportunities.length,
          risk_distribution: this.calculateRiskDistribution(opportunities)
        },
        market_insights: this.generateMarketInsights(opportunities),
        generated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('Investment opportunities analysis failed:', error);
      throw new Error(`Failed to analyze investment opportunities: ${error.message}`);
    }
  }

  private getRiskScore(riskFactors: any): number {
    const weights = {
      market_volatility: 0.3,
      economic_sensitivity: 0.25,
      regulatory_risk: 0.25,
      liquidity_risk: 0.2
    };

    return (
      riskFactors.market_volatility * weights.market_volatility +
      riskFactors.economic_sensitivity * weights.economic_sensitivity +
      riskFactors.regulatory_risk * weights.regulatory_risk +
      riskFactors.liquidity_risk * weights.liquidity_risk
    );
  }

  private matchesRiskTolerance(riskFactors: any, tolerance: string): boolean {
    const riskScore = this.getRiskScore(riskFactors);
    
    switch (tolerance) {
      case 'low': return riskScore < 0.3;
      case 'medium': return riskScore >= 0.3 && riskScore < 0.6;
      case 'high': return riskScore >= 0.6;
      default: return true;
    }
  }

  private calculateRiskDistribution(opportunities: MarketIntelligenceData[]) {
    const distribution = { low: 0, medium: 0, high: 0 };
    
    opportunities.forEach(opp => {
      const rating = opp.risk_factors.overall_risk_rating.toLowerCase();
      if (rating === 'low') distribution.low++;
      else if (rating === 'medium') distribution.medium++;
      else distribution.high++;
    });

    return distribution;
  }

  private generateMarketInsights(opportunities: MarketIntelligenceData[]): string[] {
    const insights = [];
    
    if (opportunities.length > 0) {
      const avgGrowth = opportunities.reduce((sum, opp) => 
        sum + opp.price_trends.yoy_growth, 0) / opportunities.length;
      
      if (avgGrowth > 8) {
        insights.push('Strong market growth trends observed across selected opportunities');
      } else if (avgGrowth > 4) {
        insights.push('Moderate but stable growth patterns in target markets');
      } else {
        insights.push('Conservative growth expectations - focus on income yield');
      }

      const strongBuys = opportunities.filter(opp => 
        opp.recommendations.investment_recommendation === 'Strong Buy').length;
      
      if (strongBuys > opportunities.length * 0.5) {
        insights.push('Multiple strong buy opportunities identified in current market');
      }
    }

    return insights;
  }
}

export const marketIntelligenceService = new MarketIntelligenceService();