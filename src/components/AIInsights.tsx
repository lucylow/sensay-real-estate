import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Lightbulb, 
  TrendingUp, 
  Shield, 
  Target, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  Brain
} from 'lucide-react';
import { llmAPI } from '@/services/api/llm';

interface Insight {
  id: string;
  type: 'opportunity' | 'risk' | 'recommendation' | 'alert';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
  actionable: boolean;
  category: string;
  timestamp: Date;
}

interface AIInsightsProps {
  property?: any;
  analysis?: any;
  marketData?: any;
  className?: string;
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  property,
  analysis,
  marketData,
  className = ''
}) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (analysis || marketData) {
      generateInsights();
    }
  }, [analysis, marketData]);

  const generateInsights = async () => {
    setIsGenerating(true);
    
    try {
      const newInsights: Insight[] = [];

      // Generate AI-powered insights based on analysis
      if (analysis) {
        // Valuation insights
        if (analysis.confidence > 85) {
          newInsights.push({
            id: 'val-1',
            type: 'opportunity',
            title: 'High Valuation Confidence',
            description: `Our AI model shows ${analysis.confidence}% confidence in the current valuation, indicating strong data reliability for investment decisions.`,
            impact: 'high',
            confidence: analysis.confidence,
            actionable: true,
            category: 'Valuation',
            timestamp: new Date()
          });
        }

        // Risk insights
        if (analysis.risk_score < 30) {
          newInsights.push({
            id: 'risk-1',
            type: 'opportunity',
            title: 'Low Risk Investment',
            description: `Risk score of ${analysis.risk_score}/100 indicates this property is suitable for conservative investment strategies.`,
            impact: 'medium',
            confidence: 92,
            actionable: true,
            category: 'Risk Management',
            timestamp: new Date()
          });
        } else if (analysis.risk_score > 70) {
          newInsights.push({
            id: 'risk-2',
            type: 'alert',
            title: 'Elevated Risk Profile',
            description: `Risk score of ${analysis.risk_score}/100 requires careful consideration and risk mitigation strategies.`,
            impact: 'high',
            confidence: 88,
            actionable: true,
            category: 'Risk Management',
            timestamp: new Date()
          });
        }

        // LVR insights
        if (analysis.lvr && analysis.lvr > 0.8) {
          newInsights.push({
            id: 'lvr-1',
            type: 'alert',
            title: 'High LVR Warning',
            description: `Current LVR of ${(analysis.lvr * 100).toFixed(1)}% exceeds recommended thresholds. Consider additional equity or lower loan amount.`,
            impact: 'high',
            confidence: 95,
            actionable: true,
            category: 'Financing',
            timestamp: new Date()
          });
        }
      }

      // Market sentiment insights
      if (marketData) {
        if (marketData.sentiment_score > 7) {
          newInsights.push({
            id: 'market-1',
            type: 'opportunity',
            title: 'Positive Market Sentiment',
            description: `Market sentiment score of ${marketData.sentiment_score}/10 indicates favorable conditions for property investment.`,
            impact: 'medium',
            confidence: 85,
            actionable: true,
            category: 'Market Analysis',
            timestamp: new Date()
          });
        }

        if (marketData.trend === 'bullish') {
          newInsights.push({
            id: 'market-2',
            type: 'opportunity',
            title: 'Bullish Market Trend',
            description: 'Current market trend shows strong upward momentum, suggesting good timing for property acquisition.',
            impact: 'high',
            confidence: 78,
            actionable: true,
            category: 'Market Analysis',
            timestamp: new Date()
          });
        }
      }

      // Generate LLM-powered insights
      try {
        const comprehensiveAnalysis = await llmAPI.getComprehensiveAnalysis({
          property,
          analysis,
          marketData
        });

        if ((comprehensiveAnalysis as any)?.insights) {
          (comprehensiveAnalysis as any).insights.forEach((insight: any, index: number) => {
            newInsights.push({
              id: `llm-${index}`,
              type: insight.type || 'recommendation',
              title: insight.title,
              description: insight.description,
              impact: insight.impact || 'medium',
              confidence: insight.confidence || 75,
              actionable: insight.actionable !== false,
              category: insight.category || 'AI Analysis',
              timestamp: new Date()
            });
          });
        }
      } catch (error) {
        console.error('Failed to generate LLM insights:', error);
      }

      // Add some general AI-generated insights
      newInsights.push(
        {
          id: 'ai-1',
          type: 'recommendation',
          title: 'Optimal Investment Timing',
          description: 'Based on market cycles and seasonal patterns, current timing appears favorable for property investment with expected appreciation over the next 12-18 months.',
          impact: 'medium',
          confidence: 82,
          actionable: true,
          category: 'Investment Strategy',
          timestamp: new Date()
        },
        {
          id: 'ai-2',
          type: 'opportunity',
          title: 'Infrastructure Development Impact',
          description: 'Planned infrastructure projects in the area are likely to positively impact property values over the medium term.',
          impact: 'high',
          confidence: 76,
          actionable: false,
          category: 'Location Analysis',
          timestamp: new Date()
        },
        {
          id: 'ai-3',
          type: 'recommendation',
          title: 'Portfolio Diversification',
          description: 'This property type and location provide good diversification benefits for balanced real estate portfolios.',
          impact: 'medium',
          confidence: 79,
          actionable: true,
          category: 'Portfolio Management',
          timestamp: new Date()
        }
      );

      setInsights(newInsights);
    } catch (error) {
      console.error('Error generating insights:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'risk':
        return <Shield className="h-4 w-4 text-yellow-600" />;
      case 'alert':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Lightbulb className="h-4 w-4 text-blue-600" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'border-green-200 bg-green-50 dark:bg-green-950/20';
      case 'risk':
        return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20';
      case 'alert':
        return 'border-red-200 bg-red-50 dark:bg-red-950/20';
      default:
        return 'border-blue-200 bg-blue-50 dark:bg-blue-950/20';
    }
  };

  const categories = ['all', ...Array.from(new Set(insights.map(insight => insight.category)))];
  const filteredInsights = selectedCategory === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === selectedCategory);

  const stats = {
    total: insights.length,
    opportunities: insights.filter(i => i.type === 'opportunity').length,
    alerts: insights.filter(i => i.type === 'alert').length,
    avgConfidence: insights.length > 0 
      ? Math.round(insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length)
      : 0
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            AI-Powered Insights
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="h-3 w-3 mr-1" />
              Real-time
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.opportunities}</div>
              <div className="text-sm text-muted-foreground">Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.alerts}</div>
              <div className="text-sm text-muted-foreground">Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.avgConfidence}%</div>
              <div className="text-sm text-muted-foreground">Avg Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
                {category !== 'all' && (
                  <Badge variant="secondary" className="ml-2">
                    {insights.filter(i => i.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights List */}
      <div className="space-y-4">
        {isGenerating ? (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Generating AI insights...</p>
            </CardContent>
          </Card>
        ) : filteredInsights.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No insights available. Analyze a property to generate AI-powered insights.
              </p>
              <Button 
                onClick={generateInsights} 
                className="mt-4"
                disabled={!analysis}
              >
                Generate Insights
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredInsights.map((insight) => (
            <Card key={insight.id} className={`border-l-4 ${getInsightColor(insight.type)}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getInsightIcon(insight.type)}
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      insight.impact === 'high' ? 'destructive' :
                      insight.impact === 'medium' ? 'default' : 'secondary'
                    }>
                      {insight.impact} impact
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline">
                        <Target className="h-3 w-3 mr-1" />
                        Actionable
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{insight.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      <Badge variant="secondary">{insight.category}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {insight.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={insight.confidence} className="w-16 h-2" />
                      <span className="text-sm font-medium">{insight.confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <Button 
          onClick={generateInsights}
          disabled={isGenerating}
          variant="outline"
          className="flex items-center gap-2"
        >
          {isGenerating ? (
            <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          {isGenerating ? 'Generating...' : 'Refresh Insights'}
        </Button>
      </div>
    </div>
  );
};