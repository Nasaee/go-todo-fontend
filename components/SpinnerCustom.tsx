import { LoaderIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <LoaderIcon
      role='status'
      aria-label='Loading'
      className={cn('size-5 animate-spin text-slate-500', className)}
      {...props}
    />
  );
}

export function SpinnerCustom({
  className,
  ...props
}: React.ComponentProps<'svg'>) {
  return (
    <div className='flex items-center gap-4'>
      <Spinner className={className} {...props} />
    </div>
  );
}
