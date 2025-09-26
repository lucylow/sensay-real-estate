/**
 * Mock Data Service
 * Provides realistic mock data for Sensay, ElevenLabs, and HeyGen APIs
 * Useful for development, testing, and demos when APIs are not available
 */

import { mockVoices, mockModels, mockUserInfo, mockClonedVoices, mockAudioTracks, mockTTSResponse, mockErrorResponses, mockSubscriptionTiers } from '@/data/mockElevenLabs';
import { mockSensayUsers, mockSensayProperties, mockSensayAnalyses, mockSensayReports, mockSensayAPIResponses, mockSensayFeatures, mockSensayPricing } from '@/data/mockSensay';
import { mockHeyGenAvatars, mockHeyGenVoices, mockHeyGenVideos, mockHeyGenTasks, mockHeyGenAPIResponses, mockHeyGenUsage, mockHeyGenTemplates } from '@/data/mockHeyGen';
import { mockRealEstateFAQs, searchFAQs, getFAQsByCategory, getFAQsByDifficulty } from '@/data/mockRealEstateFAQs';

export class MockDataService {
  private static instance: MockDataService;
  private mockMode: boolean = true;

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  setMockMode(enabled: boolean) {
    this.mockMode = enabled;
  }

  isMockMode(): boolean {
    return this.mockMode;
  }

