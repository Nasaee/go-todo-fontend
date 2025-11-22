import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/sign-in', '/sign-up']; // หน้า public ไม่ต้อง login

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access_token')?.value;

  const isAuthenticated = Boolean(accessToken);
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

  // 1) ถ้ายังไม่ login แต่จะเข้าหน้า protected → เด้งไป /login
  if (!isAuthenticated && !isPublic) {
    const loginUrl = new URL('/sign-in', req.url);
    // เก็บ path เดิมไว้ เผื่ออยาก redirect กลับ
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2) ถ้า login แล้ว แต่ดันเข้า /login หรือ /register → เด้งไป /today เลย
  if (isAuthenticated && isPublic) {
    return NextResponse.redirect(new URL('/today', req.url));
  }

  // 3) ปล่อยให้ไปต่อได้ตามปกติ
  return NextResponse.next();
}

// บอกว่า middleware นี้ให้ทำงานกับ path ไหนบ้าง
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // หรือจะใส่เฉพาะ path ที่ต้องการก็ได้ เช่น:
    // '/today/:path*',
    // '/upcoming/:path*',
    // '/calendar/:path*',
    // '/category/:path*',
  ],
};
