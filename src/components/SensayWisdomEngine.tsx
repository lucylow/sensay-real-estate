import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { SensayAdvancedAIFeatures } from './SensayAdvancedAIFeatures';
import { SensayRealTimeAnalytics } from './SensayRealTimeAnalytics';
import SensayRealEstateChatbot from './SensayRealEstateChatbot';
import { 
  Brain, 
  Zap, 
  Mic, 
  Video, 
  Camera, 
  MessageSquare, 
  TrendingUp,
  Shield,
  FileText,
  Globe,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
  Award,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  ExternalLink,
  Download,
  Share2,
  BarChart3,
  Activity,
  Target,
  Lightbulb,
  Rocket,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface WisdomCapability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  status: 'active' | 'beta' | 'demo';
  metrics?: {
    label: string;
    value: string;
    improvement?: string;
  };
}

interface AdvancedFeature {
  id: string;
  title: string;
  description: string;
  subFeatures: string[];
  icon: React.ReactNode;
  enabled: boolean;
}

export const SensayWisdomEngine: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [multimodalMode, setMultimodalMode] = useState('text');

  const wisdomCapabilities: WisdomCapability[] = [
    {
      id: 'enhanced-ai',
      title: 'Enhanced AI',
      description: 'Powered by Sensay\'s Wisdom Engine for sophisticated conversations',
      icon: <Brain className="h-6 w-6 text-purple-500" />,
      features: ['Natural Language Processing', 'Context Awareness', 'Intent Recognition', 'Conversation Memory'],
      status: 'active',
      metrics: {
        label: 'Conversation Accuracy',
        value: '94.2%',
        improvement: '+5% vs baseline'
      }
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      description: 'Advanced market analysis and trend predictions',
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      features: ['Real-time Market Data', 'Trend Analysis', 'Price Predictions', 'Investment Insights'],
      status: 'active',
      metrics: {
        label: 'Prediction Accuracy',
        value: '87.5%',
        improvement: '+12% vs industry'
      }
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis with mitigation strategies',
      icon: <Shield className="h-6 w-6 text-red-500" />,
      features: ['Environmental Risks', 'Market Volatility', 'Financial Analysis', 'Mitigation Strategies'],
      status: 'active',
      metrics: {
        label: 'Risk Detection',
        value: '92.1%',
        improvement: '+18% accuracy'
      }
    },
    {
      id: 'smart-reports',
      title: 'Smart Reports',
      description: 'Generate detailed property analysis reports',
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      features: ['Automated Reports', 'Visual Analytics', 'Export Options', 'Custom Templates'],
      status: 'active'


    }
  ];

  const advancedFeatures: AdvancedFeature[] = [
    {
      id: 'voice-audio',
      title: 'Voice & Audio',
      description: 'Advanced speech recognition and synthesis',
      icon: <Mic className="h-5 w-5" />,
      enabled: voiceEnabled,
      subFeatures: [
        'Text-to-Speech with 8 realistic voices',
        'Voice cloning and customization',
        'Real-time audio processing',
        'Multi-language voice support',
        'Noise cancellation and enhancement'
      ]
    },
    {
      id: 'video-avatars',
      title: 'Video Avatars',
      description: 'AI-powered video presentations',
      icon: <Video className="h-5 w-5" />,
      enabled: videoEnabled,
      subFeatures: [
        'Realistic avatar generation',
        'Lip-sync technology',
        'Gesture and expression control',
        'Custom avatar creation',
        'Real-time video processing'
      ]
    },
    {
      id: 'multimodal-ai',
      title: 'Multimodal AI',
      description: 'Combined text, voice, and video interactions',
      icon: <MessageSquare className="h-5 w-5" />,
      enabled: multimodalMode !== 'text',
      subFeatures: [
        'Seamless mode switching',
        'Context preservation across modes',
        'Rich interactive experiences',
        'Advanced conversation flows',
        'Multi-sensory engagement'
      ]
    },
    {
      id: 'analytics-insights',
      title: 'Analytics & Insights',
      description: 'Comprehensive performance tracking',
      icon: <BarChart3 className="h-5 w-5" />,
      enabled: true,
      subFeatures: [
        'Real-time conversation metrics',
        'User behavior analysis',
        'ROI tracking and reporting',
        'Performance optimization insights',
        'Predictive analytics'
      ]
    }
  ];

  const realWorldImpact = [
    { metric: '+75%', label: 'Lead Conversion', icon: <Users className="h-5 w-5 text-green-500" /> },
    { metric: '50+', label: 'Languages', icon: <Globe className="h-5 w-5 text-blue-500" /> },
    { metric: '24/7', label: 'Availability', icon: <Clock className="h-5 w-5 text-purple-500" /> },
    { metric: '$2.3M', label: 'Revenue Generated', icon: <DollarSign className="h-5 w-5 text-orange-500" /> }
  ];

  const integrationSteps = [
    {
      step: 1,
      title: 'AI Assistant',
      description: 'Deploy intelligent conversation engine',
      icon: <MessageSquare className="h-5 w-5" />,
      status: 'completed',
      component: 'SensayRealEstateChatbot'
    },
    {
      step: 2,
      title: 'Search',
      description: 'Enable personalized property search',
      icon: <Search className="h-5 w-5" />,
      status: 'completed',
      component: 'PersonalizedSearchEngine'
    },
    {
      step: 3,
      title: 'Live Data',
      description: 'Integrate real-time market data',
      icon: <Database className="h-5 w-5" />,
      status: 'completed',
      component: 'RealTimeDataIntegration'
    },
    {
      step: 4,
      title: 'CRM',
      description: 'Connect with CRM systems',
      icon: <Users className="h-5 w-5" />,
      status: 'in-progress',
      component: 'CRMSync'
    },
    {
      step: 5,
      title: 'Deploy',
      description: 'Deploy across multiple channels',
      icon: <Rocket className="h-5 w-5" />,
      status: 'pending',
      component: 'MultiChannelDeployment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'demo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'in-progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <Target className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sensay Wisdom
              </h1>
              <Badge variant="secondary" className="mt-2">
                <Award className="h-3 w-3 mr-1" />
                Hackathon 2024
              </Badge>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience enhanced AI-powered property analysis with Sensay's Wisdom Engine. 
            Get sophisticated insights, risk assessments, and investment advice powered by advanced artificial intelligence.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Play className="h-5 w-5 mr-2" />
              Live Demo
            </Button>
            "<Button size="lg" variant="outline" className="flex items-center gap-2">
              View Documentation
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Real-World Impact */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Real-World Impact</CardTitle>
            <p className="text-gray-600">Sensay Wisdom Engine delivers measurable results</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {realWorldImpact.map((impact, index) => (
                <div key={index} className="text-center p-6">
                  <div className="flex justify-center mb-3">
                    {impact.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{impact.metric}</div>
                  <div className="text-sm text-gray-600">{impact.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="advanced">Advanced AI</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Core Wisdom Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wisdomCapabilities.map((capability, index) => (
                <Card key={capability.id} className="group hover:shadow-lg transition-shadow border-0 bg-white/70 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          {capability.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{capability.title}</CardTitle>
                          <Badge className={getStatusColor(capability.status)}>
                            {capability.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{capability.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {capability.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {capability.metrics && (
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">{capability.metrics.label}</span>
                          <div className="text-right">
                            <div className="font-semibold text-green-600">{capability.metrics.value}</div>
                            {capability.metrics.improvement && (
                              <div className="text-xs text-green-500">{capability.metrics.improvement}</div>
                            )}
                          </div>
                        </div>
                        <Progress value={parseFloat(capability.metrics.value)} className="mt-2 h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            {/* Advanced AI Capabilities */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Advanced AI Capabilities
                </CardTitle>
                <p className="text-gray-600 text-center">
                  Sensay's Wisdom Engine provides cutting-edge AI features for real estate professionals
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {advancedFeatures.map((feature) => (
                    <Card key={feature.id} className="border border-gray-200">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                              {feature.icon}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{feature.title}</CardTitle>
                              <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                          </div>
                          <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                            {feature.enabled ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {feature.subFeatures.map((subFeature, index) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                              <span className="text-gray-700">{subFeature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Voice Controls */}
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Voice & Audio Controls</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant={voiceEnabled ? 'default' : 'outline'}
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        className="flex items-center"
                      >
                        {voiceEnabled ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
                        {voiceEnabled ? 'Voice On' : 'Voice Off'}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant={videoEnabled ? 'default' : 'outline'}
                        onClick={() => setVideoEnabled(!videoEnabled)}
                        className="flex items-center"
                      >
                        {videoEnabled ? <Video className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
                        {videoEnabled ? 'Video On' : 'Video Off'}
                      </Button>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setMultimodalMode(multimodalMode === 'text' ? 'multimodal' : 'text')}
                        className="flex items-center"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {multimodalMode === 'multimodal' ? 'Multimodal' : 'Text Only'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            {/* Integration Steps */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Integration Steps
                </CardTitle>
                <p className="text-gray-600 text-center">
                  Follow these steps to integrate Sensay's Wisdom Engine into your real estate platform
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {integrationSteps.map((step, index) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            {step.icon}
                            <h3 className="font-semibold">{step.title}</h3>
                          </div>
                          <Badge className={getStatusColor(step.status)}>
                            {getStatusIcon(step.status)}
                            <span className="ml-1 capitalize">{step.status.replace('-', ' ')}</span>
                          </Badge>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                        <div className="mt-2">
                          <Badge variant="outline" className="text-xs">
                            Component: {step.component}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demo" className="space-y-6">
            {/* Advanced AI Features Demo */}
            <SensayAdvancedAIFeatures />
            
            {/* Real-time Analytics */}
            <SensayRealTimeAnalytics />
            
            {/* Live Demo Section */}
            <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Ready to Transform Your Real Estate Business?
                </CardTitle>
                <p className="text-gray-600 text-center">
                  Join thousands of real estate professionals who are already using Sensay's Wisdom Engine 
                  to revolutionize their property analysis and customer engagement.
                </p>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="space-y-4">
                    <SensayRealEstateChatbot />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Button size="lg" className="h-16 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      <Play className="h-6 w-6 mr-3" />
                      Try Live Demo
                    </Button>
                    <Button size="lg" variant="outline" className="h-16 text-lg flex items-center justify-center gap-3">
                      View Documentation
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
