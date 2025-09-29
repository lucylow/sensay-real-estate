import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Square, 
  DollarSign,
  Filter,
  SortAsc,
  Eye,
  Heart,
  Share2
} from 'lucide-react';
import PropertyMap from '@/components/PropertyMap';

interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: number;
  propertyType: string;
  image: string;
  description: string;
  riskScore: number;
  climateRisk: string;
}

const mockProperties: Property[] = [
  {
    id: '1',
    address: '123 Main Street, Sydney NSW 2000',
    price: 1250000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    landSize: 450,
    propertyType: 'House',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
    description: 'Beautiful family home with modern amenities and excellent location.',
    riskScore: 72,
    climateRisk: 'Low'
  },
  {
    id: '2',
    address: '456 Collins Street, Melbourne VIC 3000',
    price: 950000,
    bedrooms: 2,
    bathrooms: 2,
    parking: 0,
    landSize: 0,
    propertyType: 'Apartment',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
    description: 'Modern apartment in the heart of Melbourne with stunning city views.',
    riskScore: 85,
    climateRisk: 'Medium'
  },
  {
    id: '3',
    address: '789 Queen Street, Brisbane QLD 4000',
    price: 850000,
    bedrooms: 4,
    bathrooms: 3,
    parking: 2,
    landSize: 600,
    propertyType: 'House',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
    description: 'Spacious family home with large backyard and swimming pool.',
    riskScore: 68,
    climateRisk: 'Medium'
  },
  {
    id: '4',
    address: '321 Adelaide Terrace, Perth WA 6000',
    price: 750000,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    landSize: 400,
    propertyType: 'House',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
    description: 'Charming character home with original features and modern updates.',
    riskScore: 78,
    climateRisk: 'Low'
  }
];

export const PropertySearchPageSimple: React.FC = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');
  const [results, setResults] = useState<Property[]>(mockProperties);
  const [isLoading, setIsLoading] = useState(false);

  const showCollinsDemo = searchLocation.trim().toLowerCase().includes('123 collins');

  const handleSearch = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResults(mockProperties);
      setIsLoading(false);
    }, 1000);
  };

  const handlePropertyClick = (propertyId: string) => {
    navigate(`/property/${propertyId}`);
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getClimateRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Property Search</h1>
              <p className="text-gray-600">Find your perfect property with AI-powered insights</p>
            </div>
          </div>
        </div>

        {/* Search Filters */}
        <Card className="mb-8 shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Search className="h-5 w-5 text-blue-600" />
              Search Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter suburb, city, or address"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Type
                </label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any type</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="unit">Unit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Any price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any price</SelectItem>
                    <SelectItem value="0-500k">Under $500k</SelectItem>
                    <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                    <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                    <SelectItem value="2m+">Over $2M</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bedrooms
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button 
                onClick={handleSearch} 
                disabled={isLoading} 
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              >
                <Search className="h-4 w-4" />
                {isLoading ? 'Searching...' : 'Search Properties'}
              </Button>
              <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:border-blue-500 hover:text-blue-600">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
              <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:border-blue-500 hover:text-blue-600">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Map: show instantly when typing 123 Collins Street */}
        {showCollinsDemo && (
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <MapPin className="h-5 w-5 text-green-600" />
                123 Collins Street, Melbourne VIC
                <Badge className="ml-auto bg-green-100 text-green-800">Live Demo</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <PropertyMap
                property={{
                  address: '123 Collins Street, Melbourne VIC',
                  coordinates: { lat: -37.8136, lng: 144.9631 },
                  riskData: { flood: 72, fire: 45, coastal: 30 }
                }}
                riskData={{ flood: 72, fire: 45, coastalErosion: 30, subsidence: 10 }}
                activeLayers={{ flood: true, fire: true, erosion: true }}
              />
            </CardContent>
          </Card>
        )}

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">Search Results</h2>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {results.length} properties found
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:text-blue-600">
              List View
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 hover:border-blue-500 hover:text-blue-600">
              Map View
            </Button>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((property) => (
            <Card key={property.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={property.image}
                  alt={property.address}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className={`${getRiskColor(property.riskScore)} font-medium shadow-sm`}>
                    Risk: {property.riskScore}/100
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge className={`${getClimateRiskColor(property.climateRisk)} font-medium shadow-sm`}>
                    {property.climateRisk} Risk
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-gray-700">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="bg-white/90 hover:bg-white text-gray-700">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2">
                    {property.address}
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 mb-3">
                    ${property.price.toLocaleString()}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="h-4 w-4" />
                    {property.parking}
                  </div>
                  {property.landSize > 0 && (
                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      {property.landSize}m²
                    </div>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {property.description}
                </p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg" 
                  onClick={() => handlePropertyClick(property.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
