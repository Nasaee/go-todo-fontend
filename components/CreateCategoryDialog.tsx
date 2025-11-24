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

interface Props {
  open: boolean;
  onClose: () => void;
}

const CreateCategoryDialog = ({ open, onClose }: Props) => {
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [errorResponse, setErrorResponse] = useState('');

  const queryClient = useQueryClient();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    }
  };

  const handleClose = () => {
    setName('');
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
    if (!name || name.trim() === '') {
      setError('Category name is required');
      return;
    }

    mutate(name);
  };
  // TODO: i forgot to add pick color field
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>
        <div className='my-4'>
          {errorResponse && (
            <p className='text-red-500 text-sm text-center bg-red-100 py-2 rounded-sm'>
              {errorResponse}
            </p>
          )}
          <CustomInput
            name='name'
            placeholder='Category Name'
            onChange={onInputChange}
            error={error}
          />
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
