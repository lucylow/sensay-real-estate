import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ElevenLabsRequest {
  text: string;
  voice_id?: string;
  model_id?: string;
  persona?: 'alex' | 'default';
}

interface ElevenLabsResponse {
  success: boolean;
  audio_data?: string;
  error?: string;
  voice_id?: string;
  persona?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice_id, model_id = 'eleven_multilingual_v2', persona = 'alex' }: ElevenLabsRequest = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Text is required for speech generation'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get Eleven Labs API configuration from environment
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');
    const ELEVENLABS_VOICE_ID = Deno.env.get('ELEVENLABS_VOICE_ID') || voice_id || 'alex-professional-australian';

    if (!ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Eleven Labs API key not configured'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating Eleven Labs speech:', { 
      text: text.substring(0, 50) + '...', 
      voice_id: ELEVENLABS_VOICE_ID, 
      model_id,
      persona 
    });

    // Prepare voice settings based on persona
    const voiceSettings = {
      stability: 0.8,
      similarity_boost: 0.9,
      style: 0.2,
      use_speaker_boost: true
    };

    // Adjust settings for Alex persona
    if (persona === 'alex') {
      voiceSettings.stability = 0.85; // More stable for professional tone
      voiceSettings.similarity_boost = 0.95; // Higher consistency
      voiceSettings.style = 0.15; // Subtle professional style
    }

    // Call Eleven Labs API
    const elevenlabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings: voiceSettings
      })
    });

    if (!elevenlabsResponse.ok) {
      const errorText = await elevenlabsResponse.text();
      console.error('Eleven Labs API error:', elevenlabsResponse.status, errorText);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: `Eleven Labs API error: ${elevenlabsResponse.status} - ${errorText}`
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const audioData = await elevenlabsResponse.arrayBuffer();
    const audioBase64 = btoa(String.fromCharCode(...new Uint8Array(audioData)));
    
    console.log('Eleven Labs speech generation successful:', { 
      size: audioData.byteLength,
      voice_id: ELEVENLABS_VOICE_ID,
      persona 
    });

    const response: ElevenLabsResponse = {
      success: true,
      audio_data: audioBase64,
      voice_id: ELEVENLABS_VOICE_ID,
      persona
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Eleven Labs TTS Error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

