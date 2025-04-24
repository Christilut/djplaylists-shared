import { cn } from '../../../../lib/utils';
import { KeyConverter } from '../../helpers/KeyConverter';

const KeyCell = ({ value, className }: { value: string | undefined, className?: string }) => {
  if (value === undefined || value === null) return <div className="text-center">-</div>;

  const keyNumber = KeyConverter.toKeyNumber(value);
  const color = KeyConverter.getKeyNumberColor(keyNumber);

  return (
    <td>
      <div className={cn("text-center", className)}>
        <span style={{ color }}>{value}</span>
      </div>
    </td>
  );
};

export default KeyCell; 
