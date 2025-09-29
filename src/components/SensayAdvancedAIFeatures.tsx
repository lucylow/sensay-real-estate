import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Camera, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Settings,
  Sparkles,
  Zap,
  Brain,
  Globe,
  MessageCircle,
  Video
} from 'lucide-react';

interface AdvancedAIFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'enabled' | 'disabled' | 'beta';
  configurable: boolean;
}

export const SensayAdvancedAIFeatures: React.FC = () => {
  const [features, setFeatures] = useState<AdvancedAIFeature[]>([
    {
      id: 'voice_cloning',
      name: 'Voice Cloning',
      description: 'Clone voices for personalized AI interactions',
      icon: <Mic className="h-5 w-5" />,
      status: 'beta',
      configurable: true
    },
    {
      id: 'video_avatars',
      name: 'Video Avatars',
      description: 'AI-powered video presentations',
      icon: <Camera className="h-5 w-5" />,
      status: 'enabled',
      configurable: true
    },
    {
      id: 'multimodal_chat',
      name: 'Multimodal Chat',
      description: 'Text, voice, and video interactions',
      icon: <MessageCircle className="h-5 w-5" />,
      status: 'enabled',
      configurable: true
    },
    {
      id: 'real_time_translation',
      name: 'Real-time Translation',
      description: 'Instant translation with voice synthesis',
      icon: <Globe className="h-5 w-5" />,
      status: 'enabled',
      configurable: true
    },
    {
      id: 'emotion_detection',
      name: 'Emotion Detection',
      description: 'Analyze emotional context in conversations',
      icon: <Brain className="h-5 w-5" />,
      status: 'beta',
      configurable: false
    },
    {
      id: 'predictive_responses',
      name: 'Predictive Response',
      description: 'AI predicts conversations and prepares responses',
      icon: <Zap className="h-5 w-5" />,
      status: 'beta',
      configurable: true
    }
  ]);

  const [selectedFeature, setSelectedFeature] = useState<string>('voice_cloning');
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 0,
    volume: 0.8,
    voice: 'alex'
  });

  const toggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, status: feature.status === 'enabled' ? 'disabled' : 'enabled' }
        : feature
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'text-green-600 bg-green-100';
      case 'disabled': return 'text-gray-600 bg-gray-100';
      case 'beta': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderVoiceCloningConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Voice Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="voice-speed">Speed</Label>
              <Input
                id="voice-speed"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={voiceSettings.speed}
                onChange={(e) => setVoiceSettings({...voiceSettings, speed: parseFloat(e.target.value)})}
              />
              <span className="text-sm text-gray-600">{voiceSettings.speed}x</span>
            </div>
            
            <div>
              <Label htmlFor="voice-pitch">Pitch</Label>
              <Input
                id="voice-pitch"
                type="range"
                min="-50"
                max="50"
                value={voiceSettings.pitch}
                onChange={(e) => setVoiceSettings({...voiceSettings, pitch: parseInt(e.target.value)})}
              />
              <span className="text-sm text-gray-600">{voiceSettings.pitch}Hz</span>
            </div>
            
            <div>
              <Label htmlFor="voice-volume">Volume</Label>
              <Input
                id="voice-volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={voiceSettings.volume}
                onChange={(e) => setVoiceSettings({...voiceSettings, volume: parseFloat(e.target.value)})}
              />
              <span className="text-sm text-gray-600">{Math.round(voiceSettings.volume * 100)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Alex (Male)</div>
                  <div className="text-sm text-gray-600">Professional, friendly</div>
                </div>
                <Button size="sm" variant="outline">Test</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Sarah (Female)</div>
                  <div className="text-sm text-gray-600">Warm, knowledgeable</div>
                </div>
                <Button size="sm" variant="outline">Test</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <div className="font-medium">Custom Voice</div>
                  <div className="text-sm text-gray-600">Clone your own voice</div>
                </div>
                <Button size="sm" variant="outline">Upload</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderVideoAvatarsConfig = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Video Avatars</CardTitle>
              <p className="text-sm text-gray-600">AI-powered video presentations</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Video Controls */}
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <Camera className="h-8 w-8 mx-auto text-gray-400" />
              <p className="text-sm text-gray-600">Avatar Preview</p>
              <Button size="sm" className="mt-2">
                Enable Preview
              </Button>
            </div>
          </div>
          
          {/* Avatar Selection */}
          <div className="space-y-2">
            <Label>Select Avatar</Label>
            <Select defaultValue="marianne">
              <SelectTrigger>
                <SelectValue placeholder="Choose an avatar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marianne">Marianne (Professional)</SelectItem>
                <SelectItem value="david">David (Friendly)</SelectItem>
                <SelectItem value="sophia">Sophia (Expert)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Settings */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label>Auto-generate videos</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label>Background blur</Label>
              <Switch />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMultimodalConfig = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Chat Modes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>Text Chat</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Voice Input</span>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                <span>Video Response</span>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Default Response Type</Label>
              <Select defaultValue="text">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text Only</SelectItem>
                  <SelectItem value="voice">Voice Only</SelectItem>
                  <SelectItem value="video">Video Only</SelectItem>
                  <SelectItem value="multimodal">Auto-detect</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Response Length</Label>
              <Select defaultValue="medium">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short & Concise</SelectItem>
                  <SelectItem value="medium">Medium Detail</SelectItem>
                  <SelectItem value="long">Detailed Explanation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFeatureConfig = () => {
    switch (selectedFeature) {
      case 'voice_cloning':
        return renderVoiceCloningConfig();
      case 'video_avatars':
        return renderVideoAvatarsConfig();
      case 'multimodal_chat':
        return renderMultimodalConfig();
      default:
        return (
          <Card>
            <CardContent className="p-8 text-center">
              <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Configuration Available</h3>
              <p className="text-gray-600">This feature is automatically configured.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Advanced AI Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => (
              <Card 
                key={feature.id}
                className={`cursor-pointer transition-all ${
                  selectedFeature === feature.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-lg'
                }`}
                onClick={() => setSelectedFeature(feature.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {feature.icon}
                      <span className="font-medium">{feature.name}</span>
                    </div>
                    <Badge className={getStatusColor(feature.status)}>
                      {feature.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFeature(feature.id);
                      }}
                      disabled={feature.status === 'beta' && !feature.configurable}
                    >
                      {feature.status === 'enabled' ? 'Disable' : 'Enable'}
                    </Button>
                    {feature.configurable && (
                      <Button size="sm" variant="ghost">
                        <Settings className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {renderFeatureConfig()}
    </div>
  );
};
