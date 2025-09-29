/**
 * Video utility functions for handling video elements and imports
 */

export interface VideoSource {
  src: string;
  type: string;
}

export interface VideoConfig {
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
}

/**
 * Create a video element with proper configuration
 */
export const createVideoElement = (
  sources: VideoSource[], 
  config: VideoConfig = {}
): HTMLVideoElement => {
  const video = document.createElement('video');
  
  // Set default configuration
  video.autoplay = config.autoplay || false;
  video.muted = config.muted || true;
  video.controls = config.controls !== false;
  video.loop = config.loop || false;
  video.preload = config.preload || 'metadata';
  
  // Add sources
  sources.forEach(source => {
    const sourceElement = document.createElement('source');
    sourceElement.src = source.src;
    sourceElement.type = source.type;
    video.appendChild(sourceElement);
  });
  
  return video;
};

/**
 * Load video from URL with error handling
 */
export const loadVideo = async (
  videoUrl: string,
  onLoad?: () => void,
  onError?: (error: Error) => void
): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    
    video.addEventListener('loadeddata', () => {
      onLoad?.();
      resolve(video);
    });
    
    video.addEventListener('error', (e) => {
      const error = new Error(`Failed to load video: ${videoUrl}`);
      onError?.(error);
      reject(error);
    });
    
    video.src = videoUrl;
    video.load();
  });
};

/**
 * Check if video format is supported
 */
export const isVideoFormatSupported = (type: string): boolean => {
  const video = document.createElement('video');
  return video.canPlayType(type) !== '';
};

/**
 * Get supported video formats
 */
export const getSupportedVideoFormats = (): string[] => {
  const formats = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/ogv',
    'video/quicktime',
    'video/x-msvideo'
  ];
  
  return formats.filter(isVideoFormatSupported);
};

/**
 * Compress video file (client-side basic implementation)
 */
export const compressVideo = async (
  file: File,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const video = document.createElement('video');
    
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      video.currentTime = 0;
      video.addEventListener('seeked', () => {
        ctx?.drawImage(video, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to compress video'));
            }
          },
          'image/jpeg',
          quality
        );
      });
    });
    
    video.src = URL.createObjectURL(file);
  });
};

/**
 * Generate thumbnail from video
 */
export const generateVideoThumbnail = async (
  videoUrl: string,
  timePosition: number = 1
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      video.currentTime = timePosition;
      video.addEventListener('seeked', () => {
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(thumbnailDataUrl);
        } else {
          reject(new Error('Failed to generate thumbnail'));
        }
      });
    });
    
    video.addEventListener('error', () => {
      reject(new Error('Failed to load video for thumbnail generation'));
    });
    
    video.src = videoUrl;
  });
};

/**
 * Format video duration
 */
export const formatVideoDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
};

/**
 * Get video dimensions from URL
 */
export const getVideoDimensions = async (videoUrl: string): Promise<{
  width: number;
  height: number;
}> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    
    video.addEventListener('loadedmetadata', () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight
      });
    });
    
    video.addEventListener('error', () => {
      reject(new Error('Failed to load video metadata'));
    });
    
    video.src = videoUrl;
  });
};
