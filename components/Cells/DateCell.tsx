import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DJTrack } from '../../interfaces/supabase';

interface DateCellProps {
  track: DJTrack;
  isFirstRow?: boolean;
}

const DateCell: React.FC<DateCellProps> = ({ track, isFirstRow = false }) => {
  if (!track.releasedate) return <div className="text-center"></div>;

  const year = new Date(track.releasedate).getFullYear();
  // const fullDate = new Date(track.releasedate).toLocaleDateString(undefined, {
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric'
  // });
  const tooltipText = `<b>${track.album}</b> was released in ${year}`

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
            <div dangerouslySetInnerHTML={{ __html: tooltipText }} />
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
