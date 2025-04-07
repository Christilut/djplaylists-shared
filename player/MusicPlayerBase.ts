import { DJPlaylistItem } from '../interfaces/supabase';

export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  currentTrackIndex: number | null;
}

export abstract class MusicPlayerBase {
  protected playbackState: PlaybackState;
  private stateListeners: ((state: PlaybackState) => void)[] = [];
  protected tracks: DJPlaylistItem[] = [];
  protected currentTrack: DJPlaylistItem | null = null;

  constructor() {
    this.playbackState = {
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 0.8,
      isLoading: false,
      currentTrackIndex: null
    };
  }

  // Abstract methods that must be implemented by child classes
  abstract play(tracks: DJPlaylistItem[], startIndex: number): Promise<void>;
  abstract pause(): void;
  abstract resume(): void;
  abstract seek(time: number): void;
  abstract cleanup(): void;
  abstract getCurrentTime(): number;
  abstract getDuration(): number;

  // Common methods for all players
  public getCurrentTrack(): DJPlaylistItem | null {
    return this.currentTrack;
  }

  public getPlaybackState(): PlaybackState {
    return { ...this.playbackState };
  }

  public addStateListener(listener: (state: PlaybackState) => void): () => void {
    this.stateListeners.push(listener);
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== listener);
    };
  }

  protected updateState(partialState: Partial<PlaybackState>) {
    this.playbackState = { ...this.playbackState, ...partialState };

    this.notifyListeners();
  }

  protected notifyListeners() {
    this.stateListeners.forEach(listener => listener(this.getPlaybackState()));
  }

  // Navigation methods
  public async playNext(): Promise<void> {
    if (this.playbackState.currentTrackIndex === null) return;
    const nextIndex = (this.playbackState.currentTrackIndex + 1) % this.tracks.length;
    await this.play(this.tracks, nextIndex);
  }

  public async playPrevious(): Promise<void> {
    if (this.playbackState.currentTrackIndex === null) return;
    const prevIndex = this.playbackState.currentTrackIndex === 0 
      ? this.tracks.length - 1 
      : this.playbackState.currentTrackIndex - 1;
    await this.play(this.tracks, prevIndex);
  }

  public togglePlayPause(): void {
    if (this.playbackState.isPlaying) {
      this.pause();
    } else {
      this.resume();
    }
  }

  protected setLoading(isLoading: boolean) {
    this.updateState({ isLoading });
  }
} 
