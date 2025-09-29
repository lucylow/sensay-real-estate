import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SensayChatRequest {
  message: string;
  context?: {
    property?: any;
    analysis?: any;
    marketData?: any;
    sessionId?: string;
    conversationId?: string;
  };
  credentials?: {
    apiKey?: string;
    organizationId?: string;
  };
  endpoint?: string;
  method?: string;
  data?: any;
}

interface SensayChatResponse {
  response: string;
  conversationId?: string;
  suggestions?: string[];
  insights?: any;
  confidence: number;
  timestamp: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody: SensayChatRequest = await req.json();
    const { message, context, credentials, endpoint, method, data } = requestBody;
    
    console.log('Sensay Request:', { 
      message: message?.substring(0, 100) + '...', 
      hasContext: !!context,
      hasCredentials: !!credentials,
      endpoint: endpoint || '/chat',
      method: method || 'POST'
    });

    // Get Sensay credentials from environment or request
    const sensayApiKey = credentials?.apiKey || Deno.env.get('SENSAY_API_KEY');
    const sensayOrgId = credentials?.organizationId || Deno.env.get('SENSAY_ORGANIZATION_ID');

    if (!sensayApiKey || !sensayOrgId) {
      console.warn('Missing Sensay credentials - using fallback mode');
      // Instead of throwing error, provide helpful fallback response
      const fallbackResponse = await generateFallbackResponse(message || 'Hello', context || {});
      
      return new Response(
        JSON.stringify({
          status: 'warning',
          ...fallbackResponse,
          error: 'Missing SENSAY_API_KEY or SENSAY_ORGANIZATION_ID',
          timestamp: new Date().toISOString()
        }),
        {
          status: 200, // Changed from 400 to 200 to allow graceful fallback
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Determine the target endpoint
    const targetEndpoint = endpoint || '/chat';
    const requestMethod = method || 'POST';
    const requestPayload = data || { message, context: context || {} };

    // Prepare Sensay API request
    const sensayRequest = {
      ...requestPayload,
      replica_id: 'propguard-real-estate-agent',
      organization_id: sensayOrgId
    };

    console.log('Making Sensay API request to:', `https://api.sensay.io/v1${targetEndpoint}`);

    // Make request to Sensay API
    const sensayResponse = await fetch(`https://api.sensay.io/v1${targetEndpoint}`, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sensayApiKey}`,
        'X-Organization-ID': sensayOrgId,
      },
      body: requestMethod !== 'GET' ? JSON.stringify(sensayRequest) : undefined,
    });

    if (!sensayResponse.ok) {
      const errorText = await sensayResponse.text();
      console.error('Sensay API Error:', sensayResponse.status, errorText);
      
      // Fallback to local AI response for chat endpoints
      if (targetEndpoint === '/chat') {
        const fallbackResponse = await generateFallbackResponse(message, context);
        
        return new Response(
          JSON.stringify({
            status: 'success',
            ...fallbackResponse,
            fallback: true,
            sensayError: `Sensay API error: ${sensayResponse.status} ${sensayResponse.statusText}`,
            timestamp: new Date().toISOString()
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // For non-chat endpoints, return the error
        return new Response(
          JSON.stringify({
            status: 'error',
            error: `Sensay API error: ${sensayResponse.status} ${sensayResponse.statusText}`,
            details: errorText,
            timestamp: new Date().toISOString()
          }),
          {
            status: sensayResponse.status,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    const sensayData = await sensayResponse.json();
    console.log('Sensay API Response received');

    // Process Sensay response
    const processedResponse: SensayChatResponse = {
      response: sensayData.response || sensayData.message || JSON.stringify(sensayData),
      conversationId: sensayData.conversation_id || context?.conversationId,
      suggestions: sensayData.suggestions || generateDefaultSuggestions(message),
      insights: sensayData.insights || null,
      confidence: sensayData.confidence || 85,
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify({
        status: 'success',
        ...processedResponse,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Sensay Chat Error:', error);
    
    // Generate fallback response
    const fallbackResponse = await generateFallbackResponse(
      'I encountered an error processing your request',
      {}
    );
    
    return new Response(
      JSON.stringify({
        status: 'error',
        ...fallbackResponse,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function generateFallbackResponse(message: string, context: any): Promise<SensayChatResponse> {
  // Generate a contextual fallback response
  const lowerMessage = message.toLowerCase();
  
  let response = "I'm currently experiencing connectivity issues with my advanced AI system, but I can still help you with basic property analysis.\n\n";
  
  if (lowerMessage.includes('risk') || lowerMessage.includes('danger')) {
    response += "**Risk Assessment:** I can help you understand property risks including flood, fire, and market volatility. ";
    response += "For detailed analysis, please provide property details or use our property analysis tool.";
  } else if (lowerMessage.includes('value') || lowerMessage.includes('worth')) {
    response += "**Property Valuation:** I can assist with property valuations using market data and comparable sales. ";
    response += "Please provide the property address or use our valuation tool for accurate estimates.";
  } else if (lowerMessage.includes('market') || lowerMessage.includes('trend')) {
    response += "**Market Analysis:** I can provide insights on market trends, sentiment, and investment opportunities. ";
    response += "Our market intelligence tools can give you detailed analysis.";
  } else {
    response += "**General Assistance:** I can help with property analysis, risk assessment, market insights, and investment advice. ";
    response += "What specific information are you looking for?";
  }
  
  return {
    response,
    suggestions: [
      'Analyze a property',
      'Get market insights',
      'Risk assessment help',
      'Investment advice'
    ],
    confidence: 70,
    timestamp: new Date().toISOString()
  };
}

function generateDefaultSuggestions(message: string): string[] {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('property') || lowerMessage.includes('house')) {
    return [
      'Analyze this property',
      'Get valuation estimate',
      'Check risk factors',
      'Compare with similar properties'
    ];
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('buy')) {
    return [
      'Investment analysis',
      'ROI calculation',
      'Risk assessment',
      'Market comparison'
    ];
  }
  
  if (lowerMessage.includes('market') || lowerMessage.includes('trend')) {
    return [
      'Market trends',
      'Price predictions',
      'Area comparison',
      'Investment timing'
    ];
  }
  
  return [
    'Property analysis',
    'Risk assessment',
    'Market insights',
    'Investment advice'
  ];
}
