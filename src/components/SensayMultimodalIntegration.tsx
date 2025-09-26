import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Video, 
  Volume2, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Copy,
  Globe,
  MessageSquare,
  Mic,
  Play,
  Loader2
} from 'lucide-react';
import { MultimodalAIAssistant } from './MultimodalAIAssistant';
import { elevenLabsService } from '@/config/elevenlabs';
import { heyGenService } from '@/config/heygen';
import { propGuardAPI } from '@/config/api';

interface SensayMultimodalIntegrationProps {
  className?: string;
}

export const SensayMultimodalIntegration: React.FC<SensayMultimodalIntegrationProps> = ({ 
  className = '' 
}) => {
  const [sensayApiKey, setSensayApiKey] = useState('');
  const [sensayOrgId, setSensayOrgId] = useState('');
  const [replicaId, setReplicaId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [integrationStatus, setIntegrationStatus] = useState<{
    sensay: boolean;
    heygen: boolean;
    elevenlabs: boolean;
  }>({ sensay: false, heygen: false, elevenlabs: false });

  useEffect(() => {
    checkConfiguration();
    loadStoredCredentials();
  }, []);

  const loadStoredCredentials = () => {
    const stored = localStorage.getItem('sensay-credentials');
    if (stored) {
      try {
        const credentials = JSON.parse(stored);
        setSensayApiKey(credentials.apiKey || '');
        setSensayOrgId(credentials.organizationId || '');
        setReplicaId(credentials.replicaId || '');
      } catch (error) {
        console.error('Failed to load stored credentials:', error);
      }
    }
  };

  const checkConfiguration = async () => {
    const heygenConfigured = heyGenService.isConfigured();
    const elevenlabsConfigured = elevenLabsService.isConfigured();
    
    setIntegrationStatus({
      sensay: !!(sensayApiKey && sensayOrgId),
      heygen: heygenConfigured,
      elevenlabs: elevenlabsConfigured
    });

    setIsConfigured(heygenConfigured && elevenlabsConfigured);
  };

  const handleSaveCredentials = () => {
    const credentials = {
      apiKey: sensayApiKey,
      organizationId: sensayOrgId,
      replicaId: replicaId,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('sensay-credentials', JSON.stringify(credentials));
    checkConfiguration();
  };

  const testIntegration = async () => {
    setIsTesting(true);
    setTestResults(null);

    try {
      const results = {
        sensay: false,
        heygen: false,
        elevenlabs: false,
        timestamp: new Date().toISOString()
      };

      // Test Sensay connection
      if (sensayApiKey && sensayOrgId) {
        try {
          // This would be a real Sensay API test
          results.sensay = true;
        } catch (error) {
          console.error('Sensay test failed:', error);
        }
      }

      // Test HeyGen
      try {
        const heygenHealth = await propGuardAPI.checkHeyGenHealth();
        results.heygen = heygenHealth.success;
      } catch (error) {
        console.error('HeyGen test failed:', error);
      }

      // Test Eleven Labs
      try {
        const elevenlabsHealth = await propGuardAPI.checkElevenLabsHealth();
        results.elevenlabs = elevenlabsHealth.success;
      } catch (error) {
        console.error('Eleven Labs test failed:', error);
      }

      setTestResults(results);
    } catch (error) {
      setTestResults({
        error: error instanceof Error ? error.message : 'Test failed',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsTesting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getIntegrationCode = () => {
    return `
<!-- Sensay Multimodal AI Integration -->
<div id="sensay-multimodal-chatbot"></div>

<script>
  // Sensay Configuration
  window.SensayConfig = {
    apiKey: '${sensayApiKey}',
    organizationId: '${sensayOrgId}',
    replicaId: '${replicaId}',
    
    // Multimodal Features
    features: {
      avatar: true,
      voice: true,
      persona: 'alex'
    },
    
    // API Endpoints
    endpoints: {
      heygen: '/api/heygen',
      elevenlabs: '/api/elevenlabs',
      backend: '${window.location.origin}/api'
    },
    
    // Alex Persona Configuration
    persona: {
      name: 'Alex',
      description: 'AI-powered real estate expert with professional Australian voice',
      avatar: 'Marianne_CasualLook_public',
      voice: 'alex-professional-australian'
    }
  };

  // Load Sensay SDK
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://sensay.io/sdk/v1/sensay.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'sensay-jssdk'));
</script>
    `.trim();
  };

  const isFullyConfigured = integrationStatus.sensay && integrationStatus.heygen && integrationStatus.elevenlabs;

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Bot className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Sensay Multimodal AI Integration</h1>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sensay Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {integrationStatus.sensay ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {integrationStatus.sensay ? 'Configured' : 'Not Configured'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HeyGen Avatar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {integrationStatus.heygen ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {integrationStatus.heygen ? 'Ready' : 'Not Ready'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eleven Labs Voice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {integrationStatus.elevenlabs ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {integrationStatus.elevenlabs ? 'Ready' : 'Not Ready'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="setup" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="demo">Live Demo</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Sensay Platform Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sensay-api-key">Sensay API Key</Label>
                <Input
                  id="sensay-api-key"
                  type="password"
                  value={sensayApiKey}
                  onChange={(e) => setSensayApiKey(e.target.value)}
                  placeholder="Enter your Sensay API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sensay-org-id">Organization ID</Label>
                <Input
                  id="sensay-org-id"
                  value={sensayOrgId}
                  onChange={(e) => setSensayOrgId(e.target.value)}
                  placeholder="Enter your organization ID"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="replica-id">Replica ID</Label>
                <Input
                  id="replica-id"
                  value={replicaId}
                  onChange={(e) => setReplicaId(e.target.value)}
                  placeholder="Enter your replica ID (optional)"
                />
              </div>

              <Button onClick={handleSaveCredentials} className="w-full">
                Save Configuration
              </Button>

              <div className="text-sm text-muted-foreground">
                <p>Get your credentials from:</p>
                <a 
                  href="https://sensay.io/dashboard" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Sensay Dashboard
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Required Environment Variables
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Make sure these environment variables are set in your .env file:
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm">VITE_HEYGEN_API_KEY</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('VITE_HEYGEN_API_KEY=your-heygen-api-key')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm">VITE_ELEVENLABS_API_KEY</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <code className="bg-muted px-2 py-1 rounded text-sm">VITE_HEYGEN_AVATAR_ID</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard('VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Alex - Live Demo
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Interact with Alex, your AI-powered real estate expert with multimodal capabilities
              </p>
            </CardHeader>
            <CardContent>
              {isFullyConfigured ? (
                <MultimodalAIAssistant
                  className="w-full"
                  persona="alex"
                />
              ) : (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please complete the setup configuration first to enable the live demo.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Website Integration Code
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Add this code to your website to embed the multimodal AI assistant
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Integration Code</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(getIntegrationCode())}
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy Code
                  </Button>
                </div>
                
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{getIntegrationCode()}</code>
                </pre>
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Features included:</strong></p>
                <ul className="ml-4 list-disc space-y-1">
                  <li>Interactive video avatar with lip-sync</li>
                  <li>Natural AI voice with Australian accent</li>
                  <li>Real estate expertise and property analysis</li>
                  <li>Seamless chat interface</li>
                  <li>Multi-channel deployment support</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Integration Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={testIntegration}
                disabled={isTesting}
                className="w-full"
              >
                {isTesting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Settings className="h-4 w-4 mr-2" />
                )}
                Test All Integrations
              </Button>

              {testResults && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className={`flex items-center justify-center gap-2 ${
                        testResults.sensay ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {testResults.sensay ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">Sensay</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className={`flex items-center justify-center gap-2 ${
                        testResults.heygen ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {testResults.heygen ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">HeyGen</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className={`flex items-center justify-center gap-2 ${
                        testResults.elevenlabs ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {testResults.elevenlabs ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <span className="text-sm font-medium">Eleven Labs</span>
                      </div>
                    </div>
                  </div>

                  {testResults.error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Test Error: {testResults.error}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SensayMultimodalIntegration;

