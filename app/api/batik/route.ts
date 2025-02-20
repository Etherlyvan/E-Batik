// app/api/batik/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import cloudinary from '@/lib/cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

const BatikSchema = z.object({
    nama: z.string(),
    kode: z.string().optional(),
    alamat: z.string().optional(),
    seniman: z.string().optional(),
    pointmap: z.string().optional(),
    tahun: z.string(),
    dimensi: z.string(),
    temaIds: z.array(z.number()),
    subTemaIds: z.array(z.number()),
    translations: z.array(
        z.object({
            languageId: z.number(),
            warna: z.string(),
            teknik: z.string(),
            jenisKain: z.string(),
            histori: z.string(),
            pewarna: z.string(),
            bentuk: z.string(),
        })
    ),
    foto: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const data = {
            nama: formData.get('nama') as string,
            kode: formData.get('kode') as string,
            alamat: formData.get('alamat') as string,
            seniman: formData.get('seniman') as string,
            pointmap: formData.get('pointmap') as string,
            tahun: formData.get('tahun') as string,
            dimensi: formData.get('dimensi') as string,
            temaIds: JSON.parse((formData.get('temaIds') as string) || '[]'),
            subTemaIds: JSON.parse(
                (formData.get('subTemaIds') as string) || '[]'
            ),
            translations: JSON.parse(
                (formData.get('translations') as string) || '[]'
            ),
            foto: JSON.parse((formData.get('foto') as string) || '[]'),
        };

        console.log('Raw form data:', data);
        const validatedData = BatikSchema.parse(data);

        const result = await prisma.batik.create({
            data: {
                nama: validatedData.nama,
                kode: validatedData.kode,
                alamat: validatedData.alamat,
                seniman: validatedData.seniman,
                pointmap: validatedData.pointmap,
                tahun: validatedData.tahun,
                dimensi: validatedData.dimensi,
                tema: {
                    connect: validatedData.temaIds.map((id) => ({ id })),
                },
                subTema: {
                    connect: validatedData.subTemaIds.map((id) => ({ id })),
                },
                translations: {
                    create: validatedData.translations,
                },
                foto: {
                    create:
                        validatedData.foto?.map((url) => ({
                            link: url,
                        })) || [],
                },
            },
            include: {
                tema: true,
                subTema: true,
                translations: true,
                foto: true,
            },
        });

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: 'Validation Error',
                    details: error.errors,
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                error: 'Internal Server Error',
                message:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const batiks = await prisma.batik.findMany({
            include: {
                translations: {
                    include: {
                        language: true,
                    },
                },
                tema: {
                    include: {
                        translations: true,
                    },
                },
                subTema: {
                    include: {
                        translations: true,
                    },
                },
                foto: true,
            },
        });

        return NextResponse.json(batiks);
    } catch (error) {
        console.error('Error fetching batiks:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(req: NextRequest) {
    const id = req.nextUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json(
            { message: 'ID is required' },
            { status: 400 }
        );
    }

    const numericId = Number(id);
    if (isNaN(numericId)) {
        return NextResponse.json(
            { message: 'ID is not a valid number' },
            { status: 400 }
        );
    }

    try {
        // Cari Batik beserta foto-foto terkaitnya
        const batik = await prisma.batik.findUnique({
            where: { id: numericId },
            include: { foto: true }, // Pastikan ada relasi ke foto di model Prisma
        });

        if (!batik) {
            return NextResponse.json(
                { message: 'Batik not found' },
                { status: 404 }
            );
        }

        // Hapus foto dari Cloudinary
        for (const photo of batik.foto) {
            try {
                await cloudinary.uploader.destroy(photo.link); // Gunakan publicId yang disimpan di database
            } catch (cloudinaryError) {
                console.error(
                    'Error deleting photo from Cloudinary:',
                    cloudinaryError
                );
            }
        }

        // Hapus foto dari database
        await prisma.foto.deleteMany({
            where: { batikId: numericId },
        });

        // Hapus Batik dari database
        await prisma.batik.delete({
            where: { id: numericId },
        });

        return NextResponse.json({ message: 'Batik deleted successfully' });
    } catch (error) {
        console.error('Error deleting batik:', error);
        return NextResponse.json(
            {
                message: 'Server error',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const batikPhotos = await prisma.foto.findMany({
            select: {
                link: true, // Ambil hanya URL gambar
            },
        });

        res.status(200).json(batikPhotos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch batik photos' });
    }
}
