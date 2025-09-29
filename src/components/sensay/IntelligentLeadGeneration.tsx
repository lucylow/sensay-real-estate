import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  MessageCircle, 
  Phone, 
  Mail, 
  Globe,
  Star,
  Target,
  Zap,
  Brain,
  Activity,
  BarChart3,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'web' | 'whatsapp' | 'telegram' | 'email' | 'phone';
  score: number;
  status: 'new' | 'qualified' | 'contacted' | 'appointment_scheduled' | 'converted' | 'lost';
  timestamp: Date;
  preferences: {
    propertyType: string;
    budget: number;
    location: string;
    timeline: string;
  };
  conversationHistory: Array<{
    timestamp: Date;
    message: string;
    response: string;
    intent: string;
    satisfaction: number;
  }>;
  nextAction: string;
  estimatedValue: number;
}

interface LeadMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  revenue: number;
  topSources: Array<{ source: string; count: number; conversion: number }>;
  hourlyDistribution: Array<{ hour: number; leads: number }>;
  satisfactionScore: number;
}

export const IntelligentLeadGeneration: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<LeadMetrics>({
    totalLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    avgResponseTime: 0,
    revenue: 0,
    topSources: [],
    hourlyDistribution: [],
    satisfactionScore: 0
  });
  const [is24_7Active, setIs24_7Active] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  useEffect(() => {
    // Mock data for demonstration
    const mockLeads: Lead[] = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1-555-0123',
        source: 'web',
        score: 92,
        status: 'qualified',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        preferences: {
          propertyType: 'House',
          budget: 750000,
          location: 'Melbourne CBD',
          timeline: '3-6 months'
        },
        conversationHistory: [
          {
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            message: 'Hi, I\'m looking for a 3-bedroom house in Melbourne',
            response: 'Hello Sarah! I\'d be happy to help you find the perfect 3-bedroom house in Melbourne. What\'s your budget range?',
            intent: 'property_search',
            satisfaction: 9
          }
        ],
        nextAction: 'Schedule property viewing',
        estimatedValue: 22500
      },
      {
        id: '2',
        name: 'Michael Chen',
        email: 'm.chen@email.com',
        phone: '+1-555-0456',
        source: 'whatsapp',
        score: 78,
        status: 'new',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        preferences: {
          propertyType: 'Apartment',
          budget: 500000,
          location: 'Sydney',
          timeline: '1-2 months'
        },
        conversationHistory: [],
        nextAction: 'Initial qualification call',
        estimatedValue: 15000
      }
    ];

    const mockMetrics: LeadMetrics = {
      totalLeads: 247,
      qualifiedLeads: 156,
      conversionRate: 63.2,
      avgResponseTime: 2.3,
      revenue: 1850000,
      topSources: [
        { source: 'Web', count: 89, conversion: 68.5 },
        { source: 'WhatsApp', count: 67, conversion: 71.6 },
        { source: 'Email', count: 45, conversion: 55.6 },
        { source: 'Telegram', count: 32, conversion: 62.5 },
        { source: 'Phone', count: 14, conversion: 78.6 }
      ],
      hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        leads: Math.floor(Math.random() * 20) + (i >= 9 && i <= 17 ? 10 : 0)
      })),
      satisfactionScore: 8.7
    };

    setLeads(mockLeads);
    setMetrics(mockMetrics);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'appointment_scheduled': return 'bg-purple-100 text-purple-800';
      case 'converted': return 'bg-emerald-100 text-emerald-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'web': return <Globe className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'telegram': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* 24/7 Status Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-500" />
              Intelligent Lead Generation
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={is24_7Active ? "default" : "secondary"}>
                {is24_7Active ? "24/7 Active" : "Offline"}
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIs24_7Active(!is24_7Active)}
              >
                {is24_7Active ? "Pause" : "Resume"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{metrics.totalLeads}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.qualifiedLeads}</div>
              <div className="text-sm text-muted-foreground">Qualified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{metrics.conversionRate}%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">${(metrics.revenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="leads">Active Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="channels">Multi-Channel</TabsTrigger>
          <TabsTrigger value="ai-features">AI Features</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div 
                      key={lead.id}
                      className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="font-medium">{lead.name}</div>
                          <Badge variant="outline" className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </div>
                          <div className="text-sm text-muted-foreground">score</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          {getSourceIcon(lead.source)}
                          {lead.source}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {Math.floor((Date.now() - lead.timestamp.getTime()) / (1000 * 60))}m ago
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          ${lead.estimatedValue.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="font-medium">Next Action: {lead.nextAction}</div>
                        <div className="text-muted-foreground">
                          {lead.preferences.propertyType} • ${lead.preferences.budget.toLocaleString()} • {lead.preferences.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Details */}
            {selectedLead && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    {selectedLead.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Contact Information</div>
                      <div className="space-y-1 text-sm">
                        <div>Email: {selectedLead.email}</div>
                        <div>Phone: {selectedLead.phone}</div>
                        <div>Source: {selectedLead.source}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Preferences</div>
                      <div className="space-y-1 text-sm">
                        <div>Property Type: {selectedLead.preferences.propertyType}</div>
                        <div>Budget: ${selectedLead.preferences.budget.toLocaleString()}</div>
                        <div>Location: {selectedLead.preferences.location}</div>
                        <div>Timeline: {selectedLead.preferences.timeline}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Conversation History</div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {selectedLead.conversationHistory.map((conv, index) => (
                          <div key={index} className="p-2 bg-muted rounded text-xs">
                            <div className="font-medium">{conv.intent}</div>
                            <div className="text-muted-foreground">{conv.message}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{conv.satisfaction}/10</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm">Contact Now</Button>
                      <Button size="sm" variant="outline">Schedule Call</Button>
                      <Button size="sm" variant="outline">Send Property</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Lead Sources Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.topSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-sm text-muted-foreground">
                          {source.count} leads • {source.conversion}% conversion
                        </span>
                      </div>
                      <Progress value={source.conversion} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hourly Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  24/7 Lead Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {metrics.hourlyDistribution.map((hour, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-8 text-xs text-muted-foreground">
                        {hour.hour.toString().padStart(2, '0')}:00
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-4">
                        <div 
                          className="bg-primary h-4 rounded-full transition-all duration-300"
                          style={{ width: `${(hour.leads / 30) * 100}%` }}
                        />
                      </div>
                      <div className="w-8 text-xs text-muted-foreground">
                        {hour.leads}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Web Channel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Monitor className="h-4 w-4" />
                  Web
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">89</div>
                  <div className="text-xs text-muted-foreground">leads today</div>
                  <div className="text-xs text-green-600">68.5% conversion</div>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Channel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">67</div>
                  <div className="text-xs text-muted-foreground">leads today</div>
                  <div className="text-xs text-green-600">71.6% conversion</div>
                </div>
              </CardContent>
            </Card>

            {/* Telegram Channel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4" />
                  Telegram
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">32</div>
                  <div className="text-xs text-muted-foreground">leads today</div>
                  <div className="text-xs text-green-600">62.5% conversion</div>
                </div>
              </CardContent>
            </Card>

            {/* Email Channel */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">45</div>
                  <div className="text-xs text-muted-foreground">leads today</div>
                  <div className="text-xs text-green-600">55.6% conversion</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-features" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Smart Qualification */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Smart Qualification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Lead Scoring</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Intent Analysis</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Behavioral Patterns</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Predictive Flows</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contextual Memory */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Contextual Memory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">User Profiles</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Cross-Platform Sync</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Session Persistence</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Preference Learning</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
