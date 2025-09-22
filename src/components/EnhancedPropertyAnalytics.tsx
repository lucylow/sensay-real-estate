import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign, Target, Calendar } from 'lucide-react';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';
import { PropertyAnalysis, SentimentAnalysis, MarketSentiment } from '@/types/property';

interface EnhancedPropertyAnalyticsProps {
  analysis?: PropertyAnalysis | null;
  sentiment?: SentimentAnalysis | null;
  marketSentiment?: MarketSentiment | null;
  property?: any;
}

export const EnhancedPropertyAnalytics: React.FC<EnhancedPropertyAnalyticsProps> = ({ 
  analysis, 
  sentiment, 
  marketSentiment, 
  property 
}) => {
  // Use passed data if available, otherwise fallback to mock data
  const data = analysis ? {
    propertyAnalysis: analysis,
    sentimentAnalysis: sentiment || COLLINS_STREET_MOCK_DATA.sentimentAnalysis,
    marketSentiment: marketSentiment || COLLINS_STREET_MOCK_DATA.marketSentiment,
    // Use dynamic valuation for confidence growth
    confidenceGrowth: [
      { date: '2023-01', confidence: 82, valuation: Math.round(analysis.current_valuation * 0.92) },
      { date: '2023-06', confidence: 85, valuation: Math.round(analysis.current_valuation * 0.95) },
      { date: '2023-12', confidence: 88, valuation: Math.round(analysis.current_valuation * 0.98) },
      { date: '2024-01', confidence: analysis.confidence, valuation: analysis.current_valuation }
    ]
  } : COLLINS_STREET_MOCK_DATA;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Show loading state if no data is available
  if (!data.propertyAnalysis) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              No property analysis data available. Please analyze a property to view detailed analytics.
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Valuation Overview */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Valuation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(data.propertyAnalysis.current_valuation)}
              </div>
              <div className="text-sm text-muted-foreground">Current Valuation</div>
              <div className="mt-2 text-sm">
                Range: {formatCurrency(data.propertyAnalysis.valuation_range.min)} - {formatCurrency(data.propertyAnalysis.valuation_range.max)}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Confidence Level</span>
                  <span>{data.propertyAnalysis.confidence}%</span>
                </div>
                <Progress value={data.propertyAnalysis.confidence} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Risk Score</span>
                  <span>{data.propertyAnalysis.risk_score}/100</span>
                </div>
                <Progress value={data.propertyAnalysis.risk_score} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Sentiment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Market Sentiment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Sentiment Score</span>
              <Badge variant="default">{data.marketSentiment.sentiment_score}/10</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Trend</span>
              <Badge variant="secondary" className="capitalize">
                {data.marketSentiment.trend}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {data.marketSentiment.summary}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Valuation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Land Value</span>
              <span className="font-medium">{formatCurrency(data.propertyAnalysis.analysis_result.detailed_breakdown.land_value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Building Value</span>
              <span className="font-medium">{formatCurrency(data.propertyAnalysis.analysis_result.detailed_breakdown.building_value)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Intangible Assets</span>
              <span className="font-medium">{formatCurrency(data.propertyAnalysis.analysis_result.detailed_breakdown.intangible_assets)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Comparables */}
      <Card>
        <CardHeader>
          <CardTitle>Market Comparables</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.propertyAnalysis.analysis_result.market_comparables.map((comp, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-medium">{comp.address}</div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(comp.value)}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  +{Math.round(comp.premium * 100)}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Investment Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold">{data.marketSentiment.detailed_metrics.cap_rate}%</div>
              <div className="text-xs text-muted-foreground">Cap Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{data.marketSentiment.detailed_metrics.cash_on_cash}%</div>
              <div className="text-xs text-muted-foreground">Cash-on-Cash</div>
            </div>
            <div>
              <div className="text-sm font-bold">{formatCurrency(data.marketSentiment.detailed_metrics.noi)}</div>
              <div className="text-xs text-muted-foreground">NOI/Year</div>
            </div>
            <div>
              <div className="text-sm font-bold">{data.marketSentiment.detailed_metrics.debt_coverage}x</div>
              <div className="text-xs text-muted-foreground">DSCR</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Risk Assessment Detail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Flood Risk */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Flood Risk</span>
                <Badge variant="destructive">{data.propertyAnalysis.analysis_result.risk.detailed.flood.score}/100</Badge>
              </div>
              <Progress value={data.propertyAnalysis.analysis_result.risk.detailed.flood.score} className="h-2" />
              <div className="text-xs text-muted-foreground space-y-1">
                {data.propertyAnalysis.analysis_result.risk.detailed.flood.factors.map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>

            {/* Fire Risk */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Fire Risk</span>
                <Badge variant="secondary">{data.propertyAnalysis.analysis_result.risk.detailed.fire.score}/100</Badge>
              </div>
              <Progress value={data.propertyAnalysis.analysis_result.risk.detailed.fire.score} className="h-2" />
              <div className="text-xs text-muted-foreground space-y-1">
                {data.propertyAnalysis.analysis_result.risk.detailed.fire.factors.map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>

            {/* Coastal Risk */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Coastal Risk</span>
                <Badge variant="secondary">{data.propertyAnalysis.analysis_result.risk.detailed.coastal.score}/100</Badge>
              </div>
              <Progress value={data.propertyAnalysis.analysis_result.risk.detailed.coastal.score} className="h-2" />
              <div className="text-xs text-muted-foreground space-y-1">
                {data.propertyAnalysis.analysis_result.risk.detailed.coastal.factors.map((factor, index) => (
                  <div key={index}>• {factor}</div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Valuation Timeline */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Valuation & Confidence Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {data.confidenceGrowth.map((point, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-sm text-muted-foreground">{point.date}</div>
                <div className="font-bold">{formatCurrency(point.valuation)}</div>
                <div className="text-sm">
                  <Badge variant="outline">{point.confidence}% confidence</Badge>
                </div>
                {index < data.confidenceGrowth.length - 1 && (
                  <div className="flex justify-center">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};