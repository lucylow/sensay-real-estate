/**
 * Voice Selector Component for ElevenLabs Integration
 * Provides voice selection, settings customization, and preview functionality
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Play, Pause, Volume2, Settings, Mic, MicOff } from 'lucide-react';
import { elevenLabsService, ElevenLabsVoice } from '@/config/elevenlabs';
import { audioService } from '@/services/audioService';

interface VoiceSelectorProps {
  selectedVoiceId?: string;
  onVoiceChange?: (voiceId: string) => void;
  onSettingsChange?: (settings: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  }) => void;
  className?: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onVoiceChange,
  onSettingsChange,
  className = ''
}) => {
  const [voices, setVoices] = useState<ElevenLabsVoice[]>([]);
  const [models, setModels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfigured, setIsConfigured] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<ElevenLabsVoice | null>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    stability: 0.5,
    similarity_boost: 0.5,
    style: 0.0,
    use_speaker_boost: true
  });
  const [previewText, setPreviewText] = useState('Welcome to Sensay Real Estate. Your intelligent property analysis assistant is ready to help you make informed investment decisions.');
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    initializeService();
  }, []);

  useEffect(() => {
    if (selectedVoiceId && voices.length > 0) {
      const voice = voices.find(v => v.voice_id === selectedVoiceId);
      setSelectedVoice(voice || null);
    }
  }, [selectedVoiceId, voices]);

  useEffect(() => {
    if (selectedVoice) {
      onVoiceChange?.(selectedVoice.voice_id);
    }
  }, [selectedVoice, onVoiceChange]);

  useEffect(() => {
    onSettingsChange?.(voiceSettings);
  }, [voiceSettings, onSettingsChange]);

  const initializeService = async () => {
    setIsConfigured(elevenLabsService.isConfigured());
    
    if (elevenLabsService.isConfigured()) {
      setIsLoading(true);
      try {
        await elevenLabsService.initialize();
        setVoices(elevenLabsService.getVoices());
        setModels(elevenLabsService.getModels());
        
        // Load user info for character limits
        const info = await elevenLabsService.getUserInfo();
        setUserInfo(info);
      } catch (error) {
        console.error('Failed to initialize ElevenLabs service:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const handleVoiceSelect = (voiceId: string) => {
    const voice = voices.find(v => v.voice_id === voiceId);
    setSelectedVoice(voice || null);
    setSelectedVoiceId(voiceId);
  };

  const handlePreview = async () => {
    if (!selectedVoice || isPreviewPlaying) return;

    setIsPreviewPlaying(true);
    try {
      const audioUrl = await elevenLabsService.speak(
        previewText,
        selectedVoice.voice_id,
        voiceSettings
      );

      if (audioUrl) {
        audioService.addTrack({
          text: previewText,
          audioUrl,
          voiceId: selectedVoice.voice_id
        });

        // Listen for playback end
        const handleEnded = () => {
          setIsPreviewPlaying(false);
          audioService.off('ended', handleEnded);
        };
        audioService.on('ended', handleEnded);
      }
    } catch (error) {
      console.error('Preview playback failed:', error);
      setIsPreviewPlaying(false);
    }
  };

  const updateVoiceSetting = (key: keyof typeof voiceSettings, value: number | boolean) => {
    setVoiceSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (!isConfigured) {
    return (
      <Card className={className}>
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
          <div className="text-center py-8">
            <MicOff className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              ElevenLabs API key not configured
            </p>
            <p className="text-sm text-muted-foreground">
              Please set VITE_ELEVENLABS_API_KEY in your environment variables
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="h-5 w-5" />
            Voice Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading voices...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Settings
        </CardTitle>
        <CardDescription>
          Customize your AI assistant's voice and speech characteristics
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Voice Selection */}
        <div className="space-y-2">
          <Label htmlFor="voice-select">Voice</Label>
          <Select value={selectedVoice?.voice_id || ''} onValueChange={handleVoiceSelect}>
            <SelectTrigger id="voice-select">
              <SelectValue placeholder="Select a voice" />
            </SelectTrigger>
            <SelectContent>
              {voices.map((voice) => (
                <SelectItem key={voice.voice_id} value={voice.voice_id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{voice.name}</span>
                    {voice.category && (
                      <Badge variant="secondary" className="ml-2">
                        {voice.category}
                      </Badge>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {selectedVoice && (
            <div className="text-sm text-muted-foreground">
              {selectedVoice.description && (
                <p className="mb-1">{selectedVoice.description}</p>
              )}
              <div className="flex gap-2 flex-wrap">
                {selectedVoice.labels && Object.entries(selectedVoice.labels).map(([key, value]) => (
                  <Badge key={key} variant="outline" className="text-xs">
                    {key}: {value}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Voice Settings */}
        {selectedVoice && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Voice Settings</Label>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Stability */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="stability">Stability</Label>
                <span className="text-sm text-muted-foreground">
                  {voiceSettings.stability.toFixed(2)}
                </span>
              </div>
              <Slider
                id="stability"
                min={0}
                max={1}
                step={0.01}
                value={[voiceSettings.stability]}
                onValueChange={([value]) => updateVoiceSetting('stability', value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls voice consistency. Higher values = more stable, lower values = more variable.
              </p>
            </div>

            {/* Similarity Boost */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="similarity">Similarity Boost</Label>
                <span className="text-sm text-muted-foreground">
                  {voiceSettings.similarity_boost.toFixed(2)}
                </span>
              </div>
              <Slider
                id="similarity"
                min={0}
                max={1}
                step={0.01}
                value={[voiceSettings.similarity_boost]}
                onValueChange={([value]) => updateVoiceSetting('similarity_boost', value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls how closely the generated voice matches the original voice.
              </p>
            </div>

            {/* Style */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="style">Style</Label>
                <span className="text-sm text-muted-foreground">
                  {voiceSettings.style?.toFixed(2) || '0.00'}
                </span>
              </div>
              <Slider
                id="style"
                min={0}
                max={1}
                step={0.01}
                value={[voiceSettings.style || 0]}
                onValueChange={([value]) => updateVoiceSetting('style', value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Controls the style and emotion of the voice. Higher values = more expressive.
              </p>
            </div>

            {/* Speaker Boost */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="speaker-boost">Speaker Boost</Label>
                <p className="text-xs text-muted-foreground">
                  Enhances the original voice characteristics
                </p>
              </div>
              <Switch
                id="speaker-boost"
                checked={voiceSettings.use_speaker_boost}
                onCheckedChange={(checked) => updateVoiceSetting('use_speaker_boost', checked)}
              />
            </div>
          </div>
        )}

        <Separator />

        {/* Preview Section */}
        {selectedVoice && (
          <div className="space-y-4">
            <Label className="text-base font-medium">Preview</Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="preview-text">Preview Text</Label>
                <textarea
                  id="preview-text"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="w-full mt-1 p-3 border rounded-md resize-none"
                  rows={3}
                  placeholder="Enter text to preview the voice..."
                />
              </div>
              <Button
                onClick={handlePreview}
                disabled={isPreviewPlaying || !previewText.trim()}
                className="w-full"
                variant="outline"
              >
                {isPreviewPlaying ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Preview Voice
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* User Info */}
        {userInfo && (
          <>
            <Separator />
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Characters used:</span>
                <span>{userInfo.character_count?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Character limit:</span>
                <span>{userInfo.character_limit?.toLocaleString() || 'Unlimited'}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceSelector;
