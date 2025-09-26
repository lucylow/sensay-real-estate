/**
 * Comprehensive API Setup Page
 * Integrates all API testing and configuration components
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Activity, 
  TestTube, 
  CheckCircle, 
  AlertCircle,
  Key,
  Mic,
  Video,
  Home,
  Bot
} from 'lucide-react';
import APITestingComponent from './APITestingComponent';
import APIStatusDashboard from './APIStatusDashboard';
import SensaySetup from './SensaySetup';

export const ComprehensiveSetupPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">API Setup & Configuration</h1>
        <p className="text-xl text-muted-foreground">
          Configure and test all integrated APIs for Sensay Real Estate
        </p>
        
        <div className="flex justify-center gap-4">
          <Badge variant="outline" className="flex items-center gap-2">
            <Mic className="h-4 w-4" />
            ElevenLabs Voice AI
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            HeyGen Video AI
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Sensay Platform
          </Badge>
          <Badge variant="outline" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            PropGuard AI
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="status" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Status
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <TestTube className="h-4 w-4" />
            Testing
          </TabsTrigger>
          <TabsTrigger value="sensay" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Sensay
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        {/* Status Tab */}
        <TabsContent value="status" className="space-y-6">
          <APIStatusDashboard />
        </TabsContent>

        {/* Testing Tab */}
        <TabsContent value="testing" className="space-y-6">
          <APITestingComponent />
        </TabsContent>

        {/* Sensay Tab */}
        <TabsContent value="sensay" className="space-y-6">
          <SensaySetup />
        </TabsContent>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ElevenLabs Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  ElevenLabs Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Text-to-speech conversion</li>
                    <li>• Multiple voice options</li>
                    <li>• Voice cloning capabilities</li>
                    <li>• Real-time audio generation</li>
                    <li>• Audio queue management</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Property analysis narration</li>
                    <li>• FAQ chatbot responses</li>
                    <li>• Investment advice audio</li>
                    <li>• Market updates voice</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Setup Required</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• ElevenLabs API key</p>
                    <p>• Voice selection</p>
                    <p>• Audio settings configuration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HeyGen Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  HeyGen Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Interactive avatar videos</li>
                    <li>• Real estate avatars</li>
                    <li>• Voice synchronization</li>
                    <li>• Video generation</li>
                    <li>• Task management</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Property presentations</li>
                    <li>• Investment explanations</li>
                    <li>• Market analysis videos</li>
                    <li>• Client consultations</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Setup Required</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• HeyGen API key</p>
                    <p>• Avatar ID selection</p>
                    <p>• Voice configuration</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sensay Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Sensay Platform
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Property analysis</li>
                    <li>• Risk assessment</li>
                    <li>• Market intelligence</li>
                    <li>• Investment metrics</li>
                    <li>• Report generation</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Property valuations</li>
                    <li>• Risk analysis</li>
                    <li>• Market trends</li>
                    <li>• Investment advice</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Setup Required</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• Sensay API key</p>
                    <p>• Organization ID</p>
                    <p>• Invite code redemption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PropGuard AI Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  PropGuard AI
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI-powered valuations</li>
                    <li>• Environmental risk analysis</li>
                    <li>• Market sentiment analysis</li>
                    <li>• Blockchain verification</li>
                    <li>• Compliance reporting</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Use Cases</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automated valuations</li>
                    <li>• Risk mitigation</li>
                    <li>• Market predictions</li>
                    <li>• Regulatory compliance</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">AI Models</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>• TensorFlow models</p>
                    <p>• LSTM networks</p>
                    <p>• CNN analysis</p>
                    <p>• Transformer models</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Integration Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  <h4 className="font-medium">Seamless Experience</h4>
                  <p className="text-sm text-muted-foreground">
                    All APIs work together to provide a unified real estate analysis platform
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  <h4 className="font-medium">Real-time Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    Instant voice and video generation with live property analysis
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                  <h4 className="font-medium">Professional Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    High-quality AI voices and avatars for professional presentations
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveSetupPage;
