import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Globe,
  MessageCircle,
  Calendar,
  Phone,
  Mail,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Timer,
  UserCheck,
  UserX,
  Building,
  Home,
  Car,
  Plane
} from 'lucide-react';

interface KPIMetric {
  id: string;
  label: string;
  current: number;
  target: number;
  previous: number;
  unit: string;
  status: 'exceeding' | 'meeting' | 'below';
  trend: 'up' | 'down' | 'stable';
  description: string;
}

interface LeadCaptureMetrics {
  totalVisitors: number;
  chatbotInteractions: number;
  leadCaptureRate: number;
  intentDetectionAccuracy: number;
  responseTime: number;
}

interface QualificationMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  qualificationAccuracy: number;
  averageScore: number;
  scoreDistribution: {
    hot: number;
    warm: number;
    cool: number;
    cold: number;
  };
}

interface ConversionMetrics {
  appointmentsScheduled: number;
  appointmentConversionRate: number;
  leadQualityImprovement: number;
  agentProductivityGain: number;
  costSavings: number;
}

interface MultiChannelMetrics {
  website: number;
  whatsapp: number;
  telegram: number;
  discord: number;
  total: number;
}

export const EnhancedLeadGenerationKPIs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - replace with real API calls
  const [leadCaptureMetrics, setLeadCaptureMetrics] = useState<LeadCaptureMetrics>({
    totalVisitors: 12450,
    chatbotInteractions: 3847,
    leadCaptureRate: 28.5,
    intentDetectionAccuracy: 94.2,
    responseTime: 1.8
  });

  const [qualificationMetrics, setQualificationMetrics] = useState<QualificationMetrics>({
    totalLeads: 3847,
    qualifiedLeads: 3078,
    qualificationAccuracy: 82.3,
    averageScore: 67.5,
    scoreDistribution: {
      hot: 456,
      warm: 1234,
      cool: 987,
      cold: 1170
    }
  });

  const [conversionMetrics, setConversionMetrics] = useState<ConversionMetrics>({
    appointmentsScheduled: 1234,
    appointmentConversionRate: 42.3,
    leadQualityImprovement: 58.7,
    agentProductivityGain: 73.2,
    costSavings: 28.5
  });

  const [multiChannelMetrics, setMultiChannelMetrics] = useState<MultiChannelMetrics>({
    website: 2156,
    whatsapp: 892,
    telegram: 456,
    discord: 343,
    total: 3847
  });

  const kpiMetrics: KPIMetric[] = [
    {
      id: 'capture-rate',
      label: 'Lead Capture Rate',
      current: leadCaptureMetrics.leadCaptureRate,
      target: 27.5,
      previous: 24.8,
      unit: '%',
      status: 'exceeding',
      trend: 'up',
      description: 'Percentage of website visitors who become leads'
    },
    {
      id: 'qualification-accuracy',
      label: 'Qualification Accuracy',
      current: qualificationMetrics.qualificationAccuracy,
      target: 80.0,
      previous: 76.2,
      unit: '%',
      status: 'exceeding',
      trend: 'up',
      description: 'Percentage of bot-qualified leads that convert to appointments'
    },
    {
      id: 'response-time',
      label: 'Response Time',
      current: leadCaptureMetrics.responseTime,
      target: 2.0,
      previous: 2.4,
      unit: 's',
      status: 'exceeding',
      trend: 'up',
      description: 'Average time for initial chatbot engagement'
    },
    {
      id: 'appointment-conversion',
      label: 'Appointment Conversion',
      current: conversionMetrics.appointmentConversionRate,
      target: 40.0,
      previous: 35.7,
      unit: '%',
      status: 'exceeding',
      trend: 'up',
      description: 'Percentage increase in scheduled viewings'
    },
    {
      id: 'lead-quality',
      label: 'Lead Quality Improvement',
      current: conversionMetrics.leadQualityImprovement,
      target: 60.0,
      previous: 52.3,
      unit: '%',
      status: 'below',
      trend: 'up',
      description: 'Improvement in sales-qualified leads'
    },
    {
      id: 'agent-productivity',
      label: 'Agent Productivity Gain',
      current: conversionMetrics.agentProductivityGain,
      target: 75.0,
      previous: 68.9,
      unit: '%',
      status: 'below',
      trend: 'up',
      description: 'Reduction in lead screening time'
    },
    {
      id: 'cost-savings',
      label: 'Cost Savings',
      current: conversionMetrics.costSavings,
      target: 30.0,
      previous: 25.1,
      unit: '%',
      status: 'below',
      trend: 'up',
      description: 'Reduction in customer service costs'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeding': return 'text-green-600 bg-green-50';
      case 'meeting': return 'text-blue-600 bg-blue-50';
      case 'below': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Generation KPIs</h2>
          <p className="text-gray-600">Comprehensive performance metrics for Sensay chatbot integration</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Activity className="h-3 w-3 mr-1" />
            Last 30 days
          </Badge>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.slice(0, 4).map((metric) => (
          <Card key={metric.id} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {metric.current}{metric.unit}
                    </span>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Target: {metric.target}{metric.unit}
                  </p>
                </div>
                <div className={`p-2 rounded-full ${getStatusColor(metric.status)}`}>
                  {metric.status === 'exceeding' ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : metric.status === 'meeting' ? (
                    <Target className="h-5 w-5" />
                  ) : (
                    <AlertCircle className="h-5 w-5" />
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Progress 
                  value={(metric.current / metric.target) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {((metric.current / metric.target) * 100).toFixed(1)}% of target
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="capture">Lead Capture</TabsTrigger>
          <TabsTrigger value="qualification">Qualification</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="channels">Multi-Channel</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lead Score Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Lead Score Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(qualificationMetrics.scoreDistribution).map(([category, count]) => {
                    const percentage = (count / qualificationMetrics.totalLeads) * 100;
                    const colors = {
                      hot: 'bg-red-500',
                      warm: 'bg-orange-500',
                      cool: 'bg-yellow-500',
                      cold: 'bg-blue-500'
                    };
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${colors[category as keyof typeof colors]}`} />
                          <span className="capitalize font-medium">{category} Leads</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kpiMetrics.map((metric) => (
                    <div key={metric.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{metric.label}</p>
                        <p className="text-xs text-gray-500">{metric.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{metric.current}{metric.unit}</span>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <p className="text-xs text-gray-500">
                          vs {metric.previous}{metric.unit} prev
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="capture" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Visitor Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Visitors</span>
                  <span className="font-medium">{leadCaptureMetrics.totalVisitors.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Chatbot Interactions</span>
                  <span className="font-medium">{leadCaptureMetrics.chatbotInteractions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Engagement Rate</span>
                  <span className="font-medium">
                    {((leadCaptureMetrics.chatbotInteractions / leadCaptureMetrics.totalVisitors) * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Capture Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Lead Capture Rate</span>
                  <span className="font-medium text-green-600">{leadCaptureMetrics.leadCaptureRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Target Rate</span>
                  <span className="font-medium">27.5%</span>
                </div>
                <Progress 
                  value={(leadCaptureMetrics.leadCaptureRate / 27.5) * 100} 
                  className="h-2"
                />
                <p className="text-xs text-gray-500">
                  {((leadCaptureMetrics.leadCaptureRate / 27.5) * 100).toFixed(1)}% of target
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  AI Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Intent Detection</span>
                  <span className="font-medium text-green-600">{leadCaptureMetrics.intentDetectionAccuracy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Response Time</span>
                  <span className="font-medium text-green-600">{leadCaptureMetrics.responseTime}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Target Response</span>
                  <span className="font-medium">&lt;2.0s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qualification" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Qualification Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Leads</span>
                  <span className="font-medium">{qualificationMetrics.totalLeads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Qualified Leads</span>
                  <span className="font-medium">{qualificationMetrics.qualifiedLeads.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Qualification Rate</span>
                  <span className="font-medium text-green-600">
                    {((qualificationMetrics.qualifiedLeads / qualificationMetrics.totalLeads) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Average Score</span>
                  <span className="font-medium">{qualificationMetrics.averageScore}/100</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Score Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(qualificationMetrics.scoreDistribution).map(([category, count]) => {
                    const percentage = (count / qualificationMetrics.totalLeads) * 100;
                    const colors = {
                      hot: 'bg-red-500',
                      warm: 'bg-orange-500',
                      cool: 'bg-yellow-500',
                      cold: 'bg-blue-500'
                    };
                    const thresholds = {
                      hot: '80-100',
                      warm: '60-79',
                      cool: '40-59',
                      cold: '0-39'
                    };
                    return (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${colors[category as keyof typeof colors]}`} />
                          <div>
                            <span className="capitalize font-medium text-sm">{category}</span>
                            <p className="text-xs text-gray-500">{thresholds[category as keyof typeof thresholds]}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{count}</span>
                          <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Appointment Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Appointments Scheduled</span>
                  <span className="font-medium">{conversionMetrics.appointmentsScheduled.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Conversion Rate</span>
                  <span className="font-medium text-green-600">{conversionMetrics.appointmentConversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Target Rate</span>
                  <span className="font-medium">40%</span>
                </div>
                <Progress 
                  value={(conversionMetrics.appointmentConversionRate / 40) * 100} 
                  className="h-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Impact Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Lead Quality Improvement</span>
                  <span className="font-medium text-green-600">+{conversionMetrics.leadQualityImprovement}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Agent Productivity Gain</span>
                  <span className="font-medium text-green-600">+{conversionMetrics.agentProductivityGain}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Cost Savings</span>
                  <span className="font-medium text-green-600">-{conversionMetrics.costSavings}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Channel Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(multiChannelMetrics).filter(([key]) => key !== 'total').map(([channel, count]) => {
                    const percentage = (count / multiChannelMetrics.total) * 100;
                    const icons = {
                      website: <Globe className="h-4 w-4" />,
                      whatsapp: <MessageCircle className="h-4 w-4" />,
                      telegram: <MessageCircle className="h-4 w-4" />,
                      discord: <MessageCircle className="h-4 w-4" />
                    };
                    return (
                      <div key={channel} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {icons[channel as keyof typeof icons]}
                          <span className="capitalize font-medium">{channel}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage.toFixed(1)}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{multiChannelMetrics.total.toLocaleString()}</div>
                    <p className="text-sm text-gray-600">Total Multi-Channel Leads</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-semibold text-green-600">4+</div>
                      <p className="text-xs text-green-600">Platforms Active</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-semibold text-blue-600">24/7</div>
                      <p className="text-xs text-blue-600">Availability</p>
                    </div>
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
