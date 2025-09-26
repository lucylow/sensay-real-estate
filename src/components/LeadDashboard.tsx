import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Home,
  Clock,
  Star,
  Filter,
  Search,
  Download,
  MessageCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  Target,
  BarChart3,
  PieChart,
  Activity,
  UserPlus,
  UserCheck,
  UserX,
  Bell,
  Settings,
  RefreshCw,
  Send,
  Bookmark,
  Flag,
  Tag,
  Hash,
  Building,
  Car,
  Plane,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  X,
  Check,
  XCircle,
  Clock3,
  Calendar as CalendarIcon,
  Timer,
  User2,
  Building2,
  Home as HomeIcon,
  DollarSign as DollarIcon,
  TrendingDown,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'viewing' | 'negotiating' | 'closed' | 'lost';
  source: 'website' | 'referral' | 'social' | 'advertisement' | 'cold-call' | 'walk-in';
  budget: {
    min: number;
    max: number;
  };
  preferences: {
    propertyType: string;
    locations: string[];
    bedrooms: number;
    bathrooms: number;
    features: string[];
  };
  timeline: string;
  qualificationScore: number;
  lastContact: Date;
  nextFollowUp: Date;
  notes: string;
  tags: string[];
  assignedAgent: string;
  totalValue: number;
  probability: number;
  createdAt: Date;
  updatedAt: Date;
  interactions: LeadInteraction[];
}

interface LeadInteraction {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'viewing' | 'message';
  date: Date;
  description: string;
  outcome: 'positive' | 'neutral' | 'negative';
  nextAction?: string;
}

interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageLeadValue: number;
  totalPipelineValue: number;
  monthlyGrowth: number;
  topSources: Array<{ source: string; count: number; percentage: number }>;
  statusDistribution: Array<{ status: string; count: number; percentage: number }>;
  agentPerformance: Array<{ agent: string; leads: number; conversion: number; value: number }>;
}

interface FilterOptions {
  status: string;
  source: string;
  agent: string;
  dateRange: string;
  budgetRange: string;
  scoreRange: string;
}

