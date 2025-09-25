import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Phone, 
  Calendar, 
  MessageCircle, 
  Star,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Home,
  MapPin
} from 'lucide-react';
import { sensayService } from '@/services/sensayService';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'chat' | 'website' | 'referral' | 'social' | 'ad';
  status: 'new' | 'qualified' | 'nurturing' | 'hot' | 'converted' | 'lost';
  leadScore: number;
  budget?: string;
  location?: string;
  propertyType?: string;
  interests: string[];
  lastInteraction: Date;
  nextFollowUp?: Date;
  notes: string[];
  conversationHistory: ConversationMessage[];
  assignedAgent?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface ConversationMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'agent';
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface LeadMetrics {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  hotLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageLeadScore: number;
  responseTime: number; // in hours
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+61 412 345 678',
    source: 'chat',
    status: 'hot',
    leadScore: 85,
    budget: '$800,000 - $1,200,000',
    location: 'Melbourne',
    propertyType: 'House',
    interests: ['First Home Buyer', 'Family Home'],
    lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextFollowUp: new Date(Date.now() + 24 * 60 * 60 * 1000),
    notes: ['Very interested in Collins Street property', 'Prefers virtual tours'],
    conversationHistory: [
      {
        id: '1',
        content: 'I\'m looking for a family home in Melbourne under $1.2M',
        role: 'user',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        sentiment: 'positive'
      },
      {
        id: '2',
        content: 'I\'d be happy to help you find the perfect family home! I have several properties in Melbourne that might interest you.',
        role: 'assistant',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        sentiment: 'positive'
      }
    ],
    assignedAgent: 'Agent Smith',
    priority: 'high'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    source: 'website',
    status: 'qualified',
    leadScore: 72,
    budget: '$600,000 - $900,000',
    location: 'Sydney',
    propertyType: 'Apartment',
    interests: ['Investment Property'],
    lastInteraction: new Date(Date.now() - 24 * 60 * 60 * 1000),
    notes: ['Looking for investment opportunities', 'Prefers CBD locations'],
    conversationHistory: [],
    priority: 'medium'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+61 423 456 789',
    source: 'referral',
    status: 'nurturing',
    leadScore: 68,
    budget: '$1,500,000 - $2,000,000',
    location: 'Brisbane',
    propertyType: 'House',
    interests: ['Upgrading Home', 'Family Home'],
    lastInteraction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    nextFollowUp: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    notes: ['Referred by existing client', 'Looking to upgrade from current home'],
    conversationHistory: [],
    priority: 'medium'
  }
];

