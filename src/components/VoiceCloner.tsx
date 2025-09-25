/**
 * Voice Cloning Component for ElevenLabs Integration
 * Allows users to create custom voices from audio samples
 */

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Mic, 
  Play, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  FileAudio,
  Clock,
  User
} from 'lucide-react';
import { elevenLabsService } from '@/config/elevenlabs';

interface VoiceClonerProps {
  className?: string;
  onVoiceCreated?: (voiceId: string) => void;
}

interface AudioFile {
  file: File;
  id: string;
  preview?: string;
  duration?: number;
}

export const VoiceCloner: React.FC<VoiceClonerProps> = ({
  className = '',
  onVoiceCreated
}) => {
  const [voiceName, setVoiceName] = useState('');
  const [description, setDescription] = useState('');
  const [labels, setLabels] = useState<Record<string, string>>({});
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloningProgress, setCloningProgress] = useState(0);
  const [clonedVoiceId, setClonedVoiceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles: AudioFile[] = Array.from(files).map(file => ({
      file,
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      preview: URL.createObjectURL(file)
    }));

    setAudioFiles(prev => [...prev, ...newFiles]);
    setError(null);
  };

  const handleRemoveFile = (fileId: string) => {
    setAudioFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

  const handlePlayPreview = (fileId: string) => {
    const audioFile = audioFiles.find(f => f.id === fileId);
    if (audioFile?.preview) {
      const audio = new Audio(audioFile.preview);
      audio.play().catch(console.error);
    }
  };

  const validateFiles = (): boolean => {
    if (audioFiles.length === 0) {
      setError('Please select at least one audio file');
      return false;
    }

    if (audioFiles.length > 25) {
      setError('Maximum 25 audio files allowed');
      return false;
    }

    for (const audioFile of audioFiles) {
      const file = audioFile.file;
      
      // Check file size (max 25MB per file)
      if (file.size > 25 * 1024 * 1024) {
        setError(`File "${file.name}" is too large. Maximum size is 25MB.`);
        return false;
      }

      // Check file type
      if (!file.type.startsWith('audio/')) {
        setError(`File "${file.name}" is not an audio file.`);
        return false;
      }
    }

    return true;
  };

  const handleCloneVoice = async () => {
    if (!voiceName.trim()) {
      setError('Please enter a voice name');
      return;
    }

    if (!validateFiles()) {
      return;
    }

    setIsCloning(true);
    setCloningProgress(0);
    setError(null);
    setSuccess(null);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setCloningProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 500);

      const result = await elevenLabsService.cloneVoice({
        name: voiceName,
        description: description || undefined,
        files: audioFiles.map(f => f.file),
        labels: Object.keys(labels).length > 0 ? labels : undefined
      });

      clearInterval(progressInterval);
      setCloningProgress(100);

      if (result.success && result.voice_id) {
        setClonedVoiceId(result.voice_id);
        setSuccess(`Voice "${voiceName}" created successfully!`);
        onVoiceCreated?.(result.voice_id);
        
        // Reset form
        setVoiceName('');
        setDescription('');
        setLabels({});
        setAudioFiles([]);
        
        // Clear file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else {
        setError(result.error || 'Failed to clone voice');
      }
    } catch (error) {
      console.error('Voice cloning error:', error);
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsCloning(false);
      setTimeout(() => setCloningProgress(0), 2000);
    }
  };

  const handleLabelChange = (key: string, value: string) => {
    setLabels(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addLabel = () => {
    const key = prompt('Enter label key:');
    if (key && !labels[key]) {
      setLabels(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const removeLabel = (key: string) => {
    setLabels(prev => {
      const newLabels = { ...prev };
      delete newLabels[key];
      return newLabels;
    });
  };

  const totalFileSize = audioFiles.reduce((total, file) => total + file.file.size, 0);
  const totalFileSizeMB = (totalFileSize / (1024 * 1024)).toFixed(2);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5" />
          Voice Cloning
        </CardTitle>
        <CardDescription>
          Create custom voices from your audio samples
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Voice Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="voice-name">Voice Name *</Label>
            <Input
              id="voice-name"
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              placeholder="Enter a name for your voice"
              disabled={isCloning}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="voice-description">Description (Optional)</Label>
            <Textarea
              id="voice-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the voice characteristics..."
              rows={3}
              disabled={isCloning}
            />
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Labels (Optional)</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={addLabel}
                disabled={isCloning}
              >
                Add Label
              </Button>
            </div>
            
            {Object.keys(labels).map(key => (
              <div key={key} className="flex items-center gap-2">
                <Input
                  value={key}
                  disabled
                  className="w-32"
                />
                <span className="text-muted-foreground">:</span>
                <Input
                  value={labels[key]}
                  onChange={(e) => handleLabelChange(key, e.target.value)}
                  placeholder="Label value"
                  disabled={isCloning}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeLabel(key)}
                  disabled={isCloning}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Audio File Upload */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Audio Files *</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload 1-25 audio files (max 25MB each)
              </p>
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isCloning}
              >
                Select Audio Files
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="audio/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* File Requirements */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Requirements:</strong> 1-25 audio files, 25MB max per file, 
              clear speech, minimal background noise, 3+ seconds duration recommended.
              Supported formats: MP3, WAV, M4A, FLAC, OGG.
            </AlertDescription>
          </Alert>

          {/* File List */}
          {audioFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Selected Files ({audioFiles.length})</Label>
                <Badge variant="secondary">
                  {totalFileSizeMB} MB total
                </Badge>
              </div>
              
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {audioFiles.map((audioFile) => (
                  <div
                    key={audioFile.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <FileAudio className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate">
                        {audioFile.file.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {(audioFile.file.size / (1024 * 1024)).toFixed(1)} MB
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handlePlayPreview(audioFile.id)}
                      >
                        <Play className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveFile(audioFile.id)}
                        disabled={isCloning}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Progress */}
        {isCloning && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cloning Voice...</span>
              <span className="text-sm text-muted-foreground">
                {Math.round(cloningProgress)}%
              </span>
            </div>
            <Progress value={cloningProgress} className="w-full" />
            <p className="text-xs text-muted-foreground">
              This may take a few minutes depending on the number and size of files.
            </p>
          </div>
        )}

        {/* Success/Error Messages */}
        {success && (
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
              {clonedVoiceId && (
                <div className="mt-2">
                  <Badge variant="outline" className="bg-green-100">
                    Voice ID: {clonedVoiceId}
                  </Badge>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Clone Button */}
        <Button
          onClick={handleCloneVoice}
          disabled={isCloning || !voiceName.trim() || audioFiles.length === 0}
          className="w-full"
          size="lg"
        >
          {isCloning ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Cloning Voice...
            </>
          ) : (
            <>
              <Mic className="h-4 w-4 mr-2" />
              Clone Voice
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceCloner;
