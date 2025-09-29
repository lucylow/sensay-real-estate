import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Video, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff,
  Play,
  Pause,
  Settings,
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { llmAPI } from '@/services/api/llm';
import { VideoAvatar } from './VideoAvatar';
import { elevenLabsService } from '@/config/elevenlabs';
import { heyGenService } from '@/config/heygen';
import { propGuardAPI } from '@/config/api';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  data?: any;
  videoUrl?: string;
  audioUrl?: string;
  isPlaying?: boolean;
}

interface MultimodalAIAssistantProps {
  property?: any;
  analysis?: any;
  className?: string;
  persona?: 'alex' | 'default';
}

export const MultimodalAIAssistant: React.FC<MultimodalAIAssistantProps> = ({ 
  property, 
  analysis, 
  className = '',
  persona = 'alex'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: persona === 'alex' 
        ? "Hello, I'm Alex, your AI-powered real estate expert. How can I help you today? You can ask me about property valuations, risk assessments, or market trends."
        : 'Hello! I\'m your PropGuard AI assistant. I can help you analyze properties, understand market trends, assess risks, and provide investment insights. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Analyze this property\'s investment potential',
        'What are the main risks for this property?',
        'Compare with similar properties in the area',
        'Generate a valuation report'
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string>('');
  const [videoError, setVideoError] = useState<string>('');
  const [configStatus, setConfigStatus] = useState<{
    heygen: boolean;
    elevenlabs: boolean;
  }>({ heygen: false, elevenlabs: false });
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    checkConfiguration();
  }, []);

  const checkConfiguration = async () => {
    try {
      const heygenStatus = await heyGenService.isConfigured();
      const elevenlabsStatus = await elevenLabsService.isConfigured();
      
      setConfigStatus({
        heygen: heygenStatus,
        elevenlabs: elevenlabsStatus
      });
    } catch (error) {
      console.error('Error checking API configuration:', error);
      setConfigStatus({
        heygen: false,
        elevenlabs: false
      });
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const context = {
        property,
        analysis,
        sessionId: 'multimodal-ai-session',
        persona
      };

      const response = await llmAPI.getChatResponse(message, context);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.response || 'I understand your question about property analysis. Let me help you with specific insights.',
        timestamp: new Date(),
        suggestions: response.suggestions || []
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Generate multimodal responses
      if (response.response && response.response.length > 20) {
        await generateMultimodalResponse(response.response);
      }

    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'I apologize, but I encountered an issue processing your request. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateMultimodalResponse = async (text: string) => {
    // Generate audio and video in parallel
    const promises = [];
    
    if (configStatus.elevenlabs) {
      promises.push(generateAudioResponse(text));
    }
    
    if (configStatus.heygen) {
      promises.push(generateVideoResponse(text));
    }
    
    await Promise.allSettled(promises);
  };

  const generateAudioResponse = async (text: string) => {
    if (!configStatus.elevenlabs) return;
    
    setIsGeneratingAudio(true);
    setAudioError('');
    
    try {
      const response = await elevenLabsService.generateAlexSpeech(text);
      
      if (response.success && response.audio_url) {
        setCurrentAudioUrl(response.audio_url);
        setMessages(prev => prev.map(msg => 
          msg.id === messages[messages.length - 1]?.id 
            ? { ...msg, audioUrl: response.audio_url }
            : msg
        ));
      } else {
        setAudioError(response.error || 'Failed to generate audio');
      }
    } catch (error) {
      console.error('Audio generation error:', error);
      setAudioError('Failed to generate audio response');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const generateVideoResponse = async (text: string) => {
    if (!configStatus.heygen) return;
    
    setIsGeneratingVideo(true);
    setVideoError('');
    
    try {
      const response = await heyGenService.generateAvatarVideo(text);
      
      if (response.success && response.video_url) {
        setCurrentVideoUrl(response.video_url);
        setMessages(prev => prev.map(msg => 
          msg.id === messages[messages.length - 1]?.id 
            ? { ...msg, videoUrl: response.video_url }
            : msg
        ));
      } else {
        setVideoError(response.error || 'Failed to generate video');
      }
    } catch (error) {
      console.error('Video generation error:', error);
      setVideoError('Failed to generate video response');
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  const playAudio = async (audioUrl: string) => {
    if (!audioUrl) return;
    
    try {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlayingAudio(false);
      };
      
      audio.onerror = () => {
        setIsPlayingAudio(false);
        setAudioError('Audio playback failed');
      };
      
      setIsPlayingAudio(true);
      await audio.play();
      
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlayingAudio(false);
      setAudioError('Failed to play audio');
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlayingAudio(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const handleVideoReady = (videoUrl: string) => {
    setCurrentVideoUrl(videoUrl);
    setVideoError('');
  };

  const handleVideoError = (error: string) => {
    setVideoError(error);
  };

  const getPersonaName = () => {
    return persona === 'alex' ? 'Alex' : 'PropGuard AI';
  };

  const getPersonaDescription = () => {
    return persona === 'alex' 
      ? 'AI-powered real estate expert with professional Australian voice'
      : 'AI Property Assistant with interactive avatar';
  };

  return (
    <Card className={`flex flex-col h-[700px] ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          {getPersonaName()} Assistant
          <Badge variant="secondary" className="ml-auto">
            <Sparkles className="h-3 w-3 mr-1" />
            Multimodal
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{getPersonaDescription()}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        {/* Configuration Status */}
        {(!configStatus.heygen || !configStatus.elevenlabs) && (
          <Alert className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">API Configuration Required</div>
                <div className="text-sm space-y-1">
                  {!configStatus.heygen && <div>• HeyGen API key needs to be set in Supabase</div>}
                  {!configStatus.elevenlabs && <div>• ElevenLabs API key needs to be set in Supabase</div>}
                </div>
                <div className="text-xs text-muted-foreground">
                  The APIs are now managed through Supabase Edge Functions. Please configure the API keys in your Supabase project environment variables.
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Avatar
            </TabsTrigger>
            <TabsTrigger value="multimodal" className="flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Full Experience
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
            <ScrollArea className="flex-1 px-4 h-[400px] overflow-hidden" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex items-start gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}>
                      <div className={`p-2 rounded-full ${
                        message.type === 'user' 
                          ? 'bg-primary' 
                          : 'bg-muted'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-primary-foreground" />
                        ) : (
                          <Bot className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      
                      <div className={`flex-1 space-y-2 ${
                        message.type === 'user' ? 'text-right' : ''
                      }`}>
                        <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-auto'
                            : 'bg-muted'
                        }`}>
                          <div className="text-sm whitespace-pre-wrap">
                            {message.content}
                          </div>
                        </div>
                        
                        {/* Audio Controls for Assistant Messages */}
                        {message.type === 'assistant' && message.audioUrl && (
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => isPlayingAudio ? stopAudio() : playAudio(message.audioUrl!)}
                              className="h-8"
                            >
                              {isPlayingAudio ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                              {isPlayingAudio ? 'Pause' : 'Play'} Audio
                            </Button>
                          </div>
                        )}
                        
                        <div className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </div>

                        {message.suggestions && message.type === 'assistant' && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-muted">
                      <Bot className="h-4 w-4 text-muted-foreground animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <div className="inline-block p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          Analyzing...
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask ${getPersonaName()} about properties, market trends, or investment advice...`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputValue);
                    }
                  }}
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="flex-1 flex flex-col mt-0">
            <div className="flex-1 p-4">
              <VideoAvatar
                className="h-full"
                onVideoReady={handleVideoReady}
                onError={handleVideoError}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="multimodal" className="flex-1 flex flex-col mt-0">
            <div className="flex-1 p-4 space-y-4">
              {/* Video Avatar */}
              <div className="flex-1">
                <VideoAvatar
                  className="h-full"
                  onVideoReady={handleVideoReady}
                  onError={handleVideoError}
                />
              </div>
              
              {/* Audio Controls */}
              {currentAudioUrl && (
                <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                  <Button
                    onClick={() => isPlayingAudio ? stopAudio() : playAudio(currentAudioUrl)}
                    className="flex items-center gap-2"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                    {isPlayingAudio ? 'Pause' : 'Play'} Alex's Voice
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    {getPersonaName()} speaking
                  </div>
                </div>
              )}
              
              {/* Generation Status */}
              {(isGeneratingAudio || isGeneratingVideo) && (
                <div className="flex items-center justify-center gap-4 p-4 bg-muted rounded-lg">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">
                    Generating {isGeneratingAudio && isGeneratingVideo ? 'audio and video' : 
                               isGeneratingAudio ? 'audio' : 'video'} response...
                  </span>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MultimodalAIAssistant;

