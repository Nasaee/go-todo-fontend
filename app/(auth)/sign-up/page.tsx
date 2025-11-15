'use client';

import CustomInput from '@/components/input/CustomInput';
import MainHeaderTitle from '@/components/MainHeaderTitle';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUppage = () => {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <div className='min-w-[380px] md:min-w-[420px] flex flex-col gap-8'>
      <MainHeaderTitle>Sign Up</MainHeaderTitle>
      <form className='flex flex-col gap-6'>
        <CustomInput name='email' placeholder='Email address' required />
        <CustomInput name='firstName' placeholder='First Name' required />
        <CustomInput name='lastName' placeholder='Last Name' required />
        <CustomInput
          name='password'
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          required
          suffixIcon={
            showPassword.password ? (
              <AiOutlineEye
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, password: false }))
                }
              />
            ) : (
              <AiOutlineEyeInvisible
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, password: true }))
                }
              />
            )
          }
        />
        <CustomInput
          name='confirmPassword'
          type={showPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          required
          suffixIcon={
            showPassword.confirmPassword ? (
              <AiOutlineEye
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: false,
                  }))
                }
              />
            ) : (
              <AiOutlineEyeInvisible
                className='cursor-pointer text-gray-500'
                size={20}
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirmPassword: true,
                  }))
                }
              />
            )
          }
        />
        <Button
          type='submit'
          className='bg-primary py-4 text-md text-gray-800 tracking-wider'
        >
          Sign Up
        </Button>

        <p className='text-lg tracking-wider text-black text-center'>
          Already have an account?{' '}
          <span className='hover:text-green-600 hover:underline'>
            <Link href='/sign-in'>Sign In</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUppage;
