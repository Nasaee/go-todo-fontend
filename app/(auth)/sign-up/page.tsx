'use client';

import { registerAction } from '@/acctions/auth-action';
import CustomInput from '@/components/input/CustomInput';
import MainHeaderTitle from '@/components/MainHeaderTitle';
import { SpinnerCustom } from '@/components/SpinnerCustom';
import { Button } from '@/components/ui/button';
import { registerUser } from '@/lib/auth-api';
import { registerSchema, RegisterSchema } from '@/schemas/auth-schema';
import { useAuthStore } from '@/stores/auth-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const SignUpPage = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [serverError, setServerError] = useState('');

  const { setUser } = useAuthStore();

  const { mutate: createUser, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (user) => {
      setUser(user);
      router.push('/upcoming');
    },
    onError: (err: any) => {
      console.log(err);
      setServerError(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    // คือการบอกให้ react-hook-form ใช้ Zod schema เป็นตัว validate form ให้เรา
    resolver: zodResolver(registerSchema),
    // คือการกำหนดว่า จะ validate form ตอนไหน
    mode: 'onSubmit', // validate ตอนกดปุ่ม Submit เท่านั้น
  });

  const onSubmit = (value: RegisterSchema) => {
    setServerError('');
    const userData = {
      first_name: value.firstName,
      last_name: value.lastName,
      email: value.email,
      password: value.password,
    };

    console.log('data:', userData);

    createUser(userData);
  };

  return (
    <div className='min-w-[380px] md:min-w-[420px] flex flex-col gap-8'>
      <MainHeaderTitle>Sign Up</MainHeaderTitle>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6'>
        {serverError && (
          <p className='text-red-500 text-sm text-center bg-red-100 py-2 rounded-sm'>
            {serverError}
          </p>
        )}
        <CustomInput
          placeholder='Email address'
          {...register('email')}
          error={errors?.email?.message}
        />
        <CustomInput
          placeholder='First Name'
          {...register('firstName')}
          error={errors?.firstName?.message}
          inputClassName='capitalize'
        />
        <CustomInput
          placeholder='Last Name'
          {...register('lastName')}
          error={errors?.lastName?.message}
          inputClassName='capitalize'
        />
        <CustomInput
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          {...register('password')}
          error={errors?.password?.message}
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
          type={showPassword ? 'text' : 'password'}
          placeholder='Confirm Password'
          {...register('confirmPassword')}
          error={errors?.confirmPassword?.message}
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
          disabled={isPending}
        >
          {isPending ? <SpinnerCustom /> : 'Sign Up'}
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

export default SignUpPage;
