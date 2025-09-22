import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, propertyId, action } = await req.json()
    const RAPIDAPI_KEY = Deno.env.get('RAPIDAPI_KEY')

    if (!RAPIDAPI_KEY) {
      throw new Error('RapidAPI key not configured')
    }

    const headers = {
      'X-RapidAPI-Key': RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'domain-au.p.rapidapi.com'
    }

    let url: string
    
    if (action === 'autocomplete') {
      url = `https://domain-au.p.rapidapi.com/properties/auto-complete?query=${encodeURIComponent(query)}`
    } else if (action === 'details') {
      url = `https://domain-au.p.rapidapi.com/properties/${propertyId}`
    } else {
      throw new Error('Invalid action')
    }

    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    if (!response.ok) {
      throw new Error(`Domain AU API error: ${response.status}`)
    }

    const data = await response.json()

    // Transform autocomplete data
    if (action === 'autocomplete') {
      const suggestions = Array.isArray(data) ? data.map((item: any) => ({
        id: item.id || item.value,
        address: item.display || item.text,
        type: item.type || 'property',
        suburb: item.suburb || '',
        state: item.state || '',
        postcode: item.postcode || ''
      })).slice(0, 10) : []

      return new Response(
        JSON.stringify({ suggestions }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // Transform property details
    if (action === 'details') {
      const propertyDetails = {
        id: data.id,
        address: data.address || data.displayAddress,
        price: data.price?.display || data.priceGuide,
        bedrooms: data.bedrooms || data.generalFeatures?.bedrooms,
        bathrooms: data.bathrooms || data.generalFeatures?.bathrooms,
        carSpaces: data.carSpaces || data.generalFeatures?.carSpaces,
        landSize: data.landSize || data.generalFeatures?.landSize,
        propertyType: data.propertyType,
        features: data.features || [],
        media: data.media || [],
        description: data.description,
        agent: data.agent,
        coordinates: {
          lat: data.geoLocation?.latitude,
          lng: data.geoLocation?.longitude
        }
      }

      return new Response(
        JSON.stringify({ property: propertyDetails }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

  } catch (error) {
    console.error('Domain AU API Error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to fetch property data',
        suggestions: [],
        property: null 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})