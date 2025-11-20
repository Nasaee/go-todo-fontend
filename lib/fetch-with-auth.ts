// lib/fetch-with-auth.ts
import { cookies } from 'next/headers';
import { API_BASE_URL } from './env';

async function refreshAccessToken() {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.access_token as string;
}

export async function fetchWithAuth(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const baseInit: RequestInit = {
    ...init,
    credentials: 'include',
    headers: {
      ...(init.headers || {}),
      Cookie: cookies().toString(),
    },
  };

  const res = await fetch(`${API_BASE_URL}${path}`, baseInit);

  if (res.status !== 401) {
    return res;
  }

  // ลอง refresh access token
  const newAccessToken = await refreshAccessToken();
  if (!newAccessToken) {
    // refresh ไม่ได้แล้ว → ให้ caller ตัดสินใจ (เช่น redirect /sign-in)
    return res;
  }

  const retryInit: RequestInit = {
    ...baseInit,
    headers: {
      ...(baseInit.headers || {}),
      Authorization: `Bearer ${newAccessToken}`,
    },
  };

  const retryRes = await fetch(`${API_BASE_URL}${path}`, retryInit);
  return retryRes;
}
