import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Home, 
  MapPin, 
  DollarSign, 
  Bed, 
  Bath, 
  Square, 
  Calendar,
  TrendingUp,
  Shield,
  Star,
  Filter,
  Search,
  Eye,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  Navigation,
  Clock,
  Users,
  Zap,
  Target,
  BarChart3,
  X
} from 'lucide-react';

interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse';
  status: 'for-sale' | 'pending' | 'sold';
  images: string[];
  features: string[];
  description: string;
  riskScore: number;
  valuation: number;
  marketTrend: 'up' | 'down' | 'stable';
  daysOnMarket: number;
  virtualTourUrl?: string;
  agent: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
  };
  matchScore?: number;
  investmentScore?: number;
}

interface SearchFilters {
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  location: string;
  features: string[];
}

interface MarketInsight {
  averagePrice: number;
  pricePerSqFt: number;
  marketTrend: string;
  inventory: number;
  daysOnMarket: number;
  appreciationRate: number;
}

export const PropertyShowcase: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    minPrice: 0,
    maxPrice: 5000000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: '',
    location: '',
    features: []
  });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [marketInsights, setMarketInsights] = useState<MarketInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'price' | 'match' | 'newest' | 'investment'>('match');

  useEffect(() => {
    loadSampleProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, filters, sortBy]);

  const loadSampleProperties = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleProperties: Property[] = [
      {
        id: '1',
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        price: 1250000,
        bedrooms: 3,
        bathrooms: 2,
        squareFeet: 1800,
        lotSize: 5000,
        yearBuilt: 2015,
        propertyType: 'house',
        status: 'for-sale',
        images: ['/properties/prop1-1.jpg', '/properties/prop1-2.jpg'],
        features: ['Ocean View', 'Modern Kitchen', 'Hardwood Floors', 'Garden'],
        description: 'Beautiful modern home with stunning ocean views and updated amenities.',
        riskScore: 0.3,
        valuation: 1200000,
        marketTrend: 'up',
        daysOnMarket: 15,
        virtualTourUrl: 'https://example.com/tour/1',
        agent: {
          name: 'Sarah Johnson',
          phone: '(555) 123-4567',
          email: 'sarah@realty.com',
          avatar: '/agents/sarah.jpg'
        },
        matchScore: 95,
        investmentScore: 85
      },
      {
        id: '2',
        address: '456 Oak Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94103',
        price: 950000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        lotSize: 3000,
        yearBuilt: 2010,
        propertyType: 'condo',
        status: 'for-sale',
        images: ['/properties/prop2-1.jpg', '/properties/prop2-2.jpg'],
        features: ['City View', 'Rooftop Deck', 'Gym Access', 'Concierge'],
        description: 'Luxury condo in the heart of the city with premium amenities.',
        riskScore: 0.4,
        valuation: 920000,
        marketTrend: 'stable',
        daysOnMarket: 8,
        virtualTourUrl: 'https://example.com/tour/2',
        agent: {
          name: 'Michael Chen',
          phone: '(555) 987-6543',
          email: 'michael@realty.com',
          avatar: '/agents/michael.jpg'
        },
        matchScore: 88,
        investmentScore: 78
      },
      {
        id: '3',
        address: '789 Pine Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94104',
        price: 1800000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2500,
        lotSize: 8000,
        yearBuilt: 2018,
        propertyType: 'house',
        status: 'for-sale',
        images: ['/properties/prop3-1.jpg', '/properties/prop3-2.jpg'],
        features: ['Mountain View', 'Swimming Pool', 'Wine Cellar', 'Smart Home'],
        description: 'Stunning contemporary home with mountain views and luxury finishes.',
        riskScore: 0.2,
        valuation: 1750000,
        marketTrend: 'up',
        daysOnMarket: 22,
        virtualTourUrl: 'https://example.com/tour/3',
        agent: {
          name: 'Emily Rodriguez',
          phone: '(555) 456-7890',
          email: 'emily@realty.com',
          avatar: '/agents/emily.jpg'
        },
        matchScore: 92,
        investmentScore: 88
      }
    ];

    setProperties(sampleProperties);
    setIsLoading(false);
  };

  const applyFilters = () => {
    let filtered = [...properties];

    // Apply filters
    filtered = filtered.filter(property => {
      if (filters.minPrice && property.price < filters.minPrice) return false;
      if (filters.maxPrice && property.price > filters.maxPrice) return false;
      if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
      if (filters.bathrooms && property.bathrooms < filters.bathrooms) return false;
      if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
      if (filters.location && !property.city.toLowerCase().includes(filters.location.toLowerCase())) return false;
      
      return true;
    });

    // Sort properties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'match':
          return (b.matchScore || 0) - (a.matchScore || 0);
        case 'newest':
          return b.daysOnMarket - a.daysOnMarket;
        case 'investment':
          return (b.investmentScore || 0) - (a.investmentScore || 0);
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    // Load market insights for the property's area
    loadMarketInsights(property.city);
  };

  const loadMarketInsights = async (location: string) => {
    // Simulate market data loading
    const insights: MarketInsight = {
      averagePrice: 1350000,
      pricePerSqFt: 750,
      marketTrend: 'up',
      inventory: 45,
      daysOnMarket: 18,
      appreciationRate: 8.5
    };
    setMarketInsights(insights);
  };

  const getRiskColor = (riskScore: number) => {
    if (riskScore < 0.3) return 'text-green-600';
    if (riskScore < 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLabel = (riskScore: number) => {
    if (riskScore < 0.3) return 'Low Risk';
    if (riskScore < 0.6) return 'Medium Risk';
    return 'High Risk';
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Home className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Property Showcase</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered Matching
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Smart Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="space-y-2">
                  <Slider
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }))}
                    max={5000000}
                    min={0}
                    step={50000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${(filters.minPrice / 1000).toFixed(0)}K</span>
                    <span>${(filters.maxPrice / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select value={filters.bedrooms.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, bedrooms: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Select value={filters.bathrooms.toString()} onValueChange={(value) => setFilters(prev => ({ ...prev, bathrooms: parseInt(value) }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={filters.propertyType} onValueChange={(value) => setFilters(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Type</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  placeholder="City, neighborhood..."
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>

              <Button className="w-full" onClick={() => setFilters({
                minPrice: 0,
                maxPrice: 5000000,
                bedrooms: 0,
                bathrooms: 0,
                propertyType: '',
                location: '',
                features: []
              })}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Properties List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">
                {filteredProperties.length} Properties Found
              </h2>
              <Badge variant="outline">
                <Target className="h-3 w-3 mr-1" />
                AI Matched
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handlePropertySelect(property)}>
                  <div className="relative">
                    <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                      <Home className="h-12 w-12 text-muted-foreground" />
                    </div>
                    
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {property.matchScore}% Match
                      </Badge>
                      <Badge variant={property.status === 'for-sale' ? 'default' : 'secondary'}>
                        {property.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{formatPrice(property.price)}</h3>
                        <div className={`text-sm font-medium ${getRiskColor(property.riskScore)}`}>
                          {getRiskLabel(property.riskScore)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{property.address}, {property.city}</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Bed className="h-4 w-4" />
                          <span>{property.bedrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.bathrooms}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          <span>{property.squareFeet.toLocaleString()} sqft</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {property.marketTrend === 'up' ? '+' : property.marketTrend === 'down' ? '-' : '='}
                        </Badge>
                        <span className="text-muted-foreground">
                          {property.daysOnMarket} days on market
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Property Details</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedProperty(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="space-y-6">
                {/* Property Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <Home className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">{formatPrice(selectedProperty.price)}</h2>
                    <p className="text-muted-foreground">{selectedProperty.address}, {selectedProperty.city}</p>
                    
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{selectedProperty.bedrooms} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{selectedProperty.bathrooms} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Square className="h-4 w-4" />
                        <span>{selectedProperty.squareFeet.toLocaleString()} sqft</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Market Insights */}
                {marketInsights && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Market Insights - {selectedProperty.city}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold">${(marketInsights.averagePrice / 1000000).toFixed(1)}M</div>
                          <div className="text-sm text-muted-foreground">Avg Price</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">${marketInsights.pricePerSqFt}</div>
                          <div className="text-sm text-muted-foreground">Per Sq Ft</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">+{marketInsights.appreciationRate}%</div>
                          <div className="text-sm text-muted-foreground">Appreciation</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold">{marketInsights.daysOnMarket}</div>
                          <div className="text-sm text-muted-foreground">Avg Days</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">{feature}</Badge>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedProperty.description}</p>
                </div>

                {/* Agent Contact */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Agent Contact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{selectedProperty.agent.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedProperty.agent.email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </Button>
                  {selectedProperty.virtualTourUrl && (
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Virtual Tour
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PropertyShowcase;