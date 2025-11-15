import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <h1 className='text-4xl md:text-5xl font-semibold text-gray-800'>
        ToDo Go
      </h1>
      <p className='max-w-lg text-lg tracking-wider text-gray-700'>
        Stay Organized, Get Things Done: Your Ultimate To-Do List App. <br />A
        todo list app is a digital task management tool designed to help users
        organize and prioritize their daily activities and responsibilities.
      </p>
      <Button
        variant='default'
        className='bg-primary w-full text-lg tracking-wider text-gray-800 py-6'
      >
        Get Started
      </Button>
      <p className='text-md tracking-wider text-black'>
        Already have an account?{' '}
        <span className='hover:text-green-600 hover:underline'>
          <Link href='/sign-in'>Sign In</Link>
        </span>
      </p>
    </div>
  );
};

export default Home;
