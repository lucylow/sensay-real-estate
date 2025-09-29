import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Camera, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail,
  Video,
  Eye,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Users,
  Home,
  Navigation,
  MessageCircle,
  Share2,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Settings,
  Star,
  ThumbsUp,
  Heart,
  Bookmark,
  ExternalLink,
  Copy,
  Send,
  Bell,
  CheckSquare,
  Square,
  Filter,
  Search,
  Target,
  TrendingUp
} from 'lucide-react';

interface VirtualTour {
  id: string;
  propertyId: string;
  propertyAddress: string;
  propertyPrice: number;
  propertyImages: string[];
  tourType: 'virtual' | 'live' | 'hybrid';
  duration: number; // in minutes
  description: string;
  features: string[];
  agent: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    rating: number;
    reviews: number;
  };
  availableSlots: TimeSlot[];
  isLive: boolean;
  recordingUrl?: string;
  interactiveElements: InteractiveElement[];
}

interface TimeSlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  isBooked: boolean;
  maxParticipants: number;
  currentParticipants: number;
  price?: number;
}

interface InteractiveElement {
  id: string;
  type: 'hotspot' | 'info-panel' | 'measurement' | 'comparison';
  position: { x: number; y: number; z: number };
  title: string;
  content: string;
  image?: string;
}

interface BookingRequest {
  tourId: string;
  timeSlotId: string;
  participantName: string;
  email: string;
  phone: string;
  numberOfParticipants: number;
  specialRequests?: string;
  tourType: 'virtual' | 'live' | 'hybrid';
}

interface TourBooking {
  id: string;
  tourId: string;
  timeSlotId: string;
  participantName: string;
  email: string;
  phone: string;
  numberOfParticipants: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  bookingDate: Date;
  specialRequests?: string;
  confirmationCode: string;
  meetingLink?: string;
  recordingUrl?: string;
}

