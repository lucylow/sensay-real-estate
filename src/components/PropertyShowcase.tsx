import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MessageCircle, Home, MapPin, DollarSign, Calendar, Users, Star, Shield } from 'lucide-react';
import { sensayService, SensayAction } from '@/services/sensayService';
import { Property } from '@/types/property';

interface PropertyShowcaseProps {
  properties?: Property[];
  onPropertySelect?: (property: Property) => void;
  onChatAction?: (action: SensayAction) => void;
}

interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  actions?: SensayAction[];
}

export const PropertyShowcase: React.FC<PropertyShowcaseProps> = ({
  properties = [],
  onPropertySelect,
  onChatAction,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [userPreferences, setUserPreferences] = useState({
    budget: '',
    location: '',
    propertyType: '',
    bedrooms: '',
  });

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: "Hi! I'm your PropGuard AI assistant. I can help you find the perfect property based on your preferences. What are you looking for today?",
      role: 'assistant',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await sensayService.sendMessage(inputValue);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        role: 'assistant',
        timestamp: new Date(),
        actions: response.actions,
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update preferences based on conversation
      updatePreferencesFromMessage(inputValue);
      
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble processing your request right now. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferencesFromMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Extract budget information
    const budgetMatch = lowerMessage.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:k|thousand|m|million)?/);
    if (budgetMatch) {
      setUserPreferences(prev => ({ ...prev, budget: budgetMatch[0] }));
    }

    // Extract location information
    const locationKeywords = ['melbourne', 'sydney', 'brisbane', 'perth', 'adelaide', 'suburb', 'area'];
    const locationMatch = locationKeywords.find(keyword => lowerMessage.includes(keyword));
    if (locationMatch) {
      setUserPreferences(prev => ({ ...prev, location: locationMatch }));
    }

    // Extract property type
    const propertyTypes = ['house', 'apartment', 'unit', 'townhouse', 'villa', 'studio'];
    const typeMatch = propertyTypes.find(type => lowerMessage.includes(type));
    if (typeMatch) {
      setUserPreferences(prev => ({ ...prev, propertyType: typeMatch }));
    }

    // Extract bedroom count
    const bedroomMatch = lowerMessage.match(/(\d+)\s*(?:bed|bedroom)/);
    if (bedroomMatch) {
      setUserPreferences(prev => ({ ...prev, bedrooms: bedroomMatch[1] }));
    }
  };

  const handleActionClick = (action: SensayAction) => {
    if (onChatAction) {
      onChatAction(action);
    }
  };

  const handlePropertyClick = (property: Property) => {
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chat Interface */}
        <div className="space-y-4">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-600" />
                Property Intelligence Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      {message.actions && message.actions.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleActionClick(action)}
                              className="mr-2 mb-1"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about properties, pricing, locations..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Showcase */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-green-600" />
                Featured Properties
              </CardTitle>
              {Object.values(userPreferences).some(pref => pref) && (
                <div className="flex flex-wrap gap-2">
                  {userPreferences.budget && (
                    <Badge variant="secondary">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {userPreferences.budget}
                    </Badge>
                  )}
                  {userPreferences.location && (
                    <Badge variant="secondary">
                      <MapPin className="h-3 w-3 mr-1" />
                      {userPreferences.location}
                    </Badge>
                  )}
                  {userPreferences.propertyType && (
                    <Badge variant="secondary">
                      <Home className="h-3 w-3 mr-1" />
                      {userPreferences.propertyType}
                    </Badge>
                  )}
                  {userPreferences.bedrooms && (
                    <Badge variant="secondary">
                      <Users className="h-3 w-3 mr-1" />
                      {userPreferences.bedrooms} bed
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              <Carousel className="w-full">
                <CarouselContent>
                  {filteredProperties.slice(0, 5).map((property) => (
                    <CarouselItem key={property.id}>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handlePropertyClick(property)}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-lg">{property.address}</h3>
                              <Badge variant="outline" className="text-green-600">
                                <Shield className="h-3 w-3 mr-1" />
                                Risk: {property.riskScore}/100
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4" />
                                {property.price}
                              </div>
                              <div className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                {property.bedrooms} bed
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {property.suburb}
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500" />
                                <span className="text-sm">PropGuard Score: {property.propguardScore}/100</span>
                              </div>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Chat about this
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12" onClick={() => setInputValue("Show me properties under $800,000")}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Under $800k
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setInputValue("I need a 3 bedroom house in Melbourne")}>
                  <Home className="h-4 w-4 mr-2" />
                  3 Bed House
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setInputValue("Book a virtual tour")}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Tour
                </Button>
                <Button variant="outline" className="h-12" onClick={() => setInputValue("Get property valuation")}>
                  <Shield className="h-4 w-4 mr-2" />
                  Get Valuation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
