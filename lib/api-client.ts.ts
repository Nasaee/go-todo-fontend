// lib/base-api-url.ts
'use client';

import axios, {
  AxiosError,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL } from './env';
import {
  clearAccessTokenCookie,
  getAccessTokenFromCookie,
  setAccessTokenCookie,
} from './access-token-cookie';

/*
--------------------------------
  for call api without auth
--------------------------------
*/
const baseApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/*
--------------------------------
  for call api with auth
--------------------------------
*/
// 👇 config แบบมี flag เอาไว้กัน retry ซ้ำ
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// 👇 helper ตั้ง Authorization header ให้ถูก type (AxiosHeaders)
function setAuthHeader(config: InternalAxiosRequestConfig, token: string) {
  let headers: AxiosHeaders;

  if (!config.headers) {
    // ยังไม่มี header → สร้างใหม่
    headers = new AxiosHeaders();
  } else if (config.headers instanceof AxiosHeaders) {
    // เป็น AxiosHeaders อยู่แล้ว
    headers = config.headers;
  } else {
    // เป็น plain object → แปลงมาเป็น AxiosHeaders
    headers = new AxiosHeaders(config.headers);
  }

  headers.set('Authorization', `Bearer ${token}`);
  config.headers = headers;
}

const apiAuth = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ส่ง refresh_token cookie ให้ backend เสมอ
});

// ========== REQUEST INTERCEPTOR ==========
apiAuth.interceptors.request.use((config) => {
  const token = getAccessTokenFromCookie();

  if (token) {
    setAuthHeader(config, token);
  }

  return config;
});

// ========== RESPONSE INTERCEPTOR (401 → refresh → retry) ==========

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

apiAuth.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalConfig = error.config as RetryConfig | undefined;

    // ถ้าไม่มี config / ไม่ใช่ 401 / เคย retry แล้ว → ปล่อยให้ไป handle ข้างนอก
    if (
      !originalConfig ||
      error.response?.status !== 401 ||
      originalConfig._retry
    ) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    // ถ้ามี refresh กำลังรันอยู่ → รอให้เสร็จก่อน
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((newToken) => {
          if (!newToken) {
            reject(error);
            return;
          }

          setAuthHeader(originalConfig, newToken);
          resolve(apiAuth(originalConfig));
        });
      });
    }

    // ตัวแรกที่มาถึง 401 → เริ่ม refresh จริง
    isRefreshing = true;

    try {
      // 👇 เรียก backend /auth/refresh (browser จะส่ง refresh_token cookie ไปให้)
      const refreshRes = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      const data = refreshRes.data as {
        access_token: string;
        access_expires: number;
      };

      // เก็บ access_token ใหม่ใน cookie พร้อม expiry
      setAccessTokenCookie(data.access_token, data.access_expires);

      // ปลุกคิวที่รออยู่ ให้มันยิงต่อได้ด้วย token ใหม่
      refreshQueue.forEach((fn) => fn(data.access_token));
      refreshQueue = [];
      isRefreshing = false;

      // ยิง request เดิมซ้ำด้วย token ใหม่
      setAuthHeader(originalConfig, data.access_token);

      return apiAuth(originalConfig);
    } catch (err) {
      // refresh fail → ล้าง token ทิ้งแล้วเด้งไป login
      clearAccessTokenCookie();
      refreshQueue.forEach((fn) => fn(null));
      refreshQueue = [];
      isRefreshing = false;

      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }

      return Promise.reject(err);
    }
  }
);

export { baseApi, apiAuth };
