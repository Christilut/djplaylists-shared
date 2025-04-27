import { PlaylistType } from './playlist'

export enum StreamingService {
  AppleMusic = 'applemusic',
  Spotify = 'spotify',
  Beatport = 'beatport',
  Tidal = 'tidal',
}

export enum SupabaseTables {
  Playlists = 'playlists',
  PlaylistItems = 'playlist_items',
  Users = 'users',
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

export enum SupabaseColumnsPlaylistItems {
  Id = 'id',
  PlaylistId = 'playlist_id',
  ItemId = 'item_id',
  CreatedAt = 'created_at',
  Title = 'title',
  Artist = 'artist',
  Album = 'album',
  ImageUrl = 'imageurl',
  Position = 'position',
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

export enum SupabaseColumnsUsers {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  CreatedAt = 'created_at',
}

export class DJPlaylist {
  id?: string
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
  _externalId?: string // Used to keep AM playlist ID from UI
  _items?: DJPlaylistItem[]

  constructor(playlistData: DJPlaylist, itemsData?: DJPlaylistItem[]) {
    Object.assign(this, playlistData);

    // Add items if provided
    if (itemsData) {
      this._items = itemsData
    }
  }
}

export interface DJPlaylistItem {
  id?: string // Row ID
  position?: number // Index in playlist
  playlist_id?: string // Playlist ID
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
}

export interface DJPlaylistUser {
  id: string
  name: string
  email: string
  createdAt?: Date
}
