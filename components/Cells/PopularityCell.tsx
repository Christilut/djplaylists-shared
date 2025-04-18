import { TrendingDown, TrendingUp } from 'lucide-react';
import { cn } from '../../../../lib/utils';

const PopularityCell = ({ value }: { value: number | undefined }) => {
  const className = 'w-[60px] min-w-[60px] lg:w-[100px] lg:min-w-[100px]'

  return (
    <div className={cn('text-center', className, value > 70 && 'text-green-500', typeof value === 'number' && value < 30 && 'text-red-500')}>
      <div className='flex justify-center gap-1'>
        {value === undefined || value === null ? '-' : `${value}%`}
        {typeof value === 'number' && value > 70 && (
          <TrendingUp size={20} />
        )}
        {typeof value === 'number' && value < 30 && (
          <TrendingDown size={20} />
        )}
      </div>
    </div>
  );
};

export default PopularityCell;
