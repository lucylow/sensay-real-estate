import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, TrendingUp, Clock, Target, MessageSquare, 
  Users, Zap, AlertCircle, CheckCircle, Star, Activity
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { 
  ChatFlowQualityEngine, 
  ConversationState, 
  ConversationMetrics 
} from '@/services/chatflow/qualityEngine';

interface AnalyticsData {
  totalConversations: number;
  averageResponseTime: number;
  completionRate: number;
  averageQualityScore: number;
  userSatisfaction: number;
  stateTransitions: Record<ConversationState, number>;
  qualityTrends: Array<{
    date: string;
    qualityScore: number;
    responseTime: number;
    completionRate: number;
  }>;
  dropOffPoints: Record<ConversationState, number>;
  topIntents: Array<{
    intent: string;
    count: number;
    successRate: number;
  }>;
}

interface ConversationAnalyticsDashboardProps {
  qualityEngine: ChatFlowQualityEngine;
  className?: string;
}

export const ConversationAnalyticsDashboard: React.FC<ConversationAnalyticsDashboardProps> = ({
  qualityEngine,
  className = ''
}) => {
  const { t } = useTranslation();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, [selectedTimeRange]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Simulate loading analytics data
      // In a real implementation, this would fetch from your analytics service
      const mockData: AnalyticsData = {
        totalConversations: 1247,
        averageResponseTime: 2.3,
        completionRate: 78.5,
        averageQualityScore: 85.2,
        userSatisfaction: 4.3,
        stateTransitions: {
          [ConversationState.GREETING]: 1247,
          [ConversationState.NEEDS_ASSESSMENT]: 892,
          [ConversationState.PROPERTY_SEARCH]: 654,
          [ConversationState.VALUATION_REQUEST]: 234,
          [ConversationState.RISK_ASSESSMENT]: 189,
          [ConversationState.SCHEDULING]: 145,
          [ConversationState.FOLLOW_UP]: 98,
          [ConversationState.COMPLEX_QUERY]: 67,
          [ConversationState.ERROR_RECOVERY]: 23
        },
        qualityTrends: generateMockTrends(),
        dropOffPoints: {
          [ConversationState.GREETING]: 45,
          [ConversationState.NEEDS_ASSESSMENT]: 234,
          [ConversationState.PROPERTY_SEARCH]: 89,
          [ConversationState.VALUATION_REQUEST]: 67,
          [ConversationState.RISK_ASSESSMENT]: 34,
          [ConversationState.SCHEDULING]: 12,
          [ConversationState.FOLLOW_UP]: 8,
          [ConversationState.COMPLEX_QUERY]: 15,
          [ConversationState.ERROR_RECOVERY]: 5
        },
        topIntents: [
          { intent: 'property_search', count: 456, successRate: 89.2 },
          { intent: 'valuation_request', count: 234, successRate: 92.1 },
          { intent: 'risk_assessment', count: 189, successRate: 85.7 },
          { intent: 'scheduling', count: 145, successRate: 94.5 },
          { intent: 'market_insights', count: 123, successRate: 87.8 }
        ]
      };
      
      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockTrends = () => {
    const trends = [];
    const days = selectedTimeRange === '24h' ? 1 : selectedTimeRange === '7d' ? 7 : 30;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      trends.push({
        date: date.toISOString().split('T')[0],
        qualityScore: 80 + Math.random() * 15,
        responseTime: 1.5 + Math.random() * 2,
        completionRate: 70 + Math.random() * 20
      });
    }
    
    return trends;
  };

  const getQualityRating = (score: number) => {
    if (score >= 90) return { label: t('chatflow.quality.excellent'), color: 'text-green-600' };
    if (score >= 70) return { label: t('chatflow.quality.good'), color: 'text-blue-600' };
    if (score >= 50) return { label: t('chatflow.quality.fair'), color: 'text-yellow-600' };
    return { label: t('chatflow.quality.poor'), color: 'text-red-600' };
  };

  const getStateDisplayName = (state: ConversationState) => {
    return state.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading analytics...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No analytics data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Conversation Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor chatflow quality and user engagement</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={selectedTimeRange === '24h' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('24h')}
          >
            24h
          </Button>
          <Button
            variant={selectedTimeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('7d')}
          >
            7d
          </Button>
          <Button
            variant={selectedTimeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedTimeRange('30d')}
          >
            30d
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{analyticsData.averageResponseTime.toFixed(1)}s</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <Progress value={Math.min(100, (3 - analyticsData.averageResponseTime) / 3 * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Target: &lt;3s</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold">{analyticsData.completionRate.toFixed(1)}%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <div className="mt-2">
              <Progress value={analyticsData.completionRate} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Target: &gt;80%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-2xl font-bold">{analyticsData.averageQualityScore.toFixed(1)}/100</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
            <div className="mt-2">
              <Progress value={analyticsData.averageQualityScore} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {getQualityRating(analyticsData.averageQualityScore).label}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">User Satisfaction</p>
                <p className="text-2xl font-bold">{analyticsData.userSatisfaction.toFixed(1)}/5</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
            <div className="mt-2">
              <Progress value={(analyticsData.userSatisfaction / 5) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">Target: &gt;4.0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="flow" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flow">Flow Analysis</TabsTrigger>
          <TabsTrigger value="quality">Quality Trends</TabsTrigger>
          <TabsTrigger value="intents">Intent Analysis</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="flow" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* State Transitions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Conversation State Transitions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analyticsData.stateTransitions)
                    .sort(([,a], [,b]) => b - a)
                    .map(([state, count]) => (
                    <div key={state} className="flex items-center justify-between">
                      <span className="text-sm">{getStateDisplayName(state as ConversationState)}</span>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={(count / analyticsData.totalConversations) * 100} 
                          className="w-20 h-2" 
                        />
                        <span className="text-sm font-medium w-12 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Drop-off Points */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Conversation Drop-off Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(analyticsData.dropOffPoints)
                    .sort(([,a], [,b]) => b - a)
                    .map(([state, count]) => (
                    <div key={state} className="flex items-center justify-between">
                      <span className="text-sm">{getStateDisplayName(state as ConversationState)}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          {count} drop-offs
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {((count / analyticsData.stateTransitions[state as ConversationState]) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Quality Trends Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.qualityTrends.slice(-7).map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">{trend.date}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Quality</p>
                        <p className="font-bold">{trend.qualityScore.toFixed(1)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Response Time</p>
                        <p className="font-bold">{trend.responseTime.toFixed(1)}s</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Completion</p>
                        <p className="font-bold">{trend.completionRate.toFixed(1)}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Top User Intents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topIntents.map((intent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{intent.intent.replace('_', ' ').toUpperCase()}</p>
                      <p className="text-sm text-muted-foreground">{intent.count} requests</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Success Rate</p>
                        <p className="font-bold">{intent.successRate.toFixed(1)}%</p>
                      </div>
                      <Progress value={intent.successRate} className="w-20 h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Response Time Optimization */}
                {analyticsData.averageResponseTime > 3 && (
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-yellow-800">Response Time Optimization</h4>
                        <p className="text-sm text-yellow-700 mt-1">
                          Average response time is {analyticsData.averageResponseTime.toFixed(1)}s, above the 3s target.
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-yellow-600">• Pre-cache common responses</p>
                          <p className="text-xs text-yellow-600">• Optimize API calls</p>
                          <p className="text-xs text-yellow-600">• Implement response templates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Completion Rate Optimization */}
                {analyticsData.completionRate < 80 && (
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800">Completion Rate Improvement</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Completion rate is {analyticsData.completionRate.toFixed(1)}%, below the 80% target.
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-red-600">• Improve state transitions</p>
                          <p className="text-xs text-red-600">• Better fallback handling</p>
                          <p className="text-xs text-red-600">• Enhanced intent recognition</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quality Score Optimization */}
                {analyticsData.averageQualityScore < 85 && (
                  <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Quality Score Enhancement</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Quality score is {analyticsData.averageQualityScore.toFixed(1)}/100, below the 85 target.
                        </p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-blue-600">• Enhance personalization algorithms</p>
                          <p className="text-xs text-blue-600">• Improve context preservation</p>
                          <p className="text-xs text-blue-600">• Add rich media support</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Stories */}
                <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Performance Highlights</h4>
                      <div className="mt-2 space-y-1">
                        {analyticsData.averageResponseTime <= 3 && (
                          <p className="text-xs text-green-600">✓ Response time within target</p>
                        )}
                        {analyticsData.completionRate >= 80 && (
                          <p className="text-xs text-green-600">✓ Completion rate above target</p>
                        )}
                        {analyticsData.averageQualityScore >= 85 && (
                          <p className="text-xs text-green-600">✓ Quality score above target</p>
                        )}
                        {analyticsData.userSatisfaction >= 4.0 && (
                          <p className="text-xs text-green-600">✓ User satisfaction above target</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
