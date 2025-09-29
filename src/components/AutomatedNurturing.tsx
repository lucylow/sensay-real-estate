import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Zap, 
  Mail, 
  Phone, 
  MessageSquare, 
  Share2, 
  Calendar,
  TrendingUp,
  Users,
  Target,
  Brain,
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
  Eye,
  Filter,
  Search,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
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
  ArrowUp,
  ArrowDown,
  Minus,
  Plus,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Percent,
  TrendingDown,
  Smartphone,
  Monitor,
  Tablet,
  Square,
  RotateCcw,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface NurtureCampaign {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'social' | 'push' | 'direct_mail';
  status: 'active' | 'paused' | 'completed' | 'draft';
  description: string;
  targetAudience: string;
  sequence: CampaignStep[];
  metrics: {
    recipients: number;
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
    unsubscribed: number;
    bounced: number;
  };
  performance: {
    openRate: number;
    clickRate: number;
    conversionRate: number;
    unsubscribeRate: number;
    bounceRate: number;
  };
  budget: {
    allocated: number;
    spent: number;
    costPerLead: number;
    costPerConversion: number;
  };
  schedule: {
    startDate: Date;
    endDate?: Date;
    frequency: 'immediate' | 'daily' | 'weekly' | 'monthly';
    timezone: string;
  };
  tags: string[];
  createdBy: string;
  createdAt: Date;
  lastModified: Date;
}

interface CampaignStep {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'call' | 'social' | 'wait';
  delay: number; // in hours
  content: {
    subject?: string;
    body: string;
    cta?: string;
    attachments?: string[];
  };
  conditions: {
    trigger: 'always' | 'if_opened' | 'if_clicked' | 'if_replied' | 'if_not_opened';
    value?: string;
  };
  metrics: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    converted: number;
  };
  status: 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'converted' | 'skipped';
}

interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  category: 'welcome' | 'follow_up' | 'nurturing' | 're_engagement' | 'win_back';
  steps: number;
  estimatedDuration: string;
  industry: string[];
  useCase: string;
  performance: {
    avgOpenRate: number;
    avgClickRate: number;
    avgConversionRate: number;
  };
}

