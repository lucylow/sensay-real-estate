import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Home, 
  Bath, 
  Car, 
  Square, 
  MapPin, 
  FileText, 
  Shield, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Heart,
  Share2,
  Download,
  Calendar,
  Users,
  MessageCircle
} from 'lucide-react';

interface PropertyDetails {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  landSize: number;
  buildingSize: number;
  propertyType: string;
  yearBuilt: number;
  description: string;
  images: string[];
  features: string[];
  riskScore: number;
  climateRisk: string;
  marketTrends: {
    priceChange: number;
    priceChangePercent: number;
    daysOnMarket: number;
    comparableSales: number;
  };
  compliance: {
    status: 'APPROVED' | 'REVIEW' | 'REJECTED';
    lvr: number;
    dti: number;
    apraCompliance: boolean;
  };
  location: {
    suburb: string;
    state: string;
    postcode: string;
    coordinates: [number, number];
  };
}

const mockProperty: PropertyDetails = {
  id: '1',
  address: '123 Main Street, Sydney NSW 2000',
  price: 1250000,
  bedrooms: 3,
  bathrooms: 2,
  parking: 1,
  landSize: 450,
  buildingSize: 180,
  propertyType: 'House',
  yearBuilt: 2018,
  description: 'This stunning family home offers modern living with excellent location and amenities. Featuring open-plan design, premium finishes, and a beautiful outdoor entertaining area. Perfect for growing families seeking comfort and convenience.',
  images: [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
  ],
  features: [
    'Open plan living',
    'Modern kitchen with stone benchtops',
    'Master bedroom with ensuite',
    'Air conditioning throughout',
    'Secure garage',
    'Outdoor entertaining area',
    'Low maintenance garden',
    'Close to transport'
  ],
  riskScore: 72,
  climateRisk: 'Low',
  marketTrends: {
    priceChange: 25000,
    priceChangePercent: 2.04,
    daysOnMarket: 28,
    comparableSales: 12
  },
  compliance: {
    status: 'APPROVED',
    lvr: 70,
    dti: 30,
    apraCompliance: true
  },
  location: {
    suburb: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    coordinates: [-33.8688, 151.2093]
  }
};

export const PropertyDetailPageSimple: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperty(mockProperty);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-600 mb-4">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100';
      case 'REVIEW': return 'text-yellow-600 bg-yellow-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate('/search')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Search
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{property.address}</h1>
            <p className="text-gray-600">{property.propertyType} • Built {property.yearBuilt}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Report
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={property.images[selectedImage]}
                    alt={property.address}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getRiskColor(property.riskScore)} font-medium`}>
                      Risk Score: {property.riskScore}/100
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={`${getComplianceColor(property.compliance.status)} font-medium`}>
                      {property.compliance.status}
                    </Badge>
                  </div>
                </div>
                
                {/* Image Thumbnails */}
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt={`${property.address} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <Home className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Bedrooms</div>
                  </div>
                  <div className="text-center">
                    <Bath className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Bathrooms</div>
                  </div>
                  <div className="text-center">
                    <Car className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.parking}</div>
                    <div className="text-sm text-gray-600">Parking</div>
                  </div>
                  <div className="text-center">
                    <Square className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{property.landSize}</div>
                    <div className="text-sm text-gray-600">m² Land</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{property.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {property.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price and Actions */}
            <Card>
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ${property.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>+{property.marketTrends.priceChangePercent}% from last month</span>
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Viewing
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Download Brochure
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Market Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Market Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Days on Market</span>
                    <span className="font-semibold">{property.marketTrends.daysOnMarket}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Comparable Sales</span>
                    <span className="font-semibold">{property.marketTrends.comparableSales}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Price Change</span>
                    <span className="font-semibold text-green-600">
                      +${property.marketTrends.priceChange.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Risk</span>
                      <span className="text-sm font-bold">{property.riskScore}/100</span>
                    </div>
                    <Progress value={property.riskScore} className="mb-2" />
                    <div className="text-xs text-gray-500">
                      {property.riskScore >= 70 ? 'Low Risk' : 
                       property.riskScore >= 50 ? 'Medium Risk' : 'High Risk'}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Climate Risk</span>
                    <Badge className={`${property.climateRisk === 'Low' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {property.climateRisk}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">APRA Compliance</span>
                    <Badge className={property.compliance.apraCompliance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {property.compliance.apraCompliance ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">LVR</span>
                    <span className="font-semibold">{property.compliance.lvr}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">DTI</span>
                    <span className="font-semibold">{property.compliance.dti}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">{property.location.suburb}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {property.location.state} {property.location.postcode}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
