import { prisma } from '@/lib/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

// GET - Fetch all temas with subtemas
export async function GET() {
    try {
      const temas = await prisma.tema.findMany({
        include: {
          subTema: true,
          translations: {
            include: {
              language: true
            }
          }
        }
      });
      
      return NextResponse.json(temas);
    } catch (error) {
      console.error('Error fetching temas:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
// POST - Create a new tema
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama } = body;

    // Create the tema
    const tema = await prisma.tema.create({
      data: {
        nama
      }
    });

    return NextResponse.json(tema, { status: 201 });
  } catch (error) {
    console.error('Error creating tema:', error);
    return NextResponse.json(
      { message: 'Failed to create tema', error: String(error) },
      { status: 500 }
    );
  }
}

// PUT - Update a tema
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, nama } = body;

    // Update the tema
    const updatedTema = await prisma.tema.update({
      where: { id },
      data: {
        nama
      }
    });

    return NextResponse.json(updatedTema);
  } catch (error) {
    console.error('Error updating tema:', error);
    return NextResponse.json(
      { message: 'Failed to update tema', error: String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Delete a tema
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { message: 'Tema ID is required' },
        { status: 400 }
      );
    }

    await prisma.tema.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json(
      { message: 'Tema deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting tema:', error);
    return NextResponse.json(
      { message: 'Failed to delete tema', error: String(error) },
      { status: 500 }
    );
  }
}
