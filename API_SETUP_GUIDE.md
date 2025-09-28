# ElevenLabs & HeyGen API Setup Guide

This guide will help you set up and test the ElevenLabs and HeyGen APIs for the Sensay Real Estate platform, including proper Supabase configuration.

## 🚀 Quick Start

### 1. **Environment Variables Setup**

Create a `.env` file in your project root with the following variables:

```bash
# ElevenLabs API Configuration (Frontend)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
VITE_ELEVENLABS_VOICE_ID=alex-professional-australian

# HeyGen API Configuration (Frontend)
VITE_HEYGEN_API_KEY=your_heygen_api_key_here
VITE_HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Backend Configuration (Python backend)
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=alex-professional-australian
HEYGEN_API_KEY=your_heygen_api_key_here
HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Supabase Functions Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=alex-professional-australian
HEYGEN_API_KEY=your_heygen_api_key_here
HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Sensay Platform Configuration
VITE_SENSAY_API_KEY=your_sensay_api_key_here
VITE_SENSAY_ORG_ID=your_organization_id_here

# Optional: Enable mock mode for development
VITE_USE_MOCK_DATA=false
```

### 2. **Supabase Configuration**

Configure Supabase environment variables for your functions:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Set environment variables for Supabase functions
supabase secrets set ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
supabase secrets set ELEVENLABS_VOICE_ID=alex-professional-australian
supabase secrets set HEYGEN_API_KEY=your_heygen_api_key_here
supabase secrets set HEYGEN_AVATAR_ID=Marianne_CasualLook_public

# Verify your secrets
supabase secrets list
```

**Important**: Use the exact variable names shown above. The code looks for `ELEVENLABS_API_KEY` (not `ELEVEN_LABS_API_KEY`).

### 3. **Get API Keys**

#### **ElevenLabs API Key**
1. Visit [elevenlabs.io](https://elevenlabs.io)
2. Sign up for an account
3. Go to your profile settings
4. Copy your API key
5. Add it to your `.env` file

#### **HeyGen API Key**
1. Visit [heygen.com](https://heygen.com)
2. Sign up for an account
3. Go to your dashboard
4. Navigate to API settings
5. Copy your API key
6. Add it to your `.env` file

### 4. **Test Your Setup**

Run the development server and navigate to the API testing page:

```bash
npm run dev
# Navigate to http://localhost:5173/#api-testing
```

## 🔧 **API Testing Components**

### **APITestingComponent**
- Configure API keys dynamically
- Test ElevenLabs voice generation
- Test HeyGen video generation
- Real-time status monitoring

### **APIStatusDashboard**
- Live API status monitoring
- Automatic health checks
- Quick action buttons
- Error reporting

### **ComprehensiveSetupPage**
- Complete setup workflow
- Integration overview
- Feature documentation
- Troubleshooting guide

## 🎯 **Testing Your APIs**

### **Manual Testing**

1. **Open Browser Console**
2. **Run Test Script**:
   ```javascript
   // Import the test script
   import { runAPITests } from './src/utils/apiTestScript';
   
   // Run all tests
   runAPITests();
   ```

### **Component Testing**

1. **Navigate to API Testing Page**
2. **Enter your API keys**
3. **Click "Test All APIs"**
4. **Review results**

### **Expected Results**

#### **ElevenLabs Success**
- ✅ Voices API: X voices found
- ✅ TTS API: Audio generated successfully
- ✅ Audio playback working

#### **HeyGen Success**
- ✅ Video API: Video generation started
- ✅ Task ID: [generated_task_id]
- ✅ Status API: Video processing

## 🛠️ **Troubleshooting**

### **Common Issues**

#### **ElevenLabs API Errors**

**Error: "Invalid API key"**
- ✅ Check your API key is correct
- ✅ Ensure no extra spaces or characters
- ✅ Verify the key is active in your ElevenLabs account

**Error: "Rate limit exceeded"**
- ✅ Wait a few minutes before retrying
- ✅ Check your subscription limits
- ✅ Consider upgrading your plan

**Error: "No voices found"**
- ✅ Check your subscription tier
- ✅ Some voices may be premium-only
- ✅ Try with a different voice ID

#### **HeyGen API Errors**

**Error: "Invalid avatar ID"**
- ✅ Use a valid avatar ID like `Marianne_CasualLook_public`
- ✅ Check available avatars in your HeyGen dashboard
- ✅ Ensure the avatar is accessible with your plan

**Error: "Quota exceeded"**
- ✅ Check your monthly usage limits
- ✅ Wait for quota reset or upgrade plan
- ✅ Use mock data for development

**Error: "Video generation failed"**
- ✅ Check your text input length
- ✅ Ensure voice ID is valid
- ✅ Try with shorter text first

### **Debug Mode**

Enable debug logging by adding to your `.env`:

```bash
VITE_DEBUG_APIS=true
```

This will show detailed API request/response logs in the console.

## 📊 **API Status Monitoring**

### **Real-time Status**
- Green: API working correctly
- Red: API error or misconfigured
- Gray: API not configured
- Blue: Testing in progress

### **Health Checks**
- Automatic checks every 30 seconds
- Manual refresh available
- Detailed error reporting
- Performance metrics

## 🎨 **Integration Examples**

### **Voice Integration**
```typescript
import { elevenLabsService } from '@/config/elevenlabs';

