import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;

  // Public routes
  if (pathname === '/login' || pathname === '/') {
    if (token) {
      try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        const role = payload.role as string;
        if (role === 'admin') {
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch (e) {
        // Invalid token, allow access to login
      }
    }
    return NextResponse.next();
  }

  const bypass = request.cookies.get('auth-bypass')?.value;

  // Protected routes
  if (!token && !bypass) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If we have a bypass cookie but no token (local dev case), allow through to let client-side handle it
  if (!token && bypass) {
    return NextResponse.next();
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Admin routes
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // User routes (dashboard, assessment, etc.)
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/assessment') || pathname.startsWith('/results') || pathname.startsWith('/history')) {
      if (role === 'admin' && !pathname.startsWith('/admin')) {
        // Admins can see user pages too, or redirect them? 
        // For now, allow admins to see user pages or keep them in admin panel
      }
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
