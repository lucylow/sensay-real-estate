import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, Database, RefreshCw, CheckCircle, AlertCircle, 
  Zap, Settings, ArrowRight, ArrowLeft, 
  UserPlus, Mail, Phone, Calendar, FileText, 
  TrendingUp, BarChart3, Target, Shield
} from 'lucide-react';
import { sensayAPI } from '@/services/api/sensay';
import { propGuardAPI } from '@/services/api/propguard';

interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: 'web' | 'whatsapp' | 'telegram' | 'email' | 'referral';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  stage: string;
  score: number;
  lastActivity: Date;
  properties: string[];
  budget: number;
  timeline: string;
  notes: string[];
  tags: string[];
  assignedAgent?: string;
  crmId?: string;
  syncStatus: 'synced' | 'pending' | 'error';
}

interface CRMIntegration {
  id: string;
  name: string;
  type: 'salesforce' | 'hubspot' | 'pipedrive' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  syncCount: number;
  errorCount: number;
  fields: string[];
}

interface CRMWorkflowProps {
  className?: string;
}

export const CRMIntegrationWorkflows: React.FC<CRMWorkflowProps> = ({ 
  className = '' 
}) => {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [integrations, setIntegrations] = useState<CRMIntegration[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [workflowRules, setWorkflowRules] = useState([
    {
      id: '1',
      name: 'Auto Lead Qualification',
      trigger: 'new_lead',
      actions: ['score_lead', 'assign_agent', 'send_welcome'],
      active: true
    },
    {
      id: '2',
      name: 'High-Value Lead Priority',
      trigger: 'budget_over_1m',
      actions: ['assign_senior_agent', 'priority_notification', 'schedule_call'],
      active: true
    },
    {
      id: '3',
      name: 'Follow-up Automation',
      trigger: 'no_activity_3_days',
      actions: ['send_email', 'schedule_task', 'escalate'],
      active: true
    }
  ]);

  // Mock data
  const mockLeads: CRMLead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+61 412 345 678',
      source: 'web',
      status: 'qualified',
      stage: 'Proposal',
      score: 85,
      lastActivity: new Date(),
      properties: ['123 Collins Street', '456 Bourke Street'],
      budget: 750000,
      timeline: '3-6 months',
      notes: ['Interested in family homes', 'Prefers established suburbs'],
      tags: ['first-time-buyer', 'high-budget'],
      assignedAgent: 'John Smith',
      crmId: 'SF001',
      syncStatus: 'synced'
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'm.chen@email.com',
      source: 'whatsapp',
      status: 'contacted',
      stage: 'Qualification',
      score: 72,
      lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      properties: ['789 Chapel Street'],
      budget: 450000,
      timeline: '6-12 months',
      notes: ['Looking for rental yield', 'Prefers new developments'],
      tags: ['investor', 'apartment'],
      assignedAgent: 'Jane Doe',
      crmId: 'SF002',
      syncStatus: 'pending'
    }
  ];

  const mockIntegrations: CRMIntegration[] = [
    {
      id: '1',
      name: 'Salesforce',
      type: 'salesforce',
      status: 'connected',
      lastSync: new Date(),
      syncCount: 1247,
      errorCount: 3,
      fields: ['name', 'email', 'phone', 'status', 'stage', 'score', 'notes']
    },
    {
      id: '2',
      name: 'HubSpot',
      type: 'hubspot',
      status: 'connected',
      lastSync: new Date(Date.now() - 30 * 60 * 1000),
      syncCount: 892,
      errorCount: 1,
      fields: ['name', 'email', 'phone', 'status', 'stage', 'score']
    },
    {
      id: '3',
      name: 'Pipedrive',
      type: 'pipedrive',
      status: 'error',
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      syncCount: 456,
      errorCount: 12,
      fields: ['name', 'email', 'phone', 'status']
    }
  ];

  useEffect(() => {
    setLeads(mockLeads);
    setIntegrations(mockIntegrations);
  }, []);

  const handleSyncCRM = async (integrationId: string) => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    try {
      const integration = integrations.find(i => i.id === integrationId);
      if (!integration) return;
      
      // Simulate sync process
      for (let i = 0; i <= 100; i += 10) {
        setSyncProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Update integration status
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              lastSync: new Date(),
              syncCount: integration.syncCount + leads.length,
              status: 'connected' as const
            }
          : integration
      ));
      
      // Update leads sync status
      setLeads(prev => prev.map(lead => ({
        ...lead,
        syncStatus: 'synced' as const
      })));
      
    } catch (error) {
      console.error('CRM sync failed:', error);
    } finally {
      setIsSyncing(false);
      setSyncProgress(0);
    }
  };

  const handleCreateLead = async (leadData: Partial<CRMLead>) => {
    try {
      // Use Sensay API for lead qualification
      const qualification = await sensayAPI.handleLeadQualification(leadData, leads);
      
      const newLead: CRMLead = {
        id: Date.now().toString(),
        name: leadData.name || 'Unknown',
        email: leadData.email || '',
        phone: leadData.phone,
        source: leadData.source || 'web',
        status: 'new',
        stage: 'Lead',
        score: qualification.confidence || 75,
        lastActivity: new Date(),
        properties: leadData.properties || [],
        budget: leadData.budget || 0,
        timeline: leadData.timeline || 'Flexible',
        notes: [qualification.response],
        tags: leadData.tags || [],
        syncStatus: 'pending'
      };
      
      setLeads(prev => [newLead, ...prev]);
      
      // Auto-sync to CRM
      if (selectedIntegration) {
        await handleSyncCRM(selectedIntegration);
      }
      
    } catch (error) {
      console.error('Lead creation failed:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'disconnected':
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Disconnected</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSyncStatusBadge = (status: string) => {
    switch (status) {
      case 'synced':
        return <Badge variant="default" className="bg-green-500 text-xs">Synced</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="text-xs">Pending</Badge>;
      case 'error':
        return <Badge variant="destructive" className="text-xs">Error</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const IntegrationCard: React.FC<{ integration: CRMIntegration }> = ({ integration }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{integration.name}</CardTitle>
          {getStatusBadge(integration.status)}
        </div>
        <div className="text-sm text-muted-foreground">
          Last sync: {integration.lastSync.toLocaleString()}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-bold text-green-600">{integration.syncCount}</div>
            <div className="text-xs text-muted-foreground">Synced</div>
          </div>
          <div className="text-center p-2 bg-muted rounded">
            <div className="font-bold text-red-600">{integration.errorCount}</div>
            <div className="text-xs text-muted-foreground">Errors</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Mapped Fields:</div>
          <div className="flex flex-wrap gap-1">
            {integration.fields.map((field, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {field}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => handleSyncCRM(integration.id)}
            disabled={isSyncing}
          >
            {isSyncing ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : <RefreshCw className="h-3 w-3 mr-1" />}
            Sync Now
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const LeadCard: React.FC<{ lead: CRMLead }> = ({ lead }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{lead.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{lead.stage}</Badge>
            {getSyncStatusBadge(lead.syncStatus)}
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
            <span className="text-sm font-medium">Lead Score</span>
            <span className="text-sm font-bold text-primary">{lead.score}%</span>
          </div>
          <Progress value={lead.score} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3" />
            <span>${lead.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{lead.timeline}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm font-medium">Properties:</div>
          <div className="space-y-1">
            {lead.properties.map((property, index) => (
              <div key={index} className="text-xs p-1 bg-muted rounded">
                {property}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {lead.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            <Calendar className="h-3 w-3 mr-1" />
            Schedule
          </Button>
          <Button size="sm" variant="outline">
            <FileText className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">CRM Integration Workflows</h1>
          <Badge variant="secondary" className="text-sm">
            Sensay AI Powered
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Seamlessly integrate PropGuard AI chatbot with your CRM systems for 
          automated lead management, qualification, and follow-up workflows.
        </p>
      </div>

      {/* Sync Progress */}
      {isSyncing && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Syncing CRM data...</span>
                <span className="text-sm text-muted-foreground">{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">CRM Leads</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <UserPlus className="h-4 w-4 mr-1" />
                Add Lead
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Sync All
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {leads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Automation Workflows</h2>
            
            {workflowRules.map((rule) => (
              <Card key={rule.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rule.name}</CardTitle>
                    <Badge variant={rule.active ? "default" : "secondary"}>
                      {rule.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm font-medium mb-2">Trigger:</div>
                        <Badge variant="outline">{rule.trigger}</Badge>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-2">Actions:</div>
                        <div className="flex flex-wrap gap-1">
                          {rule.actions.map((action, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {action}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Test
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
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
                  {leads.filter(l => l.syncStatus === 'synced').length}
                </div>
                <div className="text-sm text-muted-foreground">Synced</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg Score</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {integrations.reduce((acc, integration) => acc + integration.syncCount, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Syncs</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sensay AI Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Sensay AI Integration Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Smart Lead Qualification</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered lead scoring based on conversation analysis and behavior patterns
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Automated Sync</h3>
              <p className="text-sm text-muted-foreground">
                Real-time synchronization between chatbot interactions and CRM systems
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
