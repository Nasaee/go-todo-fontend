import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

const MainHeaderTitle = ({ className = '', ...props }: Props) => {
  return (
    <h1
      className={cn('text-4xl font-bold text-gray-700', className)}
      {...props}
    >
      {props.children}
    </h1>
  );
};

export default MainHeaderTitle;
