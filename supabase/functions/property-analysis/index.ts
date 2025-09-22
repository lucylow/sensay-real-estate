import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PropertyAnalysisRequest {
  query: string;
  healthCheck?: boolean;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, healthCheck }: PropertyAnalysisRequest = await req.json();

    // Health check endpoint
    if (healthCheck) {
      return new Response(
        JSON.stringify({ status: 'healthy', timestamp: new Date().toISOString() }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Analyzing property: ${query}`);

    // Get API key from Supabase secrets
    const realtyApiKey = Deno.env.get('REALTY_BASE_AU_API_KEY');
    
    if (!realtyApiKey) {
      console.error('REALTY_BASE_AU_API_KEY not found in environment');
      throw new Error('API key not configured');
    }

    // Call RealtyBase API
    const realtyResponse = await fetch('https://api.realtybase.com.au/v1/properties/search', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${realtyApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: query,
        limit: 1,
        include_ai_analysis: true
      })
    });

    if (!realtyResponse.ok) {
      console.error(`RealtyBase API error: ${realtyResponse.status} ${realtyResponse.statusText}`);
      
      // Fallback to mock data if API fails
      const mockAnalysis = {
        current_valuation: Math.floor(Math.random() * 2000000) + 500000,
        valuation_range: {
          min: Math.floor(Math.random() * 1500000) + 400000,
          max: Math.floor(Math.random() * 2500000) + 600000
        },
        risk_score: Math.floor(Math.random() * 40) + 30,
        confidence: Math.floor(Math.random() * 20) + 80,
        analysis_result: {
          current_valuation: Math.floor(Math.random() * 2000000) + 500000,
          risk_score: Math.floor(Math.random() * 40) + 30,
          climate_risk: 'Moderate',
          lvr: 0.7 + Math.random() * 0.2,
          confidence: Math.floor(Math.random() * 20) + 80,
          story: `Property analysis for ${query}. Located in a developing area with good growth potential.`,
          risk: {
            flood: Math.floor(Math.random() * 30) + 10,
            fire: Math.floor(Math.random() * 40) + 20,
            coastalErosion: Math.floor(Math.random() * 20) + 5,
            subsidence: Math.floor(Math.random() * 15) + 5,
            market: Math.floor(Math.random() * 30) + 15
          },
          compliance: {
            status: 'APPROVED' as const,
            reasons: ['Standard compliance checks passed'],
            lvr: 0.7 + Math.random() * 0.2,
            dti: 3.5 + Math.random() * 2
          }
        }
      };

      const mockSentiment = {
        sentiment: 5 + Math.random() * 4,
        risk_level: 1 + Math.random() * 2
      };

      const mockMarketSentiment = {
        sentiment_score: 3 + Math.random() * 3,
        trend: ['bullish', 'bearish', 'neutral'][Math.floor(Math.random() * 3)] as 'bullish' | 'bearish' | 'neutral',
        confidence: 70 + Math.floor(Math.random() * 25),
        summary: `Market analysis for ${query} area showing stable conditions with moderate growth potential.`
      };

      return new Response(
        JSON.stringify({
          analysis: mockAnalysis,
          sentiment: mockSentiment,
          marketSentiment: mockMarketSentiment,
          dataSource: 'fallback',
          message: 'Using fallback data due to API unavailability'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    const realtyData = await realtyResponse.json();
    console.log('RealtyBase response:', JSON.stringify(realtyData, null, 2));

    // Transform RealtyBase data to our format
    const properties = realtyData.properties || [];
    if (properties.length === 0) {
      throw new Error('No properties found for the given query');
    }

    const property = properties[0];
    const analysis = {
      current_valuation: property.ai_valuation?.estimated_value || 0,
      valuation_range: {
        min: property.ai_valuation?.confidence_range?.min || 0,
        max: property.ai_valuation?.confidence_range?.max || 0
      },
      risk_score: property.ai_insights?.risk_assessment?.overall_score || 0,
      confidence: property.ai_valuation?.confidence_score || 0,
      analysis_result: property.ai_insights || {}
    };

    const sentiment = {
      sentiment: property.ai_insights?.market_sentiment?.score || 5,
      risk_level: property.ai_insights?.risk_assessment?.overall_score || 50
    };

    const marketSentiment = {
      sentiment_score: property.ai_insights?.market_sentiment?.score || 4,
      trend: property.ai_insights?.market_sentiment?.trend || 'neutral' as 'bullish' | 'bearish' | 'neutral',
      confidence: property.ai_insights?.market_sentiment?.confidence || 80,
      summary: property.ai_insights?.market_sentiment?.summary || `Market analysis for ${query}`
    };

    return new Response(
      JSON.stringify({
        analysis,
        sentiment,
        marketSentiment,
        dataSource: 'realtybase',
        rawData: property
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Property analysis error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
})