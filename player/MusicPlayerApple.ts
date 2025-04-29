import { DJTrack } from '../interfaces/supabase';
import { MusicPlayerBase } from './MusicPlayerBase';
import { MusicKitClient } from '../lib/musickit';

export class MusicPlayerApple extends MusicPlayerBase {
  private onPlayCallback: (() => void) | null = null;
  private onPauseCallback: (() => void) | null = null;
  private onEndCallback: (() => void) | null = null;
  private onErrorCallback: ((error: Error) => void) | null = null;

  constructor() {
    super();
    this.setupEventListeners();
  }

  private setupEventListeners() {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return;

    musicKit.addEventListener('playbackStateDidChange', (event: MusicKit.Events['playbackStateDidChange']) => {
      const state = event.state;

      switch (state) {
        case MusicKit.PlaybackStates.playing:
          this.updateState({ isPlaying: true });
          this.onPlayCallback?.();
          break;
        case MusicKit.PlaybackStates.paused:
          this.updateState({ isPlaying: false });
          this.onPauseCallback?.();
          break;
        case MusicKit.PlaybackStates.ended:
          this.updateState({ isPlaying: false });
          this.onEndCallback?.();
          break;
        case MusicKit.PlaybackStates.stopped:
          this.updateState({ isPlaying: false });
          break;
      }
    });

    musicKit.addEventListener('playbackTimeDidChange', (event: { currentPlaybackTime: number }) => {
      this.updateState({ currentTime: event.currentPlaybackTime });
    });

    musicKit.addEventListener('playbackDurationDidChange', (event: { duration: number }) => {
      this.updateState({ duration: event.duration });
    });

    musicKit.addEventListener('mediaPlaybackError', (event: { error: string }) => {
      this.updateState({ isPlaying: false });
      this.onErrorCallback?.(new Error(event.error));
    });
  }

  public async play(tracks: DJTrack[], startIndex: number): Promise<void> {
    if (!tracks || tracks.length === 0) return;
    if (startIndex < 0 || startIndex >= tracks.length) return;

    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) {
      throw new Error('MusicKit is not initialized');
    }

    if (!musicKit.isAuthorized) {
      await musicKit.authorize();
    }

    this.tracks = tracks;
    this.currentTrack = tracks[startIndex];
    this.updateState({ 
      currentTrackIndex: startIndex,
      isLoading: true 
    });

    try {
      // Set the queue
      await musicKit.setQueue({
        songs: tracks.map(x => x.applemusic_id),
      });

      // Set volume
      musicKit.player.volume = this.playbackState.volume;

      // Play the track
      await musicKit.changeToMediaAtIndex(startIndex);

      this.updateState({ isLoading: false });
    } catch (error) {
      this.updateState({ isLoading: false });
      throw error;
    }
  }

  public pause(): void {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return;
    musicKit.pause();
  }

  public resume(): void {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return;
    musicKit.play();
  }

  public seek(time: number): void {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return;
    musicKit.seekToTime(time);
  }

  public getCurrentTime(): number {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return 0;
    return musicKit.player.currentPlaybackTime;
  }

  public getDuration(): number {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return 0;
    return musicKit.player.currentPlaybackDuration;
  }

  public cleanup(): void {
    const musicKit = MusicKitClient.musicKit;
    if (!musicKit) return;
    
    // Remove all event listeners
    musicKit.removeEventListener('playbackStateDidChange');
    musicKit.removeEventListener('playbackTimeDidChange');
    musicKit.removeEventListener('playbackDurationDidChange');
    musicKit.removeEventListener('playbackError');
    
    // Stop playback
    musicKit.stop();
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
