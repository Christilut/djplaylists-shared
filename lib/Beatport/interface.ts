export const BEATPORT_API_URL = 'https://api.beatport.com/v4'

export interface IBeatportResponse<T> {
  results?: T[]
  tracks?: T[]
  next: string
  previous: null | string
  count: number
  page: string // eg "1/1113"
  per_page: number
}

export interface IBeatportTrack {
  artists: IBeatportArtist[]
  publish_status: string
  available_worldwide: boolean
  bpm: number
  catalog_number: string
  current_status: IBeatportCurrentStatus
  encoded_date: string
  exclusive: boolean
  free_downloads: any[]
  free_download_start_date: any
  free_download_end_date: any
  genre: IBeatportGenre
  id: number
  image: IBeatportImage
  is_available_for_streaming: boolean
  isrc: string
  key: IBeatportKey
  label_track_identifier: string
  length: string
  length_ms: number
  mix_name: string
  name: string
  new_release_date: string
  pre_order: boolean
  pre_order_date: any
  price: IBeatportPrice
  publish_date: string
  release: IBeatportRelease
  remixers: any[]
  sale_type: IBeatportSaleType
  sample_url: string
  sample_start_ms: number
  sample_end_ms: number
  slug: string
  sub_genre: any
  url: string
  is_hype: boolean
}

export interface IBeatportArtist {
  id: number | string
  image: IBeatportImage
  name: string
  slug: string
  url: string
  type?: 'artist' | 'label' // Needed for UI
}

export interface IBeatportLabel {
  id: number | string
  name: string
  image: IBeatportImage
  slug: string
  type?: 'artist' | 'label' // Needed for UI
}

export interface IBeatportImage {
  id: number
  uri: string
  dynamic_uri: string
}

export interface IBeatportCurrentStatus {
  id: number
  name: string
  url: string
}

export interface IBeatportGenre {
  id: number
  subgenre_id: number // Added by us
  name: string
  slug: string
  url: string
  subgenres: (IBeatportGenre & { enabled: boolean })[]
}

export interface IBeatportKey {
  camelot_number: number
  camelot_letter: string
  chord_type: {
    id: number
    name: string
    url: string
  }
  id: number
  is_sharp: boolean
  is_flat: boolean
  letter: string
  name: string
  url: string
}

export interface IBeatportPrice {
  code: string
  symbol: string
  value: number
  display: string
}

export interface IBeatportRelease {
  id: number
  name: string
  image: IBeatportImage
  label: IBeatportLabel
  slug: string
  artists: IBeatportArtist[]
  bpm_range: {
    min: number
    max: number
  }
  catalog_number: string
  desc: string
  enabled: boolean
  encoded_date: string
  exclusive: boolean
  is_hype: boolean
  new_release_date: string
  override_price: unknown
  pre_order: boolean
  pre_order_date: string
  remixers: IBeatportArtist[]
  track_count: number
  upc: string
  updated: string
  url: string
}

export interface IBeatportSaleType {
  id: number
  name: string
  url: string
}

export interface IBeatportPlaylistPosition {
  id: number // Link row ID
  position: number
  track: IBeatportTrack
  tombstoned: boolean
}

export interface IBeatportPlaylist {
  bpm_range: number[]
  created_date: string // ISO
  followers: number
  genres: unknown[]
  id: number
  is_owner: boolean
  is_public: boolean
  keys: unknown[]
  length_ms: number | null
  name: string
  release_images: string[]
  track_count: number
  type: {
    id: number
    name: 'user'
  }
  updated_date: string // ISO
}

export interface IBeatportAuthResponse {
  access_token: string
  expires_in: number
  token_type: string
  refresh_token: string
  scope: string
}

export interface IBeatportCart {
  default: boolean
  id: number
  name: string
  person_id: number
  releases: unknown[]
  tracks: IBeatportCartItem[]
}

export enum BEATPORT_AUDIO_FORMAT_ID {
  MP3 = 1
}

export enum BEATPORT_ITEM_TYPE_ID {
  Track = 1
}

export interface IBeatportCartItem {
  audio_format_id: BEATPORT_AUDIO_FORMAT_ID
  cart: number
  country_id: number
  id: number
  item: IBeatportTrack
  item_id: number
  item_type_id: BEATPORT_ITEM_TYPE_ID
  item_type_name: 'track'
  price: {
    base: IBeatportPrice
    fee: IBeatportPrice
    total: IBeatportPrice
  }
  purchase_type_id: 1
}

export interface IBeatportPerson {
  id: number
  owner_image: string
  owner_name: string
  owner_slug: string
  owner_type: string
  owner_person: number
}

export interface IBeatportChart {
  add_by: number
  add_date: string
  change_date: string
  description: any
  enabled: boolean
  id: number
  image: IBeatportImage
  is_approved: boolean
  is_indexed: boolean
  is_published: boolean
  name: string
  person: IBeatportPerson
  price: IBeatportPrice
  publish_date: string
  slug: string
  track_count: number
  artist: IBeatportArtist
  genres: IBeatportGenre[]
}

export interface IBeatportChartSanitized {
  id: number
  name: string
  datePublished: Date
  imageUrl: string
  ownerName: string
  url: string
  trackCount: number
  genres: string[]
}

export interface IBeatportTableResponse<T> {
  total: number
  items: T[]
}
