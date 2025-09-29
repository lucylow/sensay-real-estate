// Fixed versions of problematic components
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertCircle, CheckCircle, Clock, BarChart3, 
  MessageSquare, Send, Calculator, DollarSign,
  Search, Phone, Mail, FileText, Key as KeyIcon
} from 'lucide-react';

// Fixed SensayAssistant with proper Badge state
export const FixedSensayAssistant = () => {
  const [status, setStatus] = useState<'valid' | 'invalid' | 'missing'>('valid');
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Sensay Assistant</CardTitle>
          <Badge variant={status === 'valid' ? 'default' : 'destructive'}>
            {status === 'valid' ? 'Connected' : 'Checking'}
          </Badge>
        </CardHeader>
        <CardContent>
          <p>AI-powered real estate assistant ready to help</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed ROI Calculator without recharts Pie issues
export const FixedROICalculator = () => {
  const [investment, setInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('');
  
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            ROI Impact Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Investment ($)</label>
              <Input 
                type="number" 
                value={investment}
                onChange={(e) => setInvestment(e.target.value)}
                placeholder="100000" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Return Rate (%)</label>
              <Input 
                type="number" 
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
                placeholder="8.5" 
              />
            </div>
          </div>
          
          <Button className="w-full">Calculate ROI</Button>
          
          {investment && returnRate && (
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">
                    Projected Return: ${(parseFloat(investment) * parseFloat(returnRate) / 100).toLocaleString()}
                  </p>
                  <p className="text-sm text-green-600">Annual ROI: {returnRate}%</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed Quality Controlled Assistant
export const FixedQualityAssistant = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  
  const quickActions = ['Property Search', 'Market Analysis', 'Risk Assessment'];
  
  const handleSend = () => {
    if (message.trim()) {
      setResponses([message, ...responses]);
      setMessage('');
    }
  };
  
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Quality Controlled Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about properties..."
              className="flex-1"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {quickActions.map((action) => (
              <Button 
                key={action}
                variant="outline" 
                size="sm"
                onClick={() => setMessage(action)}
              >
                {action}
              </Button>
            ))}
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {responses.map((response, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                {response}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed Lead Qualification with proper icons
export const FixedLeadQualification = () => {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  
  const leads = [
    { id: '1', name: 'John Smith', email: 'john@example.com', phone: '555-0123' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com', phone: '555-0456' }
  ];
  
  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Lead Qualification Automation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {leads.map((lead) => (
              <div key={lead.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{lead.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {lead.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <FileText className="h-3 w-3 mr-1" />
                      Guide
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed Multilingual components
export const FixedMultilingualChat = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' }
  ];
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Multilingual Chat Interface</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              {languages.map((lang) => (
                <Button 
                  key={lang.code}
                  variant={currentLanguage === lang.code ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentLanguage(lang.code)}
                >
                  {lang.name}
                </Button>
              ))}
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">
                Current language: {languages.find(l => l.code === currentLanguage)?.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed System Health
export const FixedSystemHealth = () => {
  const services = [
    { name: 'PropGuard', status: 'healthy' },
    { name: 'LLM Service', status: 'healthy' },
    { name: 'Blockchain', status: 'warning' },
    { name: 'Analytics', status: 'healthy' }
  ];
  
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <span className="text-sm font-medium">{service.name}</span>
                <Badge 
                  variant={service.status === 'healthy' ? 'default' : 'destructive'}
                >
                  {service.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Fixed components with Key icon
export const FixedSensayMultimodal = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyIcon className="h-5 w-5" />
            Sensay Multimodal Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Badge variant="outline">Voice Processing: Active</Badge>
            <Badge variant="outline">Video Analysis: Active</Badge>
            <Badge variant="outline">Text Processing: Active</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};