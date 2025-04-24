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

export enum ExtraPlaylistsSelectionMethod {
  Random = 'random',
  MostPopular = 'popular_most',
  LeastPopular = 'popular_least',
  HighestEnergy = 'energy_highest',
  HighestDanceability = 'danceability_highest',
  HighestHappiness = 'happiness_highest',
  NewestReleaseYear = 'release_newest',
  OldestReleaseYear = 'release_oldest'
}

export enum StreamingService {
  AppleMusic = 'applemusic',
  Spotify = 'spotify'
}

export interface PlaylistGenerationParams {
  name: string;
  description: string;
  trackCount: number;
  type: PlaylistType;
  tags: string[];
  maintainBpm: boolean;
  harmonicMixing: boolean;
  happiness: MoodOptions;
  danceability: MoodOptions;
  popularity: MoodOptions;
  energy: EnergyOptions;
  startingTrackIds: string[];
  extraPlaylistIds: string[];
  extraPlaylistsSelectionMethod: ExtraPlaylistsSelectionMethod;
  extraPlaylistsRatio: number;
  yearRange: [number, number];
  includeSearchTracks: boolean;
  streamingServices: StreamingService[];
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
