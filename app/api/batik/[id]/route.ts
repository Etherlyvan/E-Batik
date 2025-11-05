// app/api/batik/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getBatikById, deleteBatik } from '@/lib/actions/batik';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

// GET /api/batik/[id] - Fetch specific batik
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const batikId = parseInt(id);
    
    if (isNaN(batikId)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    const batik = await getBatikById(batikId);
    if (!batik) {
      return NextResponse.json(
        { error: 'Batik not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(batik, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    // Handle the case where error might be null or not an object
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error fetching batik:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to fetch batik' },
      { status: 500 }
    );
  }
}

// DELETE /api/batik/[id] - Delete specific batik
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const batikId = parseInt(id);
    
    if (isNaN(batikId)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    await deleteBatik(batikId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting batik:', error);
    return NextResponse.json(
      { error: 'Failed to delete batik' },
      { status: 500 }
    );
  }
}