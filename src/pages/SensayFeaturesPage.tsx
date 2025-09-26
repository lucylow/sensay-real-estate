import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Globe, 
  Users, 
  BarChart3, 
  Zap, 
  Shield, 
  Mic, 
  Video, 
  Search, 
  Calendar, 
  TrendingUp, 
  Database,
  Bot,
  Headphones,
  Camera,
  FileText,
  Settings,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
  Target,
  Clock,
  DollarSign,
  Home,
  Building,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

// Import Sensay components
import { SensaySetup } from '@/components/SensaySetup';
import { SensayAssistant } from '@/components/SensayAssistant';
import { EnhancedSensayAssistant } from '@/components/EnhancedSensayAssistant';
import { MultiChannelDeployment } from '@/components/MultiChannelDeployment';
import { LeadQualificationAutomation } from '@/components/LeadQualificationAutomation';
import { PersonalizedSearchEngine } from '@/components/PersonalizedSearchEngine';
import { RealTimeDataIntegration } from '@/components/RealTimeDataIntegration';
import { CRMIntegrationWorkflows } from '@/components/CRMIntegrationWorkflows';
import SensayRealEstateChatbot from '@/components/SensayRealEstateChatbot';
import { MultilingualChatInterface } from '@/components/MultilingualChatInterface';
import { MultilingualDashboard } from '@/components/MultilingualDashboard';
import SensayMultimodalIntegration from '@/components/SensayMultimodalIntegration';
import MultimodalAIAssistant from '@/components/MultimodalAIAssistant';
import VoiceSelector from '@/components/VoiceSelector';
import VoiceCloner from '@/components/VoiceCloner';
import AudioPlayer from '@/components/AudioPlayer';
import VideoAvatar from '@/components/VideoAvatar';
import VoiceSettingsPage from '@/components/VoiceSettingsPage';
import { ConversationAnalyticsDashboard } from '@/components/ConversationAnalyticsDashboard';
import { QualityControlledAssistant } from '@/components/QualityControlledAssistant';
import { LeadAnalyticsDashboard } from '@/components/LeadAnalyticsDashboard';
import { SensayAnalyticsDashboard } from '@/components/SensayAnalyticsDashboard';

