import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Brain, 
  Zap, 
  BarChart3, 
  PieChart,
  Activity,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  Award,
  Clock,
  DollarSign,
  MapPin,
  Home,
  CalendarIcon,
  Phone,
  Mail,
  MessageSquare,
  Eye,
  Filter,
  Search,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Share2,
  Bell,
  ExternalLink,
  Copy,
  Send,
  Bookmark,
  Heart,
  ThumbsUp,
  MessageCircle,
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
  Headphones,
  Radio,
  Tv,
  Film,
  Image,
  Camera,
  Video,
  Mic,
  MicOff,
  BellRing,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader,
  Loader2,
  Timer,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  Calendar as CalendarComponent,
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
  Clock2,
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Percent,
  TrendingDown
} from 'lucide-react';

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  score: number;
  status: 'hot' | 'warm' | 'cold';
  source: string;
  createdAt: Date;
  lastActivity: Date;
  factors: {
    engagement: number;
    budget: number;
    timeline: number;
    location: number;
    propertyType: number;
    companySize: number;
    decisionMaker: number;
    urgency: number;
  };
  interactions: LeadInteraction[];
  nextAction: string;
  assignedAgent?: string;
  tags: string[];
}

interface LeadInteraction {
  id: string;
  type: 'email' | 'call' | 'meeting' | 'website' | 'social' | 'demo';
  timestamp: Date;
  description: string;
  outcome: 'positive' | 'neutral' | 'negative';
  score: number;
}

interface ScoringModel {
  name: string;
  version: string;
  accuracy: number;
  factors: {
    name: string;
    weight: number;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  lastUpdated: Date;
}

export const IntelligentLeadScoring: React.FC = () => {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [scoringModel, setScoringModel] = useState<ScoringModel | null>(null);
  const [selectedLead, setSelectedLead] = useState<LeadData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelAccuracy, setModelAccuracy] = useState({
    overall: 94.2,
    engagement: 96.8,
    budget: 91.5,
    timeline: 93.1,
    location: 89.7,
    propertyType: 95.3
  });

  useEffect(() => {
    loadLeads();
    loadScoringModel();
  }, []);

  const loadLeads = () => {
    const mockLeads: LeadData[] = [
      {
        id: 'L001',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        phone: '+1 (555) 123-4567',
        company: 'TechCorp Solutions',
        score: 87,
        status: 'hot',
        source: 'Website Contact Form',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
        factors: {
          engagement: 90,
          budget: 85,
          timeline: 88,
          location: 85,
          propertyType: 89,
          companySize: 82,
          decisionMaker: 95,
          urgency: 92
        },
        interactions: [
          {
            id: 'I001',
            type: 'email',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            description: 'Opened property recommendation email',
            outcome: 'positive',
            score: 8
          },
          {
            id: 'I002',
            type: 'website',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            description: 'Viewed 5 properties in downtown area',
            outcome: 'positive',
            score: 9
          },
          {
            id: 'I003',
            type: 'call',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            description: 'Scheduled callback for property viewing',
            outcome: 'positive',
            score: 10
          }
        ],
        nextAction: 'Schedule property viewing',
        assignedAgent: 'John Smith',
        tags: ['High Budget', 'Downtown', 'Commercial']
      },
      {
        id: 'L002',
        name: 'Michael Chen',
        email: 'michael.chen@startup.io',
        phone: '+1 (555) 234-5678',
        company: 'StartupIO',
        score: 72,
        status: 'warm',
        source: 'LinkedIn Ad',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        factors: {
          engagement: 75,
          budget: 70,
          timeline: 68,
          location: 78,
          propertyType: 70,
          companySize: 65,
          decisionMaker: 60,
          urgency: 55
        },
        interactions: [
          {
            id: 'I004',
            type: 'social',
            timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            description: 'Engaged with property post on LinkedIn',
            outcome: 'positive',
            score: 6
          },
          {
            id: 'I005',
            type: 'email',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: 'Clicked on market report link',
            outcome: 'positive',
            score: 7
          }
        ],
        nextAction: 'Send property recommendations',
        assignedAgent: 'Jane Doe',
        tags: ['Startup', 'Tech', 'Flexible']
      },
      {
        id: 'L003',
        name: 'Emma Rodriguez',
        email: 'emma.rodriguez@consulting.com',
        phone: '+1 (555) 345-6789',
        company: 'Rodriguez Consulting',
        score: 45,
        status: 'cold',
        source: 'Referral',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        factors: {
          engagement: 40,
          budget: 50,
          timeline: 45,
          location: 48,
          propertyType: 42,
          companySize: 55,
          decisionMaker: 70,
          urgency: 30
        },
        interactions: [
          {
            id: 'I006',
            type: 'email',
            timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            description: 'Opened initial contact email',
            outcome: 'neutral',
            score: 4
          },
          {
            id: 'I007',
            type: 'call',
            timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
            description: 'Voicemail left, no callback',
            outcome: 'negative',
            score: 2
          }
        ],
        nextAction: 'Re-engagement campaign',
        tags: ['Consulting', 'Long-term', 'Research Phase']
      },
      {
        id: 'L004',
        name: 'David Kim',
        email: 'david.kim@enterprise.com',
        phone: '+1 (555) 456-7890',
        company: 'Enterprise Corp',
        score: 91,
        status: 'hot',
        source: 'Direct Contact',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        lastActivity: new Date(Date.now() - 30 * 60 * 1000),
        factors: {
          engagement: 95,
          budget: 90,
          timeline: 88,
          location: 92,
          propertyType: 90,
          companySize: 95,
          decisionMaker: 98,
          urgency: 85
        },
        interactions: [
          {
            id: 'I008',
            type: 'meeting',
            timestamp: new Date(Date.now() - 30 * 60 * 1000),
            description: 'Completed property viewing meeting',
            outcome: 'positive',
            score: 10
          },
          {
            id: 'I009',
            type: 'demo',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            description: 'Attended virtual property demo',
            outcome: 'positive',
            score: 9
          }
        ],
        nextAction: 'Prepare offer documents',
        assignedAgent: 'John Smith',
        tags: ['Enterprise', 'High Value', 'Urgent']
      }
    ];
    setLeads(mockLeads);
  };

