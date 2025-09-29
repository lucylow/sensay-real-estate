/**
 * Test script for Supabase API configuration
 * This can be used to verify that the APIs are properly configured
 */

import { supabaseAPIService } from '@/services/supabaseAPI';

export async function testSupabaseAPIs() {
  console.log('🔍 Testing Supabase API Configuration...\n');

  try {
    // Test API configuration
    const config = await supabaseAPIService.checkAPIConfiguration();
    
    console.log('📊 API Configuration Status:');
    console.log(`  ElevenLabs: ${config.elevenlabs ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`  HeyGen: ${config.heygen ? '✅ Configured' : '❌ Not configured'}`);
    
    if (config.errors.length > 0) {
      console.log('\n❌ Configuration Errors:');
      config.errors.forEach(error => console.log(`  - ${error}`));
    }

    // Test ElevenLabs if configured
    if (config.elevenlabs) {
      console.log('\n🎤 Testing ElevenLabs...');
      try {
        const speechResult = await supabaseAPIService.generateSpeech({
          text: 'Hello! This is a test of the ElevenLabs integration.',
          persona: 'alex'
        });
        
        if (speechResult.success) {
          console.log('  ✅ ElevenLabs speech generation successful');
        } else {
          console.log(`  ❌ ElevenLabs error: ${speechResult.error}`);
        }
      } catch (error) {
        console.log(`  ❌ ElevenLabs test failed: ${error}`);
      }
    }

    // Test HeyGen if configured
    if (config.heygen) {
      console.log('\n🎥 Testing HeyGen...');
      try {
        const videoResult = await supabaseAPIService.generateAvatarVideo({
          text: 'Welcome to Sensay Real Estate! This is a test of the HeyGen integration.'
        });
        
        if (videoResult.success) {
          console.log('  ✅ HeyGen video generation successful');
          if (videoResult.task_id) {
            console.log(`  📋 Task ID: ${videoResult.task_id}`);
          }
        } else {
          console.log(`  ❌ HeyGen error: ${videoResult.error}`);
        }
      } catch (error) {
        console.log(`  ❌ HeyGen test failed: ${error}`);
      }
    }

    console.log('\n🏁 Test completed!');
    
    return {
      success: config.elevenlabs && config.heygen,
      config,
      message: config.elevenlabs && config.heygen 
        ? 'All APIs are properly configured and working!'
        : 'Some APIs are not configured. Please check Supabase environment variables.'
    };

  } catch (error) {
    console.error('❌ Test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to test API configuration'
    };
  }
}

// Export for use in components
export default testSupabaseAPIs;
