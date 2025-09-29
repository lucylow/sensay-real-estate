/**
 * API Testing and Setup Component
 * Tests and validates ElevenLabs and HeyGen API connections
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertCircle, 
  Play, 
  Volume2, 
  Video, 
  Settings, 
  Key,
  TestTube,
  Loader2,
  Mic,
  Camera
} from 'lucide-react';
import { elevenLabsService } from '@/config/elevenlabs';
import { heyGenService } from '@/config/heygen';
import { mockDataService } from '@/services/mockDataService';

interface APITestResult {
  service: string;
  status: 'success' | 'error' | 'testing';
  message: string;
  details?: any;
  audioUrl?: string;
  videoUrl?: string;
}

export const APITestingComponent: React.FC = () => {
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [heyGenKey, setHeyGenKey] = useState('');
  const [heyGenAvatarId, setHeyGenAvatarId] = useState('');
  const [testResults, setTestResults] = useState<APITestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('setup');

  // Load existing keys from environment or localStorage
  useEffect(() => {
    const savedElevenLabsKey = localStorage.getItem('elevenlabs_api_key') || import.meta.env.VITE_ELEVENLABS_API_KEY || '';
    const savedHeyGenKey = localStorage.getItem('heygen_api_key') || import.meta.env.VITE_HEYGEN_API_KEY || '';
    const savedHeyGenAvatarId = localStorage.getItem('heygen_avatar_id') || import.meta.env.VITE_HEYGEN_AVATAR_ID || '';

    setElevenLabsKey(savedElevenLabsKey);
    setHeyGenKey(savedHeyGenKey);
    setHeyGenAvatarId(savedHeyGenAvatarId);
  }, []);

  const updateElevenLabsConfig = (apiKey: string) => {
    // Update the service configuration
    (elevenLabsService as any).config.apiKey = apiKey;
    localStorage.setItem('elevenlabs_api_key', apiKey);
  };

  const updateHeyGenConfig = (apiKey: string, avatarId: string) => {
    // Update the service configuration
    (heyGenService as any).config.apiKey = apiKey;
    (heyGenService as any).config.avatarId = avatarId;
    localStorage.setItem('heygen_api_key', apiKey);
    localStorage.setItem('heygen_avatar_id', avatarId);
  };

  const testElevenLabsAPI = async (): Promise<APITestResult> => {
    try {
      updateElevenLabsConfig(elevenLabsKey);
      
      // Test 1: Check if service is configured through Supabase
      const isConfigured = await elevenLabsService.isConfigured();
      if (!isConfigured) {
        return {
          service: 'ElevenLabs',
          status: 'error',
          message: 'ElevenLabs API not configured in Supabase. Please set ELEVENLABS_API_KEY in Supabase environment variables.'
        };
      }

      // Test 2: Generate test audio using Supabase function
      const testText = 'Hello! This is a test of the ElevenLabs API integration for Sensay Real Estate.';
      const audioResult = await elevenLabsService.generateAlexSpeech(testText);

      if (!audioResult.success) {
        return {
          service: 'ElevenLabs',
          status: 'error',
          message: audioResult.error || 'Failed to generate audio'
        };
      }

      return {
        service: 'ElevenLabs',
        status: 'success',
        message: 'Successfully connected through Supabase!',
        details: {
          testText,
          audioGenerated: true
        },
        audioUrl: audioResult.audio_url
      };
    } catch (error) {
      return {
        service: 'ElevenLabs',
        status: 'error',
        message: `API Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const testHeyGenAPI = async (): Promise<APITestResult> => {
    try {
      updateHeyGenConfig(heyGenKey, heyGenAvatarId);
      
      // Test 1: Check if service is configured through Supabase
      const isConfigured = await heyGenService.isConfigured();
      if (!isConfigured) {
        return {
          service: 'HeyGen',
          status: 'error',
          message: 'HeyGen API not configured in Supabase. Please set HEYGEN_API_KEY in Supabase environment variables.'
        };
      }

      // Test 2: Generate test video
      const testText = 'Welcome to Sensay Real Estate! I\'m here to help you with your property analysis needs.';
      const videoResult = await heyGenService.generateAvatarVideo(testText, 'en_us_female_001');

      if (!videoResult.success) {
        return {
          service: 'HeyGen',
          status: 'error',
          message: videoResult.error || 'Failed to generate video'
        };
      }

      return {
        service: 'HeyGen',
        status: 'success',
        message: 'Successfully connected through Supabase!',
        details: {
          taskId: videoResult.task_id,
          testText,
          videoGenerated: true
        },
        videoUrl: videoResult.video_url
      };
    } catch (error) {
      return {
        service: 'HeyGen',
        status: 'error',
        message: `API Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  };

  const runAllTests = async () => {
    setIsTesting(true);
    setTestProgress(0);
    setTestResults([]);

    const tests = [
      { name: 'ElevenLabs API', test: testElevenLabsAPI },
      { name: 'HeyGen API', test: testHeyGenAPI }
    ];

    const results: APITestResult[] = [];

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      
      // Add testing status
      results.push({
        service: test.name,
        status: 'testing',
        message: 'Testing connection...'
      });
      setTestResults([...results]);

      try {
        const result = await test.test();
        results[i] = result;
        setTestResults([...results]);
      } catch (error) {
        results[i] = {
          service: test.name,
          status: 'error',
          message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
        setTestResults([...results]);
      }

      setTestProgress(((i + 1) / tests.length) * 100);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay between tests
    }

    setIsTesting(false);
  };

  const playTestAudio = (audioUrl: string) => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch(console.error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'testing':
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <TestTube className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const allTestsPassed = testResults.length > 0 && testResults.every(result => result.status === 'success');
  const hasErrors = testResults.some(result => result.status === 'error');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            API Configuration & Testing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-6">
              {/* ElevenLabs Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5" />
                    ElevenLabs API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="elevenlabs-key">API Key</Label>
                    <Input
                      id="elevenlabs-key"
                      type="password"
                      value={elevenLabsKey}
                      onChange={(e) => setElevenLabsKey(e.target.value)}
                      placeholder="Enter your ElevenLabs API key"
                    />
                    <p className="text-sm text-muted-foreground">
                      Get your API key from{' '}
                      <a 
                        href="https://elevenlabs.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        elevenlabs.io
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={elevenLabsKey ? "default" : "secondary"}>
                      {elevenLabsKey ? 'Configured' : 'Not Configured'}
                    </Badge>
                    {elevenLabsKey && (
                      <Badge variant="outline">
                        {elevenLabsKey.substring(0, 8)}...
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* HeyGen Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    HeyGen API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="heygen-key">API Key</Label>
                      <Input
                        id="heygen-key"
                        type="password"
                        value={heyGenKey}
                        onChange={(e) => setHeyGenKey(e.target.value)}
                        placeholder="Enter your HeyGen API key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heygen-avatar">Avatar ID</Label>
                      <Input
                        id="heygen-avatar"
                        value={heyGenAvatarId}
                        onChange={(e) => setHeyGenAvatarId(e.target.value)}
                        placeholder="Marianne_CasualLook_public"
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    Get your API key and avatar ID from{' '}
                    <a 
                      href="https://heygen.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      heygen.com
                    </a>
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={heyGenKey && heyGenAvatarId ? "default" : "secondary"}>
                      {heyGenKey && heyGenAvatarId ? 'Configured' : 'Not Configured'}
                    </Badge>
                    {heyGenKey && (
                      <Badge variant="outline">
                        {heyGenKey.substring(0, 8)}...
                      </Badge>
                    )}
                    {heyGenAvatarId && (
                      <Badge variant="outline">
                        {heyGenAvatarId}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Environment Variables */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Environment Variables
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add these to your .env file for automatic configuration:
                  </p>
                  <div className="bg-muted p-3 rounded text-sm font-mono space-y-1">
                    <div>VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key</div>
                    <div>VITE_HEYGEN_API_KEY=your_heygen_api_key</div>
                    <div>VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              {/* Test Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    API Testing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={runAllTests} 
                    disabled={isTesting || (!elevenLabsKey && !heyGenKey)}
                    className="w-full"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Testing APIs...
                      </>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Test All APIs
                      </>
                    )}
                  </Button>
                  
                  {isTesting && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Testing Progress</span>
                        <span>{Math.round(testProgress)}%</span>
                      </div>
                      <Progress value={testProgress} className="w-full" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Test Results */}
              {testResults.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Test Results</h3>
                  
                  {testResults.map((result, index) => (
                    <Alert key={index} className={getStatusColor(result.status)}>
                      <div className="flex items-start gap-3">
                        {getStatusIcon(result.status)}
                        <div className="flex-1">
                          <AlertDescription>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium">{result.service}</span>
                                <Badge variant={result.status === 'success' ? 'default' : 'destructive'}>
                                  {result.status}
                                </Badge>
                              </div>
                              <p className="text-sm">{result.message}</p>
                              
                              {result.details && (
                                <div className="text-xs text-muted-foreground">
                                  <p>Details: {JSON.stringify(result.details, null, 2)}</p>
                                </div>
                              )}
                              
                              {result.audioUrl && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => playTestAudio(result.audioUrl!)}
                                  className="mt-2"
                                >
                                  <Volume2 className="h-3 w-3 mr-1" />
                                  Play Test Audio
                                </Button>
                              )}
                            </div>
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ))}
                </div>
              )}

              {/* Overall Status */}
              {testResults.length > 0 && (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      {allTestsPassed ? (
                        <div className="space-y-2">
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                          <h3 className="text-lg font-semibold text-green-700">
                            All APIs Working!
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Both ElevenLabs and HeyGen APIs are properly configured and working.
                          </p>
                        </div>
                      ) : hasErrors ? (
                        <div className="space-y-2">
                          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
                          <h3 className="text-lg font-semibold text-red-700">
                            Some APIs Failed
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Check the test results above and fix any configuration issues.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <TestTube className="h-12 w-12 text-blue-500 mx-auto" />
                          <h3 className="text-lg font-semibold text-blue-700">
                            Testing in Progress
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Please wait while we test your API configurations.
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default APITestingComponent;
