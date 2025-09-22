import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, MapPin, Bed, Bath, Car, Square, DollarSign } from 'lucide-react';
import { realtyBaseAPI, PropertySearchParams, PropertyDetails } from '@/services/api/realtybase';
import { useToast } from '@/hooks/use-toast';

export const PropertySearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useState<PropertySearchParams>({
    location: '',
    property_type: 'for-sale',
    limit: 20
  });
  const [results, setResults] = useState<PropertyDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchParams.location.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for properties.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const properties = await realtyBaseAPI.searchProperties(searchParams);
      setResults(properties);
      setHasSearched(true);
      toast({
        title: "Search Complete",
        description: `Found ${properties.length} properties in ${searchParams.location}`,
      });
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "Unable to search properties. Please try again.",
        variant: "destructive",
      });
      console.error('Search error:', error);
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

  const getRiskColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Property Search
          </h1>
          <p className="text-muted-foreground">
            Search Australian properties with AI-powered analysis and risk assessment
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Properties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium mb-2">Location</label>
                <Input
                  placeholder="e.g., Sydney, Melbourne, Brisbane"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, location: e.target.value }))}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select 
                  value={searchParams.property_type} 
                  onValueChange={(value: any) => setSearchParams(prev => ({ ...prev, property_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="for-sale">For Sale</SelectItem>
                    <SelectItem value="for-rent">For Rent</SelectItem>
                    <SelectItem value="sold">Recently Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Category</label>
                <Select 
                  value={searchParams.property_category || ''} 
                  onValueChange={(value: any) => setSearchParams(prev => ({ ...prev, property_category: value || undefined }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Min Price</label>
                <Input
                  type="number"
                  placeholder="500000"
                  value={searchParams.min_price || ''}
                  onChange={(e) => setSearchParams(prev => ({ 
                    ...prev, 
                    min_price: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Max Price</label>
                <Input
                  type="number"
                  placeholder="2000000"
                  value={searchParams.max_price || ''}
                  onChange={(e) => setSearchParams(prev => ({ 
                    ...prev, 
                    max_price: e.target.value ? parseInt(e.target.value) : undefined 
                  }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <Select 
                  value={searchParams.bedrooms?.toString() || ''} 
                  onValueChange={(value) => setSearchParams(prev => ({ 
                    ...prev, 
                    bedrooms: value ? parseInt(value) : undefined 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Bathrooms</label>
                <Select 
                  value={searchParams.bathrooms?.toString() || ''} 
                  onValueChange={(value) => setSearchParams(prev => ({ 
                    ...prev, 
                    bathrooms: value ? parseInt(value) : undefined 
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Searching...' : 'Search Properties'}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <Skeleton className="h-48 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <Skeleton className="h-6 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hasSearched && !isLoading && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {results.length} Properties Found
              </h2>
              <div className="text-sm text-muted-foreground">
                in {searchParams.location}
              </div>
            </div>

            {results.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Properties Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or searching a different location.
                  </p>
                  <Button variant="outline" onClick={() => {
                    setSearchParams({ location: '', property_type: 'for-sale', limit: 20 });
                    setResults([]);
                    setHasSearched(false);
                  }}>
                    Reset Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((property) => (
                  <Card 
                    key={property.listing_id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/property/${property.listing_id}`)}
                  >
                    <CardContent className="p-4">
                      {/* Property Image */}
                      <div className="aspect-video mb-4 bg-muted rounded-lg overflow-hidden">
                        {property.photos && property.photos.length > 0 ? (
                          <img 
                            src={property.photos[0]} 
                            alt={property.address}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Property Details */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-medium text-foreground line-clamp-1">
                            {property.address}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {property.suburb}, {property.state} {property.postcode}
                          </p>
                        </div>

                        {/* Property Features */}
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          {property.bedrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bed className="h-4 w-4" />
                              {property.bedrooms}
                            </div>
                          )}
                          {property.bathrooms > 0 && (
                            <div className="flex items-center gap-1">
                              <Bath className="h-4 w-4" />
                              {property.bathrooms}
                            </div>
                          )}
                          {property.car_spaces > 0 && (
                            <div className="flex items-center gap-1">
                              <Car className="h-4 w-4" />
                              {property.car_spaces}
                            </div>
                          )}
                          {property.land_size > 0 && (
                            <div className="flex items-center gap-1">
                              <Square className="h-4 w-4" />
                              {property.land_size}m²
                            </div>
                          )}
                        </div>

                        {/* AI Analysis Badges */}
                        <div className="flex gap-2 flex-wrap">
                          {property.propguard_risk?.risk_grade && (
                            <Badge variant="secondary" className={getRiskColor(property.propguard_risk.risk_grade)}>
                              {property.propguard_risk.risk_grade} Risk
                            </Badge>
                          )}
                          {property.propguard_valuation?.confidence_score && (
                            <Badge variant="outline">
                              {Math.round(property.propguard_valuation.confidence_score * 100)}% Confidence
                            </Badge>
                          )}
                          {property.propguard_market_sentiment?.trend && (
                            <Badge variant={
                              property.propguard_market_sentiment.trend === 'bullish' ? 'default' :
                              property.propguard_market_sentiment.trend === 'bearish' ? 'destructive' : 'secondary'
                            }>
                              {property.propguard_market_sentiment.trend}
                            </Badge>
                          )}
                        </div>

                        {/* Price */}
                        <div className="flex justify-between items-center pt-2">
                          <div className="flex items-center gap-1 text-lg font-semibold text-foreground">
                            <DollarSign className="h-4 w-4" />
                            {formatPrice(property.price)}
                          </div>
                          {property.propguard_valuation?.ai_valuation && (
                            <div className="text-sm text-muted-foreground">
                              AI: {formatPrice(property.propguard_valuation.ai_valuation)}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};