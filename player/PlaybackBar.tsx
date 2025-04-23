import { Button } from '@/components/ui/button';
import { Pause, Play, SkipBack, SkipForward, Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { PlayerManager } from './PlayerManager';
import { PlaybackState } from './MusicPlayerBase';
import { cn } from '../../../lib/utils';
import { DJPlaylistItem } from '../interfaces/supabase';
import { toClockTime } from '../helpers/time';
import { User } from '@supabase/supabase-js';

const PlaybackBar = ({ user }: { user: User | null }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<DJPlaylistItem | null>(null);
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
    let interval: NodeJS.Timeout;

    const updateTime = () => {
      if (!isPlaying || isSeeking) return;

      setCurrentTime(PlayerManager.player?.getCurrentTime() || 0);
      setDuration(PlayerManager.player?.getDuration() || 0);
    };

    if (isPlaying) {
      interval = setInterval(updateTime, 20);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, isSeeking]);


  useEffect(() => {
    // Add state listener to update when track or playback state changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      PlayerManager.initializePlayer(!!user);

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
    }, 1500);
    
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
    <div className="fixed z-50 bottom-0 left-0 right-0 border-t border-white/10 pt-2 backdrop-blur bg-stone-800/80">
      <div className="mx-auto max-w-[1104px] px-2 relative">
        <div className="flex items-center justify-between sm:pt-0 pt-12">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
              <img
                src={currentTrack.imageurl.replace('{w}', '120').replace('{h}', '120')}
                alt={`${currentTrack.title} album art`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{currentTrack.title}</span>
              <span className="text-sm text-white/50">{currentTrack.artist}</span>
            </div>
          </div>

          <div className="text-sm text-white">
            {toClockTime(currentTime)} / {toClockTime(duration)}
          </div>
        </div>

        <div className="absolute left-1/2 top-[25px] -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
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

        <div className={cn(
          "mt-2 pb-2 pt-1",
          (currentTime <= 0 || currentTime > duration || isLoading) && "invisible"
        )}
        >
          <div
            className="h-1 w-full cursor-pointer rounded-full bg-muted"
            onClick={handleSeek}
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div >
  );
};

export default PlaybackBar; 
