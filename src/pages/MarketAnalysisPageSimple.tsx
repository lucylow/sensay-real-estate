import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Home, 
  DollarSign, 
  Calendar, 
  Target,
  AlertCircle,
  Lightbulb,
  Search,
  MapPin,
  Eye,
  Download
} from 'lucide-react';

interface MarketData {
  location: string;
  medianPrice: number;
  priceChange: number;
  priceChangePercent: number;
  volume: number;
  volumeChange: number;
  daysOnMarket: number;
  clearanceRate: number;
  riskScore: number;
  trends: {
    shortTerm: 'up' | 'down' | 'stable';
    mediumTerm: 'up' | 'down' | 'stable';
    longTerm: 'up' | 'down' | 'stable';
  };
  insights: string[];
  recommendations: string[];
}

const mockMarketData: MarketData[] = [
  {
    location: 'Sydney CBD',
    medianPrice: 1250000,
    priceChange: 25000,
    priceChangePercent: 2.04,
    volume: 145,
    volumeChange: -12,
    daysOnMarket: 28,
    clearanceRate: 68,
    riskScore: 72,
    trends: {
      shortTerm: 'up',
      mediumTerm: 'up',
      longTerm: 'stable'
    },
    insights: [
      'Strong demand in CBD locations with limited supply',
      'Foreign investment driving premium segment growth',
      'Infrastructure projects supporting long-term value'
    ],
    recommendations: [
      'Consider properties near new transport links',
      'Focus on established buildings with good amenities',
      'Monitor interest rate changes closely'
    ]
  },
  {
    location: 'Melbourne Inner',
    medianPrice: 950000,
    priceChange: -15000,
    priceChangePercent: -1.55,
    volume: 98,
    volumeChange: 8,
    daysOnMarket: 35,
    clearanceRate: 62,
    riskScore: 68,
    trends: {
      shortTerm: 'down',
      mediumTerm: 'stable',
      longTerm: 'up'
    },
    insights: [
      'Market correction after recent peak pricing',
      'Increased supply in inner suburbs',
      'First home buyer activity remains strong'
    ],
    recommendations: [
      'Good buying opportunity for long-term investors',
      'Consider properties with development potential',
      'Focus on areas with planned infrastructure'
    ]
  },
  {
    location: 'Brisbane North',
    medianPrice: 750000,
    priceChange: 45000,
    priceChangePercent: 6.38,
    volume: 67,
    volumeChange: 15,
    daysOnMarket: 22,
    clearanceRate: 74,
    riskScore: 58,
    trends: {
      shortTerm: 'up',
      mediumTerm: 'up',
      longTerm: 'up'
    },
    insights: [
      'Olympics infrastructure driving demand',
      'Interstate migration supporting growth',
      'Affordable compared to southern capitals'
    ],
    recommendations: [
      'Strong growth potential for investors',
      'Consider properties near Olympic venues',
      'Monitor supply levels as market heats up'
    ]
  }
];

export const MarketAnalysisPageSimple: React.FC = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('house');
  const [selectedMarket, setSelectedMarket] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const market = mockMarketData.find(m => 
        m.location.toLowerCase().includes(location.toLowerCase())
      ) || mockMarketData[0];
      setSelectedMarket(market);
      setIsLoading(false);
    }, 1000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Analysis</h1>
          <p className="text-gray-600">Comprehensive market intelligence and trend analysis</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analyze Market
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter suburb, city, or region"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Type
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleSearch} disabled={isLoading} className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              {isLoading ? 'Analyzing...' : 'Analyze Market'}
            </Button>
          </CardContent>
        </Card>

        {/* Quick Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {mockMarketData.map((market) => (
            <Card 
              key={market.location} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedMarket?.location === market.location ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedMarket(market)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{market.location}</h3>
                  <Badge className={`${market.riskScore >= 70 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    Risk: {market.riskScore}/100
                  </Badge>
                </div>
                
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  ${market.medianPrice.toLocaleString()}
                </div>
                
                <div className={`flex items-center gap-1 text-sm ${
                  market.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {market.priceChange >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {market.priceChangePercent >= 0 ? '+' : ''}{market.priceChangePercent}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Analysis */}
        {selectedMarket && (
          <div className="space-y-6">
            {/* Market Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Overview - {selectedMarket.location}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Median Price</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${selectedMarket.medianPrice.toLocaleString()}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      selectedMarket.priceChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedMarket.priceChange >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {selectedMarket.priceChangePercent >= 0 ? '+' : ''}{selectedMarket.priceChangePercent}%
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Home className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Volume</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedMarket.volume}
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      selectedMarket.volumeChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedMarket.volumeChange >= 0 ? '+' : ''}{selectedMarket.volumeChange}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Days on Market</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedMarket.daysOnMarket}
                    </div>
                    <div className="text-sm text-gray-600">days</div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="h-4 w-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Clearance Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedMarket.clearanceRate}%
                    </div>
                    <Progress value={selectedMarket.clearanceRate} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trends Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Short Term (3 months)</span>
                      <div className={`flex items-center gap-2 ${getTrendColor(selectedMarket.trends.shortTerm)}`}>
                        {getTrendIcon(selectedMarket.trends.shortTerm)}
                        <span className="capitalize">{selectedMarket.trends.shortTerm}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Medium Term (1 year)</span>
                      <div className={`flex items-center gap-2 ${getTrendColor(selectedMarket.trends.mediumTerm)}`}>
                        {getTrendIcon(selectedMarket.trends.mediumTerm)}
                        <span className="capitalize">{selectedMarket.trends.mediumTerm}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Long Term (5 years)</span>
                      <div className={`flex items-center gap-2 ${getTrendColor(selectedMarket.trends.longTerm)}`}>
                        {getTrendIcon(selectedMarket.trends.longTerm)}
                        <span className="capitalize">{selectedMarket.trends.longTerm}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {selectedMarket.riskScore}/100
                    </div>
                    <div className="text-sm text-gray-600 mb-4">Overall Risk Score</div>
                    <Progress value={selectedMarket.riskScore} className="mb-4" />
                    <div className="text-xs text-gray-500">
                      {selectedMarket.riskScore >= 70 ? 'Low Risk Market' : 
                       selectedMarket.riskScore >= 50 ? 'Medium Risk Market' : 'High Risk Market'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights and Recommendations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedMarket.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedMarket.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                View Detailed Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Analysis
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
