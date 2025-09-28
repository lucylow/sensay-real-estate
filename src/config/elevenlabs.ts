/**
 * Eleven Labs API Configuration and Service
 * Provides text-to-speech functionality for PropGuard AI's Alex persona
 */

export interface ElevenLabsConfig {
  apiKey: string;
  baseUrl: string;
  defaultVoiceId: string;
}

export interface ElevenLabsVoiceRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
  voice_settings?: {
    stability: number;
    similarity_boost: number;
    style?: number;
    use_speaker_boost?: boolean;
  };
}

export interface ElevenLabsVoiceResponse {
  success: boolean;
  audio_url?: string;
  audio_data?: ArrayBuffer;
  error?: string;
  voice_id?: string;
  duration?: number;
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
      apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY || localStorage.getItem('elevenlabs_api_key') || '',
      baseUrl: 'https://api.elevenlabs.io/v1',
      defaultVoiceId: import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'alex-professional-australian'
    };
  }

  /**
   * Update API key dynamically
   */
  updateApiKey(apiKey: string) {
    this.config.apiKey = apiKey;
    localStorage.setItem('elevenlabs_api_key', apiKey);
  }

  /**
   * Check if Eleven Labs is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.apiKey !== '');
  }

  /**
   * Get available voices
   */
  async getAvailableVoices(): Promise<ElevenLabsVoice[]> {
    if (!this.isConfigured()) {
      return [];
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/voices`, {
        headers: {
          'xi-api-key': this.config.apiKey,
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch voices:', response.statusText);
        return [];
      }

      const data = await response.json();
      return data.voices || [];
    } catch (error) {
      console.error('Eleven Labs voices error:', error);
      return [];
    }
  }

  /**
   * Generate speech from text using Alex persona
   */
  async generateSpeech(
    text: string, 
    voiceId?: string,
    options?: Partial<ElevenLabsVoiceRequest>
  ): Promise<ElevenLabsVoiceResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'Eleven Labs API not configured. Please set VITE_ELEVENLABS_API_KEY environment variable.'
      };
    }

    try {
      const requestBody: ElevenLabsVoiceRequest = {
        text,
        voice_id: voiceId || this.config.defaultVoiceId,
        model_id: options?.model_id || 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.85,
          style: 0.25,
          use_speaker_boost: true,
          ...options?.voice_settings
        }
      };

      const response = await fetch(
        `${this.config.baseUrl}/text-to-speech/${requestBody.voice_id}`,
        {
          method: 'POST',
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': this.config.apiKey,
          },
          body: JSON.stringify(requestBody)
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        return {
          success: false,
          error: `Eleven Labs API error: ${response.status} - ${errorText}`
        };
      }

      const audioData = await response.arrayBuffer();
      const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);

      return {
        success: true,
        audio_url: audioUrl,
        audio_data: audioData,
        voice_id: requestBody.voice_id,
        duration: audioData.byteLength / 16000 // Rough estimate
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
      voice_settings: {
        stability: 0.8,        // More stable for professional tone
        similarity_boost: 0.9, // Higher similarity for consistent persona
        style: 0.2,           // Subtle style for professional delivery
        use_speaker_boost: true
      }
    });
  }

  /**
   * Get voice by name (case-insensitive)
   */
  async getVoiceByName(name: string): Promise<ElevenLabsVoice | null> {
    const voices = await this.getAvailableVoices();
    return voices.find(voice => 
      voice.name.toLowerCase().includes(name.toLowerCase())
    ) || null;
  }

  /**
   * Get configuration status
   */
  getConfigStatus(): { configured: boolean; missing: string[] } {
    const missing: string[] = [];
    
    if (!this.config.apiKey) missing.push('VITE_ELEVENLABS_API_KEY');
    
    return {
      configured: missing.length === 0,
      missing
    };
  }

  /**
   * Create audio element and play speech
   */
  async playSpeech(audioUrl: string): Promise<void> {
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
  async speak(text: string, voiceId?: string): Promise<void> {
    const result = await this.generateSpeech(text, voiceId);
    
    if (result.success && result.audio_url) {
      await this.playSpeech(result.audio_url);
    } else {
      throw new Error(result.error || 'Speech generation failed');
    }
  }
}

// Export singleton instance
export const elevenLabsService = new ElevenLabsService();