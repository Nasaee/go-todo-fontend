import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Props {
  isLastItem: boolean;
  title: string;
  isSuccess: boolean;
}

const TodoItem = ({ isLastItem, title, isSuccess }: Props) => {
  return (
    <div
      className={cn(
        'flex gap-3 py-4 px-4 items-center border-t tracking-wide text-gray-700',
        isLastItem && 'border-b'
      )}
    >
      <Checkbox checked={isSuccess} />
      <p>{title}</p>
    </div>
  );
};

export default TodoItem;
