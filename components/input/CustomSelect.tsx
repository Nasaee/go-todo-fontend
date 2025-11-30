import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
  value: any;
  label: string;
}

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  containterClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  selectLabel?: string;
  options: Option[];
  label?: string;
  error?: string;
  required?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

const CustomSelect = ({
  label,
  containterClassName,
  placeholder,
  selectLabel,
  inputClassName,
  options,
  required = false,
  value,
  onChange,
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
      <Select onValueChange={onChange} value={value as any}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{selectLabel}</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {props.error && (
        <p className=' absolute -bottom-4.5 pl-2 text-red-500 text-xs mt-1'>
          {props.error}
        </p>
      )}
    </div>
  );
};

export default CustomSelect;