export const LeadDashboard: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>(mockLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [metrics, setMetrics] = useState<LeadMetrics>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    hotLeads: 0,
    convertedLeads: 0,
    conversionRate: 0,
    averageLeadScore: 0,
    responseTime: 0
  });

  useEffect(() => {
    calculateMetrics();
  }, [leads]);

  useEffect(() => {
    filterLeads();
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  const calculateMetrics = () => {
    const totalLeads = leads.length;
    const newLeads = leads.filter(lead => lead.status === 'new').length;
    const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;
    const hotLeads = leads.filter(lead => lead.status === 'hot').length;
    const convertedLeads = leads.filter(lead => lead.status === 'converted').length;
    const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
    const averageLeadScore = totalLeads > 0 ? leads.reduce((sum, lead) => sum + lead.leadScore, 0) / totalLeads : 0;
    const responseTime = 2.5; // Mock data

    setMetrics({
      totalLeads,
      newLeads,
      qualifiedLeads,
      hotLeads,
      convertedLeads,
      conversionRate,
      averageLeadScore,
      responseTime
    });
  };

  const filterLeads = () => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(lead => lead.priority === priorityFilter);
    }

    setFilteredLeads(filtered);
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'qualified': return 'bg-yellow-100 text-yellow-800';
      case 'nurturing': return 'bg-purple-100 text-purple-800';
      case 'hot': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Lead['priority']) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: Lead['source']) => {
    switch (source) {
      case 'chat': return MessageCircle;
      case 'website': return Home;
      case 'referral': return Users;
      case 'social': return TrendingUp;
      case 'ad': return DollarSign;
      default: return Users;
    }
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    ));
  };

  const handlePriorityChange = (leadId: string, newPriority: Lead['priority']) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, priority: newPriority } : lead
    ));
  };

  const handleFollowUp = async (lead: Lead) => {
    try {
      const message = `Follow up with ${lead.name} about their interest in ${lead.propertyType} properties in ${lead.location}. Budget: ${lead.budget}`;
      const response = await sensayService.sendMessage(message);
      
      // Add follow-up note
      const updatedLead = {
        ...lead,
        notes: [...lead.notes, `Follow-up: ${response.message}`],
        lastInteraction: new Date()
      };
      
      setLeads(prev => prev.map(l => l.id === lead.id ? updatedLead : l));
    } catch (error) {
      console.error('Follow-up error:', error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Management Dashboard</h1>
            <p className="text-gray-600">Manage and nurture your real estate leads</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.totalLeads}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Hot Leads</p>
                  <p className="text-2xl font-bold text-red-600">{metrics.hotLeads}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-600">{metrics.conversionRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Lead Score</p>
                  <p className="text-2xl font-bold text-purple-600">{metrics.averageLeadScore.toFixed(0)}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="nurturing">Nurturing</SelectItem>
                      <SelectItem value="hot">Hot</SelectItem>
                      <SelectItem value="converted">Converted</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Leads Table */}
            <Card>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {filteredLeads.map((lead) => {
                    const SourceIcon = getSourceIcon(lead.source);
                    return (
                      <div
                        key={lead.id}
                        className="p-6 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-gray-900 truncate">{lead.name}</h3>
                                <Badge className={getStatusColor(lead.status)}>
                                  {lead.status}
                                </Badge>
                                <Badge className={getPriorityColor(lead.priority)}>
                                  {lead.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-4 w-4" />
                                  {lead.email}
                                </div>
                                {lead.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-4 w-4" />
                                    {lead.phone}
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  <SourceIcon className="h-4 w-4" />
                                  {lead.source}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                <span>Score: {lead.leadScore}/100</span>
                                <span>Last contact: {lead.lastInteraction.toLocaleDateString()}</span>
                                {lead.location && <span>{lead.location}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" onClick={(e) => {
                              e.stopPropagation();
                              handleFollowUp(lead);
                            }}>
                              <MessageCircle className="h-4 w-4 mr-1" />
                              Follow Up
                            </Button>
                            <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Details */}
          <div className="space-y-6">
            {selectedLead ? (
              <>
                {/* Lead Profile */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      Lead Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{selectedLead.name}</h3>
                      <p className="text-gray-600">{selectedLead.email}</p>
                      {selectedLead.phone && <p className="text-gray-600">{selectedLead.phone}</p>}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lead Score:</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${selectedLead.leadScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{selectedLead.leadScore}/100</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={getStatusColor(selectedLead.status)}>
                          {selectedLead.status}
                        </Badge>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={getPriorityColor(selectedLead.priority)}>
                          {selectedLead.priority}
                        </Badge>
                      </div>
                    </div>

                    {selectedLead.budget && (
                      <div>
                        <span className="text-gray-600">Budget:</span>
                        <p className="font-medium">{selectedLead.budget}</p>
                      </div>
                    )}

                    {selectedLead.location && (
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <p className="font-medium">{selectedLead.location}</p>
                      </div>
                    )}

                    {selectedLead.propertyType && (
                      <div>
                        <span className="text-gray-600">Property Type:</span>
                        <p className="font-medium">{selectedLead.propertyType}</p>
                      </div>
                    )}

                    {selectedLead.interests.length > 0 && (
                      <div>
                        <span className="text-gray-600">Interests:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedLead.interests.map((interest, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Make Call
                    </Button>
                    <Button className="w-full" variant="outline">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Notes & History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedLead.notes.map((note, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-800">{note}</p>
                        </div>
                      ))}
                      {selectedLead.notes.length === 0 && (
                        <p className="text-gray-500 text-sm">No notes yet</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Select a lead to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
