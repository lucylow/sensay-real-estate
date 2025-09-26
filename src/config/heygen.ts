/**
 * HeyGen API Configuration and Service
 * Provides interactive avatar functionality for Sensay real estate
 */

export interface HeyGenConfig {
  apiKey: string;
  avatarId: string;
  baseUrl: string;
}

export interface HeyGenAvatarRequest {
  text: string;
  voice?: string;
  avatar_id?: string;
}

export interface HeyGenAvatarResponse {
  success: boolean;
  video_url?: string;
  error?: string;
  task_id?: string;
}

export class HeyGenService {
  private config: HeyGenConfig;

  constructor() {
    this.config = {
      apiKey: import.meta.env.VITE_HEYGEN_API_KEY || '',
      avatarId: import.meta.env.VITE_HEYGEN_AVATAR_ID || 'Marianne_CasualLook_public',
      baseUrl: 'https://api.heygen.com/v1'
    };
  }

  /**
   * Check if HeyGen is properly configured
   */
  isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.avatarId);
  }

  /**
   * Generate interactive avatar video
   */
  async generateAvatarVideo(text: string, voice?: string): Promise<HeyGenAvatarResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'HeyGen API not configured. Please set VITE_HEYGEN_API_KEY and VITE_HEYGEN_AVATAR_ID environment variables.'
      };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/video/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: voice || 'en_us_female_001',
          avatar_id: this.config.avatarId,
          quality: 'high',
          ratio: '16:9'
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: errorData.message || `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        video_url: data.video_url,
        task_id: data.task_id
      };
    } catch (error) {
      console.error('HeyGen API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get avatar task status
   */
  async getTaskStatus(taskId: string): Promise<HeyGenAvatarResponse> {
    if (!this.isConfigured()) {
      return {
        success: false,
        error: 'HeyGen API not configured'
      };
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/video/status/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      });

      if (!response.ok) {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`
        };
      }

      const data = await response.json();
      return {
        success: true,
        video_url: data.video_url,
        task_id: taskId
      };
    } catch (error) {
      console.error('HeyGen Status Check Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get available avatars
   */
  async getAvailableAvatars(): Promise<any[]> {
    if (!this.isConfigured()) {
      return [];
    }

    try {
      const response = await fetch(`${this.config.baseUrl}/avatar.list`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch avatars:', response.statusText);
        return [];
      }

      const data = await response.json();
      return data.avatars || [];
    } catch (error) {
      console.error('HeyGen Avatar List Error:', error);
      return [];
    }
  }

  /**
   * Get configuration status
   */
  getConfigStatus(): { configured: boolean; missing: string[] } {
    const missing: string[] = [];
    
    if (!this.config.apiKey) missing.push('VITE_HEYGEN_API_KEY');
    if (!this.config.avatarId) missing.push('VITE_HEYGEN_AVATAR_ID');
    
    return {
      configured: missing.length === 0,
      missing
    };
  }
}

// Export singleton instance
export const heyGenService = new HeyGenService();

