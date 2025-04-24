import { MusicPlayerBase } from './MusicPlayerBase';
import { MusicPlayerUrl } from './MusicPlayerUrl';

export abstract class PlayerManager {
  static player: MusicPlayerBase | null = null;

  static initializePlayer(isLoggedIn: boolean, allowFullPlayback: boolean): void {
    if (this.player) return

    // Create new player based on login status
    // if (isLoggedIn && allowFullPlayback) {
    //   const player = new MusicPlayerApple();
    //   this.player = player;
    // } else {
    const player = new MusicPlayerUrl();
    this.player = player;
    // }
  }
} 
