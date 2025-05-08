import { PlaylistType } from './playlist';
import { ISpotifyPlaylist } from './spotify';
import { DJPlaylist, DJTrack, StreamingService, DJProfileData } from './supabase';

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
  items: DJTrack[]
}

export interface SearchTracksQuery {
  q?: string
  artist?: string
  title?: string
  provider?: StreamingService
}

export interface SearchTracksResponse {
  tracks: DJTrack[];
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

export interface SuggestTracksRequest {
  spotifyTrackIds?: string[]
  usedSpotifyTrackIds?: string[]
  beatportTrackIds?: string[]
  usedBeatportTrackIds?: string[]
}

export interface SuggestTracksResponse {
  success: boolean
  tracks: DJTrack[]
}

export interface TrackRequest {
  tracks: DJTrack[]
}

export interface TrackResponse {
  success: boolean
  tracks: DJTrack[]
}

export interface UpdatePlaylistRequest {
  title?: string
  description?: string
  tags?: string[]
  type?: PlaylistType
  published?: boolean
}

export interface GetUserProfileResponse {
  success: boolean
  message?: string
  data?: DJProfileData
}

export interface PostUserProfileResponse {
  success: boolean
  message?: string
  data?: DJProfileData
}
