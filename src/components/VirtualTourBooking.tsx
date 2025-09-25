import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Video, 
  Users, 
  Phone, 
  Mail, 
  CheckCircle,
  AlertCircle,
  Play,
  Camera,
  MessageCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { sensayService } from '@/services/sensayService';

interface TourBooking {
  id: string;
  propertyId: string;
  propertyAddress: string;
  tourType: 'virtual' | 'in-person' | 'hybrid';
  scheduledDate: Date;
  scheduledTime: string;
  duration: number; // in minutes
  maxParticipants: number;
  currentParticipants: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  meetingLink?: string;
  meetingLocation?: string;
  specialInstructions?: string;
}

interface BookingRequest {
  propertyId: string;
  tourType: 'virtual' | 'in-person' | 'hybrid';
  preferredDate: Date;
  preferredTime: string;
  participantCount: number;
  contactInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  specialRequests?: string;
}

const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const tourTypes = [
  { value: 'virtual', label: 'Virtual Tour', icon: Video, description: 'Online video tour with live agent' },
  { value: 'in-person', label: 'In-Person Visit', icon: MapPin, description: 'Physical property inspection' },
  { value: 'hybrid', label: 'Hybrid Tour', icon: Camera, description: 'Combined virtual and in-person' }
];

export const VirtualTourBooking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [tourType, setTourType] = useState<'virtual' | 'in-person' | 'hybrid'>('virtual');
  const [bookingRequest, setBookingRequest] = useState<BookingRequest>({
    propertyId: '',
    tourType: 'virtual',
    preferredDate: new Date(),
    preferredTime: '',
    participantCount: 1,
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    },
    specialRequests: ''
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [availableBookings, setAvailableBookings] = useState<TourBooking[]>([]);
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  useEffect(() => {
    // Load available bookings (mock data)
    const mockBookings: TourBooking[] = [
      {
        id: '1',
        propertyId: 'prop-1',
        propertyAddress: '123 Collins Street, Melbourne',
        tourType: 'virtual',
        scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
        scheduledTime: '14:00',
        duration: 30,
        maxParticipants: 5,
        currentParticipants: 2,
        status: 'scheduled',
        meetingLink: 'https://meet.google.com/abc-defg-hij'
      },
      {
        id: '2',
        propertyId: 'prop-2',
        propertyAddress: '456 Bourke Street, Melbourne',
        tourType: 'in-person',
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        scheduledTime: '10:30',
        duration: 45,
        maxParticipants: 3,
        currentParticipants: 1,
        status: 'scheduled',
        meetingLocation: 'Property entrance, 456 Bourke Street'
      }
    ];
    setAvailableBookings(mockBookings);
  }, []);

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime || !bookingRequest.contactInfo.name || !bookingRequest.contactInfo.email) {
      return;
    }

    setIsBooking(true);
    
    try {
      // Send booking request to Sensay for processing
      const message = `I'd like to book a ${tourType} tour for ${bookingRequest.propertyId} on ${format(selectedDate, 'PPP')} at ${selectedTime}. Contact: ${bookingRequest.contactInfo.name} (${bookingRequest.contactInfo.email})`;
      
      const response = await sensayService.sendMessage(message);
      
      // Create new booking
      const newBooking: TourBooking = {
        id: Date.now().toString(),
        propertyId: bookingRequest.propertyId,
        propertyAddress: '123 Collins Street, Melbourne', // This would come from property data
        tourType: tourType,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        duration: tourType === 'virtual' ? 30 : 45,
        maxParticipants: tourType === 'virtual' ? 5 : 3,
        currentParticipants: 1,
        status: 'scheduled',
        meetingLink: tourType === 'virtual' ? 'https://meet.google.com/new-meeting' : undefined,
        meetingLocation: tourType === 'in-person' ? 'Property entrance' : undefined,
        specialInstructions: bookingRequest.specialRequests
      };

      setAvailableBookings(prev => [...prev, newBooking]);
      setBookingSuccess(true);
      
      // Add confirmation message to chat
      const confirmationMessage = {
        id: Date.now().toString(),
        content: `Great! I've booked your ${tourType} tour for ${format(selectedDate, 'PPP')} at ${selectedTime}. You'll receive a confirmation email shortly with all the details.`,
        timestamp: new Date(),
        type: 'confirmation'
      };
      
      setChatMessages(prev => [...prev, confirmationMessage]);
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setBookingRequest(prev => ({
        ...prev,
        contactInfo: { name: '', email: '', phone: '' },
        specialRequests: ''
      }));
      
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsBooking(false);
    }
  };

  const handleChatBooking = async (message: string) => {
    try {
      const response = await sensayService.sendMessage(message);
      
      const chatMessage = {
        id: Date.now().toString(),
        content: response.message,
        timestamp: new Date(),
        actions: response.actions || []
      };
      
      setChatMessages(prev => [...prev, chatMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    }
  };

  const getStatusColor = (status: TourBooking['status']) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTourTypeIcon = (type: TourBooking['tourType']) => {
    switch (type) {
      case 'virtual': return Video;
      case 'in-person': return MapPin;
      case 'hybrid': return Camera;
      default: return CalendarIcon;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-blue-600" />
                Book Property Tour
              </CardTitle>
              <p className="text-gray-600">
                Schedule a virtual or in-person property tour with our AI assistant
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Tour Type Selection */}
              <div className="space-y-3">
                <Label>Tour Type</Label>
                <div className="grid grid-cols-1 gap-3">
                  {tourTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Card 
                        key={type.value}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          tourType === type.value && "ring-2 ring-blue-500 bg-blue-50"
                        )}
                        onClick={() => setTourType(type.value as any)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">{type.label}</h3>
                              <p className="text-sm text-gray-600">{type.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <Label>Select Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className="space-y-3">
                  <Label>Select Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Contact Information */}
              <div className="space-y-4">
                <Label>Contact Information</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Full Name"
                    value={bookingRequest.contactInfo.name}
                    onChange={(e) => setBookingRequest(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, name: e.target.value }
                    }))}
                  />
                  <Input
                    placeholder="Email Address"
                    type="email"
                    value={bookingRequest.contactInfo.email}
                    onChange={(e) => setBookingRequest(prev => ({
                      ...prev,
                      contactInfo: { ...prev.contactInfo, email: e.target.value }
                    }))}
                  />
                </div>
                <Input
                  placeholder="Phone Number (optional)"
                  value={bookingRequest.contactInfo.phone || ''}
                  onChange={(e) => setBookingRequest(prev => ({
                    ...prev,
                    contactInfo: { ...prev.contactInfo, phone: e.target.value }
                  }))}
                />
              </div>

              {/* Special Requests */}
              <div className="space-y-3">
                <Label>Special Requests</Label>
                <Textarea
                  placeholder="Any special requirements or questions..."
                  value={bookingRequest.specialRequests || ''}
                  onChange={(e) => setBookingRequest(prev => ({
                    ...prev,
                    specialRequests: e.target.value
                  }))}
                />
              </div>

              {/* Submit Button */}
              <Button 
                onClick={handleBookingSubmit}
                disabled={!selectedDate || !selectedTime || !bookingRequest.contactInfo.name || !bookingRequest.contactInfo.email || isBooking}
                className="w-full"
              >
                {isBooking ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Book Tour
                  </>
                )}
              </Button>

              {bookingSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Tour booked successfully!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    You'll receive a confirmation email with all the details.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleChatBooking("I want to book a virtual tour for tomorrow")}>
                  <Video className="h-4 w-4 mr-2" />
                  Virtual Tour
                </Button>
                <Button variant="outline" onClick={() => handleChatBooking("I'd like to schedule an in-person visit")}>
                  <MapPin className="h-4 w-4 mr-2" />
                  In-Person Visit
                </Button>
                <Button variant="outline" onClick={() => handleChatBooking("What times are available this week?")}>
                  <Clock className="h-4 w-4 mr-2" />
                  Check Availability
                </Button>
                <Button variant="outline" onClick={() => handleChatBooking("I need to reschedule my tour")}>
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Reschedule
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat & Bookings */}
        <div className="space-y-6">
          {/* Chat Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Tour Assistant Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {chatMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-gray-800">{message.content}</p>
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-2 space-x-2">
                          {message.actions.map((action: any, index: number) => (
                            <Button key={index} size="sm" variant="outline">
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {chatMessages.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Start a conversation to book your tour!</p>
                    <p className="text-sm">Try: "I want to book a virtual tour"</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-600" />
                Upcoming Tours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableBookings.map((booking) => {
                  const IconComponent = getTourTypeIcon(booking.tourType);
                  return (
                    <Card key={booking.id} className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-blue-600" />
                            <div>
                              <h3 className="font-medium">{booking.propertyAddress}</h3>
                              <p className="text-sm text-gray-600">
                                {format(booking.scheduledDate, 'PPP')} at {booking.scheduledTime}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {booking.duration} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {booking.currentParticipants}/{booking.maxParticipants}
                          </div>
                        </div>

                        {booking.meetingLink && (
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer">
                                <Play className="h-4 w-4 mr-1" />
                                Join Virtual Tour
                              </a>
                            </Button>
                          </div>
                        )}

                        {booking.meetingLocation && (
                          <div className="text-sm text-gray-600">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {booking.meetingLocation}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Agent
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="h-4 w-4 mr-1" />
                            Email Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
