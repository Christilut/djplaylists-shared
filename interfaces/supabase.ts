import { PlaylistType } from './playlist'

export enum SupabaseTables {
  Playlists = 'playlists',
  PlaylistItems = 'playlist_items',
  Users = 'users',
}

export enum SupabaseColumnsPlaylists {
  Id = 'id',
  Title = 'title',
  Type = 'type',
  Tag = 'tag',
  ImageUrl = 'imageurl',
  Description = 'description',
  CreatedBy = 'created_by',
  CreatedAt = 'created_at',
  Trending = 'trending',
  Published = 'published',
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
  ReleaseDate = 'release_date',
  Bpm = 'bpm',
  Key = 'key',
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
}

export enum SupabaseColumnsUsers {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  CreatedAt = 'created_at',
}

export class DJPlaylist {
  id?: string
  title: string
  type: PlaylistType
  imageurl?: string
  description?: string
  tag?: string
  created_by?: string
  created_at?: Date
  trending?: boolean
  published?: boolean

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
  duration: number
  releasedate: Date
  bpm: number
  key: string
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
  applemusic_id?: string
  applemusic_preview?: string
  applemusic_link?: string
  spotify_id?: string
  spotify_preview?: string
  spotify_link?: string
}

export interface DJPlaylistUser {
  id: string
  name: string
  email: string
  createdAt?: Date
}
