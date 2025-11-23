// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/sign-in', '/sign-up'];
const DEFAULT_PAGE = '/upcoming';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token')?.value;

  const isAuthenticated = Boolean(accessToken);
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // ✅ เคสพิเศษ: root path "/"
  if (pathname === '/') {
    // ล็อกอินแล้ว → ส่งเข้าหน้า default
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_PAGE, req.url));
    }

    // ยังไม่ล็อกอิน → ส่งไปหน้า sign-in
    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ❌ ยังไม่ login + จะเข้า protected → เด้งไป /sign-in
  if (!isAuthenticated && !isPublic) {
    const loginUrl = new URL('/sign-in', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ login แล้ว แต่จะเข้า /sign-in หรือ /sign-up → เด้งไป default page
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL(DEFAULT_PAGE, req.url));
  }

  return NextResponse.next();
}

// ให้ middleware ทำงานเฉพาะ path เหล่านี้
export const config = {
  matcher: [
    '/', // 👈 เพิ่ม root ด้วย
    '/today/:path*',
    '/upcoming/:path*',
    '/calendar/:path*',
    '/category/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
