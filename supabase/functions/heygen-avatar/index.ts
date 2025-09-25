import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface HeyGenRequest {
  text: string;
  voice?: string;
  avatar_id?: string;
}

interface HeyGenResponse {
  success: boolean;
  video_url?: string;
  task_id?: string;
  error?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, voice = 'en_us_female_001', avatar_id }: HeyGenRequest = await req.json();
    
    if (!text) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Text is required for video generation'
        }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get HeyGen API configuration from environment
    const HEYGEN_API_KEY = Deno.env.get('HEYGEN_API_KEY');
    const HEYGEN_AVATAR_ID = Deno.env.get('HEYGEN_AVATAR_ID') || avatar_id || 'Marianne_CasualLook_public';

    if (!HEYGEN_API_KEY) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'HeyGen API key not configured'
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating HeyGen video:', { text: text.substring(0, 50) + '...', voice, avatar_id: HEYGEN_AVATAR_ID });

    // Call HeyGen API
    const heygenResponse = await fetch('https://api.heygen.com/v1/video/generate', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HEYGEN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        voice,
        avatar_id: HEYGEN_AVATAR_ID,
        quality: 'high',
        ratio: '16:9'
      })
    });

    if (!heygenResponse.ok) {
      const errorText = await heygenResponse.text();
      console.error('HeyGen API error:', heygenResponse.status, errorText);
      
      return new Response(
        JSON.stringify({
          success: false,
          error: `HeyGen API error: ${heygenResponse.status} - ${errorText}`
        }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const heygenData = await heygenResponse.json();
    console.log('HeyGen response:', { task_id: heygenData.task_id, status: heygenData.status });

    const response: HeyGenResponse = {
      success: true,
      video_url: heygenData.video_url,
      task_id: heygenData.task_id
    };

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('HeyGen Avatar Error:', error);
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
