/**
 * Eleven Labs API Configuration and Service
 * Uses Supabase Edge Functions for secure API key management
 */

import { supabaseAPIService, type SupabaseElevenLabsRequest, type SupabaseElevenLabsResponse } from '@/services/supabaseAPI';

export interface ElevenLabsConfig {
  baseUrl: string;
  defaultVoiceId: string;
}

export interface ElevenLabsVoiceRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
  persona?: 'alex' | 'default';
}

export interface ElevenLabsVoiceResponse {
  success: boolean;
  audio_url?: string;
  error?: string;
  voice_id?: string;
  persona?: string;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  samples?: Record<string, unknown>[];
  category: string;
  fine_tuning?: Record<string, unknown>;
  labels?: Record<string, string>;
  description?: string;
  preview_url?: string;
  available_for_tiers?: string[];
  settings?: Record<string, unknown>;
  sharing?: Record<string, unknown>;
  high_quality_base_model_ids?: string[];
  safety_control?: Record<string, unknown>;
  permission_on_resource?: Record<string, unknown>;
}

export class ElevenLabsService {
  private config: ElevenLabsConfig;

  constructor() {
    this.config = {
      baseUrl: 'https://api.elevenlabs.io/v1',
      defaultVoiceId: 'alex-professional-australian'
    };
  }

  /**
   * Check if Eleven Labs is properly configured through Supabase
   */
  async isConfigured(): Promise<boolean> {
    try {
      const config = await supabaseAPIService.checkAPIConfiguration();
      return config.elevenlabs;
    } catch (error) {
      console.error('Error checking ElevenLabs configuration:', error);
      return false;
    }
  }

  /**
   * Get available voices (returns empty array as Supabase handles this)
   */
  async getAvailableVoices(): Promise<ElevenLabsVoice[]> {
    // Supabase handles voice management, return empty array
    return [];
  }

  /**
   * Generate speech from text using Supabase Edge Function
   */
  async generateSpeech(
    text: string, 
    voiceId?: string,
    options?: Partial<ElevenLabsVoiceRequest>
  ): Promise<ElevenLabsVoiceResponse> {
    try {
      const request: SupabaseElevenLabsRequest = {
        text,
        voice_id: voiceId || this.config.defaultVoiceId,
        model_id: options?.model_id || 'eleven_multilingual_v2',
        persona: options?.persona || 'alex'
      };

      const result = await supabaseAPIService.generateSpeech(request);
      
      if (result.success && result.audio_data) {
        const audioUrl = supabaseAPIService.createAudioBlob(result.audio_data);
        return {
          success: true,
          audio_url: audioUrl,
          voice_id: result.voice_id,
          persona: result.persona
        };
      }

      return {
        success: false,
        error: result.error || 'Speech generation failed'
      };
    } catch (error) {
      console.error('Eleven Labs TTS error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Generate speech for Alex persona with optimized settings
   */
  async generateAlexSpeech(text: string): Promise<ElevenLabsVoiceResponse> {
    return this.generateSpeech(text, this.config.defaultVoiceId, {
      persona: 'alex'
    });
  }

  /**
   * Get voice by name (returns null as Supabase handles this)
   */
  async getVoiceByName(name: string): Promise<ElevenLabsVoice | null> {
    // Supabase handles voice management
    return null;
  }

  /**
   * Get configuration status
   */
  async getConfigStatus(): Promise<{ configured: boolean; missing: string[] }> {
    try {
      const config = await supabaseAPIService.checkAPIConfiguration();
      return {
        configured: config.elevenlabs,
        missing: config.elevenlabs ? [] : ['ELEVENLABS_API_KEY in Supabase']
      };
    } catch (error) {
      return {
        configured: false,
        missing: ['ELEVENLABS_API_KEY in Supabase']
      };
    }
  }

  /**
   * Create audio element and play speech
   */
  async playSpeech(audioUrl: string): Promise<void> {
    return supabaseAPIService.playAudio(audioUrl);
  }

  /**
   * Generate and play speech in one call
   */
  async speak(text: string, voiceId?: string): Promise<void> {
    return supabaseAPIService.speak(text, 'alex');
  }
}

// Export singleton instance
export const elevenLabsService = new ElevenLabsService();