/**
 * API Test Script
 * Simple script to test ElevenLabs and HeyGen API connections
 * Run this in the browser console or as a standalone test
 */

// Test ElevenLabs API
async function testElevenLabsAPI(apiKey: string) {
  console.log('Testing ElevenLabs API...');
  
  try {
    // Test 1: Check voices endpoint
    const voicesResponse = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
      }
    });
    
    if (!voicesResponse.ok) {
      throw new Error(`Voices API failed: ${voicesResponse.status} ${voicesResponse.statusText}`);
    }
    
    const voicesData = await voicesResponse.json();
    console.log('✅ ElevenLabs Voices API:', voicesData.voices?.length || 0, 'voices found');
    
    // Test 2: Test TTS generation
    if (voicesData.voices && voicesData.voices.length > 0) {
      const testVoice = voicesData.voices[0];
      console.log('Testing TTS with voice:', testVoice.name);
      
      const ttsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${testVoice.voice_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text: 'Hello! This is a test of the ElevenLabs API.',
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.2,
            use_speaker_boost: true
          }
        })
      });
      
      if (!ttsResponse.ok) {
        throw new Error(`TTS API failed: ${ttsResponse.status} ${ttsResponse.statusText}`);
      }
      
      const audioBlob = await ttsResponse.blob();
      console.log('✅ ElevenLabs TTS API: Audio generated successfully', audioBlob.size, 'bytes');
      
      // Create audio URL for testing
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log('Audio URL:', audioUrl);
      
      return {
        success: true,
        voices: voicesData.voices.length,
        audioUrl,
        message: 'ElevenLabs API working correctly'
      };
    }
    
    return {
      success: true,
      voices: 0,
      message: 'ElevenLabs API connected but no voices found'
    };
    
  } catch (error) {
    console.error('❌ ElevenLabs API Error:', error);
    return {
      success: false,
      error: error.message,
      message: 'ElevenLabs API test failed'
    };
  }
}

// Test HeyGen API
async function testHeyGenAPI(apiKey: string, avatarId: string) {
  console.log('Testing HeyGen API...');
  
  try {
    // Test video generation
    const videoResponse = await fetch('https://api.heygen.com/v1/video.generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: avatarId,
              avatar_style: 'normal'
            },
            voice: {
              type: 'text',
              input_text: 'Hello! This is a test of the HeyGen API for Sensay Real Estate.',
              voice_id: '1bd001e7e50f421d891986aad5158bc3'
            }
          }
        ],
        dimension: {
          width: 1280,
          height: 720
        }
      })
    });
    
    if (!videoResponse.ok) {
      const errorText = await videoResponse.text();
      throw new Error(`HeyGen API failed: ${videoResponse.status} ${videoResponse.statusText} - ${errorText}`);
    }
    
    const videoData = await videoResponse.json();
    console.log('✅ HeyGen Video API: Video generation started');
    console.log('Task ID:', videoData.data?.task_id);
    
    return {
      success: true,
      taskId: videoData.data?.task_id,
      message: 'HeyGen API working correctly'
    };
    
  } catch (error) {
    console.error('❌ HeyGen API Error:', error);
    return {
      success: false,
      error: error.message,
      message: 'HeyGen API test failed'
    };
  }
}

// Test video status
async function testHeyGenVideoStatus(apiKey: string, taskId: string) {
  console.log('Testing HeyGen Video Status...');
  
  try {
    const statusResponse = await fetch(`https://api.heygen.com/v1/video.status.get?task_id=${taskId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      }
    });
    
    if (!statusResponse.ok) {
      throw new Error(`Status API failed: ${statusResponse.status} ${statusResponse.statusText}`);
    }
    
    const statusData = await statusResponse.json();
    console.log('✅ HeyGen Status API:', statusData.data?.status);
    
    return {
      success: true,
      status: statusData.data?.status,
      videoUrl: statusData.data?.video_url,
      message: 'HeyGen Status API working correctly'
    };
    
  } catch (error) {
    console.error('❌ HeyGen Status API Error:', error);
    return {
      success: false,
      error: error.message,
      message: 'HeyGen Status API test failed'
    };
  }
}

// Main test function
async function runAPITests() {
  console.log('🚀 Starting API Tests...');
  
  // Get API keys from environment or prompt user
  const elevenLabsKey = import.meta.env.VITE_ELEVENLABS_API_KEY || 
                       localStorage.getItem('elevenlabs_api_key') || 
                       prompt('Enter your ElevenLabs API key:');
  
  const heyGenKey = import.meta.env.VITE_HEYGEN_API_KEY || 
                   localStorage.getItem('heygen_api_key') || 
                   prompt('Enter your HeyGen API key:');
  
  const heyGenAvatarId = import.meta.env.VITE_HEYGEN_AVATAR_ID || 
                        localStorage.getItem('heygen_avatar_id') || 
                        'Marianne_CasualLook_public';
  
  const results = {
    elevenLabs: null,
    heyGen: null,
    heyGenStatus: null
  };
  
  // Test ElevenLabs
  if (elevenLabsKey) {
    results.elevenLabs = await testElevenLabsAPI(elevenLabsKey);
  } else {
    console.log('⚠️ ElevenLabs API key not provided');
  }
  
  // Test HeyGen
  if (heyGenKey) {
    results.heyGen = await testHeyGenAPI(heyGenKey, heyGenAvatarId);
    
    // Test video status if video generation was successful
    if (results.heyGen.success && results.heyGen.taskId) {
      // Wait a bit for video processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      results.heyGenStatus = await testHeyGenVideoStatus(heyGenKey, results.heyGen.taskId);
    }
  } else {
    console.log('⚠️ HeyGen API key not provided');
  }
  
  // Summary
  console.log('\n📊 Test Results Summary:');
  console.log('========================');
  
  if (results.elevenLabs) {
    console.log(`ElevenLabs: ${results.elevenLabs.success ? '✅ PASS' : '❌ FAIL'}`);
    if (results.elevenLabs.success) {
      console.log(`  - Voices: ${results.elevenLabs.voices}`);
      console.log(`  - TTS: Working`);
    } else {
      console.log(`  - Error: ${results.elevenLabs.error}`);
    }
  }
  
  if (results.heyGen) {
    console.log(`HeyGen: ${results.heyGen.success ? '✅ PASS' : '❌ FAIL'}`);
    if (results.heyGen.success) {
      console.log(`  - Task ID: ${results.heyGen.taskId}`);
    } else {
      console.log(`  - Error: ${results.heyGen.error}`);
    }
  }
  
  if (results.heyGenStatus) {
    console.log(`HeyGen Status: ${results.heyGenStatus.success ? '✅ PASS' : '❌ FAIL'}`);
    if (results.heyGenStatus.success) {
      console.log(`  - Status: ${results.heyGenStatus.status}`);
      if (results.heyGenStatus.videoUrl) {
        console.log(`  - Video URL: ${results.heyGenStatus.videoUrl}`);
      }
    } else {
      console.log(`  - Error: ${results.heyGenStatus.error}`);
    }
  }
  
  return results;
}

// Export for use in components
export { testElevenLabsAPI, testHeyGenAPI, testHeyGenVideoStatus, runAPITests };

// Auto-run if in browser console
if (typeof window !== 'undefined') {
  console.log('API Test Script loaded. Run runAPITests() to test all APIs.');
}
