import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Globe, 
  Shield, 
  Target, 
  Zap, 
  TrendingUp, 
  MessageCircle, 
  Users, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  BarChart3,
  PieChart,
  Activity,
  Cpu,
  Database,
  Network,
  Smartphone,
  Monitor,
  Headphones,
  Mic,
  Video,
  Camera,
  FileText,
  Search,
  Filter,
  Star,
  Award,
  Lock,
  Eye,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Share2,
  Bell,
  Mail,
  Phone,
  MapPin,
  Clock,
  DollarSign,
  Percent,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Send,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageSquare,
  Bot,
  Sparkles,
  Lightbulb,
  Rocket,
  Gauge,
  Layers,
  Workflow,
  GitBranch,
  Code,
  Terminal,
  Server,
  Cloud,
  Wifi,
  Signal,
  Battery,
  Power,
  Volume2,
  VolumeX,
  Music,
  Headphone,
  Radio,
  Tv,
  Film,
  Image,
  Photo,
  CameraIcon,
  VideoCamera,
  VideoCameraSlash,
  Microphone,
  MicrophoneOff,
  SpeakerWave,
  SpeakerXMark,
  BellRing,
  BellSlash,
  Notification,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  InfoIcon,
  HelpCircle,
  QuestionMarkCircle,
  ExclamationTriangle,
  Warning,
  Error,
  Success,
  Loading,
  Spinner,
  Loader,
  Loader2,
  Timer,
  Stopwatch,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarHeart,
  CalendarStar,
  CalendarClock,
  CalendarEvent,
  Calendar as CalendarIcon,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  Clock1,
  Clock2
} from 'lucide-react';

interface AIService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'processing' | 'idle' | 'error';
  metrics: {
    accuracy: number;
    speed: number;
    reliability: number;
  };
  features: string[];
  apiEndpoint?: string;
  lastUpdated: Date;
}

interface LeadScore {
  leadId: string;
  name: string;
  score: number;
  factors: {
    engagement: number;
    budget: number;
    timeline: number;
    location: number;
    propertyType: number;
  };
  status: 'hot' | 'warm' | 'cold';
  nextAction: string;
}

interface NurtureCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'social';
  status: 'active' | 'paused' | 'completed';
  recipients: number;
  openRate: number;
  clickRate: number;
  conversionRate: number;
  nextSend: Date;
}

