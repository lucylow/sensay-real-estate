/**
 * Supabase API Service
 * Handles API calls through Supabase Edge Functions for secure API key management
 */

import { supabase } from '@/integrations/supabase/client';
import { ENV } from '@/config/environment';

export interface SupabaseElevenLabsRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
  persona?: 'alex' | 'default';
}

export interface SupabaseElevenLabsResponse {
  success: boolean;
  audio_data?: string;
  error?: string;
  voice_id?: string;
  persona?: string;
}

export interface SupabaseHeyGenRequest {
  text: string;
  voice?: string;
  avatar_id?: string;
}

export interface SupabaseHeyGenResponse {
  success: boolean;
  video_url?: string;
  task_id?: string;
  error?: string;
}

export class SupabaseAPIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${ENV.SUPABASE_URL}/functions/v1`;
  }

  /**
   * Generate speech using ElevenLabs through Supabase function
   */
  async generateSpeech(request: SupabaseElevenLabsRequest): Promise<SupabaseElevenLabsResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/elevenlabs-tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
          'apikey': ENV.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Supabase ElevenLabs API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Generate avatar video using HeyGen through Supabase function
   */
  async generateAvatarVideo(request: SupabaseHeyGenRequest): Promise<SupabaseHeyGenResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/heygen-avatar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ENV.SUPABASE_ANON_KEY}`,
          'apikey': ENV.SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.error || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Supabase HeyGen API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Check if APIs are configured in Supabase
   */
  async checkAPIConfiguration(): Promise<{
    elevenlabs: boolean;
    heygen: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];
    let elevenlabsConfigured = false;
    let heygenConfigured = false;

    // Test ElevenLabs configuration with a simple request
    try {
      const elevenlabsResponse = await this.generateSpeech({
        text: 'test',
        persona: 'alex'
      });
      
      if (elevenlabsResponse.success) {
        elevenlabsConfigured = true;
      } else {
        errors.push(`ElevenLabs: ${elevenlabsResponse.error}`);
      }
    } catch (error) {
      errors.push(`ElevenLabs: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Test HeyGen configuration with a simple request
    try {
      const heygenResponse = await this.generateAvatarVideo({
        text: 'test'
      });
      
      if (heygenResponse.success) {
        heygenConfigured = true;
      } else {
        errors.push(`HeyGen: ${heygenResponse.error}`);
      }
    } catch (error) {
      errors.push(`HeyGen: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      elevenlabs: elevenlabsConfigured,
      heygen: heygenConfigured,
      errors
    };
  }

  /**
   * Convert base64 audio data to blob URL
   */
  createAudioBlob(audioData: string): string {
    try {
      const binaryString = atob(audioData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'audio/mpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error creating audio blob:', error);
      throw new Error('Failed to create audio blob from base64 data');
    }
  }

  /**
   * Play audio from blob URL
   */
  async playAudio(audioUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl); // Clean up
        resolve();
      };
      
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl); // Clean up
        reject(new Error('Audio playback failed'));
      };
      
      audio.play().catch(reject);
    });
  }

  /**
   * Generate and play speech in one call
   */
  async speak(text: string, persona: 'alex' | 'default' = 'alex'): Promise<void> {
    const result = await this.generateSpeech({ text, persona });
    
    if (result.success && result.audio_data) {
      const audioUrl = this.createAudioBlob(result.audio_data);
      await this.playAudio(audioUrl);
    } else {
      throw new Error(result.error || 'Speech generation failed');
    }
  }
}

// Export singleton instance
export const supabaseAPIService = new SupabaseAPIService();
