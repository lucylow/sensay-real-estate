import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Video, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Settings, 
  AlertCircle,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { heyGenService, HeyGenAvatarResponse } from '@/config/heygen';

interface VideoAvatarProps {
  className?: string;
  onVideoReady?: (videoUrl: string) => void;
  onError?: (error: string) => void;
}

export const VideoAvatar: React.FC<VideoAvatarProps> = ({
  className = '',
  onVideoReady,
  onError
}) => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string>('');
  const [configStatus, setConfigStatus] = useState<{ configured: boolean; missing: string[] }>({
    configured: false,
    missing: []
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check configuration on mount
    const checkConfig = async () => {
      try {
        const status = await heyGenService.getConfigStatus();
        setConfigStatus(status);
        setIsConfigured(status.configured);
        
        if (!status.configured) {
          const errorMsg = `HeyGen API not configured in Supabase. Please set ${status.missing.join(', ')} in Supabase environment variables.`;
          setError(errorMsg);
          onError?.(errorMsg);
        }
      } catch (error) {
        const errorMsg = 'Failed to check HeyGen configuration';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    };
    
    checkConfig();
  }, [onError]);

  const generateAvatarVideo = async (text: string) => {
    if (!isConfigured) {
      const errorMsg = 'HeyGen API not configured';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response: HeyGenAvatarResponse = await heyGenService.generateAvatarVideo(text);
      
      if (response.success && response.video_url) {
        setCurrentVideoUrl(response.video_url);
        onVideoReady?.(response.video_url);
      } else {
        const errorMsg = response.error || 'Failed to generate avatar video';
        setError(errorMsg);
        onError?.(errorMsg);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Demo function to generate a sample video
  const generateDemoVideo = () => {
    generateAvatarVideo("Hello! I'm your PropGuard AI assistant. I can help you analyze properties, understand market trends, and provide investment insights. How can I assist you today?");
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Interactive Avatar
          {isConfigured ? (
            <Badge variant="default" className="ml-auto">
              <CheckCircle className="h-3 w-3 mr-1" />
              Configured
            </Badge>
          ) : (
            <Badge variant="destructive" className="ml-auto">
              <AlertCircle className="h-3 w-3 mr-1" />
              Not Configured
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isConfigured && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              HeyGen API is not configured. Please set the following environment variables:
              <ul className="mt-2 ml-4 list-disc">
                {configStatus.missing.map((missing) => (
                  <li key={missing} className="text-sm">
                    <code>{missing}</code>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Video Player */}
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
          {currentVideoUrl ? (
            <video
              ref={videoRef}
              src={currentVideoUrl}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              onLoadedData={handleVideoLoad}
              muted={isMuted}
              loop
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  {isGenerating ? 'Generating avatar video...' : 'No video available'}
                </p>
              </div>
            </div>
          )}

          {/* Video Controls Overlay */}
          {currentVideoUrl && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={togglePlayPause}
                  className="bg-black/20 hover:bg-black/40"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={toggleMute}
                  className="bg-black/20 hover:bg-black/40"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Loading Overlay */}
          {isGenerating && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center">
                <Loader2 className="h-8 w-8 text-white animate-spin mx-auto mb-2" />
                <p className="text-white text-sm">Generating avatar video...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={generateDemoVideo}
            disabled={!isConfigured || isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            Generate Demo Video
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentVideoUrl('')}
            disabled={!currentVideoUrl}
          >
            Clear Video
          </Button>
        </div>

        {/* Configuration Info */}
        {isConfigured && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Avatar ID: <code className="bg-muted px-1 rounded">{heyGenService['config'].avatarId}</code></p>
            <p>Status: <span className="text-green-600">Ready for video generation</span></p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoAvatar;

