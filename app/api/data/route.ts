// app/api/data/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient'; // Pastikan path ini benar

export async function GET(request: Request) {
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop(); // Mendapatkan endpoint dari URL

    try {
        if (path === 'temas') {
            const temas = await prisma.tema.findMany();
            return NextResponse.json(temas);
        } else if (path === 'languages') {
            const languages = await prisma.language.findMany();
            return NextResponse.json(languages);
        } else {
            return NextResponse.json({ message: 'Not Found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.error();
    }
}

export async function POST(request: Request) {
    const url = new URL(request.url);
    const path = url.pathname.split('/').pop(); // Mendapatkan endpoint dari URL

    if (path === 'subtemas') {
        const { temaIds } = await request.json();

        if (!temaIds || !Array.isArray(temaIds)) {
            return NextResponse.json({ message: 'Invalid temaIds' }, { status: 400 });
        }

        try {
            const subTemas = await prisma.subTema.findMany({
                where: { temaId: { in: temaIds } },
            });
            return NextResponse.json(subTemas);
        } catch (error) {
            console.error('Error fetching subTemas:', error);
            return NextResponse.error();
        }
    }

    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
}
