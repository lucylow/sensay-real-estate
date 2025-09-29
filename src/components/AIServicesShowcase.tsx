import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  MessageCircle, 
  Mic, 
  Video, 
  Camera, 
  Headphones,
  Zap,
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export default function AIServicesShowcase() {
  const services = [
    {
      id: 'voice',
      title: 'Voice AI Services',
      description: 'Advanced speech synthesis and recognition',
      icon: <Mic className="w-6 h-6" />,
      features: ['Text-to-Speech', 'Voice Cloning', 'Real-time Transcription'],
      status: 'active'
    },
    {
      id: 'video',
      title: 'Video AI Avatars',
      description: 'Lifelike digital avatars for presentations',
      icon: <Video className="w-6 h-6" />,
      features: ['Avatar Generation', 'Lip Sync', 'Custom Personalities'],
      status: 'active'
    },
    {
      id: 'chat',
      title: 'Conversational AI',
      description: 'Intelligent chatbots and virtual assistants',
      icon: <MessageCircle className="w-6 h-6" />,
      features: ['Natural Language', 'Context Awareness', 'Multi-turn Conversations'],
      status: 'active'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            AI Services Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of AI-powered services designed to enhance 
            your property management and customer engagement experience.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {service.icon}
                      </div>
                      <Badge variant="secondary" className="ml-auto">
                        {service.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="space-y-2">
                      {service.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  Advanced AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Voice Technology</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Headphones className="w-4 h-4 text-blue-600" />
                        <span>High-quality speech synthesis</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mic className="w-4 h-4 text-blue-600" />
                        <span>Real-time voice recognition</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Visual AI</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-blue-600" />
                        <span>Professional avatar creation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-blue-600" />
                        <span>Dynamic video generation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integration" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Our AI services are designed for seamless integration with your existing 
                  property management workflows and customer communication channels.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Quick Setup</h4>
                  <p className="text-sm text-gray-600">
                    Get started with our AI services in minutes with our simple API integration 
                    and comprehensive documentation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}