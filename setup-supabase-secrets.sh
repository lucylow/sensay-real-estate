#!/bin/bash

# Supabase Environment Variables Configuration Script
# This script helps configure environment variables for Supabase functions

echo "🔧 Supabase Environment Variables Configuration"
echo "================================================"
echo "This script will help you set up environment variables for Supabase functions"
echo ""

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed."
    echo "Please install it first: npm install -g supabase"
    echo "Then run: supabase login"
    exit 1
fi

# Check if user is logged in
if ! supabase projects list &> /dev/null; then
    echo "❌ Not logged in to Supabase."
    echo "Please run: supabase login"
    exit 1
fi

echo "✅ Supabase CLI is installed and you're logged in"
echo ""

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    echo "📝 Loading environment variables from .env file..."
    source .env
    echo "✅ Environment variables loaded"
else
    echo "⚠️  No .env file found. Please provide the values manually."
fi

echo ""
echo "🔑 Setting up Supabase secrets..."
echo ""

# Eleven Labs configuration
if [ -n "$ELEVENLABS_API_KEY" ]; then
    echo "Setting ELEVENLABS_API_KEY..."
    supabase secrets set ELEVENLABS_API_KEY="$ELEVENLABS_API_KEY"
    echo "✅ ELEVENLABS_API_KEY set"
else
    echo "⚠️  ELEVENLABS_API_KEY not found in environment"
fi

if [ -n "$ELEVENLABS_VOICE_ID" ]; then
    echo "Setting ELEVENLABS_VOICE_ID..."
    supabase secrets set ELEVENLABS_VOICE_ID="$ELEVENLABS_VOICE_ID"
    echo "✅ ELEVENLABS_VOICE_ID set"
else
    echo "⚠️  ELEVENLABS_VOICE_ID not found in environment"
fi

# HeyGen configuration
if [ -n "$HEYGEN_API_KEY" ]; then
    echo "Setting HEYGEN_API_KEY..."
    supabase secrets set HEYGEN_API_KEY="$HEYGEN_API_KEY"
    echo "✅ HEYGEN_API_KEY set"
else
    echo "⚠️  HEYGEN_API_KEY not found in environment"
fi

if [ -n "$HEYGEN_AVATAR_ID" ]; then
    echo "Setting HEYGEN_AVATAR_ID..."
    supabase secrets set HEYGEN_AVATAR_ID="$HEYGEN_AVATAR_ID"
    echo "✅ HEYGEN_AVATAR_ID set"
else
    echo "⚠️  HEYGEN_AVATAR_ID not found in environment"
fi

# Other required variables
if [ -n "$REALTY_BASE_AU_API_KEY" ]; then
    echo "Setting REALTY_BASE_AU_API_KEY..."
    supabase secrets set REALTY_BASE_AU_API_KEY="$REALTY_BASE_AU_API_KEY"
    echo "✅ REALTY_BASE_AU_API_KEY set"
else
    echo "⚠️  REALTY_BASE_AU_API_KEY not found in environment"
fi

if [ -n "$MAPBOX_PUBLIC_TOKEN" ]; then
    echo "Setting MAPBOX_PUBLIC_TOKEN..."
    supabase secrets set MAPBOX_PUBLIC_TOKEN="$MAPBOX_PUBLIC_TOKEN"
    echo "✅ MAPBOX_PUBLIC_TOKEN set"
else
    echo "⚠️  MAPBOX_PUBLIC_TOKEN not found in environment"
fi

if [ -n "$NASA_API_KEY" ]; then
    echo "Setting NASA_API_KEY..."
    supabase secrets set NASA_API_KEY="$NASA_API_KEY"
    echo "✅ NASA_API_KEY set"
else
    echo "⚠️  NASA_API_KEY not found in environment"
fi

echo ""
echo "📋 Verification"
echo "==============="
echo "Current Supabase secrets:"
supabase secrets list

echo ""
echo "🎉 Configuration complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your Supabase functions: supabase functions deploy"
echo "2. Test your functions using the API testing components"
echo "3. Check Supabase logs for any errors: supabase functions logs"
