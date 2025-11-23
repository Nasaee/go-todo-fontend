'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* เพิ่ม provider อื่น ๆ ได้ เช่น */}
        {children}
      </QueryClientProvider>
    </>
  );
}
