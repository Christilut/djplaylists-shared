export abstract class MusicKitClient {
  static musicKit: MusicKit.MusicKitInstance;

  static async init() {
    if (MusicKitClient.musicKit) return MusicKitClient.musicKit;

    // First check if MusicKit is available
    if (!window.MusicKit) {
      console.error("MusicKit is not available. Make sure the MusicKit JS is loaded.");
      return null;
    }

    try {
      // const response = await api.get('/api/utility/applemusic-dev-token');
      // const developerToken = response.data.developerToken;
      const developerToken = import.meta.env.VITE_APPLEMUSIC_DEVELOPER_TOKEN;

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
}
