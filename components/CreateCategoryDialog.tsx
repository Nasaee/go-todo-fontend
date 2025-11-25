'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import CustomInput from './input/CustomInput';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '@/lib/auth-api';
import { SpinnerCustom } from './SpinnerCustom';
import { cn } from '@/lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
}

const colorsData = [
  '#6DC3BB',
  '#393D7E',
  '#5459AC',
  '#F2AEBB',
  '#F8B55F',
  '#78C841',
  '#FF6D1F',
  '#222222',
  '#F6B1CE',
  '#1581BF',
  '#3DB6B1',
  '#CCE5CF',
  '#5A0E24',
  '#76153C',
  '#BF124D',
  '#F0E491',
  '#BBC863',
  '#658C58',
  '#31694E',
  '#7C4585',
  '#3D365C',
  '#C95792',
];

const CreateCategoryDialog = ({ open, onClose }: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    color: colorsData[0],
  });
  const [error, setError] = useState<string>('');
  const [errorResponse, setErrorResponse] = useState('');

  const queryClient = useQueryClient();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setFormData((prev) => ({ ...prev, name: value }));
    }
  };

  const handleClose = () => {
    setFormData({ name: '', color: colorsData[0] });
    setError('');
    setErrorResponse('');
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getAllCategories'] });
      handleClose();
    },
    onError: (err: any) => {
      const message =
        err?.response?.data?.error || err?.message || 'Create category failed';

      setErrorResponse(message);
    },
  });

  const onSubmit = () => {
    if (!formData.name || formData.name.trim() === '') {
      setError('Category name is required');
      return;
    }

    mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className='my-4 space-y-4'>
          {errorResponse && (
            <p className='text-red-500 text-sm text-center bg-red-100 py-2 rounded-sm'>
              {errorResponse}
            </p>
          )}
          <CustomInput
            name='name'
            placeholder='Category Name'
            onChange={onInputChange}
            value={formData.name}
            error={error}
          />

          <div className='flex flex-wrap justify-center gap-2'>
            {colorsData.map((color) => {
              const isActive = color === formData.color;
              return (
                <button
                  key={color}
                  className={cn(
                    'size-8 rounded-md cursor-pointer',
                    isActive && 'ring-2 ring-offset-2'
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData((prev) => ({ ...prev, color }))}
                />
              );
            })}
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            {isPending ? <SpinnerCustom /> : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
