import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, MapPin, DollarSign, Home, Building, Star, TrendingUp,
  Filter, SlidersHorizontal, Heart, Share2, Calendar, Eye, 
  Users, Clock, Zap, Target, BarChart3, Sparkles
} from 'lucide-react';
import { sensayAPI } from '@/services/api/sensay';
import { propGuardAPI } from '@/services/api/propguard';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: 'house' | 'apartment' | 'townhouse' | 'commercial';
  location: {
    suburb: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  features: string[];
  images: string[];
  listingDate: Date;
  matchScore?: number;
  matchReasoning?: string[];
  riskScore?: number;
  investmentPotential?: number;
}

interface UserProfile {
  id: string;
  budgetRange: { min: number; max: number };
  preferredLocations: string[];
  propertyTypes: string[];
  desiredFeatures: string[];
  investmentGoals: string[];
  riskTolerance: 'low' | 'medium' | 'high';
  timeline: string;
  interactionHistory: any[];
}

interface PersonalizedSearchProps {
  className?: string;
  userProfile?: UserProfile;
}

export const PersonalizedSearchEngine: React.FC<PersonalizedSearchProps> = ({ 
  className = '',
  userProfile: initialProfile
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(initialProfile || null);
  const [searchFilters, setSearchFilters] = useState({
    priceRange: { min: 0, max: 2000000 },
    bedrooms: { min: 0, max: 10 },
    bathrooms: { min: 0, max: 10 },
    propertyType: 'all',
    location: 'all'
  });
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
  const [aiInsights, setAiInsights] = useState<any>(null);

  // Mock property data - in real implementation, this would come from PropGuard API
  const mockProperties: Property[] = [
    {
      id: '1',
      address: '123 Collins Street, Melbourne VIC 3000',
      price: 850000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1200,
      propertyType: 'house',
      location: { suburb: 'Melbourne', state: 'VIC', coordinates: { lat: -37.8136, lng: 144.9631 } },
      features: ['garage', 'garden', 'pool', 'modern_kitchen'],
      images: ['/api/placeholder/400/300'],
      listingDate: new Date('2024-01-15'),
      riskScore: 0.23,
      investmentPotential: 8.5
    },
    {
      id: '2',
      address: '456 Bourke Street, Melbourne VIC 3000',
      price: 650000,
      bedrooms: 2,
      bathrooms: 2,
      sqft: 800,
      propertyType: 'apartment',
      location: { suburb: 'Melbourne', state: 'VIC', coordinates: { lat: -37.8136, lng: 144.9631 } },
      features: ['balcony', 'gym', 'concierge', 'city_views'],
      images: ['/api/placeholder/400/300'],
      listingDate: new Date('2024-01-10'),
      riskScore: 0.15,
      investmentPotential: 7.8
    },
    {
      id: '3',
      address: '789 Chapel Street, South Yarra VIC 3141',
      price: 1200000,
      bedrooms: 4,
      bathrooms: 3,
      sqft: 1800,
      propertyType: 'house',
      location: { suburb: 'South Yarra', state: 'VIC', coordinates: { lat: -37.8381, lng: 145.0014 } },
      features: ['garage', 'garden', 'pool', 'modern_kitchen', 'study'],
      images: ['/api/placeholder/400/300'],
      listingDate: new Date('2024-01-12'),
      riskScore: 0.18,
      investmentPotential: 9.2
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setProperties(mockProperties);
    setFilteredProperties(mockProperties);
    
    // Create default user profile if none provided
    if (!userProfile) {
      setUserProfile({
        id: 'default_user',
        budgetRange: { min: 500000, max: 1000000 },
        preferredLocations: ['Melbourne', 'South Yarra', 'Richmond'],
        propertyTypes: ['house', 'apartment'],
        desiredFeatures: ['garage', 'garden', 'modern_kitchen'],
        investmentGoals: ['family_home', 'investment'],
        riskTolerance: 'medium',
        timeline: '3-6 months',
        interactionHistory: []
      });
    }
  }, []);

  const calculateMatchScore = useCallback((property: Property, profile: UserProfile): number => {
    let score = 0;
    const weights = {
      budget: 0.3,
      location: 0.25,
      features: 0.2,
      propertyType: 0.15,
      riskTolerance: 0.1
    };

    // Budget matching (30% weight)
    const budgetScore = calculateBudgetMatch(property.price, profile.budgetRange);
    score += budgetScore * weights.budget;

    // Location preference (25% weight)
    const locationScore = calculateLocationMatch(property.location.suburb, profile.preferredLocations);
    score += locationScore * weights.location;

    // Property features (20% weight)
    const featureScore = calculateFeatureMatch(property.features, profile.desiredFeatures);
    score += featureScore * weights.features;

    // Property type (15% weight)
    const typeScore = profile.propertyTypes.includes(property.propertyType) ? 1 : 0;
    score += typeScore * weights.propertyType;

    // Risk tolerance (10% weight)
    const riskScore = calculateRiskMatch(property.riskScore || 0, profile.riskTolerance);
    score += riskScore * weights.riskTolerance;

    return Math.round(score * 100);
  }, []);

  const calculateBudgetMatch = (price: number, budgetRange: { min: number; max: number }): number => {
    if (price >= budgetRange.min && price <= budgetRange.max) return 1;
    if (price < budgetRange.min) return 0.8; // Below budget is acceptable
    if (price > budgetRange.max) return Math.max(0, 1 - (price - budgetRange.max) / budgetRange.max);
    return 0.5;
  };

  const calculateLocationMatch = (propertyLocation: string, preferredLocations: string[]): number => {
    if (preferredLocations.includes(propertyLocation)) return 1;
    if (preferredLocations.some(loc => propertyLocation.includes(loc))) return 0.7;
    return 0.3; // Default score for non-preferred locations
  };

  const calculateFeatureMatch = (propertyFeatures: string[], desiredFeatures: string[]): number => {
    if (desiredFeatures.length === 0) return 0.5;
    const matches = propertyFeatures.filter(feature => desiredFeatures.includes(feature)).length;
    return matches / desiredFeatures.length;
  };

  const calculateRiskMatch = (propertyRisk: number, riskTolerance: string): number => {
    const toleranceMap = { low: 0.2, medium: 0.5, high: 0.8 };
    const tolerance = toleranceMap[riskTolerance];
    return Math.max(0, 1 - Math.abs(propertyRisk - tolerance) / tolerance);
  };

  const generateMatchReasoning = (property: Property, profile: UserProfile): string[] => {
    const reasoning: string[] = [];
    
    if (property.price >= profile.budgetRange.min && property.price <= profile.budgetRange.max) {
      reasoning.push('Within your budget range');
    }
    
    if (profile.preferredLocations.includes(property.location.suburb)) {
      reasoning.push('Located in your preferred area');
    }
    
    const matchingFeatures = property.features.filter(feature => profile.desiredFeatures.includes(feature));
    if (matchingFeatures.length > 0) {
      reasoning.push(`Has ${matchingFeatures.join(', ')}`);
    }
    
    if (profile.propertyTypes.includes(property.propertyType)) {
      reasoning.push(`Matches your preferred property type`);
    }
    
    if (property.investmentPotential && property.investmentPotential >= 8) {
      reasoning.push('High investment potential');
    }
    
    return reasoning;
  };

  const handlePersonalizedSearch = async (query: string) => {
    if (!userProfile) return;
    
    setIsSearching(true);
    
    try {
      // Use Sensay API for intelligent search processing
      const searchResponse = await sensayAPI.handlePropertySearch(query, userProfile);
      
      // Calculate personalized scores for all properties
      const scoredProperties = properties.map(property => ({
        ...property,
        matchScore: calculateMatchScore(property, userProfile),
        matchReasoning: generateMatchReasoning(property, userProfile)
      }));
      
      // Sort by match score
      const sortedProperties = scoredProperties.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      setFilteredProperties(sortedProperties);
      
      // Generate AI insights using Sensay
      const insights = await sensayAPI.getMarketInsights(userProfile.preferredLocations[0], userProfile.propertyTypes[0]);
      setAiInsights(insights);
      
    } catch (error) {
      console.error('Personalized search failed:', error);
      // Fallback to basic search
      const basicResults = properties.filter(property => 
        property.address.toLowerCase().includes(query.toLowerCase()) ||
        property.location.suburb.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProperties(basicResults);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    let filtered = properties;
    
    // Apply price filter
    filtered = filtered.filter(property => 
      property.price >= searchFilters.priceRange.min && 
      property.price <= searchFilters.priceRange.max
    );
    
    // Apply bedroom filter
    filtered = filtered.filter(property => 
      property.bedrooms >= searchFilters.bedrooms.min && 
      property.bedrooms <= searchFilters.bedrooms.max
    );
    
    // Apply bathroom filter
    filtered = filtered.filter(property => 
      property.bathrooms >= searchFilters.bathrooms.min && 
      property.bathrooms <= searchFilters.bathrooms.max
    );
    
    // Apply property type filter
    if (searchFilters.propertyType !== 'all') {
      filtered = filtered.filter(property => property.propertyType === searchFilters.propertyType);
    }
    
    // Apply location filter
    if (searchFilters.location !== 'all') {
      filtered = filtered.filter(property => property.location.suburb === searchFilters.location);
    }
    
    setFilteredProperties(filtered);
  };

  const PropertyCard: React.FC<{ property: Property }> = ({ property }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{property.address}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {property.location.suburb}, {property.location.state}
            </div>
          </div>
          {personalizationEnabled && property.matchScore && (
            <div className="text-right">
              <div className="text-sm font-medium text-primary">{property.matchScore}%</div>
              <div className="text-xs text-muted-foreground">Match</div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Property Image */}
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <Home className="h-12 w-12 text-muted-foreground" />
        </div>
        
        {/* Price and Basic Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ${property.price.toLocaleString()}
            </div>
            <Badge variant="outline">{property.propertyType}</Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center gap-1">
              <Building className="h-3 w-3" />
              {property.bathrooms} bath
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {property.sqft} sqft
            </div>
          </div>
        </div>
        
        {/* Match Reasoning */}
        {personalizationEnabled && property.matchReasoning && property.matchReasoning.length > 0 && (
          <div className="space-y-1">
            <div className="text-sm font-medium text-green-600">Why this matches:</div>
            <div className="space-y-1">
              {property.matchReasoning.map((reason, index) => (
                <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                  {reason}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Risk and Investment Scores */}
        <div className="grid grid-cols-2 gap-2">
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-sm font-medium">Risk Score</div>
            <div className="text-lg font-bold text-blue-600">
              {Math.round((property.riskScore || 0) * 100)}%
            </div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="text-sm font-medium">Investment</div>
            <div className="text-lg font-bold text-green-600">
              {property.investmentPotential || 0}/10
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Features:</div>
          <div className="flex flex-wrap gap-1">
            {property.features.map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Calendar className="h-3 w-3 mr-1" />
            Schedule Tour
          </Button>
          <Button size="sm" variant="outline">
            <Heart className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="outline">
            <Share2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Personalized Property Search</h1>
          <Badge variant="secondary" className="text-sm">
            AI Powered
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Find properties that match your preferences with AI-driven recommendations 
          powered by Sensay's Wisdom Engine and PropGuard's risk assessment.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Smart Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Input */}
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by location, features, or describe your ideal property..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handlePersonalizedSearch(searchQuery);
                }
              }}
            />
            <Button 
              onClick={() => handlePersonalizedSearch(searchQuery)}
              disabled={isSearching}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {/* Personalization Toggle */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="personalization"
              checked={personalizationEnabled}
              onChange={(e) => setPersonalizationEnabled(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="personalization" className="text-sm">
              Enable AI-powered personalization
            </label>
          </div>
          
          {/* Quick Filters */}
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Min Price</label>
                  <Input
                    type="number"
                    value={searchFilters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...searchFilters.priceRange,
                      min: parseInt(e.target.value) || 0
                    })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Price</label>
                  <Input
                    type="number"
                    value={searchFilters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', {
                      ...searchFilters.priceRange,
                      max: parseInt(e.target.value) || 2000000
                    })}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Suburb</label>
                  <select
                    value={searchFilters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="all">All Locations</option>
                    <option value="Melbourne">Melbourne</option>
                    <option value="South Yarra">South Yarra</option>
                    <option value="Richmond">Richmond</option>
                  </select>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Bedrooms</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={searchFilters.bedrooms.min}
                      onChange={(e) => handleFilterChange('bedrooms', {
                        ...searchFilters.bedrooms,
                        min: parseInt(e.target.value) || 0
                      })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={searchFilters.bedrooms.max}
                      onChange={(e) => handleFilterChange('bedrooms', {
                        ...searchFilters.bedrooms,
                        max: parseInt(e.target.value) || 10
                      })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Bathrooms</label>
                  <div className="flex gap-1">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={searchFilters.bathrooms.min}
                      onChange={(e) => handleFilterChange('bathrooms', {
                        ...searchFilters.bathrooms,
                        min: parseInt(e.target.value) || 0
                      })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={searchFilters.bathrooms.max}
                      onChange={(e) => handleFilterChange('bathrooms', {
                        ...searchFilters.bathrooms,
                        max: parseInt(e.target.value) || 10
                      })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="type" className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Property Type</label>
                  <select
                    value={searchFilters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="all">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <Button onClick={applyFilters} className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Apply Filters
          </Button>
        </CardContent>
      </Card>

      {/* AI Insights */}
      {aiInsights && (
        <Alert className="border-blue-200 bg-blue-50">
          <Sparkles className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <div className="space-y-1">
              <p className="font-medium">AI Market Insights:</p>
              <p className="text-sm">{aiInsights.response}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {filteredProperties.length} Properties Found
            {personalizationEnabled && ' (Personalized)'}
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Target className="h-3 w-3 mr-1" />
              AI Matched
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>

      {/* User Profile Summary */}
      {userProfile && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Your Search Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium">Budget Range</h4>
                <div className="text-sm text-muted-foreground">
                  ${userProfile.budgetRange.min.toLocaleString()} - ${userProfile.budgetRange.max.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Preferred Locations</h4>
                <div className="flex flex-wrap gap-1">
                  {userProfile.preferredLocations.map((location, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Property Types</h4>
                <div className="flex flex-wrap gap-1">
                  {userProfile.propertyTypes.map((type, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
