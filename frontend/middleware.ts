import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// export const config = {
//   matcher: ['/', '/login', '/dashboard/:path*', '/settings/:path*'], 
// };
// export async function middleware(request: NextRequest) {
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//   const url = request.nextUrl;
//     if (token && url.pathname === '/') {
//     const userRoutePath = (token as any)?.routePath; 
//     console.log(`Middleware: Authenticated user on /login, redirecting to ${userRoutePath}`);
//     return NextResponse.redirect(new URL(userRoutePath, request.url));
//   }

//     return NextResponse.next(); 
// }
import { auth } from './auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const userRole = req.auth?.user?.role
  const userRoutePath = req.auth?.user?.routePath

  // If user is authenticated and on login page, redirect to their route
  if (isLoggedIn && nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(userRoutePath || '/', nextUrl))
  }

  // Protect routes based on role
  if (nextUrl.pathname.startsWith('/levelOne')) {
    if (!isLoggedIn || userRole !== 1) {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  if (nextUrl.pathname.startsWith('/levelTwo')) {
    if (!isLoggedIn || userRole !== 2) {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  if (nextUrl.pathname.startsWith('/subscriber')) {
    if (!isLoggedIn || userRole !== 0) {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/', '/levelOne/:path*', '/levelTwo/:path*', '/subscriber/:path*']
}