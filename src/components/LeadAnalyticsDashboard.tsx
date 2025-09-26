import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  Calendar,
  DollarSign,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Globe,
  Zap,
  Home,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

interface LeadMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageLeadScore: number;
  responseTime: number;
  engagementRate: number;
  appointmentBookings: number;
  revenue: number;
}

interface ConversationMetrics {
  totalConversations: number;
  averageMessagesPerConversation: number;
  averageResponseTime: number;
  satisfactionScore: number;
  languageDistribution: Array<{
    language: string;
    count: number;
    percentage: number;
  }>;
  intentDistribution: Array<{
    intent: string;
    count: number;
    percentage: number;
  }>;
}

interface PropertyMetrics {
  totalSearches: number;
  averageSearchResults: number;
  clickThroughRate: number;
  viewingBookings: number;
  topSearchedLocations: Array<{
    location: string;
    searches: number;
  }>;
  popularFeatures: Array<{
    feature: string;
    count: number;
  }>;
}

interface TimeSeriesData {
  date: string;
  leads: number;
  conversions: number;
  revenue: number;
  conversations: number;
}

const LeadAnalyticsDashboard: React.FC = () => {
  const [leadMetrics, setLeadMetrics] = useState<LeadMetrics | null>(null);
  const [conversationMetrics, setConversationMetrics] = useState<ConversationMetrics | null>(null);
  const [propertyMetrics, setPropertyMetrics] = useState<PropertyMetrics | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Mock data - in real implementation, fetch from API
      const mockLeadMetrics: LeadMetrics = {
        totalLeads: 1247,
        qualifiedLeads: 312,
        conversionRate: 25.0,
        averageLeadScore: 68.5,
        responseTime: 1.2,
        engagementRate: 78.3,
        appointmentBookings: 89,
        revenue: 2340000
      };

      const mockConversationMetrics: ConversationMetrics = {
        totalConversations: 892,
        averageMessagesPerConversation: 8.4,
        averageResponseTime: 1.2,
        satisfactionScore: 4.6,
        languageDistribution: [
          { language: 'English', count: 712, percentage: 79.8 },
          { language: 'Spanish', count: 98, percentage: 11.0 },
          { language: 'Chinese', count: 45, percentage: 5.0 },
          { language: 'French', count: 37, percentage: 4.2 }
        ],
        intentDistribution: [
          { intent: 'Find Properties', count: 445, percentage: 49.9 },
          { intent: 'Get Valuation', count: 178, percentage: 20.0 },
          { intent: 'Schedule Viewing', count: 134, percentage: 15.0 },
          { intent: 'Ask Questions', count: 89, percentage: 10.0 },
          { intent: 'Other', count: 46, percentage: 5.1 }
        ]
      };

      const mockPropertyMetrics: PropertyMetrics = {
        totalSearches: 2156,
        averageSearchResults: 12.3,
        clickThroughRate: 34.7,
        viewingBookings: 89,
        topSearchedLocations: [
          { location: 'Sydney', searches: 456 },
          { location: 'Melbourne', searches: 389 },
          { location: 'Brisbane', searches: 234 },
          { location: 'Perth', searches: 198 },
          { location: 'Adelaide', searches: 156 }
        ],
        popularFeatures: [
          { feature: 'Modern Kitchen', count: 567 },
          { feature: 'Parking', count: 489 },
          { feature: 'Garden', count: 423 },
          { feature: 'Pool', count: 234 },
          { feature: 'Garage', count: 198 }
        ]
      };

      const mockTimeSeriesData: TimeSeriesData[] = [
        { date: '2024-01-01', leads: 45, conversions: 12, revenue: 45000, conversations: 67 },
        { date: '2024-01-02', leads: 52, conversions: 15, revenue: 52000, conversations: 78 },
        { date: '2024-01-03', leads: 38, conversions: 9, revenue: 38000, conversations: 56 },
        { date: '2024-01-04', leads: 61, conversions: 18, revenue: 61000, conversations: 89 },
        { date: '2024-01-05', leads: 47, conversions: 13, revenue: 47000, conversations: 72 },
        { date: '2024-01-06', leads: 55, conversions: 16, revenue: 55000, conversations: 83 },
        { date: '2024-01-07', leads: 49, conversions: 14, revenue: 49000, conversations: 74 }
      ];

      setLeadMetrics(mockLeadMetrics);
      setConversationMetrics(mockConversationMetrics);
      setPropertyMetrics(mockPropertyMetrics);
      setTimeSeriesData(mockTimeSeriesData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'leads': return <Users className="h-5 w-5" />;
      case 'conversions': return <Target className="h-5 w-5" />;
      case 'revenue': return <DollarSign className="h-5 w-5" />;
      case 'conversations': return <MessageCircle className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case 'leads': return 'text-blue-600';
      case 'conversions': return 'text-green-600';
      case 'revenue': return 'text-purple-600';
      case 'conversations': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights into your Sensay chatbot performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedTimeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('7d')}
          >
            7 Days
          </Button>
          <Button
            variant={selectedTimeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('30d')}
          >
            30 Days
          </Button>
          <Button
            variant={selectedTimeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('90d')}
          >
            90 Days
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{leadMetrics?.totalLeads.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+12.5%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{leadMetrics?.conversionRate}%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+3.2%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{leadMetrics?.responseTime}s</p>
                <div className="flex items-center mt-1">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">-0.3s</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${leadMetrics?.revenue.toLocaleString()}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600 ml-1">+8.7%</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Time Series Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="leads" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="conversions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Lead Score Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Hot Leads (80%+)</span>
                    </div>
                    <span className="font-medium">89 leads</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Warm Leads (60-79%)</span>
                    </div>
                    <span className="font-medium">156 leads</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Cool Leads (40-59%)</span>
                    </div>
                    <span className="font-medium">234 leads</span>
                  </div>
                  <Progress value={67} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-sm">Cold Leads (&lt;40%)</span>
                    </div>
                    <span className="font-medium">768 leads</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={conversationMetrics?.languageDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ language, percentage }) => `${language} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {conversationMetrics?.languageDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={[
                    { source: 'Website', leads: 456 },
                    { source: 'WhatsApp', leads: 234 },
                    { source: 'Telegram', leads: 189 },
                    { source: 'Facebook', leads: 156 },
                    { source: 'Email', leads: 98 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="leads" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lead Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Converted</span>
                    </div>
                    <Badge variant="secondary">312</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">Appointment Scheduled</span>
                    </div>
                    <Badge variant="secondary">89</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm">In Conversation</span>
                    </div>
                    <Badge variant="secondary">445</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Lost</span>
                    </div>
                    <Badge variant="secondary">401</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Intent Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={conversationMetrics?.intentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="intent" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversation Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Total Conversations</span>
                    <span className="text-lg font-bold">{conversationMetrics?.totalConversations}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Avg Messages/Conversation</span>
                    <span className="text-lg font-bold">{conversationMetrics?.averageMessagesPerConversation}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Satisfaction Score</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold">{conversationMetrics?.satisfactionScore}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(conversationMetrics?.satisfactionScore || 0)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Searched Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={propertyMetrics?.topSearchedLocations}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="searches" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {propertyMetrics?.popularFeatures.map((feature, index) => (
                    <div key={feature.feature} className="flex items-center justify-between">
                      <span className="text-sm">{feature.feature}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={(feature.count / 567) * 100} className="w-20 h-2" />
                        <span className="text-sm font-medium">{feature.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeadAnalyticsDashboard;
