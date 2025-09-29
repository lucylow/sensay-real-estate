/**
 * Enhanced Avatar Features Page
 * Showcases HeyGen Interactive Avatar and Eleven Labs Voice Integration
 * Features that are currently available but hidden in the Sensay platform
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Video, 
  Mic, 
  Volume2, 
  Play, 
  Settings, 
  Key, 
  Avatar,
  Bot,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Copy,
  Zap,
  Users,
  Globe
} from 'lucide-react';
import { heyGenService } from '@/config/heygen';
import { elevenLabsService } from '@/config/elevenlabs';

interface AvatarFeatureStatus {
  heygen: {
    configured: boolean;
    missing: string[];
    apiKey: string;
    avatarId: string;
  };
  elevenlabs: {
    configured: boolean;
    missing: string[];
    apiKey: string;
    voiceId: string;
  };
}

const EnhancedAvatarFeatures: React.FC = () => {
  const [avatarStatus, setAvatarStatus] = useState<AvatarFeatureStatus>({
    heygen: {
      configured: false,
      missing: [],
      apiKey: '',
      avatarId: ''
    },
    elevenlabs: {
      configured: false,
      missing: [],
      apiKey: '',
      voiceId: ''
    }
  });

  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [avatarText, setAvatarText] = useState('Hello! I am Alex, your AI-powered real estate assistant powered by Sensay. I can help you analyze properties, assess risks, and provide market insights.');
  const [voiceText, setVoiceText] = useState('Welcome to PropGuard AI, where intelligent property analysis meets advanced risk assessment technology.');
  const [activeTab, setActiveTab] = useState('overview');

  // Check configuration status
  useEffect(() => {
    checkAvatarFeaturesStatus();
  }, []);

  const checkAvatarFeaturesStatus = () => {
    // Check HeyGen configuration
    const heygenStatus = heyGenService.getConfigStatus();
    const heygenApiKey = localStorage.getItem('heygen_api_key') || '';
    const heygenAvatarId = localStorage.getItem('heygen_avatar_id') || 'Marianne_CasualLook_public';

    // Check Eleven Labs configuration
    const elevenLabsStatus = elevenLabsService.getConfigStatus();
    const elevenLabsApiKey = localStorage.getItem('elevenlabs_api_key') || '';

    setAvatarStatus({
      heygen: {
        configured: heygenStatus.configured,
        missing: heygenStatus.missing,
        apiKey: heygenApiKey,
        avatarId: heygenAvatarId
      },
      elevenlabs: {
        configured: elevenLabsStatus.configured,
        missing: elevenLabsStatus.missing,
        apiKey: elevenLabsApiKey,
        voiceId: 'alex-professional-australian'
      }
    });
  };

  const updateHeyGenConfig = (apiKey: string, avatarId: string) => {
    heyGenService.updateConfig(apiKey, avatarId);
    checkAvatarFeaturesStatus();
  };

  const updateElevenLabsConfig = (apiKey: string) => {
    elevenLabsService.updateApiKey(apiKey);
    checkAvatarFeaturesStatus();
  };

  const generateAvatarVideo = async () => {
    if (!avatarStatus.heygen.configured) {
      alert('Please configure HeyGen API credentials first');
      return;
    }

    setIsGeneratingAvatar(true);
    try {
      const result = await heyGenService.generateAvatarVideo(avatarText);
      if (result.success && result.video_url) {
        setVideoUrl(result.video_url);
      } else {
        alert(`Avatar generation failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Avatar generation failed: ${error}`);
    } finally {
      setIsGeneratingAvatar(false);
    }
  };

  const generateVoiceAudio = async () => {
    if (!avatarStatus.elevenlabs.configured) {
      alert('Please configure Eleven Labs API credentials first');
      return;
    }

    setIsGeneratingVoice(true);
    try {
      const result = await elevenLabsService.generateAlexSpeech(voiceText);
      if (result.success && result.audio_url) {
        setAudioUrl(result.audio_url);
      } else {
        alert(`Voice generation failed: ${result.error}`);
      }
    } catch (error) {
      alert(`Voice generation failed: ${error}`);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  const demoTexts = {
    realEstate: {
      avatar: 'Looking at this property at 123 Main Street, I can see it\'s located in a desirable neighborhood with excellent market potential. The current valuation suggests strong investment opportunities, but we need to consider the environmental risks carefully.',
      voice: 'Based on my analysis, this property shows potential for steady appreciation. However, the climate risk assessment indicates moderate to high flood risk, which should factor into your investment decision.'
    },
    welcome: {
      avatar: 'Hello! I am Alex, your AI-powered real estate assistant powered by Sensay. I specialize in property analysis, risk assessment, and market intelligence. How can I help you today?',
      voice: 'Welcome to PropGuard AI, where intelligent property analysis meets advanced risk assessment technology.'
    },
    market: {
      avatar: 'Current market trends in this area show a 15% year-over-year growth. Interest rates are stable, inventory is low, and buyer demand remains strong. This creates a favorable environment for property investment.',
      voice: 'Market analysis indicates bullish sentiment with strong fundamentals. Cap rates are competitive, and rental yields justify the current asking prices.'
    }
  };

  const setDemoText = (type: 'realEstate' | 'welcome' | 'market') => {
    setAvatarText(demoTexts[type].avatar);
    setVoiceText(demoTexts[type].voice);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Avatar className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Enhanced Avatar Features</h1>
          <Sparkles className="h-8 w-8 text-purple-600" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the advanced multimodal AI features already integrated into Sensay - 
          HeyGen Interactive Avatars and Eleven Labs Voice Synthesis.
        </p>
      </div>

      {/* Status Alert */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Hidden Features Detected!</strong> These advanced avatar and voice features are already implemented 
          in your Sensay platform but may need API configuration to activate. Use the provided HeyGen credentials to get started.
        </AlertDescription>
      </Alert>

      {/* Quick Setup */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="heygen-api">HeyGen API Key (Provided)</Label>
              <Input 
                id="heygen-api"
                value={avatarStatus.heygen.apiKey}
                onChange={(e) => updateHeyGenConfig(e.target.value, avatarStatus.heygen.avatarId)}
                placeholder="Enter your HeyGen API key"
                type="password"
              />
              <p className="text-xs text-gray-500 mt-1">
                Provided: Nzk1ZDkzMjMzMGRmNGE0Zjg0YzA1YzFjMGVjMzg0YzQtMTcwMzIxNDI4Nw==
              </p>
            </div>
            <div>
              <Label htmlFor="heygen-avatar">Avatar ID (Provided)</Label>
              <Input 
                id="heygen-avatar"
                value={avatarStatus.heygen.avatarId}
                onChange={(e) => updateHeyGenConfig(avatarStatus.heygen.apiKey, e.target.value)}
                placeholder="Enter Avatar ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                Provided: Marianne_CasualLook_public
              </p>
            </div>
            <div>
              <Label htmlFor="elevenlabs-api">Eleven Labs API Key</Label>
              <Input 
                id="elevenlabs-api"
                value={avatarStatus.elevenlabs.apiKey}
                onChange={(e) => updateElevenLabsConfig(e.target.value)}
                placeholder="Enter your Eleven Labs API key"
                type="password"
              />
            </div>
            <div>
              <Label>Voice ID</Label>
              <Input 
                value={avatarStatus.elevenlabs.voiceId}
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                Default: Alex Professional Australian
              </p>
            </div>
          </div>
          
          <Button onClick={checkAvatarFeaturesStatus} className="mt-4">
            <Key className="h-4 w-4 mr-2" />
            Verify Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-blue-600" />
              HeyGen Interactive Avatar
              {avatarStatus.heygen.configured ? (
                <Badge variant="default" className="bg-green-500">Configured</Badge>
              ) : (
                <Badge variant="destructive">Needs Setup</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Generate lifelike video avatars with natural lip-sync and expressions.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Real estate expert persona
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Natural expressions and gestures
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                High-quality video output
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Sensay integration ready
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mic className="h-5 w-5 text-purple-600" />
              Eleven Labs Voice Synthesis
              {avatarStatus.elevenlabs.configured ? (
                <Badge variant="default" className="bg-green-500">Configured</Badge>
              ) : (
                <Badge variant="destructive">Needs Setup</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Natural AI speech with professional Australian accent for Alex persona.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Professional Australian voice
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Natural pronunciation and tone
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Adjustable voice settings
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Real-time audio generation
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Feature Testing */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="avatar">Avatar Testing</TabsTrigger>
          <TabsTrigger value="voice">Voice Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Demos */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Demos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setDemoText('welcome')}
                    className="h-16 flex flex-col justify-center"
                  >
                    <Bot className="h-5 w-5 mb-2" />
                    Welcome Message
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setDemoText('realEstate')}
                    className="h-16 flex flex-col justify-center"
                  >
                    <Zap className="h-5 w-5 mb-2" />
                    Property Analysis
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setDemoText('market')}
                    className="h-16 flex flex-col justify-center"
                  >
                    <BarChart3 className="h-5 w-5 mb-2" />
                    Market Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Integration Guide */}
            <Card>
              <CardHeader>
                <CardTitle>Integration with Sensay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Multi-Channel Deployment</h4>
                      <p className="text-gray-600">
                        Avatars and voice can be deployed across WhatsApp, Telegram, Email, and Web interfaces.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 p-2 rounded">
                      <Globe className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Embed Integration</h4>
                      <p className="text-gray-600">
                        Copy the integration code to embed multimodal AI into your website.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded">
                      <Bot className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Alex Persona</h4>
                      <p className="text-gray-600">
                        Professional Australian real estate expert with natural voice and expressions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="avatar" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Avatar Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="avatar-text">Message Text</Label>
                  <Textarea 
                    id="avatar-text"
                    value={avatarText}
                    onChange={(e) => setAvatarText(e.target.value)}
                    rows={4}
                    placeholder="Enter text for the avatar to speak..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={generateAvatarVideo} disabled={isGeneratingAvatar}>
                    {isGeneratingAvatar ? (
                      <>
                        <Video className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Generate Video
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setDemoText('realEstate')}>
                    Use Demo Text
                  </Button>
                </div>
                
                {videoUrl && (
                  <div>
                    <Label>Generated Video</Label>
                    <video 
                      src={videoUrl} 
                      controls 
                      className="w-full max-w-md rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(videoUrl)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Video URL
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="voice" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Voice Audio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="voice-text">Message Text</Label>
                  <Textarea 
                    id="voice-text"
                    value={voiceText}
                    onChange={(e) => setVoiceText(e.target.value)}
                    rows={4}
                    placeholder="Enter text to convert to speech..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={generateVoiceAudio} disabled={isGeneratingVoice}>
                    {isGeneratingVoice ? (
                      <>
                        <Volume2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Mic className="h-4 w-4 mr-2" />
                        Generate Audio
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setDemoText('welcome')}>
                    Use Demo Text
                  </Button>
                </div>
                
                {audioUrl && (
                  <div>
                    <Label>Generated Audio</Label>
                    <audio 
                      src={audioUrl} 
                      controls 
                      className="w-full max-w-md"
                    >
                      Your browser does not support the audio tag.
                    </audio>
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(audioUrl)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Audio URL
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Integration Code */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Embed Code for Your Website</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Copy this code to embed Alex with avatar and voice capabilities into your website:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre>{`<div id="sensay-alex-chatbot"></div>
<script>
  window.SensayConfig = {
    apiKey: '${avatarStatus.heygen.apiKey || 'your-heygen-api-key'}',
    avatarId: '${avatarStatus.heygen.avatarId}',
    voiceEnabled: true,
    avatarEnabled: ${avatarStatus.heygen.configured},
    personality: 'alex-professional-australian'
  };
  
  // Load Sensay SDK with avatar features
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://sensay.io/sdk/v1/sensay-avatar.js';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'sensay-avatar-sdk'));
</script>`}</pre>
          </div>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              const code = `window.SensayConfig = {
    apiKey: '${avatarStatus.heygen.apiKey || 'your-heygen-api-key'}',
    avatarId: '${avatarStatus.heygen.avatarId}',
    voiceEnabled: true,
    avatarEnabled: ${avatarStatus.heygen.configured},
    personality: 'alex-professional-australian'
  };`;
              navigator.clipboard.writeText(code);
            }}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Available Features & Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">HeyGen Avatar Integration</h4>
                  <p className="text-gray-600 text-sm">✅ Available at /heygen-test route</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Eleven Labs Voice</h4>
                  <p className="text-gray-600 text-sm">✅ Available at /multimodal-test route</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Sensay Integration</h4>
                  <p className="text-gray-600 text-sm">✅ Available at /sensay-multimodal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Multi-Channel Deployment</h4>
                  <p className="text-gray-600 text-sm">✅ Available in MultiChannelDeployment.tsx</p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-2">To activate all features:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                <li>Add your HeyGen API key (provided) to the environment variables</li>
                <li>Configure Eleven Labs API key for voice features</li>
                <li>Set up Sensay API credentials</li>
                <li>Visit the test pages to verify functionality</li>
                <li>Integrate into your preferred deployment channel</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAvatarFeatures;
