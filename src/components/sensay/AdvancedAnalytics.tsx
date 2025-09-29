import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock, 
  Star,
  Target,
  Zap,
  Brain,
  MessageCircle,
  Home,
  Calendar,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Share2,
  Settings,
  PieChart,
  LineChart,
  Activity,
  Award,
  Trophy,
  Medal,
  Crown,
  Flame,
  Rocket,
  Sparkles
} from 'lucide-react';

interface LeadMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgResponseTime: number;
  revenue: number;
  costPerLead: number;
  lifetimeValue: number;
  roi: number;
  topSources: Array<{ source: string; count: number; conversion: number; revenue: number }>;
  hourlyDistribution: Array<{ hour: number; leads: number; conversions: number }>;
  satisfactionScore: number;
  retentionRate: number;
}

interface PropertyMetrics {
  totalProperties: number;
  avgPrice: number;
  priceAccuracy: number;
  predictionAccuracy: number;
  marketTrend: 'up' | 'down' | 'stable';
  riskDistribution: { low: number; medium: number; high: number };
  topFeatures: Array<{ feature: string; demand: number; impact: number }>;
  searchPatterns: Array<{ pattern: string; frequency: number; success: number }>;
  locationPerformance: Array<{ location: string; views: number; conversions: number; avgPrice: number }>;
}

interface ConversationMetrics {
  totalConversations: number;
  avgDuration: number;
  completionRate: number;
  satisfactionScore: number;
  intentAccuracy: number;
  responseTime: number;
  topIntents: Array<{ intent: string; count: number; success: number }>;
  languageDistribution: Array<{ language: string; count: number; satisfaction: number }>;
  channelPerformance: Array<{ channel: string; volume: number; conversion: number; satisfaction: number }>;
  sentimentAnalysis: { positive: number; neutral: number; negative: number };
}

interface ROIMetrics {
  totalInvestment: number;
  totalRevenue: number;
  netProfit: number;
  roi: number;
  paybackPeriod: number;
  costSavings: number;
  efficiencyGains: number;
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  breakEvenPoint: number;
  monthlyRecurringRevenue: number;
  growthRate: number;
}

interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    leads: number;
    conversion: number;
    revenue: number;
    roi: number;
    timeframe: string;
  };
  testimonial: string;
  rating: number;
  tags: string[];
}