export const AutomatedNurturing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<NurtureCampaign[]>([]);
  const [templates, setTemplates] = useState<CampaignTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<string>('campaigns');
  const [selectedCampaign, setSelectedCampaign] = useState<NurtureCampaign | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    loadCampaigns();
    loadTemplates();
  }, []);

  const loadCampaigns = () => {
    const mockCampaigns: NurtureCampaign[] = [
      {
        id: 'C001',
        name: 'New Lead Welcome Series',
        type: 'email',
        status: 'active',
        description: 'Welcome new leads with a 5-step email sequence introducing our services and value proposition',
        targetAudience: 'New website visitors who filled out contact form',
        sequence: [
          {
            id: 'S001',
            name: 'Welcome Email',
            type: 'email',
            delay: 0,
            content: {
              subject: 'Welcome to PropGuard AI - Your Property Investment Journey Starts Here',
              body: 'Thank you for your interest in PropGuard AI. We\'re excited to help you make informed property investment decisions...',
              cta: 'Explore Properties'
            },
            conditions: { trigger: 'always' },
            metrics: { sent: 1247, delivered: 1234, opened: 891, clicked: 234, converted: 156 },
            status: 'sent'
          },
          {
            id: 'S002',
            name: 'Value Proposition',
            type: 'email',
            delay: 24,
            content: {
              subject: 'How PropGuard AI Can Transform Your Property Investment Strategy',
              body: 'Our AI-powered platform provides comprehensive property analysis, risk assessment, and market intelligence...',
              cta: 'Schedule Demo'
            },
            conditions: { trigger: 'if_opened' },
            metrics: { sent: 891, delivered: 887, opened: 534, clicked: 167, converted: 89 },
            status: 'sent'
          },
          {
            id: 'S003',
            name: 'Case Study',
            type: 'email',
            delay: 72,
            content: {
              subject: 'Success Story: How [Client] Saved $2.3M with PropGuard AI',
              body: 'See how our client used PropGuard AI to identify undervalued properties and avoid high-risk investments...',
              cta: 'Read Case Study'
            },
            conditions: { trigger: 'if_clicked' },
            metrics: { sent: 167, delivered: 165, opened: 98, clicked: 45, converted: 23 },
            status: 'sent'
          },
          {
            id: 'S004',
            name: 'Demo Invitation',
            type: 'email',
            delay: 168,
            content: {
              subject: 'Ready to See PropGuard AI in Action? Schedule Your Personalized Demo',
              body: 'Experience the power of AI-driven property analysis with a personalized demo tailored to your investment goals...',
              cta: 'Schedule Demo'
            },
            conditions: { trigger: 'if_not_opened' },
            metrics: { sent: 343, delivered: 340, opened: 178, clicked: 67, converted: 34 },
            status: 'sent'
          },
          {
            id: 'S005',
            name: 'Final Follow-up',
            type: 'email',
            delay: 336,
            content: {
              subject: 'Last Chance: Exclusive Offer for New PropGuard AI Users',
              body: 'As a special welcome offer, we\'re providing 30 days of premium access at no cost...',
              cta: 'Claim Offer'
            },
            conditions: { trigger: 'if_not_opened' },
            metrics: { sent: 165, delivered: 163, opened: 89, clicked: 34, converted: 18 },
            status: 'sent'
          }
        ],
        metrics: {
          recipients: 1247,
          sent: 1247,
          delivered: 1234,
          opened: 891,
          clicked: 234,
          converted: 156,
          unsubscribed: 12,
          bounced: 13
        },
        performance: {
          openRate: 71.5,
          clickRate: 18.8,
          conversionRate: 12.5,
          unsubscribeRate: 0.96,
          bounceRate: 1.04
        },
        budget: {
          allocated: 5000,
          spent: 3420,
          costPerLead: 21.9,
          costPerConversion: 175.3
        },
        schedule: {
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          frequency: 'daily',
          timezone: 'UTC-5'
        },
        tags: ['Welcome', 'Onboarding', 'High Volume'],
        createdBy: 'Marketing Team',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'C002',
        name: 'Property Updates SMS',
        type: 'sms',
        status: 'active',
        description: 'Send SMS notifications for new property matches and market updates',
        targetAudience: 'Leads who opted in for SMS updates',
        sequence: [
          {
            id: 'S006',
            name: 'New Property Alert',
            type: 'sms',
            delay: 0,
            content: {
              body: 'New property match found! 3BR condo in downtown - $850K. View details: [link]'
            },
            conditions: { trigger: 'always' },
            metrics: { sent: 892, delivered: 889, opened: 834, clicked: 456, converted: 78 },
            status: 'sent'
          }
        ],
        metrics: {
          recipients: 892,
          sent: 892,
          delivered: 889,
          opened: 834,
          clicked: 456,
          converted: 78,
          unsubscribed: 3,
          bounced: 3
        },
        performance: {
          openRate: 93.8,
          clickRate: 51.3,
          conversionRate: 8.7,
          unsubscribeRate: 0.34,
          bounceRate: 0.34
        },
        budget: {
          allocated: 2000,
          spent: 1240,
          costPerLead: 13.9,
          costPerConversion: 159.0
        },
        schedule: {
          startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          frequency: 'immediate',
          timezone: 'UTC-5'
        },
        tags: ['SMS', 'Real-time', 'High Engagement'],
        createdBy: 'Sales Team',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'C003',
        name: 'Market Intelligence Newsletter',
        type: 'email',
        status: 'active',
        description: 'Weekly newsletter with market insights, trends, and investment opportunities',
        targetAudience: 'All subscribed leads and customers',
        sequence: [
          {
            id: 'S007',
            name: 'Weekly Newsletter',
            type: 'email',
            delay: 0,
            content: {
              subject: 'Weekly Market Intelligence: Property Trends & Investment Opportunities',
              body: 'This week\'s market analysis shows continued growth in downtown areas with 15% price increases...',
              cta: 'View Full Report'
            },
            conditions: { trigger: 'always' },
            metrics: { sent: 2156, delivered: 2134, opened: 897, clicked: 341, converted: 67 },
            status: 'sent'
          }
        ],
        metrics: {
          recipients: 2156,
          sent: 2156,
          delivered: 2134,
          opened: 897,
          clicked: 341,
          converted: 67,
          unsubscribed: 22,
          bounced: 22
        },
        performance: {
          openRate: 42.0,
          clickRate: 16.0,
          conversionRate: 3.1,
          unsubscribeRate: 1.02,
          bounceRate: 1.02
        },
        budget: {
          allocated: 3000,
          spent: 1890,
          costPerLead: 8.8,
          costPerConversion: 282.1
        },
        schedule: {
          startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          frequency: 'weekly',
          timezone: 'UTC-5'
        },
        tags: ['Newsletter', 'Content Marketing', 'Educational'],
        createdBy: 'Content Team',
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
    setCampaigns(mockCampaigns);
  };

  const loadTemplates = () => {
    const mockTemplates: CampaignTemplate[] = [
      {
        id: 'T001',
        name: 'New Lead Welcome Series',
        description: '5-step email sequence to welcome new leads and introduce your services',
        category: 'welcome',
        steps: 5,
        estimatedDuration: '2 weeks',
        industry: ['Real Estate', 'Finance', 'Technology'],
        useCase: 'Perfect for welcoming new leads who have shown interest in your services',
        performance: {
          avgOpenRate: 68.5,
          avgClickRate: 23.4,
          avgConversionRate: 12.8
        }
      },
      {
        id: 'T002',
        name: 'Follow-up After Demo',
        description: '3-step sequence to nurture leads after they\'ve attended a product demo',
        category: 'follow_up',
        steps: 3,
        estimatedDuration: '1 week',
        industry: ['Real Estate', 'SaaS', 'Consulting'],
        useCase: 'Ideal for following up with leads who have seen your product in action',
        performance: {
          avgOpenRate: 72.1,
          avgClickRate: 31.2,
          avgConversionRate: 18.7
        }
      },
      {
        id: 'T003',
        name: 'Re-engagement Campaign',
        description: '4-step sequence to re-engage dormant leads and bring them back',
        category: 're_engagement',
        steps: 4,
        estimatedDuration: '3 weeks',
        industry: ['All Industries'],
        useCase: 'Great for reactivating leads who haven\'t engaged in 30+ days',
        performance: {
          avgOpenRate: 45.3,
          avgClickRate: 15.8,
          avgConversionRate: 8.2
        }
      }
    ];
    setTemplates(mockTemplates);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-blue-600 bg-blue-100';
      case 'draft': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'call': return <Phone className="w-4 h-4" />;
      case 'social': return <Share2 className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'direct_mail': return <Mail className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'text-green-600 bg-green-100';
      case 'delivered': return 'text-blue-600 bg-blue-100';
      case 'opened': return 'text-purple-600 bg-purple-100';
      case 'clicked': return 'text-orange-600 bg-orange-100';
      case 'converted': return 'text-red-600 bg-red-100';
      case 'skipped': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderCampaignsOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Active Campaigns</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {campaigns.filter(c => c.status === 'active').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">Total Recipients</span>
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {campaigns.reduce((acc, campaign) => acc + campaign.metrics.recipients, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium">Avg. Open Rate</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(campaigns.reduce((acc, campaign) => acc + campaign.performance.openRate, 0) / campaigns.length)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="text-sm font-medium">Total Conversions</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">
              {campaigns.reduce((acc, campaign) => acc + campaign.metrics.converted, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold">Email Campaigns</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Open Rate</span>
                  <span className="font-medium">68.2%</span>
                </div>
                <Progress value={68.2} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Click Rate</span>
                  <span className="font-medium">19.8%</span>
                </div>
                <Progress value={19.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">8.7%</span>
                </div>
                <Progress value={8.7} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">SMS Campaigns</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Open Rate</span>
                  <span className="font-medium">93.8%</span>
                </div>
                <Progress value={93.8} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Click Rate</span>
                  <span className="font-medium">51.3%</span>
                </div>
                <Progress value={51.3} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Conversion Rate</span>
                  <span className="font-medium">8.7%</span>
                </div>
                <Progress value={8.7} className="h-2" />
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Overall Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Sent</span>
                  <span className="font-medium">4,295</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Delivered</span>
                  <span className="font-medium">4,257</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Opened</span>
                  <span className="font-medium">2,622</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Converted</span>
                  <span className="font-medium">301</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCampaignsList = () => (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <Card 
          key={campaign.id} 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedCampaign?.id === campaign.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`}
          onClick={() => setSelectedCampaign(campaign)}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getTypeIcon(campaign.type)}
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">{campaign.name}</div>
                  <div className="text-sm text-gray-600">{campaign.description}</div>
                  <div className="text-xs text-gray-500">{campaign.targetAudience}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm font-medium">{campaign.metrics.recipients.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Recipients</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{campaign.performance.openRate}%</div>
                  <div className="text-xs text-gray-600">Open Rate</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{campaign.performance.conversionRate}%</div>
                  <div className="text-xs text-gray-600">Conversion</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{campaign.sequence.length}</div>
                  <div className="text-xs text-gray-600">Steps</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderCampaignDetails = () => {
    if (!selectedCampaign) return null;

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedCampaign.name}</span>
              <div className="flex items-center gap-2">
                <Badge className={getStatusColor(selectedCampaign.status)}>
                  {selectedCampaign.status.toUpperCase()}
                </Badge>
                <div className="flex items-center gap-1">
                  {getTypeIcon(selectedCampaign.type)}
                  <span className="text-sm capitalize">{selectedCampaign.type}</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Campaign Details</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Description:</strong> {selectedCampaign.description}</div>
                  <div><strong>Target Audience:</strong> {selectedCampaign.targetAudience}</div>
                  <div><strong>Created By:</strong> {selectedCampaign.createdBy}</div>
                  <div><strong>Created:</strong> {selectedCampaign.createdAt.toLocaleDateString()}</div>
                  <div><strong>Last Modified:</strong> {selectedCampaign.lastModified.toLocaleDateString()}</div>
                </div>
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Tags</h5>
                  <div className="flex flex-wrap gap-1">
                    {selectedCampaign.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Recipients</span>
                    <span className="font-medium">{selectedCampaign.metrics.recipients.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sent</span>
                    <span className="font-medium">{selectedCampaign.metrics.sent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Delivered</span>
                    <span className="font-medium">{selectedCampaign.metrics.delivered.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Opened</span>
                    <span className="font-medium text-blue-600">{selectedCampaign.metrics.opened.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Clicked</span>
                    <span className="font-medium text-green-600">{selectedCampaign.metrics.clicked.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Converted</span>
                    <span className="font-medium text-purple-600">{selectedCampaign.metrics.converted.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Campaign Sequence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedCampaign.sequence.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      +{step.delay}h
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h5 className="font-medium">{step.name}</h5>
                      <Badge className={getStepStatusColor(step.status)}>
                        {step.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {step.content.subject && <div><strong>Subject:</strong> {step.content.subject}</div>}
                      <div><strong>Body:</strong> {step.content.body.substring(0, 100)}...</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Sent: {step.metrics.sent}</span>
                      <span>Opened: {step.metrics.opened}</span>
                      <span>Clicked: {step.metrics.clicked}</span>
                      <span>Converted: {step.metrics.converted}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(step.type)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderTemplates = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{template.name}</span>
                <Badge variant="outline">{template.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{template.description}</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Steps</span>
                    <span className="font-medium">{template.steps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span className="font-medium">{template.estimatedDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Open Rate</span>
                    <span className="font-medium text-green-600">{template.performance.avgOpenRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg. Conversion</span>
                    <span className="font-medium text-blue-600">{template.performance.avgConversionRate}%</span>
                  </div>
                </div>
                <div className="pt-2">
                  <h6 className="font-medium text-xs mb-1">Industries</h6>
                  <div className="flex flex-wrap gap-1">
                    {template.industry.map((industry, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full mt-3" size="sm">
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Automated Nurturing
              </h2>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Multi-sequence follow-up campaigns with personalized content, automated triggers, 
            and intelligent performance optimization powered by AI.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="details">Campaign Details</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderCampaignsOverview()}
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            {renderCampaignsList()}
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            {renderCampaignDetails()}
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            {renderTemplates()}
          </TabsContent>
        </Tabs>

        {/* Statistics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">68.2%</div>
            <div className="text-gray-600">Average Open Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">19.8%</div>
            <div className="text-gray-600">Average Click Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">8.7%</div>
            <div className="text-gray-600">Average Conversion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4,295</div>
            <div className="text-gray-600">Total Messages Sent</div>
          </div>
        </div>
      </div>
    </div>
  );
};
