'use client';

import Link from 'next/link';
import MainHeaderTitle from './MainHeaderTitle';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { GoSignOut } from 'react-icons/go';
import { PiUserCircleThin } from 'react-icons/pi';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/lib/auth-api';
import { useAuthStore } from '@/stores/auth-store';

const categories = [
  { id: 1, name: 'Work', color: '#1c7ed6' },
  { id: 2, name: 'Personal', color: '#f03e3e' },
  { id: 3, name: 'Shopping', color: '#2f9e44' },
];

const menu = [
  {
    title: 'Task',
    children: [
      { title: 'Upcoming', link: '/upcoming' },
      { title: 'Today', link: '/today' },
      { title: 'Calendar', link: '/calendar' },
    ],
  },
  {
    title: 'Lists',
    children: categories?.map((category) => {
      return {
        title: category.name,
        link: `/category/${category.id}`,
        color: category.color,
      };
    }),
  },
];

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuthStore();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.replace('/sign-in');
    },
  });

  return (
    <aside className='bg-[#F4F4F4] w-full h-full px-8 py-10 rounded-2xl flex flex-col justify-between'>
      <div className='flex flex-col gap-12'>
        <div className='flex items-center gap-2 text-md tracking-wider -mb-5'>
          <PiUserCircleThin size={22} />
          <p>{user?.first_name || ''}</p>
          <p>{user?.last_name || ''}</p>
          <Image
            src='https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat.png'
            alt='Cat'
            width='30'
            height='30'
            className='-mt-3'
          />
        </div>
        <MainHeaderTitle>Menu</MainHeaderTitle>
        <nav className='flex flex-col gap-8'>
          {menu.map((section) => {
            return (
              <div key={section.title}>
                <h2 className='text-xl font-bold text-gray-700 mb-2'>
                  {section.title}
                </h2>
                <ul className='text-lg'>
                  {section?.children?.map((item) => {
                    const isActive = pathname.startsWith(item.link);
                    const isGroupMenu = item.link.startsWith('/category/');
                    return (
                      <li key={item.title}>
                        <Link
                          href={item.link}
                          className={cn(
                            'pl-6 pr-4 py-2 rounded-full text-gray-500 transition-colors duration-300 ease-in-out tracking-wide flex items-center',
                            isActive
                              ? 'bg-primary text-black'
                              : 'hover:bg-gray-200'
                          )}
                        >
                          {isGroupMenu && 'color' in item && (
                            <span
                              className='w-4 h-3 rounded-full inline-block mr-2'
                              style={{
                                backgroundColor: (item as { color: string })
                                  .color,
                              }}
                            ></span>
                          )}{' '}
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      <div className='flex flex-col gap-6'>
        <Button
          variant='ghost'
          className='flex w-full justify-start hover:bg-gray-200 cursor-pointer tracking-wider'
          onClick={() => logoutUser()}
          disabled={isPending}
        >
          <GoSignOut />
          <span>Sign out</span>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
