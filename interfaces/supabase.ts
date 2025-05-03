import { PlaylistType } from './playlist'

export enum StreamingService {
  AppleMusic = 'applemusic',
  Spotify = 'spotify',
  Beatport = 'beatport',
  Tidal = 'tidal',
}

export enum SupabaseTables {
  Playlists = 'playlists',
  Tracks = 'tracks',
  Users = 'users',
  LinkPlaylistTracks = 'link_playlist_tracks',
}

export enum SupabaseColumnsPlaylists {
  Id = 'id',
  Title = 'title',
  Type = 'type',
  Tags = 'tags',
  ImageUrl = 'imageurl',
  Description = 'description',
  CreatedBy = 'created_by',
  CreatedAt = 'created_at',
  Trending = 'trending',
  Published = 'published',
  LiveUpdating = 'live_updating',
  IgnoredServices = 'ignored_services',
}

export enum SupabaseColumnsTracks {
  Id = 'id',
  CreatedAt = 'created_at',
  Title = 'title',
  Artist = 'artist',
  Album = 'album',
  ImageUrl = 'imageurl',
  Duration = 'duration',
  ReleaseDate = 'releasedate', // test
  Bpm = 'bpm',
  Key = 'key',
  Isrc = 'isrc',
  Energy = 'energy',
  Danceability = 'danceability',
  Happiness = 'happiness',
  Popularity = 'popularity',
  Acousticness = 'acousticness',
  Instrumentalness = 'instrumentalness',
  Liveness = 'liveness',
  Speechiness = 'speechiness',
  Valence = 'valence',
  Explicit = 'explicit',

  AppleMusicId = 'applemusic_id',
  AppleMusicPreview = 'applemusic_preview',
  AppleMusicLink = 'applemusic_link',

  SpotifyId = 'spotify_id',
  SpotifyPreview = 'spotify_preview',
  SpotifyLink = 'spotify_link',

  BeatportId = 'beatport_id',
  BeatportPreview = 'beatport_preview',
  BeatportLink = 'beatport_link',

  TidalId = 'tidal_id',
  TidalPreview = 'tidal_preview',
  TidalLink = 'tidal_link',
}

export enum SupabaseColumnsLinkPlaylistTracks {
  Id = 'id',
  PlaylistId = 'playlist_id',
  TrackId = 'track_id',
  Position = 'position',
}

export interface SupabaseLinkPlaylistTracksType {
  position: number
  playlist_id: number
  track: DJTrack
}

export enum SupabaseColumnsUsers {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  CreatedAt = 'created_at',
}

// (AI) Base interface for playlist properties
export interface BaseDJPlaylist {
  id?: number
  title?: string
  type?: PlaylistType
  imageurl?: string
  description?: string
  tags?: string[]
  created_by?: string
  created_at?: Date
  trending?: boolean
  published?: boolean
  live_updating?: boolean
  ignored_services?: StreamingService[]

  // Virtual fields
  _selected?: boolean
  _externalId?: string
  _items?: DJTrack[]
}

export class DJPlaylist implements BaseDJPlaylist {
  id?: number
  title?: string
  type?: PlaylistType
  imageurl?: string
  description?: string
  tags?: string[]
  created_by?: string
  created_at?: Date
  trending?: boolean
  published?: boolean
  live_updating?: boolean
  ignored_services?: StreamingService[]

  // For UI
  _selected?: boolean
  _externalId?: string
  _items?: DJTrack[]

  constructor(playlistData: DJPlaylist, itemsData?: DJTrack[]) {
    Object.assign(this, playlistData)

    // Add items if provided
    if (itemsData) {
      this._items = itemsData
    }
  }

  get isAppleMusicDisabled() {
    return this.ignored_services?.includes(StreamingService.AppleMusic)
  }

  get isBeatportDisabled() {
    return this.ignored_services?.includes(StreamingService.Beatport)
  }
}

export interface DJTrack {
  id?: string // Row ID
  created_at?: Date // Row creation date
  
  // Track metadata
  title: string
  artist: string
  album: string
  imageurl: string
  duration?: number
  releasedate: Date
  bpm?: number
  key?: string
  energy?: number
  danceability?: number
  happiness?: number
  popularity?: number
  acousticness?: number
  instrumentalness?: number
  liveness?: number
  speechiness?: number
  valence?: number
  explicit?: boolean
  isrc?: string
  applemusic_id?: string
  applemusic_preview?: string
  applemusic_link?: string
  spotify_id?: string
  spotify_preview?: string
  spotify_link?: string
  beatport_id?: string
  beatport_preview?: string
  beatport_link?: string
  tidal_id?: string
  tidal_preview?: string
  tidal_link?: string

  // For UI / temp fields
  _position?: number
}

export interface DJPlaylistUser {
  id: string
  name: string
  email: string
  createdAt?: Date
}

export interface LinkPlaylistTracks {
  id?: string
  playlist_id: number
  track_id: string
  position: number
}
