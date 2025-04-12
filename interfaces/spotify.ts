export interface ISpotifyAlbum {
  label?: string
  available_markets: string
  name: string
  release_date: string
  uri: string
  id: string
  popularity: number
  genres: string[]
  images: {
    height: number
    url: string
    width: number
  }[]
  external_urls: {
    spotify: string
  }
}

export interface ISpotifyArtist {
  genres: string[]
  id: string
  name: string
  images: {
    height: number
    url: string
    width: number
  }[]
  popularity: number
  type: 'artist'
  uri: string
}

export interface ISpotifyTrack {
  album: ISpotifyAlbum // Note: label not available in track album, only in separate album call
  artists: {
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    name: string
    type: string
    uri: string
  }[]
  external_ids: {
    isrc: string
  }
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
}

export interface ISpotifyTrackAudioFeatures {
  acousticness: number
  analysis_url: string
  danceability: number
  duration_ms: number
  energy: number
  id: string
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  mode: number
  speechiness: number
  tempo: number
  time_signature: number
  track_href: string
  type: 'audio_features'
  uri: string
  valence: number
}

export interface ISpotifyPlaylist {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    width: number
    url: string
  }[]
  name: string
  owner: {
    display_name: string
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    type: 'user'
    uri: string
  }
  primary_color: any
  public: boolean
  tracks: ISpotifyTrack
  type: 'playlist'
  uri: string
}

export interface SpotifySearchResponse {
  tracks: {
    items: ISpotifyTrack[]
  }
  playlists?: {
    items: ISpotifyPlaylist[]
  }
}

export interface SpotifyGetTracksResponse {
  tracks: ISpotifyTrack[]
}

export interface SpotifyGetRecommendationsResponse {
  tracks: ISpotifyTrack[]
  seeds: {
    initialPoolSize: number
    afterFilteringSize: number
    afterRelinkingSize: number
    href: string
    id: string
    type: string
  }[]
}

export interface SpotifyAudioFeaturesResponse {
  audio_features: {
    acousticness: number
    analysis_url: string
    danceability: number
    duration_ms: number
    energy: number
    id: string
    instrumentalness: number
    key: number
    liveness: number
    loudness: number
    mode: number
    speechiness: number
    tempo: number
    time_signature: number
    track_href: string
    type: string
    uri: string
    valence: number
  }[]
}

export interface ISpotifyResponsePlaylistTracks {
  href: string
  items: {
    track: ISpotifyTrack
  }[]
  limit: number
  next: any
  offset: number
  previous: any
  total: number
}
