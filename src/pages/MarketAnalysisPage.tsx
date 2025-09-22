import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Home, 
  DollarSign, 
  Calendar, 
  Target,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { realtyBaseAPI, MarketAnalysis } from '@/services/api/realtybase';
import { useToast } from '@/hooks/use-toast';

export const MarketAnalysisPage: React.FC = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'comprehensive'>('comprehensive');
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleAnalyze = async () => {
    if (!location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location for market analysis.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const marketAnalysis = await realtyBaseAPI.getMarketAnalysis({
        location,
        property_type: propertyType,
        analysis_depth: analysisDepth,
      });
      
      setAnalysis(marketAnalysis);
      setHasSearched(true);
      toast({
        title: "Market Analysis Complete",
        description: `Analysis for ${location} completed successfully.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to complete market analysis. Please try again.",
        variant: "destructive",
      });
      console.error('Market analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'falling': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'rising': return 'text-green-600';
      case 'falling': return 'text-red-600';
      default: return 'text-muted-foreground';
    }
  };

  const getMarketHeatColor = (heat: string) => {
    switch (heat) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'cool': return 'bg-blue-100 text-blue-800';
      case 'cold': return 'bg-slate-100 text-slate-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Market Analysis
          </h1>
          <p className="text-muted-foreground">
            AI-powered market insights and trends for Australian property markets
          </p>
        </div>

        {/* Analysis Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Market Analysis Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="e.g., Sydney, Melbourne, Brisbane"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Analysis Depth</label>
                <Select 
                  value={analysisDepth} 
                  onValueChange={(value: 'basic' | 'comprehensive') => setAnalysisDepth(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? 'Analyzing Market...' : 'Analyze Market'}
            </Button>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isLoading && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-1/3 mb-4" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis Results */}
        {hasSearched && !isLoading && analysis && (
          <div className="space-y-8">
            {/* Market Metrics Overview */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Market Metrics for {analysis.location}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Median Price</p>
                        <p className="text-2xl font-bold text-foreground">
                          {formatPrice(analysis.market_metrics.median_price)}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Price Growth YoY</p>
                        <p className={`text-2xl font-bold ${
                          analysis.market_metrics.price_growth_yoy > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {analysis.market_metrics.price_growth_yoy > 0 ? '+' : ''}
                          {(analysis.market_metrics.price_growth_yoy * 100).toFixed(1)}%
                        </p>
                      </div>
                      {analysis.market_metrics.price_growth_yoy > 0 ? (
                        <TrendingUp className="h-8 w-8 text-green-600" />
                      ) : (
                        <TrendingDown className="h-8 w-8 text-red-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Days on Market</p>
                        <p className="text-2xl font-bold text-foreground">
                          {analysis.market_metrics.days_on_market}
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Auction Clearance</p>
                        <p className="text-2xl font-bold text-foreground">
                          {(analysis.market_metrics.auction_clearance_rate * 100).toFixed(0)}%
                        </p>
                      </div>
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Trend Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getTrendIcon(analysis.trend_analysis.price_trend)}
                      <span className={`font-medium ${getTrendColor(analysis.trend_analysis.price_trend)}`}>
                        Price Trend
                      </span>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {analysis.trend_analysis.price_trend}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Market Heat</span>
                    </div>
                    <Badge className={getMarketHeatColor(analysis.trend_analysis.market_heat)}>
                      {analysis.trend_analysis.market_heat}
                    </Badge>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Supply & Demand</span>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {analysis.trend_analysis.supply_demand_balance.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    AI Market Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Market Sentiment</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.ai_insights.market_sentiment}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Investment Outlook</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.ai_insights.investment_outlook}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Risk Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      {analysis.ai_insights.risk_assessment}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysis.ai_insights.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-foreground">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Market Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Listing Volume</span>
                      <span className="text-sm text-muted-foreground">
                        {analysis.market_metrics.listing_volume.toLocaleString()} properties
                      </span>
                    </div>
                    <Progress value={Math.min(analysis.market_metrics.listing_volume / 1000 * 100, 100)} />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Market Activity</span>
                      <span className="text-sm text-muted-foreground">
                        {analysis.trend_analysis.market_heat} market
                      </span>
                    </div>
                    <Progress 
                      value={
                        analysis.trend_analysis.market_heat === 'hot' ? 100 :
                        analysis.trend_analysis.market_heat === 'warm' ? 75 :
                        analysis.trend_analysis.market_heat === 'cool' ? 50 : 25
                      } 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !isLoading && !analysis && (
          <Card className="text-center py-12">
            <CardContent>
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Market Data Available</h3>
              <p className="text-muted-foreground mb-4">
                Unable to retrieve market analysis for the specified location and property type.
              </p>
              <Button variant="outline" onClick={() => {
                setLocation('');
                setAnalysis(null);
                setHasSearched(false);
              }}>
                Try Different Location
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};