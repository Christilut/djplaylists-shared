import { DJPlaylist } from './supabase';

export enum PlaylistType {
  Normal = 'normal',
  Genre = 'genre',
  Theme = 'theme',
  Vibe = 'vibe'
}

export type PlaylistSummary = Pick<DJPlaylist, 'id' | 'title'>
