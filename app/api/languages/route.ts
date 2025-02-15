// app/api/languages/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

export async function GET() {
    try {
        const languages = await prisma.language.findMany();
        return NextResponse.json(languages);
    } catch (error) {
        console.error('Error fetching languages:', error);
        return NextResponse.json({ error: 'Failed to fetch languages' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const data = await request.json();
    try {
        const newLanguage = await prisma.language.create({
            data,
        });
        return NextResponse.json(newLanguage, { status: 201 });
    } catch (error) {
        console.error('Error creating language:', error);
        return NextResponse.json({ error: 'Failed to create language' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { id, ...data } = await request.json();
    try {
        const updatedLanguage = await prisma.language.update({
            where: { id },
            data,
        });
        return NextResponse.json(updatedLanguage);
    } catch (error) {
        console.error('Error updating language:', error);
        return NextResponse.json({ error: 'Failed to update language' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    try {
        await prisma.language.delete({
            where: { id },
        });
        return NextResponse.json({ message: 'Language deleted successfully' });
    } catch (error) {
        console.error('Error deleting language:', error);
        return NextResponse.json({ error: 'Failed to delete language' }, { status: 500 });
    }
}
