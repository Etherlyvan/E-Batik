import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Ambil 10 gambar terbaru berdasarkan ID (atau timestamp jika ada)
        const recentPhotos = await prisma.foto.findMany({
            select: {
                link: true, // Hanya ambil properti 'link'
            },
            orderBy: {
                id: 'desc', // Urutkan dari yang terbaru
            },
            take: 10, // Ambil 10 gambar
        });

        if (!recentPhotos || recentPhotos.length === 0) {
            return NextResponse.json(
                { error: 'No photos found' },
                { status: 404 }
            );
        }

        return NextResponse.json(recentPhotos);
    } catch (error) {
        console.error('Error fetching hero photos:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