  const loadScoringModel = () => {
    const model: ScoringModel = {
      name: 'PropGuard Lead Scoring v2.1',
      version: '2.1.3',
      accuracy: 94.2,
      factors: [
        {
          name: 'Engagement Level',
          weight: 25,
          description: 'Email opens, website visits, social interactions',
          impact: 'high'
        },
        {
          name: 'Budget Match',
          weight: 20,
          description: 'Property price vs stated budget range',
          impact: 'high'
        },
        {
          name: 'Timeline Urgency',
          weight: 15,
          description: 'How quickly they need to make a decision',
          impact: 'medium'
        },
        {
          name: 'Location Preference',
          weight: 12,
          description: 'Geographic alignment with available properties',
          impact: 'medium'
        },
        {
          name: 'Property Type Match',
          weight: 10,
          description: 'Interest alignment with available inventory',
          impact: 'medium'
        },
        {
          name: 'Company Size',
          weight: 8,
          description: 'Organization size and purchasing power',
          impact: 'low'
        },
        {
          name: 'Decision Maker Status',
          weight: 7,
          description: 'Authority level in purchasing decisions',
          impact: 'high'
        },
        {
          name: 'Urgency Indicators',
          weight: 3,
          description: 'Explicit urgency signals in communications',
          impact: 'medium'
        }
      ],
      lastUpdated: new Date()
    };
    setScoringModel(model);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'text-red-600 bg-red-100';
      case 'warm': return 'text-yellow-600 bg-yellow-100';
      case 'cold': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'meeting': return <CalendarIcon className="w-4 h-4" />;
      case 'website': return <Eye className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      case 'demo': return <Video className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateOverallScore = (factors: LeadData['factors']) => {
    const weights = {
      engagement: 25,
      budget: 20,
      timeline: 15,
      location: 12,
      propertyType: 10,
      companySize: 8,
      decisionMaker: 7,
      urgency: 3
    };

    let totalScore = 0;
    let totalWeight = 0;

    Object.entries(factors).forEach(([key, value]) => {
      const weight = weights[key as keyof typeof weights] || 0;
      totalScore += (value * weight) / 100;
      totalWeight += weight;
    });

    return Math.round(totalScore / totalWeight * 100);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium">Hot Leads</span>
            </div>
            <div className="text-2xl font-bold text-red-600">
              {leads.filter(l => l.status === 'hot').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium">Warm Leads</span>
            </div>
            <div className="text-2xl font-bold text-yellow-600">
              {leads.filter(l => l.status === 'warm').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium">Cold Leads</span>
            </div>
            <div className="text-2xl font-bold text-gray-600">
              {leads.filter(l => l.status === 'cold').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Avg. Score</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lead Scoring Algorithm Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Accuracy</span>
                  <span className="text-sm font-bold text-green-600">{modelAccuracy.overall}%</span>
                </div>
                <Progress value={modelAccuracy.overall} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Engagement Prediction</span>
                  <span className="text-sm font-bold text-blue-600">{modelAccuracy.engagement}%</span>
                </div>
                <Progress value={modelAccuracy.engagement} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Budget Estimation</span>
                  <span className="text-sm font-bold text-purple-600">{modelAccuracy.budget}%</span>
                </div>
                <Progress value={modelAccuracy.budget} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Timeline Prediction</span>
                  <span className="text-sm font-bold text-orange-600">{modelAccuracy.timeline}%</span>
                </div>
                <Progress value={modelAccuracy.timeline} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Location Match</span>
                  <span className="text-sm font-bold text-yellow-600">{modelAccuracy.location}%</span>
                </div>
                <Progress value={modelAccuracy.location} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Property Type</span>
                  <span className="text-sm font-bold text-green-600">{modelAccuracy.propertyType}%</span>
                </div>
                <Progress value={modelAccuracy.propertyType} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  <strong>Model Version:</strong> {scoringModel?.version}<br />
                  <strong>Last Updated:</strong> {scoringModel?.lastUpdated.toLocaleDateString()}<br />
                  <strong>Training Data:</strong> 50,000+ leads
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderLeadList = () => (
    <div className="space-y-4">
      {leads.map((lead) => (
        <Card 
          key={lead.id} 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedLead?.id === lead.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => setSelectedLead(lead)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full mb-1 ${
                    lead.status === 'hot' ? 'bg-red-500' : 
                    lead.status === 'warm' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                  <span className="text-xs text-gray-600">{lead.status}</span>
                </div>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-gray-600">{lead.company}</div>
                  <div className="text-xs text-gray-500">{lead.source}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(lead.score)}`}>
                    {lead.score}
                  </div>
                  <div className="text-xs text-gray-600">Score</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{lead.interactions.length}</div>
                  <div className="text-xs text-gray-600">Interactions</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {Math.round((Date.now() - lead.lastActivity.getTime()) / (1000 * 60 * 60))}h
                  </div>
                  <div className="text-xs text-gray-600">Last Activity</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderLeadDetails = () => {
    if (!selectedLead) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedLead.name}</span>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedLead.status)}>
                  {selectedLead.status.toUpperCase()}
                </Badge>
                <div className={`text-2xl font-bold ${getScoreColor(selectedLead.score)}`}>
                  {selectedLead.score}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{selectedLead.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{selectedLead.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{selectedLead.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Added {selectedLead.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Next Action</h4>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-800">{selectedLead.nextAction}</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Assigned to: {selectedLead.assignedAgent || 'Unassigned'}
                  </div>
                </div>
                <div className="mt-3">
                  <h5 className="font-medium mb-2">Tags</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedLead.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scoring Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(selectedLead.factors).map(([key, value]) => {
                const factor = scoringModel?.factors.find(f => f.name.toLowerCase().includes(key.toLowerCase()));
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">{value}%</span>
                        <Badge variant="outline" className="text-xs">
                          {factor?.weight || 0}% weight
                        </Badge>
                      </div>
                    </div>
                    <Progress value={value} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedLead.interactions.map((interaction) => (
                <div key={interaction.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    {getInteractionIcon(interaction.type)}
                    <Badge className={getOutcomeColor(interaction.outcome)}>
                      {interaction.outcome}
                    </Badge>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{interaction.description}</div>
                    <div className="text-xs text-gray-600">
                      {interaction.timestamp.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">+{interaction.score}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderScoringModel = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{scoringModel?.name}</span>
            <Badge variant="secondary">v{scoringModel?.version}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scoringModel?.factors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{factor.name}</div>
                  <div className="text-sm text-gray-600">{factor.description}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={factor.impact === 'high' ? 'default' : factor.impact === 'medium' ? 'secondary' : 'outline'}
                  >
                    {factor.impact}
                  </Badge>
                  <div className="text-right">
                    <div className="font-bold">{factor.weight}%</div>
                    <div className="text-xs text-gray-600">weight</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Model Features:</strong> This scoring model uses machine learning algorithms trained on 
          50,000+ historical leads to predict conversion probability. The model continuously learns and 
          improves based on new data and outcomes.
        </AlertDescription>
      </Alert>
    </div>
  );

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Target className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Intelligent Lead Scoring
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Advanced AI-powered lead qualification algorithm that analyzes multiple factors to predict 
            conversion probability and optimize sales efforts.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="details">Lead Details</TabsTrigger>
            <TabsTrigger value="model">Scoring Model</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverview()}
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            {renderLeadList()}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {renderLeadDetails()}
          </TabsContent>

          <TabsContent value="model" className="space-y-6">
            {renderScoringModel()}
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
            <div className="text-gray-600">Model Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">2,847</div>
            <div className="text-gray-600">Leads Scored</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">87%</div>
            <div className="text-gray-600">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
            <div className="text-gray-600">Training Data Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};