export const SensayFeaturesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sensayFeatures = [
    {
      id: 'chatbot',
      title: 'AI Chatbot',
      description: 'Intelligent conversation engine with context awareness',
      icon: MessageCircle,
      component: 'SensayRealEstateChatbot',
      features: ['Natural Language Processing', 'Context Awareness', 'Multi-turn Conversations', 'Intent Recognition']
    },
    {
      id: 'multilingual',
      title: 'Multilingual Support',
      description: 'Global language support with automatic translation',
      icon: Globe,
      component: 'MultilingualChatInterface',
      features: ['50+ Languages', 'Auto Translation', 'Cultural Adaptation', 'Regional Dialects']
    },
    {
      id: 'voice',
      title: 'Voice & Audio',
      description: 'Advanced voice synthesis and audio processing',
      icon: Mic,
      component: 'VoiceSelector',
      features: ['Text-to-Speech', 'Voice Cloning', 'Audio Playback', 'Voice Customization']
    },
    {
      id: 'video',
      title: 'Video Avatars',
      description: 'AI-powered video avatars for presentations',
      icon: Video,
      component: 'VideoAvatar',
      features: ['Avatar Generation', 'Lip Sync', 'Gesture Control', 'Custom Avatars']
    },
    {
      id: 'multimodal',
      title: 'Multimodal AI',
      description: 'Combined text, voice, and video interactions',
      icon: Camera,
      component: 'MultimodalAIAssistant',
      features: ['Text + Voice + Video', 'Seamless Switching', 'Context Preservation', 'Rich Interactions']
    },
    {
      id: 'analytics',
      title: 'Analytics & Insights',
      description: 'Comprehensive conversation and performance analytics',
      icon: BarChart3,
      component: 'ConversationAnalyticsDashboard',
      features: ['Real-time Metrics', 'Performance Tracking', 'User Insights', 'ROI Analysis']
    },
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'Automated lead qualification and nurturing',
      icon: Target,
      component: 'LeadQualificationAutomation',
      features: ['Lead Scoring', 'Qualification', 'Nurturing Sequences', 'CRM Integration']
    },
    {
      id: 'search',
      title: 'Personalized Search',
      description: 'AI-driven property recommendations',
      icon: Search,
      component: 'PersonalizedSearchEngine',
      features: ['Smart Recommendations', 'Preference Learning', 'Behavioral Analysis', 'Dynamic Matching']
    },
    {
      id: 'data-integration',
      title: 'Real-time Data',
      description: 'Live market data and property information',
      icon: Database,
      component: 'RealTimeDataIntegration',
      features: ['Live Market Data', 'Property Updates', 'Price Tracking', 'Trend Analysis']
    },
    {
      id: 'crm',
      title: 'CRM Integration',
      description: 'Seamless CRM system integration',
      icon: Users,
      component: 'CRMIntegrationWorkflows',
      features: ['Multi-CRM Support', 'Automated Workflows', 'Data Sync', 'Lead Management']
    },
    {
      id: 'multi-channel',
      title: 'Multi-Channel',
      description: 'Deploy across multiple platforms',
      icon: Zap,
      component: 'MultiChannelDeployment',
      features: ['Web, WhatsApp, Telegram', 'Unified Management', 'Cross-platform Sync', 'Channel Optimization']
    },
    {
      id: 'quality',
      title: 'Quality Control',
      description: 'AI-powered conversation quality monitoring',
      icon: Shield,
      component: 'QualityControlledAssistant',
      features: ['Quality Monitoring', 'Response Optimization', 'Error Detection', 'Performance Tuning']
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Sensay AI Features
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive AI-powered real estate chatbot platform with advanced features for lead generation, 
          property search, and customer engagement.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Badge variant="secondary" className="text-sm">
            <Award className="w-4 h-4 mr-2" />
            Hackathon Winner 2024
          </Badge>
          <Badge variant="outline" className="text-sm">
            <Star className="w-4 h-4 mr-2" />
            $10,000 Prize
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">+75%</div>
            <p className="text-sm text-muted-foreground">Lead Conversion</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <p className="text-sm text-muted-foreground">Languages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">24/7</div>
            <p className="text-sm text-muted-foreground">Availability</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">$2.3M</div>
            <p className="text-sm text-muted-foreground">Revenue Generated</p>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensayFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.id} className="group hover:shadow-lg transition-all cursor-pointer" 
                  onClick={() => setActiveTab(feature.id)}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {feature.features.map((feat, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-primary/10">
                  Explore Feature
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integration Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            PropGuard AI Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Property Intelligence</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Real-time Property Valuations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Environmental Risk Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Market Sentiment Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Investment Recommendations</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Advanced Analytics</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Lead Scoring & Qualification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Conversation Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">ROI Tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Performance Metrics</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFeatureComponent = (featureId: string) => {
    switch (featureId) {
      case 'chatbot':
        return <SensayRealEstateChatbot />;
      case 'multilingual':
        return <MultilingualChatInterface />;
      case 'voice':
        return <VoiceSelector />;
      case 'video':
        return <VideoAvatar />;
      case 'multimodal':
        return <MultimodalAIAssistant />;
      case 'analytics':
        return <ConversationAnalyticsDashboard />;
      case 'lead-generation':
        return <LeadQualificationAutomation />;
      case 'search':
        return <PersonalizedSearchEngine />;
      case 'data-integration':
        return <RealTimeDataIntegration />;
      case 'crm':
        return <CRMIntegrationWorkflows />;
      case 'multi-channel':
        return <MultiChannelDeployment />;
      case 'quality':
        return <QualityControlledAssistant />;
      default:
        return <div>Feature component not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold">Sensay AI Features</span>
              </div>
              <Badge variant="secondary">PropGuard AI Integration</Badge>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </Button>
              <Button
                variant={activeTab === 'setup' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('setup')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Setup
              </Button>
              <Button
                variant={activeTab === 'analytics' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('analytics')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-12 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chatbot">Chatbot</TabsTrigger>
            <TabsTrigger value="multilingual">Multilingual</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="multimodal">Multimodal</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="lead-generation">Leads</TabsTrigger>
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="data-integration">Data</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="multi-channel">Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="setup" className="mt-0">
            <SensaySetup />
          </TabsContent>

          <TabsContent value="analytics" className="mt-0">
            <SensayAnalyticsDashboard />
          </TabsContent>

          {sensayFeatures.map((feature) => (
            <TabsContent key={feature.id} value={feature.id} className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="w-5 h-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  {renderFeatureComponent(feature.id)}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default SensayFeaturesPage;
