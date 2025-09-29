import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  RefreshCw, 
  Search,
  BarChart3,
  Shield,
  Users,
  Clock,
  Target,
  Zap,
  BookOpen,
  MessageSquare
} from 'lucide-react';

interface KnowledgeStats {
  total_items: number;
  domains_covered: number;
  avg_confidence_threshold: number;
  oldest_item: string;
  newest_item: string;
}

interface DomainStats {
  [domain: string]: {
    item_count: number;
    avg_confidence_threshold: number;
    oldest_update: string;
    newest_update: string;
    data_sources: string[];
  };
}

interface FreshnessReport {
  summary: {
    total_items: number;
    stale_items: number;
    freshness_percentage: number;
    domains_needing_attention: string[];
  };
  detailed_report: {
    [domain: string]: {
      average_age_days: number;
      total_items: number;
      stale_items_count: number;
      status: 'FRESH' | 'AGING' | 'STALE';
    };
  };
}

interface PerformanceMetrics {
  knowledge_coverage: {
    overall_coverage_percent: number;
    domain_breakdown: {
      [domain: string]: {
        item_count: number;
        estimated_coverage: number;
      };
    };
  };
  response_accuracy: {
    overall_accuracy: number;
    accuracy_by_domain: { [domain: string]: number };
    trending: string;
  };
  user_satisfaction: {
    average_rating: number;
    rating_distribution: { [rating: string]: number };
    satisfaction_trend: string;
    nps_score: number;
  };
  bias_metrics: {
    overall_bias_score: number;
    bias_alerts_this_week: number;
    bias_items_addressed: number;
  };
}

interface QueryResult {
  success: boolean;
  query: string;
  match?: {
    id: string;
    domain: string;
    question: string;
    answer: string;
    confidence: number;
    tags: string[];
  };
  message?: string;
}

interface KnowledgeMonitoringDashboardProps {
  className?: string;
}

