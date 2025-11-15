'use client';

import CustomInput from '@/components/input/CustomInput';
import MainHeaderTitle from '@/components/MainHeaderTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignInpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='min-w-[380px] md:min-w-[420px] flex flex-col gap-8'>
      <MainHeaderTitle>Sign In</MainHeaderTitle>
      <form className='flex flex-col gap-6'>
        <CustomInput
          name='email'
          type='email'
          placeholder='Email address'
          required
        />
        <CustomInput
          name='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          required
          suffixIcon={
            showPassword ? (
              <AiOutlineEye
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() => setShowPassword(true)}
              />
            )
          }
        />
        <Button
          type='submit'
          className='bg-primary py-4 text-lg text-gray-800 tracking-wider'
        >
          Sign In
        </Button>

        <p className='text-lg tracking-wider text-black text-center'>
          Already have an account?{' '}
          <span className='hover:text-green-600 hover:underline'>
            <Link href='/sign-up'>Sign Up</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignInpage;
