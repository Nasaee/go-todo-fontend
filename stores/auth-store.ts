// auth-store.ts
'use client';

import { User } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;

  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,

      setUser: (user: User | null) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-store',
    }
  )
);
