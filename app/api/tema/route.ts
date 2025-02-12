import { prisma } from '@/lib/prismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await prisma.tema.findMany({
            include: {
                subTema: true,
            },
        });
        return NextResponse.json(response);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { message: 'Server error', error: errorMessage },
            { status: 500 }
        );
    }
}
