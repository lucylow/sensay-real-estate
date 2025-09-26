import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Video, 
  Play, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Loader2,
  TestTube
} from 'lucide-react';
import { VideoAvatar } from '@/components/VideoAvatar';
import { heyGenAPI } from '@/services/api/heygen';
import { propGuardAPI } from '@/config/api';

export const HeyGenTestPage: React.FC = () => {
  const [testText, setTestText] = useState('Hello! I\'m your PropGuard AI assistant. I can help you analyze properties and provide investment insights. How can I assist you today?');
  const [isGenerating, setIsGenerating] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [configStatus, setConfigStatus] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');

  useEffect(() => {
    runHealthChecks();
  }, []);

  const runHealthChecks = async () => {
    try {
      const [health, config] = await Promise.all([
        heyGenAPI.checkHealth(),
        heyGenAPI.getConfigStatus()
      ]);
      
      setHealthStatus(health);
      setConfigStatus(config);
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const testVideoGeneration = async () => {
    if (!testText.trim()) return;

    setIsGenerating(true);
    setTestResults(null);

    try {
      const startTime = Date.now();
      
      const response = await heyGenAPI.generateVideo({
        text: testText,
        voice: 'en_us_female_001'
      });

      const endTime = Date.now();
      const duration = endTime - startTime;

      setTestResults({
        success: response.success,
        video_url: response.video_url,
        task_id: response.task_id,
        error: response.error,
        duration,
        timestamp: new Date().toISOString()
      });

      if (response.success && response.video_url) {
        setVideoUrl(response.video_url);
      }

    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const testBackendAPI = async () => {
    try {
      const response = await propGuardAPI.generateAvatarVideo(testText);
      setTestResults({
        success: response.success,
        video_url: response.video_url,
        task_id: response.task_id,
        error: response.error,
        source: 'backend',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Backend API error',
        source: 'backend',
        timestamp: new Date().toISOString()
      });
    }
  };

  const clearResults = () => {
    setTestResults(null);
    setVideoUrl('');
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TestTube className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">HeyGen Integration Test</h1>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            {configStatus ? (
              <div className="flex items-center gap-2">
                {configStatus.configured ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm">
                  {configStatus.configured ? 'Configured' : 'Not Configured'}
                </span>
              </div>
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Health</CardTitle>
          </CardHeader>
          <CardContent>
            {healthStatus ? (
              <div className="flex items-center gap-2">
                {healthStatus.success ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <span className="text-sm">
                  {healthStatus.success ? 'Healthy' : 'Unhealthy'}
                </span>
              </div>
            ) : (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avatar ID</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {configStatus?.avatar_id || 'Not configured'}
            </code>
          </CardContent>
        </Card>
      </div>

      {/* Test Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Test Video Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="test-text">Test Text</Label>
            <Input
              id="test-text"
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              placeholder="Enter text for video generation..."
              className="w-full"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={testVideoGeneration}
              disabled={isGenerating || !testText.trim()}
              className="flex items-center gap-2"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Test HeyGen API
            </Button>

            <Button
              variant="outline"
              onClick={testBackendAPI}
              disabled={isGenerating || !testText.trim()}
              className="flex items-center gap-2"
            >
              <Video className="h-4 w-4" />
              Test Backend API
            </Button>

            <Button
              variant="outline"
              onClick={runHealthChecks}
              disabled={isGenerating}
            >
              Refresh Status
            </Button>

            <Button
              variant="destructive"
              onClick={clearResults}
              disabled={!testResults}
            >
              Clear Results
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      {testResults && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {testResults.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Test Results
              <Badge variant={testResults.success ? "default" : "destructive"}>
                {testResults.success ? "Success" : "Failed"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Status:</strong> {testResults.success ? 'Success' : 'Failed'}
              </div>
              <div>
                <strong>Source:</strong> {testResults.source || 'frontend'}
              </div>
              <div>
                <strong>Duration:</strong> {testResults.duration ? `${testResults.duration}ms` : 'N/A'}
              </div>
              <div>
                <strong>Timestamp:</strong> {new Date(testResults.timestamp).toLocaleString()}
              </div>
            </div>

            {testResults.task_id && (
              <div>
                <strong>Task ID:</strong> <code className="bg-muted px-2 py-1 rounded text-xs">{testResults.task_id}</code>
              </div>
            )}

            {testResults.video_url && (
              <div>
                <strong>Video URL:</strong>
                <div className="mt-2">
                  <video
                    src={testResults.video_url}
                    controls
                    className="w-full max-w-md rounded-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {testResults.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Error:</strong> {testResults.error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Video Avatar Component Test */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Video Avatar Component
          </CardTitle>
        </CardHeader>
        <CardContent>
          <VideoAvatar
            className="w-full"
            onVideoReady={(url) => {
              console.log('Video ready:', url);
              setVideoUrl(url);
            }}
            onError={(error) => {
              console.error('Video error:', error);
            }}
          />
        </CardContent>
      </Card>

      {/* Configuration Help */}
      {(!configStatus?.configured || !healthStatus?.success) && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Configuration Required:</strong> To use HeyGen features, you need to set the following environment variables:
            <ul className="mt-2 ml-4 list-disc text-sm">
              <li><code>VITE_HEYGEN_API_KEY</code> - Your HeyGen API key</li>
              <li><code>VITE_HEYGEN_AVATAR_ID</code> - Avatar ID (default: Marianne_CasualLook_public)</li>
            </ul>
            <p className="mt-2 text-sm">
              See <code>HEYGEN_INTEGRATION.md</code> for detailed setup instructions.
            </p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default HeyGenTestPage;

