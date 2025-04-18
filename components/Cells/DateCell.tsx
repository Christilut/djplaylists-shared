import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DJPlaylistItem } from '../../interfaces/supabase';

interface DateCellProps {
  track: DJPlaylistItem;
  isFirstRow?: boolean;
}

const DateCell: React.FC<DateCellProps> = ({ track, isFirstRow = false }) => {
  if (!track.releasedate) return <div className="text-center"></div>;

  const year = new Date(track.releasedate).getFullYear();
  const fullDate = new Date(track.releasedate).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const tooltipText = `${track.album} was released on ${fullDate}`

  if (track.releasedate) {
    return (
      <TooltipProvider delayDuration={0} >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="text-center">
              {year}
            </div>
          </TooltipTrigger>
          <TooltipContent side={isFirstRow ? "bottom" : "top"} className="max-w-[300px]">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  } else {
    return (
      <div className="text-center">
        -
      </div>
    )
  }
};

export default DateCell; 
