# ElevenLabs API Integration Setup Guide

This guide will help you set up ElevenLabs API integration for voice synthesis in your Sensay Real Estate application.

## Prerequisites

1. An ElevenLabs account (sign up at [elevenlabs.io](https://elevenlabs.io))
2. An ElevenLabs API key

## Setup Steps

### 1. Get Your ElevenLabs API Key

1. Sign up for an account at [elevenlabs.io](https://elevenlabs.io)
2. Go to your profile settings
3. Navigate to the API Keys section
4. Create a new API key
5. Copy the API key (it starts with something like `sk_...`)

### 2. Configure Environment Variables

Add the following environment variable to your `.env` file:

```bash
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

Replace `your_elevenlabs_api_key_here` with your actual API key.

### 3. Restart Your Development Server

After adding the environment variable, restart your development server:

```bash
npm run dev
# or
yarn dev
```

## Features Available

Once configured, you'll have access to:

### 🎤 Text-to-Speech (TTS)
- Convert AI assistant responses to natural-sounding speech
- Multiple voice options with different characteristics
- Adjustable voice settings (stability, similarity, style)

### 🎭 Voice Cloning
- Create custom voices from audio samples
- Upload 1-25 audio files (max 25MB each)
- Support for various audio formats (MP3, WAV, M4A, FLAC, OGG)

### 🎵 Audio Playback Controls
- Queue management for multiple audio tracks
- Playback controls (play, pause, stop, skip)
- Volume and speed adjustment
- Progress tracking

### ⚙️ Voice Customization
- Voice selection from available voices
- Real-time voice settings adjustment
- Preview functionality
- Voice settings persistence

## Usage in Components

### Basic Usage

```tsx
import { useElevenLabs } from '@/hooks/useElevenLabs';

function MyComponent() {
  const { speak, isConfigured, selectedVoiceId } = useElevenLabs();
  
  const handleSpeak = async () => {
    if (isConfigured) {
      await speak("Hello, welcome to Sensay Real Estate!");
    }
  };
  
  return (
    <button onClick={handleSpeak}>
      Speak Text
    </button>
  );
}
```

### Voice Settings Component

```tsx
import VoiceSelector from '@/components/VoiceSelector';

function VoiceSettings() {
  return (
    <VoiceSelector
      onVoiceChange={(voiceId) => console.log('Voice changed:', voiceId)}
      onSettingsChange={(settings) => console.log('Settings changed:', settings)}
    />
  );
}
```

### Audio Player Component

```tsx
import AudioPlayer from '@/components/AudioPlayer';

function AudioControls() {
  return <AudioPlayer showQueue={true} />;
}
```

### Voice Cloning

```tsx
import VoiceCloner from '@/components/VoiceCloner';

function CloneVoice() {
  return (
    <VoiceCloner
      onVoiceCreated={(voiceId) => console.log('Voice created:', voiceId)}
    />
  );
}
```

## API Limits and Usage

- **Free Tier**: Limited characters per month
- **Paid Plans**: Higher character limits and additional features
- **Voice Cloning**: Requires paid subscription
- **Character Usage**: Tracked in the voice settings panel

## Troubleshooting

### Common Issues

1. **"ElevenLabs API not configured"**
   - Ensure `VITE_ELEVENLABS_API_KEY` is set in your `.env` file
   - Restart your development server after adding the environment variable

2. **"Failed to initialize ElevenLabs service"**
   - Check if your API key is valid
   - Ensure you have an active ElevenLabs account
   - Check your internet connection

3. **Audio not playing**
   - Check browser audio permissions
   - Ensure audio files are being generated successfully
   - Check browser console for errors

4. **Voice cloning fails**
   - Ensure you have a paid ElevenLabs subscription
   - Check audio file requirements (clear speech, minimal background noise)
   - Verify file format and size limits

### Debug Mode

To enable debug logging, add this to your browser console:

```javascript
localStorage.setItem('elevenlabs-debug', 'true');
```

## Support

- ElevenLabs Documentation: [docs.elevenlabs.io](https://docs.elevenlabs.io)
- ElevenLabs Community: [community.elevenlabs.io](https://community.elevenlabs.io)
- Sensay Support: Contact your development team

## Security Notes

- Never commit your API key to version control
- Use environment variables for all sensitive configuration
- Regularly rotate your API keys
- Monitor your usage to avoid unexpected charges
