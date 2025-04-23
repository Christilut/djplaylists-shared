import { cn } from '../../../../lib/utils';

const HappinessCell = ({ value }: { value: number | undefined }) => {
  const className = 'w-[50px] min-w-[50px] lg:w-[100px] lg:min-w-[100px]'

  return (
    <div className={cn('text-center', className, value > 0.7 && 'text-green-500')}>
      <div className='flex justify-center gap-1'>
        {value === undefined || value === null ? '-' : `${Math.round(value * 100)}%`}
        {/* {typeof value === 'number' && value > 0.7 && (
          <Smile size={20} />
        )} */}
      </div>
    </div>
  );
};

export default HappinessCell;
