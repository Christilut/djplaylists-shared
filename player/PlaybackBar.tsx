import { Button } from '@/components/ui/button';
import { User } from '@supabase/supabase-js';
import { Loader2, Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../../lib/utils';
import { toClockTime } from '../helpers/time';
import { DJTrack } from '../interfaces/supabase';
import { PlaybackState } from './MusicPlayerBase';
import { PlayerManager } from './PlayerManager';

const PlaybackBar = ({ user }: { user: User | null }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<DJTrack | null>(null);
  const [isBarVisible, setIsBarVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }


      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Prevent space triggering focused play button on cards

          if (!isBarVisible) return;

          handlePlayPause();
          break;
        case 'Escape':
          if (!isBarVisible) return;

          handleHidePlaybackBar();
          break;
        case 'ArrowLeft':
          if (!isBarVisible) return;

          handlePrevious();
          break;
        case 'ArrowRight':
          if (!isBarVisible) return;

          handleNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (isSeeking) return;

      setCurrentTime(PlayerManager.player?.getCurrentTime() || 0);
      setDuration(PlayerManager.player?.getDuration() || 0);
    }, 20);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSeeking]);


  useEffect(() => {
    // Add state listener to update when track or playback state changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // Initial setup
      if (PlayerManager.player) {
        setCurrentTrack(PlayerManager.player.getCurrentTrack());
        const state = PlayerManager.player.getPlaybackState();
        setIsPlaying(state.isPlaying);
        setIsLoading(state.isLoading);
        setCurrentTime(state.currentTime);
        setDuration(state.duration);

        PlayerManager.player.addStateListener((state: PlaybackState) => {
          setCurrentTrack(PlayerManager.player?.getCurrentTrack() || null);
          setIsPlaying(state.isPlaying);
          setIsLoading(state.isLoading);

          if (state.isLoading) {
            setCurrentTime(0)
            setDuration(0)
          } else {
            setCurrentTime(state.currentTime);
            setDuration(state.duration);
          }

          if (state.isPlaying) {
            setIsBarVisible(true);
          }
        });
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user]);

  const handlePlayPause = async () => {
    PlayerManager.player.togglePlayPause()
    setIsPlaying(!isPlaying);
  };

  const handleNext = async () => {
    PlayerManager.player.playNext()
  };

  const handlePrevious = async () => {
    PlayerManager.player.playPrevious()
  };

  const handleHidePlaybackBar = () => {
    PlayerManager.player.pause()
    setIsPlaying(false)
    setIsBarVisible(false)
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;

    setIsSeeking(true);
    PlayerManager.player?.seek(newTime);
    setCurrentTime(newTime);
    setIsSeeking(false);
  };

  if (!currentTrack || !isBarVisible) return null;

  return (
    <div className="fixed z-[100] bottom-0 left-0 right-0 border-t border-white/10 py-2 backdrop-blur bg-stone-800/80">
      <div className='flex items-center gap-2'>
        <div className="relative h-[70px] w-[70px] ml-2 flex-shrink-0 overflow-hidden rounded-md hidden sm:block">
          <img
            src={currentTrack.imageurl}
            alt={`${currentTrack.title} album art`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="grow max-w-[1104px] px-1 relative">
          <div className={cn(
            "pb-2 pt-1",
            (currentTime <= 0 || currentTime > duration || isLoading) && "invisible"
          )}
          >
            <div
              className="h-2 w-full cursor-pointer rounded-full bg-muted"
              onClick={handleSeek}
            >
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between sm:pt-0 pt-12 mb-2">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-medium">{currentTrack.title}</span>
                <span className="text-sm text-white/50">{currentTrack.artist}</span>
              </div>
            </div>

            <div className="text-sm text-white">
              {toClockTime(currentTime)} / {toClockTime(duration)}
            </div>
          </div>

          <div className="absolute left-1/2 top-[45px] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            <Button
              variant="icon"
              size="icon"
              onClick={handlePrevious}
              className="h-10 w-10"
              disabled={isLoading}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="icon"
              size="icon"
              onClick={handlePlayPause}
              className="h-10 w-10"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="icon"
              size="icon"
              onClick={handleNext}
              className="h-10 w-10"
              disabled={isLoading}
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

    </div >
  );
};

export default PlaybackBar; 
