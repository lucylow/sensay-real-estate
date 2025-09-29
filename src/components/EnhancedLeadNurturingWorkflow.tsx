import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  User, 
  Star, 
  TrendingUp,
  Zap,
  CheckCircle,
  AlertCircle,
  Timer,
  Send,
  Bell,
  Target,
  ArrowRight
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  score: number;
  status: 'hot' | 'warm' | 'cool' | 'cold';
  lastContact: Date;
  nextAction: string;
  timeline: string;
  budget: number;
  location: string;
}

interface NurturingStep {
  id: string;
  title: string;
  description: string;
  channel: 'email' | 'phone' | 'chat' | 'sms';
  delay: string;
  status: 'pending' | 'sent' | 'completed';
  template: string;
}

export const EnhancedLeadNurturingWorkflow: React.FC = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const mockLeads: Lead[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      score: 85,
      status: 'hot',
      lastContact: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      nextAction: 'Schedule property viewing',
      timeline: 'Immediate',
      budget: 750000,
      location: 'Melbourne CBD'
    },
    {
      id: '2',
      name: 'Michael Chen',
      score: 72,
      status: 'warm',
      lastContact: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      nextAction: 'Send property recommendations',
      timeline: '3 months',
      budget: 550000,
      location: 'Richmond'
    },
    {
      id: '3',
      name: 'Emma Wilson',
      score: 45,
      status: 'cool',
      lastContact: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      nextAction: 'Weekly nurture email',
      timeline: '6 months',
      budget: 450000,
      location: 'Fitzroy'
    }
  ];

  const nurturingSteps: NurturingStep[] = [
    {
      id: '1',
      title: 'Immediate Follow-up',
      description: 'Personalized message within 1 hour',
      channel: 'phone',
      delay: '0-1 hour',
      status: 'completed',
      template: 'Hot Lead Follow-up'
    },
    {
      id: '2',
      title: 'Property Recommendations',
      description: 'Curated property list based on preferences',
      channel: 'email',
      delay: '2-4 hours',
      status: 'sent',
      template: 'Property Match Email'
    },
    {
      id: '3',
      title: 'Market Update',
      description: 'Weekly market insights and trends',
      channel: 'email',
      delay: '1 week',
      status: 'pending',
      template: 'Market Intelligence'
    },
    {
      id: '4',
      title: 'Appointment Reminder',
      description: 'Pre-viewing preparation and confirmation',
      channel: 'sms',
      delay: '24 hours before',
      status: 'pending',
      template: 'Viewing Reminder'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'bg-red-100 text-red-800';
      case 'warm': return 'bg-orange-100 text-orange-800';
      case 'cool': return 'bg-yellow-100 text-yellow-800';
      case 'cold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'phone': return <Phone className="h-4 w-4" />;
      case 'chat': return <MessageCircle className="h-4 w-4" />;
      case 'sms': return <Send className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'sent': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Lead Nurturing Workflow</h2>
          <p className="text-gray-600">Automated follow-up sequences based on lead scoring</p>
        </div>
        <Badge variant="outline" className="text-sm">
          <Zap className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Active Leads
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockLeads.map((lead) => (
                <div
                  key={lead.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedLead?.id === lead.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{lead.name}</h4>
                    <Badge className={getStatusColor(lead.status)}>
                      {lead.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Score</span>
                      <span className="font-medium">{lead.score}/100</span>
                    </div>
                    <Progress value={lead.score} className="h-2" />
                    <p className="text-xs text-gray-600">{lead.nextAction}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Nurturing Workflow */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Nurturing Sequence
                {selectedLead && (
                  <Badge className="ml-2" variant="outline">
                    {selectedLead.name}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLead ? (
                <div className="space-y-4">
                  {/* Lead Info */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Budget:</span>
                        <span className="ml-2 font-medium">${selectedLead.budget.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <span className="ml-2 font-medium">{selectedLead.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Timeline:</span>
                        <span className="ml-2 font-medium">{selectedLead.timeline}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Contact:</span>
                        <span className="ml-2 font-medium">
                          {selectedLead.lastContact.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nurturing Steps */}
                  <div className="space-y-3">
                    {nurturingSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStepStatusColor(step.status)}`}>
                            {step.status === 'completed' ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : step.status === 'sent' ? (
                              <Send className="h-4 w-4" />
                            ) : (
                              <Timer className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{step.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {step.delay}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{step.description}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            {getChannelIcon(step.channel)}
                            <span className="text-xs text-gray-500 capitalize">{step.channel}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">{step.template}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Button
                            size="sm"
                            variant={step.status === 'pending' ? 'default' : 'outline'}
                            disabled={step.status !== 'pending'}
                          >
                            {step.status === 'pending' ? 'Send' : step.status}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t">
                    <Button className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Follow-up
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">Select a lead to view their nurturing workflow</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Workflow Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Automated Workflow Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                <h4 className="font-medium">Hot Leads (80%+)</h4>
              </div>
              <p className="text-sm text-gray-600">Immediate follow-up within 1 hour</p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li>• Phone call within 30 minutes</li>
                <li>• Property recommendations</li>
                <li>• Schedule viewing same day</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
                <h4 className="font-medium">Warm Leads (60-79%)</h4>
              </div>
              <p className="text-sm text-gray-600">Contact within 24 hours</p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li>• Email within 4 hours</li>
                <li>• Property suggestions</li>
                <li>• Follow-up in 3 days</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                <h4 className="font-medium">Cool Leads (40-59%)</h4>
              </div>
              <p className="text-sm text-gray-600">Automated nurture sequence</p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li>• Weekly email campaigns</li>
                <li>• Market updates</li>
                <li>• Re-engagement after 2 weeks</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                <h4 className="font-medium">Cold Leads (&lt;40%)</h4>
              </div>
              <p className="text-sm text-gray-600">General newsletter and monitoring</p>
              <ul className="text-xs text-gray-500 mt-2 space-y-1">
                <li>• Monthly newsletter</li>
                <li>• Market intelligence</li>
                <li>• Long-term nurturing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
