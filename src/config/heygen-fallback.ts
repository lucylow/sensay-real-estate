/**
 * HeyGen Fallback Configuration
 * Alternative implementation for cases where Supabase Edge Functions are not easily accessible
 */
import { ENV } from '@/config/environment';

export interface HeyGenConfig {
  avatarId: string;
  apiKey?: string;
  baseUrl: string;
}

export class HeyGenServiceFallback {
  private config: HeyGenConfig;

  constructor() {
    this.config = {
      avatarId: import.meta.env.VITE_HEYGEN_AVATAR_ID || 'Marianne_CasualLook_public',
      apiKey: import.meta.env.VITE_HEYGEN_API_KEY,
      baseUrl: 'https://api.heygen.com/v1'
    };
  }

  /**
   * Generate avatar video using direct HeyGen API
   */
  async generateAvatarVideo(text: string, voice: string = 'en_us_female_001'): Promise<{
    success: boolean;
    video_url?: string;
    task_id?: string;
    error?: string;
  }> {
    try {
      if (!this.config.apiKey) {
        return {
          success: false,
          error: 'HeyGen API key not provided. Please set VITE_HEYGEN_API_KEY in your .env file.'
        };
      }

      console.log('Generating HeyGen video directly:', { 
        text: text.substring(0, 50) + '...', 
        voice, 
        avatar_id: this.config.avatarId 
      });

      const response = await fetch(`${this.config.baseUrl}/video/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice,
          avatar_id: this.config.avatarId,
          quality: 'high',
          ratio: '16:9'
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('HeyGen API error:', response.status, errorText);
        
        return {
          success: false,
          error: `HeyGen API error: ${response.status} - ${errorText}`
        };
      }

      const data = await response.json();
      console.log('HeyGen response:', { task_id: data.task_id, status: data.status });

      return {
        success: true,
        video_url: data.video_url,
        task_id: data.task_id
      };

    } catch (error) {
      console.error('HeyGen Avatar Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Check if service is configured
   */
  async isConfigurated(): Promise<boolean> {
    return !!this.config.apiKey;
  }

  /**
   * Get configuration status
   */
  async getConfigStatus(): Promise<{ configured: boolean; missing: string[] }> {
    return {
      configured: !!this.config.apiKey,
      missing: this.config.apiKey ? [] : ['VITE_HEYGEN_API_KEY in .env file']
    };
  }

  /**
   * Health check
   */
  async checkHealth(): Promise<{ status: string; message: string }> {
    const isConfigurated = await this.isConfigurated();
    
    if (!isConfigurated) {
      return {
        status: 'error',
        message: 'HeyGen API not configured. Please add VITE_HEYGEN_API_KEY to your .env file.'
      };
    }

    try {
      // Try a simple test call
      const result = await this.generateAvatarVideo('Test', 'en_us_female_001');
      
      return {
        status: result.success ? 'healthy' : 'error',
        message: result.success ? 'HeyGen API connected successfully!' : result.error || 'Unknown error'
      };
    } catch (error) {
      return {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
}

// Export singleton instance
export const heyGenServiceFallback = new HeyGenServiceFallback();
