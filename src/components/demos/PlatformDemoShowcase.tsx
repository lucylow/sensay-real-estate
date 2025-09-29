import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle, 
  Mail, 
  Globe, 
  Users,
  Smartphone,
  Calendar,
  Star,
  TrendingUp,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { WhatsAppPropertyCardDemo } from './WhatsAppPropertyCardDemo';
import { EmailValuationReportDemo } from './EmailValuationReportDemo';
import { DiscordCommunityDemo } from './DiscordCommunityDemo';
import { MultilingualTelegramDemo } from './MultilingualTelegramDemo';

export const PlatformDemoShowcase: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<'all' | 'whatsapp' | 'email' | 'discord' | 'telegram'>('all');

  const platformData = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <MessageCircle className="h-5 w-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      demos: [
        'Interactive property cards with rich media',
        'Quick reply buttons for actions',
        'Automated booking workflows',
        'Real-time conversation flows'
      ],
      stats: {
        users: '2B+',
        conversion: '+71.6%',
        response: 'Instant',
        rating: '4.8/5'
      }
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      demos: [
        'AI-driven property valuation reports',
        'Automated email attachments',
        'Rich visual analytics',
        'Risk assessment documentation'
      ],
      stats: {
        users: '4.4B+',
        conversion: '+55.6%',
        response: '24h',
        rating: '4.6/5'
      }
    },
    {
      id: 'discord',
      name: 'Discord',
      icon: <Users className="h-5 w-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      demos: [
        'Community mentions for alerts',
        'Rich property embeds',
        'Event-driven notifications',
        'Real-time server integration'
      ],
      stats: {
        users: '150M+',
        conversion: '+62.5%',
        response: 'Real-time',
        rating: '4.7/5'
      }
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <Smartphone className="h-5 w-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 border-blue-200',
      demos: [
        'Multilingual AI conversations',
        'Cultural adaptation',
        'Inline keyboards for quick actions',
        'Global property search with localization'
      ],
      stats: {
        users: '800M+',
        conversion: '+68.5%',
        response: 'Instant',
        rating: '4.9/5'
      }
    }
  ];

  const overallStats = {
    platforms: '7+',
    languages: '50+',
    conversions: '+65%',
    satisfaction: '4.7/5',
    revenue: '$2.3M+',
    leads: '12K+'
  };

  const renderPlatformOverview = () => (
    <div className="space-y-6">
      {/* Overall Statistics */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Multi-Platform Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {Object.entries(overallStats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{value}</div>
                <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Platform Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platformData.map((platform) => (
          <Card key={platform.id} className={`${platform.bgColor} cursor-pointer hover:shadow-lg transition-all`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm ${platform.color}`}>
                    <platform.icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{platform.name}</h3>
                    <div className="text-sm text-gray-600">PropGuard AI Integration</div>
                  </div>
                </div>
                <Button
                  variant={activePlatform === platform.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActivePlatform(platform.id as any)}
                >
                  Demo Now
                </Button>
              </div>

              <div className="space-y-4">
                {/* Key Features */}
                <div>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Key Demo Features:</h4>
                  <ul className="space-y-1 text-xs text-gray-600">
                    {platform.demos.map((demo, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0" />
                        {demo}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-green-600">{platform.stats.conversion}</div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-blue-600">{platform.stats.response}</div>
                      <div className="text-xs text-gray-600">Response Time</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demo Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-500" />
            Specific Demo Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-600">What's New in WhatsApp:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Interactive property cards with images and PropGuard scores</li>
                <li>• "Schedule Viewing" quick reply buttons</li>
                <li>• Automated follow-up for lead qualification</li>
                <li>• Voice message support for property descriptions</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600">Email Automation:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• AI-generated valuation reports with attachments</li>
                <li>• Risk assessment documentation</li>
                <li>• Market trend analysis and recommendations</li>
                <li>• Appointment scheduling integration</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600">Discord Community:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• @mentions for saved search notifications</li>
                <li>• Rich embeds with market intelligence</li>
                <li>• Real-time community engagement</li>
                <li>• Agent collaboration tools</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-500">Multilingual Telegram:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Real-time language detection (12+ languages)</li>
                <li>• Cultural adaptation for property terminology</li>
                <li>• Inline keyboards for quick actions</li>
                <li>• Global property search with localization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlatformDemo = (platform: string) => {
    switch (platform) {
      case 'whatsapp':
        return <WhatsAppPropertyCardDemo />;
      case 'email':
        return <EmailValuationReportDemo />;
      case 'discord':
        return <DiscordCommunityDemo />;
      case 'telegram':
        return <MultilingualTelegramDemo />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🚀 Platform Demo Showcase</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Experience the full power of PropGuard AI across WhatsApp, Email, Discord, Telegram, and more. 
          Each platform demonstrates unique interactive features designed for real estate professionals.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <Zap className="h-3 w-3 mr-1" />
            Live Demos
          </Badge>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Award className="h-3 w-3 mr-1" />
            Sensay Powered
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <Tabs value={activePlatform} onValueChange={(value) => setActivePlatform(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            All Platforms
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="discord" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Discord
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            Telegram
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderPlatformOverview()}
        </TabsContent>

        {platformData.map((platform) => (
          <TabsContent key={platform.id} value={platform.id} className="mt-6">
            {renderPlatformDemo(platform.id)}
          </TabsContent>
        ))}
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Transform Your Real Estate Business?</h3>
          <p className="text-gray-600 mb-4">
            Join thousands of professionals using PropGuard AI across all platforms to increase conversions and deliver exceptional customer experiences.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
              <TrendingUp className="h-5 w-5 mr-2" />
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              <MessageCircle className="h-5 w-5 mr-2" />
              Schedule Demo Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