// Generate voice for property analysis
const audioResult = await elevenLabsService.generateSpeech(
  "Property valuation: $850,000 with 92% confidence",
  "pNInz6obpgDQGcFmaJgB" // Voice ID
);

if (audioResult.success) {
  const audio = new Audio(audioResult.audio_url);
  audio.play();
}
```

### **Video Integration**
```typescript
import { heyGenService } from '@/config/heygen';

// Generate video presentation
const videoResult = await heyGenService.generateAvatarVideo(
  "Welcome to this property analysis",
  "en_us_female_001" // Voice ID
);

if (videoResult.success) {
  console.log('Video task ID:', videoResult.task_id);
  // Poll for completion status
}
```

### **Combined Integration**
```typescript
// Generate both voice and video for property presentation
const propertyText = "This property shows strong investment potential...";

// Generate voice
const audioResult = await elevenLabsService.generateSpeech(propertyText);

// Generate video
const videoResult = await heyGenService.generateAvatarVideo(propertyText);

// Both will be available for playback
```

## 🔐 **Security Best Practices**

### **API Key Management**
- ✅ Never commit API keys to version control
- ✅ Use environment variables
- ✅ Rotate keys regularly
- ✅ Use different keys for dev/prod

### **Rate Limiting**
- ✅ Implement proper rate limiting
- ✅ Cache responses when possible
- ✅ Handle quota exceeded gracefully
- ✅ Monitor usage patterns

### **Error Handling**
- ✅ Always handle API errors gracefully
- ✅ Provide fallback options
- ✅ Log errors for debugging
- ✅ Show user-friendly messages

## 📈 **Performance Optimization**

### **Caching**
- ✅ Cache voice settings
- ✅ Store generated audio URLs
- ✅ Implement video status caching
- ✅ Use localStorage for configuration

### **Loading States**
- ✅ Show loading indicators
- ✅ Provide progress feedback
- ✅ Handle long-running operations
- ✅ Cancel requests when needed

## 🎯 **Production Deployment**

### **Environment Setup**
1. **Production Environment Variables**
2. **API Key Rotation**
3. **Monitoring Setup**
4. **Error Tracking**

### **Monitoring**
- ✅ API response times
- ✅ Error rates
- ✅ Usage quotas
- ✅ User experience metrics

## 📞 **Support**

### **ElevenLabs Support**
- 📧 Email: support@elevenlabs.io
- 📚 Documentation: [docs.elevenlabs.io](https://docs.elevenlabs.io)
- 💬 Discord: [ElevenLabs Community](https://discord.gg/elevenlabs)

### **HeyGen Support**
- 📧 Email: support@heygen.com
- 📚 Documentation: [docs.heygen.com](https://docs.heygen.com)
- 💬 Community: [HeyGen Community](https://community.heygen.com)

### **Sensay Support**
- 📧 Email: support@sensay.io
- 📚 Documentation: [docs.sensay.io](https://docs.sensay.io)
- 💬 Discord: [Sensay Community](https://discord.gg/sensay)

---

## 🎉 **You're All Set!**

Once your APIs are configured and tested, you can:

1. **Use Voice Features**: Generate audio for property analysis
2. **Create Video Presentations**: Make interactive avatar videos
3. **Integrate with PropGuard AI**: Combine all features seamlessly
4. **Build Custom Workflows**: Create unique real estate experiences

Happy coding! 🚀
