import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bot, Key, Sparkles, TrendingUp, Shield, FileText } from 'lucide-react';
import { SensaySetup } from '@/components/SensaySetup';
import { SensayAssistant } from '@/components/SensayAssistant';
import { EnhancedSensayAssistant } from '@/components/EnhancedSensayAssistant';
import { MultiChannelDeployment } from '@/components/MultiChannelDeployment';
import { LeadQualificationAutomation } from '@/components/LeadQualificationAutomation';
import { sensayAPI, SensayCredentials } from '@/services/api/sensay';

export const SensayIntegrationPage: React.FC = () => {
  const [credentials, setCredentials] = useState<SensayCredentials | null>(null);
  const [activeTab, setActiveTab] = useState('setup');

  const handleCredentialsSet = (newCredentials: SensayCredentials) => {
    setCredentials(newCredentials);
    // Switch to assistant tab when credentials are set
    setActiveTab('assistant');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Sensay Wisdom Integration</h1>
          <Badge variant="secondary" className="text-sm">
            Hackathon
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Experience enhanced AI-powered property analysis with Sensay's Wisdom Engine. 
          Get sophisticated insights, risk assessments, and investment advice.
        </p>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Bot className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Enhanced AI</h3>
            <p className="text-sm text-muted-foreground">
              Powered by Sensay's Wisdom Engine for sophisticated conversations
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Market Intelligence</h3>
            <p className="text-sm text-muted-foreground">
              Advanced market analysis and trend predictions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Risk Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive risk analysis with mitigation strategies
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Smart Reports</h3>
            <p className="text-sm text-muted-foreground">
              Generate detailed property analysis reports
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="assistant" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="channels" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Multi-Channel
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Lead Management
          </TabsTrigger>
          <TabsTrigger value="demo" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Demo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="mt-6">
          <SensaySetup onCredentialsSet={handleCredentialsSet} />
        </TabsContent>

        <TabsContent value="assistant" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* AI Assistant */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Enhanced AI Assistant</h2>
              <SensayAssistant className="h-[600px]" />
            </div>

            {/* Features and Capabilities */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Capabilities</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Property Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Comprehensive valuation analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Market comparison insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Investment potential assessment</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Environmental risk factors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Market volatility analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Mitigation strategies</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Intelligence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Trend analysis and predictions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Sentiment scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Competitive positioning</span>
                  </div>
                </CardContent>
              </Card>

              {/* API Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sensay Wisdom Engine</span>
                      <Badge variant={credentials ? "default" : "secondary"}>
                        {credentials ? "Connected" : "Not Connected"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Local AI Fallback</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    {credentials && (
                      <div className="text-xs text-muted-foreground">
                        Org ID: {credentials.organizationId}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Information */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Sensay Hackathon Integration</h3>
            <p className="text-sm text-muted-foreground">
              This integration showcases the power of Sensay's Wisdom Engine for real estate applications.
              Build something that transforms how we learn and teach about property investment.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://docs.sensay.io', '_blank')}
              >
                API Documentation
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('https://t.me/sensay', '_blank')}
              >
                Community Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
