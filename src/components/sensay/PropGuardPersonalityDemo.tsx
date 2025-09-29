import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  MessageCircle, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  Globe, 
  Heart, 
  TrendingUp,
  Star,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Clock,
  Languages,
  Mic,
  Video,
  Bot,
  Settings,
  Play
} from 'lucide-react';

interface ConversationMetric {
  label: string;
  value: number;
  change: number;
  color: string;
}

interface UserTypeCardProps {
  type: string;
  description: string;
  percentage: number;
  color: string;
  icon: React.ComponentType<any>;
}

interface LanguageCardProps {
  language: string;
  usage: number;
  flag: string;
}

interface EmotionalDemoProps {
  emotion: string;
  description: string;
  intensity: number;
  color: string;
}

export default function PropGuardPersonalityDemo() {
  const [currentDemo, setCurrentDemo] = useState('overview');
  const [animationStep, setAnimationStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const conversationMetrics: ConversationMetric[] = [
    { label: 'Engagement Rate', value: 94, change: 12, color: 'text-green-600' },
    { label: 'Response Accuracy', value: 96, change: 8, color: 'text-blue-600' },
    { label: 'User Satisfaction', value: 91, change: 15, color: 'text-purple-600' },
    { label: 'Conversion Rate', value: 23, change: 28, color: 'text-orange-600' }
  ];

  const userTypes: UserTypeCardProps[] = [
    {
      type: 'First-time Buyers',
      description: 'Young professionals seeking their first property',
      percentage: 45,
      color: 'bg-blue-100 text-blue-800',
      icon: Users
    },
    {
      type: 'Investors',
      description: 'Experienced buyers looking for investment opportunities',
      percentage: 30,
      color: 'bg-green-100 text-green-800',
      icon: TrendingUp
    },
    {
      type: 'Upgraders',
      description: 'Families looking to upgrade their current home',
      percentage: 25,
      color: 'bg-purple-100 text-purple-800',
      icon: Target
    }
  ];

  const languages: LanguageCardProps[] = [
    { language: 'English', usage: 78, flag: '🇺🇸' },
    { language: 'Mandarin', usage: 12, flag: '🇨🇳' },
    { language: 'Spanish', usage: 6, flag: '🇪🇸' },
    { language: 'Arabic', usage: 4, flag: '🇸🇦' }
  ];

  const emotionalStates: EmotionalDemoProps[] = [
    {
      emotion: 'Excitement',
      description: 'When discussing dream properties',
      intensity: 85,
      color: 'bg-yellow-100 border-yellow-300'
    },
    {
      emotion: 'Anxiety',
      description: 'When addressing budget concerns',
      intensity: 30,
      color: 'bg-red-100 border-red-300'
    },
    {
      emotion: 'Confidence',
      description: 'When providing market insights',
      intensity: 95,
      color: 'bg-blue-100 border-blue-300'
    },
    {
      emotion: 'Empathy',
      description: 'When understanding client needs',
      intensity: 90,
      color: 'bg-purple-100 border-purple-300'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setAnimationStep((prev) => (prev + 1) % 4);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            Personality Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Empathy Level</span>
              <Badge variant="secondary">Expert</Badge>
            </div>
            <Progress value={92} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Market Knowledge</span>
              <Badge variant="secondary">Advanced</Badge>
            </div>
            <Progress value={88} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Communication Style</span>
              <Badge variant="secondary">Adaptive</Badge>
            </div>
            <Progress value={95} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-600" />
            Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {conversationMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}%
                </div>
                <div className="text-xs text-gray-600">{metric.label}</div>
                <div className="text-xs text-green-600">
                  +{metric.change}% this month
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPersonalityTraits = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {emotionalStates.map((state, index) => (
        <motion.div
          key={state.emotion}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className={`border-2 ${state.color} hover:shadow-lg transition-shadow`}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">{state.emotion}</div>
                <div className="text-sm text-gray-600 mb-3">{state.description}</div>
                <div className="relative">
                  <Progress value={state.intensity} className="h-3" />
                  <div className="text-xs mt-1 text-gray-500">
                    {state.intensity}% intensity
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const renderUserAnalytics = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            User Demographics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userTypes.map((userType, index) => (
              <motion.div
                key={userType.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${userType.color}`}>
                        <userType.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">{userType.type}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {userType.description}
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Share</span>
                            <span className="text-sm font-semibold">
                              {userType.percentage}%
                            </span>
                          </div>
                          <Progress value={userType.percentage} className="h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-600" />
            Language Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{lang.flag}</div>
                <div className="text-sm font-medium">{lang.language}</div>
                <div className="text-lg font-bold text-blue-600">{lang.usage}%</div>
                <Progress value={lang.usage} className="h-2 mt-2" />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderChatInterface = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            PropGuard AI Assistant
            <Badge className="ml-auto bg-white/20 text-white">Live Demo</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 bg-gray-50 flex flex-col">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm max-w-xs">
                  <p className="text-sm">
                    Hi! I'm your PropGuard AI assistant. I can help you analyze properties, 
                    assess risks, and provide market insights. What would you like to know?
                  </p>
                </div>
              </motion.div>

              <AnimatePresence>
                {animationStep >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-3 justify-end"
                  >
                    <div className="bg-blue-600 text-white rounded-lg p-3 shadow-sm max-w-xs">
                      <p className="text-sm">
                        I'm looking at a property in Sydney. Can you help me understand 
                        the risks and market trends?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-600" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {animationStep >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-sm">
                      <p className="text-sm">
                        Absolutely! Sydney's market is showing strong fundamentals. 
                        I've analyzed the area's flood risk (low), fire risk (moderate), 
                        and price trends (+8.2% YoY). Would you like a detailed risk assessment?
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          Low Flood Risk
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          +8.2% Growth
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Button
                  variant={isPlaying ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isPlaying ? 'Stop Demo' : 'Start Demo'}
                </Button>
                <Button variant="outline" size="sm">
                  <Mic className="w-4 h-4 mr-2" />
                  Voice
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderAnalytics = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Real-time Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Avg Response Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">1.2s</div>
              <div className="text-xs text-green-600">-0.3s improvement</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Active Conversations</span>
              </div>
              <div className="text-2xl font-bold text-green-600">247</div>
              <div className="text-xs text-green-600">+23% vs yesterday</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium">Satisfaction Score</span>
              </div>
              <div className="text-2xl font-bold text-yellow-600">4.8</div>
              <div className="text-xs text-green-600">+0.2 this week</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium">Issue Resolution</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-xs text-green-600">+5% this month</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            PropGuard AI Personality Engine
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of real estate with our advanced AI personality that adapts, 
            learns, and delivers personalized property insights with human-like empathy.
          </p>
        </motion.div>

        <Tabs value={currentDemo} onValueChange={setCurrentDemo} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personality">Personality</TabsTrigger>
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="personality" className="space-y-6">
            {renderPersonalityTraits()}
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            {renderChatInterface()}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {renderAnalytics()}
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {renderUserAnalytics()}
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Property Business?</h3>
              <p className="text-lg mb-6 opacity-90">
                Join thousands of real estate professionals using PropGuard AI to deliver 
                exceptional client experiences and drive better outcomes.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  <Settings className="w-4 h-4 mr-2" />
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}