export const AdvancedAnalytics: React.FC = () => {
  const [leadMetrics, setLeadMetrics] = useState<LeadMetrics>({
    totalLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    avgResponseTime: 0,
    revenue: 0,
    costPerLead: 0,
    lifetimeValue: 0,
    roi: 0,
    topSources: [],
    hourlyDistribution: [],
    satisfactionScore: 0,
    retentionRate: 0
  });
  
  const [propertyMetrics, setPropertyMetrics] = useState<PropertyMetrics>({
    totalProperties: 0,
    avgPrice: 0,
    priceAccuracy: 0,
    predictionAccuracy: 0,
    marketTrend: 'stable',
    riskDistribution: { low: 0, medium: 0, high: 0 },
    topFeatures: [],
    searchPatterns: [],
    locationPerformance: []
  });
  
  const [conversationMetrics, setConversationMetrics] = useState<ConversationMetrics>({
    totalConversations: 0,
    avgDuration: 0,
    completionRate: 0,
    satisfactionScore: 0,
    intentAccuracy: 0,
    responseTime: 0,
    topIntents: [],
    languageDistribution: [],
    channelPerformance: [],
    sentimentAnalysis: { positive: 0, neutral: 0, negative: 0 }
  });
  
  const [roiMetrics, setRoiMetrics] = useState<ROIMetrics>({
    totalInvestment: 0,
    totalRevenue: 0,
    netProfit: 0,
    roi: 0,
    paybackPeriod: 0,
    costSavings: 0,
    efficiencyGains: 0,
    customerAcquisitionCost: 0,
    customerLifetimeValue: 0,
    breakEvenPoint: 0,
    monthlyRecurringRevenue: 0,
    growthRate: 0
  });
  
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);

  useEffect(() => {
    // Mock data for demonstration
    const mockLeadMetrics: LeadMetrics = {
      totalLeads: 247,
      qualifiedLeads: 156,
      conversionRate: 63.2,
      avgResponseTime: 2.3,
      revenue: 1850000,
      costPerLead: 45,
      lifetimeValue: 12500,
      roi: 340,
      topSources: [
        { source: 'Web', count: 89, conversion: 68.5, revenue: 650000 },
        { source: 'WhatsApp', count: 67, conversion: 71.6, revenue: 520000 },
        { source: 'Email', count: 45, conversion: 55.6, revenue: 380000 },
        { source: 'Telegram', count: 32, conversion: 62.5, revenue: 200000 },
        { source: 'Phone', count: 14, conversion: 78.6, revenue: 100000 }
      ],
      hourlyDistribution: Array.from({ length: 24 }, (_, i) => ({
        hour: i,
        leads: Math.floor(Math.random() * 20) + (i >= 9 && i <= 17 ? 10 : 0),
        conversions: Math.floor(Math.random() * 15) + (i >= 9 && i <= 17 ? 8 : 0)
      })),
      satisfactionScore: 8.7,
      retentionRate: 78.5
    };

    const mockPropertyMetrics: PropertyMetrics = {
      totalProperties: 1247,
      avgPrice: 950000,
      priceAccuracy: 94.2,
      predictionAccuracy: 87.8,
      marketTrend: 'up',
      riskDistribution: { low: 45, medium: 35, high: 20 },
      topFeatures: [
        { feature: 'Modern Kitchen', demand: 89, impact: 12.5 },
        { feature: 'Pool', demand: 76, impact: 8.3 },
        { feature: 'Garage', demand: 82, impact: 6.7 },
        { feature: 'Garden', demand: 68, impact: 5.2 },
        { feature: 'Study', demand: 71, impact: 4.8 }
      ],
      searchPatterns: [
        { pattern: '3-bedroom house', frequency: 156, success: 78 },
        { pattern: 'apartment under 500k', frequency: 134, success: 65 },
        { pattern: 'investment property', frequency: 98, success: 82 },
        { pattern: 'family home', frequency: 87, success: 71 },
        { pattern: 'luxury apartment', frequency: 76, success: 85 }
      ],
      locationPerformance: [
        { location: 'Melbourne CBD', views: 234, conversions: 45, avgPrice: 850000 },
        { location: 'Sydney CBD', views: 198, conversions: 38, avgPrice: 1200000 },
        { location: 'Brisbane CBD', views: 156, conversions: 32, avgPrice: 650000 },
        { location: 'Perth CBD', views: 134, conversions: 28, avgPrice: 580000 },
        { location: 'Adelaide CBD', views: 98, conversions: 22, avgPrice: 520000 }
      ]
    };

    const mockConversationMetrics: ConversationMetrics = {
      totalConversations: 3456,
      avgDuration: 8.5,
      completionRate: 87.3,
      satisfactionScore: 8.9,
      intentAccuracy: 94.2,
      responseTime: 0.3,
      topIntents: [
        { intent: 'property_search', count: 1234, success: 89 },
        { intent: 'price_inquiry', count: 876, success: 92 },
        { intent: 'schedule_viewing', count: 654, success: 85 },
        { intent: 'market_analysis', count: 432, success: 88 },
        { intent: 'risk_assessment', count: 260, success: 91 }
      ],
      languageDistribution: [
        { language: 'English', count: 2345, satisfaction: 8.9 },
        { language: 'Spanish', count: 567, satisfaction: 8.7 },
        { language: 'Chinese', count: 345, satisfaction: 8.5 },
        { language: 'French', count: 199, satisfaction: 8.8 }
      ],
      channelPerformance: [
        { channel: 'Web Chat', volume: 1234, conversion: 68, satisfaction: 8.9 },
        { channel: 'WhatsApp', volume: 876, conversion: 72, satisfaction: 8.7 },
        { channel: 'Telegram', volume: 543, conversion: 65, satisfaction: 8.6 },
        { channel: 'Email', volume: 432, conversion: 58, satisfaction: 8.4 },
        { channel: 'Phone', volume: 371, conversion: 78, satisfaction: 9.1 }
      ],
      sentimentAnalysis: { positive: 78, neutral: 18, negative: 4 }
    };

    const mockRoiMetrics: ROIMetrics = {
      totalInvestment: 125000,
      totalRevenue: 1850000,
      netProfit: 1725000,
      roi: 1380,
      paybackPeriod: 2.1,
      costSavings: 45000,
      efficiencyGains: 35,
      customerAcquisitionCost: 45,
      customerLifetimeValue: 12500,
      breakEvenPoint: 1.8,
      monthlyRecurringRevenue: 125000,
      growthRate: 45.2
    };

    const mockCaseStudies: CaseStudy[] = [
      {
        id: '1',
        title: 'Real Estate Agency Increases Lead Conversion by 340%',
        company: 'Melbourne Property Group',
        industry: 'Real Estate',
        challenge: 'Low lead conversion rates and manual lead qualification processes',
        solution: 'Implemented Sensay AI-powered lead generation and qualification system',
        results: {
          leads: 247,
          conversion: 63.2,
          revenue: 1850000,
          roi: 340,
          timeframe: '6 months'
        },
        testimonial: 'Sensay transformed our lead generation process. We now convert 3x more leads with half the effort.',
        rating: 9.2,
        tags: ['Lead Generation', 'Conversion', 'ROI']
      },
      {
        id: '2',
        title: 'Property Developer Reduces Sales Cycle by 45%',
        company: 'Sydney Development Co.',
        industry: 'Property Development',
        challenge: 'Long sales cycles and high customer acquisition costs',
        solution: 'Deployed Sensay AI for automated property matching and virtual tours',
        results: {
          leads: 156,
          conversion: 78.5,
          revenue: 1250000,
          roi: 280,
          timeframe: '4 months'
        },
        testimonial: 'The AI-powered property matching and virtual tours have revolutionized our sales process.',
        rating: 8.9,
        tags: ['Sales Cycle', 'Virtual Tours', 'Property Matching']
      }
    ];

    setLeadMetrics(mockLeadMetrics);
    setPropertyMetrics(mockPropertyMetrics);
    setConversationMetrics(mockConversationMetrics);
    setRoiMetrics(mockRoiMetrics);
    setCaseStudies(mockCaseStudies);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600';
    if (rating >= 8) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getROIColor = (roi: number) => {
    if (roi >= 300) return 'text-green-600';
    if (roi >= 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              Advanced Analytics
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{leadMetrics.totalLeads}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">${(roiMetrics.totalRevenue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{roiMetrics.roi}%</div>
              <div className="text-sm text-muted-foreground">ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{conversationMetrics.satisfactionScore}/10</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="leads">Lead Metrics</TabsTrigger>
          <TabsTrigger value="properties">Property Insights</TabsTrigger>
          <TabsTrigger value="conversations">Conversation Analytics</TabsTrigger>
          <TabsTrigger value="roi">ROI Impact</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Sources Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Lead Sources Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadMetrics.topSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{source.source}</span>
                        <span className="text-sm text-muted-foreground">
                          {source.count} leads • {source.conversion}% conversion
                        </span>
                      </div>
                      <Progress value={source.conversion} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Revenue: ${source.revenue.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Metrics Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lead Metrics Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{leadMetrics.conversionRate}%</div>
                      <div className="text-sm text-muted-foreground">Conversion Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{leadMetrics.avgResponseTime}h</div>
                      <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cost Per Lead</span>
                      <span>${leadMetrics.costPerLead}</span>
                    </div>
                    <Progress value={100 - (leadMetrics.costPerLead / 100)} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Lifetime Value</span>
                      <span>${leadMetrics.lifetimeValue.toLocaleString()}</span>
                    </div>
                    <Progress value={(leadMetrics.lifetimeValue / 20000) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Retention Rate</span>
                      <span>{leadMetrics.retentionRate}%</span>
                    </div>
                    <Progress value={leadMetrics.retentionRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Property Features Demand */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Property Features Demand
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyMetrics.topFeatures.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{feature.feature}</span>
                        <span className="text-sm text-muted-foreground">
                          {feature.demand}% demand • {feature.impact}% impact
                        </span>
                      </div>
                      <Progress value={feature.demand} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Location Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Location Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {propertyMetrics.locationPerformance.map((location, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{location.location}</span>
                        <span className="text-sm text-muted-foreground">
                          {location.conversions} conversions
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Views: {location.views}</div>
                        <div>Avg Price: ${location.avgPrice.toLocaleString()}</div>
                      </div>
                      <div className="mt-2">
                        <Progress value={(location.conversions / location.views) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Intents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Top Conversation Intents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversationMetrics.topIntents.map((intent, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{intent.intent.replace('_', ' ')}</span>
                        <span className="text-sm text-muted-foreground">
                          {intent.count} conversations • {intent.success}% success
                        </span>
                      </div>
                      <Progress value={intent.success} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversationMetrics.channelPerformance.map((channel, index) => (
                    <div key={index} className="p-3 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{channel.channel}</span>
                        <span className="text-sm text-muted-foreground">
                          {channel.conversion}% conversion
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Volume: {channel.volume}</div>
                        <div>Satisfaction: {channel.satisfaction}/10</div>
                      </div>
                      <div className="mt-2">
                        <Progress value={channel.conversion} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  ROI Impact Calculator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{roiMetrics.roi}%</div>
                    <div className="text-sm text-muted-foreground">Return on Investment</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Total Investment</span>
                      <span>${roiMetrics.totalInvestment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Total Revenue</span>
                      <span>${roiMetrics.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Net Profit</span>
                      <span>${roiMetrics.netProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Payback Period</span>
                      <span>{roiMetrics.paybackPeriod} months</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cost Savings</span>
                      <span>${roiMetrics.costSavings.toLocaleString()}</span>
                    </div>
                    <Progress value={(roiMetrics.costSavings / 100000) * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Efficiency Gains</span>
                      <span>{roiMetrics.efficiencyGains}%</span>
                    </div>
                    <Progress value={roiMetrics.efficiencyGains} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Growth Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Growth Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{roiMetrics.growthRate}%</div>
                    <div className="text-sm text-muted-foreground">Growth Rate</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Recurring Revenue</span>
                      <span>${roiMetrics.monthlyRecurringRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Customer Acquisition Cost</span>
                      <span>${roiMetrics.customerAcquisitionCost}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Customer Lifetime Value</span>
                      <span>${roiMetrics.customerLifetimeValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Break Even Point</span>
                      <span>{roiMetrics.breakEvenPoint} months</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Growth Rate</span>
                      <span>{roiMetrics.growthRate}%</span>
                    </div>
                    <Progress value={roiMetrics.growthRate} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="case-studies" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="font-medium">{study.company}</div>
                      <div className="text-sm text-muted-foreground">{study.industry}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Challenge</div>
                      <div className="text-sm text-muted-foreground">{study.challenge}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Solution</div>
                      <div className="text-sm text-muted-foreground">{study.solution}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Results</div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>Leads: {study.results.leads}</div>
                        <div>Conversion: {study.results.conversion}%</div>
                        <div>Revenue: ${study.results.revenue.toLocaleString()}</div>
                        <div>ROI: {study.results.roi}%</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Testimonial</div>
                      <div className="text-sm text-muted-foreground italic">"{study.testimonial}"</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className={`font-medium ${getRatingColor(study.rating)}`}>
                          {study.rating}/10
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {study.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
