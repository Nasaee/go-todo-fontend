'use server';

import { API_BASE_URL } from '@/lib/env';

export async function registerAction(formData: FormData) {
  const first_name = formData.get('firstName') as string;
  const last_name = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const payload = {
    first_name,
    last_name,
    email,
    password,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ให้ Go ส่ง/รับ cookie ได้ (เช่น refresh token)
      credentials: 'include',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // พยายามอ่าน error body จาก backend
      let errorMessage = 'Register failed';
      try {
        const errBody = await res.json();
        errorMessage = errBody.error || errorMessage;
      } catch {
        // ถ้า parse json ไม่ได้ก็ใช้ข้อความ default ไป
      }

      return {
        ok: false,
        error: errorMessage,
        status: res.status,
      };
    }

    const data = await res.json();

    // data = สิ่งที่ backend ส่งกลับมา เช่น user, message ฯลฯ
    return {
      ok: true,
      data,
    };
  } catch (err) {
    console.error('registerAction error:', err);
    return {
      ok: false,
      error: 'Something went wrong while registering',
    };
  }
}
