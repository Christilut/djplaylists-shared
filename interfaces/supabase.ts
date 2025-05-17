import { getResizedImageUrl } from '../helpers/image'
import { PlaylistType } from './playlist'

export enum StreamingService {
  AppleMusic = 'applemusic',
  Spotify = 'spotify',
  Beatport = 'beatport',
  Tidal = 'tidal',
  Mixcloud = 'mixcloud',
}

export const StreamingServiceLabels = {
  [StreamingService.AppleMusic]: 'Apple Music',
  [StreamingService.Spotify]: 'Spotify',
  [StreamingService.Beatport]: 'Beatport',
  [StreamingService.Tidal]: 'Tidal',
  [StreamingService.Mixcloud]: 'Mixcloud',
}

export const StreamingServiceColors = {
  [StreamingService.AppleMusic]: 'bg-dj-pink',
  [StreamingService.Beatport]: 'bg-green-500',
}

export enum SupabaseTables {
  Playlists = 'playlists',
  Tracks = 'tracks',
  Users = 'users',
  LinkPlaylistTracks = 'link_playlist_tracks',
  UserProfile = 'user_profile',
  PlaylistSaves = 'playlist_saves',
  UserSettings = 'user_settings',
  EmailLog = 'email_log',
  UserSubscriptions = 'user_subscriptions',
  Notifications = 'notifications',
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
  GenrePrimary = 'genre_primary',
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

export enum SupabaseColumnsPlaylistSaves {
  Id = 'id',
  PlaylistId = 'playlist_id',
  UserId = 'user_id',
  SavedAt = 'saved_at',
  StreamingService = 'streaming_service',
}

export enum SupabaseColumnsUserSettings {
  Id = 'id',
  UserId = 'user_id',
  MailingDigest = 'mailing_digest',
  MailingSubscriptions = 'mailing_subscriptions',
}

export enum SupabaseColumnsUsers {
  Id = 'id',
  Name = 'name',
  Email = 'email',
  CreatedAt = 'created_at',
}

export enum SupabaseColumnsUserProfile {
  CreatedAt = 'created_at',
  UserId = 'user_id',
  Username = 'username',
  DjName = 'dj_name',
  DisplayName = 'display_name',
  JoinedAt = 'joined_at',
  BioLong = 'bio_long',
  BioShort = 'bio_short',
  CountryCode = 'country_code',
  Place = 'place',
  DjSinceYear = 'dj_since_year',
  AvatarUrl = 'avatar_url',
  GenreTags = 'genre_tags',
  DjStyle = 'dj_style',
  SocialLinks = 'social_links',
}

export enum SupabaseColumnsEmailLog {
  Id = 'id',
  UserId = 'user_id',
  ToEmail = 'to_email',
  Subject = 'subject',
  Template = 'template',
  SentAt = 'sent_at',
}

export interface EmailLogRow {
  id: string
  user_id: string | null
  to_email: string
  subject: string
  template: string
  sent_at: string // ISO timestamp
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
  genre_primary?: string

  // Virtual fields
  _selected?: boolean
  _externalId?: string
  _items?: DJTrack[]
  _username?: string
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
  genre_primary?: string

  // Virtual fields
  _selected?: boolean
  _externalId?: string
  _items?: DJTrack[]
  _username?: string

  constructor(playlistData: BaseDJPlaylist, itemsData?: DJTrack[]) {
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

  get imageUrl(): { small: string, medium: string, large: string } | null {
    if (!this.imageurl) return null

    return {
      small: getResizedImageUrl(this.imageurl, 80),
      medium: getResizedImageUrl(this.imageurl, 300),
      large: this.imageurl
    }
  }
}

export interface DJTrack {
  id?: string // Row ID
  created_at?: Date // Row creation date

  // Track metadata
  title?: string
  artist?: string
  album?: string
  imageurl?: string
  duration?: number
  releasedate?: Date
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

export interface SupabaseLinkPlaylistTracksType {
  position: number
  playlist_id: number
  track: DJTrack
}

export interface DJProfileData {
  user_id: string
  username: string
  dj_name: string
  display_name: string
  joined_at: Date
  bio_long: string
  bio_short: string
  country_code: string
  place: string
  dj_since_year: number
  avatar_url: string
  genre_tags: string[]
  dj_style: string[]
  social_links: {
    website?: string
    instagram?: string
    tiktok?: string
    soundcloud?: string
    youtube?: string
  }
}

export interface PlaylistSave {
  id: string
  playlist_id: number
  user_id: string
  saved_at: Date
  streaming_service: StreamingService
}

export interface UserSettings {
  id: string
  user_id: string
  mailing_digest: boolean
  mailing_subscriptions: boolean
}

export enum SupabaseColumnsUserSubscriptions {
  Id = 'id',
  SubscriberId = 'subscriber_id',
  SubscribedToId = 'subscribed_to_id',
  CreatedAt = 'created_at',
}

export enum SupabaseColumnsNotifications {
  Id = 'id',
  UserId = 'user_id',
  Type = 'type',
  Content = 'content',
  IsRead = 'is_read',
  CreatedAt = 'created_at',
  RelatedUserId = 'related_user_id',
  RelatedPlaylistId = 'related_playlist_id',
}

export interface UserSubscription {
  id: string
  subscriber_id: string
  subscribed_to_id: string
  created_at: Date
}

export enum NotificationType {
  PlaylistPublished = 'playlist_published',
}

export interface Notification {
  id: string
  created_at: Date
  user_id: string
  type: NotificationType
  content: {
    title: string
    body: string
  }
  is_read: boolean
  related_user_id: string
  related_playlist_id: number
}



