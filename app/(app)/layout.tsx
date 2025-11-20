import Sidebar from '@/components/Sidebar';
import React from 'react';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className='flex gap-10 min-h-screen p-8 relative'>
      {/* Sidebar */}
      <div className='w-80'>
        <Sidebar />
      </div>

      {/* Content */}
      <div className='flex-1'>{children}</div>
    </main>
  );
};

export default MainLayout;
