export interface MusicKitInstance {
  isAuthorized: boolean;
  volume: number;
  currentPlaybackTime: number;
  duration: number;
  state: 'none' | 'loading' | 'playing' | 'paused' | 'stopped' | 'ended' | 'waiting' | 'stalled' | 'completed';
  
  play(): Promise<void>;
  pause(): void;
  stop(): void;
  seekToTime(time: number): void;
  setQueue(options: { items: Array<{ id: string; type: string }>; startPosition: number }): Promise<void>;
  
  addEventListener(event: string, callback: (event: any) => void): void;
  removeEventListener(event: string, callback?: (event: any) => void): void;
}

export interface MusicKitEvents {
  'playbackStateDidChange': { state: string };
  'playbackTimeDidChange': { currentPlaybackTime: number };
  'playbackDurationDidChange': { duration: number };
  'playbackError': { error: string };
} 
