import Image from 'next/image';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=' bg-[#C4C4C4]'>
      <div className='min-h-screen w-screen max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 mx-auto gap-5 p-4 md:p-8'>
        <div className='relative rounded-3xl overflow-hidden hidden lg:block shadow-md'>
          <Image
            src='/todo-bg.jpg'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            alt='todo-bg'
            loading='eager'
            className='w-full h-full object-cover absolute'
          />
        </div>
        <div className='bg-white rounded-3xl overflow-hidden shadow-md grid place-items-center p-10'>
          {children}
        </div>
      </div>
    </main>
  );
}
