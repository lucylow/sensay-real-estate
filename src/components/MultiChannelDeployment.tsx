import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { LoadingState } from '@/components/ui/LoadingState';
import { 
  MessageCircle, 
  Globe, 
  Smartphone, 
  Mail, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Copy, 
  ExternalLink,
  Zap,
  Users,
  BarChart3,
  Shield,
  Bot,
  Webhook,
  Key,
  Clock,
  Activity
} from 'lucide-react';
import { sensayAPI } from '@/services/api/sensay';

interface DeploymentConfig {
  platform: string;
  enabled: boolean;
  webhookUrl?: string;
  botToken?: string;
  emailAddress?: string;
  apiKey?: string;
  status: 'idle' | 'deploying' | 'active' | 'error';
  lastDeployed?: Date;
}

const MultiChannelDeployment: React.FC = () => {
  const [deployments, setDeployments] = useState<Record<string, DeploymentConfig>>({
    web: {
      platform: 'Web',
      enabled: true,
      status: 'active',
      lastDeployed: new Date()
    },
    whatsapp: {
      platform: 'WhatsApp',
      enabled: false,
      status: 'idle'
    },
    telegram: {
      platform: 'Telegram',
      enabled: false,
      status: 'idle'
    },
    email: {
      platform: 'Email',
      enabled: false,
      status: 'idle'
    }
  });

  const [activePlatform, setActivePlatform] = useState('web');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async (platform: string) => {
    setIsDeploying(true);
    const deployment = deployments[platform];
    
    try {
      setDeployments(prev => ({
        ...prev,
        [platform]: { ...deployment, status: 'deploying' }
      }));

      let result;
      const chatbotConfig = {
        name: 'PropGuard AI Assistant',
        description: 'AI-powered real estate assistant with Sensay integration',
        features: ['property-analysis', 'risk-assessment', 'lead-generation', 'global-properties'],
        language: 'en',
        fallbackEnabled: true
      };

      switch (platform) {
        case 'whatsapp':
          result = await sensayAPI.deployToWhatsApp(chatbotConfig);
          break;
        case 'telegram':
          result = await sensayAPI.deployToTelegram(chatbotConfig);
          break;
        case 'email':
          result = await sensayAPI.deployToEmail(chatbotConfig);
          break;
        default:
          result = { success: true };
      }

      if (result.success) {
        setDeployments(prev => ({
          ...prev,
          [platform]: {
            ...deployment,
            status: 'active',
            enabled: true,
            lastDeployed: new Date(),
            webhookUrl: result.webhookUrl,
            botToken: result.botToken,
            emailAddress: result.emailAddress
          }
        }));
      } else {
        throw new Error('Deployment failed');
      }
    } catch (error) {
      setDeployments(prev => ({
        ...prev,
        [platform]: { ...deployment, status: 'error' }
      }));
    } finally {
      setIsDeploying(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'deploying':
        return <Activity className="h-4 w-4 text-blue-500 animate-pulse" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500">Active</Badge>;
      case 'deploying':
        return <Badge variant="secondary">Deploying...</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Inactive</Badge>;
    }
  };

  const platforms = [
    {
      id: 'web',
      name: 'Web Chat',
      icon: <Globe className="h-5 w-5" />,
      description: 'Embedded chatbot on your website',
      color: 'bg-blue-500'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: <MessageCircle className="h-5 w-5" />,
      description: 'Deploy to WhatsApp Business API',
      color: 'bg-green-500'
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      icon: <Smartphone className="h-5 w-5" />,
      description: 'Create Telegram bot for property inquiries',
      color: 'bg-blue-600'
    },
    {
      id: 'email',
      name: 'Email Assistant',
      icon: <Mail className="h-5 w-5" />,
      description: 'AI-powered email responses',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Globe className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Multi-Channel Deployment
          </h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto"
        >
          Deploy your PropGuard AI assistant across multiple channels to reach customers wherever they are.
          Powered by Sensay's advanced Wisdom Engine for consistent, intelligent responses.
        </motion.p>
      </motion.div>

      {/* Platform Overview */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {platforms.map((platform, index) => {
            const deployment = deployments[platform.id];
            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className={`p-3 rounded-xl ${platform.color} text-white shadow-lg`}
                      >
                        {platform.icon}
                      </motion.div>
                      <Tooltip>
                        <TooltipTrigger>
                          {getStatusIcon(deployment.status)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{deployment.status.charAt(0).toUpperCase() + deployment.status.slice(1)} Status</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <h3 className="font-semibold mb-1 text-gray-900">{platform.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{platform.description}</p>
                    <div className="flex items-center justify-between">
                      {getStatusBadge(deployment.status)}
                      <Switch
                        checked={deployment.enabled}
                        onCheckedChange={(checked) => {
                          setDeployments(prev => ({
                            ...prev,
                            [platform.id]: { ...deployment, enabled: checked }
                          }));
                        }}
                      />
                    </div>
                    {deployment.lastDeployed && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-muted-foreground mt-2 flex items-center"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Last deployed: {deployment.lastDeployed.toLocaleDateString()}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Configuration Tabs */}
      <Tabs value={activePlatform} onValueChange={setActivePlatform}>
        <TabsList className="grid w-full grid-cols-4">
          {platforms.map((platform) => (
            <TabsTrigger key={platform.id} value={platform.id} className="flex items-center gap-2">
              {platform.icon}
              {platform.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Web Configuration */}
        <TabsContent value="web" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Web Chat Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="web-title">Chatbot Title</Label>
                  <Input id="web-title" defaultValue="PropGuard AI Assistant" />
                </div>
                <div>
                  <Label htmlFor="web-color">Primary Color</Label>
                  <Input id="web-color" type="color" defaultValue="#3B82F6" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="web-welcome">Welcome Message</Label>
                <Textarea 
                  id="web-welcome" 
                  defaultValue="Hi! I'm your AI real estate assistant. How can I help you today?"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="web-voice" defaultChecked />
                <Label htmlFor="web-voice">Enable voice input</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="web-multilang" defaultChecked />
                <Label htmlFor="web-multilang">Multi-language support</Label>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Embed Code</h4>
                    <p className="text-sm text-muted-foreground">Copy this code to embed the chatbot</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code
                  </Button>
                </div>
                <div className="mt-2 p-3 bg-gray-100 rounded-lg font-mono text-sm">
                  {`<script src="https://propguard.ai/chatbot.js" data-api-key="your-api-key"></script>`}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Configuration */}
        <TabsContent value="whatsapp" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                WhatsApp Business Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="whatsapp-phone">Phone Number</Label>
                  <Input id="whatsapp-phone" placeholder="+1234567890" />
                </div>
                <div>
                  <Label htmlFor="whatsapp-business">Business Name</Label>
                  <Input id="whatsapp-business" defaultValue="PropGuard AI" />
                </div>
              </div>

              <div>
                <Label htmlFor="whatsapp-webhook">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="whatsapp-webhook" 
                    value={deployments.whatsapp.webhookUrl || ''}
                    placeholder="https://api.sensay.io/webhook/whatsapp"
                    readOnly
                  />
                  <Button variant="outline" size="sm">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Business Hours</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input placeholder="09:00" />
                  <Input placeholder="18:00" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="whatsapp-auto" defaultChecked />
                <Label htmlFor="whatsapp-auto">Auto-responses outside business hours</Label>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={() => handleDeploy('whatsapp')}
                  disabled={isDeploying || deployments.whatsapp.status === 'active'}
                  className="w-full"
                >
                  {deployments.whatsapp.status === 'active' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Deployed Successfully
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Deploy to WhatsApp
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Telegram Configuration */}
        <TabsContent value="telegram" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Telegram Bot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="telegram-token">Bot Token</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="telegram-token" 
                      value={deployments.telegram.botToken || ''}
                      placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                      readOnly
                    />
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="telegram-username">Bot Username</Label>
                  <Input id="telegram-username" defaultValue="@PropGuardAI_bot" />
                </div>
              </div>

              <div>
                <Label htmlFor="telegram-description">Bot Description</Label>
                <Textarea 
                  id="telegram-description" 
                  defaultValue="AI-powered real estate assistant. Get property valuations, market insights, and investment advice."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Commands</Label>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>/start</span>
                    <span>Initialize conversation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>/property</span>
                    <span>Search properties</span>
                  </div>
                  <div className="flex justify-between">
                    <span>/valuation</span>
                    <span>Get property valuation</span>
                  </div>
                  <div className="flex justify-between">
                    <span>/help</span>
                    <span>Show available commands</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={() => handleDeploy('telegram')}
                  disabled={isDeploying || deployments.telegram.status === 'active'}
                  className="w-full"
                >
                  {deployments.telegram.status === 'active' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Bot Deployed
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Deploy Telegram Bot
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Configuration */}
        <TabsContent value="email" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Assistant Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email-address">Email Address</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="email-address" 
                      value={deployments.email.emailAddress || ''}
                      placeholder="assistant@propguard.ai"
                      readOnly
                    />
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email-sender">Sender Name</Label>
                  <Input id="email-sender" defaultValue="PropGuard AI Assistant" />
                </div>
              </div>

              <div>
                <Label htmlFor="email-signature">Email Signature</Label>
                <Textarea 
                  id="email-signature" 
                  defaultValue="Best regards,\nPropGuard AI Assistant\nPowered by Sensay Wisdom Engine"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Response Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-auto" defaultChecked />
                    <Label htmlFor="email-auto">Auto-respond to inquiries</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-followup" defaultChecked />
                    <Label htmlFor="email-followup">Send follow-up emails</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email-attachments" />
                    <Label htmlFor="email-attachments">Include property attachments</Label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button 
                  onClick={() => handleDeploy('email')}
                  disabled={isDeploying || deployments.email.status === 'active'}
                  className="w-full"
                >
                  {deployments.email.status === 'active' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Email Assistant Active
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Deploy Email Assistant
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Analytics Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Deployment Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1,247</div>
              <div className="text-sm text-muted-foreground">Total Conversations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">25.0%</div>
              <div className="text-sm text-muted-foreground">Conversion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">1.2s</div>
              <div className="text-sm text-muted-foreground">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">4</div>
              <div className="text-sm text-muted-foreground">Active Channels</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Advanced Settings
        </Button>
        <Button>
          <ExternalLink className="h-4 w-4 mr-2" />
          View Documentation
        </Button>
      </div>
    </div>
  );
};

export default MultiChannelDeployment;