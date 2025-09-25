#!/bin/bash

# HeyGen Integration Setup Script for Sensay Real Estate
# This script helps configure the HeyGen API integration

echo "🎬 HeyGen Interactive Avatar Setup for Sensay Real Estate"
echo "=================================================="
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
echo "🔧 HeyGen Configuration"
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
echo "🐍 Backend Configuration"
echo "Adding backend environment variables..."

# Add backend variables
grep -v "^HEYGEN_API_KEY=" .env > .env.tmp && mv .env.tmp .env
grep -v "^HEYGEN_AVATAR_ID=" .env > .env.tmp && mv .env.tmp .env

if [ -n "$HEYGEN_API_KEY" ]; then
    echo "HEYGEN_API_KEY=$HEYGEN_API_KEY" >> .env
    echo "HEYGEN_AVATAR_ID=$HEYGEN_AVATAR_ID" >> .env
    echo "✅ Backend environment variables added"
else
    echo "⚠️  Backend variables not added (no API key provided)"
fi

echo ""
echo "📋 Configuration Summary"
echo "======================="
echo "Frontend Variables:"
echo "  - VITE_HEYGEN_API_KEY: $(if [ -n "$HEYGEN_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - VITE_HEYGEN_AVATAR_ID: $HEYGEN_AVATAR_ID"
echo ""
echo "Backend Variables:"
echo "  - HEYGEN_API_KEY: $(if [ -n "$HEYGEN_API_KEY" ]; then echo "✅ Set"; else echo "❌ Not set"; fi)"
echo "  - HEYGEN_AVATAR_ID: $HEYGEN_AVATAR_ID"

echo ""
echo "🚀 Next Steps"
echo "============="
echo "1. Restart your development server to load the new environment variables"
echo "2. Visit /heygen-test to test the integration"
echo "3. Check the browser console for any configuration errors"
echo ""
echo "📚 Documentation"
echo "==============="
echo "For detailed setup instructions, see: HEYGEN_INTEGRATION.md"
echo ""
echo "🔗 Useful Links"
echo "==============="
echo "- HeyGen Dashboard: https://app.heygen.com"
echo "- Interactive Avatar: https://labs.heygen.com/interactive-avatar"
echo "- API Documentation: https://docs.heygen.com"
echo ""

if [ -z "$HEYGEN_API_KEY" ]; then
    echo "⚠️  IMPORTANT: You still need to add your HeyGen API key to the .env file"
    echo "   Edit .env and set VITE_HEYGEN_API_KEY=your-actual-api-key"
fi

echo "✅ Setup complete!"
