import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import SensayWisdomChatbot from '@/components/SensayWisdomChatbot';
import { 
  Bot, 
  Zap, 
  Home, 
  Users, 
  Calendar, 
  MessageCircle, 
  Video, 
  Volume2,
  TrendingUp,
  DollarSign,
  MapPin,
  Shield,
  Target,
  BarChart3,
  Activity,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  Settings,
  RefreshCw,
  Bell,
  Bookmark,
  ExternalLink,
  Copy,
  Send,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  FileText,
  Image,
  Camera,
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume1,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Palette,
  Type,
  Link,
  Lock,
  Unlock,
  EyeOff,
  Wifi,
  WifiOff,
  Battery,
  Signal,
  Clock,
  Timer,
  Calendar as CalendarIcon,
  Navigation,
  Compass,
  Map,
  Globe,
  Building,
  Building2,
  Home as HomeIcon,
  User,
  User2,
  UserCheck,
  UserX,
  UserPlus,
  Users2,
  UserCog,
  UserMinus,
  UserSearch,
  Brain
} from 'lucide-react';
import { MultimodalAIAssistant } from '@/components/MultimodalAIAssistant';
import { EnhancedChatWidget } from '@/components/EnhancedChatWidget';
import { PropertyShowcase } from '@/components/PropertyShowcase';
import { SmartFAQ } from '@/components/SmartFAQ';
import { VirtualTourBooking } from '@/components/VirtualTourBooking';
import { LeadDashboard } from '@/components/LeadDashboard';
import { AppointmentManager } from '@/components/AppointmentManager';

