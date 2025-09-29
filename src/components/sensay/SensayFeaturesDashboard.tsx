import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Users, 
  Home, 
  Calendar, 
  Globe, 
  BarChart3, 
  Brain,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Settings,
  Download,
  Share2
} from 'lucide-react';
import { IntelligentLeadGeneration } from './IntelligentLeadGeneration';
import { PropertyIntelligence } from './PropertyIntelligence';
import { AutomatedScheduling } from './AutomatedScheduling';
import { MultilingualSupport } from './MultilingualSupport';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { ContextualMemory } from './ContextualMemory';

export const SensayFeaturesDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'lead-generation',
      title: 'Intelligent Lead Generation',
      description: '24/7 availability with smart qualification and multi-channel capture',
      icon: <Users className="h-6 w-6" />,
      metrics: { leads: 247, conversion: 63.2, revenue: 1850000 },
      status: 'active'
    },
    {
      id: 'property-intelligence',
      title: 'Property Intelligence',
      description: 'Dynamic matching with MLS integration and risk assessment',
      icon: <Home className="h-6 w-6" />,
      metrics: { properties: 1247, accuracy: 94.2, predictions: 87.8 },
      status: 'active'
    },
    {
      id: 'automated-scheduling',
      title: 'Automated Scheduling',
      description: 'Calendar integration with virtual tour booking',
      icon: <Calendar className="h-6 w-6" />,
      metrics: { appointments: 156, completion: 91, satisfaction: 8.7 },
      status: 'active'
    },
    {
      id: 'multilingual-support',
      title: 'Multilingual Support',
      description: 'Multi-language support with auto-detection',
      icon: <Globe className="h-6 w-6" />,
      metrics: { languages: 4, accuracy: 96.8, users: 3052 },
      status: 'active'
    },
    {
      id: 'advanced-analytics',
      title: 'Advanced Analytics',
      description: 'Comprehensive analytics and ROI tracking',
      icon: <BarChart3 className="h-6 w-6" />,
      metrics: { roi: 1380, revenue: 1850000, growth: 45.2 },
      status: 'active'
    },
    {
      id: 'contextual-memory',
      title: 'Contextual Memory',
      description: 'Persistent user profiles and predictive flows',
      icon: <Brain className="h-6 w-6" />,
      metrics: { profiles: 1247, accuracy: 89.7, sync: 94.2 },
      status: 'active'
    }
  ];

  const renderFeatureComponent = (featureId: string) => {
    switch (featureId) {
      case 'lead-generation':
        return <IntelligentLeadGeneration />;
      case 'property-intelligence':
        return <PropertyIntelligence />;
      case 'automated-scheduling':
        return <AutomatedScheduling />;
      case 'multilingual-support':
        return <MultilingualSupport />;
      case 'advanced-analytics':
        return <AdvancedAnalytics />;
      case 'contextual-memory':
        return <ContextualMemory />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6 text-blue-500" />
                Sensay AI Features Dashboard
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Comprehensive AI-powered real estate solutions integrated throughout PropGuard AI
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="default" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                All Systems Active
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Detailed Features</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <Badge variant={feature.status === 'active' ? 'default' : 'secondary'} className="mt-1">
                          {feature.status}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('features')}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className="font-medium">
                          {typeof value === 'number' && value > 1000 
                            ? `${(value / 1000).toFixed(1)}K` 
                            : value}
                          {key === 'accuracy' || key === 'conversion' || key === 'completion' || key === 'satisfaction' || key === 'roi' || key === 'growth' || key === 'sync' ? '%' : ''}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setActiveTab('features')}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Explore Feature
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Integration Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                PropGuard AI Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Dashboard</div>
                    <div className="text-sm text-muted-foreground">Enhanced Sensay Assistant integrated</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Risk Analysis</div>
                    <div className="text-sm text-muted-foreground">AI-powered risk assessment</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Blockchain</div>
                    <div className="text-sm text-muted-foreground">NFT and certificate management</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">APRA Compliance</div>
                    <div className="text-sm text-muted-foreground">Regulatory guidance and reporting</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Reports</div>
                    <div className="text-sm text-muted-foreground">Automated report generation</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Pricing</div>
                    <div className="text-sm text-muted-foreground">Dynamic pricing intelligence</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Property Search</div>
                    <div className="text-sm text-muted-foreground">AI-powered search and matching</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Sensay AI Features</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          <Tabs defaultValue="lead-generation" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="lead-generation">Lead Gen</TabsTrigger>
              <TabsTrigger value="property-intelligence">Property</TabsTrigger>
              <TabsTrigger value="automated-scheduling">Scheduling</TabsTrigger>
              <TabsTrigger value="multilingual-support">Languages</TabsTrigger>
              <TabsTrigger value="advanced-analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contextual-memory">Memory</TabsTrigger>
            </TabsList>

            <TabsContent value="lead-generation">
              <IntelligentLeadGeneration />
            </TabsContent>

            <TabsContent value="property-intelligence">
              <PropertyIntelligence />
            </TabsContent>

            <TabsContent value="automated-scheduling">
              <AutomatedScheduling />
            </TabsContent>

            <TabsContent value="multilingual-support">
              <MultilingualSupport />
            </TabsContent>

            <TabsContent value="advanced-analytics">
              <AdvancedAnalytics />
            </TabsContent>

            <TabsContent value="contextual-memory">
              <ContextualMemory />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
};
