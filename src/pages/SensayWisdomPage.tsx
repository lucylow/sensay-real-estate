import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Shield, 
  FileText, 
  Mic, 
  Video, 
  BarChart3,
  Zap,
  Globe,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  MessageSquare,
  Search,
  Database,
  Link,
  Rocket
} from 'lucide-react';

export default function SensayWisdomPage() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "Enhanced AI",
      subtitle: "Powered by Sensay's Wisdom Engine",
      description: "Sophisticated conversations with advanced artificial intelligence",
      capabilities: [
        "Natural Language Processing",
        "Context Awareness", 
        "Intent Recognition",
        "Conversation Memory"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Market Intelligence",
      subtitle: "Advanced market analysis and trend predictions",
      description: "Real-time insights for informed property decisions",
      capabilities: [
        "Real-time Market Data",
        "Trend Analysis",
        "Price Predictions", 
        "Investment Insights"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Risk Assessment",
      subtitle: "Comprehensive risk analysis with mitigation strategies",
      description: "Protect your investments with advanced risk evaluation",
      capabilities: [
        "Environmental Risks",
        "Market Volatility",
        "Financial Analysis",
        "Mitigation Strategies"
      ]
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      title: "Smart Reports",
      subtitle: "Generate detailed property analysis reports",
      description: "Professional reports with actionable insights",
      capabilities: [
        "Automated Reports",
        "Visual Analytics",
        "Export Options",
        "Custom Templates"
      ]
    }
  ];

  const aiCapabilities = [
    {
      icon: <Mic className="h-6 w-6 text-blue-500" />,
      title: "Voice & Audio",
      description: "Advanced speech recognition and synthesis",
      features: [
        "Text-to-Speech with 8 realistic voices",
        "Voice cloning and customization",
        "Real-time audio processing",
        "Multi-language voice support"
      ]
    },
    {
      icon: <Video className="h-6 w-6 text-green-500" />,
      title: "Video Avatars",
      description: "AI-powered video presentations",
      features: [
        "Realistic avatar generation",
        "Lip-sync technology",
        "Gesture and expression control",
        "Custom avatar creation"
      ]
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-purple-500" />,
      title: "Multimodal AI",
      description: "Combined text, voice, and video interactions",
      features: [
        "Seamless mode switching",
        "Context preservation across modes",
        "Rich interactive experiences",
        "Advanced conversation flows"
      ]
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
      title: "Analytics & Insights",
      description: "Comprehensive performance tracking",
      features: [
        "Real-time conversation metrics",
        "User behavior analysis",
        "ROI tracking and reporting",
        "Performance optimization insights"
      ]
    }
  ];

  const integrationSteps = [
    {
      step: "1",
      icon: <Brain className="h-6 w-6" />,
      title: "AI Assistant",
      description: "Deploy intelligent conversation engine"
    },
    {
      step: "2", 
      icon: <Search className="h-6 w-6" />,
      title: "Search",
      description: "Enable personalized property search"
    },
    {
      step: "3",
      icon: <Database className="h-6 w-6" />,
      title: "Live Data",
      description: "Integrate real-time market data"
    },
    {
      step: "4",
      icon: <Users className="h-6 w-6" />,
      title: "CRM",
      description: "Connect with CRM systems"
    },
    {
      step: "5",
      icon: <Rocket className="h-6 w-6" />,
      title: "Deploy",
      description: "Deploy across multiple channels"
    }
  ];

  const impactMetrics = [
    {
      icon: <TrendingUp className="h-6 w-6 text-green-600" />,
      value: "+75%",
      label: "Lead Conversion",
      description: "Improved conversion rates"
    },
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      value: "50+",
      label: "Languages",
      description: "Global reach capability"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      value: "24/7",
      label: "Availability",
      description: "Always-on AI assistance"
    },
    {
      icon: <DollarSign className="h-6 w-6 text-green-600" />,
      value: "$2.3M",
      label: "Revenue Generated",
      description: "Proven ROI results"
    }
  ];

  const startDemo = (feature: string) => {
    setActiveDemo(feature);
    // In a real implementation, this would trigger the actual demo
    setTimeout(() => setActiveDemo(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Brain className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">Sensay Wisdom</h1>
            </div>
            <p className="text-xl mb-2">Hackathon 2024</p>
            <p className="text-lg opacity-90 mb-8">
              Experience enhanced AI-powered property analysis with Sensay's Wisdom Engine. 
              Get sophisticated insights, risk assessments, and investment advice powered by advanced artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => startDemo('overview')}
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                <Zap className="h-5 w-5 mr-2" />
                Live Demo
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                View Documentation
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Demo Status */}
        {activeDemo && (
          <div className="mb-8 p-4 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-medium">
                Demo "{activeDemo}" is now running! Experience the power of Sensay Wisdom Engine.
              </span>
            </div>
          </div>
        )}

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Sensay Wisdom Integration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-blue-600">
                    {feature.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.capabilities.map((capability, capIndex) => (
                      <li key={capIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => startDemo(feature.title.toLowerCase())}
                  >
                    Try {feature.title}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Integration Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Integration Steps</h3>
          <p className="text-center text-gray-600 mb-8">
            Follow these steps to integrate Sensay's Wisdom Engine into your real estate platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {integrationSteps.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">{step.step}</span>
                  </div>
                  <div className="text-blue-600 mb-2">{step.icon}</div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Real-World Impact */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Real-World Impact</h3>
          <p className="text-center text-gray-600 mb-8">
            Sensay Wisdom Engine delivers measurable results
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {impactMetrics.map((metric, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-blue-600 mb-4">{metric.icon}</div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">{metric.value}</div>
                  <div className="font-semibold mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Advanced AI Capabilities */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Advanced AI Capabilities</h3>
          <p className="text-center text-gray-600 mb-8">
            Sensay's Wisdom Engine provides cutting-edge AI features for real estate professionals
          </p>
          <Tabs defaultValue="voice" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="voice">Voice & Audio</TabsTrigger>
              <TabsTrigger value="video">Video Avatars</TabsTrigger>
              <TabsTrigger value="multimodal">Multimodal AI</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {aiCapabilities.map((capability, index) => (
              <TabsContent key={index} value={capability.title.toLowerCase().replace(/\s+/g, '').replace('&', '')} className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {capability.icon}
                      <span className="ml-3">{capability.title}</span>
                    </CardTitle>
                    <CardDescription>{capability.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {capability.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button 
                      className="mt-6" 
                      onClick={() => startDemo(capability.title.toLowerCase())}
                    >
                      Try {capability.title}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Organization ID Display */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Sensay API Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Organization ID</h4>
                <code className="text-sm bg-gray-100 px-3 py-2 rounded block">
                  E0b1218c-e817-4994-a45b-43e092bd6d4b
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">API Version</h4>
                <code className="text-sm bg-gray-100 px-3 py-2 rounded block">
                  2025-03-25
                </code>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status</h4>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Active & Integrated
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-12">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Real Estate Business?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of real estate professionals who are already using Sensay's Wisdom Engine 
            to revolutionize their property analysis and customer engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => startDemo('full-demo')}
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Rocket className="h-5 w-5 mr-2" />
              Try Live Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              View Documentation
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}