interface ChatbotMetrics {
  totalInteractions: number;
  activeUsers: number;
  responseTime: number;
  satisfactionScore: number;
  conversionRate: number;
  averageSessionDuration: number;
  topQuestions: Array<{ question: string; count: number }>;
  userFeedback: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface AutomationStatus {
  leadCapture: boolean;
  propertyMatching: boolean;
  scheduling: boolean;
  followUps: boolean;
  analytics: boolean;
  crmSync: boolean;
}

export const PropGuardAIChatbot: React.FC = () => {
  const [metrics, setMetrics] = useState<ChatbotMetrics | null>(null);
  const [automationStatus, setAutomationStatus] = useState<AutomationStatus>({
    leadCapture: true,
    propertyMatching: true,
    scheduling: true,
    followUps: true,
    analytics: true,
    crmSync: true
  });
  const [activeTab, setActiveTab] = useState('chat');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadMetrics();
    loadAutomationStatus();
  }, []);

  const loadMetrics = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleMetrics: ChatbotMetrics = {
      totalInteractions: 2847,
      activeUsers: 156,
      responseTime: 1.2,
      satisfactionScore: 4.7,
      conversionRate: 18.5,
      averageSessionDuration: 12.5,
      topQuestions: [
        { question: 'What properties are available in my budget?', count: 234 },
        { question: 'How do I get pre-approved for a mortgage?', count: 189 },
        { question: 'What are the current market trends?', count: 156 },
        { question: 'Can you schedule a property viewing?', count: 142 },
        { question: 'What are the closing costs?', count: 128 }
      ],
      userFeedback: {
        positive: 89,
        neutral: 8,
        negative: 3
      }
    };

    setMetrics(sampleMetrics);
    setIsLoading(false);
  };

  const loadAutomationStatus = async () => {
    // Simulate loading automation status
    const status: AutomationStatus = {
      leadCapture: true,
      propertyMatching: true,
      scheduling: true,
      followUps: true,
      analytics: true,
      crmSync: true
    };
    setAutomationStatus(status);
  };

  const handleAutomationToggle = (feature: keyof AutomationStatus) => {
    setAutomationStatus(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return `${num.toFixed(1)}%`;
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto p-6 space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-full p-3">
              <Bot className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PropGuard AI Chatbot
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
          Your intelligent real estate assistant powered by advanced AI personality and emotional intelligence
        </p>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-2"
        >
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Real Estate Automation
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Heart className="h-4 w-4 mr-2" />
            Emotional Intelligence
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            Lead Generation
          </Badge>
        </motion.div>
      </motion.div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Interactions</p>
                  <p className="text-2xl font-bold">{formatNumber(metrics.totalInteractions)}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+12.5% this week</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{metrics.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <Activity className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">{formatDuration(metrics.averageSessionDuration)} avg session</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                  <p className="text-2xl font-bold">{metrics.responseTime}s</p>
                </div>
                <Clock className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">Excellent performance</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Satisfaction Score</p>
                  <p className="text-2xl font-bold">{metrics.satisfactionScore}/5.0</p>
                </div>
                <Star className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <Heart className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">{formatPercentage(metrics.userFeedback.positive)}% positive</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Automation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(automationStatus).map(([feature, isActive]) => (
              <div key={feature} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm font-medium capitalize">
                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={isActive ? 'default' : 'secondary'}>
                    {isActive ? 'Active' : 'Inactive'}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAutomationToggle(feature as keyof AutomationStatus)}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Bot className="h-4 w-4 mr-2" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="sensay-wisdom" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Brain className="h-4 w-4 mr-2" />
              Sensay Wisdom
            </TabsTrigger>
            <TabsTrigger value="properties" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Home className="h-4 w-4 mr-2" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="faq" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Smart FAQ
            </TabsTrigger>
            <TabsTrigger value="tours" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Video className="h-4 w-4 mr-2" />
              Virtual Tours
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="h-4 w-4 mr-2" />
              Lead Management
            </TabsTrigger>
            <TabsTrigger value="appointments" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Appointments
            </TabsTrigger>
          </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/20 text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  Multimodal AI Assistant
                  <Badge className="bg-white/20 text-white border-white/30">
                    Alex
                  </Badge>
                </CardTitle>
                <p className="text-blue-100">
                  Interact with Alex, your AI-powered real estate expert with voice and video capabilities
                </p>
              </CardHeader>
              <CardContent className="p-0">
                <MultimodalAIAssistant
                  className="w-full h-[600px]"
                  persona="alex"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Questions */}
          {metrics && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageCircle className="h-5 w-5" />
                    Top Questions
                    <Badge className="bg-white/20 text-white border-white/30">
                      {metrics.topQuestions.length} questions
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {metrics.topQuestions.map((item, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                          <span className="text-sm font-medium">{item.question}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className="bg-purple-100 text-purple-800">
                            {item.count} times
                          </Badge>
                          <Tooltip>
                            <TooltipTrigger>
                              <Button variant="outline" size="sm" className="rounded-full">
                                <Send className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ask this question</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="sensay-wisdom" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/20 text-white">
                      <Star className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  Sensay Wisdom Engine
                  <Badge className="bg-white/20 text-white border-white/30">
                    Enhanced AI
                  </Badge>
                </CardTitle>
                <p className="text-yellow-100">
                  Advanced AI-powered property analysis with Sensay's Wisdom Engine for sophisticated insights and risk assessments
                </p>
                <div className="mt-2">
                  <Badge className="bg-white/20 text-white border-white/30 text-xs">
                    Organization ID: E0b1218c-e817-4994-a45b-43e092bd6d4b
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <SensayWisdomChatbot className="w-full h-[600px]" />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sensay Features Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-blue-900">Enhanced AI</span>
                  </div>
                  <p className="text-xs text-blue-700">Advanced conversation engine with context awareness</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-green-900">Market Intelligence</span>
                  </div>
                  <p className="text-xs text-green-700">Real-time market analysis and trend predictions</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-red-50 to-red-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-red-900">Risk Assessment</span>
                  </div>
                  <p className="text-xs text-red-700">Comprehensive risk analysis with mitigation strategies</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-purple-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-semibold text-sm text-purple-900">Smart Reports</span>
                  </div>
                  <p className="text-xs text-purple-700">Automated property analysis reports with insights</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <PropertyShowcase />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <SmartFAQ />
        </TabsContent>

        <TabsContent value="tours" className="space-y-6">
          <VirtualTourBooking />
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <LeadDashboard />
        </TabsContent>

        <TabsContent value="appointments" className="space-y-6">
          <AppointmentManager />
        </TabsContent>
        </Tabs>
        </motion.div>

      {/* Performance Analytics */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performance Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatPercentage(metrics.conversionRate)}</div>
                <div className="text-sm text-muted-foreground">Conversion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatPercentage(metrics.userFeedback.positive)}%</div>
                <div className="text-sm text-muted-foreground">Positive Feedback</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{formatDuration(metrics.averageSessionDuration)}</div>
                <div className="text-sm text-muted-foreground">Avg Session Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{metrics.responseTime}s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">HeyGen Avatar</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Eleven Labs Voice</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">Sensay Platform</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-sm font-medium">CRM Integration</div>
                <div className="text-xs text-muted-foreground">Connected</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center gap-2">
              <Plus className="h-6 w-6" />
              <span>New Lead</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <Calendar className="h-6 w-6" />
              <span>Schedule Viewing</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Property Valuation</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex flex-col items-center justify-center gap-2">
              <BarChart3 className="h-6 w-6" />
              <span>Market Analysis</span>
            </Button>
          </div>
        </CardContent>
      </Card>

        {/* Enhanced Chat Widget - Available on all pages */}
        <EnhancedChatWidget />
    </motion.div>
  );
};

export default PropGuardAIChatbot;