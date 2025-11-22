import { SpinnerCustom } from '@/components/SpinnerCustom';
import React from 'react';

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <SpinnerCustom className='text-primary size-7' />
    </div>
  );
};

export default Loading;