export const AIServicesShowcase: React.FC = () => {
  const [activeService, setActiveService] = useState<string>('sensay');
  const [aiServices, setAIServices] = useState<AIService[]>([]);
  const [leadScores, setLeadScores] = useState<LeadScore[]>([]);
  const [nurtureCampaigns, setNurtureCampaigns] = useState<NurtureCampaign[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemHealth, setSystemHealth] = useState({
    overall: 98,
    sensay: 99,
    propguard: 97,
    leadScoring: 96,
    nurturing: 95
  });

  useEffect(() => {
    loadAIServices();
    loadLeadScores();
    loadNurtureCampaigns();
  }, []);

  const loadAIServices = () => {
    const services: AIService[] = [
      {
        id: 'sensay',
        name: 'Sensay API',
        description: 'Multi-language conversation handling with advanced NLP and cultural context awareness',
        icon: <Globe className="w-6 h-6" />,
        status: 'active',
        metrics: { accuracy: 94, speed: 98, reliability: 99 },
        features: [
          '12+ Language Support',
          'Real-time Translation',
          'Cultural Context Awareness',
          'Conversation Memory',
          'Intent Recognition',
          'Sentiment Analysis'
        ],
        apiEndpoint: 'api.sensay.ai/v1/chat',
        lastUpdated: new Date()
      },
      {
        id: 'propguard',
        name: 'PropGuard AI',
        description: 'Advanced property valuations and comprehensive risk assessment using machine learning',
        icon: <Shield className="w-6 h-6" />,
        status: 'active',
        metrics: { accuracy: 96, speed: 95, reliability: 98 },
        features: [
          'Automated Valuation Models',
          'Climate Risk Analysis',
          'Market Intelligence',
          'Investment Scoring',
          'Compliance Checking',
          'Portfolio Optimization'
        ],
        apiEndpoint: 'api.propguard.ai/v1/analysis',
        lastUpdated: new Date()
      },
      {
        id: 'leadScoring',
        name: 'Custom Lead Scoring',
        description: 'Intelligent lead qualification algorithm with predictive analytics',
        icon: <Target className="w-6 h-6" />,
        status: 'active',
        metrics: { accuracy: 92, speed: 99, reliability: 97 },
        features: [
          'Behavioral Analysis',
          'Engagement Scoring',
          'Budget Prediction',
          'Timeline Estimation',
          'Property Matching',
          'Conversion Probability'
        ],
        apiEndpoint: 'api.propguard.ai/v1/leads/score',
        lastUpdated: new Date()
      },
      {
        id: 'nurturing',
        name: 'Automated Nurturing',
        description: 'Multi-sequence follow-up campaigns with personalized content',
        icon: <Zap className="w-6 h-6" />,
        status: 'active',
        metrics: { accuracy: 89, speed: 97, reliability: 96 },
        features: [
          'Email Automation',
          'SMS Campaigns',
          'Social Media Integration',
          'Personalized Content',
          'A/B Testing',
          'Performance Analytics'
        ],
        apiEndpoint: 'api.propguard.ai/v1/campaigns',
        lastUpdated: new Date()
      }
    ];
    setAIServices(services);
  };

  const loadLeadScores = () => {
    const leads: LeadScore[] = [
      {
        leadId: 'L001',
        name: 'Sarah Johnson',
        score: 87,
        factors: { engagement: 90, budget: 85, timeline: 88, location: 85, propertyType: 89 },
        status: 'hot',
        nextAction: 'Schedule property viewing'
      },
      {
        leadId: 'L002',
        name: 'Michael Chen',
        score: 72,
        factors: { engagement: 75, budget: 70, timeline: 68, location: 78, propertyType: 70 },
        status: 'warm',
        nextAction: 'Send property recommendations'
      },
      {
        leadId: 'L003',
        name: 'Emma Rodriguez',
        score: 45,
        factors: { engagement: 40, budget: 50, timeline: 45, location: 48, propertyType: 42 },
        status: 'cold',
        nextAction: 'Re-engagement campaign'
      },
      {
        leadId: 'L004',
        name: 'David Kim',
        score: 91,
        factors: { engagement: 95, budget: 90, timeline: 88, location: 92, propertyType: 90 },
        status: 'hot',
        nextAction: 'Prepare offer documents'
      }
    ];
    setLeadScores(leads);
  };

  const loadNurtureCampaigns = () => {
    const campaigns: NurtureCampaign[] = [
      {
        id: 'C001',
        name: 'New Lead Welcome Series',
        type: 'email',
        status: 'active',
        recipients: 1247,
        openRate: 68.5,
        clickRate: 23.4,
        conversionRate: 12.8,
        nextSend: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours from now
      },
      {
        id: 'C002',
        name: 'Property Updates SMS',
        type: 'sms',
        status: 'active',
        recipients: 892,
        openRate: 94.2,
        clickRate: 45.6,
        conversionRate: 18.3,
        nextSend: new Date(Date.now() + 4 * 60 * 60 * 1000) // 4 hours from now
      },
      {
        id: 'C003',
        name: 'Market Intelligence Newsletter',
        type: 'email',
        status: 'active',
        recipients: 2156,
        openRate: 42.1,
        clickRate: 15.8,
        conversionRate: 8.2,
        nextSend: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      },
      {
        id: 'C004',
        name: 'Follow-up Call Campaign',
        type: 'call',
        status: 'paused',
        recipients: 156,
        openRate: 78.9,
        clickRate: 56.2,
        conversionRate: 34.6,
        nextSend: new Date(Date.now() + 6 * 60 * 60 * 1000) // 6 hours from now
      }
    ];
    setNurtureCampaigns(campaigns);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'idle': return 'text-gray-600 bg-gray-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 80) return 'Hot Lead';
    if (score >= 60) return 'Warm Lead';
    return 'Cold Lead';
  };

  const renderSensayAPI = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Language Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Supported Languages</span>
                <Badge variant="secondary">12+</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Translation Accuracy</span>
                <span className="text-sm font-bold text-green-600">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Response Time</span>
                <span className="text-sm font-bold text-blue-600">180ms</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-600" />
              Conversation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Active Conversations</span>
                <Badge variant="default">1,247</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-sm font-bold text-green-600">98.7%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Avg. Response Quality</span>
                <span className="text-sm font-bold text-blue-600">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Live Conversation Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">User Message (Spanish)</span>
                <Badge variant="outline">🇪🇸 Español</Badge>
              </div>
              <p className="text-sm text-gray-700">
                "Estoy buscando una casa de 3 habitaciones en el centro de la ciudad. ¿Pueden ayudarme?"
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Sensay AI Response</span>
                <div className="flex gap-2">
                  <Badge variant="outline">🇺🇸 English</Badge>
                  <Badge variant="outline">AI</Badge>
                </div>
              </div>
              <p className="text-sm text-gray-700">
                "¡Por supuesto! Puedo ayudarte a encontrar la casa perfecta. Basándome en tu solicitud de 3 habitaciones en el centro de la ciudad, tengo varias opciones excelentes que podrían interesarte. ¿Te gustaría que te muestre algunas propiedades disponibles?"
              </p>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>AI Processing:</strong> Detected Spanish language → Translated to English → Generated response → Translated back to Spanish with cultural context
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPropGuardAI = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Valuation Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">96.3%</div>
              <p className="text-sm text-gray-600">Within 5% of actual sale price</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">97.8%</div>
              <p className="text-sm text-gray-600">Risk prediction accuracy</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Market Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">94.1%</div>
              <p className="text-sm text-gray-600">Market trend accuracy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Property Analysis Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Property Details</h4>
                <div className="space-y-1 text-sm">
                  <div>Address: 123 Main Street, NYC</div>
                  <div>Type: 3BR/2BA Condo</div>
                  <div>Size: 1,200 sq ft</div>
                  <div>Age: 5 years</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AI Analysis</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Estimated Value:</span>
                    <span className="font-bold text-green-600">$850,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <span className="font-bold text-yellow-600">Medium (6.2/10)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Investment Grade:</span>
                    <span className="font-bold text-blue-600">B+</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Alert>
              <Brain className="h-4 w-4" />
              <AlertDescription>
                <strong>AI Insights:</strong> This property shows strong investment potential with excellent location and modern amenities. Risk factors include recent market volatility and upcoming zoning changes.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeadScoring = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Lead Scoring Algorithm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Engagement Level</span>
                  <span className="text-sm text-gray-600">Weight: 30%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Budget Match</span>
                  <span className="text-sm text-gray-600">Weight: 25%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Timeline Urgency</span>
                  <span className="text-sm text-gray-600">Weight: 20%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Location Preference</span>
                  <span className="text-sm text-gray-600">Weight: 15%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Property Type Match</span>
                  <span className="text-sm text-gray-600">Weight: 10%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Lead Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leadScores.map((lead) => (
                <div key={lead.leadId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      lead.status === 'hot' ? 'bg-red-500' : 
                      lead.status === 'warm' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <div className="font-medium text-sm">{lead.name}</div>
                      <div className="text-xs text-gray-600">{lead.nextAction}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </div>
                    <div className="text-xs text-gray-600">
                      {getScoreStatus(lead.score)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderNurturing = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nurtureCampaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span>{campaign.name}</span>
                <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                  {campaign.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                {campaign.type === 'email' && <Mail className="w-4 h-4" />}
                {campaign.type === 'sms' && <Smartphone className="w-4 h-4" />}
                {campaign.type === 'call' && <Phone className="w-4 h-4" />}
                {campaign.type === 'social' && <Share2 className="w-4 h-4" />}
                <span className="text-xs text-gray-600 capitalize">{campaign.type}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Recipients</span>
                  <span className="font-medium">{campaign.recipients.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Open Rate</span>
                  <span className="font-medium text-green-600">{campaign.openRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Click Rate</span>
                  <span className="font-medium text-blue-600">{campaign.clickRate}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Conversion</span>
                  <span className="font-medium text-purple-600">{campaign.conversionRate}%</span>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Next send: {campaign.nextSend.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">4,451</div>
              <div className="text-sm text-gray-600">Total Recipients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">68.2%</div>
              <div className="text-sm text-gray-600">Average Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">18.5%</div>
              <div className="text-sm text-gray-600">Average Conversion</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Services Showcase
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Experience the power of our advanced AI services: Sensay API for multilingual conversations, 
            PropGuard AI for property analysis, intelligent lead scoring, and automated nurturing campaigns.
          </p>
        </div>

        {/* System Health */}
        <div className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-600" />
                System Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">{systemHealth.overall}%</div>
                  <div className="text-sm text-gray-600">Overall</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{systemHealth.sensay}%</div>
                  <div className="text-sm text-gray-600">Sensay API</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{systemHealth.propguard}%</div>
                  <div className="text-sm text-gray-600">PropGuard AI</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{systemHealth.leadScoring}%</div>
                  <div className="text-sm text-gray-600">Lead Scoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600 mb-1">{systemHealth.nurturing}%</div>
                  <div className="text-sm text-gray-600">Nurturing</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Services Tabs */}
        <Tabs value={activeService} onValueChange={setActiveService} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sensay" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Sensay API
            </TabsTrigger>
            <TabsTrigger value="propguard" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              PropGuard AI
            </TabsTrigger>
            <TabsTrigger value="leadScoring" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Lead Scoring
            </TabsTrigger>
            <TabsTrigger value="nurturing" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Nurturing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sensay" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderSensayAPI()}
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiServices.find(s => s.id === 'sensay') && (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor('active')}>Active</Badge>
                          <span className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Accuracy</span>
                              <span className="text-sm font-bold text-green-600">94%</span>
                            </div>
                            <Progress value={94} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Speed</span>
                              <span className="text-sm font-bold text-blue-600">98%</span>
                            </div>
                            <Progress value={98} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Reliability</span>
                              <span className="text-sm font-bold text-purple-600">99%</span>
                            </div>
                            <Progress value={99} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features</h4>
                          <div className="grid grid-cols-1 gap-1">
                            {aiServices.find(s => s.id === 'sensay')?.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="propguard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderPropGuardAI()}
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiServices.find(s => s.id === 'propguard') && (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor('active')}>Active</Badge>
                          <span className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Accuracy</span>
                              <span className="text-sm font-bold text-green-600">96%</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Speed</span>
                              <span className="text-sm font-bold text-blue-600">95%</span>
                            </div>
                            <Progress value={95} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Reliability</span>
                              <span className="text-sm font-bold text-purple-600">98%</span>
                            </div>
                            <Progress value={98} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features</h4>
                          <div className="grid grid-cols-1 gap-1">
                            {aiServices.find(s => s.id === 'propguard')?.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leadScoring" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderLeadScoring()}
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiServices.find(s => s.id === 'leadScoring') && (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor('active')}>Active</Badge>
                          <span className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Accuracy</span>
                              <span className="text-sm font-bold text-green-600">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Speed</span>
                              <span className="text-sm font-bold text-blue-600">99%</span>
                            </div>
                            <Progress value={99} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Reliability</span>
                              <span className="text-sm font-bold text-purple-600">97%</span>
                            </div>
                            <Progress value={97} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features</h4>
                          <div className="grid grid-cols-1 gap-1">
                            {aiServices.find(s => s.id === 'leadScoring')?.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nurturing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {renderNurturing()}
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Service Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiServices.find(s => s.id === 'nurturing') && (
                      <>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor('active')}>Active</Badge>
                          <span className="text-sm text-gray-600">
                            Last updated: {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Accuracy</span>
                              <span className="text-sm font-bold text-green-600">89%</span>
                            </div>
                            <Progress value={89} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Speed</span>
                              <span className="text-sm font-bold text-blue-600">97%</span>
                            </div>
                            <Progress value={97} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Reliability</span>
                              <span className="text-sm font-bold text-purple-600">96%</span>
                            </div>
                            <Progress value={96} className="h-2" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Key Features</h4>
                          <div className="grid grid-cols-1 gap-1">
                            {aiServices.find(s => s.id === 'nurturing')?.features.map((feature, index) => (
                              <div key={index} className="flex items-center gap-2 text-xs">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">12+</div>
            <div className="text-gray-600">Languages Supported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">96.3%</div>
            <div className="text-gray-600">Valuation Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4,451</div>
            <div className="text-gray-600">Active Leads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">18.5%</div>
            <div className="text-gray-600">Avg. Conversion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};
