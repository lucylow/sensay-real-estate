import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  DollarSign,
  Globe,
  Target,
  Star,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Home,
  Shield
} from 'lucide-react';
import { 
  mockAnalyticsData,
  mockAgentMetrics,
  mockSuccessStories,
  mockLeadData,
  mockMarketIntelligence
} from '@/data/sensayRealEstateMockData';

interface SensayAnalyticsDashboardProps {
  className?: string;
}

export const SensayAnalyticsDashboard: React.FC<SensayAnalyticsDashboardProps> = ({
  className = ''
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  const renderOverviewMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockAnalyticsData.conversationAnalytics.totalConversations.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +18% from last month
          </p>
          <div className="mt-2">
            <Badge variant="secondary" className="text-xs">
              {mockAnalyticsData.conversationAnalytics.uniqueUsers.toLocaleString()} unique users
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mockAnalyticsData.leadGenerationMetrics.qualifiedLeads}
          </div>
          <p className="text-xs text-muted-foreground">
            {(mockAnalyticsData.leadGenerationMetrics.conversionRate * 100).toFixed(0)}% conversion rate
          </p>
          <div className="mt-2">
            <Progress value={mockAnalyticsData.leadGenerationMetrics.conversionRate * 100} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${(mockAnalyticsData.businessImpact.estimatedRevenueGenerated / 1000000).toFixed(1)}M
          </div>
          <p className="text-xs text-muted-foreground">
            Avg deal: ${mockAnalyticsData.businessImpact.avgDealSize.toLocaleString()}
          </p>
          <div className="mt-2">
            <Badge variant="default" className="text-xs">
              ROI: {mockAnalyticsData.businessImpact.marketingROI.toFixed(1)}x
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">AI Accuracy</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(mockAnalyticsData.conversationAnalytics.intentAccuracy * 100).toFixed(0)}%
          </div>
          <p className="text-xs text-muted-foreground">
            Intent recognition
          </p>
          <div className="mt-2">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span className="text-xs">High accuracy</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlatformPerformance = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Multi-Platform Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(mockAnalyticsData.leadGenerationMetrics.leadsBySource).map(([platform, count]) => {
            const maxCount = Math.max(...Object.values(mockAnalyticsData.leadGenerationMetrics.leadsBySource));
            const percentage = (count / maxCount) * 100;
            
            return (
              <div key={platform} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      platform === 'website' ? 'bg-blue-500' :
                      platform === 'whatsapp' ? 'bg-green-500' :
                      platform === 'telegram' ? 'bg-blue-400' :
                      platform === 'discord' ? 'bg-purple-500' :
                      'bg-gray-500'
                    }`} />
                    <span className="capitalize font-medium">{platform}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{count} leads</span>
                    <Badge variant="outline" className="text-xs">
                      {((count / mockAnalyticsData.leadGenerationMetrics.totalLeads) * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const renderAgentProductivity = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Productivity Increase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">+75%</div>
            <p className="text-sm text-gray-600">Average across agents</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Time Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">73%</div>
            <p className="text-sm text-gray-600">Qualification time reduced</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">86%</div>
            <p className="text-sm text-gray-600">Monthly revenue increase</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agent Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAgentMetrics.map((agent) => (
              <div key={agent.agentId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-gray-600">{agent.specialization}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{agent.improvements.clientSatisfaction}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Leads/Month</p>
                    <p className="font-semibold">
                      {agent.beforeSensay.leadsPerMonth} → {agent.afterSensay.leadsPerMonth}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      +{Math.round((agent.afterSensay.leadsPerMonth / agent.beforeSensay.leadsPerMonth - 1) * 100)}%
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Qualification Time</p>
                    <p className="font-semibold">
                      {agent.beforeSensay.qualificationTime}m → {agent.afterSensay.qualificationTime}m
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      -{Math.round((1 - agent.afterSensay.qualificationTime / agent.beforeSensay.qualificationTime) * 100)}%
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Monthly Revenue</p>
                    <p className="font-semibold">
                      ${agent.afterSensay.monthlyRevenue.toLocaleString()}
                    </p>
                    <Badge variant="default" className="text-xs">
                      +{Math.round(agent.improvements.revenueGrowth * 100)}%
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Closing Rate</p>
                    <p className="font-semibold">
                      {(agent.afterSensay.closingRate * 100).toFixed(0)}%
                    </p>
                    <Badge variant="outline" className="text-xs">
                      +{Math.round(agent.improvements.closingRateImprovement * 100)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-3 p-2 bg-gray-50 rounded text-sm italic">
                  "{agent.testimonial}"
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSuccessStories = () => (
    <div className="space-y-4">
      {mockSuccessStories.map((story) => (
        <Card key={story.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{story.clientName}</CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">{story.clientType}</Badge>
                <Badge variant="outline">{story.timeline}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Outcome</h4>
                <p className="text-sm mb-3">{story.outcome}</p>
                
                {story.savings && (
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Saved: ${story.savings.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 mb-2">
                  <Home className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">{story.propertyDetails?.address}</span>
                </div>
                
                {story.propertyDetails?.propGuardScore && (
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">PropGuard Score: {story.propertyDetails.propGuardScore}/10</span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Client Testimonial</h4>
                <blockquote className="text-sm italic bg-gray-50 p-3 rounded">
                  "{story.testimonial}"
                </blockquote>
                
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Chatbot Interactions:</span>
                    <span className="font-medium">{story.chatbotInteractions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Properties Viewed:</span>
                    <span className="font-medium">{story.propertiesViewed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Lead Score:</span>
                    <span className="font-medium">{story.leadScore}/100</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderMarketIntelligence = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(mockMarketIntelligence.cityAnalytics).map(([city, data]) => (
          <Card key={city}>
            <CardHeader>
              <CardTitle className="text-sm capitalize">{city.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold">${data.medianPrice.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">Median Price</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Year Change:</span>
                  <Badge variant={data.priceChange1Year > 0 ? "default" : "secondary"}>
                    {data.priceChange1Year > 0 ? '+' : ''}{(data.priceChange1Year * 100).toFixed(1)}%
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Days on Market:</span>
                  <span className="font-medium">{data.daysOnMarket}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Condition:</span>
                  <Badge variant="outline" className="text-xs">
                    {data.marketCondition.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predictive Market Modeling</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Next Quarter Predictions</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(mockMarketIntelligence.predictiveModeling.nextQuarter).map(([city, prediction]) => (
                  <div key={city} className="p-3 border rounded">
                    <p className="font-medium capitalize">{city.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm">
                      Price Change: <span className="font-semibold text-green-600">
                        +{(prediction.priceChange * 100).toFixed(1)}%
                      </span>
                    </p>
                    <p className="text-xs text-gray-600">
                      Confidence: {(prediction.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Sensay Real Estate Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive performance analytics and business intelligence
          </p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe)}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview Metrics */}
      {renderOverviewMetrics()}

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="platforms" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="agents">Agent Productivity</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
          <TabsTrigger value="market">Market Intelligence</TabsTrigger>
          <TabsTrigger value="leads">Lead Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          {renderPlatformPerformance()}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(mockAnalyticsData.conversationAnalytics.languageDistribution).map(([language, percentage]) => (
                    <div key={language} className="flex items-center justify-between">
                      <span className="text-sm capitalize">{language}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={percentage * 100} className="w-16 h-2" />
                        <span className="text-xs">{(percentage * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Top Intents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockAnalyticsData.conversationAnalytics.topIntents.slice(0, 4).map((intent) => (
                    <div key={intent.intent} className="flex items-center justify-between">
                      <span className="text-sm">{intent.intent.replace('_', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {intent.count}
                        </Badge>
                        <span className="text-xs text-green-600">
                          {(intent.accuracy * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          {renderAgentProductivity()}
        </TabsContent>

        <TabsContent value="success" className="space-y-4">
          {renderSuccessStories()}
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          {renderMarketIntelligence()}
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lead Quality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(mockAnalyticsData.leadGenerationMetrics.leadQualityDistribution).map(([quality, percentage]) => (
                    <div key={quality} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm capitalize">{quality}</span>
                        <span className="text-sm font-medium">{(percentage * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={percentage * 100} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Lead Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Leads</span>
                    <span className="font-medium">{mockAnalyticsData.leadGenerationMetrics.totalLeads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Qualified Leads</span>
                    <span className="font-medium">{mockAnalyticsData.leadGenerationMetrics.qualifiedLeads}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Appointments</span>
                    <span className="font-medium">{mockAnalyticsData.businessImpact.appointmentsScheduled}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show Rate</span>
                    <Badge variant="default">
                      {(mockAnalyticsData.businessImpact.appointmentShowRate * 100).toFixed(0)}%
                    </Badge>
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
