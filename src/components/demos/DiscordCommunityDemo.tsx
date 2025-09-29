import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Users, 
  Home, 
  Bell, 
  Calendar,
  Star,
  TrendingUp,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Heart,
  Share2,
  Video
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'dnd';
  role: string;
}

interface PropertyListing {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  propguardScore: number;
  features: string[];
  agent: string;
  postedBy: User;
}

export const DiscordCommunityDemo: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'notifications' | 'market-updates' | 'property-discussion' | 'agent-help'>('notifications');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  const mockUsers: User[] = [
    { id: '1', name: 'john_doe', avatar: '/placeholder.svg', status: 'online', role: 'Property Investor' },
    { id: '2', name: 'sarah_realtor', avatar: '/placeholder.svg', status: 'online', role: 'Agent' },
    { id: '3', name: 'alex_buyer', avatar: '/placeholder.svg', status: 'away', role: 'First-time Buyer' },
    { id: '4', name: 'community_bot', avatar: '/placeholder.svg', status: 'online', role: 'PropGuard AI' }
  ];

  const mockListings: PropertyListing[] = [
    {
      id: '1',
      address: '456 Ocean Drive, Miami Beach, FL',
      price: 1250000,
      bedrooms: 3,
      bathrooms: 2,
      image: '/placeholder.svg',
      propguardScore: 9.2,
      features: ['Ocean View', 'Pool', 'Gym'],
      agent: 'Sarah Johnson',
      postedBy: mockUsers[3] // bot
    },
    {
      id: '2',
      address: '789 Hills Ave, Beverly Hills, CA',
      price: 2850000,
      bedrooms: 5,
      bathrooms: 4,
      image: '/placeholder.svg',
      propguardScore: 8.7,
      features: ['Spa', 'Wine Cellar', 'Guest House'],
      agent: 'Michael Chen',
      postedBy: mockUsers[3] // bot
    },
    {
      id: '3',
      address: '123 Downtown Plaza, New York, NY',
      price: 2100000,
      bedrooms: 2,
      bathrooms: 2,
      image: '/placeholder.svg',
      propguardScore: 8.9,
      features: ['Penthouse', 'Rooftop', 'Concierge'],
      agent: 'Lisa Wang',
      postedBy: mockUsers[3] // bot
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const renderNotificationsChannel = () => (
    <div className="space-y-4">
      <Card className="bg-indigo-950 border-indigo-800 text-indigo-100">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Bot Mention Message */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[3].avatar} />
                  <AvatarFallback>🤖</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">PropGuard Community Bot</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[3].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 2:15 PM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    Hey <span className="text-yellow-300 font-medium">@john_doe</span> 🔔 new listings matching your saved search just dropped! Check out these hot properties👇
                  </div>
                </div>
              </div>

              {/* Property Embeds */}
              {mockListings.slice(0, 2).map((property) => (
                <div key={property.id} className="ml-11">
                  <Card className="bg-indigo-900 border-indigo-800">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <img 
                          src={property.image} 
                          alt="Property" 
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-indigo-100">{property.address}</h3>
                              <div className="text-lg font-bold text-green-400">${property.price.toLocaleString()}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-yellow-400">{property.propguardScore}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-indigo-300">
                            <span>{property.bedrooms} bed</span>
                            <span>{property.bathrooms} bath</span>
                            <span>PropGuard: {property.propguardScore}/10</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-6 text-xs">
                              <Calendar className="h-3 w-3 mr-1" />
                              Schedule Tour
                            </Button>
                            <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-200 h-6 text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* User Response */}
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[0].avatar} />
                  <AvatarFallback>👤</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">john_doe</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[0].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 2:17 PM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    Can you schedule a tour for any of these?
                  </div>
                </div>
              </div>
            </div>

            {/* Bot Response */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 ml-11">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[3].avatar} />
                  <AvatarFallback>🤖</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">PropGuard Community Bot</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[3].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 2:18 PM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    Absolutely! Which property interests you? I'll check times and book it for you 🏠
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-6 text-xs">
                      📝 I'll choose
                    </Button>
                    <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-200 h-6 text-xs">
                      💬 All three please
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMarketUpdatesChannel = () => (
    <div className="space-y-4">
      <Card className="bg-indigo-950 border-indigo-800 text-indigo-100">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Market Updates */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[3].avatar} />
                  <AvatarFallback>📈</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">PropGuard Market Bot</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[3].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 1:30 PM</span>
                  </div>
                  <div className="mt-1">
                    <div className="bg-indigo-900 rounded-lg p-4 border border-indigo-800">
                      <h3 className="font-bold text-yellow-300 mb-2">📊 Market Update - Austin Real Estate</h3>
                      <div className="space-y-2 text-sm text-indigo-100">
                        <div className="flex justify-between">
                          <span>Median Home Price:</span>
                          <span className="text-green-400">{'$485K (+3.2%)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Inventory:</span>
                          <span className="text-blue-400">{'2.3 months (+15 days)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Days on Market:</span>
                          <span className="text-orange-400">{'22 (-18%)'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>New Listings:</span>
                          <span className="text-purple-400">{'247 (+8.1%)'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Share */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[1].avatar} />
                  <AvatarFallback>🏘️</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">sarah_realtor</span>
                    <Badge className="bg-green-600 text-white text-xs px-2 py-0">Agent</Badge>
                    <span className="text-xs text-indigo-300">Today at 11:45 AM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    This neighborhood in South Austin is seeing incredible growth! PropGuard risk scores are improving rapidly 🚀
                  </div>
                  <div className="bg-indigo-900 rounded-lg p-3 border border-indigo-800 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-green-400">Location Insight</span>
                    </div>
                    <p className="text-sm text-indigo-200">
                      "South Austin has transformed into a tech hub with major companies moving in. 
                      Property values increasing 15% YOY with low environmental risks."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPropertyDiscussionChannel = () => (
    <div className="space-y-4">
      <Card className="bg-indigo-950 border-indigo-800 text-indigo-100">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Community Discussion */}
            {[mockUsers[0], mockUsers[2]].map((user, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>👤</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-indigo-200">{user.name}</span>
                      <Badge className={`text-xs px-2 py-0 ${
                        user.role === 'Property Investor' ? 'bg-purple-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {user.role}
                      </Badge>
                      <span className="text-xs text-indigo-300">
                        {idx === 0 ? 'Yesterday at 3:22 PM' : 'Yesterday at 6:15 PM'}
                      </span>
                    </div>
                    <div className="mt-1 text-indigo-100">
                      {idx === 0 
                        ? "Has anyone used PropGuard's AI valuation? The risk assessment seems incredibly detailed compared to traditional appraisers"
                        : "The thermal mapping for energy efficiency is a game-changer! Saved me $200/month on utilities in my new place"
                      }
                    </div>
                    {idx === 0 && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-200 h-6 text-xs">
                          👍 5 likes
                        </Button>
                        <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-200 h-6 text-xs">
                          💬 Reply
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Bot Assistance */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[3].avatar} />
                  <AvatarFallback>🤖</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">PropGuard Assistant</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[3].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 9:00 AM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    I'm glad you're finding value in our AI insights! 🌟 Quick reminder that PropGuard reports include:
                  </div>
                  <div className="bg-indigo-900 rounded-lg p-3 border border-indigo-800 mt-3">
                    <ul className="space-y-1 text-sm text-indigo-200">
                      <li>• 🏠 Comprehensive property analysis</li>
                      <li>• ⚠️ Climate & environmental risk mapping</li>
                      <li>• 📊 Market trend predictions</li>
                      <li>• 🔮 Investment potential scoring</li>
                      <li>• 💡 Utility optimization suggestions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAgentHelpChannel = () => (
    <div className="space-y-4">
      <Card className="bg-indigo-950 border-indigo-800 text-indigo-100">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Agent Support */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[1].avatar} />
                  <AvatarFallback>🏘️</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">sarah_realtor</span>
                    <Badge className="bg-green-600 text-white text-xs px-2 py-0">Verified Agent</Badge>
                    <span className="text-xs text-indigo-300">Today at 10:30 AM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    Hey team! Just closed a deal using PropGuard's automated client reports. 
                    The AI risk analysis helped my client make a confident $1.2M investment 💪
                  </div>
                  <div className="bg-indigo-900 rounded-lg p-3 border border-indigo-800 mt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                      <span className="font-medium text-blue-400">Agent Highlight</span>
                    </div>
                    <p className="text-sm text-indigo-200">
                      "The instant property valuation reports are incredible. Clients trust the AI-backed analysis 
                      and I can focus on relationship building instead of hours of manual research."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bot Response */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockUsers[3].avatar} />
                  <AvatarFallback>🤖</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-indigo-200">PropGuard Agent Bot</span>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(mockUsers[3].status)}`} />
                    <span className="text-xs text-indigo-300">Today at 10:32 AM</span>
                  </div>
                  <div className="mt-1 text-indigo-100">
                    Amazing work Sarah! 🎉 Tips for other agents: Use our automated client follow-ups and the virtual tour integrations to boost your conversion rates.
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-6 text-xs">
                      📊 View Success Metrics
                    </Button>
                    <Button size="sm" variant="outline" className="border-indigo-600 text-indigo-200 h-6 text-xs">
                      📖 Agent Guide
                    </Button>
                  </div>
                </div>
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
        <h2 className="text-2xl font-bold mb-2">Discord Community Demo</h2>
        <p className="text-gray-600">Server integration with mentions, property embeds, and community engagement</p>
      </div>

      {/* Channel Tabs */}
      <div className="flex justify-center gap-4">
        <Button
          variant={activeChannel === 'notifications' ? 'default' : 'outline'}
          onClick={() => setActiveChannel('notifications')}
        >
          📢 Notifications
        </Button>
        <Button
          variant={activeChannel === 'market-updates' ? 'default' : 'outline'}
          onClick={() => setActiveChannel('market-updates')}
        >
          📈 Market Updates
        </Button>
        <Button
          variant={activeChannel === 'property-discussion' ? 'default' : 'outline'}
          onClick={() => setActiveChannel('property-discussion')}
        >
          💬 Property Discussion
        </Button>
        <Button
          variant={activeChannel === 'agent-help' ? 'default' : 'outline'}
          onClick={() => setActiveChannel('agent-help')}
        >
          🤝 Agent Help
        </Button>
      </div>

      {/* Discord Style Interface */}
      <div className="flex gap-4 max-w-5xl mx-auto">
        {/* Sidebar */}
        <Card className="w-64 bg-gray-900 border-gray-700 text-gray-100">
          <CardContent className="p-4">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Real Estate Hub</h3>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Channels</div>
                <div className="space-y-1">
                  <div className={`flex items-center gap-2 p-1 rounded text-sm cursor-pointer ${
                    activeChannel === 'notifications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}>
                    <MessageCircle className="h-4 w-4" />
                    🔔 notifications
                  </div>
                  <div className={`flex items-center gap-2 p-1 rounded text-sm cursor-pointer ${
                    activeChannel === 'market-updates' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}>
                    <TrendingUp className="h-4 w-4" />
                    📈 market-updates
                  </div>
                  <div className={`flex items-center gap-2 p-1 rounded text-sm cursor-pointer ${
                    activeChannel === 'property-discussion' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'
                  }`}>
                    <Home className="h-4 w-4" />
                    💬 property-discussion
                  </div>
                  <div className={`flex items-center gap-2 p-1 rounded text-sm cursor-pointer ${
                    activeChannel === 'agent-help' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800' : 'hover:bg-gray-800'
                  }`}>
                    <Users className="h-4 w-4" />
                    🤝 agent-help
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Online ({mockUsers.length})</div>
                <div className="space-y-1">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                      <span>{user.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Channel Content */}
        <div className="flex-1">
          {activeChannel === 'notifications' && renderNotificationsChannel()}
          {activeChannel === 'market-updates' && renderMarketUpdatesChannel()}
          {activeChannel === 'property-discussion' && renderPropertyDiscussionChannel()}
          {activeChannel === 'agent-help' && renderAgentHelpChannel()}
        </div>
      </div>
    </div>
  );
};
