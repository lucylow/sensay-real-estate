import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  Shield, 
  Eye, 
  Star,
  Calendar,
  Users,
  BarChart3,
  Zap,
  Brain,
  Satellite,
  Globe,
  Target,
  CheckCircle,
  AlertCircle,
  Info,
  Search,
  Filter,
  SortAsc,
  Heart,
  Share2,
  Phone,
  MessageCircle
} from 'lucide-react';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  propertyType: string;
  images: string[];
  virtualTour: boolean;
  description: string;
  features: string[];
  riskScore: number;
  riskFactors: string[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
  pricePrediction: {
    nextMonth: number;
    nextYear: number;
    confidence: number;
  };
  mlsData: {
    listingId: string;
    status: 'active' | 'pending' | 'sold';
    daysOnMarket: number;
    priceHistory: Array<{ date: Date; price: number }>;
  };
  environmentalRisks: {
    flood: number;
    fire: number;
    earthquake: number;
    coastal: number;
  };
  neighborhood: {
    walkScore: number;
    transitScore: number;
    crimeRate: number;
    schoolRating: number;
  };
  matchScore: number;
  personalizedFeatures: string[];
}

interface PropertyIntelligence {
  totalProperties: number;
  avgPrice: number;
  marketTrend: 'up' | 'down' | 'stable';
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  topFeatures: Array<{ feature: string; demand: number }>;
  priceAccuracy: number;
  predictionAccuracy: number;
}

