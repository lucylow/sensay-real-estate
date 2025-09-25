# Multimodal AI Integration - HeyGen Avatar + Eleven Labs Voice

This document provides comprehensive information about the multimodal AI integration combining HeyGen Interactive Avatar and Eleven Labs Text-to-Speech in the Sensay Real Estate platform.

## Overview

The multimodal AI integration provides an engaging AI assistant named "Alex" that combines:
- **HeyGen Interactive Avatar**: Video avatars with lip-sync and expressions
- **Eleven Labs Voice**: Natural AI speech with professional Australian accent
- **Sensay Platform**: Chatbot logic and multi-channel deployment

This creates a lifelike real estate expert that can provide property analysis, market insights, and investment guidance through natural conversation.

## Configuration

### Environment Variables

You need to set the following environment variables:

```bash
# HeyGen API Configuration
VITE_HEYGEN_API_KEY=your-heygen-api-key
VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Eleven Labs API Configuration
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key
VITE_ELEVENLABS_VOICE_ID=alex-professional-australian

# Backend Configuration (for Python backend)
HEYGEN_API_KEY=your-heygen-api-key
HEYGEN_AVATAR_ID=Marianne_CasualLook_public
ELEVENLABS_API_KEY=your-elevenlabs-api-key
ELEVENLABS_VOICE_ID=alex-professional-australian
```

### Getting Your HeyGen API Key

1. **Sign Up/Login**: Go to [HeyGen's website](https://heygen.com) and sign up or log in
2. **Team Plan**: Ensure you have a Team Plan to access Interactive Avatar features
3. **API Settings**: 
   - Click on your profile → 'Space Settings'
   - Click on 'API'
   - Click 'Activate' to generate your API key
   - Copy the API key securely

### Getting Your Avatar ID

1. **Access Interactive Avatar**: Go to [HeyGen Labs](https://labs.heygen.com/interactive-avatar)
2. **Select Avatar**: Click on 'Public Avatars' and find Marianne_CasualLook_public
3. **Get Avatar ID**: Click the 3 dots → 'Get Avatar ID' and copy it

## Architecture

The integration consists of multiple layers:

### Frontend Components

1. **VideoAvatar Component** (`src/components/VideoAvatar.tsx`)
   - Standalone video avatar player
   - Handles video generation and playback
   - Shows configuration status and errors

2. **EnhancedAIAssistant Component** (`src/components/EnhancedAIAssistant.tsx`)
   - Combines chat interface with video avatar
   - Tabbed interface for chat and video modes
   - Automatic video generation for longer responses

### Backend Services

1. **HeyGen Service** (`src/config/heygen.ts`)
   - Frontend service for direct API calls
   - Configuration validation and error handling

2. **Backend API** (`propguard-ai-backend/src/routes/heygen.py`)
   - Flask routes for HeyGen integration
   - Proxy service for secure API key handling
   - Health checks and status monitoring

3. **Supabase Edge Function** (`supabase/functions/heygen-avatar/index.ts`)
   - Alternative backend implementation
   - Serverless video generation

## API Endpoints

### Backend Endpoints (Python Flask)

- `GET /api/heygen/health` - Health check
- `POST /api/heygen/generate` - Generate avatar video
- `GET /api/heygen/status/{task_id}` - Get task status
- `GET /api/heygen/avatars` - List available avatars
- `GET /api/heygen/config` - Get configuration status

### Supabase Edge Function

- `POST /functions/v1/heygen-avatar` - Generate avatar video

## Usage Examples

### Basic Video Generation

```typescript
import { heyGenService } from '@/config/heygen';

const response = await heyGenService.generateAvatarVideo(
  "Hello! I'm your PropGuard AI assistant. How can I help you today?"
);

if (response.success) {
  console.log('Video URL:', response.video_url);
} else {
  console.error('Error:', response.error);
}
```

### Using the Enhanced AI Assistant

```tsx
import { EnhancedAIAssistant } from '@/components/EnhancedAIAssistant';

function PropertyPage() {
  return (
    <EnhancedAIAssistant
      property={propertyData}
      analysis={analysisData}
      className="w-full"
    />
  );
}
```

### Backend API Usage

```typescript
import { propGuardAPI } from '@/config/api';

// Generate video
const response = await propGuardAPI.generateAvatarVideo(
  "This property shows excellent investment potential...",
  "en_us_female_001"
);

// Check status
const status = await propGuardAPI.getAvatarTaskStatus(response.task_id);
```

## Features

### Video Avatar Features

- **Interactive Video Generation**: Creates personalized video responses
- **Multiple Voice Options**: Supports different voice types
- **Quality Control**: High-quality 16:9 ratio videos
- **Error Handling**: Comprehensive error reporting and fallbacks
- **Configuration Validation**: Checks for proper API setup

### Integration Features

- **Seamless Chat Integration**: Video avatar works alongside text chat
- **Automatic Video Generation**: Long responses automatically trigger video creation
- **Health Monitoring**: Real-time status of HeyGen API connectivity
- **Fallback Support**: Graceful degradation when video generation fails

## Error Handling

The integration includes comprehensive error handling:

1. **Configuration Errors**: Missing API keys or avatar IDs
2. **API Errors**: Network issues, rate limits, or service outages
3. **Video Generation Errors**: Failed video creation or processing
4. **Timeout Handling**: Automatic retries and timeout management

## Security Considerations

1. **API Key Protection**: Backend proxy keeps API keys secure
2. **Input Validation**: All text inputs are validated and sanitized
3. **Rate Limiting**: Built-in rate limiting to prevent abuse
4. **Error Sanitization**: Sensitive information is not exposed in error messages

## Performance Optimization

1. **Lazy Loading**: Video components load only when needed
2. **Caching**: Video URLs are cached to prevent regeneration
3. **Background Processing**: Video generation happens asynchronously
4. **Resource Management**: Proper cleanup of video resources

## Troubleshooting

### Common Issues

1. **"API not configured" Error**
   - Check environment variables are set correctly
   - Verify API key is valid and active
   - Ensure avatar ID is correct

2. **Video Generation Fails**
   - Check HeyGen service status
   - Verify text length is appropriate
   - Check network connectivity

3. **Slow Video Generation**
   - Normal for complex requests
   - Consider using shorter text for faster generation
   - Check HeyGen service load

### Debug Mode

Enable debug logging by setting:
```bash
DEBUG=heygen:*
```

## Monitoring and Analytics

The integration includes monitoring capabilities:

1. **Health Checks**: Regular API connectivity monitoring
2. **Usage Metrics**: Track video generation success rates
3. **Performance Metrics**: Monitor generation times and errors
4. **User Analytics**: Track video interaction patterns

## Future Enhancements

Planned improvements include:

1. **Custom Avatar Support**: Allow users to create custom avatars
2. **Real-time Streaming**: Live video avatar interactions
3. **Multi-language Support**: Additional language and voice options
4. **Advanced Analytics**: Detailed usage and performance analytics
5. **Mobile Optimization**: Enhanced mobile video playback

## Support

For technical support or questions about the HeyGen integration:

1. Check this documentation first
2. Review error logs and console output
3. Verify configuration and API credentials
4. Test with simple text inputs first
5. Contact the development team with specific error messages

## Changelog

- **v1.0.0**: Initial HeyGen integration with basic video generation
- **v1.1.0**: Added Enhanced AI Assistant with tabbed interface
- **v1.2.0**: Implemented backend proxy and health monitoring
- **v1.3.0**: Added Supabase Edge Function support
- **v1.4.0**: Enhanced error handling and retry logic
