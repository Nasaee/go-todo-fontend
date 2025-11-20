// actions/auth.ts
'use server';

import { API_BASE_URL } from '@/lib/env';
import type { RegisterResponse } from '@/types/typse';

export async function registerAction(
  formData: FormData
): Promise<RegisterResponse> {
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

  // ⛔ ถ้า error → โยนออกไปเลย
  if (!res.ok) {
    let message = 'Register failed';

    try {
      const json = await res.json();
      if (json?.error) message = json.error;
    } catch {}

    throw new Error(message);
  }

  // ✔ success → parse JSON ตาม type RegisterResponse
  const data = (await res.json()) as RegisterResponse;
  return data;
}
