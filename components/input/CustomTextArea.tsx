import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  containterClassName?: string;
  inputClassName?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

const CustomTextArea = ({
  label,
  containterClassName,
  inputClassName,
  required = false,
  ...props
}: Props) => {
  return (
    <div className={cn('relative', containterClassName)}>
      {label && (
        <label className='text-sm font-medium'>
          {label}
          {required && <span className='text-red-500'>*</span>}
        </label>
      )}
      <Textarea className={cn('w-full', inputClassName)} {...props} />
      {props.error && (
        <p className=' absolute -bottom-4.5 pl-2 text-red-500 text-xs mt-1'>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default CustomTextArea;
