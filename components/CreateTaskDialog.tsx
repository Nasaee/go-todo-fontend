'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { TaskForm } from '@/types/types';
import { useState } from 'react';
import CustomInput from './input/CustomInput';
import CustomTextArea from './input/CustomTextArea';
import CustomSelect from './input/CustomSelect';
import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/lib/auth-api';
import { Button } from './ui/button';
import { SpinnerCustom } from './SpinnerCustom';

interface Props {
  open: boolean;
  onClose: () => void;
}

const initialFormData: TaskForm = {
  title: '',
  description: '',
  date_start: null,
  date_end: null,
  todo_group_id: 0,
};

type FormError = Partial<Record<keyof TaskForm, string>>;

const CreateTaskDialog = ({ open, onClose }: Props) => {
  const [formData, setFormData] = useState<TaskForm>(initialFormData);
  const [errors, setErrors] = useState<FormError>({});
  const [errorResponse, setErrorResponse] = useState('');

  const { data } = useQuery({
    queryKey: ['getAllCategories'],
    queryFn: getAllCategories,
  });

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSelectChange = (value: any) => {
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      todo_group_id: value,
    }));
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setErrorResponse('');
    onClose();
  };

  const onSubmit = () => {};

  // ! temporary
  const isPending = false;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <div className='my-4 space-y-4'>
          {errorResponse && (
            <p className='text-red-500 text-sm text-center bg-red-100 py-2 rounded-sm'>
              {errorResponse}
            </p>
          )}
          <CustomInput
            name='title'
            label='Task title'
            placeholder='Task name'
            onChange={onInputChange}
            required
            value={formData.title}
            error={errors.title}
          />
          <CustomTextArea
            name='description'
            label='Task description'
            placeholder='Description'
            onChange={onInputChange}
            value={formData.description}
            error={errors.description}
          />
          <div className='grid grid-cols-2 gap-4'>
            <CustomInput
              name='date_start'
              type='date'
              label='From'
              placeholder='Date start'
              onChange={onInputChange}
              value={formData.date_start?.toISOString().split('T')[0]}
              error={errors.date_start}
            />
            <CustomInput
              name='date_end'
              type='date'
              label='To'
              placeholder='To'
              onChange={onInputChange}
              value={formData.date_end?.toISOString().split('T')[0]}
              error={errors.date_end}
            />
          </div>
          <CustomSelect
            label='Category'
            options={
              data
                ? data?.map((category) => ({
                    value: category.id,
                    label: category.name,
                  }))
                : []
            }
            name='todo_group_id'
            selectLabel='Category'
            value={formData.todo_group_id}
            onChange={onSelectChange}
            required
          />
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={handleClose}
            disabled={isPending}
            className='w-20'
          >
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending} className='w-20'>
            {isPending ? <SpinnerCustom /> : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
