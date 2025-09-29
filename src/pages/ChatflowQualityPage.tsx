import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bot, BarChart3, Zap, Target, MessageSquare, Clock, 
  Star, Users, TrendingUp, Settings, Activity, CheckCircle
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { QualityControlledAssistant } from '@/components/QualityControlledAssistant';
import { ConversationAnalyticsDashboard } from '@/components/ConversationAnalyticsDashboard';
import { ChatFlowQualityEngine, ConversationState, ConversationMetrics } from '@/services/chatflow/qualityEngine';

export const ChatflowQualityPage: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('assistant');
  const [qualityEngine] = useState(() => new ChatFlowQualityEngine(t));
  const [currentMetrics, setCurrentMetrics] = useState<ConversationMetrics | null>(null);
  const [currentState, setCurrentState] = useState<ConversationState>(ConversationState.GREETING);

  const handleQualityMetrics = (metrics: ConversationMetrics) => {
    setCurrentMetrics(metrics);
  };

  const handleStateChange = (state: ConversationState) => {
    setCurrentState(state);
  };

  const getQualityRating = (score?: number) => {
    if (!score) return { label: 'Unknown', color: 'text-gray-500' };
    if (score >= 90) return { label: t('chatflow.quality.excellent'), color: 'text-green-600' };
    if (score >= 70) return { label: t('chatflow.quality.good'), color: 'text-blue-600' };
    if (score >= 50) return { label: t('chatflow.quality.fair'), color: 'text-yellow-600' };
    return { label: t('chatflow.quality.poor'), color: 'text-red-600' };
  };

  const overallScore = currentMetrics ? 
    (currentMetrics.confidenceScore + currentMetrics.personalizationScore + currentMetrics.engagementLevel) / 3 : 0;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Chatflow Quality Engine</h1>
          <Badge variant="secondary" className="text-sm">
            PropGuard AI
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Advanced conversation quality control with real-time analytics, intelligent state management, 
          and continuous improvement for superior user experiences in real estate applications.
        </p>
      </div>

      {/* Quality Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Quality Score</h3>
            <p className="text-2xl font-bold text-primary">{overallScore.toFixed(1)}/100</p>
            <p className={`text-sm ${getQualityRating(overallScore).color}`}>
              {getQualityRating(overallScore).label}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Response Time</h3>
            <p className="text-2xl font-bold text-primary">
              {currentMetrics?.responseTime?.toFixed(1) || '0.0'}s
            </p>
            <p className="text-sm text-muted-foreground">Target: &lt;3s</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Engagement</h3>
            <p className="text-2xl font-bold text-primary">
              {currentMetrics?.engagementLevel?.toFixed(1) || '0'}%
            </p>
            <p className="text-sm text-muted-foreground">User Interaction</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">State</h3>
            <p className="text-lg font-bold text-primary">
              {currentState.replace('_', ' ').toUpperCase()}
            </p>
            <p className="text-sm text-muted-foreground">Current Flow</p>
          </CardContent>
        </Card>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Intelligent State Management</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Dynamic conversation flow with smooth transitions between states, 
              ensuring natural and engaging user experiences.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Context-aware transitions</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Fallback handling</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Intent recognition</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Real-time Analytics</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Comprehensive quality metrics and performance monitoring 
              with actionable insights for continuous improvement.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Quality scoring</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Performance tracking</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Drop-off analysis</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Personalization Engine</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Context-aware responses with user preference learning 
              and adaptive conversation strategies.
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>User profiling</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Preference learning</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Adaptive responses</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="features" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Features
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assistant" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality-Controlled Assistant */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Interactive Quality-Controlled Assistant</h2>
              <QualityControlledAssistant
                userId="demo_user"
                onQualityMetrics={handleQualityMetrics}
                onStateChange={handleStateChange}
                className="h-[600px]"
              />
            </div>

            {/* Quality Metrics Display */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Real-time Quality Metrics</h2>
              
              {currentMetrics ? (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Current Session Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Confidence Score</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${currentMetrics.confidenceScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{currentMetrics.confidenceScore.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Engagement Level</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${currentMetrics.engagementLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{currentMetrics.engagementLevel.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Personalization</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${currentMetrics.personalizationScore}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{currentMetrics.personalizationScore.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time</span>
                        <span className="text-sm font-medium">{currentMetrics.responseTime.toFixed(1)}s</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Message Length</span>
                        <span className="text-sm font-medium">{currentMetrics.messageLength} chars</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Quality Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Overall Quality</span>
                          <Badge variant={overallScore >= 85 ? "default" : overallScore >= 70 ? "secondary" : "destructive"}>
                            {getQualityRating(overallScore).label}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">User Sentiment</span>
                          <span className={`text-sm font-medium ${
                            currentMetrics.userSentiment > 0.6 ? 'text-green-600' : 
                            currentMetrics.userSentiment < 0.4 ? 'text-red-600' : 'text-yellow-600'
                          }`}>
                            {currentMetrics.userSentiment > 0.6 ? 'Positive' : 
                             currentMetrics.userSentiment < 0.4 ? 'Negative' : 'Neutral'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Clarification Requests</span>
                          <span className="text-sm font-medium">{currentMetrics.clarificationRequests}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    Start a conversation to see quality metrics
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <ConversationAnalyticsDashboard 
            qualityEngine={qualityEngine}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="features" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quality Control Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quality Control Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Message Clarity Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time analysis of message clarity, completeness, and ambiguity detection.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Intent Recognition</h4>
                      <p className="text-sm text-muted-foreground">
                        Advanced intent detection with confidence scoring and fallback handling.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Sentiment Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Real-time sentiment detection to adapt responses and improve user experience.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Entity Extraction</h4>
                      <p className="text-sm text-muted-foreground">
                        Automatic extraction of budget, location, property type, and other key entities.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conversation Flow Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Conversation Flow Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">State Management</h4>
                      <p className="text-sm text-muted-foreground">
                        Intelligent conversation state tracking with smooth transitions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Progressive Disclosure</h4>
                      <p className="text-sm text-muted-foreground">
                        Gradual information gathering to avoid overwhelming users.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Context Preservation</h4>
                      <p className="text-sm text-muted-foreground">
                        Maintains conversation context across multiple interactions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Fallback Strategies</h4>
                      <p className="text-sm text-muted-foreground">
                        Intelligent fallback options when intent is unclear or incomplete.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Analytics & Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Real-time Metrics</h4>
                      <p className="text-sm text-muted-foreground">
                        Live quality scoring, response time tracking, and engagement monitoring.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Flow Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Conversation flow visualization and drop-off point identification.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Trend Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Historical quality trends and performance pattern analysis.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Optimization Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        AI-powered suggestions for improving conversation quality and user experience.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Integration Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Integration & Customization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Sensay API Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Seamless integration with Sensay Wisdom Engine for enhanced AI capabilities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Multi-language Support</h4>
                      <p className="text-sm text-muted-foreground">
                        Full internationalization support with dynamic language switching.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">Customizable Templates</h4>
                      <p className="text-sm text-muted-foreground">
                        Flexible conversation templates for different use cases and industries.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">API & Webhooks</h4>
                      <p className="text-sm text-muted-foreground">
                        Comprehensive API for custom integrations and real-time webhook support.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Chatflow Quality Engine</h3>
            <p className="text-sm text-muted-foreground">
              Advanced conversation quality control system for PropGuard AI. 
              Built with Sensay Wisdom Engine integration, real-time analytics, 
              and continuous improvement capabilities for superior user experiences.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button variant="outline" size="sm">
                View Documentation
              </Button>
              <Button variant="outline" size="sm">
                API Reference
              </Button>
              <Button variant="outline" size="sm">
                Integration Guide
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatflowQualityPage;
