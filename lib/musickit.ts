import { DJTrack } from '../interfaces/supabase';

export abstract class MusicKitClient {
  static musicKit: MusicKit.MusicKitInstance;
  private static isInitialized = false;

  static async initialize() {
    if (MusicKitClient.musicKit) return MusicKitClient.musicKit;

    // First check if MusicKit is available
    if (!window.MusicKit) {
      console.error("MusicKit is not available. Make sure the MusicKit JS is loaded.");
      return null;
    }

    try {
      const developerToken = import.meta.env.VITE_APPLEMUSIC_DEVELOPER_TOKEN;

      if (!developerToken) throw new Error('Apple Music developer token is not set. Please set the VITE_APPLEMUSIC_DEVELOPER_TOKEN environment variable.');

      // Configure and initialize MusicKit
      MusicKitClient.musicKit = await window.MusicKit.configure({
        developerToken,
        storefrontId: 'us',
        app: {
          name: 'DJ Playlists',
          build: '1.0.0',
          icon: 'https://www.djplaylists.fm/logo_musickit.png'
        }
      });

      this.isInitialized = true;

      return MusicKitClient.musicKit;
    } catch (error) {
      console.error('Failed to initialize MusicKit:', error);
      return null;
    }
  }

  static signout() {
    if (MusicKitClient.musicKit) {
      MusicKitClient.musicKit.unauthorize();
      MusicKitClient.musicKit = null;
    }
  }

  static async authorize(): Promise<boolean> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (!this.musicKit.isAuthorized) {
        // Request authorization from the user
        await this.musicKit.authorize();

      }

      return this.musicKit.isAuthorized
    } catch (error) {
      console.error("Failed to authorize with Apple Music:", error);
    }
  }

  static async getPlaylists(): Promise<MusicKit.LibraryPlaylists[]> {
    try {
      await this.authorize();

      // Fetch user's playlists
      const response = await this.musicKit.api.library.playlists(null)

      response.sort((a, b) => b.attributes.dateAdded.localeCompare(a.attributes.dateAdded))

      return response
    } catch (error) {
      if (error.message.includes('403')) {
        this.musicKit.unauthorize()
      }

      console.error("Failed to fetch playlists from Apple Music:", error);
      return [];
    }
  }

  static async getPlaylistTracks(playlistId: string): Promise<MusicKit.Songs[]> {
    try {
      await this.authorize();

      // Fetch tracks for a specific playlist with pagination
      const response = await this.musicKit.api.playlist(playlistId) // TODO: limited to 100 tracks for now

      // The response is already in the correct format
      const tracks = response.relationships.tracks.data.filter(track => track.type === 'songs');

      return tracks
    } catch (error) {
      console.error(`Failed to fetch tracks for playlist ${playlistId}:`, error);
// TEMP:
// TODO: this requires a musickit cache clear
      throw new Error(`Failed to import playlists. You might need to share it first, so Apple gives it a public link.`)
    }
  }

  static songToDjTrack(song: MusicKit.Songs): DJTrack {
    return {
      title: song.attributes.name,
      artist: song.attributes.artistName,
      album: song.attributes.albumName,
      imageurl: song.attributes.artwork?.url,
      duration: song.attributes.durationInMillis ? Math.floor(song.attributes.durationInMillis / 1000) : undefined,
      created_at: new Date(),
      releasedate: new Date(song.attributes.releaseDate),
      bpm: 0,
      key: '',
      isrc: song.attributes.isrc,
      applemusic_id: song.id,
      applemusic_preview: song.attributes.previews?.[0]?.url,
      applemusic_link: song.attributes.url
    }
  }
}
