// 🎨 BATIK FEATURE - API endpoints for individual batik operations
import { NextRequest, NextResponse } from 'next/server';
import { getBatikById } from '@/lib/actions/batik';

interface Props {
  params: Promise<{ id: string }>;
}

// GET /api/batik/[id] - Fetch specific batik
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
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
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id: idParam } = await params;
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    // Use deleteBatik action without authentication check for demo purposes
    const { prisma } = await import('@/lib/db/prisma');
    const { revalidatePath } = await import('next/cache');

    // Delete batik and all related data in transaction
    await prisma.$transaction(async (tx) => {
      // Delete related photos first
      await tx.foto.deleteMany({
        where: { batikId: id },
      });

      // Delete related translations
      await tx.batikTranslation.deleteMany({
        where: { batikId: id },
      });

      // Disconnect themes and subthemes
      await tx.batik.update({
        where: { id },
        data: {
          tema: { set: [] },
          subTema: { set: [] },
        },
      });

      // Finally delete the batik
      await tx.batik.delete({
        where: { id },
      });
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting batik:', error);
    return NextResponse.json(
      { error: 'Failed to delete batik' },
      { status: 500 }
    );
  }
}