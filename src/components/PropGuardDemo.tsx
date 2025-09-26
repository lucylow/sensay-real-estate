import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Square, RotateCcw, Volume2, VolumeX,
  Bot, Search, TrendingUp, Database, Globe, Users,
  Zap, Star, CheckCircle, ArrowRight, Clock, Target,
  BarChart3, MessageCircle, Calendar, Shield, Home
} from 'lucide-react';
import { EnhancedSensayAssistant } from '@/components/EnhancedSensayAssistant';
import { PersonalizedSearchEngine } from '@/components/PersonalizedSearchEngine';
import { RealTimeDataIntegration } from '@/components/RealTimeDataIntegration';
import { CRMIntegrationWorkflows } from '@/components/CRMIntegrationWorkflows';
import MultiChannelDeployment from '@/components/MultiChannelDeployment';

interface DemoStep {
  id: string;
  title: string;
  description: string;
  component: string;
  duration: number;
  features: string[];
}

interface PropGuardDemoProps {
  className?: string;
}

export const PropGuardDemo: React.FC<PropGuardDemoProps> = ({ 
  className = '' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [demoProgress, setDemoProgress] = useState(0);
  const [activeComponent, setActiveComponent] = useState('assistant');

  const demoSteps: DemoStep[] = [
    {
      id: '1',
      title: 'Enhanced AI Assistant',
      description: 'Experience PropGuard AI\'s sophisticated conversation flows powered by Sensay\'s Wisdom Engine',
      component: 'assistant',
      duration: 30,
      features: [
        'Natural language property queries',
        'Multi-flow conversation management',
        'AI-powered risk assessment',
        'Multilingual support',
        'Context-aware responses'
      ]
    },
    {
      id: '2',
      title: 'Personalized Property Search',
      description: 'AI-driven property recommendations based on user preferences and behavior patterns',
      component: 'search',
      duration: 25,
      features: [
        'Smart property matching',
        'Real-time scoring algorithm',
        'Preference-based filtering',
        'Investment potential analysis',
        'Risk-adjusted recommendations'
      ]
    },
    {
      id: '3',
      title: 'Real-Time Market Data',
      description: 'Live market trends, pricing updates, and AI-powered market insights',
      component: 'data',
      duration: 20,
      features: [
        'Live market data integration',
        'AI market insights',
        'Price trend analysis',
        'Multi-source data fusion',
        'Real-time updates'
      ]
    },
    {
      id: '4',
      title: 'CRM Integration Workflows',
      description: 'Seamless lead management and automated CRM synchronization',
      component: 'crm',
      duration: 25,
      features: [
        'Automated lead qualification',
        'CRM synchronization',
        'Workflow automation',
        'Lead scoring algorithms',
        'Follow-up automation'
      ]
    },
    {
      id: '5',
      title: 'Multi-Channel Deployment',
      description: 'Deploy across web, WhatsApp, Telegram, email, and SMS channels',
      component: 'deployment',
      duration: 20,
      features: [
        'Multi-platform deployment',
        'Channel-specific optimization',
        'Unified user experience',
        'Cross-channel analytics',
        'Scalable architecture'
      ]
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          const newProgress = prev + (100 / (demoSteps[currentStep].duration * 2));
          if (newProgress >= 100) {
            // Move to next step
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              setActiveComponent(demoSteps[currentStep + 1].component);
              return 0;
            } else {
              // Demo finished
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep, demoSteps]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDemoProgress(0);
    setActiveComponent(demoSteps[0].component);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setDemoProgress(0);
    setActiveComponent(demoSteps[0].component);
  };

  const handleStepSelect = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setActiveComponent(demoSteps[stepIndex].component);
    setDemoProgress(0);
    setIsPlaying(false);
  };

  const getComponentIcon = (component: string) => {
    switch (component) {
      case 'assistant': return <Bot className="h-5 w-5" />;
      case 'search': return <Search className="h-5 w-5" />;
      case 'data': return <TrendingUp className="h-5 w-5" />;
      case 'crm': return <Database className="h-5 w-5" />;
      case 'deployment': return <Globe className="h-5 w-5" />;
      default: return <Bot className="h-5 w-5" />;
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'assistant':
        return <EnhancedSensayAssistant className="h-[600px]" />;
      case 'search':
        return <PersonalizedSearchEngine />;
      case 'data':
        return <RealTimeDataIntegration />;
      case 'crm':
        return <CRMIntegrationWorkflows />;
      case 'deployment':
        return <MultiChannelDeployment />;
      default:
        return <EnhancedSensayAssistant className="h-[600px]" />;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Play className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">PropGuard AI Demo</h1>
          <Badge variant="secondary" className="text-sm">
            Sensay Hackathon
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience the full power of PropGuard AI's real estate chatbot 
          built on Sensay's platform. Watch our comprehensive demo showcasing 
          all advanced features and capabilities.
        </p>
      </div>

      {/* Demo Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-primary" />
            Demo Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button onClick={handlePlay} disabled={isPlaying}>
                <Play className="h-4 w-4 mr-1" />
                Play
              </Button>
              <Button onClick={handlePause} disabled={!isPlaying} variant="outline">
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
              <Button onClick={handleStop} variant="outline">
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                onClick={() => setIsMuted(!isMuted)} 
                variant="outline"
                size="sm"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <span className="text-sm text-muted-foreground">
                {isMuted ? 'Muted' : 'Audio On'}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Step {currentStep + 1} of {demoSteps.length}</span>
              <span>{Math.round(demoProgress)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${demoProgress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Steps Navigation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Demo Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {demoSteps.map((step, index) => (
              <Card 
                key={step.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  currentStep === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleStepSelect(index)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    {getComponentIcon(step.component)}
                    <CardTitle className="text-sm">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {step.duration}s
                    </Badge>
                    {currentStep === index && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Info */}
      <Alert className="border-blue-200 bg-blue-50">
        <CheckCircle className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          <div className="space-y-2">
            <div className="font-medium">
              Step {currentStep + 1}: {demoSteps[currentStep].title}
            </div>
            <div className="text-sm">{demoSteps[currentStep].description}</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {demoSteps[currentStep].features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Active Component Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getComponentIcon(activeComponent)}
            {demoSteps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderActiveComponent()}
        </CardContent>
      </Card>

      {/* Key Features Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            Key Features Showcase
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Sensay AI Integration</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Sensay's Wisdom Engine for sophisticated conversations
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Personalized Search</h3>
              <p className="text-sm text-muted-foreground">
                AI-driven recommendations based on user preferences and behavior
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real-Time Data</h3>
              <p className="text-sm text-muted-foreground">
                Live market trends and pricing updates with AI insights
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">CRM Integration</h3>
              <p className="text-sm text-muted-foreground">
                Seamless lead management and automated workflows
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Multi-Channel</h3>
              <p className="text-sm text-muted-foreground">
                Deploy across web, WhatsApp, Telegram, email, and SMS
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">PropGuard AI</h3>
              <p className="text-sm text-muted-foreground">
                Advanced property risk assessment and valuation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Specifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Technical Specifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Platform Integration</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sensay Wisdom Engine API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>PropGuard AI Backend</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Multi-source Data Integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time Analytics</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Deployment Channels</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Web Chat Widget</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>WhatsApp Business API</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Telegram Bot</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Email Integration</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Ready to Experience PropGuard AI?</h3>
            <p className="text-muted-foreground">
              This demo showcases the power of combining Sensay's conversational AI 
              with PropGuard's property expertise. Ready to build something amazing?
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <ArrowRight className="h-4 w-4 mr-2" />
                Start Building
              </Button>
              <Button size="lg" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
