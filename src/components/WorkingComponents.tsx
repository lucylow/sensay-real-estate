import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  AlertCircle, CheckCircle, Clock, BarChart3, 
  MessageSquare, Send, Calculator, DollarSign,
  Search, Phone, Mail, FileText, Key as KeyIcon,
  Bot, TrendingUp
} from 'lucide-react';

// Simple working replacements for problematic components

export const QualityControlledAssistant = () => {
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

export const SensayConversationAnalytics = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversation Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold">1,247</p>
              <p className="text-sm text-gray-600">Total Conversations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-gray-600">Active Sources</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">15%</p>
              <p className="text-sm text-gray-600">Growth Rate</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">Email</p>
              <p className="text-sm text-gray-600">Top Source</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const SensayMultimodalIntegration = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyIcon className="h-5 w-5" />
            Multimodal Integration
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

export const SystemHealth = () => {
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

export const SensayWisdomEngine = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Sensay Wisdom Engine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="text-sm">Search Integration</span>
                <Badge variant="outline">Active</Badge>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="text-sm">Data Processing</span>
                <Badge variant="outline">Active</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600">
                AI-powered wisdom engine for property insights and recommendations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const SensayRealEstateChatbot = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Real Estate Chatbot</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Chatbot Active</span>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">Available Features:</p>
              <ul className="text-sm space-y-1">
                <li>• Property search and recommendations</li>
                <li>• Market analysis and trends</li>
                <li>• Investment guidance</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};