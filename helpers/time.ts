export function toClockTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function waitForMinimumDelay(startTime: Date, minimumDelayMs: number = 500) {
  const endTimeMs = (new Date()).getTime()
  const startTimeMs = startTime.getTime()

  if (endTimeMs - startTimeMs < minimumDelayMs) await timeout(minimumDelayMs - (endTimeMs - startTimeMs))
}
