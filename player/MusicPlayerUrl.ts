import { DJPlaylistItem } from '../interfaces/supabase';
import { MusicPlayerBase } from './MusicPlayerBase';

export class MusicPlayerUrl extends MusicPlayerBase {
  private audioElement: HTMLAudioElement | null = null;
  private onPlayCallback: (() => void) | null = null;
  private onPauseCallback: (() => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;

  constructor() {
    super();
    this.audioElement = new Audio();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.audioElement) return;

    this.audioElement.addEventListener('play', () => {
      this.updateState({ isPlaying: true });
      this.onPlayCallback?.();
    });

    this.audioElement.addEventListener('pause', () => {
      this.updateState({ isPlaying: false });
      this.onPauseCallback?.();
    });

    this.audioElement.addEventListener('ended', () => {
      this.updateState({ isPlaying: false });
      this.onEndCallback?.();
    });

    this.audioElement.addEventListener('error', (e) => {
      this.updateState({ isPlaying: false });
      this.onErrorCallback?.(new Error('Failed to play audio'));
    });
  }

  public async play(tracks: DJPlaylistItem[], startIndex: number): Promise<void> {
    if (!this.audioElement) return;
    if (!tracks || tracks.length === 0) return;
    if (startIndex < 0 || startIndex >= tracks.length) return;

    this.tracks = tracks;
    this.currentTrack = tracks[startIndex];
    this.updateState({ currentTrackIndex: startIndex });

    this.audioElement.src = this.currentTrack.applemusic_preview || '';

    // Set volume before playing
    this.audioElement.volume = this.playbackState.volume;

    // Play the audio
    await this.audioElement.play();
  }

  public pause(): void {
    if (!this.audioElement) return;
    this.audioElement.pause();
  }

  public resume(): void {
    if (!this.audioElement) return;
    this.audioElement.play();
  }

  public seek(time: number): void {
    if (this.audioElement) {
      this.audioElement.currentTime = time;
    }
  }

  public getCurrentTime(): number {
    if (!this.audioElement) return 0;
    return this.audioElement.currentTime;
  }

  public getDuration(): number {
    if (!this.audioElement) return 0;
    return this.audioElement.duration;
  }

  public cleanup(): void {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.remove();
      this.audioElement = null;
    }
  }

  public onPlay(callback: () => void) {
    this.onPlayCallback = callback;
  }

  public onPause(callback: () => void) {
    this.onPauseCallback = callback;
  }

  public onEnd(callback: () => void) {
    this.onEndCallback = callback;
  }

  public onError(callback: (error: Error) => void) {
    this.onErrorCallback = callback;
  }
} 
