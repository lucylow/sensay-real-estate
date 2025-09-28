# Supabase Environment Variables Setup Guide

This guide explains how to properly configure environment variables for Supabase functions in the Sensay Real Estate platform.

## Required Supabase Environment Variables

The following environment variables need to be configured in your Supabase project for the Sensay features to work properly:

### Eleven Labs Configuration
```bash
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=alex-professional-australian
```

### HeyGen Configuration
```bash
HEYGEN_API_KEY=your_heygen_api_key_here
HEYGEN_AVATAR_ID=Marianne_CasualLook_public
```

### Other Required Variables
```bash
REALTY_BASE_AU_API_KEY=your_realty_base_api_key
MAPBOX_PUBLIC_TOKEN=your_mapbox_token
NASA_API_KEY=your_nasa_api_key
```

## How to Set Supabase Environment Variables

### Method 1: Using Supabase CLI (Recommended)

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Set environment variables**:
   ```bash
   supabase secrets set ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   supabase secrets set ELEVENLABS_VOICE_ID=alex-professional-australian
   supabase secrets set HEYGEN_API_KEY=your_heygen_api_key_here
   supabase secrets set HEYGEN_AVATAR_ID=Marianne_CasualLook_public
   supabase secrets set REALTY_BASE_AU_API_KEY=your_realty_base_api_key
   supabase secrets set MAPBOX_PUBLIC_TOKEN=your_mapbox_token
   supabase secrets set NASA_API_KEY=your_nasa_api_key
   ```

4. **Verify your secrets**:
   ```bash
   supabase secrets list
   ```

### Method 2: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **Edge Functions**
3. Click on **Environment Variables**
4. Add each variable with its corresponding value

## Frontend Environment Variables

For the frontend (Vite), you also need these variables in your `.env` file:

```bash
# Eleven Labs (Frontend)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VITE_ELEVENLABS_VOICE_ID=alex-professional-australian

# HeyGen (Frontend)
VITE_HEYGEN_API_KEY=your_heygen_api_key_here
VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Important Notes

### Variable Naming Convention
- **Supabase Functions**: Use `ELEVENLABS_API_KEY` (no underscore)
- **Frontend**: Use `VITE_ELEVENLABS_API_KEY` (no underscore)
- **Backend Python**: Use `ELEVENLABS_API_KEY` (no underscore)

### Common Issues

1. **Missing Environment Variables**: If Supabase functions return "API key not configured" errors, ensure the environment variables are set in Supabase.

2. **Incorrect Variable Names**: Make sure you're using the exact variable names as shown above. The code looks for `ELEVENLABS_API_KEY`, not `ELEVEN_LABS_API_KEY`.

3. **Frontend vs Backend**: Frontend variables need the `VITE_` prefix, while Supabase functions use the raw variable names.

## Testing Your Configuration

After setting up the environment variables, test them using the API testing components:

1. **Frontend Testing**: Navigate to the API testing page in your app
2. **Supabase Function Testing**: Use the Supabase dashboard to test individual functions
3. **Manual Testing**: Check the browser console for any configuration errors

## Troubleshooting

### Supabase Function Errors
- Check Supabase logs for environment variable issues
- Verify variable names match exactly what's in the code
- Ensure variables are set at the project level, not locally

### Frontend Errors
- Check that `.env` file is in the project root
- Restart the development server after adding new variables
- Verify `VITE_` prefix is used for frontend variables

## Security Best Practices

1. **Never commit API keys** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** for security
4. **Use Supabase secrets** for sensitive backend variables
5. **Keep frontend variables** in `.env` files (they're exposed to the client)

## Deployment Considerations

When deploying to production:

1. **Set production environment variables** in your hosting platform
2. **Update Supabase secrets** with production API keys
3. **Verify all functions** work with production configuration
4. **Test end-to-end functionality** before going live
