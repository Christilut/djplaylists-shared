import { MusicPlayerBase } from './MusicPlayerBase';
import { MusicPlayerUrl } from './MusicPlayerUrl';

export abstract class PlayerManager {
  static player: MusicPlayerBase | null = null;

  static initializePlayer(isLoggedIn: boolean): void {
    if (this.player) return

    // Create new player based on login status
    if (isLoggedIn) {
      throw new Error('Apple Music is not supported yet');
    } else {
      const player = new MusicPlayerUrl();
      this.player = player;
    }
  }
} 
