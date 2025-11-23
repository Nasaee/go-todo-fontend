'use client';

import CustomInput from '@/components/input/CustomInput';
import MainHeaderTitle from '@/components/MainHeaderTitle';
import { Button } from '@/components/ui/button';
import { login } from '@/lib/auth-api';
import { DEFAULT_PAGE } from '@/lib/configs';
import { LoginForm, loginSchema } from '@/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignInpage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [errorResponse, setErrorResponse] = useState('');

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      router.push(DEFAULT_PAGE);
    },
    onError: (err: any) => {
      // ปรับข้อความตามรูปแบบ error ของ backend
      const message =
        err?.response?.data?.error ||
        err?.message ||
        'Invalid email or password';

      setErrorResponse(message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    // คือการบอกให้ react-hook-form ใช้ Zod schema เป็นตัว validate form ให้เรา
    resolver: zodResolver(loginSchema),
    // คือการกำหนดว่า จะ validate form ตอนไหน
    mode: 'onSubmit', // validate ตอนกดปุ่ม Submit เท่านั้น
  });

  const onSubmit = (value: LoginForm) => {
    setErrorResponse('');
    mutate(value);
  };

  return (
    <div className='min-w-[380px] md:min-w-[420px] flex flex-col gap-8'>
      <MainHeaderTitle>Sign In</MainHeaderTitle>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        {errorResponse && (
          <p className='text-red-500 text-sm text-center bg-red-100 py-2 rounded-sm'>
            {errorResponse}
          </p>
        )}
        <CustomInput
          placeholder='Email address'
          {...register('email')}
          error={errors?.email?.message}
        />
        <CustomInput
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          {...register('password')}
          error={errors?.password?.message}
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
