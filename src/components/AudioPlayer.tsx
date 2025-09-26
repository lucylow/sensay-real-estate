/**
 * Audio Player Component for ElevenLabs TTS Playback
 * Provides playback controls, queue management, and progress tracking
 */

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Trash2,
  List,
  X
} from 'lucide-react';
import { audioService, AudioTrack } from '@/services/audioService';

interface AudioPlayerProps {
  className?: string;
  showQueue?: boolean;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  className = '',
  showQueue = true,
  compact = false
}) => {
  const [queue, setQueue] = useState(audioService.getQueue());
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1.0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showQueueList, setShowQueueList] = useState(false);

  useEffect(() => {
    const updateQueue = () => setQueue(audioService.getQueue());
    const updateTime = (data: any) => {
      setCurrentTime(data.currentTime);
      setDuration(data.duration);
    };

    audioService.on('play', updateQueue);
    audioService.on('pause', updateQueue);
    audioService.on('ended', updateQueue);
    audioService.on('stop', updateQueue);
    audioService.on('trackAdded', updateQueue);
    audioService.on('trackRemoved', updateQueue);
    audioService.on('queueCleared', updateQueue);
    audioService.on('timeupdate', updateTime);
    audioService.on('volumeChanged', (vol) => setVolume(vol));
    audioService.on('playbackRateChanged', (rate) => setPlaybackRate(rate));

    // Initialize with current state
    setVolume(audioService.getQueue().volume);
    setPlaybackRate(audioService.getQueue().playbackRate);

    return () => {
      audioService.off('play', updateQueue);
      audioService.off('pause', updateQueue);
      audioService.off('ended', updateQueue);
      audioService.off('stop', updateQueue);
      audioService.off('trackAdded', updateQueue);
      audioService.off('trackRemoved', updateQueue);
      audioService.off('queueCleared', updateQueue);
      audioService.off('timeupdate', updateTime);
      audioService.off('volumeChanged', setVolume);
      audioService.off('playbackRateChanged', setPlaybackRate);
    };
  }, []);

  const currentTrack = queue.tracks[queue.currentIndex];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handlePlayPause = () => {
    if (queue.isPlaying) {
      audioService.pause();
    } else {
      audioService.play();
    }
  };

  const handlePrevious = () => {
    audioService.playPrevious();
  };

  const handleNext = () => {
    audioService.playNext();
  };

  const handleStop = () => {
    audioService.stop();
  };

  const handleSeek = (value: number[]) => {
    const time = (value[0] / 100) * duration;
    audioService.seekTo(time);
  };

  const handleVolumeChange = (value: number[]) => {
    audioService.setVolume(value[0]);
  };

  const handlePlaybackRateChange = (value: number[]) => {
    audioService.setPlaybackRate(value[0]);
  };

  const handleRemoveTrack = (trackId: string) => {
    audioService.removeTrack(trackId);
  };

  const handleClearQueue = () => {
    audioService.clearQueue();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          size="sm"
          variant="outline"
          onClick={handlePlayPause}
          disabled={!currentTrack}
        >
          {queue.isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        {currentTrack && (
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-sm text-muted-foreground truncate">
              {currentTrack.text.substring(0, 50)}...
            </span>
            <Progress value={progress} className="w-20 h-1" />
          </div>
        )}
        
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
        >
          {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        
        {showVolumeSlider && (
          <div className="absolute z-10 bg-background border rounded-md p-2 shadow-lg">
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={[volume]}
              onValueChange={handleVolumeChange}
              className="w-20"
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Audio Player</CardTitle>
            <CardDescription>
              {queue.tracks.length > 0 
                ? `${queue.currentIndex + 1} of ${queue.tracks.length} tracks`
                : 'No audio in queue'
              }
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {showQueue && queue.tracks.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowQueueList(!showQueueList)}
              >
                <List className="h-4 w-4" />
              </Button>
            )}
            
            {queue.tracks.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleClearQueue}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Current Track Info */}
        {currentTrack ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium truncate flex-1 mr-2">
                {currentTrack.text}
              </h4>
              <Badge variant="secondary">
                Track {queue.currentIndex + 1}
              </Badge>
            </div>
            
            {currentTrack.voiceId && (
              <p className="text-sm text-muted-foreground">
                Voice ID: {currentTrack.voiceId}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No track selected
          </div>
        )}

        {/* Progress Bar */}
        {currentTrack && (
          <div className="space-y-2">
            <Slider
              value={[progress]}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrevious}
            disabled={queue.currentIndex <= 0}
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handlePlayPause}
            disabled={!currentTrack}
          >
            {queue.isPlaying ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleStop}
            disabled={!currentTrack}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
            disabled={queue.currentIndex >= queue.tracks.length - 1}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume and Playback Rate */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Volume</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(volume * 100)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
              <VolumeX className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Speed</span>
              <span className="text-sm text-muted-foreground">
                {playbackRate}x
              </span>
            </div>
            <Slider
              min={0.5}
              max={2}
              step={0.1}
              value={[playbackRate]}
              onValueChange={handlePlaybackRateChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Queue List */}
        {showQueueList && queue.tracks.length > 0 && (
          <div className="border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
            <h4 className="font-medium text-sm">Queue</h4>
            {queue.tracks.map((track, index) => (
              <div
                key={track.id}
                className={`flex items-center justify-between p-2 rounded ${
                  index === queue.currentIndex ? 'bg-primary/10' : 'bg-muted/50'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{track.text}</p>
                  <p className="text-xs text-muted-foreground">
                    {track.voiceId} • {track.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleRemoveTrack(track.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AudioPlayer;

