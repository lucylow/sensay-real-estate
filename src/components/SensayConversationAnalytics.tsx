import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart3, 
  TrendingUp, 
  MessageSquare, 
  Globe, 
  Users, 
  Activity,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { sensayConversationService } from '@/services/sensayConversationService';

interface SensayConversationAnalyticsProps {
  replicaUUID?: string;
  className?: string;
}

interface ConversationSummary {
  totalConversations: number;
  totalSources: number;
  averageDailyGrowth: number;
  topSource: { source: string; conversations: number } | null;
  growthTrend: 'increasing' | 'decreasing' | 'stable';
}

export const SensayConversationAnalytics: React.FC<SensayConversationAnalyticsProps> = ({ 
  replicaUUID = 'f0e4c2f7-ae27-4b35-89bf-7cf729a73687', // Default replica UUID
  className = '' 
}) => {
  const [summary, setSummary] = useState<ConversationSummary | null>(null);
  const [historicalData, setHistoricalData] = useState<any>(null);
  const [sourceData, setSourceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    loadAnalytics();
  }, [replicaUUID]);

  const loadAnalytics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [summaryData, analyticsData] = await Promise.all([
        sensayConversationService.getConversationSummary(replicaUUID),
        sensayConversationService.getComprehensiveAnalytics(replicaUUID)
      ]);

      setSummary(summaryData);
      setHistoricalData(analyticsData.historical);
      setSourceData(analyticsData.sources);
      setLastRefresh(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
      console.error('Analytics loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = () => {
    loadAnalytics();
  };

  const getGrowthTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing':
        return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getGrowthTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing':
        return 'text-green-600 bg-green-50';
      case 'decreasing':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin" />
            <span>Loading conversation analytics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        <Button onClick={refreshAnalytics} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sensay Conversation Analytics</h2>
          <p className="text-gray-600">Real-time insights into conversation patterns and usage</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            Last updated: {lastRefresh.toLocaleTimeString()}
          </span>
          <Button onClick={refreshAnalytics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalConversations.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                All time conversations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Growth</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.averageDailyGrowth}</div>
              <p className="text-xs text-muted-foreground">
                Average new conversations per day
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Trend</CardTitle>
              {getGrowthTrendIcon(summary.growthTrend)}
            </CardHeader>
            <CardContent>
              <Badge className={getGrowthTrendColor(summary.growthTrend)}>
                {summary.growthTrend}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">
                Conversation growth direction
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Source</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">
                {summary.topSource?.source || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {summary.topSource?.conversations || 0} conversations
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics Tabs */}
      <Tabs defaultValue="historical" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="historical" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Historical Trends</span>
          </TabsTrigger>
          <TabsTrigger value="sources" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Source Distribution</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="historical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversation Growth Over Time</CardTitle>
              <CardDescription>
                Cumulative conversation count over the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {historicalData?.chartData ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData.chartData.labels.map((date: string, index: number) => ({
                      date,
                      conversations: historicalData.chartData.datasets[0].data[index]
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date" 
                        tickFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                        formatter={(value: number) => [value.toLocaleString(), 'Conversations']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="conversations" 
                        stroke={historicalData.chartData.datasets[0].borderColor}
                        strokeWidth={2}
                        dot={{ fill: historicalData.chartData.datasets[0].borderColor }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No historical data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Daily Growth Table */}
          {historicalData?.dailyGrowth && historicalData.dailyGrowth.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Daily Growth</CardTitle>
                <CardDescription>
                  New conversations per day (last 7 days)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {historicalData.dailyGrowth.slice(-7).map((day: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="outline">
                        +{day.newConversations} conversations
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversations by Source</CardTitle>
              <CardDescription>
                Distribution of conversations across different platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sourceData?.chartData ? (
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData.chartData.labels.map((label: string, index: number) => ({
                          name: label,
                          value: sourceData.chartData.datasets[0].data[index]
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {sourceData.chartData.labels.map((_: string, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Conversations']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No source data available</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Source Details */}
          {sourceData?.percentages && sourceData.percentages.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Source Breakdown</CardTitle>
                <CardDescription>
                  Detailed breakdown of conversation sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sourceData.percentages.map((source: any, index: number) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium capitalize">{source.source}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">
                          {source.conversations.toLocaleString()} conversations
                        </span>
                        <Badge variant="outline">
                          {source.percentage}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Organization ID Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Sensay API Integration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Organization ID:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                E0b1218c-e817-4994-a45b-43e092bd6d4b
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Replica UUID:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                {replicaUUID}
              </code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">API Version:</span>
              <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                2025-03-25
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SensayConversationAnalytics;
