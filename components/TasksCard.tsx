import { cn } from '@/lib/utils';

const TasksCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('py-4 px-6 border rounded-2xl space-y-6', className)}>
      {children}
    </div>
  );
};

export default TasksCard;