export const PropertyIntelligence: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [intelligence, setIntelligence] = useState<PropertyIntelligence>({
    totalProperties: 0,
    avgPrice: 0,
    marketTrend: 'stable',
    riskDistribution: { low: 0, medium: 0, high: 0 },
    topFeatures: [],
    priceAccuracy: 0,
    predictionAccuracy: 0
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [userPreferences, setUserPreferences] = useState({
    propertyType: 'all',
    budget: { min: 0, max: 2000000 },
    location: 'all',
    features: [] as string[]
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockProperties: Property[] = [
      {
        id: '1',
        address: '123 Collins Street, Melbourne VIC 3000',
        price: 850000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        propertyType: 'House',
        images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
        virtualTour: true,
        description: 'Beautiful modern house in prime Melbourne location with excellent amenities.',
        features: ['Pool', 'Garage', 'Garden', 'Modern Kitchen'],
        riskScore: 24,
        riskFactors: ['Low flood risk', 'Moderate fire risk'],
        marketSentiment: 'bullish',
        pricePrediction: {
          nextMonth: 865000,
          nextYear: 920000,
          confidence: 87
        },
        mlsData: {
          listingId: 'MLS-123456',
          status: 'active',
          daysOnMarket: 15,
          priceHistory: [
            { date: new Date('2024-01-01'), price: 820000 },
            { date: new Date('2024-01-15'), price: 850000 }
          ]
        },
        environmentalRisks: {
          flood: 15,
          fire: 35,
          earthquake: 5,
          coastal: 10
        },
        neighborhood: {
          walkScore: 85,
          transitScore: 90,
          crimeRate: 12,
          schoolRating: 8.5
        },
        matchScore: 94,
        personalizedFeatures: ['Near public transport', 'Good schools', 'Low crime rate']
      },
      {
        id: '2',
        address: '456 George Street, Sydney NSW 2000',
        price: 1200000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2200,
        propertyType: 'House',
        images: ['/placeholder.svg', '/placeholder.svg'],
        virtualTour: false,
        description: 'Spacious family home with ocean views and premium finishes.',
        features: ['Ocean View', 'Pool', 'Garage', 'Study'],
        riskScore: 45,
        riskFactors: ['Moderate flood risk', 'High fire risk'],
        marketSentiment: 'neutral',
        pricePrediction: {
          nextMonth: 1180000,
          nextYear: 1250000,
          confidence: 72
        },
        mlsData: {
          listingId: 'MLS-789012',
          status: 'active',
          daysOnMarket: 8,
          priceHistory: [
            { date: new Date('2024-01-10'), price: 1200000 }
          ]
        },
        environmentalRisks: {
          flood: 25,
          fire: 65,
          earthquake: 8,
          coastal: 45
        },
        neighborhood: {
          walkScore: 75,
          transitScore: 80,
          crimeRate: 18,
          schoolRating: 9.2
        },
        matchScore: 78,
        personalizedFeatures: ['Ocean views', 'Premium location', 'Family-friendly']
      }
    ];

    const mockIntelligence: PropertyIntelligence = {
      totalProperties: 1247,
      avgPrice: 950000,
      marketTrend: 'up',
      riskDistribution: { low: 45, medium: 35, high: 20 },
      topFeatures: [
        { feature: 'Modern Kitchen', demand: 89 },
        { feature: 'Pool', demand: 76 },
        { feature: 'Garage', demand: 82 },
        { feature: 'Garden', demand: 68 },
        { feature: 'Study', demand: 71 }
      ],
      priceAccuracy: 94.2,
      predictionAccuracy: 87.8
    };

    setProperties(mockProperties);
    setIntelligence(mockIntelligence);
  }, []);

  const getRiskColor = (score: number) => {
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBadge = (score: number) => {
    if (score <= 30) return 'bg-green-100 text-green-800';
    if (score <= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-600';
      case 'bearish': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return <TrendingUp className="h-4 w-4" />;
      case 'bearish': return <TrendingUp className="h-4 w-4 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Intelligence Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Property Intelligence
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                AI-Powered
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Satellite className="h-3 w-3" />
                Real-time Data
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{intelligence.totalProperties}</div>
              <div className="text-sm text-muted-foreground">Properties Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(intelligence.avgPrice / 1000).toFixed(0)}K</div>
              <div className="text-sm text-muted-foreground">Avg Price</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{intelligence.priceAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Price Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{intelligence.predictionAccuracy}%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="matching" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matching">Dynamic Matching</TabsTrigger>
          <TabsTrigger value="mls">MLS Integration</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="matching" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  AI-Matched Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div 
                      key={property.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedProperty(property)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{property.address}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {property.matchScore}% match
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Home className="h-3 w-3" />
                          {property.bedrooms}bed {property.bathrooms}bath
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${property.price.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          <span className={getRiskColor(property.riskScore)}>
                            {property.riskScore} risk
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-sm mb-2">
                        <div className="font-medium">Personalized Features:</div>
                        <div className="text-muted-foreground">
                          {property.personalizedFeatures.join(' • ')}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="h-3 w-3 mr-1" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            {selectedProperty && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    {selectedProperty.address}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-1">Price</div>
                        <div className="text-lg font-bold">${selectedProperty.price.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Match Score</div>
                        <div className="text-lg font-bold text-blue-600">{selectedProperty.matchScore}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Property Details</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Bedrooms: {selectedProperty.bedrooms}</div>
                        <div>Bathrooms: {selectedProperty.bathrooms}</div>
                        <div>Square Feet: {selectedProperty.squareFeet}</div>
                        <div>Type: {selectedProperty.propertyType}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Risk Assessment</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Overall Risk</span>
                          <Badge className={getRiskBadge(selectedProperty.riskScore)}>
                            {selectedProperty.riskScore}/100
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>Flood: {selectedProperty.environmentalRisks.flood}%</div>
                          <div>Fire: {selectedProperty.environmentalRisks.fire}%</div>
                          <div>Earthquake: {selectedProperty.environmentalRisks.earthquake}%</div>
                          <div>Coastal: {selectedProperty.environmentalRisks.coastal}%</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Price Prediction</div>
                      <div className="space-y-1 text-sm">
                        <div>Next Month: ${selectedProperty.pricePrediction.nextMonth.toLocaleString()}</div>
                        <div>Next Year: ${selectedProperty.pricePrediction.nextYear.toLocaleString()}</div>
                        <div>Confidence: {selectedProperty.pricePrediction.confidence}%</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Contact Agent
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mls" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* MLS Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  MLS Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{property.address}</div>
                        <Badge variant={property.mlsData.status === 'active' ? 'default' : 'secondary'}>
                          {property.mlsData.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">MLS ID</div>
                          <div className="font-medium">{property.mlsData.listingId}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Days on Market</div>
                          <div className="font-medium">{property.mlsData.daysOnMarket}</div>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-sm text-muted-foreground mb-1">Price History</div>
                        <div className="space-y-1">
                          {property.mlsData.priceHistory.map((entry, index) => (
                            <div key={index} className="flex justify-between text-xs">
                              <span>{entry.date.toLocaleDateString()}</span>
                              <span>${entry.price.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+5.2%</div>
                    <div className="text-sm text-muted-foreground">Price Growth (YoY)</div>
                  </div>
                  
                  <div>
                    <div className="text-sm font-medium mb-2">Top Features Demand</div>
                    <div className="space-y-2">
                      {intelligence.topFeatures.map((feature, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{feature.feature}</span>
                            <span>{feature.demand}%</span>
                          </div>
                          <Progress value={feature.demand} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{intelligence.riskDistribution.low}%</div>
                      <div className="text-sm text-muted-foreground">Low Risk</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600">{intelligence.riskDistribution.medium}%</div>
                      <div className="text-sm text-muted-foreground">Medium Risk</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{intelligence.riskDistribution.high}%</div>
                      <div className="text-sm text-muted-foreground">High Risk</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Low Risk (0-30)</span>
                      <span>{intelligence.riskDistribution.low}%</span>
                    </div>
                    <Progress value={intelligence.riskDistribution.low} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Medium Risk (31-60)</span>
                      <span>{intelligence.riskDistribution.medium}%</span>
                    </div>
                    <Progress value={intelligence.riskDistribution.medium} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>High Risk (61-100)</span>
                      <span>{intelligence.riskDistribution.high}%</span>
                    </div>
                    <Progress value={intelligence.riskDistribution.high} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Risks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5" />
                  Environmental Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">{property.address}</div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex justify-between">
                          <span>Flood Risk:</span>
                          <span className={getRiskColor(property.environmentalRisks.flood)}>
                            {property.environmentalRisks.flood}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fire Risk:</span>
                          <span className={getRiskColor(property.environmentalRisks.fire)}>
                            {property.environmentalRisks.fire}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Earthquake:</span>
                          <span className={getRiskColor(property.environmentalRisks.earthquake)}>
                            {property.environmentalRisks.earthquake}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Coastal:</span>
                          <span className={getRiskColor(property.environmentalRisks.coastal)}>
                            {property.environmentalRisks.coastal}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Market Sentiment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Market Sentiment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium text-sm">{property.address}</div>
                        <div className="text-xs text-muted-foreground">
                          ${property.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={getSentimentColor(property.marketSentiment)}>
                          {getSentimentIcon(property.marketSentiment)}
                        </div>
                        <Badge variant="outline" className={getSentimentColor(property.marketSentiment)}>
                          {property.marketSentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Price Predictions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Price Predictions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="p-3 border rounded">
                      <div className="font-medium text-sm mb-2">{property.address}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Current:</span>
                          <span>${property.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Month:</span>
                          <span className="text-green-600">
                            ${property.pricePrediction.nextMonth.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Year:</span>
                          <span className="text-green-600">
                            ${property.pricePrediction.nextYear.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Confidence:</span>
                          <span>{property.pricePrediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