  // ElevenLabs Mock Data
  async getElevenLabsVoices() {
    if (!this.mockMode) return null;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      voices: mockVoices,
      total: mockVoices.length
    };
  }

  async getElevenLabsModels() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      success: true,
      models: mockModels,
      total: mockModels.length
    };
  }

  async getElevenLabsUserInfo() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      user: mockUserInfo
    };
  }

  async generateElevenLabsTTS(text: string, voiceId?: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate occasional failures
    if (Math.random() < 0.1) {
      return mockErrorResponses.rate_limit_exceeded;
    }
    
    return {
      ...mockTTSResponse,
      text,
      voice_id: voiceId || mockVoices[0].voice_id,
      characters_used: text.length
    };
  }

  async cloneElevenLabsVoice(voiceData: any) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newVoice = {
      voice_id: `cloned_voice_${Date.now()}`,
      name: voiceData.name,
      description: voiceData.description,
      category: 'cloned',
      labels: voiceData.labels || {},
      settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.2,
        use_speaker_boost: true
      }
    };
    
    return {
      success: true,
      voice: newVoice,
      message: 'Voice cloned successfully'
    };
  }

  // Sensay Mock Data
  async getSensayProperties() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      properties: mockSensayProperties,
      total: mockSensayProperties.length
    };
  }

  async analyzeSensayProperty(address: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Find matching property or create mock analysis
    const property = mockSensayProperties.find(p => 
      p.address.toLowerCase().includes(address.toLowerCase())
    );
    
    const analysis = property ? 
      mockSensayAnalyses.find(a => a.property_id === property.id) :
      mockSensayAnalyses[0];
    
    return {
      success: true,
      property: property || mockSensayProperties[0],
      analysis: analysis || mockSensayAnalyses[0],
      timestamp: new Date().toISOString()
    };
  }

  async generateSensayReport(propertyId: string, reportType: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const report = {
      id: `report_${Date.now()}`,
      property_id: propertyId,
      report_type: reportType,
      generated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
      status: 'completed',
      download_url: `https://sensay-reports.com/reports/report_${Date.now()}.pdf`,
      summary: `Comprehensive ${reportType} report generated successfully.`
    };
    
    return {
      success: true,
      report
    };
  }

  async getSensayUserStats(userId: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockSensayUsers.find(u => u.id === userId) || mockSensayUsers[0];
    
    return {
      success: true,
      user,
      stats: {
        properties_analyzed: user.properties_analyzed,
        total_valuations: user.total_valuations,
        subscription_tier: user.subscription_tier,
        last_active: user.last_active
      }
    };
  }

  // HeyGen Mock Data
  async getHeyGenAvatars() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      avatars: mockHeyGenAvatars,
      total: mockHeyGenAvatars.length
    };
  }

  async getHeyGenVoices() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      success: true,
      voices: mockHeyGenVoices,
      total: mockHeyGenVoices.length
    };
  }

  async generateHeyGenVideo(text: string, avatarId: string, voiceId?: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 8000));
    
    const taskId = `task_${Date.now()}`;
    const videoId = `video_${Date.now()}`;
    
    return {
      success: true,
      task_id: taskId,
      video_id: videoId,
      status: 'processing',
      estimated_completion: new Date(Date.now() + 300000).toISOString(), // 5 minutes
      message: 'Video generation started successfully'
    };
  }

  async getHeyGenTaskStatus(taskId: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const task = mockHeyGenTasks.find(t => t.task_id === taskId) || {
      task_id: taskId,
      status: 'completed',
      progress: 100,
      result: {
        video_id: `video_${taskId}`,
        video_url: 'https://heygen-videos.s3.amazonaws.com/completed_video.mp4',
        thumbnail_url: 'https://heygen-videos.s3.amazonaws.com/thumbnail.jpg'
      }
    };
    
    return {
      success: true,
      task
    };
  }

  async getHeyGenUsage() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    return {
      success: true,
      usage: mockHeyGenUsage
    };
  }

  // FAQ Mock Data
  async searchFAQs(query: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const results = searchFAQs(query);
    
    return {
      success: true,
      faqs: results,
      total: results.length,
      query
    };
  }

  async getFAQsByCategory(category: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = getFAQsByCategory(category);
    
    return {
      success: true,
      faqs: results,
      total: results.length,
      category
    };
  }

  async getFAQsByDifficulty(difficulty: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const results = getFAQsByDifficulty(difficulty as 'beginner' | 'intermediate' | 'advanced');
    
    return {
      success: true,
      faqs: results,
      total: results.length,
      difficulty
    };
  }

  async getFAQById(faqId: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const faq = mockRealEstateFAQs.find(f => f.id === faqId);
    
    return {
      success: !!faq,
      faq,
      error: faq ? null : 'FAQ not found'
    };
  }

  // Combined Services
  async generatePropertyPresentation(propertyId: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    const property = mockSensayProperties.find(p => p.id === propertyId) || mockSensayProperties[0];
    const analysis = mockSensayAnalyses.find(a => a.property_id === propertyId) || mockSensayAnalyses[0];
    
    // Generate presentation text
    const presentationText = `Welcome to ${property.address}. This ${property.property_type.toLowerCase()} features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms. Based on our PropGuard AI analysis, this property has an estimated value of $${property.estimated_value.toLocaleString()} with a confidence score of ${property.confidence_score}%. The risk assessment shows ${analysis.risk_assessment.overall_risk_score < 30 ? 'low' : analysis.risk_assessment.overall_risk_score < 60 ? 'moderate' : 'high'} overall risk, making it ${analysis.risk_assessment.overall_risk_score < 40 ? 'an attractive investment opportunity' : 'suitable for experienced investors'}.`;
    
    // Generate both TTS and video
    const ttsResult = await this.generateElevenLabsTTS(presentationText);
    const videoResult = await this.generateHeyGenVideo(presentationText, 'Lisa_RealEstate_public');
    
    return {
      success: true,
      property,
      analysis,
      presentation: {
        text: presentationText,
        audio_url: ttsResult?.audio_url,
        video_task_id: videoResult?.task_id,
        duration: presentationText.length / 15 // Rough estimate
      }
    };
  }

  async getDashboardData() {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    return {
      success: true,
      dashboard: {
        total_properties: mockSensayProperties.length,
        total_analyses: mockSensayAnalyses.length,
        total_reports: mockSensayReports.length,
        recent_activities: [
          {
            id: 'activity_1',
            type: 'property_analysis',
            description: 'Property analysis completed for 123 Collins Street',
            timestamp: new Date(Date.now() - 300000).toISOString()
          },
          {
            id: 'activity_2',
            type: 'report_generated',
            description: 'Comprehensive report generated for 456 Bourke Street',
            timestamp: new Date(Date.now() - 600000).toISOString()
          },
          {
            id: 'activity_3',
            type: 'voice_generated',
            description: 'Voice presentation created for property listing',
            timestamp: new Date(Date.now() - 900000).toISOString()
          }
        ],
        api_status: {
          sensay: 'operational',
          elevenlabs: 'operational',
          heygen: 'operational'
        }
      }
    };
  }

  // Error simulation
  async simulateError(api: 'elevenlabs' | 'sensay' | 'heygen', errorType: string) {
    if (!this.mockMode) return null;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const errorMap = {
      elevenlabs: mockErrorResponses,
      sensay: {
        api_key_invalid: { success: false, error: 'Invalid Sensay API key', error_code: 'INVALID_API_KEY' },
        rate_limit_exceeded: { success: false, error: 'Rate limit exceeded', error_code: 'RATE_LIMIT_EXCEEDED' }
      },
      heygen: {
        avatar_not_found: { success: false, error: 'Avatar not found', error_code: 'AVATAR_NOT_FOUND' },
        quota_exceeded: { success: false, error: 'Monthly quota exceeded', error_code: 'QUOTA_EXCEEDED' }
      }
    };
    
    return errorMap[api][errorType] || { success: false, error: 'Unknown error' };
  }
}

// Export singleton instance
export const mockDataService = MockDataService.getInstance();

// Helper function to check if we should use mock data
export const shouldUseMockData = (): boolean => {
  // Check environment variables or other conditions
  return import.meta.env.VITE_USE_MOCK_DATA === 'true' || 
         !import.meta.env.VITE_ELEVENLABS_API_KEY ||
         !import.meta.env.VITE_SENSAY_API_KEY ||
         !import.meta.env.VITE_HEYGEN_API_KEY;
};

// Initialize mock mode based on environment
mockDataService.setMockMode(shouldUseMockData());

