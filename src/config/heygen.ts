/**
 * HeyGen API Configuration and Service
 * Uses Supabase Edge Functions for secure API key management
 */

import { supabaseAPIService, type SupabaseHeyGenRequest, type SupabaseHeyGenResponse } from '@/services/supabaseAPI';

export interface HeyGenConfig {
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
      avatarId: 'Marianne_CasualLook_public',
      baseUrl: 'https://api.heygen.com/v1'
    };
  }

  /**
   * Check if HeyGen is properly configured through Supabase
   */
  async isConfigured(): Promise<boolean> {
    try {
      const config = await supabaseAPIService.checkAPIConfiguration();
      return config.heygen;
    } catch (error) {
      console.error('Error checking HeyGen configuration:', error);
      return false;
    }
  }

  /**
   * Generate interactive avatar video using Supabase Edge Function
   */
  async generateAvatarVideo(text: string, voice?: string): Promise<HeyGenAvatarResponse> {
    try {
      const request: SupabaseHeyGenRequest = {
        text,
        voice: voice || 'en_us_female_001',
        avatar_id: this.config.avatarId
      };

      const result = await supabaseAPIService.generateAvatarVideo(request);
      return result;
    } catch (error) {
      console.error('HeyGen API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get avatar task status (placeholder - Supabase handles this)
   */
  async getTaskStatus(taskId: string): Promise<HeyGenAvatarResponse> {
    // Supabase handles task status, return placeholder
    return {
      success: false,
      error: 'Task status checking not implemented in Supabase version'
    };
  }

  /**
   * Get available avatars (returns empty array as Supabase handles this)
   */
  async getAvailableAvatars(): Promise<Record<string, unknown>[]> {
    // Supabase handles avatar management, return empty array
    return [];
  }

  /**
   * Get configuration status
   */
  async getConfigStatus(): Promise<{ configured: boolean; missing: string[] }> {
    try {
      const config = await supabaseAPIService.checkAPIConfiguration();
      return {
        configured: config.heygen,
        missing: config.heygen ? [] : ['HEYGEN_API_KEY in Supabase']
      };
    } catch (error) {
      return {
        configured: false,
        missing: ['HEYGEN_API_KEY in Supabase']
      };
    }
  }
}

// Export singleton instance
export const heyGenService = new HeyGenService();

