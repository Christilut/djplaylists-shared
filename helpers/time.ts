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

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }
  
  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }
  
  // Less than 30 days
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
  
  // More than 30 days, show absolute date
  return date.toLocaleDateString(navigator.language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}; 
