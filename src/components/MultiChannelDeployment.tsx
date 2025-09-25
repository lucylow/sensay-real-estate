import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, Send, Phone, Mail, Bot, CheckCircle, 
  AlertCircle, Settings, Globe, Users, Calendar, FileText,
  Zap, Shield, TrendingUp, Home, Building, DollarSign
} from 'lucide-react';
import { sensayAPI } from '@/services/api/sensay';

interface ChannelConfig {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'configuring';
  description: string;
  features: string[];
  setupRequired: boolean;
}

interface MultiChannelDeploymentProps {
  className?: string;
}

export const MultiChannelDeployment: React.FC<MultiChannelDeploymentProps> = ({ 
  className = '' 
}) => {
  const [channels, setChannels] = useState<ChannelConfig[]>([
    {
      id: 'web',
      name: 'Web Chat',
      icon: <Globe className="h-5 w-5" />,
      status: 'active',
      description: 'Embedded web chat widget for your website',
      features: ['Rich media support', 'File uploads', 'Interactive maps', 'Property galleries'],
      setupRequired: false
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: <MessageCircle className="h-5 w-5" />,
      status: 'configuring',
      description: 'WhatsApp Business API integration for global reach',
      features: ['Voice messages', 'Location sharing', 'Quick replies', 'Broadcast lists'],
      setupRequired: true
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      icon: <Send className="h-5 w-5" />,
      status: 'configuring',
      description: 'Telegram bot for property inquiries and updates',
      features: ['Bot commands', 'Group discussions', 'Market alerts', 'File sharing'],
      setupRequired: true
    },
    {
      id: 'email',
      name: 'Email Integration',
      icon: <Mail className="h-5 w-5" />,
      status: 'active',
      description: 'Automated email responses and follow-ups',
      features: ['Rich HTML emails', 'PDF reports', 'Calendar invites', 'Newsletter campaigns'],
      setupRequired: false
    },
    {
      id: 'sms',
      name: 'SMS Notifications',
      icon: <Phone className="h-5 w-5" />,
      status: 'inactive',
      description: 'SMS alerts for urgent property updates',
      features: ['Instant alerts', 'Appointment reminders', 'Market updates', 'Emergency notifications'],
      setupRequired: true
    }
  ]);

  const [activeChannel, setActiveChannel] = useState('web');
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');

  const handleDeployChannel = async (channelId: string) => {
    setDeploymentStatus('deploying');
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setChannels(prev => prev.map(channel => 
        channel.id === channelId 
          ? { ...channel, status: 'active' as const }
          : channel
      ));
      
      setDeploymentStatus('success');
    } catch (error) {
      setDeploymentStatus('error');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'configuring':
        return <Badge variant="secondary"><Settings className="h-3 w-3 mr-1" />Configuring</Badge>;
      case 'inactive':
        return <Badge variant="outline"><AlertCircle className="h-3 w-3 mr-1" />Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const ChannelCard: React.FC<{ channel: ChannelConfig }> = ({ channel }) => (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {channel.icon}
            <span className="text-lg">{channel.name}</span>
          </div>
          {getStatusBadge(channel.status)}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{channel.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Features:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {channel.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        {channel.setupRequired && channel.status !== 'active' && (
          <Button 
            onClick={() => handleDeployChannel(channel.id)}
            disabled={deploymentStatus === 'deploying'}
            className="w-full"
            size="sm"
          >
            {deploymentStatus === 'deploying' ? 'Deploying...' : 'Setup Channel'}
          </Button>
        )}
        
        {channel.status === 'active' && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              Configure
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Analytics
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Multi-Channel Deployment</h1>
          <Badge variant="secondary" className="text-sm">
            Sensay Hackathon
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Deploy your PropGuard AI real estate chatbot across multiple channels 
          to reach customers wherever they are - web, WhatsApp, Telegram, email, and SMS.
        </p>
      </div>

      {/* Deployment Status */}
      {deploymentStatus !== 'idle' && (
        <Alert className={deploymentStatus === 'success' ? 'border-green-200 bg-green-50' : 
                          deploymentStatus === 'error' ? 'border-red-200 bg-red-50' : 
                          'border-blue-200 bg-blue-50'}>
          {deploymentStatus === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-600" />
          ) : deploymentStatus === 'error' ? (
            <AlertCircle className="h-4 w-4 text-red-600" />
          ) : (
            <Settings className="h-4 w-4 text-blue-600 animate-spin" />
          )}
          <AlertDescription className={
            deploymentStatus === 'success' ? 'text-green-700' : 
            deploymentStatus === 'error' ? 'text-red-700' : 
            'text-blue-700'
          }>
            {deploymentStatus === 'success' && 'Channel deployed successfully!'}
            {deploymentStatus === 'error' && 'Deployment failed. Please try again.'}
            {deploymentStatus === 'deploying' && 'Deploying channel... Please wait.'}
          </AlertDescription>
        </Alert>
      )}

      {/* Channel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <ChannelCard key={channel.id} channel={channel} />
        ))}
      </div>

      {/* Integration Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Sensay Platform Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">User Management</h3>
              <p className="text-sm text-muted-foreground">
                Unified user profiles across all channels
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Conversation Sync</h3>
              <p className="text-sm text-muted-foreground">
                Seamless conversation history across platforms
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Cross-channel performance metrics
              </p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Security</h3>
              <p className="text-sm text-muted-foreground">
                End-to-end encryption and compliance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Estate Specific Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            Real Estate Chatbot Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="search">Property Search</TabsTrigger>
              <TabsTrigger value="valuation">Valuation</TabsTrigger>
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Smart Property Search
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Natural language property queries</li>
                    <li>• Location-based recommendations</li>
                    <li>• Budget and preference matching</li>
                    <li>• Real-time inventory updates</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location Intelligence
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Neighborhood analysis</li>
                    <li>• School district information</li>
                    <li>• Transportation accessibility</li>
                    <li>• Local amenities mapping</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="valuation" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Calculator className="h-4 w-4" />
                    AI Valuation
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• PropGuard AI risk assessment</li>
                    <li>• Comparative market analysis</li>
                    <li>• Investment potential scoring</li>
                    <li>• Environmental risk factors</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Financial Analysis
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• ROI projections</li>
                    <li>• Cash flow calculations</li>
                    <li>• Mortgage affordability</li>
                    <li>• Tax implications</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="booking" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Appointment Booking
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Calendar integration</li>
                    <li>• Automated scheduling</li>
                    <li>• Reminder notifications</li>
                    <li>• Virtual tour booking</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Lead Management
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Contact information collection</li>
                    <li>• Lead qualification scoring</li>
                    <li>• Follow-up automation</li>
                    <li>• CRM integration</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="support" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    FAQ & Support
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Real estate process guidance</li>
                    <li>• Regulatory compliance info</li>
                    <li>• PropGuard technology explanation</li>
                    <li>• Market trend insights</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Documentation
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Property report generation</li>
                    <li>• Investment analysis PDFs</li>
                    <li>• Compliance documentation</li>
                    <li>• Market intelligence reports</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Deployment Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            Deployment Instructions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">1. Sensay API Configuration</h4>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              <div># Set your Sensay API credentials</div>
              <div>VITE_SENSAY_API_KEY=your_api_key_here</div>
              <div>VITE_SENSAY_ORG_ID=your_org_id_here</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">2. Channel-Specific Setup</h4>
            <div className="space-y-2 text-sm">
              <div><strong>WhatsApp:</strong> Configure WhatsApp Business API webhook</div>
              <div><strong>Telegram:</strong> Create bot token and set webhook URL</div>
              <div><strong>Email:</strong> Configure SMTP settings for automated emails</div>
              <div><strong>SMS:</strong> Integrate with Twilio or similar SMS provider</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">3. PropGuard AI Integration</h4>
            <div className="bg-muted p-3 rounded text-sm font-mono">
              <div># Connect to PropGuard backend</div>
              <div>VITE_PROPGUARD_API_URL=https://your-backend.com/api</div>
              <div>VITE_PROPERTY_DATA_API_KEY=your_property_api_key</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
