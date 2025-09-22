import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Home, Loader2, Building } from 'lucide-react';
import { searchProperties, fetchPropertyDetails, type PropertySuggestion } from '@/services/api/domain';
import { COLLINS_STREET_MOCK_DATA } from '@/data/mockData';

interface PropertySearchProps {
  onAnalyze: (query: string, propertyData?: any) => void;
  isLoading: boolean;
}

export const PropertySearch: React.FC<PropertySearchProps> = ({ onAnalyze, isLoading }) => {
  const [query, setQuery] = useState('123 Collins Street, Melbourne VIC');
  const [suggestions, setSuggestions] = useState<PropertySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length > 2 && !query.toLowerCase().includes('collins street')) {
        setSearching(true);
        const results = await searchProperties(query);
        setSuggestions(results);
        setSearching(false);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelectProperty = async (suggestion: PropertySuggestion) => {
    setQuery(suggestion.address);
    setShowSuggestions(false);
    
    // Fetch detailed property data
    const propertyDetails = await fetchPropertyDetails(suggestion.id);
    onAnalyze(suggestion.address, propertyDetails);
  };

  const handleAnalyze = () => {
    // For demo, use Collins Street mock data if it matches
    if (query.toLowerCase().includes('collins street')) {
      onAnalyze(query, COLLINS_STREET_MOCK_DATA);
    } else {
      onAnalyze(query);
    }
  };

  const handleDemoClick = () => {
    setQuery('123 Collins Street, Melbourne VIC 3000');
    onAnalyze('123 Collins Street, Melbourne VIC 3000', COLLINS_STREET_MOCK_DATA);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-primary" />
          <span>Property Intelligence Assistant</span>
          <Badge variant="secondary">Domain AU Powered</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any Australian property address..."
                className="pl-10 pr-10"
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              />
              {searching && (
                <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
            <Button onClick={handleAnalyze} disabled={isLoading || !query.trim()}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Home className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Property Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion.id || index}
                  onClick={() => handleSelectProperty(suggestion)}
                  className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">{suggestion.address}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {suggestion.suburb} {suggestion.state} {suggestion.postcode}
                      </div>
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {suggestion.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="p-2 bg-muted/50 text-xs text-muted-foreground text-center">
                Powered by Domain AU API
              </div>
            </div>
          )}
        </div>

        {/* Demo Section */}
        <div className="space-y-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDemoClick}
            className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
          >
            <Building className="mr-2 h-4 w-4" />
            Try Demo: 123 Collins Street
          </Button>
          
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
            <strong>Demo Property:</strong> 123 Collins Street - Prime CBD heritage commercial property with comprehensive risk assessment and $8.5M valuation
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-green-600 border-green-300">
              🌊 Flood Analysis ✓
            </Badge>
            <Badge variant="outline" className="text-orange-600 border-orange-300">
              🔥 Fire Risk ✓
            </Badge>
            <Badge variant="outline" className="text-blue-600 border-blue-300">
              🏗️ APRA Compliance ✓
            </Badge>
            <Badge variant="outline" className="text-purple-600 border-purple-300">
              🔗 Blockchain NFT ✓
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};