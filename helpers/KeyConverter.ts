export class KeyConverter {
  private static readonly keyToNumber: { [key: string]: number } = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11
  };

  public static toKeyNumber(key: string): number {
    // Remove any mode indicators (e.g., 'm' for minor)
    const baseKey = key.replace(/m$/, '').trim();
    return this.keyToNumber[baseKey] ?? -1;
  }

  public static getKeyNumberColor(keyNumber: number): string {
    if (keyNumber === -1) return '#ffffff'; // Default white for invalid keys

    // Create a color wheel based on the key number
    const hue = (keyNumber * 30) % 360; // 30 degrees per key (360/12)
    return `hsl(${hue}, 70%, 60%)`;
  }
} 
