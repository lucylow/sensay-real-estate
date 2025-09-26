/**
 * Voice Settings Page - Comprehensive ElevenLabs Integration
 * Combines voice selection, cloning, and audio controls
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mic, 
  Settings, 
  Volume2, 
  Users, 
  Play, 
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';
import VoiceSelector from './VoiceSelector';
import AudioPlayer from './AudioPlayer';
import VoiceCloner from './VoiceCloner';
import { elevenLabsService } from '@/config/elevenlabs';

interface VoiceSettingsPageProps {
  className?: string;
  onVoiceChange?: (voiceId: string) => void;
  onSettingsChange?: (settings: any) => void;
}

export const VoiceSettingsPage: React.FC<VoiceSettingsPageProps> = ({
  className = '',
  onVoiceChange,
  onSettingsChange
}) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeService();
  }, []);

  const initializeService = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const configured = elevenLabsService.isConfigured();
      setIsConfigured(configured);
      
      if (configured) {
        await elevenLabsService.initialize();
        const [userData, voiceList] = await Promise.all([
          elevenLabsService.getUserInfo(),
          elevenLabsService.fetchVoices()
        ]);
        
        setUserInfo(userData);
        setVoices(voiceList);
      }
    } catch (error) {
      console.error('Failed to initialize ElevenLabs service:', error);
      setError('Failed to connect to ElevenLabs API. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceCreated = (voiceId: string) => {
    // Refresh voices list
    elevenLabsService.fetchVoices().then(setVoices);
    onVoiceChange?.(voiceId);
  };

  if (isLoading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading voice settings...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Settings
            </CardTitle>
            <CardDescription>
              ElevenLabs API integration for text-to-speech
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>ElevenLabs API not configured</strong>
                <br />
                Please set VITE_ELEVENLABS_API_KEY in your environment variables to enable voice features.
              </AlertDescription>
            </Alert>
            
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Sign up for an ElevenLabs account at elevenlabs.io</li>
                <li>Get your API key from the ElevenLabs dashboard</li>
                <li>Add VITE_ELEVENLABS_API_KEY to your .env file</li>
                <li>Restart your development server</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5" />
              Voice Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={initializeService} className="mt-4">
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5" />
                Voice Settings
              </CardTitle>
              <CardDescription>
                Configure ElevenLabs text-to-speech and voice cloning
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {userInfo && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Characters Used:</span>
                <span className="font-medium">
                  {userInfo.character_count?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Character Limit:</span>
                <span className="font-medium">
                  {userInfo.character_limit?.toLocaleString() || 'Unlimited'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Available Voices:</span>
                <span className="font-medium">{voices.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Can Extend Limit:</span>
                <span className="font-medium">
                  {userInfo.can_extend_character_limit ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Settings Tabs */}
      <Tabs defaultValue="voices" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="voices" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Voice Selection
          </TabsTrigger>
          <TabsTrigger value="cloning" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Voice Cloning
          </TabsTrigger>
          <TabsTrigger value="audio" className="flex items-center gap-2">
            <Volume2 className="h-4 w-4" />
            Audio Player
          </TabsTrigger>
        </TabsList>

        <TabsContent value="voices" className="space-y-4">
          <VoiceSelector
            onVoiceChange={onVoiceChange}
            onSettingsChange={onSettingsChange}
          />
        </TabsContent>

        <TabsContent value="cloning" className="space-y-4">
          <VoiceCloner onVoiceCreated={handleVoiceCreated} />
        </TabsContent>

        <TabsContent value="audio" className="space-y-4">
          <AudioPlayer showQueue={true} />
          
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              The audio player manages all generated speech from your AI assistant. 
              You can control playback, adjust volume, and manage the audio queue here.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => {
                const previewText = "Welcome to Sensay Real Estate. Your intelligent property analysis assistant is ready to help you make informed investment decisions.";
                elevenLabsService.speak(previewText).then(audioUrl => {
                  if (audioUrl) {
                    audioService.addTrack({
                      text: previewText,
                      audioUrl,
                      voiceId: 'default'
                    });
                  }
                });
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Play className="h-5 w-5" />
              <span className="text-sm">Test Voice</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                audioService.clearQueue();
              }}
              className="h-auto p-4 flex flex-col items-center gap-2"
            >
              <Volume2 className="h-5 w-5" />
              <span className="text-sm">Clear Audio Queue</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceSettingsPage;

