// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add caching headers for batik detail pages
  if (request.nextUrl.pathname.startsWith('/batik/') &&
      request.nextUrl.pathname.match(/^\/batik\/\d+$/)) {

    const response = NextResponse.next();

    // Set aggressive caching for batik detail pages
    response.headers.set(
      'Cache-Control',
      'public, s-maxage=3600, stale-while-revalidate=86400'
    );

    return response;
  }

  // Add prefetch headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/batik/')) {
    const response = NextResponse.next();

    response.headers.set(
      'Cache-Control',
      'public, s-maxage=1800, stale-while-revalidate=3600'
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/batik/:path*',
    '/api/batik/:path*',
  ],
};