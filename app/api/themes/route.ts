// app/api/themes/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function GET() {
    try {
        const temas = await prisma.tema.findMany();
        return NextResponse.json(temas);
    } catch (error) {
        console.error('Error fetching themes:', error);
        return NextResponse.json({ error: 'Failed to fetch themes' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    try {
        const newTema = await prisma.tema.create({
            data,
        });
        return NextResponse.json(newTema, { status: 201 });
    } catch (error) {
        console.error('Error creating theme:', error);
        return NextResponse.json({ error: 'Failed to create theme' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { id, ...data } = await request.json();
    try {
        const updatedTema = await prisma.tema.update({
            where: { id },
            data,
        });
        return NextResponse.json(updatedTema);
    } catch (error) {
        console.error('Error updating theme:', error);
        return NextResponse.json({ error: 'Failed to update theme' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        await prisma.tema.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Theme deleted successfully' });
    } catch (error) {
        console.error('Error deleting theme:', error);
        return NextResponse.json({ error: 'Failed to delete theme' }, { status: 500 });
    }
}
