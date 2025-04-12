import { PlaylistType } from './playlist';
import { ISpotifyTrack, ISpotifyPlaylist } from './spotify';
import { DJPlaylist, DJPlaylistItem } from './supabase';

export enum MoodOptions {
  Low = 'low',
  High = 'high',
  Mixed = 'mixed',
  Any = 'any'
}

export enum EnergyOptions {
  Low = 'low',
  High = 'high',
  Increasing = 'increasing',
  Decreasing = 'decreasing',
  CenterPeak = 'center peak',
  Any = 'any'
}

export interface PlaylistGenerationParams {
  name: string;
  description: string;
  trackCount: number;
  type: PlaylistType;
  maintainBpm: boolean;
  harmonicMixing: boolean;
  happiness: MoodOptions;
  danceability: MoodOptions;
  popularity: MoodOptions;
  energy: EnergyOptions;
  startingTrackIds: string[];
  yearRange: [number, number];
  includeSearchTracks: boolean;
} 

export interface PlaylistGenerationResponse {
  playlist: DJPlaylist
  items: DJPlaylistItem[]
}

export interface TrackSearchResponse {
  tracks: ISpotifyTrack[];
  success: boolean;
}

export interface PlaylistSearchResponse {
  playlists: ISpotifyPlaylist[];
  success: boolean;
}

export interface ErrorResponse {
  success: false
  error: string
}
