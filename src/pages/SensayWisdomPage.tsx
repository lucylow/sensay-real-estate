import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Zap, 
  Globe, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  MessageCircle, 
  Users, 
  Target, 
  Database,
  Mic,
  Video,
  Camera,
  Search,
  Calendar,
  FileText,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Home,
  Building,
  MapPin,
  DollarSign,
  Clock,
  ExternalLink,
  Play,
  Sparkles,
  Lightbulb,
  Rocket
} from 'lucide-react';

// Import Sensay components
import { SensaySetup } from '@/components/SensaySetup';
import SensayRealEstateChatbot from '@/components/SensayRealEstateChatbot';

export const SensayWisdomPage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState('overview');

  const wisdomFeatures = [
    {
      id: 'enhanced-ai',
      title: 'Enhanced AI',
      description: 'Powered by Sensay\'s Wisdom Engine for sophisticated conversations',
      icon: Brain,
      color: 'bg-purple-500',
      features: ['Natural Language Processing', 'Context Awareness', 'Intent Recognition', 'Conversation Memory']
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      description: 'Advanced market analysis and trend predictions',
      icon: TrendingUp,
      color: 'bg-green-500',
      features: ['Real-time Market Data', 'Trend Analysis', 'Price Predictions', 'Investment Insights']
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis with mitigation strategies',
      icon: Shield,
      color: 'bg-red-500',
      features: ['Environmental Risks', 'Market Volatility', 'Financial Analysis', 'Mitigation Strategies']
    },
    {
      id: 'smart-reports',
      title: 'Smart Reports',
      description: 'Generate detailed property analysis reports',
      icon: FileText,
      color: 'bg-blue-500',
      features: ['Automated Reports', 'Visual Analytics', 'Export Options', 'Custom Templates']
    }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'Setup',
      description: 'Configure your Sensay API credentials',
      icon: Settings,
      component: 'SensaySetup'
    },
    {
      step: 2,
      title: 'AI Assistant',
      description: 'Deploy intelligent conversation engine',
      icon: MessageCircle,
      component: 'SensayRealEstateChatbot'
    },
    {
      step: 3,
      title: 'Search',
      description: 'Enable personalized property search',
      icon: Search,
      component: 'PersonalizedSearchEngine'
    },
    {
      step: 4,
      title: 'Live Data',
      description: 'Integrate real-time market data',
      icon: Database,
      component: 'RealTimeDataIntegration'
    },
    {
      step: 5,
      title: 'CRM',
      description: 'Connect with CRM systems',
      icon: Users,
      component: 'CRMIntegrationWorkflows'
    },
    {
      step: 6,
      title: 'Deploy',
      description: 'Deploy across multiple channels',
      icon: Rocket,
      component: 'MultiChannelDeployment'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-9 h-9 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sensay Wisdom Integration
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <Badge variant="secondary" className="text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                <Award className="w-4 h-4 mr-2" />
                Hackathon Winner 2024
              </Badge>
              <Badge variant="outline" className="text-sm">
                <Star className="w-4 h-4 mr-2" />
                $10,000 Prize
              </Badge>
            </div>
          </div>
        </div>
        
        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
          Experience enhanced AI-powered property analysis with Sensay's Wisdom Engine. 
          Get sophisticated insights, risk assessments, and investment advice powered by 
          advanced artificial intelligence.
        </p>

        <div className="flex items-center justify-center gap-6 mt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            onClick={() => setActiveDemo('setup')}
          >
            <Settings className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-2"
            onClick={() => setActiveDemo('demo')}
          >
            <Play className="w-5 h-5 mr-2" />
            Live Demo
          </Button>
        </div>
      </div>

      {/* Core Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {wisdomFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {feature.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feat}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integration Steps */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Integration Steps</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these steps to integrate Sensay's Wisdom Engine into your real estate platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <Card key={step.step} className="group hover:shadow-lg transition-all cursor-pointer" 
                    onClick={() => setActiveDemo(step.component.toLowerCase())}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                    <Icon className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Real-World Impact</h2>
          <p className="text-blue-100 text-lg">Sensay Wisdom Engine delivers measurable results</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">+75%</div>
            <p className="text-blue-100">Lead Conversion</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <p className="text-blue-100">Languages</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">24/7</div>
            <p className="text-blue-100">Availability</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">$2.3M</div>
            <p className="text-blue-100">Revenue Generated</p>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced AI Capabilities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sensay's Wisdom Engine provides cutting-edge AI features for real estate professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Voice & Audio</CardTitle>
                  <p className="text-gray-600">Advanced speech recognition and synthesis</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Text-to-Speech with 8 realistic voices</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Voice cloning and customization</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time audio processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Multi-language voice support</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Video Avatars</CardTitle>
                  <p className="text-gray-600">AI-powered video presentations</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Realistic avatar generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lip-sync technology</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Gesture and expression control</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Custom avatar creation</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Multimodal AI</CardTitle>
                  <p className="text-gray-600">Combined text, voice, and video interactions</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Seamless mode switching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Context preservation across modes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Rich interactive experiences</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Advanced conversation flows</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">Analytics & Insights</CardTitle>
                  <p className="text-gray-600">Comprehensive performance tracking</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time conversation metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>User behavior analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>ROI tracking and reporting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Performance optimization insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl">
        <h2 className="text-3xl font-bold text-gray-900">Ready to Transform Your Real Estate Business?</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of real estate professionals who are already using Sensay's Wisdom Engine 
          to revolutionize their property analysis and customer engagement.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
            onClick={() => setActiveDemo('setup')}
          >
            <Rocket className="w-5 h-5 mr-2" />
            Start Integration
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-4 text-lg font-semibold border-2"
            onClick={() => window.open('https://docs.sensay.io', '_blank')}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            View Documentation
          </Button>
        </div>
      </div>
    </div>
  );

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case 'sensaysetup':
        return <SensaySetup />;
      case 'sensayrealestatechatbot':
        return <SensayRealEstateChatbot />;
      case 'demo':
        return <SensayRealEstateChatbot />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Component Coming Soon</h3>
            <p className="text-gray-600 mb-6">
              This component is being integrated and will be available soon.
            </p>
            <Button onClick={() => setActiveDemo('overview')} variant="outline">
              <ArrowRight className="w-4 h-4 mr-2" />
              Back to Overview
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sensay Wisdom
                </span>
              </div>
              <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                <Award className="w-4 h-4 mr-1" />
                Hackathon 2024
              </Badge>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={activeDemo === 'overview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('overview')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeDemo === 'setup' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('setup')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Setup
              </Button>
              <Button
                variant={activeDemo === 'demo' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveDemo('demo')}
              >
                <Play className="h-4 w-4 mr-2" />
                Demo
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeDemo === 'overview' ? (
          renderOverview()
        ) : (
          <div className="mt-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  {activeDemo === 'setup' ? 'Sensay Wisdom API Setup' : 
                   activeDemo === 'demo' ? 'Live AI Assistant Demo' : 
                   'Sensay Integration'}
                </CardTitle>
                <p className="text-gray-600">
                  {activeDemo === 'setup' ? 'Configure your Sensay API credentials to get started' :
                   activeDemo === 'demo' ? 'Experience the power of Sensay\'s Wisdom Engine' :
                   'Integrate Sensay features into your application'}
                </p>
              </CardHeader>
              <CardContent>
                {renderComponent(activeDemo)}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SensayWisdomPage;