export const KnowledgeMonitoringDashboard: React.FC<KnowledgeMonitoringDashboardProps> = ({
  className = ''
}) => {
  const [stats, setStats] = useState<{ overall_stats: KnowledgeStats; domain_breakdown: DomainStats } | null>(null);
  const [freshnessReport, setFreshnessReport] = useState<FreshnessReport | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Query testing
  const [testQuery, setTestQuery] = useState('');
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
  const [queryLoading, setQueryLoading] = useState(false);

  const API_BASE = '/api/propguard/knowledge';

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data for development
      const mockStats = {
        total_items: 1247,
        domains_covered: 15,
        avg_confidence_threshold: 0.87,
        oldest_item: "2024-01-15T08:30:00Z",
        newest_item: "2024-03-25T14:22:00Z"
      };

      const mockDomainStats = {
        "real-estate": {
          item_count: 456,
          avg_confidence_threshold: 0.92,
          oldest_update: "2024-01-15T08:30:00Z",
          newest_update: "2024-03-25T14:22:00Z",
          data_sources: ["Property Listings", "Market Data", "Regulations"]
        },
        "legal": {
          item_count: 234,
          avg_confidence_threshold: 0.89,
          oldest_update: "2024-01-20T10:15:00Z",
          newest_update: "2024-03-20T16:45:00Z",
          data_sources: ["Legal Database", "Compliance Docs"]
        },
        "finance": {
          item_count: 189,
          avg_confidence_threshold: 0.85,
          oldest_update: "2024-02-01T09:00:00Z",
          newest_update: "2024-03-22T11:30:00Z",
          data_sources: ["Financial Reports", "Market Analysis"]
        },
        "technology": {
          item_count: 89,
          avg_confidence_threshold: 0.78,
          oldest_update: "2024-02-10T13:20:00Z",
          newest_update: "2024-03-18T14:15:00Z",
          data_sources: ["Tech Specs", "User Manuals"]
        }
      };

      const mockFreshnessReport = {
        summary: {
          total_items: 1247,
          stale_items: 156,
          freshness_percentage: 87.5,
          domains_needing_attention: ["legal", "finance"]
        },
        stale_by_domain: {
          "legal": 45,
          "finance": 67,
          "real-estate": 32,
          "technology": 12
        },
        recommended_actions: [
          "Update legal database from Q1 2024 regulations",
          "Refresh financial market data for current rates",
          "Sync property valuation models with latest assessments"
        ]
      };

      const mockPerformanceMetrics = {
        learning_curve: {
          accuracy_trend: 87.5,
          confidence_distribution: [0.12, 0.28, 0.35, 0.18, 0.07],
          learning_velocity: 2.3,
          plateau_detection: false
        },
        bottlenecks: {
          main_bottlenecks: [
            "Legal document processing takes 23% longer",
            "Financial data refresh causes 156 stale items",
            "Image processing overhead impacts response time"
          ],
          impact_levels: ["medium", "high", "low"],
          mitigation_strategies: [
            "Parallel legal doc processing",
            "Automated financial data sync",
            "Image compression optimization"
          ]
        },
        testing: {
          test_coverage: 94.2,
          bias_audit_score: 91.8,
          performance_score: 88.9,
          reliability_score: 96.1,
          last_bias_audit: "2024-03-20T10:00:00Z",
          next_scheduled_audit: "2024-04-20T10:00:00Z"
        }
      };

      // Set mock data
      setStats(mockStats);
      setDomainStats(mockDomainStats);
      setFreshnessReport(mockFreshnessReport);
      setPerformanceMetrics(mockPerformanceMetrics);

    } catch (err) {
      console.warn('Knowledge monitoring using mock data for development');
      setError(`Using demo data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Still load some data for demo
      const demoStats = {
        total_items: 1247,
        domains_covered: 15,
        avg_confidence_threshold: 0.87,
        oldest_item: "2024-01-15T08:30:00Z",
        newest_item: "2024-03-25T14:22:00Z"
      };
      setStats(demoStats);
      
    } finally {
      setLoading(false);
    }
  };

  const testKnowledgeQuery = async () => {
    if (!testQuery.trim()) return;

    setQueryLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock query result based on input
      const mockResult = {
        success: true,
        query: testQuery,
        matched_items: Math.floor(Math.random() * 20) + 5,
        avg_confidence: 0.85 + Math.random() * 0.1,
        response_time_ms: Math.floor(Math.random() * 200) + 100,
        source_domains: ['real-estate', 'legal', 'finance'].slice(0, Math.floor(Math.random() * 3) + 1),
        knowledge_gaps: testQuery.toLowerCase().includes('blockchain') ? ['Blockchain property tokens'] : [],
        recommendations: [
          'Consider adding more recent market data',
          'Review legal database for regulatory updates'
        ],
        message: `Query successful: Found ${Math.floor(Math.random() * 20) + 5} relevant knowledge items`
      };

      setQueryResult(mockResult);
      
    } catch (err) {
      console.warn('Query test using mock data for development');
      setQueryResult({
        success: false,
        query: testQuery,
        message: `Demo mode: ${err instanceof Error ? err.message : 'Unknown error'}`
      });
      
    } finally {
      setQueryLoading(false);
    }
  };

  const runBiasAudit = async () => {
    try {
      // Simulate bias audit processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful bias audit
      alert('✅ Bias audit completed successfully!\n\n• Bias Score: 91.8/100\n• Fairness Rating: Excellent\n• No detected biases\n• Full report available in Performance tab');
      
      // Refresh data to show updated metrics
      await fetchData();
      
    } catch (err) {
      console.warn('Bias audit using mock data for development');
      alert(`✅ Demo mode - Bias audit simulated successfully!\n\nBias Score: 91.8/100`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FRESH': return 'bg-green-500';
      case 'AGING': return 'bg-yellow-500';
      case 'STALE': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatPercentage = (value: number) => `${Math.round(value * 100) / 100}%`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Knowledge Base Monitoring
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage PropGuard AI's knowledge training system
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={fetchData} 
            disabled={loading}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={runBiasAudit} variant="outline">
            <Shield className="h-4 w-4 mr-2" />
            Run Bias Audit
          </Button>
        </div>
      </div>

      {/* Demo Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <strong>Demo Mode:</strong> This page is showing mock data for demonstration. In production, this would connect to real Sensay knowledge base APIs.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant={error.includes('Demo') ? 'default' : 'destructive'} className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            {error}
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="bottlenecks">Bottlenecks</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {stats && performanceMetrics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Knowledge Items</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.overall_stats.total_items}</div>
                  <p className="text-xs text-muted-foreground">
                    Across {stats.overall_stats.domains_covered} domains
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coverage</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {performanceMetrics.knowledge_coverage.overall_coverage_percent}%
                  </div>
                  <Progress 
                    value={performanceMetrics.knowledge_coverage.overall_coverage_percent} 
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatPercentage(performanceMetrics.response_accuracy.overall_accuracy * 100)}
                  </div>
                  <Badge variant={
                    performanceMetrics.response_accuracy.trending === 'improving' ? 'default' : 'secondary'
                  }>
                    {performanceMetrics.response_accuracy.trending}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">User Satisfaction</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {performanceMetrics.user_satisfaction.average_rating}/5
                  </div>
                  <p className="text-xs text-muted-foreground">
                    NPS: {performanceMetrics.user_satisfaction.nps_score}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* System Health Overview */}
          {freshnessReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  System Health Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Data Freshness</span>
                    <div className="flex items-center gap-2">
                      <Progress value={freshnessReport.summary.freshness_percentage} className="w-24" />
                      <span className="text-sm font-medium">
                        {freshnessReport.summary.freshness_percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {freshnessReport.summary.domains_needing_attention.length > 0 && (
                    <Alert className="border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-700">
                        Domains needing attention: {freshnessReport.summary.domains_needing_attention.join(', ')}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Knowledge Base Tab */}
        <TabsContent value="knowledge" className="space-y-6">
          {stats && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.overall_stats.total_items}</div>
                      <div className="text-sm text-muted-foreground">Total Items</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.overall_stats.domains_covered}</div>
                      <div className="text-sm text-muted-foreground">Domains</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{stats.overall_stats.avg_confidence_threshold}</div>
                      <div className="text-sm text-muted-foreground">Avg Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{formatDate(stats.overall_stats.newest_item)}</div>
                      <div className="text-sm text-muted-foreground">Latest Update</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Domain Breakdown</h3>
                    {Object.entries(stats.domain_breakdown).map(([domain, data]) => (
                      <Card key={domain}>
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{domain.replace('_', ' ').toUpperCase()}</h4>
                            <Badge>{data.item_count} items</Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Confidence: </span>
                              {data.avg_confidence_threshold}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Update: </span>
                              {formatDate(data.newest_update)}
                            </div>
                            <div>
                              <span className="text-muted-foreground">Sources: </span>
                              {data.data_sources.length}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          {performanceMetrics && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Coverage Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Overall Coverage</span>
                          <span className="text-sm font-medium">
                            {performanceMetrics.knowledge_coverage.overall_coverage_percent}%
                          </span>
                        </div>
                        <Progress value={performanceMetrics.knowledge_coverage.overall_coverage_percent} />
                      </div>
                      
                      {Object.entries(performanceMetrics.knowledge_coverage.domain_breakdown).map(([domain, data]) => (
                        <div key={domain}>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{domain.replace('_', ' ')}</span>
                            <span className="text-sm font-medium">{data.estimated_coverage}%</span>
                          </div>
                          <Progress value={data.estimated_coverage} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Accuracy Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {formatPercentage(performanceMetrics.response_accuracy.overall_accuracy * 100)}
                        </div>
                        <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                        <Badge className="mt-2" variant={
                          performanceMetrics.response_accuracy.trending === 'improving' ? 'default' : 'secondary'
                        }>
                          {performanceMetrics.response_accuracy.trending}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-3xl font-bold">
                          {performanceMetrics.user_satisfaction.average_rating}
                        </div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                      
                      <div className="space-y-1">
                        {Object.entries(performanceMetrics.user_satisfaction.rating_distribution).map(([rating, count]) => (
                          <div key={rating} className="flex justify-between text-sm">
                            <span>{rating} stars</span>
                            <span>{count}%</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="text-center pt-2 border-t">
                        <div className="text-lg font-semibold">NPS: {performanceMetrics.user_satisfaction.nps_score}</div>
                        <Badge variant={
                          performanceMetrics.user_satisfaction.satisfaction_trend === 'improving' ? 'default' : 'secondary'
                        }>
                          {performanceMetrics.user_satisfaction.satisfaction_trend}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bias Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Bias Detection Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {formatPercentage(performanceMetrics.bias_metrics.overall_bias_score * 100)}
                      </div>
                      <div className="text-sm text-muted-foreground">Bias Score</div>
                      <Badge variant={
                        performanceMetrics.bias_metrics.overall_bias_score < 0.2 ? 'default' : 'destructive'
                      }>
                        {performanceMetrics.bias_metrics.overall_bias_score < 0.2 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{performanceMetrics.bias_metrics.bias_alerts_this_week}</div>
                      <div className="text-sm text-muted-foreground">Alerts This Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{performanceMetrics.bias_metrics.bias_items_addressed}</div>
                      <div className="text-sm text-muted-foreground">Items Addressed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* Bottlenecks Tab */}
        <TabsContent value="bottlenecks" className="space-y-6">
          {freshnessReport && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Data Freshness Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{freshnessReport.summary.total_items}</div>
                    <div className="text-sm text-muted-foreground">Total Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{freshnessReport.summary.stale_items}</div>
                    <div className="text-sm text-muted-foreground">Stale Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{freshnessReport.summary.freshness_percentage}%</div>
                    <div className="text-sm text-muted-foreground">Freshness</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{freshnessReport.summary.domains_needing_attention.length}</div>
                    <div className="text-sm text-muted-foreground">Domains at Risk</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Domain Status</h3>
                  {Object.entries(freshnessReport.detailed_report).map(([domain, data]) => (
                    <Card key={domain}>
                      <CardContent className="pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{domain.replace('_', ' ').toUpperCase()}</h4>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(data.status)}`}></div>
                            <Badge variant={data.status === 'FRESH' ? 'default' : data.status === 'AGING' ? 'secondary' : 'destructive'}>
                              {data.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Items: </span>
                            {data.total_items}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Age: </span>
                            {Math.round(data.average_age_days)} days
                          </div>
                          <div>
                            <span className="text-muted-foreground">Stale: </span>
                            {data.stale_items_count}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Knowledge Query Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="test-query">Test Query</Label>
                  <Input
                    id="test-query"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="Enter a question to test the knowledge base..."
                    onKeyPress={(e) => e.key === 'Enter' && testKnowledgeQuery()}
                  />
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={testKnowledgeQuery} 
                    disabled={queryLoading || !testQuery.trim()}
                  >
                    <Search className={`h-4 w-4 mr-2 ${queryLoading ? 'animate-spin' : ''}`} />
                    Test Query
                  </Button>
                </div>
              </div>

              {queryResult && (
                <Card className={`border-2 ${queryResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {queryResult.success ? 
                        <CheckCircle className="h-5 w-5 text-green-600" /> : 
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      }
                      Query Result
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <strong>Query:</strong> {queryResult.query}
                      </div>
                      
                      {queryResult.success && queryResult.match ? (
                        <>
                          <div>
                            <strong>Match ID:</strong> {queryResult.match.id}
                          </div>
                          <div>
                            <strong>Domain:</strong> 
                            <Badge className="ml-2">{queryResult.match.domain}</Badge>
                          </div>
                          <div>
                            <strong>Confidence:</strong> {Math.round(queryResult.match.confidence * 100)}%
                          </div>
                          <div>
                            <strong>Question:</strong> {queryResult.match.question}
                          </div>
                          <div>
                            <strong>Answer:</strong>
                            <div className="mt-2 p-3 bg-white rounded border">
                              {queryResult.match.answer}
                            </div>
                          </div>
                          {queryResult.match.tags.length > 0 && (
                            <div>
                              <strong>Tags:</strong>
                              <div className="flex gap-1 mt-1">
                                {queryResult.match.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-red-700">
                          <strong>Message:</strong> {queryResult.message}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeMonitoringDashboard;
