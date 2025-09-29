import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Star, TrendingUp, Calendar, Mail, Phone, MessageCircle,
  CheckCircle, AlertCircle, Clock, Target, DollarSign, Home,
  Building, MapPin, UserCheck, Zap, BarChart3, Send
} from 'lucide-react';
import { sensayAPI } from '@/services/api/sensay';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'web' | 'whatsapp' | 'telegram' | 'email' | 'referral';
  status: 'new' | 'qualified' | 'nurturing' | 'hot' | 'converted' | 'lost';
  qualificationScore: number;
  budget?: number;
  location?: string;
  propertyType?: string;
  timeline?: string;
  investmentGoals?: string[];
  lastInteraction: Date;
  interactionCount: number;
  tags: string[];
  notes: string[];
}

interface LeadQualificationProps {
  className?: string;
}

export const LeadQualificationAutomation: React.FC<LeadQualificationProps> = ({ 
  className = '' 
}) => {
  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+61 412 345 678',
      source: 'web',
      status: 'qualified',
      qualificationScore: 85,
      budget: 750000,
      location: 'Melbourne',
      propertyType: 'house',
      timeline: '3-6 months',
      investmentGoals: ['first_home', 'family_growth'],
      lastInteraction: new Date(),
      interactionCount: 12,
      tags: ['first-time-buyer', 'high-budget', 'melbourne'],
      notes: ['Interested in family homes', 'Prefers established suburbs']
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      source: 'whatsapp',
      status: 'nurturing',
      qualificationScore: 72,
      budget: 450000,
      location: 'Sydney',
      propertyType: 'apartment',
      timeline: '6-12 months',
      investmentGoals: ['investment', 'rental_income'],
      lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      interactionCount: 8,
      tags: ['investor', 'apartment', 'sydney'],
      notes: ['Looking for rental yield', 'Prefers new developments']
    },
    {
      id: '3',
      name: 'Emma Williams',
      email: 'emma.w@email.com',
      phone: '+61 423 456 789',
      source: 'telegram',
      status: 'hot',
      qualificationScore: 92,
      budget: 1200000,
      location: 'Brisbane',
      propertyType: 'house',
      timeline: '1-3 months',
      investmentGoals: ['upgrade', 'investment'],
      lastInteraction: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      interactionCount: 15,
      tags: ['high-value', 'urgent', 'brisbane'],
      notes: ['Ready to buy', 'Has pre-approval', 'Looking for waterfront']
    }
  ]);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [automationRules, setAutomationRules] = useState([
    {
      id: '1',
      name: 'First-time Buyer Nurture',
      trigger: 'first_time_buyer',
      actions: ['send_guide', 'schedule_call', 'market_update'],
      active: true
    },
    {
      id: '2',
      name: 'High-Value Lead Priority',
      trigger: 'budget_over_1m',
      actions: ['assign_senior_agent', 'priority_response', 'personal_touch'],
      active: true
    },
    {
      id: '3',
      name: 'Investment Property Follow-up',
      trigger: 'investment_goal',
      actions: ['send_roi_analysis', 'market_trends', 'portfolio_review'],
      active: true
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">New</Badge>;
      case 'qualified':
        return <Badge variant="default" className="bg-green-50 text-green-700">Qualified</Badge>;
      case 'nurturing':
        return <Badge variant="secondary" className="bg-yellow-50 text-yellow-700">Nurturing</Badge>;
      case 'hot':
        return <Badge variant="destructive" className="bg-red-50 text-red-700">Hot Lead</Badge>;
      case 'converted':
        return <Badge variant="default" className="bg-purple-50 text-purple-700">Converted</Badge>;
      case 'lost':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Lost</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'web': return <MessageCircle className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'telegram': return <Send className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'referral': return <Users className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getQualificationColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleQualifyLead = async (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    try {
      // Use Sensay API for lead qualification
      const qualification = await sensayAPI.handleLeadQualification(lead, leads);
      
      // Update lead with qualification results
      setLeads(prev => prev.map(l => 
        l.id === leadId 
          ? { 
              ...l, 
              qualificationScore: Math.min(100, l.qualificationScore + 10),
              status: l.qualificationScore >= 80 ? 'hot' : 'qualified',
              notes: [...l.notes, `Qualified via Sensay AI: ${qualification.response}`]
            }
          : l
      ));
    } catch (error) {
      console.error('Lead qualification failed:', error);
    }
  };

  const handleSendNurtureMessage = async (leadId: string, messageType: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return;

    try {
      // Use Sensay API for personalized nurture messages
      const response = await sensayAPI.chat(
        `Send a ${messageType} message to this lead: ${lead.name}. Their profile: ${JSON.stringify(lead)}`,
        {}
      );

      // Update lead interaction
      setLeads(prev => prev.map(l => 
        l.id === leadId 
          ? { 
              ...l, 
              lastInteraction: new Date(),
              interactionCount: l.interactionCount + 1,
              notes: [...l.notes, `Sent ${messageType}: ${response.response}`]
            }
          : l
      ));
    } catch (error) {
      console.error('Nurture message failed:', error);
    }
  };

  const LeadCard: React.FC<{ lead: Lead }> = ({ lead }) => (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        selectedLead?.id === lead.id ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => setSelectedLead(lead)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{lead.name}</CardTitle>
          <div className="flex items-center gap-2">
            {getSourceIcon(lead.source)}
            {getStatusBadge(lead.status)}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {lead.email}
          </span>
          {lead.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {lead.phone}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Qualification Score</span>
            <span className={`text-sm font-bold ${getQualificationColor(lead.qualificationScore)}`}>
              {lead.qualificationScore}%
            </span>
          </div>
          <Progress value={lead.qualificationScore} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>${lead.budget?.toLocaleString() || 'TBD'}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{lead.location || 'Any'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-3 w-3" />
            <span>{lead.propertyType || 'Any'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{lead.timeline || 'Flexible'}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{lead.interactionCount} interactions</span>
          <span>{lead.lastInteraction.toLocaleDateString()}</span>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {lead.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const LeadDetailPanel: React.FC<{ lead: Lead }> = ({ lead }) => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Lead Details</span>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => handleQualifyLead(lead.id)}>
              <UserCheck className="h-4 w-4 mr-1" />
              Re-qualify
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <h4 className="font-medium">Investment Goals</h4>
          <div className="flex flex-wrap gap-2">
            {lead.investmentGoals?.map((goal, index) => (
              <Badge key={index} variant="secondary">
                {goal.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Recent Notes</h4>
          <div className="space-y-2">
            {lead.notes.map((note, index) => (
              <div key={index} className="text-sm p-2 bg-muted rounded">
                {note}
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Nurture Actions</h4>
          <div className="grid grid-cols-2 gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleSendNurtureMessage(lead.id, 'market update')}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Market Update
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleSendNurtureMessage(lead.id, 'property alert')}
            >
              <Home className="h-3 w-3 mr-1" />
              Property Alert
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleSendNurtureMessage(lead.id, 'investment guide')}
            >
              <File className="h-3 w-3 mr-1" />
              Investment Guide
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleSendNurtureMessage(lead.id, 'follow-up call')}
            >
              <Phone className="h-3 w-3 mr-1" />
              Follow-up Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Lead Qualification & Nurturing</h1>
          <Badge variant="secondary" className="text-sm">
            Sensay AI Powered
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Automatically qualify leads and nurture prospects using Sensay's AI-powered 
          conversation intelligence and PropGuard's property expertise.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{leads.length}</div>
            <div className="text-sm text-muted-foreground">Total Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {leads.filter(l => l.status === 'hot' || l.status === 'qualified').length}
            </div>
            <div className="text-sm text-muted-foreground">Qualified Leads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(leads.reduce((acc, lead) => acc + lead.qualificationScore, 0) / leads.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Qualification</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {leads.reduce((acc, lead) => acc + lead.interactionCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Interactions</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Leads</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Zap className="h-4 w-4 mr-1" />
                Auto-qualify All
              </Button>
              <Button size="sm">
                <Users className="h-4 w-4 mr-1" />
                Add Lead
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </div>

        {/* Lead Detail Panel */}
        <div className="space-y-4">
          {selectedLead ? (
            <LeadDetailPanel lead={selectedLead} />
          ) : (
            <Card className="h-full">
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a lead to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Automation Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Automation Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <div key={rule.id} className="flex items-center justify-between p-3 border rounded">
                <div className="space-y-1">
                  <div className="font-medium">{rule.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Trigger: {rule.trigger} • Actions: {rule.actions.join(', ')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={rule.active ? "default" : "secondary"}>
                    {rule.active ? "Active" : "Inactive"}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sensay AI Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Sensay AI Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Qualification</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered lead scoring based on conversation analysis and behavior patterns
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Personalized Messaging</h3>
              <p className="text-sm text-muted-foreground">
                Generate tailored nurture messages based on lead profile and preferences
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Predictive Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Predict conversion likelihood and optimal engagement timing
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
