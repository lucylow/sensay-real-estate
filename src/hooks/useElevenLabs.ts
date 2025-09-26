/**
 * Custom hook for ElevenLabs integration
 * Provides voice management, settings, and audio controls
 */

import { useState, useEffect, useCallback } from 'react';
import { elevenLabsService } from '@/config/elevenlabs';
import { audioService } from '@/services/audioService';

export interface VoiceSettings {
  stability: number;
  similarity_boost: number;
  style?: number;
  use_speaker_boost?: boolean;
}

export interface UseElevenLabsReturn {
  // Configuration state
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Voice data
  voices: any[];
  selectedVoiceId: string;
  voiceSettings: VoiceSettings;
  
  // Audio state
  isPlaying: boolean;
  currentTrack: any;
  queue: any;
  
  // Actions
  setSelectedVoice: (voiceId: string) => void;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  speak: (text: string, voiceId?: string) => Promise<string | null>;
  togglePlayback: () => void;
  stopPlayback: () => void;
  clearQueue: () => void;
  
  // Utility
  refreshVoices: () => Promise<void>;
  getUserInfo: () => Promise<any>;
}

export const useElevenLabs = (): UseElevenLabsReturn => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voices, setVoices] = useState<any[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    stability: 0.5,
    similarity_boost: 0.5,
    style: 0.0,
    use_speaker_boost: true
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [queue, setQueue] = useState<any>(null);

  // Initialize service
  useEffect(() => {
    initializeService();
  }, []);

  // Listen to audio service changes
  useEffect(() => {
    const updateAudioState = () => {
      const audioQueue = audioService.getQueue();
      setQueue(audioQueue);
      setIsPlaying(audioQueue.isPlaying);
      setCurrentTrack(audioService.getCurrentTrack());
    };

    // Initial state
    updateAudioState();

    // Listen to audio events
    audioService.on('play', updateAudioState);
    audioService.on('pause', updateAudioState);
    audioService.on('ended', updateAudioState);
    audioService.on('stop', updateAudioState);
    audioService.on('trackAdded', updateAudioState);
    audioService.on('trackRemoved', updateAudioState);
    audioService.on('queueCleared', updateAudioState);

    return () => {
      audioService.off('play', updateAudioState);
      audioService.off('pause', updateAudioState);
      audioService.off('ended', updateAudioState);
      audioService.off('stop', updateAudioState);
      audioService.off('trackAdded', updateAudioState);
      audioService.off('trackRemoved', updateAudioState);
      audioService.off('queueCleared', updateAudioState);
    };
  }, []);

  const initializeService = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const configured = elevenLabsService.isConfigured();
      setIsConfigured(configured);
      
      if (configured) {
        await elevenLabsService.initialize();
        const voiceList = elevenLabsService.getVoices();
        setVoices(voiceList);
        
        if (voiceList.length > 0) {
          setSelectedVoiceId(voiceList[0].voice_id);
        }
      }
    } catch (error) {
      console.error('Failed to initialize ElevenLabs service:', error);
      setError(error instanceof Error ? error.message : 'Failed to initialize ElevenLabs service');
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedVoice = useCallback((voiceId: string) => {
    setSelectedVoiceId(voiceId);
    
    // Load voice settings if available
    elevenLabsService.getVoiceSettings(voiceId).then(settings => {
      if (settings) {
        setVoiceSettings(prev => ({
          ...prev,
          ...settings
        }));
      }
    }).catch(console.error);
  }, []);

  const updateVoiceSettings = useCallback((settings: Partial<VoiceSettings>) => {
    setVoiceSettings(prev => ({
      ...prev,
      ...settings
    }));

    // Update settings on ElevenLabs if voice is selected
    if (selectedVoiceId) {
      elevenLabsService.updateVoiceSettings(selectedVoiceId, {
        ...voiceSettings,
        ...settings
      }).catch(console.error);
    }
  }, [selectedVoiceId, voiceSettings]);

  const speak = useCallback(async (text: string, voiceId?: string): Promise<string | null> => {
    if (!isConfigured || !text.trim()) {
      return null;
    }

    try {
      const audioUrl = await elevenLabsService.speak(
        text,
        voiceId || selectedVoiceId,
        voiceSettings
      );

      if (audioUrl) {
        // Add to audio queue
        audioService.addTrack({
          text,
          audioUrl,
          voiceId: voiceId || selectedVoiceId
        });
      }

      return audioUrl;
    } catch (error) {
      console.error('Speech synthesis failed:', error);
      return null;
    }
  }, [isConfigured, selectedVoiceId, voiceSettings]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      audioService.pause();
    } else {
      audioService.play();
    }
  }, [isPlaying]);

  const stopPlayback = useCallback(() => {
    audioService.stop();
  }, []);

  const clearQueue = useCallback(() => {
    audioService.clearQueue();
  }, []);

  const refreshVoices = useCallback(async (): Promise<void> => {
    if (!isConfigured) return;
    
    try {
      const voiceList = await elevenLabsService.fetchVoices();
      setVoices(voiceList);
    } catch (error) {
      console.error('Failed to refresh voices:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh voices');
    }
  }, [isConfigured]);

  const getUserInfo = useCallback(async (): Promise<any> => {
    if (!isConfigured) return null;
    
    try {
      return await elevenLabsService.getUserInfo();
    } catch (error) {
      console.error('Failed to get user info:', error);
      return null;
    }
  }, [isConfigured]);

  return {
    // Configuration state
    isConfigured,
    isLoading,
    error,
    
    // Voice data
    voices,
    selectedVoiceId,
    voiceSettings,
    
    // Audio state
    isPlaying,
    currentTrack,
    queue,
    
    // Actions
    setSelectedVoice,
    updateVoiceSettings,
    speak,
    togglePlayback,
    stopPlayback,
    clearQueue,
    
    // Utility
    refreshVoices,
    getUserInfo
  };
};

export default useElevenLabs;

