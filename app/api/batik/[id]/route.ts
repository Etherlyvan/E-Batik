// 🎨 BATIK FEATURE - API endpoints for individual batik operations
import { NextRequest, NextResponse } from 'next/server';
import { getBatikById, updateBatik, deleteBatik } from '@/lib/actions/batik';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

interface Props {
  params: { id: string };
}

// GET /api/batik/[id] - Fetch specific batik
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    const batik = await getBatikById(id);
    if (!batik) {
      return NextResponse.json(
        { error: 'Batik not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(batik);
  } catch (error) {
    console.error('Error fetching batik:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batik' },
      { status: 500 }
    );
  }
}

// DELETE /api/batik/[id] - Delete specific batik
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    await deleteBatik(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting batik:', error);
    return NextResponse.json(
      { error: 'Failed to delete batik' },
      { status: 500 }
    );
  }
}