// app/api/batik/[id]/prefetch/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prefetchBatikById } from '@/lib/actions/batik';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }    // Prefetch data
    await prefetchBatikById(id);

    return NextResponse.json({ success: true }, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('Prefetch error:', error);
    return NextResponse.json({ error: 'Prefetch failed' }, { status: 500 });
  }
}