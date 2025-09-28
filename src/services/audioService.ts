/**
 * Audio Service for managing ElevenLabs TTS playback
 * Provides queue management, audio controls, and playback state
 */

export interface AudioTrack {
  id: string;
  text: string;
  audioUrl: string;
  voiceId?: string;
  timestamp: Date;
  duration?: number;
}

export interface AudioQueue {
  tracks: AudioTrack[];
  currentIndex: number;
  isPlaying: boolean;
  isPaused: boolean;
  volume: number;
  playbackRate: number;
}

export class AudioService {
  private audio: HTMLAudioElement;
  private queue: AudioQueue;
  private listeners: Map<string, ((data?: unknown) => void)[]> = new Map();

  constructor() {
    this.audio = new Audio();
    this.queue = {
      tracks: [],
      currentIndex: -1,
      isPlaying: false,
      isPaused: false,
      volume: 1.0,
      playbackRate: 1.0
    };

    this.setupAudioEventListeners();
  }

  /**
   * Setup audio event listeners
   */
  private setupAudioEventListeners(): void {
    this.audio.addEventListener('loadstart', () => {
      this.emit('loadstart');
    });

    this.audio.addEventListener('canplay', () => {
      this.emit('canplay');
    });

    this.audio.addEventListener('play', () => {
      this.queue.isPlaying = true;
      this.queue.isPaused = false;
      this.emit('play');
    });

    this.audio.addEventListener('pause', () => {
      this.queue.isPlaying = false;
      this.queue.isPaused = true;
      this.emit('pause');
    });

    this.audio.addEventListener('ended', () => {
      this.queue.isPlaying = false;
      this.queue.isPaused = false;
      this.emit('ended');
      this.playNext();
    });

    this.audio.addEventListener('error', (event) => {
      console.error('Audio playback error:', event);
      this.emit('error', event);
    });

    this.audio.addEventListener('timeupdate', () => {
      this.emit('timeupdate', {
        currentTime: this.audio.currentTime,
        duration: this.audio.duration
      });
    });
  }

  /**
   * Add audio track to queue
   */
  addTrack(track: Omit<AudioTrack, 'id' | 'timestamp'>): string {
    const id = `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newTrack: AudioTrack = {
      ...track,
      id,
      timestamp: new Date()
    };

    this.queue.tracks.push(newTrack);

    // If no track is currently playing, start playing this one
    if (!this.queue.isPlaying && this.queue.currentIndex === -1) {
      this.playTrack(0);
    }

    this.emit('trackAdded', newTrack);
    return id;
  }

  /**
   * Play specific track by index
   */
  playTrack(index: number): boolean {
    if (index < 0 || index >= this.queue.tracks.length) {
      return false;
    }

    const track = this.queue.tracks[index];
    this.queue.currentIndex = index;
    this.audio.src = track.audioUrl;
    this.audio.volume = this.queue.volume;
    this.audio.playbackRate = this.queue.playbackRate;

    return this.play();
  }

  /**
   * Play current track
   */
  play(): boolean {
    if (this.queue.currentIndex === -1 || this.queue.tracks.length === 0) {
      return false;
    }

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Playback failed:', error);
        this.emit('error', error);
      });
    }

    return true;
  }

  /**
   * Pause current track
   */
  pause(): void {
    this.audio.pause();
  }

  /**
   * Stop current track and reset
   */
  stop(): void {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.queue.isPlaying = false;
    this.queue.isPaused = false;
    this.emit('stop');
  }

  /**
   * Play next track in queue
   */
  playNext(): boolean {
    const nextIndex = this.queue.currentIndex + 1;
    if (nextIndex < this.queue.tracks.length) {
      return this.playTrack(nextIndex);
    } else {
      // Queue finished
      this.queue.currentIndex = -1;
      this.queue.isPlaying = false;
      this.queue.isPaused = false;
      this.emit('queueFinished');
      return false;
    }
  }

  /**
   * Play previous track in queue
   */
  playPrevious(): boolean {
    const prevIndex = this.queue.currentIndex - 1;
    if (prevIndex >= 0) {
      return this.playTrack(prevIndex);
    }
    return false;
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    this.queue.volume = Math.max(0, Math.min(1, volume));
    this.audio.volume = this.queue.volume;
    this.emit('volumeChanged', this.queue.volume);
  }

  /**
   * Set playback rate
   */
  setPlaybackRate(rate: number): void {
    this.queue.playbackRate = Math.max(0.25, Math.min(4, rate));
    this.audio.playbackRate = this.queue.playbackRate;
    this.emit('playbackRateChanged', this.queue.playbackRate);
  }

  /**
   * Seek to specific time
   */
  seekTo(time: number): void {
    if (this.audio.duration) {
      this.audio.currentTime = Math.max(0, Math.min(this.audio.duration, time));
    }
  }

  /**
   * Clear queue
   */
  clearQueue(): void {
    this.stop();
    this.queue.tracks = [];
    this.queue.currentIndex = -1;
    this.emit('queueCleared');
  }

  /**
   * Remove track from queue
   */
  removeTrack(trackId: string): boolean {
    const index = this.queue.tracks.findIndex(track => track.id === trackId);
    if (index === -1) return false;

    this.queue.tracks.splice(index, 1);

    // Adjust current index if necessary
    if (index < this.queue.currentIndex) {
      this.queue.currentIndex--;
    } else if (index === this.queue.currentIndex) {
      // Current track was removed
      if (this.queue.tracks.length === 0) {
        this.stop();
      } else if (this.queue.currentIndex >= this.queue.tracks.length) {
        this.queue.currentIndex = this.queue.tracks.length - 1;
      }
      this.playTrack(this.queue.currentIndex);
    }

    this.emit('trackRemoved', trackId);
    return true;
  }

  /**
   * Get current queue state
   */
  getQueue(): AudioQueue {
    return { ...this.queue };
  }

  /**
   * Get current track
   */
  getCurrentTrack(): AudioTrack | null {
    if (this.queue.currentIndex >= 0 && this.queue.currentIndex < this.queue.tracks.length) {
      return this.queue.tracks[this.queue.currentIndex];
    }
    return null;
  }

  /**
   * Get audio element
   */
  getAudioElement(): HTMLAudioElement {
    return this.audio;
  }

  /**
   * Add event listener
   */
  on(event: string, callback: (data?: unknown) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(callback);
  }

  /**
   * Remove event listener
   */
  off(event: string, callback: (data?: unknown) => void): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Emit event to listeners
   */
  private emit(event: string, data?: unknown): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stop();
    this.clearQueue();
    this.listeners.clear();
    this.audio.remove();
  }
}

// Export singleton instance
export const audioService = new AudioService();

