import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/', '/login', '/dashboard/:path*', '/settings/:path*'], 
};
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const url = request.nextUrl;
    if (token && url.pathname === '/') {
    const userRoutePath = (token as any)?.routePath; 
    console.log(`Middleware: Authenticated user on /login, redirecting to ${userRoutePath}`);
    return NextResponse.redirect(new URL(userRoutePath, request.url));
  }

    return NextResponse.next(); 
}