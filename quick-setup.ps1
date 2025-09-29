# Quick Supabase Setup for HeyGen
Write-Host "🚀 Quick Supabase Setup for HeyGen" -ForegroundColor Cyan

# Prompt for API keys
$heygenKey = Read-Host "Enter HeyGen API Key"
$elevenLabsKey = Read-Host "Enter ElevenLabs API Key"

# Set secrets
if ($heygenKey) {
    Write-Host "Setting HeyGen secrets..." -ForegroundColor Yellow
    supabase secrets set HEYGEN_API_KEY=$heygenKey
    supabase secrets set HEYGEN_AVATAR_ID=Marianne_CasualLook_public
}

if ($elevenLabsKey) {
    Write-Host "Setting ElevenLabs secrets..." -ForegroundColor Yellow
    supabase secrets set ELEVENLABS_API_KEY=$elevenLabsKey
    supabase secrets set ELEVENLABS_VOICE_ID=alex-professional-australian
}

Write-Host "✅ Done! Create .env file and restart dev server." -ForegroundColor Green
