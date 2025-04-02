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

export interface SupabasePlaylist {
  [SupabaseColumnsPlaylists.Id]?: string
  [SupabaseColumnsPlaylists.Title]: string
  [SupabaseColumnsPlaylists.Type]: PlaylistType
  [SupabaseColumnsPlaylists.ImageUrl]?: string
  [SupabaseColumnsPlaylists.Description]?: string
  [SupabaseColumnsPlaylists.Tag]?: string
  [SupabaseColumnsPlaylists.CreatedBy]?: string
  [SupabaseColumnsPlaylists.CreatedAt]?: Date
  [SupabaseColumnsPlaylists.Trending]?: boolean
}

export interface SupabasePlaylistItem {
  [SupabaseColumnsPlaylistItems.Id]?: string
  [SupabaseColumnsPlaylistItems.PlaylistId]: string
  [SupabaseColumnsPlaylistItems.Title]: string
  [SupabaseColumnsPlaylistItems.Artist]: string
  [SupabaseColumnsPlaylistItems.Album]?: string
  [SupabaseColumnsPlaylistItems.ImageUrl]?: string
  [SupabaseColumnsPlaylistItems.Position]?: number
  [SupabaseColumnsPlaylistItems.Duration]?: number
  [SupabaseColumnsPlaylistItems.CreatedAt]?: Date
  [SupabaseColumnsPlaylistItems.ReleaseDate]?: Date
  [SupabaseColumnsPlaylistItems.Bpm]?: number
  [SupabaseColumnsPlaylistItems.Key]?: string
  [SupabaseColumnsPlaylistItems.Energy]?: number
  [SupabaseColumnsPlaylistItems.Danceability]?: number
  [SupabaseColumnsPlaylistItems.Happiness]?: number
  [SupabaseColumnsPlaylistItems.Popularity]?: number
  [SupabaseColumnsPlaylistItems.Acousticness]?: number
  [SupabaseColumnsPlaylistItems.Instrumentalness]?: number
  [SupabaseColumnsPlaylistItems.Liveness]?: number
  [SupabaseColumnsPlaylistItems.Speechiness]?: number
  [SupabaseColumnsPlaylistItems.Valence]?: number
  [SupabaseColumnsPlaylistItems.Explicit]?: boolean

  [SupabaseColumnsPlaylistItems.AppleMusicId]?: string
  [SupabaseColumnsPlaylistItems.AppleMusicPreview]?: string
  [SupabaseColumnsPlaylistItems.AppleMusicLink]?: string

  [SupabaseColumnsPlaylistItems.SpotifyId]?: string
  [SupabaseColumnsPlaylistItems.SpotifyPreview]?: string
  [SupabaseColumnsPlaylistItems.SpotifyLink]?: string
}

export interface SupabaseUser {
  [SupabaseColumnsUsers.Id]: string
  [SupabaseColumnsUsers.Name]: string
  [SupabaseColumnsUsers.Email]: string
  [SupabaseColumnsUsers.CreatedAt]?: Date
}
