'use client';

import {
  clearAccessTokenCookie,
  setAccessTokenCookie,
} from './access-token-cookie';
import type {
  Category,
  RegisterPayload,
  RegisterResponse,
  User,
} from '@/types/types';
import { apiAuth, baseApi } from './api-client.ts';
import { useAuthStore } from '@/stores/auth-store';

const registerUser = async (payload: RegisterPayload): Promise<User> => {
  try {
    const res = await baseApi.post<RegisterResponse>('/auth/register', payload);

    const { access_token, access_expires, user } = res.data;

    // เก็บ access_token ลง cookie ตามเวลา access_expires ที่ backend ส่งมา
    setAccessTokenCookie(access_token, access_expires);

    return user;
  } catch (err: any) {
    // ดึง message จาก backend ถ้ามี
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message ?? 'Register failed');
  }
};

const logout = async () => {
  try {
    await baseApi.post('/auth/logout'); // ให้ backend ลบ refresh_token (HttpOnly)
  } catch (err) {
    // ถ้า error 401/500 ก็ไม่เป็นไร เราจะเคลียร์ฝั่ง client ต่ออยู่ดี
    console.error('logout error', err);
  }

  // เคลียร์ access_token ฝั่ง client
  clearAccessTokenCookie();

  // เคลียร์ user ใน Zustand
  useAuthStore.getState().clearUser();
};

const login = async (payload: { email: string; password: string }) => {
  try {
    const res = await baseApi.post<RegisterResponse>('/auth/login', payload);
    const { access_token, access_expires, user } = res.data;

    // เก็บ access_token ลง cookie ตามเวลา access_expires ที่ backend ส่งมา
    setAccessTokenCookie(access_token, access_expires);

    return user;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message ?? 'Login failed');
  }
};

const createCategory = async (data: { name: string; color: string }) => {
  try {
    console.log(data);
    const res = await apiAuth.post('/todo-groups', data);
    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message ?? 'Create category failed');
  }
};

const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await apiAuth.get('/todo-groups');
    return res.data;
  } catch (err: any) {
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message ?? 'Get categories failed');
  }
};

export { registerUser, logout, login, createCategory, getAllCategories };
