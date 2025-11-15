import { cn } from '@/lib/utils';
import { Input } from '../ui/input';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  containterClassName?: string;
  inputClassName?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

const CustomInput = ({
  prefixIcon,
  suffixIcon,
  containterClassName,
  inputClassName,
  ...props
}: Props) => {
  return (
    <div className={cn('relative', containterClassName)}>
      <Input className={cn('w-full', inputClassName)} {...props} />
      {props.error && (
        <p className='text-red-500 text-xs mt-1'>{props.error}</p>
      )}
      {prefixIcon && <div className=''>{prefixIcon}</div>}
      {suffixIcon && (
        <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
          {suffixIcon}
        </div>
      )}
    </div>
  );
};

export default CustomInput;
