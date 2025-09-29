import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  MessageCircle,
  Zap,
  BarChart3,
  PieChart,
  Target,
  Star,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Globe
} from 'lucide-react';

interface RealTimeMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  target: number;
  current: number;
}

interface ConversationMetrics {
  total: number;
  active: number;
  completed: number;
  averageResponseTime: number;
  satisfactionRating: number;
}

interface PerformanceInsight {
  type: 'success' | 'warning' | 'info';
  title: string;
  description: string;
  impact: string;
}

export const SensayRealTimeAnalytics: React.FC = () => {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([
    {
      id: 'lead-conversion',
      label: 'Lead Conversion Rate',
      value: '75%',
      change: '+12%',
      trend: 'up',
      target: 70,
      current: 75
    },
    {
      id: 'response-time',
      label: 'Response Time',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up',
      target: 2000,
      current: 1200
    },
    {
      id: 'satisfaction',
      label: 'Satisfaction Rate',
      value: '94%',
      change: '+3%',
      trend: 'up',
      target: 90,
      current: 94
    },
    {
      id: 'revenue',
      label: 'Revenue Generated',
      value: '$2.3M',
      change: '+$450K',
      trend: 'up',
      target: 2000000,
      current: 2300000
    }
  ]);

  const [conversationMetrics, setConversationMetrics] = useState<ConversationMetrics>({
    total: 1247,
    active: 89,
    completed: 1158,
    averageResponseTime: 1.2,
    satisfactionRating: 4.7
  });

  const [recentInsights] = useState<PerformanceInsight[]>([
    {
      type: 'success',
      title: 'Lead Quality Improved 18%',
      description: 'New qualification algorithm shows significant improvement in lead scoring accuracy',
      impact: '+$125K revenue potential'
    },
    {
      type: 'warning',
      title: 'Response Time Spike Detected',
      description: 'Peak hours showing 2.1s average response time - may need scaling',
      impact: '-3% satisfaction potential'
    },
    {
      type: 'info',
      title: 'Multi-language Usage Up',
      description: 'Spanish and Mandarin conversations increased 25% this month',
      impact: '+15% market reach'
    }
  ]);

  const languageBreakdown = [
    { language: 'English', percentage: 65, users: 810 },
    { language: 'Spanish', percentage: 18, users: 224 },
    { language: 'Mandarin', percentage: 12, users: 150 },
    { language: 'French', percentage: 5, users: 63 }
  ];

  const activityTimeline = [
    { time: '09:00', activity: 'Peak conversation started', type: 'peak' },
    { time: '09:15', activity: 'Response time optimized', type: 'optimization' },
    { time: '09:30', activity: 'New lead captured', type: 'lead' },
    { time: '09:45', activity: 'Appointment scheduled', type: 'appointment' },
    { time: '10:00', activity: 'Market data updated', type: 'data' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
    case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'info': return <Target className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-500" />
            Real-Time Analytics & Insights
          </h2>
          <p className="text-gray-600">Live performance tracking for Sensay Wisdom Engine</p>
        </div>
        <Badge variant="outline" className="text-green-600 bg-green-50">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Live Monitoring Active
        </Badge>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                  {getTrendIcon(metric.trend)}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                <Progress 
                  value={(metric.current / metric.target) * 100} 
                  className="h-2" 
                />
                <div className="text-xs text-gray-500">
                  Target: {metric.target > 1000 ? `$${(metric.target / 1000000).toFixed(1)}M` : metric.target}ms
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversation Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Live Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Conversations</span>
                <span className="font-medium">{conversationMetrics.total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Currently Active</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{conversationMetrics.active}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Completed Today</span>
                <span className="font-medium">{conversationMetrics.completed.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Avg Response Time</span>
                <span className="font-medium">{conversationMetrics.averageResponseTime}s</span>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Satisfaction Rating</span>
                <div className="flex items-center space-x-1">
                  <span className="font-medium">{conversationMetrics.satisfactionRating}</span>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </div>
              <Progress value={(conversationMetrics.satisfactionRating / 5) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Language Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Language Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {languageBreakdown.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-medium">{lang.language}</div>
                    <Badge variant="outline" className="text-xs">
                      {lang.users} users
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{lang.percentage}%</span>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000"
                        style={{ width: `${lang.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityTimeline.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.activity}</div>
                    <div className="text-xs text-gray-500">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
            Performance Insights & ROI Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentInsights.map((insight, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{insight.title}</h3>
                    <p className={`text-sm mb-2 ${getInsightColor(insight.type).includes('green') ? 'text-green-700' : getInsightColor(insight.type).includes('orange') ? 'text-orange-700' : 'text-blue-700'}`}>
                      {insight.description}
                    </p>
                    <div className="text-xs font-medium">
                      Impact: {insight.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROI Summary */}
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">ROI Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-gray-600">Lead Conversion Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">$2.3M</div>
                <div className="text-sm text-gray-600">Revenue Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">30%</div>
                <div className="text-sm text-gray-600">Cost Reduction</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-500" />
            Predictive Analytics & Performance Optimization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium">Optimization Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Enable voice synthesis during peak hours (2PM-4PM)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Add Mandarin support for Asian market expansion</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Implement avatar gestures for engagement boost</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Performance Indicators</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Peak Performance Hours</span>
                  <Badge variant="default">09:00-11:00 AM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Optimal Response Time</span>
                  <Badge variant="default">1.2s</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Expansion Potential</span>
                  <Badge variant="default">+32% Asia</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
