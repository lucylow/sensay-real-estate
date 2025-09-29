# Supabase HeyGen Setup Instructions

## Step 1: Create Environment File

Create a `.env` file in your project root with the following content:

```bash
# Supabase Configuration (Required)
VITE_SUPABASE_URL=https://mpbwpixpuonkczxgkjks.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYndwaXhwdW9ua2N6eGdramtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzMzMTUsImV4cCI6MjA3MDI0OTMxNX0.fBht4WXv01R_kWwAao_I9RDuBtDm57Xyb2VBaHVaQOc

# HeyGen API Configuration (Required - Replace with your actual keys)
VITE_HEYGEN_API_KEY=your-heygen-api-key-here
VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Eleven Labs API Configuration (Required - Replace with your actual keys)
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key-here
VITE_ELEVENLABS_VOICE_ID=alex-professional-australian

# Sensay Platform Configuration (Optional)
VITE_SENSAY_API_KEY=your-sensay-api-key-here
VITE_SENSAY_ORG_ID=your-organization-id-here
VITE_SENSAY_REPLICA_ID=propguard-real-estate-agent

# Development Settings
VITE_USE_MOCK_DATA=true
VITE_ENVIRONMENT=development
```

## Step 2: Set Supabase Edge Function Secrets

Run these commands to configure Supabase Edge Functions:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Set HeyGen secrets in Supabase
supabase secrets set HEYGEN_API_KEY=your-actual-heygen-api-key
supabase secrets set HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Set ElevenLabs secrets in Supabase
supabase secrets set ELEVENLABS_API_KEY=your-actual-elevenlabs-api-key
supabase secrets set ELEVENLABS_VOICE_ID=alex-professional-australian

# Verify secrets are saved
supabase secrets list
```

## Step 3: Getting API Keys

### HeyGen API Key:
1. Go to https://heygen.com and sign up/login
2. Navigate to Space Settings → API
3. Click "Activate" to generate your API key
4. Copy the API key and replace `your-heygen-api-key-here`

### Eleven Labs API Key:
1. Go to https://elevenlabs.io and sign up/login
2. Navigate to your profile → API key section
3. Create or copy your API key
4. Replace `your-elevenlabs-api-key-here`

## Step 4: Test Configuration

After setting up the environment variables:

1. Restart your development server: `npm run dev`
2。 Go to http://localhost:8081/heygen-test
3. Run the health check to verify API configuration
4. Test video generation with sample text

## Troubleshooting

If you get "HeyGen API key not configured" error:
- Verify the `.env` file exists and has the correct variable names
- Make sure you've set the Supabase secrets correctly
- Restart the development server after changes
- Check the browser console for any API errors
