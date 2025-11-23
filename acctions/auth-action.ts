'use server';

import { API_BASE_URL } from '@/lib/env';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { LoginResponse, RegisterResponse } from '@/types/types';

async function setAccessTokenCookie(
  accessToken: string,
  accessExpires: number
) {
  const cookieStore = await cookies();

  const nowSec = Math.floor(Date.now() / 1000);
  let maxAge = accessExpires - nowSec;

  if (maxAge < 0) {
    maxAge = 0;
  }

  cookieStore.set('access_token', accessToken, {
    httpOnly: false, // เราตั้งใจให้ FE อ่านได้
    path: '/',
    maxAge,
  });
}

async function registerAction(formData: FormData) {
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

  await setAccessTokenCookie(data.access_token, data.access_expires);

  redirect('/upcoming');
}

async function logoutAction() {
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

async function loginAction(formData: FormData) {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // ให้ backend set refresh_token cookie ได้
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

  await setAccessTokenCookie(data.access_token, data.access_expires);

  redirect('/today');
}

export { setAccessTokenCookie, registerAction, logoutAction, loginAction };