export const LeadDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [metrics, setMetrics] = useState<LeadMetrics | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    source: 'all',
    agent: 'all',
    dateRange: 'all',
    budgetRange: 'all',
    scoreRange: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'value' | 'name'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadLeads();
    loadMetrics();
  }, []);

  useEffect(() => {
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadLeads();
      loadMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const sampleLeads: Lead[] = [
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '(555) 123-4567',
        status: 'qualified',
        source: 'website',
        budget: { min: 800000, max: 1200000 },
        preferences: {
          propertyType: 'house',
          locations: ['San Francisco', 'Oakland'],
          bedrooms: 3,
          bathrooms: 2,
          features: ['garage', 'garden', 'modern-kitchen']
        },
        timeline: '3-6 months',
        qualificationScore: 85,
        lastContact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        notes: 'Very interested in modern homes with garden space. Budget is flexible.',
        tags: ['high-priority', 'first-time-buyer'],
        assignedAgent: 'Sarah Johnson',
        totalValue: 1000000,
        probability: 75,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        interactions: [
          {
            id: 'int1',
            type: 'call',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            description: 'Initial consultation call - discussed requirements',
            outcome: 'positive',
            nextAction: 'Send property recommendations'
          }
        ]
      },
      {
        id: '2',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '(555) 987-6543',
        status: 'viewing',
        source: 'referral',
        budget: { min: 600000, max: 900000 },
        preferences: {
          propertyType: 'condo',
          locations: ['San Francisco'],
          bedrooms: 2,
          bathrooms: 2,
          features: ['city-view', 'gym', 'concierge']
        },
        timeline: '1-3 months',
        qualificationScore: 92,
        lastContact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        notes: 'Referred by existing client. Very motivated buyer.',
        tags: ['hot-lead', 'referral'],
        assignedAgent: 'Michael Chen',
        totalValue: 750000,
        probability: 90,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        interactions: [
          {
            id: 'int2',
            type: 'viewing',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            description: 'Property viewing - very interested',
            outcome: 'positive',
            nextAction: 'Schedule second viewing'
          }
        ]
      },
      {
        id: '3',
        name: 'Robert Wilson',
        email: 'robert.wilson@email.com',
        phone: '(555) 456-7890',
        status: 'new',
        source: 'advertisement',
        budget: { min: 1500000, max: 2500000 },
        preferences: {
          propertyType: 'house',
          locations: ['San Francisco', 'Marin County'],
          bedrooms: 4,
          bathrooms: 3,
          features: ['ocean-view', 'pool', 'wine-cellar']
        },
        timeline: '6-12 months',
        qualificationScore: 78,
        lastContact: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        nextFollowUp: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        notes: 'Luxury home buyer. Looking for investment property.',
        tags: ['luxury', 'investment'],
        assignedAgent: 'Emily Rodriguez',
        totalValue: 2000000,
        probability: 60,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        interactions: [
          {
            id: 'int3',
            type: 'email',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            description: 'Initial inquiry via website form',
            outcome: 'neutral',
            nextAction: 'Schedule consultation call'
          }
        ]
      }
    ];

    setLeads(sampleLeads);
    setIsLoading(false);
  };

  const loadMetrics = async () => {
    const sampleMetrics: LeadMetrics = {
      totalLeads: 156,
      newLeads: 23,
      qualifiedLeads: 89,
      conversionRate: 12.5,
      averageLeadValue: 1250000,
      totalPipelineValue: 195000000,
      monthlyGrowth: 15.3,
      topSources: [
        { source: 'Website', count: 67, percentage: 43.0 },
        { source: 'Referral', count: 34, percentage: 21.8 },
        { source: 'Social Media', count: 28, percentage: 17.9 },
        { source: 'Advertisement', count: 19, percentage: 12.2 },
        { source: 'Cold Call', count: 8, percentage: 5.1 }
      ],
      statusDistribution: [
        { status: 'New', count: 23, percentage: 14.7 },
        { status: 'Contacted', count: 34, percentage: 21.8 },
        { status: 'Qualified', count: 45, percentage: 28.8 },
        { status: 'Viewing', count: 28, percentage: 17.9 },
        { status: 'Negotiating', count: 15, percentage: 9.6 },
        { status: 'Closed', count: 11, percentage: 7.1 }
      ],
      agentPerformance: [
        { agent: 'Sarah Johnson', leads: 45, conversion: 15.2, value: 56250000 },
        { agent: 'Michael Chen', leads: 38, conversion: 13.8, value: 47500000 },
        { agent: 'Emily Rodriguez', leads: 42, conversion: 14.5, value: 52500000 },
        { agent: 'David Kim', leads: 31, conversion: 11.2, value: 38750000 }
      ]
    };

    setMetrics(sampleMetrics);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = !searchQuery || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    
    const matchesStatus = filters.status === 'all' || lead.status === filters.status;
    const matchesSource = filters.source === 'all' || lead.source === filters.source;
    const matchesAgent = filters.agent === 'all' || lead.assignedAgent === filters.agent;
    
    return matchesSearch && matchesStatus && matchesSource && matchesAgent;
  }).sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime();
        break;
      case 'score':
        comparison = a.qualificationScore - b.qualificationScore;
        break;
      case 'value':
        comparison = a.totalValue - b.totalValue;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'new': 'bg-blue-100 text-blue-800',
      'contacted': 'bg-yellow-100 text-yellow-800',
      'qualified': 'bg-green-100 text-green-800',
      'viewing': 'bg-purple-100 text-purple-800',
      'negotiating': 'bg-orange-100 text-orange-800',
      'closed': 'bg-green-100 text-green-800',
      'lost': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'new': UserPlus,
      'contacted': Phone,
      'qualified': CheckCircle,
      'viewing': Eye,
      'negotiating': MessageCircle,
      'closed': CheckCircle,
      'lost': XCircle
    };
    const Icon = icons[status as keyof typeof icons] || Users;
    return <Icon className="h-4 w-4" />;
  };

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
  };

  const handleStatusUpdate = (leadId: string, newStatus: string) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus as any, updatedAt: new Date() }
        : lead
    ));
  };

  const handleAddInteraction = (leadId: string, interaction: Omit<LeadInteraction, 'id'>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { 
            ...lead, 
            interactions: [...lead.interactions, { ...interaction, id: `int${Date.now()}` }],
            lastContact: new Date(),
            updatedAt: new Date()
          }
        : lead
    ));
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Lead Dashboard</h1>
        <Badge variant="secondary" className="ml-auto">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered Insights
        </Badge>
      </div>

      {/* Metrics Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Leads</p>
                  <p className="text-2xl font-bold">{metrics.totalLeads}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{metrics.monthlyGrowth}%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Qualified Leads</p>
                  <p className="text-2xl font-bold">{metrics.qualifiedLeads}</p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">{metrics.conversionRate}% conversion</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pipeline Value</p>
                  <p className="text-2xl font-bold">{formatPrice(metrics.totalPipelineValue)}</p>
                </div>
                <DollarIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <BarChart3 className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm text-blue-600">Avg: {formatPrice(metrics.averageLeadValue)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">New This Week</p>
                  <p className="text-2xl font-bold">{metrics.newLeads}</p>
                </div>
                <UserPlus className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center mt-2">
                <Activity className="h-4 w-4 text-purple-600 mr-1" />
                <span className="text-sm text-purple-600">Active pipeline</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leads">All Leads</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Leads */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Leads
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.slice(0, 5).map((lead) => (
                    <div 
                      key={lead.id} 
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => handleLeadSelect(lead)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <User2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{lead.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(lead.budget.min)} - {formatPrice(lead.budget.max)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(lead.status)}>
                          {getStatusIcon(lead.status)}
                          <span className="ml-1 capitalize">{lead.status}</span>
                        </Badge>
                        <Badge variant="outline">
                          {lead.qualificationScore}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Lead Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Lead Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics?.topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">{source.source}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{source.count} leads</span>
                        <Badge variant="outline">{source.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search leads by name, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="viewing">Viewing</SelectItem>
                    <SelectItem value="negotiating">Negotiating</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filters.source} onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="cold-call">Cold Call</SelectItem>
                    <SelectItem value="walk-in">Walk-in</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Leads ({filteredLeads.length})</span>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Lead
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeads.map((lead) => (
                  <div 
                    key={lead.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted cursor-pointer"
                    onClick={() => handleLeadSelect(lead)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{lead.name}</div>
                        <div className="text-sm text-muted-foreground">{lead.email}</div>
                        <div className="text-sm text-muted-foreground">{lead.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{formatPrice(lead.totalValue)}</div>
                        <div className="text-sm text-muted-foreground">
                          {lead.probability}% probability
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(lead.status)}>
                          {getStatusIcon(lead.status)}
                          <span className="ml-1 capitalize">{lead.status}</span>
                        </Badge>
                        <Badge variant="outline">
                          {lead.qualificationScore}%
                        </Badge>
                      </div>
                      
                      <div className="text-right text-sm text-muted-foreground">
                        <div>Last contact: {formatDate(lead.lastContact)}</div>
                        <div>Next follow-up: {formatDate(lead.nextFollowUp)}</div>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Lead Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics?.statusDistribution.map((status, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium capitalize">{status.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{status.count} leads</span>
                        <Badge variant="outline">{status.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agent Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Agent Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics?.agentPerformance.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{agent.agent}</div>
                        <div className="text-sm text-muted-foreground">
                          {agent.leads} leads • {agent.conversion}% conversion
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatPrice(agent.value)}</div>
                        <div className="text-sm text-muted-foreground">Pipeline value</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    AI-powered automation is handling lead qualification, follow-ups, and nurturing sequences automatically.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold">Auto-Qualification</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Leads are automatically scored and qualified based on budget, timeline, and engagement.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold">Follow-up Sequences</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automated email and SMS sequences keep leads engaged throughout the sales process.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold">Lead Scoring</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Real-time lead scoring based on behavior, preferences, and market conditions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold">CRM Sync</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automatic synchronization with CRM systems and lead assignment to agents.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl h-[80vh] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lead Details - {selectedLead.name}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLead(null)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto">
              <div className="space-y-6">
                {/* Lead Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <User2 className="h-4 w-4" />
                        <span>{selectedLead.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Lead Status</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(selectedLead.status)}>
                          {getStatusIcon(selectedLead.status)}
                          <span className="ml-1 capitalize">{selectedLead.status}</span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        <span>Qualification Score: {selectedLead.qualificationScore}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon className="h-4 w-4" />
                        <span>Total Value: {formatPrice(selectedLead.totalValue)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Budget</div>
                      <div className="text-sm text-muted-foreground">
                        {formatPrice(selectedLead.budget.min)} - {formatPrice(selectedLead.budget.max)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Property Type</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {selectedLead.preferences.propertyType}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Locations</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedLead.preferences.locations.join(', ')}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Timeline</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedLead.timeline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Interaction History</h3>
                  <div className="space-y-3">
                    {selectedLead.interactions.map((interaction) => (
                      <div key={interaction.id} className="flex items-start gap-3 p-3 border rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{interaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(interaction.date)} • {interaction.type}
                          </div>
                          {interaction.nextAction && (
                            <div className="text-sm text-blue-600 mt-1">
                              Next: {interaction.nextAction}
                            </div>
                          )}
                        </div>
                        <Badge variant={interaction.outcome === 'positive' ? 'default' : 'secondary'}>
                          {interaction.outcome}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Lead
                  </Button>
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LeadDashboard;