export const VirtualTourBooking: React.FC = () => {
  const [virtualTours, setVirtualTours] = useState<VirtualTour[]>([]);
  const [selectedTour, setSelectedTour] = useState<VirtualTour | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [bookingRequest, setBookingRequest] = useState<Partial<BookingRequest>>({});
  const [bookings, setBookings] = useState<TourBooking[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    loadVirtualTours();
    loadUserBookings();
  }, []);

  const loadVirtualTours = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleTours: VirtualTour[] = [
      {
        id: '1',
        propertyId: 'prop1',
        propertyAddress: '123 Main Street, San Francisco, CA',
        propertyPrice: 1250000,
        propertyImages: ['/properties/prop1-1.jpg', '/properties/prop1-2.jpg'],
        tourType: 'live',
        duration: 45,
        description: 'Join our live virtual tour of this stunning modern home with ocean views. Our agent will guide you through every room and answer your questions in real-time.',
        features: ['Ocean View', 'Modern Kitchen', 'Hardwood Floors', 'Garden'],
        agent: {
          name: 'Sarah Johnson',
          avatar: '/agents/sarah.jpg',
          phone: '(555) 123-4567',
          email: 'sarah@realty.com',
          rating: 4.9,
          reviews: 127
        },
        availableSlots: [
          {
            id: 'slot1',
            date: new Date(),
            startTime: '10:00',
            endTime: '10:45',
            isAvailable: true,
            isBooked: false,
            maxParticipants: 10,
            currentParticipants: 3
          },
          {
            id: 'slot2',
            date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            startTime: '14:00',
            endTime: '14:45',
            isAvailable: true,
            isBooked: false,
            maxParticipants: 10,
            currentParticipants: 1
          },
          {
            id: 'slot3',
            date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            startTime: '16:00',
            endTime: '16:45',
            isAvailable: true,
            isBooked: false,
            maxParticipants: 10,
            currentParticipants: 5
          }
        ],
        isLive: true,
        interactiveElements: [
          {
            id: 'hotspot1',
            type: 'hotspot',
            position: { x: 100, y: 200, z: 0 },
            title: 'Ocean View',
            content: 'This room offers stunning panoramic ocean views from the large windows.',
            image: '/hotspots/ocean-view.jpg'
          }
        ]
      },
      {
        id: '2',
        propertyId: 'prop2',
        propertyAddress: '456 Oak Avenue, San Francisco, CA',
        propertyPrice: 950000,
        propertyImages: ['/properties/prop2-1.jpg', '/properties/prop2-2.jpg'],
        tourType: 'virtual',
        duration: 30,
        description: 'Explore this luxury condo at your own pace with our interactive 360° virtual tour. Click on hotspots to learn more about features and amenities.',
        features: ['City View', 'Rooftop Deck', 'Gym Access', 'Concierge'],
        agent: {
          name: 'Michael Chen',
          avatar: '/agents/michael.jpg',
          phone: '(555) 987-6543',
          email: 'michael@realty.com',
          rating: 4.8,
          reviews: 89
        },
        availableSlots: [],
        isLive: false,
        recordingUrl: 'https://example.com/tour/recording/2',
        interactiveElements: [
          {
            id: 'hotspot2',
            type: 'info-panel',
            position: { x: 200, y: 150, z: 0 },
            title: 'Smart Home Features',
            content: 'This property includes smart home automation for lighting, climate control, and security.',
            image: '/hotspots/smart-home.jpg'
          }
        ]
      },
      {
        id: '3',
        propertyId: 'prop3',
        propertyAddress: '789 Pine Street, San Francisco, CA',
        propertyPrice: 1800000,
        propertyImages: ['/properties/prop3-1.jpg', '/properties/prop3-2.jpg'],
        tourType: 'hybrid',
        duration: 60,
        description: 'Experience the best of both worlds with our hybrid tour. Start with a self-guided virtual tour, then join our live Q&A session with the listing agent.',
        features: ['Mountain View', 'Swimming Pool', 'Wine Cellar', 'Smart Home'],
        agent: {
          name: 'Emily Rodriguez',
          avatar: '/agents/emily.jpg',
          phone: '(555) 456-7890',
          email: 'emily@realty.com',
          rating: 4.9,
          reviews: 156
        },
        availableSlots: [
          {
            id: 'slot4',
            date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            startTime: '11:00',
            endTime: '12:00',
            isAvailable: true,
            isBooked: false,
            maxParticipants: 15,
            currentParticipants: 8
          }
        ],
        isLive: true,
        recordingUrl: 'https://example.com/tour/recording/3',
        interactiveElements: []
      }
    ];

    setVirtualTours(sampleTours);
  };

  const loadUserBookings = async () => {
    // Simulate loading user's bookings
    const sampleBookings: TourBooking[] = [
      {
        id: 'booking1',
        tourId: '1',
        timeSlotId: 'slot1',
        participantName: 'John Doe',
        email: 'john@example.com',
        phone: '(555) 123-4567',
        numberOfParticipants: 2,
        status: 'confirmed',
        bookingDate: new Date(),
        specialRequests: 'Please show the garden area in detail',
        confirmationCode: 'VT2024001',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      }
    ];
    setBookings(sampleBookings);
  };

  const handleTourSelect = (tour: VirtualTour) => {
    setSelectedTour(tour);
    setBookingRequest({
      tourId: tour.id,
      tourType: tour.tourType
    });
  };

  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    setBookingRequest(prev => ({
      ...prev,
      timeSlotId: slot.id
    }));
  };

  const handleBookingSubmit = async () => {
    if (!bookingRequest.tourId || !bookingRequest.timeSlotId || !bookingRequest.participantName || !bookingRequest.email) {
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newBooking: TourBooking = {
      id: `booking${Date.now()}`,
      tourId: bookingRequest.tourId,
      timeSlotId: bookingRequest.timeSlotId,
      participantName: bookingRequest.participantName,
      email: bookingRequest.email,
      phone: bookingRequest.phone || '',
      numberOfParticipants: bookingRequest.numberOfParticipants || 1,
      status: 'confirmed',
      bookingDate: new Date(),
      specialRequests: bookingRequest.specialRequests,
      confirmationCode: `VT${Date.now().toString().slice(-6)}`,
      meetingLink: selectedTour?.isLive ? `https://meet.google.com/meeting-${Date.now()}` : undefined
    };

    setBookings(prev => [...prev, newBooking]);
    setBookingSuccess(true);
    setIsBooking(false);
    
    // Reset form
    setBookingRequest({});
    setSelectedTimeSlot(null);
  };

  const filteredTours = virtualTours.filter(tour => {
    const matchesSearch = !searchQuery || 
      tour.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || tour.tourType === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6 overflow-auto">
      <div className="flex items-center gap-2 mb-6">
        <Camera className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Virtual Tour Booking</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered Tours
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tours List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search properties or addresses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tours</SelectItem>
                    <SelectItem value="virtual">Virtual Only</SelectItem>
                    <SelectItem value="live">Live Tours</SelectItem>
                    <SelectItem value="hybrid">Hybrid Tours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTours.map((tour) => (
              <Card 
                key={tour.id} 
                className={`cursor-pointer hover:shadow-lg transition-shadow ${
                  selectedTour?.id === tour.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTourSelect(tour)}
              >
                <div className="relative">
                  <div className="h-48 bg-muted rounded-t-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-muted-foreground" />
                  </div>
                  
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge variant={tour.tourType === 'live' ? 'default' : tour.tourType === 'virtual' ? 'secondary' : 'outline'}>
                      {tour.tourType === 'live' ? 'Live Tour' : tour.tourType === 'virtual' ? 'Virtual Tour' : 'Hybrid Tour'}
                    </Badge>
                    {tour.isLive && (
                      <Badge variant="destructive" className="animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                        Live
                      </Badge>
                    )}
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">
                      {tour.duration} min
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{formatPrice(tour.propertyPrice)}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{tour.propertyAddress}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tour.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {tour.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {tour.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tour.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          <User className="h-3 w-3" />
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">{tour.agent.name}</div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{tour.agent.rating}</span>
                            <span className="text-muted-foreground">({tour.agent.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {tour.availableSlots.length > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            {tour.availableSlots.length} slots
                          </Badge>
                        )}
                        {!tour.isLive && tour.recordingUrl && (
                          <Badge variant="outline" className="text-xs">
                            <Play className="h-3 w-3 mr-1" />
                            Recording
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Panel */}
        <div className="space-y-6">
          {selectedTour ? (
            <>
              {/* Tour Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Tour Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{formatPrice(selectedTour.propertyPrice)}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTour.propertyAddress}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedTour.tourType === 'live' ? 'default' : 'secondary'}>
                      {selectedTour.tourType === 'live' ? 'Live Tour' : selectedTour.tourType === 'virtual' ? 'Virtual Tour' : 'Hybrid Tour'}
                    </Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedTour.duration} min
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{selectedTour.agent.name}</div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{selectedTour.agent.rating}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Time Slots */}
              {selectedTour.availableSlots.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Available Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedTour.availableSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedTimeSlot?.id === slot.id 
                              ? 'border-primary bg-primary/5' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleTimeSlotSelect(slot)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">
                                {slot.date.toLocaleDateString()} at {formatTime(slot.startTime)}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {slot.currentParticipants}/{slot.maxParticipants} participants
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {formatTime(slot.endTime)}
                              </Badge>
                              {selectedTimeSlot?.id === slot.id && (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Booking Form */}
              {selectedTimeSlot && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5" />
                      Book Tour
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        placeholder="Enter your full name"
                        value={bookingRequest.participantName || ''}
                        onChange={(e) => setBookingRequest(prev => ({ ...prev, participantName: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={bookingRequest.email || ''}
                        onChange={(e) => setBookingRequest(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Phone (Optional)</Label>
                      <Input
                        placeholder="Enter your phone number"
                        value={bookingRequest.phone || ''}
                        onChange={(e) => setBookingRequest(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Number of Participants</Label>
                      <Select 
                        value={bookingRequest.numberOfParticipants?.toString() || '1'} 
                        onValueChange={(value) => setBookingRequest(prev => ({ ...prev, numberOfParticipants: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(selectedTimeSlot.maxParticipants - selectedTimeSlot.currentParticipants)].map((_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1} {i === 0 ? 'Person' : 'People'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Special Requests (Optional)</Label>
                      <Textarea
                        placeholder="Any specific areas you'd like to see or questions you have..."
                        value={bookingRequest.specialRequests || ''}
                        onChange={(e) => setBookingRequest(prev => ({ ...prev, specialRequests: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={handleBookingSubmit}
                      disabled={isBooking || !bookingRequest.participantName || !bookingRequest.email}
                    >
                      {isBooking ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Booking...
                        </>
                      ) : (
                        <>
                          <CheckSquare className="h-4 w-4 mr-2" />
                          Book Tour
                        </>
                      )}
                    </Button>
                    
                    {bookingSuccess && (
                      <Alert>
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          Tour booked successfully! Check your email for confirmation details and meeting link.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Select a Tour</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a virtual tour from the list to view details and book your viewing.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            My Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => {
                const tour = virtualTours.find(t => t.id === booking.tourId);
                const slot = tour?.availableSlots.find(s => s.id === booking.timeSlotId);
                
                return (
                  <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{tour?.propertyAddress}</h4>
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {slot?.date.toLocaleDateString()} at {slot && formatTime(slot.startTime)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Confirmation: {booking.confirmationCode}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {booking.meetingLink && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Join
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No Bookings Yet</h3>
              <p className="text-sm text-muted-foreground">
                Book your first virtual tour to see it here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualTourBooking;