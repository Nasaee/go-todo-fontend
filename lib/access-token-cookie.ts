'use client';

const ACCESS_TOKEN_COOKIE_NAME = 'access_token';

export function setAccessTokenCookie(
  token: string,
  accessExpires: number // unix seconds
) {
  const nowSec = Math.floor(Date.now() / 1000);
  let maxAge = accessExpires - nowSec;
  if (maxAge < 0) maxAge = 0;

  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=${encodeURIComponent(
    token
  )}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
}

export function getAccessTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(
      `(?:^|; )${ACCESS_TOKEN_COOKIE_NAME.replace(
        /([.$?*|{}()[\]\\/+^])/g,
        '\\$1'
      )}=([^;]*)`
    )
  );

  return match ? decodeURIComponent(match[1]) : null;
}

export function clearAccessTokenCookie() {
  document.cookie = `${ACCESS_TOKEN_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax`;
}

/*
helper สำหรับจัดการ access_token ใน cookie
ตรงนี้คือจุดที่ทำให้ access_token cookie หมดอายุตรงกับ exp ของ JWT (หรือใกล้เคียงมาก ๆ)
*/
