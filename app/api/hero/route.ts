// app/api/hero/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// Cache the response for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const recentPhotos = await prisma.foto.findMany({
      select: {
        link: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });

    if (!recentPhotos || recentPhotos.length === 0) {
      return NextResponse.json(
        { error: 'No photos found' },
        { status: 404 }
      );
    }

    // Add cache headers
    return NextResponse.json(recentPhotos, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching hero photos:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}