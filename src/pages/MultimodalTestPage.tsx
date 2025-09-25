import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Volume2, 
  Play, 
  Pause,
  Settings, 
  AlertCircle,
  CheckCircle,
  Loader2,
  TestTube,
  Bot,
  Mic,
  MicOff
} from 'lucide-react';
import { MultimodalAIAssistant } from '@/components/MultimodalAIAssistant';
import { elevenLabsService } from '@/config/elevenlabs';
import { heyGenService } from '@/config/heygen';
import { propGuardAPI } from '@/config/api';

export const MultimodalTestPage: React.FC = () => {
  const [testText, setTestText] = useState('Hello! I\'m Alex, your AI-powered real estate expert. I can help you analyze properties, understand market trends, and provide investment insights. How can I assist you today?');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [testResults, setTestResults] = useState<any>(null);
  const [healthStatus, setHealthStatus] = useState<any>(null);
  const [configStatus, setConfigStatus] = useState<any>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  useEffect(() => {
    runHealthChecks();
    loadVoices();
  }, []);

  const runHealthChecks = async () => {
    try {
      const [heygenHealth, elevenlabsHealth, heygenConfig, elevenlabsConfig] = await Promise.all([
        propGuardAPI.checkHeyGenHealth(),
        propGuardAPI.checkElevenLabsHealth(),
        propGuardAPI.getHeyGenConfig(),
        propGuardAPI.getElevenLabsConfig()
      ]);
      
      setHealthStatus({
        heygen: heygenHealth,
        elevenlabs: elevenlabsHealth
      });
      
      setConfigStatus({
        heygen: heygenConfig,
        elevenlabs: elevenlabsConfig
      });
    } catch (error) {
      console.error('Health check failed:', error);
    }
  };

  const loadVoices = async () => {
    try {
      const response = await propGuardAPI.getAvailableVoices();
      if (response.success) {
        setVoices(response.voices || []);
        if (response.voices && response.voices.length > 0) {
          setSelectedVoice(response.voices[0].voice_id);
        }
      }
    } catch (error) {
      console.error('Failed to load voices:', error);
    }
  };

  const testAudioGeneration = async () => {
    if (!testText.trim()) return;

    setIsGeneratingAudio(true);
    setTestResults(null);

    try {
      const startTime = Date.now();
      
      const response = await propGuardAPI.generateAlexSpeech(testText);
      const endTime = Date.now();
      const duration = endTime - startTime;

      setTestResults({
        success: response.success,
        audio_data: response.audio_data,
        error: response.error,
        duration,
        timestamp: new Date().toISOString(),
        type: 'audio'
      });

      if (response.success && response.audio_data) {
        // Convert base64 to blob URL
        const audioBlob = new Blob([
          Uint8Array.from(atob(response.audio_data), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      }

    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        type: 'audio'
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const testVideoGeneration = async () => {
    if (!testText.trim()) return;

    setIsGeneratingVideo(true);
    setTestResults(null);

    try {
      const startTime = Date.now();
      
      const response = await propGuardAPI.generateAvatarVideo(testText);
      const endTime = Date.now();
      const duration = endTime - startTime;

      setTestResults({
        success: response.success,
        video_url: response.video_url,
        task_id: response.task_id,
        error: response.error,
        duration,
        timestamp: new Date().toISOString(),
        type: 'video'
      });

      if (response.success && response.video_url) {
        setVideoUrl(response.video_url);
      }

    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        type: 'video'
      });
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const testMultimodalGeneration = async () => {
    if (!testText.trim()) return;

    setIsGeneratingAudio(true);
    setIsGeneratingVideo(true);
    setTestResults(null);

    try {
      const startTime = Date.now();
      
      const [audioResponse, videoResponse] = await Promise.allSettled([
        propGuardAPI.generateAlexSpeech(testText),
        propGuardAPI.generateAvatarVideo(testText)
      ]);
      
      const endTime = Date.now();
      const duration = endTime - startTime;

      const results = {
        success: true,
        audio: audioResponse.status === 'fulfilled' ? audioResponse.value : null,
        video: videoResponse.status === 'fulfilled' ? videoResponse.value : null,
        duration,
        timestamp: new Date().toISOString(),
        type: 'multimodal'
      };

      setTestResults(results);

      // Set audio URL if successful
      if (audioResponse.status === 'fulfilled' && audioResponse.value.success && audioResponse.value.audio_data) {
        const audioBlob = new Blob([
          Uint8Array.from(atob(audioResponse.value.audio_data), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      }

      // Set video URL if successful
      if (videoResponse.status === 'fulfilled' && videoResponse.value.success && videoResponse.value.video_url) {
        setVideoUrl(videoResponse.value.video_url);
      }

    } catch (error) {
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        type: 'multimodal'
      });
    } finally {
      setIsGeneratingAudio(false);
      setIsGeneratingVideo(false);
    }
  };

  const playAudio = async () => {
    if (!audioUrl) return;
    
    try {
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlayingAudio(false);
      audio.onerror = () => setIsPlayingAudio(false);
      
      setIsPlayingAudio(true);
      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlayingAudio(false);
    }
  };

  const stopAudio = () => {
    setIsPlayingAudio(false);
    // Note: In a real implementation, you'd want to actually stop the audio
  };

  const clearResults = () => {
    setTestResults(null);
    setAudioUrl('');
    setVideoUrl('');
  };

  const isConfigured = configStatus?.heygen?.configured && configStatus?.elevenlabs?.configured;
  const isHealthy = healthStatus?.heygen?.success && healthStatus?.elevenlabs?.success;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <TestTube className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Multimodal AI Integration Test</h1>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">HeyGen Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {healthStatus?.heygen?.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {healthStatus?.heygen?.success ? 'Healthy' : 'Unhealthy'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Eleven Labs Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {healthStatus?.elevenlabs?.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {healthStatus?.elevenlabs?.success ? 'Healthy' : 'Unhealthy'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {isConfigured ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {isConfigured ? 'Configured' : 'Not Configured'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {isHealthy && isConfigured ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <span className="text-sm">
                {isHealthy && isConfigured ? 'Ready' : 'Not Ready'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="multimodal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="multimodal">Multimodal Assistant</TabsTrigger>
          <TabsTrigger value="testing">API Testing</TabsTrigger>
          <TabsTrigger value="audio">Audio Only</TabsTrigger>
          <TabsTrigger value="video">Video Only</TabsTrigger>
        </TabsList>

        <TabsContent value="multimodal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Alex - Multimodal AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MultimodalAIAssistant
                className="w-full"
                persona="alex"
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Testing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-text">Test Text</Label>
                <Input
                  id="test-text"
                  value={testText}
                  onChange={(e) => setTestText(e.target.value)}
                  placeholder="Enter text for multimodal generation..."
                  className="w-full"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={testMultimodalGeneration}
                  disabled={isGeneratingAudio || isGeneratingVideo || !testText.trim()}
                  className="flex items-center gap-2"
                >
                  {(isGeneratingAudio || isGeneratingVideo) ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  Test Multimodal
                </Button>

                <Button
                  variant="outline"
                  onClick={testAudioGeneration}
                  disabled={isGeneratingAudio || !testText.trim()}
                  className="flex items-center gap-2"
                >
                  {isGeneratingAudio ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                  Test Audio Only
                </Button>

                <Button
                  variant="outline"
                  onClick={testVideoGeneration}
                  disabled={isGeneratingVideo || !testText.trim()}
                  className="flex items-center gap-2"
                >
                  {isGeneratingVideo ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                  Test Video Only
                </Button>

                <Button
                  variant="outline"
                  onClick={runHealthChecks}
                  disabled={isGeneratingAudio || isGeneratingVideo}
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
                    <strong>Type:</strong> {testResults.type}
                  </div>
                  <div>
                    <strong>Duration:</strong> {testResults.duration ? `${testResults.duration}ms` : 'N/A'}
                  </div>
                  <div>
                    <strong>Timestamp:</strong> {new Date(testResults.timestamp).toLocaleString()}
                  </div>
                  <div>
                    <strong>Success:</strong> {testResults.success ? 'Yes' : 'No'}
                  </div>
                </div>

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
        </TabsContent>

        <TabsContent value="audio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Playback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {audioUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                    <Button
                      onClick={isPlayingAudio ? stopAudio : playAudio}
                      className="flex items-center gap-2"
                    >
                      {isPlayingAudio ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                      {isPlayingAudio ? 'Pause' : 'Play'} Alex's Voice
                    </Button>
                    
                    <div className="text-sm text-muted-foreground">
                      Alex speaking
                    </div>
                  </div>
                  
                  <audio controls src={audioUrl} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No audio generated yet. Run a test to generate audio.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                Video Playback
              </CardTitle>
            </CardHeader>
            <CardContent>
              {videoUrl ? (
                <video
                  src={videoUrl}
                  controls
                  className="w-full rounded-lg"
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No video generated yet. Run a test to generate video.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Configuration Help */}
      {!isConfigured && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Configuration Required:</strong> To use multimodal features, you need to set the following environment variables:
            <ul className="mt-2 ml-4 list-disc text-sm">
              <li><code>VITE_HEYGEN_API_KEY</code> - Your HeyGen API key</li>
              <li><code>VITE_HEYGEN_AVATAR_ID</code> - Avatar ID (default: Marianne_CasualLook_public)</li>
              <li><code>VITE_ELEVENLABS_API_KEY</code> - Your Eleven Labs API key</li>
              <li><code>VITE_ELEVENLABS_VOICE_ID</code> - Voice ID for Alex persona</li>
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

export default MultimodalTestPage;
