import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface FireData {
  latitude: number;
  longitude: number;
  frp: number; // Fire Radiative Power
  acq_date: string;
  confidence: string;
  distance?: number;
}

interface FireRiskAssessment {
  riskScore: number;
  riskLevel: string;
  nearbyFires: number;
  closestFireDistance: number;
  totalFRP: number;
  dataSource: string;
  lastUpdated: string;
}

// Global cache for fire data
let fireDataCache: {
  data: FireData[];
  timestamp: number;
  date: string;
} | null = null;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const AUSTRALIA_BBOX = "105,-45,155,-10"; // min_lon, min_lat, max_lon, max_lat

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { latitude, longitude, radiusKm = 50 } = await req.json();

    if (!latitude || !longitude) {
      return new Response(
        JSON.stringify({ error: 'Latitude and longitude are required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    console.log(`Analyzing fire risk for coordinates: ${latitude}, ${longitude}`);

    // Get NASA API key from environment
    const nasaApiKey = Deno.env.get('NASA_API_KEY');
    
    if (!nasaApiKey) {
      console.error('NASA_API_KEY not found in environment');
      
      // Return mock data with warning
      const mockRisk: FireRiskAssessment = {
        riskScore: 0.4,
        riskLevel: 'Medium',
        nearbyFires: 0,
        closestFireDistance: 0,
        totalFRP: 0,
        dataSource: 'fallback',
        lastUpdated: new Date().toISOString()
      };

      return new Response(
        JSON.stringify({ 
          fireRisk: mockRisk,
          warning: 'NASA API key not configured, using fallback data'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Get fire data (cached or fresh)
    const fireData = await getFireData(nasaApiKey);
    
    // Calculate fire risk for the property
    const fireRisk = calculateFireRisk(latitude, longitude, fireData, radiusKm);

    return new Response(
      JSON.stringify({ fireRisk }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Fire risk analysis error:', error);
    
    // Return fallback risk assessment
    const fallbackRisk: FireRiskAssessment = {
      riskScore: 0.4,
      riskLevel: 'Medium',
      nearbyFires: 0,
      closestFireDistance: 0,
      totalFRP: 0,
      dataSource: 'error_fallback',
      lastUpdated: new Date().toISOString()
    };
    
    return new Response(
      JSON.stringify({ 
        fireRisk: fallbackRisk,
        error: 'Fire risk analysis failed, using fallback data'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  }
});

async function getFireData(nasaApiKey: string): Promise<FireData[]> {
  const now = Date.now();
  const today = new Date().toISOString().split('T')[0];

  // Check if we have fresh cached data
  if (fireDataCache && 
      fireDataCache.date === today && 
      (now - fireDataCache.timestamp) < CACHE_DURATION) {
    console.log('Using cached fire data');
    return fireDataCache.data;
  }

  console.log('Fetching fresh fire data from NASA FIRMS');

  try {
    // Use VIIRS_NOAA20_NRT for near real-time data (last 7 days)
    const url = `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${nasaApiKey}/VIIRS_NOAA20_NRT/${AUSTRALIA_BBOX}/7`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'PropGuard-AI/1.0'
      },
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      throw new Error(`NASA FIRMS API returned status ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    const fireData = parseFireCSV(csvText);

    // Cache the data
    fireDataCache = {
      data: fireData,
      timestamp: now,
      date: today
    };

    console.log(`Fetched ${fireData.length} fire records from NASA FIRMS`);
    return fireData;

  } catch (error) {
    console.error('Error fetching NASA fire data:', error);
    
    // Return cached data if available, otherwise empty array
    if (fireDataCache && fireDataCache.data) {
      console.log('Using stale cached data due to API error');
      return fireDataCache.data;
    }
    
    return [];
  }
}

function parseFireCSV(csvText: string): FireData[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',');
  const fireData: FireData[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    
    try {
      const fire: any = {};
      headers.forEach((header, index) => {
        fire[header.trim()] = values[index]?.trim() || '';
      });

      const lat = parseFloat(fire.latitude);
      const lon = parseFloat(fire.longitude);
      const frp = parseFloat(fire.frp) || 0;

      if (!isNaN(lat) && !isNaN(lon)) {
        fireData.push({
          latitude: lat,
          longitude: lon,
          frp: frp,
          acq_date: fire.acq_date || '',
          confidence: fire.confidence || 'unknown'
        });
      }
    } catch (error) {
      // Skip invalid rows
      continue;
    }
  }

  return fireData;
}

function calculateFireRisk(
  propertyLat: number, 
  propertyLng: number, 
  fireData: FireData[], 
  radiusKm: number
): FireRiskAssessment {
  
  if (!fireData || fireData.length === 0) {
    return {
      riskScore: 0.1,
      riskLevel: 'Low',
      nearbyFires: 0,
      closestFireDistance: 0,
      totalFRP: 0,
      dataSource: 'nasa_no_data',
      lastUpdated: new Date().toISOString()
    };
  }

  // Calculate distances and filter nearby fires
  const nearbyFires: (FireData & { distance: number })[] = [];
  
  for (const fire of fireData) {
    const distance = haversineDistance(propertyLat, propertyLng, fire.latitude, fire.longitude);
    
    if (distance <= radiusKm) {
      nearbyFires.push({
        ...fire,
        distance
      });
    }
  }

  if (nearbyFires.length === 0) {
    return {
      riskScore: 0.1,
      riskLevel: 'Low',
      nearbyFires: 0,
      closestFireDistance: 0,
      totalFRP: 0,
      dataSource: 'nasa_no_nearby_fires',
      lastUpdated: new Date().toISOString()
    };
  }

  // Calculate risk components
  const minDistance = Math.min(...nearbyFires.map(f => f.distance));
  const numFires = nearbyFires.length;
  const totalFRP = nearbyFires.reduce((sum, f) => sum + f.frp, 0);

  // Risk scoring (0-1 scale)
  const distanceScore = 1 / (minDistance + 1); // Closer fires = higher risk
  const countScore = Math.min(numFires / 20, 1.0); // Normalize to max 20 fires
  const intensityScore = Math.min(totalFRP / 1000, 1.0); // Normalize to max 1000 MW

  // Weighted combination
  const riskScore = Math.min(
    0.5 * distanceScore + 0.3 * countScore + 0.2 * intensityScore,
    1.0
  );

  // Determine risk level
  let riskLevel: string;
  if (riskScore >= 0.7) riskLevel = 'High';
  else if (riskScore >= 0.4) riskLevel = 'Medium';
  else riskLevel = 'Low';

  return {
    riskScore: Math.round(riskScore * 100) / 100,
    riskLevel,
    nearbyFires: numFires,
    closestFireDistance: Math.round(minDistance * 10) / 10,
    totalFRP: Math.round(totalFRP * 10) / 10,
    dataSource: 'nasa_firms',
    lastUpdated: new Date().toISOString()
  };
}

// Haversine formula for calculating distance between two points on Earth
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}