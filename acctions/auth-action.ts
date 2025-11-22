'use server';

import { API_BASE_URL } from '@/lib/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { LoginResponse, RegisterResponse } from '@/types/typse';

export async function registerAction(formData: FormData) {
  const payload = {
    first_name: formData.get('firstName'),
    last_name: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Register failed';
    try {
      const json = await res.json();
      if (json?.error) message = json.error;
    } catch {}

    throw new Error(message);
  }

  const data = (await res.json()) as RegisterResponse;

  const cookieStore = await cookies();
  cookieStore.set('access_token', data.access_token, {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60,
  });

  redirect('/today');
}

export async function loginAction(formData: FormData): Promise<LoginResponse> {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Login failed';
    try {
      const json = await res.json();
      if (json?.error) message = json.error;
    } catch {}

    throw new Error(message);
  }

  const data = (await res.json()) as LoginResponse;
  return data;
}

export async function logoutAction() {
  // 1) ยิงไป backend เพื่อลบ refresh_token cookie
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include', // สำคัญมาก ต้องมีเพื่อส่ง cookie ไปด้วย
    });
  } catch (err) {
    // จะ log ไว้เฉยๆ ก็ได้ ไม่ต้อง block logout ฝั่ง FE
    console.error('logout api error', err);
  }

  // 2) ลบ access_token cookie ฝั่ง Next
  const cookieStore = await cookies();

  cookieStore.set('access_token', '', {
    httpOnly: false,
    path: '/',
    maxAge: 0, // ให้หมดอายุทันที
  });

  // 3) เด้งกลับหน้า login
  redirect('/sign-in');
}
