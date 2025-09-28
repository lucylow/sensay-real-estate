# Sensay API Configuration via Supabase

This guide explains how to properly configure SENSAY_API_KEY and SENSAY_ORGANIZATION_ID through Supabase Edge Functions.

## Environment Variables Setup

### 1. Supabase Dashboard Configuration

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Edge Functions**
3. Add the following environment variables:

```bash
SENSAY_API_KEY=your_sensay_api_key_here
SENSAY_ORGANIZATION_ID=your_sensay_organization_id_here
```

### 2. Local Development (.env.local)

Create a `.env.local` file in your project root:

```bash
# Sensay API Configuration
VITE_SENSAY_API_KEY=your_sensay_api_key_here
VITE_SENSAY_ORG_ID=your_sensay_organization_id_here

# Supabase Configuration
VITE_SUPABASE_URL=https://mpbwpixpuonkczxgkjks.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYndwaXhwdW9ua2N6eGdramtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzMzMTUsImV4cCI6MjA3MDI0OTMxNX0.fBht4WXv01R_kWwAao_I9RDuBtDm57Xyb2VBaHVaQOc
```

### 3. Production Environment Variables

For production deployment, set these environment variables in your hosting platform:

```bash
# Sensay API Configuration
SENSAY_API_KEY=your_production_sensay_api_key
SENSAY_ORGANIZATION_ID=your_production_sensay_org_id

# Supabase Configuration  
SUPABASE_URL=https://mpbwpixpuonkczxgkjks.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYndwaXhwdW9ua2N6eGdramtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzMzMTUsImV4cCI6MjA3MDI0OTMxNX0.fBht4WXv01R_kWwAao_I9RDuBtDm57Xyb2VBaHVaQOc
```

## Architecture Overview

The Sensay integration now works through Supabase Edge Functions for better security and reliability:

```mermaid
graph TB
    A[Frontend App] --> B[Supabase Edge Function]
    B --> C[Sensay API]
    B --> D[Fallback AI Response]
    
    E[Environment Variables] --> B
    F[User Credentials] --> B
    
    B --> G[Response Processing]
    G --> A
```

## How It Works

1. **Frontend Request**: The frontend sends chat requests to the Supabase Edge Function
2. **Credential Handling**: The Edge Function uses environment variables for Sensay API credentials
3. **API Call**: The function makes authenticated requests to Sensay API
4. **Fallback**: If Sensay API fails, the function provides a fallback response
5. **Response**: Processed response is sent back to the frontend

## Security Benefits

- **API Key Protection**: Sensay API keys are stored securely in Supabase environment variables
- **No Client Exposure**: API keys are never exposed to the client-side code
- **Rate Limiting**: Supabase Edge Functions provide built-in rate limiting
- **Error Handling**: Graceful fallback when Sensay API is unavailable

## Testing the Integration

### 1. Test Supabase Function Directly

```bash
curl -X POST 'https://mpbwpixpuonkczxgkjks.supabase.co/functions/v1/sensay-chat' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR_SUPABASE_ANON_KEY' \
  -d '{
    "message": "Hello, can you help me analyze a property?",
    "context": {
      "property": {
        "address": "123 Collins Street, Melbourne VIC 3000"
      }
    }
  }'
```

### 2. Test Through Frontend

1. Start the development server: `npm run dev`
2. Navigate to the Sensay integration page
3. Enter your API credentials
4. Test the chat functionality

## Troubleshooting

### Common Issues

1. **Missing Environment Variables**
   - Ensure `SENSAY_API_KEY` and `SENSAY_ORGANIZATION_ID` are set in Supabase
   - Check that environment variables are properly configured

2. **API Key Invalid**
   - Verify your Sensay API key is correct
   - Check that the organization ID matches your Sensay account

3. **CORS Issues**
   - The Edge Function includes proper CORS headers
   - Ensure your frontend is making requests to the correct Supabase URL

4. **Fallback Responses**
   - If you see fallback responses, check Supabase logs for Sensay API errors
   - Verify your API credentials are working with Sensay directly

### Debugging Steps

1. Check Supabase Edge Function logs
2. Verify environment variables are set correctly
3. Test Sensay API credentials directly
4. Check network requests in browser dev tools

## Migration from Direct API Calls

The system has been updated to use Supabase Edge Functions instead of direct API calls:

- ✅ **Before**: Frontend → Sensay API (direct)
- ✅ **After**: Frontend → Supabase Edge Function → Sensay API

This provides better security, error handling, and fallback capabilities.
