#!/bin/bash

# Multimodal AI Setup Script for Sensay Real Estate
# This script helps configure HeyGen Avatar and Eleven Labs Voice integration

echo "🤖 Multimodal AI Setup for Sensay Real Estate"
echo "=============================================="
echo "Configuring HeyGen Interactive Avatar + Eleven Labs Voice"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    touch .env
    echo "# Environment Variables for Sensay Real Estate" >> .env
    echo "" >> .env
else
    echo "✅ .env file found"
fi

echo ""
echo "🔧 HeyGen Avatar Configuration"
echo "Please provide the following information:"
echo ""

# Get HeyGen API Key
read -p "Enter your HeyGen API Key: " HEYGEN_API_KEY
if [ -n "$HEYGEN_API_KEY" ]; then
    # Remove existing HEYGEN_API_KEY if it exists
    grep -v "^VITE_HEYGEN_API_KEY=" .env > .env.tmp && mv .env.tmp .env
    echo "VITE_HEYGEN_API_KEY=$HEYGEN_API_KEY" >> .env
    echo "✅ HeyGen API Key added to .env"
else
    echo "⚠️  No API key provided. You can add it later to .env file"
fi

# Get Avatar ID
read -p "Enter your Avatar ID (or press Enter for default 'Marianne_CasualLook_public'): " HEYGEN_AVATAR_ID
if [ -z "$HEYGEN_AVATAR_ID" ]; then
    HEYGEN_AVATAR_ID="Marianne_CasualLook_public"
fi

# Remove existing HEYGEN_AVATAR_ID if it exists
grep -v "^VITE_HEYGEN_AVATAR_ID=" .env > .env.tmp && mv .env.tmp .env
echo "VITE_HEYGEN_AVATAR_ID=$HEYGEN_AVATAR_ID" >> .env
echo "✅ Avatar ID set to: $HEYGEN_AVATAR_ID"

echo ""
echo "🎤 Eleven Labs Voice Configuration"
echo "Please provide the following information:"
echo ""

# Get Eleven Labs API Key
read -p "Enter your Eleven Labs API Key: " ELEVENLABS_API_KEY
if [ -n "$ELEVENLABS_API_KEY" ]; then
    # Remove existing ELEVENLABS_API_KEY if it exists
    grep -v "^VITE_ELEVENLABS_API_KEY=" .env > .env.tmp && mv .env.tmp .env
    echo "VITE_ELEVENLABS_API_KEY=$ELEVENLABS_API_KEY" >> .env
    echo "✅ Eleven Labs API Key added to .env"
else
    echo "⚠️  No Eleven Labs API key provided. You can add it later to .env file"
fi

# Get Voice ID
read -p "Enter your Voice ID for Alex persona (or press Enter for default): " ELEVENLABS_VOICE_ID
if [ -z "$ELEVENLABS_VOICE_ID" ]; then
    ELEVENLABS_VOICE_ID="alex-professional-australian"
fi

# Remove existing ELEVENLABS_VOICE_ID if it exists
grep -v "^VITE_ELEVENLABS_VOICE_ID=" .env > .env.tmp && mv .env.tmp .env
echo "VITE_ELEVENLABS_VOICE_ID=$ELEVENLABS_VOICE_ID" >> .env
echo "✅ Voice ID set to: $ELEVENLABS_VOICE_ID"

echo ""
echo "🐍 Backend Configuration"
echo "Adding backend environment variables..."

# Add backend variables
grep -v "^HEYGEN_API_KEY=" .env > .env.tmp && mv .env.tmp .env
grep -v "^HEYGEN_AVATAR_ID=" .env > .env.tmp && mv .env.tmp .env
grep -v "^ELEVENLABS_API_KEY=" .env > .env.tmp && mv .env.tmp .env
grep -v "^ELEVENLABS_VOICE_ID=" .env > .env.tmp && mv .env.tmp .env

if [ -n "$HEYGEN_API_KEY" ]; then
    echo "HEYGEN_API_KEY=$HEYGEN_API_KEY" >> .env
    echo "HEYGEN_AVATAR_ID=$HEYGEN_AVATAR_ID" >> .env
    echo "✅ HeyGen backend variables added"
