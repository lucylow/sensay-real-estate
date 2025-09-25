/**
 * HeyGen API Service for Frontend
 * Provides both direct API access and backend proxy functionality
 */

import { propGuardAPI } from '@/config/api';

export interface HeyGenVideoRequest {
  text: string;
  voice?: string;
}

export interface HeyGenVideoResponse {
  success: boolean;
  video_url?: string;
  task_id?: string;
  error?: string;
}

export interface HeyGenTaskStatus {
  success: boolean;
  status?: string;
  video_url?: string;
  progress?: number;
  error?: string;
}

export class HeyGenAPI {
  private useBackend: boolean;

  constructor(useBackend: boolean = true) {
    this.useBackend = useBackend;
  }

  /**
   * Generate avatar video
   */
  async generateVideo(request: HeyGenVideoRequest): Promise<HeyGenVideoResponse> {
    if (this.useBackend) {
      try {
        const response = await propGuardAPI.generateAvatarVideo(
          request.text, 
          request.voice || 'en_us_female_001'
        );
        return {
          success: response.success,
          video_url: response.video_url,
          task_id: response.task_id,
          error: response.error
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
      }
    } else {
      // Direct API implementation would go here
      return {
        success: false,
        error: 'Direct API access not implemented. Please use backend proxy.'
      };
    }
  }

  /**
   * Get task status
   */
  async getTaskStatus(taskId: string): Promise<HeyGenTaskStatus> {
    if (this.useBackend) {
      try {
        const response = await propGuardAPI.getAvatarTaskStatus(taskId);
        return {
          success: response.success,
          status: response.status,
          video_url: response.video_url,
          progress: response.progress,
          error: response.error
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
      }
    } else {
      return {
        success: false,
        error: 'Direct API access not implemented'
      };
    }
  }

  /**
   * Get available avatars
   */
  async getAvailableAvatars(): Promise<any[]> {
    if (this.useBackend) {
      try {
        const response = await propGuardAPI.getAvailableAvatars();
        return response.avatars || [];
      } catch (error) {
        console.error('Failed to fetch avatars:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  /**
   * Get configuration status
   */
  async getConfigStatus(): Promise<any> {
    if (this.useBackend) {
      try {
        const response = await propGuardAPI.getHeyGenConfig();
        return {
          configured: response.configured,
          avatar_id: response.avatar_id,
          api_key_configured: response.api_key_configured
        };
      } catch (error) {
        return {
          configured: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
      }
    } else {
      return {
        configured: false,
        error: 'Backend not available'
      };
    }
  }

  /**
   * Check health status
   */
  async checkHealth(): Promise<any> {
    if (this.useBackend) {
      try {
        const response = await propGuardAPI.checkHeyGenHealth();
        return {
          success: response.success,
          status: response.status,
          configured: response.configured,
          service: response.service
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Health check failed'
        };
      }
    } else {
      return {
        success: false,
        error: 'Backend not available'
      };
    }
  }

  /**
   * Generate video with automatic retry
   */
  async generateVideoWithRetry(
    request: HeyGenVideoRequest, 
    maxRetries: number = 3
  ): Promise<HeyGenVideoResponse> {
    let lastError: string = '';
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.generateVideo(request);
        
        if (response.success) {
          return response;
        }
        
        lastError = response.error || 'Unknown error';
        
        if (attempt < maxRetries) {
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        
        if (attempt < maxRetries) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    return {
      success: false,
      error: `Failed after ${maxRetries} attempts. Last error: ${lastError}`
    };
  }

  /**
   * Poll for video completion
   */
  async pollForVideoCompletion(
    taskId: string, 
    maxAttempts: number = 30,
    intervalMs: number = 2000
  ): Promise<HeyGenTaskStatus> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const status = await this.getTaskStatus(taskId);
        
        if (status.success) {
          if (status.status === 'completed' && status.video_url) {
            return status;
          }
          
          if (status.status === 'failed') {
            return {
              success: false,
              error: 'Video generation failed'
            };
          }
        }
        
        // Wait before next poll
        if (attempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, intervalMs));
        }
      } catch (error) {
        if (attempt === maxAttempts) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Polling failed'
          };
        }
        
        await new Promise(resolve => setTimeout(resolve, intervalMs));
      }
    }
    
    return {
      success: false,
      error: 'Video generation timed out'
    };
  }
}

// Export singleton instance
export const heyGenAPI = new HeyGenAPI(true);
