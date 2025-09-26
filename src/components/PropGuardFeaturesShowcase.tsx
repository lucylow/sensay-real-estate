import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DollarSign, 
  Shield, 
  TrendingUp, 
  BarChart3, 
  FileCheck, 
  MessageCircle,
  Star,
  Clock,
  Globe,
  Zap,
  ArrowRight,
  Play,
  Code,
  Database,
  Cpu
} from 'lucide-react';
import { 
  mockPropGuardFeatures, 
  mockAIInsights, 
  mockPropGuardCapabilities,
  getFeaturesByCategory,
  getInsightsByType,
  type PropGuardFeature,
  type AIInsight
} from '@/data/mockPropGuardFeatures';

interface PropGuardFeaturesShowcaseProps {
  className?: string;
}

export const PropGuardFeaturesShowcase: React.FC<PropGuardFeaturesShowcaseProps> = ({
  className = ''
}) => {
  const [selectedFeature, setSelectedFeature] = useState<PropGuardFeature | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(null);
  const [activeTab, setActiveTab] = useState('features');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'valuation': return <DollarSign className="h-5 w-5" />;
      case 'risk': return <Shield className="h-5 w-5" />;
      case 'market': return <TrendingUp className="h-5 w-5" />;
      case 'investment': return <BarChart3 className="h-5 w-5" />;
      case 'compliance': return <FileCheck className="h-5 w-5" />;
      case 'chat': return <MessageCircle className="h-5 w-5" />;
      default: return <Cpu className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'valuation': return 'bg-green-100 text-green-800 border-green-200';
      case 'risk': return 'bg-red-100 text-red-800 border-red-200';
      case 'market': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'investment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'compliance': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'chat': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-gray-100 text-gray-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'enterprise': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PropGuard AI Features
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Comprehensive AI-powered real estate intelligence platform with advanced analytics, 
          risk assessment, and multilingual support
        </p>
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>12 Languages</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>94.7% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>1.2s Response</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>

        {/* Features Tab */}
        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPropGuardFeatures.map((feature) => (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedFeature?.id === feature.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : ''
                }`}
                onClick={() => setSelectedFeature(feature)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{feature.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{feature.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${getCategoryColor(feature.category)}`}
                        >
                          {getCategoryIcon(feature.category)}
                          {feature.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{feature.accuracy}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-600">
                        <Clock className="h-3 w-3" />
                        <span>{feature.responseTime}s</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Capabilities:</h4>
                      <div className="flex flex-wrap gap-1">
                        {feature.capabilities.slice(0, 3).map((capability, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {capability}
                          </Badge>
                        ))}
                        {feature.capabilities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{feature.capabilities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-sm mb-2">Languages:</h4>
                      <div className="flex flex-wrap gap-1">
                        {feature.languages.slice(0, 4).map((lang, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                        {feature.languages.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{feature.languages.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-4" 
                    variant={selectedFeature?.id === feature.id ? "default" : "outline"}
                  >
                    {selectedFeature?.id === feature.id ? 'Selected' : 'Learn More'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Details */}
          {selectedFeature && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedFeature.icon}</span>
                  {selectedFeature.name} - Detailed Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Use Cases</h4>
                    <ul className="space-y-2">
                      {selectedFeature.useCases.map((useCase, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3 text-primary" />
                          {useCase}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {selectedFeature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Example Conversations</h4>
                  <div className="space-y-4">
                    {selectedFeature.examples.map((example, index) => (
                      <div key={index} className="border rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">User</Badge>
                          <span className="text-sm font-medium">Input:</span>
                        </div>
                        <p className="text-sm bg-blue-50 p-2 rounded">{example.input}</p>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-100">PropGuard AI</Badge>
                          <span className="text-sm font-medium">Response:</span>
                        </div>
                        <p className="text-sm bg-green-50 p-2 rounded">{example.output}</p>
                        
                        {example.context && (
                          <p className="text-xs text-muted-foreground italic">
                            Context: {example.context}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {mockAIInsights.map((insight) => (
              <Card 
                key={insight.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedInsight?.id === insight.id 
                    ? 'ring-2 ring-primary bg-primary/5' 
                    : ''
                }`}
                onClick={() => setSelectedInsight(insight)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <Badge className={getSeverityColor(insight.severity)}>
                          {insight.severity}
                        </Badge>
                        <Badge variant="outline">
                          {insight.type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {insight.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Region: {insight.region}</span>
                        <span>Category: {insight.category}</span>
                        <span>Confidence: {insight.confidence}%</span>
                        <span>Updated: {insight.timestamp.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">
                        {insight.confidence}% confidence
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Insight Details */}
          {selectedInsight && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  {selectedInsight.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Data Points</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedInsight.data).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Recommendations</h4>
                    <ul className="space-y-2">
                      {selectedInsight.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3 text-primary" />
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Capabilities Tab */}
        <TabsContent value="capabilities" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockPropGuardCapabilities.map((capability) => (
              <Card key={capability.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    {capability.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {capability.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {capability.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Integrations</h4>
                    <div className="flex flex-wrap gap-1">
                      {capability.integrations.map((integration, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">API Endpoints</h4>
                    <div className="space-y-1">
                      {capability.apiEndpoints.slice(0, 3).map((endpoint, index) => (
                        <code key={index} className="text-xs bg-gray-100 p-1 rounded block">
                          {endpoint}
                        </code>
                      ))}
                      {capability.apiEndpoints.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{capability.apiEndpoints.length - 3} more endpoints
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Pricing Tab */}
        <TabsContent value="pricing" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['basic', 'premium', 'enterprise'].map((tier) => (
              <Card key={tier} className={tier === 'premium' ? 'ring-2 ring-primary' : ''}>
                <CardHeader className="text-center">
                  <CardTitle className="capitalize flex items-center justify-center gap-2">
                    <Badge className={getTierColor(tier)}>
                      {tier}
                    </Badge>
                  </CardTitle>
                  <div className="text-3xl font-bold">
                    ${mockPropGuardFeatures[0].pricing.find(p => p.tier === tier)?.price || 0}
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {mockPropGuardFeatures[0].pricing.find(p => p.tier === tier)?.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Star className="h-3 w-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant={tier === 'premium' ? 'default' : 'outline'}
                  >
                    {tier === 'premium' ? 'Most Popular' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feature Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Feature</th>
                      <th className="text-center p-2">Basic</th>
                      <th className="text-center p-2">Premium</th>
                      <th className="text-center p-2">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Valuations per month', 'API Access', 'Priority Support', 'Custom Integrations', 'White-label Options'].map((feature) => (
                      <tr key={feature} className="border-b">
                        <td className="p-2 font-medium">{feature}</td>
                        <td className="text-center p-2">
                          {feature === 'Valuations per month' ? '5' : 
                           feature === 'API Access' ? '❌' : '✅'}
                        </td>
                        <td className="text-center p-2">✅</td>
                        <td className="text-center p-2">✅</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