else
    echo "⚠️  HeyGen backend variables not added (no API key provided)"
fi

if [ -n "$ELEVENLABS_API_KEY" ]; then
    echo "ELEVENLABS_API_KEY=$ELEVENLABS_API_KEY" >> .env
    echo "ELEVENLABS_VOICE_ID=$ELEVENLABS_VOICE_ID" >> .env
    echo "✅ Eleven Labs backend variables added"
else
    echo "⚠️  Eleven Labs backend variables not added (no API key provided)"
fi

echo ""
echo "📋 Configuration Summary"
echo "======================="
echo "Frontend Variables:"
echo "  - VITE_HEYGEN_API_KEY: $(if [ -n "$HEYGEN_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - VITE_HEYGEN_AVATAR_ID: $HEYGEN_AVATAR_ID"
echo "  - VITE_ELEVENLABS_API_KEY: $(if [ -n "$ELEVENLABS_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - VITE_ELEVENLABS_VOICE_ID: $ELEVENLABS_VOICE_ID"
echo ""
echo "Backend Variables:"
echo "  - HEYGEN_API_KEY: $(if [ -n "$HEYGEN_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - HEYGEN_AVATAR_ID: $HEYGEN_AVATAR_ID"
echo "  - ELEVENLABS_API_KEY: $(if [ -n "$ELEVENLABS_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - ELEVENLABS_VOICE_ID: $ELEVENLABS_VOICE_ID"
echo ""
echo "Supabase Functions Variables:"
echo "  - HEYGEN_API_KEY: $(if [ -n "$HEYGEN_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - HEYGEN_AVATAR_ID: $HEYGEN_AVATAR_ID"
echo "  - ELEVENLABS_API_KEY: $(if [ -n "$ELEVENLABS_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - ELEVENLABS_VOICE_ID: $ELEVENLABS_VOICE_ID"

echo ""
echo "🚀 Next Steps"
echo "============="
echo "1. Restart your development server to load the new environment variables"
echo "2. Configure Supabase environment variables:"
echo "   Run: supabase secrets set ELEVENLABS_API_KEY=$ELEVENLABS_API_KEY"
echo "   Run: supabase secrets set ELEVENLABS_VOICE_ID=$ELEVENLABS_VOICE_ID"
echo "   Run: supabase secrets set HEYGEN_API_KEY=$HEYGEN_API_KEY"
echo "   Run: supabase secrets set HEYGEN_AVATAR_ID=$HEYGEN_AVATAR_ID"
echo "3. Test your configuration using the API testing components"
echo "4. Visit /multimodal-test to test the full integration"
echo "5. Visit /heygen-test to test HeyGen avatar only"
echo "6. Check the browser console for any configuration errors"
echo ""
echo "📚 Documentation"
echo "==============="
echo "For detailed setup instructions, see: HEYGEN_INTEGRATION.md"
echo ""
echo "🔗 Useful Links"
echo "==============="
echo "- HeyGen Dashboard: https://app.heygen.com"
echo "- HeyGen Interactive Avatar: https://labs.heygen.com/interactive-avatar"
echo "- HeyGen API Documentation: https://docs.heygen.com"
echo "- Eleven Labs Dashboard: https://elevenlabs.io"
echo "- Eleven Labs API Documentation: https://docs.elevenlabs.io"
echo "- Sensay Platform: https://sensay.io"
echo ""

if [ -z "$HEYGEN_API_KEY" ] || [ -z "$ELEVENLABS_API_KEY" ]; then
    echo "⚠️  IMPORTANT: You still need to add your API keys to the .env file"
    if [ -z "$HEYGEN_API_KEY" ]; then
        echo "   Edit .env and set VITE_HEYGEN_API_KEY=your-actual-api-key"
    fi
    if [ -z "$ELEVENLABS_API_KEY" ]; then
        echo "   Edit .env and set VITE_ELEVENLABS_API_KEY=your-actual-api-key"
    fi
fi

echo "✅ Setup complete!"
