import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  MessageCircle, 
  Smartphone, 
  Monitor, 
  Settings, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Play,
  Pause,
  RefreshCw,
  ExternalLink,
  Code,
  Copy,
  Share2
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'inactive' | 'error';
  leads: number;
  conversionRate: number;
  responseTime: number;
  uptime: number;
  lastSync: Date;
  config: {
    webhook: string;
    apiKey: string;
    enabled: boolean;
  };
}

export const EnhancedMultiChannelDeployment: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'website',
      name: 'Website Chatbot',
      platform: 'Web',
      status: 'active',
      leads: 2156,
      conversionRate: 28.5,
      responseTime: 1.2,
      uptime: 99.8,
      lastSync: new Date(),
      config: {
        webhook: 'https://api.sensay.io/webhook/website',
        apiKey: 'sk_web_***',
        enabled: true
      }
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      platform: 'WhatsApp',
      status: 'active',
      leads: 892,
      conversionRate: 32.1,
      responseTime: 0.8,
      uptime: 99.5,
      lastSync: new Date(Date.now() - 5 * 60 * 1000),
      config: {
        webhook: 'https://api.sensay.io/webhook/whatsapp',
        apiKey: 'sk_wa_***',
        enabled: true
      }
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      platform: 'Telegram',
      status: 'active',
      leads: 456,
      conversionRate: 25.8,
      responseTime: 1.5,
      uptime: 98.9,
      lastSync: new Date(Date.now() - 15 * 60 * 1000),
      config: {
        webhook: 'https://api.sensay.io/webhook/telegram',
        apiKey: 'sk_tg_***',
        enabled: true
      }
    },
    {
      id: 'discord',
      name: 'Discord Server',
      platform: 'Discord',
      status: 'inactive',
      leads: 343,
      conversionRate: 22.3,
      responseTime: 2.1,
      uptime: 97.2,
      lastSync: new Date(Date.now() - 2 * 60 * 60 * 1000),
      config: {
        webhook: 'https://api.sensay.io/webhook/discord',
        apiKey: 'sk_dc_***',
        enabled: false
      }
    }
  ]);

  const totalLeads = channels.reduce((sum, channel) => sum + channel.leads, 0);
  const activeChannels = channels.filter(channel => channel.status === 'active').length;
  const averageResponseTime = channels.reduce((sum, channel) => sum + channel.responseTime, 0) / channels.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'inactive': return <Pause className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Web': return <Globe className="h-5 w-5" />;
      case 'WhatsApp': return <MessageCircle className="h-5 w-5" />;
      case 'Telegram': return <MessageCircle className="h-5 w-5" />;
      case 'Discord': return <MessageCircle className="h-5 w-5" />;
      default: return <Monitor className="h-5 w-5" />;
    }
  };

  const toggleChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { 
            ...channel, 
            status: channel.status === 'active' ? 'inactive' : 'active',
            config: { ...channel.config, enabled: !channel.config.enabled }
          }
        : channel
    ));
  };

  const syncChannel = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, lastSync: new Date() }
        : channel
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Multi-Channel Deployment</h2>
          <p className="text-gray-600">Deploy Sensay chatbot across 4+ platforms simultaneously</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            <Zap className="h-3 w-3 mr-1" />
            {activeChannels}/4 Active
          </Badge>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-2xl font-bold text-gray-900">{totalLeads.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Channels</p>
                <p className="text-2xl font-bold text-gray-900">{activeChannels}</p>
              </div>
              <Globe className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{averageResponseTime.toFixed(1)}s</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.1%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {channels.map((channel) => (
          <Card key={channel.id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(channel.platform)}
                  <div>
                    <CardTitle className="text-lg">{channel.name}</CardTitle>
                    <p className="text-sm text-gray-600">{channel.platform}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(channel.status)}>
                    {getStatusIcon(channel.status)}
                    <span className="ml-1 capitalize">{channel.status}</span>
                  </Badge>
                  <Switch
                    checked={channel.config.enabled}
                    onCheckedChange={() => toggleChannel(channel.id)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{channel.leads}</p>
                  <p className="text-xs text-gray-600">Leads</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{channel.conversionRate}%</p>
                  <p className="text-xs text-gray-600">Conversion</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{channel.responseTime}s</p>
                  <p className="text-xs text-gray-600">Response</p>
                </div>
              </div>

              {/* Uptime Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Uptime</span>
                  <span>{channel.uptime}%</span>
                </div>
                <Progress value={channel.uptime} className="h-2" />
              </div>

              {/* Last Sync */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Last Sync</span>
                <span className="text-gray-900">
                  {channel.lastSync.toLocaleTimeString()}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => syncChannel(channel.id)}
                  className="flex-1"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Sync
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Config
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                >
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Integration Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">// Website Integration</span>
                <Button size="sm" variant="outline" className="text-xs">
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </div>
              <pre>{`<script>
  window.SensayConfig = {
    apiKey: 'sk_web_***',
    channel: 'website',
    theme: 'real-estate',
    position: 'bottom-right',
    autoStart: true
  };
</script>
<script src="https://cdn.sensay.io/widget.js"></script>`}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">WhatsApp Business</h4>
                <p className="text-sm text-gray-600 mb-2">Connect your WhatsApp Business account</p>
                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Setup Guide
                </Button>
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Telegram Bot</h4>
                <p className="text-sm text-gray-600 mb-2">Deploy as Telegram bot</p>
                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Bot Setup
                </Button>
              </div>

              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">Discord Server</h4>
                <p className="text-sm text-gray-600 mb-2">Add to Discord server</p>
                <Button size="sm" variant="outline" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Invite Bot
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
