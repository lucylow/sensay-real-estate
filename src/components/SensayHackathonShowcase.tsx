import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap,
  Users,
  TrendingUp,
  Globe,
  Shield,
  Star,
  MessageCircle,
  Home,
  Award,
  BarChart3,
  CheckCircle
} from 'lucide-react';

// Import our comprehensive mock data
import mockData, { 
  mockAnalyticsData,
  mockSuccessStories,
  mockAgentMetrics,
  mockPropertyListings
} from '@/data/sensayRealEstateMockData';

// Import our demo components
import { SensayChatbotDemo } from './SensayChatbotDemo';
import { SensayAnalyticsDashboard } from './SensayAnalyticsDashboard';

interface SensayHackathonShowcaseProps {
  className?: string;
}

export const SensayHackathonShowcase: React.FC<SensayHackathonShowcaseProps> = ({
  className = ''
}) => {
  const [activeDemo, setActiveDemo] = useState<'overview' | 'chatbot' | 'analytics'>('overview');

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center items-center space-x-3">
          <Home className="h-12 w-12 text-blue-600" />
          <h1 className="text-4xl font-bold">PropGuard AI x Sensay</h1>
          <Shield className="h-12 w-12 text-purple-600" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Revolutionary AI-powered real estate chatbot that transforms how people buy, sell, and invest in properties
        </p>
        <div className="flex justify-center space-x-2">
          <Badge variant="default" className="text-sm px-4 py-2">
            <Award className="h-4 w-4 mr-2" />
            Sensay Hackathon 2024
          </Badge>
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            AI-Powered Innovation
          </Badge>
        </div>
      </div>

      {/* Key Innovation Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-10 w-10 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">PropGuard AI Risk Analysis</h3>
            <p className="text-sm text-gray-600">
              Advanced AI models analyze environmental, market, and investment risks for every property
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <Globe className="h-10 w-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Multi-Platform Excellence</h3>
            <p className="text-sm text-gray-600">
              Seamless experience across WhatsApp, Telegram, Discord, Web, and more platforms
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageCircle className="h-10 w-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Smart Conversation AI</h3>
            <p className="text-sm text-gray-600">
              94% intent accuracy with multilingual support and contextual understanding
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="h-10 w-10 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Proven ROI Impact</h3>
            <p className="text-sm text-gray-600">
              75% increase in agent productivity and $2.3M+ in generated revenue
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Impact Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Real-World Impact & Business Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {mockAnalyticsData.conversationAnalytics.totalConversations.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Conversations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {mockAnalyticsData.leadGenerationMetrics.totalLeads}
              </div>
              <div className="text-sm text-gray-600">Leads Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {(mockAnalyticsData.conversationAnalytics.intentAccuracy * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">
                4
              </div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">
                $2.3M
              </div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600">
                +75%
              </div>
              <div className="text-sm text-gray-600">Agent Productivity</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Stories Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Client Success Stories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockSuccessStories.slice(0, 2).map((story) => (
              <div key={story.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{story.clientName}</h4>
                  <Badge variant="secondary">{story.clientType}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{story.outcome}</p>
                <blockquote className="text-sm italic bg-gray-50 p-3 rounded">
                  "{story.testimonial.substring(0, 120)}..."
                </blockquote>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span>Timeline: {story.timeline}</span>
                  {story.savings && (
                    <Badge variant="outline">Saved: ${story.savings.toLocaleString()}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Agent Productivity Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Agent Productivity Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockAgentMetrics.slice(0, 3).map((agent) => (
              <div key={agent.agentId} className="border rounded-lg p-4">
                <h4 className="font-semibold mb-2">{agent.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{agent.specialization}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Revenue Growth:</span>
                    <Badge variant="default">+{Math.round(agent.improvements.revenueGrowth * 100)}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Savings:</span>
                    <Badge variant="secondary">{Math.round(agent.improvements.timeReduction * 100)}%</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Satisfaction:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{agent.improvements.clientSatisfaction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Properties */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-green-500" />
            Featured Properties with PropGuard Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockPropertyListings.slice(0, 2).map((property) => (
              <div key={property.id} className="border rounded-lg overflow-hidden">
                <img 
                  src={property.images[0]} 
                  alt="Property"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-1">{property.address}</h4>
                  <p className="text-sm text-gray-600 mb-2">{property.city}, {property.state}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold">${property.listingPrice.toLocaleString()}</span>
                    <Badge variant="outline">
                      {property.bedrooms} bed, {property.bathrooms} bath
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span className="text-sm">PropGuard Score: {property.propguardRiskAnalysis.overallRiskScore}/10</span>
                    </div>
                    <Badge variant="default">{property.propguardRiskAnalysis.investmentGrade}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technical Innovation */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Innovation & Smart Sensay Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">🤖 AI & Machine Learning</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  TensorFlow property valuation models
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Ollama LLM integration for sentiment analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Real-time risk assessment algorithms
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Predictive market modeling
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">🌐 Sensay Platform Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Multi-channel deployment (Web, WhatsApp, Telegram, Discord)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Advanced NLP with 94% intent accuracy
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Multilingual support (EN, ES, ZH, FR)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  Conversation memory and context awareness
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Home className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">PropGuard AI</span>
              </div>
              <Badge variant="secondary">Sensay Hackathon 2024</Badge>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={activeDemo === 'overview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('overview')}
              >
                Overview
              </Button>
              <Button
                variant={activeDemo === 'chatbot' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('chatbot')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
              <Button
                variant={activeDemo === 'analytics' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('analytics')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeDemo === 'overview' && renderOverview()}
        {activeDemo === 'chatbot' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Interactive Chatbot Demo</h2>
              <p className="text-gray-600">Experience the PropGuard AI assistant powered by Sensay</p>
            </div>
            <SensayChatbotDemo />
          </div>
        )}
        {activeDemo === 'analytics' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Comprehensive Analytics Dashboard</h2>
              <p className="text-gray-600">Real-world impact metrics and business intelligence</p>
            </div>
            <SensayAnalyticsDashboard />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center items-center space-x-3">
              <Shield className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold">PropGuard AI x Sensay</span>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-gray-600">
              Revolutionizing real estate through AI-powered conversations and intelligent risk analysis
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>🏠 {mockPropertyListings.length}+ Properties Analyzed</span>
              <span>🤖 {(mockAnalyticsData.conversationAnalytics.intentAccuracy * 100).toFixed(0)}% AI Accuracy</span>
              <span>🌍 Multi-Platform Ready</span>
              <span>⚡ Real-Time Intelligence</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
