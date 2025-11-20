'use client';

import React from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* เพิ่ม provider อื่น ๆ ได้ เช่น */}
      {children}
    </>
  );
}
