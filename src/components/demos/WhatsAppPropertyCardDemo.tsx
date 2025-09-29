import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Calendar, 
  Star, 
  MapPin, 
  Bed, 
  Bath, 
  Car,
  Heart,
  Share2,
  Download,
  Phone,
  Video
} from 'lucide-react';

interface PropertyCard {
  id: string;
  image: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  propguardScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  features: string[];
  agent: {
    name: string;
    phone: string;
    photo: string;
  };
}

export const WhatsAppPropertyCardDemo: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<'message' | 'cards' | 'booking'>('message');
  const [selectedProperty, setSelectedProperty] = useState<PropertyCard | null>(null);

  const mockProperties: PropertyCard[] = [
    {
      id: '1',
      image: '/placeholder.svg',
      address: '123 Oak Street, Austin, TX',
      price: 485000,
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      propguardScore: 8.7,
      riskLevel: 'low',
      features: ['Swimming Pool', 'Garden', 'Modern Kitchen', 'Hardwood Floors'],
      agent: {
        name: 'Sarah Johnson',
        phone: '+1-555-0123',
        photo: '/placeholder.svg'
      }
    },
    {
      id: '2',
      image: '/placeholder.svg',
      address: '456 Maple Ave, Austin, TX',
      price: 420000,
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      propguardScore: 7.9,
      riskLevel: 'medium',
      features: ['Balcony', 'Gym Access', 'Pet Friendly', 'Central AC'],
      agent: {
        name: 'Michael Chen',
        phone: '+1-555-0456',
        photo: '/placeholder.svg'
      }
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderWhatsAppMessage = () => (
    <div className="space-y-4">
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <MessageCircle className="h-5 w-5" />
            WhatsApp Conversation Demo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
                Find 2-bedroom apartments in Austin under $500k
              </div>
            </div>
            
            {/* Bot Response */}
            <div className="flex justify-start">
              <div className="bg-white border p-3 rounded-lg max-w-xs">
                Great! I found 3 listings matching your criteria. Want me to share details or schedule a viewing?
              </div>
            </div>

            {/* User Response */}
            <div className="flex justify-end">
              <div className="bg-green-500 text-white p-3 rounded-lg max-w-xs">
                Show details
              </div>
            </div>

            {/* Rich Property Card Response */}
            <div className="flex justify-start">
              <div className="max-w-sm">
                <Card className="shadow-lg">
                  <div className="relative">
                    <img 
                      src={selectedProperty?.image || mockProperties[0].image} 
                      alt="Property" 
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-2 left-2 bg-primary">New Listing</Badge>
                    <Button size="sm" className="absolute top-2 right-2 p-1 h-6 w-6">
                      <Heart className="h-3 w-3" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Property Info */}
                      <div>
                        <h3 className="font-semibold text-sm">{selectedProperty?.address || mockProperties[0].address}</h3>
                        <div className="text-lg font-bold text-green-600">
                          ${(selectedProperty?.price || mockProperties[0].price).toLocaleString()}
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex items-center gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Bed className="h-3 w-3" />
                          {selectedProperty?.bedrooms || mockProperties[0].bedrooms} bed
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="h-3 w-3" />
                          {selectedProperty?.bathrooms || mockProperties[0].bathrooms} bath
                        </div>
                        <div className="flex items-center gap-1">
                          <Car className="h-3 w-3" />
                          {selectedProperty?.parking || mockProperties[0].parking} parking
                        </div>
                      </div>

                      {/* PropGuard Score */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>PropGuard Score</span>
                          <span className="font-medium">{selectedProperty?.propguardScore || mockProperties[0].propguardScore}/10</span>
                        </div>
                        <Progress value={(selectedProperty?.propguardScore || mockProperties[0].propguardScore) * 10} className="h-2" />
                      </div>

                      {/* Risk Assessment */}
                      <Badge className={getRiskColor(selectedProperty?.riskLevel || mockProperties[0].riskLevel)}>
                        {selectedProperty?.riskLevel || mockProperties[0].riskLevel} Risk
                      </Badge>

                      {/* Agent Info */}
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <img 
                          src={selectedProperty?.agent.photo || mockProperties[0].agent.photo} 
                          alt="agents" 
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="text-xs font-medium">Agent: {selectedProperty?.agent.name ||
mockProperties[0].agent.name}</div>
                          <div className="text-xs text-gray-500">{selectedProperty?.agent.phone || mockProperties[0].agent.phone}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex justify-start gap-2 flex-wrap">
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Schedule Viewing
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Video className="h-3 w-3" />
                Virtual Tour
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                Call Agent
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPropertyCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mockProperties.map((property) => (
        <Card 
          key={property.id} 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedProperty?.id === property.id ? 'ring-2 ring-green-500' : ''
          }`}
          onClick={() => setSelectedProperty(property)}
        >
          <div className="relative">
            <img 
              src={property.image} 
              alt="Property" 
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <Badge className="absolute top-2 left-2 bg-primary">Active</Badge>
            <Button size="sm" className="absolute top-2 right-2 p-1 h-6 w-6">
              <Heart className="h-3 w-3" />
            </Button>
          </div>
          <CardContent className="p-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">{property.address}</h4>
              <div className="text-lg font-bold text-green-600">
                ${property.price.toLocaleString()}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <span>{property.bedrooms} bed</span>
                <span>{property.bathrooms} bath</span>
                <span>{property.parking} parking</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getRiskColor(property.riskLevel)}>
                  {property.riskLevel} Risk
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs">{property.propguardScore}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderBookingDemo = () => (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CardIcon className="h-5 w-5 text-blue-500" />
            Automated Booking Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Conversation Flow */}
            <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg text-sm max-w-xs">
                  I want to schedule a viewing for the Oak Street property
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white border p-2 rounded-lg text-sm max-w-xs">
                  Perfect! Let me check availability for 123 Oak Street.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white border p-2 rounded-lg text-sm max-w-xs">
                  📅 Available times:<br/>
                  • Tomorrow 2:00 PM<br/>
                  • Friday 10:00 AM<br/>
                  • Saturday 3:00 PM<br/>
                  Which works for you?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-2 rounded-lg text-sm max-w-xs">
                  Tomorrow 2:00 PM works
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-green-500 text-white p-2 rounded-lg text-sm max-w-xs">
                  ✅ Confirmed! Agent Sarah Johnson will contact you shortly. 
                  Virtual tour link sent to your WhatsApp.
                </div>
              </div>
            </div>

            {/* Booking Success */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Booking Confirmed</h4>
              <div className="space-y-1 text-sm text-green-700">
                <div>📅 When: Tomorrow, 2:00 PM - 3:00 PM</div>
                <div>📍 Where: 123 Oak Street, Austin, TX</div>
                <div>👤 Agent: Sarah Johnson (+1-555-0123)</div>
                <div>💬 WhatsApp: Confirmation sent</div>
                <div>📱 Video Tour: Link sent to WhatsApp</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">WhatsApp Property Cards Demo</h2>
        <p className="text-gray-600">Interactive property showcases with rich media and quick actions</p>
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant={activeDemo === 'message' ? 'default' : 'outline'}
          onClick={() => setActiveDemo('message')}
        >
          Conversation Flow
        </Button>
        <Button
          variant={activeDemo === 'cards' ? 'default' : 'outline'}
          onClick={() => setActiveDemo('cards')}
        >
          Property Cards
        </Button>
        <Button
          variant={activeDemo === 'booking' ? 'default' : 'outline'}
          onClick={() => setActiveDemo('booking')}
        >
          Booking Demo
        </Button>
      </div>

      {/* Demo Content */}
      {activeDemo === 'message' && renderWhatsAppMessage()}
      {activeDemo === 'cards' && renderPropertyCards()}
      {activeDemo === 'booking' && renderBookingDemo()}
    </div>
  );
};
