import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, TrendingDown, BarChart3, MapPin, DollarSign, 
  Clock, RefreshCw, Zap, Activity, Globe, AlertTriangle,
  CheckCircle, Eye, Target, Calendar, Users, Home, Settings
} from 'lucide-react';
// Note: Using mock data for demo purposes
// import { sensayAPI } from '@/services/api/sensay';
// import { propGuardAPI } from '@/services/api/propguard';

interface MarketData {
  location: string;
  timestamp: Date;
  priceIndex: number;
  priceChange: number;
  priceChangePercent: number;
  inventoryLevel: number;
  daysOnMarket: number;
  salesVolume: number;
  marketVelocity: number;
  confidenceScore: number;
  dataSource: string;
}

interface PriceTrend {
  date: string;
  price: number;
  volume: number;
  confidence: number;
}

interface MarketInsight {
  type: 'price_trend' | 'inventory' | 'demand' | 'risk';
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  timeframe: string;
}

interface RealTimeDataProps {
  className?: string;
  selectedLocation?: string;
  autoRefresh?: boolean;
}

export const RealTimeDataIntegration: React.FC<RealTimeDataProps> = ({ 
  className = '',
  selectedLocation = 'Melbourne',
  autoRefresh = true
}) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null);

  // Mock data for demonstration
  const mockMarketData: MarketData = {
    location: selectedLocation,
    timestamp: new Date(),
    priceIndex: 125.4,
    priceChange: 2.3,
    priceChangePercent: 1.87,
    inventoryLevel: 45,
    daysOnMarket: 28,
    salesVolume: 156,
    marketVelocity: 0.73,
    confidenceScore: 0.89,
    dataSource: 'PropGuard AI + MLS Integration'
  };

  const mockPriceTrends: PriceTrend[] = [
    { date: '2024-01-01', price: 123.1, volume: 142, confidence: 0.92 },
    { date: '2024-01-08', price: 124.2, volume: 138, confidence: 0.89 },
    { date: '2024-01-15', price: 125.4, volume: 156, confidence: 0.91 },
    { date: '2024-01-22', price: 126.8, volume: 149, confidence: 0.88 },
    { date: '2024-01-29', price: 128.1, volume: 163, confidence: 0.90 }
  ];

  const mockInsights: MarketInsight[] = [
    {
      type: 'price_trend',
      title: 'Strong Price Growth',
      description: 'Property prices in Melbourne have increased 1.87% this month, outpacing the national average.',
      impact: 'positive',
      confidence: 0.89,
      timeframe: '30 days'
    },
    {
      type: 'inventory',
      title: 'Low Inventory Alert',
      description: 'Available inventory is 15% below seasonal average, indicating potential supply constraints.',
      impact: 'negative',
      confidence: 0.76,
      timeframe: '7 days'
    },
    {
      type: 'demand',
      title: 'High Market Velocity',
      description: 'Properties are selling 23% faster than last quarter, indicating strong buyer demand.',
      impact: 'positive',
      confidence: 0.82,
      timeframe: '90 days'
    },
    {
      type: 'risk',
      title: 'Interest Rate Sensitivity',
      description: 'Market shows moderate sensitivity to interest rate changes. Monitor RBA announcements.',
      impact: 'neutral',
      confidence: 0.71,
      timeframe: 'ongoing'
    }
  ];

  const fetchRealTimeData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for demo purposes
      const combinedData: MarketData = {
        ...mockMarketData,
        location: selectedLocation,
        timestamp: new Date(),
        dataSource: 'Sensay AI + PropGuard + MLS',
        confidenceScore: 0.89
      };
      
      setMarketData(combinedData);
      setPriceTrends(mockPriceTrends);
      setMarketInsights(mockInsights);
      setLastUpdated(new Date());
      setDataSources(['Sensay AI', 'PropGuard', 'MLS', 'CoreLogic', 'Domain']);
      
    } catch (error) {
      console.error('Real-time data fetch failed:', error);
      setError('Failed to fetch real-time data. Using cached data.');
      
      // Fallback to mock data
      setMarketData(mockMarketData);
      setPriceTrends(mockPriceTrends);
      setMarketInsights(mockInsights);
      setLastUpdated(new Date());
    } finally {
      setIsLoading(false);
    }
  }, [selectedLocation]);

  useEffect(() => {
    // Initial data fetch
    fetchRealTimeData();
    
    // Set up auto-refresh if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchRealTimeData, 30000); // 30 seconds
      setRefreshInterval(interval);
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [fetchRealTimeData, autoRefresh]);

  const handleManualRefresh = () => {
    fetchRealTimeData();
  };

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Activity className="h-4 w-4 text-gray-600" />;
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      case 'neutral': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return <CheckCircle className="h-4 w-4" />;
      case 'negative': return <AlertTriangle className="h-4 w-4" />;
      case 'neutral': return <Eye className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const MarketOverviewCard: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Market Overview - {selectedLocation}
          </div>
          <div className="flex items-center gap-2">
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin" />}
            <Button size="sm" variant="outline" onClick={handleManualRefresh}>
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {marketData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-primary">
                {marketData.priceIndex.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Price Index</div>
              <div className="flex items-center justify-center gap-1 text-sm">
                {getTrendIcon(marketData.priceChange)}
                <span className={marketData.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {marketData.priceChange >= 0 ? '+' : ''}{marketData.priceChangePercent.toFixed(2)}%
                </span>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-600">
                {marketData.inventoryLevel}
              </div>
              <div className="text-sm text-muted-foreground">Available Properties</div>
              <div className="text-xs text-muted-foreground">
                {marketData.inventoryLevel < 50 ? 'Low Inventory' : 'Normal Inventory'}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-600">
                {marketData.daysOnMarket}
              </div>
              <div className="text-sm text-muted-foreground">Days on Market</div>
              <div className="text-xs text-muted-foreground">
                {marketData.daysOnMarket < 30 ? 'Fast Moving' : 'Normal Pace'}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-600">
                {(marketData.marketVelocity * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-muted-foreground">Market Velocity</div>
              <div className="text-xs text-muted-foreground">
                {marketData.marketVelocity > 0.7 ? 'High Activity' : 'Moderate Activity'}
              </div>
            </div>
          </div>
        )}
        
        {lastUpdated && (
          <div className="mt-4 text-xs text-muted-foreground text-center">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const PriceTrendChart: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Price Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {priceTrends.map((trend, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded">
              <div className="space-y-1">
                <div className="font-medium">{trend.date}</div>
                <div className="text-sm text-muted-foreground">
                  {trend.volume} properties sold
                </div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-bold text-primary">
                  ${trend.price.toFixed(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  {(trend.confidence * 100).toFixed(0)}% confidence
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const MarketInsightsPanel: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          AI Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {marketInsights.map((insight, index) => (
            <Alert key={index} className={getImpactColor(insight.impact)}>
              {getImpactIcon(insight.impact)}
              <AlertDescription>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{insight.title}</div>
                    <Badge variant="outline" className="text-xs">
                      {insight.timeframe}
                    </Badge>
                  </div>
                  <div className="text-sm">{insight.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Confidence: {(insight.confidence * 100).toFixed(0)}%
                    </div>
                    <Progress value={insight.confidence * 100} className="w-20 h-1" />
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const DataSourcesPanel: React.FC = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Data Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {dataSources.map((source, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">{source}</span>
              </div>
              <Badge variant="outline" className="text-xs">
                Live
              </Badge>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded">
          <div className="text-sm font-medium mb-2">Data Integration Status</div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div>• Sensay AI: Processing market sentiment and trends</div>
            <div>• PropGuard: Analyzing property risk and valuation data</div>
            <div>• MLS: Real-time listing and sales data</div>
            <div>• CoreLogic: Historical market analysis</div>
            <div>• Domain: Property search and pricing data</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Activity className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Real-Time Market Data</h1>
          <Badge variant="secondary" className="text-sm">
            Live Updates
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get live market trends, pricing updates, and AI-powered insights 
          powered by Sensay's Wisdom Engine and PropGuard's data integration.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Overview */}
        <div className="lg:col-span-2 space-y-6">
          <MarketOverviewCard />
          <PriceTrendChart />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <MarketInsightsPanel />
          <DataSourcesPanel />
        </div>
      </div>

      {/* Real-Time Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Real-Time Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Live Updates</h3>
              <p className="text-sm text-muted-foreground">
                Data refreshes every 30 seconds with real-time market changes
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">AI Insights</h3>
              <p className="text-sm text-muted-foreground">
                Sensay AI analyzes market sentiment and predicts trends
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">
                PropGuard AI provides real-time property risk analysis
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Multi-Source</h3>
              <p className="text-sm text-muted-foreground">
                Integrates data from MLS, CoreLogic, Domain, and more
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Auto Refresh</label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const interval = setInterval(fetchRealTimeData, 30000);
                      setRefreshInterval(interval);
                    } else {
                      if (refreshInterval) clearInterval(refreshInterval);
                      setRefreshInterval(null);
                    }
                  }}
                  className="rounded"
                />
                <span className="text-sm">Enable automatic data refresh</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Refresh Interval</label>
              <select className="w-full p-2 border rounded">
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="900">15 minutes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
