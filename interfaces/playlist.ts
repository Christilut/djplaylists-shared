export enum PlaylistType {
  Normal = 'normal',
  Genre = 'genre',
  Theme = 'theme'
}

export class PlaylistItem {
  // Required fields
  id: string // UUID
  title: string
  artist: string

  // Optional fields
  playlist_id?: string // UUID
  album?: string
  imageurl?: string
  created_at?: Date
  duration?: number
  position?: number

  applemusic_id?: string 
  applemusic_link?: string
  applemusic_preview?: string

  constructor(id: string, title: string, artist: string) {
    this.id = id
    this.title = title
    this.artist = artist
  }
}

export class Playlist {
  // Required fields
  id: string // UUID
  title: string
  type: PlaylistType

  // Optional fields
  imageurl?: string
  description?: string
  tag?: string
  created_by?: string // UUID
  created_at?: Date
  trending?: boolean
  applemusic_id?: string

  // Virtual field - not in DB
  items?: PlaylistItem[]
  selected?: boolean

  constructor(playlistData: Playlist, itemsData?: PlaylistItem[]) {
    Object.assign(this, playlistData);

    // Add items if provided
    if (itemsData) {
      this.items = itemsData as PlaylistItem[]
    }
  }
}

export type PlaylistSummary = Pick<Playlist, 'id' | 'title'>
