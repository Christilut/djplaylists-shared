export class KeyConverter {
  // Indexes to sort keys by that are linked to Open Key
  static readonly KEY_INDEXES: { [key: number]: Set<string> } = {
    1: new Set(['8b', '08b', '1d', '01d', 'c', 'cmaj', 'd minor']), // 1d
    2: new Set(['8a', '08a', '1m', '01m', 'am', 'amin', 'a minor']), // 1m
    3: new Set(['9b', '09b', '2d', '02d', 'g', 'gmaj', 'g major']), // 2d
    4: new Set(['9a', '09a', '2m', '02m', 'em', 'emin', 'e minor']), // 2m
    5: new Set(['10b', '3d', '03d', 'd', 'dmaj', 'd major']), // 3d
    6: new Set(['10a', '3m', '03m', 'bm', 'bmin', 'b minor']), // 3m
    7: new Set(['11b', '4d', '04d', 'a', 'amaj', 'a major']), // 4d
    8: new Set(['11a', '4m', '04m', 'f#m', 'f#min', 'gbm', 'f# minor']), // 4m
    9: new Set(['12b', '5d', '05d', 'e', 'emaj', 'e major']), // 5d
    10: new Set(['12a', '5m', '05m', 'c#m', 'c#min', 'dbm', 'c# minor']), // 5m
    11: new Set(['1b', '01b', '6d', '06d', 'b', 'bmaj', 'b major']), // 6d
    12: new Set(['1a', '01a', '6m', '06m', 'g#m', 'g#min', 'abm', 'g# minor']), // 6m
    13: new Set(['2b', '02b', '7d', '07d', 'f#', 'f#maj', 'gb', 'f# major']), // 7d
    14: new Set(['2a', '02a', '7m', '07m', 'd#m', 'd#min', 'ebm', 'd# minor']), // 7m
    15: new Set(['3b', '03b', '8d', '08d', 'c#', 'c#maj', 'db', 'c# major']), // 8d
    16: new Set(['3a', '03a', '8m', '08m', 'a#m', 'a#min', 'bbm', 'a# minor']), // 8m
    17: new Set(['4b', '04b', '9d', '09d', 'g#', 'g#maj', 'ab', 'g# major']), // 9d
    18: new Set(['4a', '04a', '9m', '09m', 'fm', 'fmin', 'f minor']), // 9m
    19: new Set(['5b', '05b', '10d', 'd#', 'd#maj', 'eb', 'd# major']), // 10d
    20: new Set(['5a', '05a', '10m', 'cm', 'cmin', 'c minor']), // 10m
    21: new Set(['6b', '06b', '11d', 'a#', 'a#maj', 'bb', 'a# major']), // 11d
    22: new Set(['6a', '06a', '11m', 'gm', 'gmin', 'g minor']), // 11m
    23: new Set(['7b', '07b', '12d', 'f', 'fmaj', 'f major']), // 12d
    24: new Set(['7a', '07a', '12m', 'dm', 'dmin', 'd minor']) // 12m
  }

  static isOpenKey(key: string): boolean {
    return /^\d{1,2}[dm]$/i.test(key)
  }

  static isCamelotKey(key: string): boolean {
    return /^\d{1,2}[ab]$/i.test(key)
  }

  static isNotOpenOrCamelotKey(key: string): boolean {
    return !/^\d{1,2}[dmab]$/i.test(key)
  }

  private static openKeyToCamelot(key: string): string {
    let letter = key[key.length - 1].toLowerCase()

    if (letter === 'm') letter = 'a'
    else if (letter === 'd') letter = 'b'

    let n = parseInt(key.slice(0, key.length - 1))

    n = (n + 7) % 12

    if (n === 0) n = 12

    return `${n}${letter.toUpperCase()}`
  }

  static toKeyNumber(key: string): number {
    if (!key || typeof key !== 'string') return 0

    key = key.toLowerCase()

    for (const n in KeyConverter.KEY_INDEXES) {
      if (KeyConverter.KEY_INDEXES[n].has(key)) {
        return parseInt(n)
      }
    }

    return 0
  }

  static getKeyNumberColor(n: number): string {
    if (n === 0) return ''

    const lightness = '70%'

    return `hsl(${360 - (n * 15)}, 100%, ${lightness})`
  }
} 
