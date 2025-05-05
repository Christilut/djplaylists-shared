import { cn } from '../../../../lib/utils';

const getPercentageColor = (value: number): { bg: string; text: string } => {
  if (value <= 35) return { bg: 'bg-red-500/60', text: 'text-white' }
  else if (value >= 70) return { bg: 'bg-green-500/60', text: 'text-white' }
  else return { bg: 'bg-yellow-400/60', text: 'text-white' }
};

const PercentageCell = ({ value, className }: { value: number | undefined, className?: string }) => {
  if (value === undefined || value === null) return <div className="text-center">-</div>;

  const percentage = Math.round(value * 100);
  const { bg, text } = getPercentageColor(percentage);

  return (
    <div className={cn("text-center", className)}>
      <div className={cn("inline-block px-2 py-[2px] rounded-md text-[15px]", bg, text)}>
        {percentage}%
      </div>
    </div>
  );
};

export default PercentageCell;
