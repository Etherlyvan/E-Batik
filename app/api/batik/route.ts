// app/api/batik/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';
import { prisma } from '@/lib/prismaClient';

const uploadFilesToCloudinary = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
        console.log(`Converting file ${file.name} to buffer`);
        const buffer = await file.arrayBuffer();

        console.log(`Uploading ${file.name} to Cloudinary`);
        return new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'batik' },
                (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('Cloudinary upload result:', result);
                        resolve(result!.secure_url); // Pastikan mengambil secure_url
                    }
                }
            );
            stream.end(Buffer.from(buffer));
        });
    });

    return Promise.all(uploadPromises); // Menunggu semua file terunggah
};

const processTema = async (temas: string[]) => {
    const temaData = [];

    for (const tema of temas) {
        const existingTema = await prisma.tema.findUnique({
            where: { nama: tema },
        });
        console.log(
            `Checking theme: ${tema}, Existing: ${
                existingTema ? 'Found' : 'Not found'
            }`
        );

        if (existingTema) {
            // If the theme already exists, connect it
            temaData.push({
                where: { nama: tema },
            });
        } else {
            // If the theme doesn't exist, create it
            temaData.push({
                create: { nama: tema },
            });
        }
    }

    return temaData;
};

const processSubTema = async (subTemas: string[], temaIds: number[]) => {
    const subTemaData = [];

    for (const [index, subTema] of subTemas.entries()) {
        const existingSubTema = await prisma.subTema.findFirst({
            where: {
                nama: subTema,  // Changed from subTema.nama to just subTema
                temaId: temaIds[index]
            }
        });

        if (existingSubTema) {
            // If it exists, skip adding to subTemaData since we don't need to create it
            continue;
        } else {
            // If it doesn't exist, create a new one
            subTemaData.push({
                nama: subTema,
                temaId: temaIds[index],
            });
        }
    }

    return subTemaData;
};

async function getTemaIdsByNames(
    temaNames: string[]
): Promise<number[] | null> {
    try {
        const temas = await prisma.tema.findMany({
            where: {
                nama: {
                    in: temaNames, // Fetch multiple Tema by names
                },
            },
        });

        if (temas.length === 0) {
            return null; // Return null if no Tema is found
        }

        // Return an array of Tema IDs
        return temas.map((tema) => tema.id);
    } catch (error) {
        console.error('Error fetching Tema IDs:', error);
        return null;
    }
}

async function getSubTemaIdsByNames(
    subTemaNames: string[]
): Promise<number[] | null> {
    try {
        const subTemas = await prisma.subTema.findMany({
            where: {
                nama: {
                    in: subTemaNames,
                },
            },
        });

        if (subTemas.length === 0) {
            return null; // Return null if no Tema is found
        }

        // Return an array of Tema IDs
        return subTemas.map((subTema) => subTema.id);
    } catch (error) {
        console.error('Error fetching Tema IDs:', error);
        return null;
    }
}

// export async function POST(req: NextRequest) {
//     try {
//         const formData = await req.formData();

//         console.log('Received form data:', formData);

//         // const foto = formData.getAll('foto') as File[];
//         const nama = formData.get('nama') as string;
//         const tahun = formData.get('tahun') as string;
//         // const tema = formData.getAll('tema') as string[];
//         // const subTema = formData.getAll('subTema') as string[];
//         const warna = formData.get('warna') as string;
//         const teknik = formData.get('teknik') as string;
//         const jenisKain = formData.get('jenisKain') as string;
//         const pewarna = formData.get('pewarna') as string;
//         const bentuk = formData.get('bentuk') as string;
//         const histori = formData.get('histori') as string;
//         const dimensi = formData.get('dimensi') as string;

//         const tema: string[] = [];
//         const subTema: string[] = [];
//         const foto: File[] = [];

//         formData.forEach((value, key) => {
//             if (key.startsWith('tema[')) {
//                 tema.push(value as string);
//             } else if (key.startsWith('subTema[')) {
//                 subTema.push(value as string);
//             } else if (key.startsWith('foto[')) {
//                 foto.push(value as File);
//             }
//         });

//         console.log('Parsed tema:', tema);
//         console.log('Parsed subTema:', subTema);

//         const temaData = await processTema(tema);
//         console.log('Processed tema:', temaData);
//         console.log('Inserting data into Prisma...');

//         const batik = await prisma.batik.create({
//             data: {
//                 nama,
//                 tahun,
//                 warna,
//                 teknik,
//                 jenisKain,
//                 pewarna,
//                 bentuk,
//                 histori,
//                 dimensi,
//                 tema: {
//                     connectOrCreate: tema.map((temaName) => ({
//                         where: { nama: temaName }, // Ensure 'nama' is unique
//                         create: { nama: temaName }, // Create if it doesn't exist
//                     })),
//                 },
//             },
//         });

//         console.log('Fetching temaIds...');
//         const temaIds = await getTemaIdsByNames(tema);
//         console.log('temaIds:', temaIds);

//         if (!temaIds || temaIds.length !== subTema.length) {
//             throw new Error(
//                 `temaIds and subTema must have the same length. {temaIds: ${temaIds}, subTema: ${subTema}}`
//             );
//         }

//         console.log('Uploading all files...');
//         const uploadedUrls = await uploadFilesToCloudinary(foto);
//         console.log('Uploaded URLs:', uploadedUrls);

//         const subTemaData = await processSubTema(subTema, temaIds);

//         console.log('Processed subTema:', subTemaData);
//         await prisma.subTema.createMany({
//             data: subTemaData,
//             skipDuplicates: true,
//         });

//         const subTemaIds = await getSubTemaIdsByNames(subTema); // This should return an array of IDs

//         await prisma.batik.update({
//             where: { id: batik.id },
//             data: {
//                 subTema: {
//                     connect: subTemaIds!.map((id) => ({ id })), // Mapping to the correct object format
//                 },
//             },
//         });

//         await prisma.foto.createMany({
//             data: uploadedUrls.map((url) => ({
//                 batikId: batik.id,
//                 link: url,
//             })),
//         });

//         console.log('Data successfully uploaded to Prisma:');
//         return NextResponse.json({
//             message: 'Data successfully uploaded',
//             // data: result,
//         });
//     } catch (error) {
//         console.error('Error processing data:', error);
//         return NextResponse.json({ message: 'Server error' }, { status: 500 });
//     }
// }

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        console.log('Received form data:', formData);

        const nama = formData.get('nama') as string;
        const tahun = formData.get('tahun') as string;
        const warna = formData.get('warna') as string;
        const teknik = formData.get('teknik') as string;
        const jenisKain = formData.get('jenisKain') as string;
        const pewarna = formData.get('pewarna') as string;
        const bentuk = formData.get('bentuk') as string;
        const histori = formData.get('histori') as string;
        const dimensi = formData.get('dimensi') as string;

        const tema: string[] = [];
        const subTema: string[] = [];
        const foto: File[] = [];

        formData.forEach((value, key) => {
            if (key.startsWith('tema[')) {
                tema.push(value as string);
            } else if (key.startsWith('subTema[')) {
                subTema.push(value as string);
            } else if (key.startsWith('foto[')) {
                foto.push(value as File);
            }
        });

        console.log('Parsed tema:', tema);
        console.log('Parsed subTema:', subTema);

        const temaData = await processTema(tema);
        console.log('Processed tema:', temaData);

        console.log('Uploading all files...');
        const uploadedUrls = await uploadFilesToCloudinary(foto);
        console.log('Uploaded URLs:', uploadedUrls);

        return await prisma.$transaction(
            async (tx) => {
                console.log('Starting Prisma transaction...');

                // Insert Batik
                const batik = await tx.batik.create({
                    data: {
                        nama,
                        tahun,
                        warna,
                        teknik,
                        jenisKain,
                        pewarna,
                        bentuk,
                        histori,
                        dimensi,
                        tema: {
                            connectOrCreate: tema.map((temaName) => ({
                                where: { nama: temaName },
                                create: { nama: temaName },
                            })),
                        },
                    },
                });

                console.log('Fetching temaIds...');
                const temaIds = await getTemaIdsByNames(tema);
                console.log('temaIds:', temaIds);

                if (!temaIds || temaIds.length !== subTema.length) {
                    throw new Error(
                        `temaIds and subTema must have the same length. {temaIds: ${temaIds}, subTema: ${subTema}}`
                    );
                }

                const subTemaData = await processSubTema(subTema, temaIds);
                console.log('Processed subTema:', subTemaData);

                await tx.subTema.createMany({
                    data: subTemaData,
                    skipDuplicates: true,
                });

                const subTemaIds = await getSubTemaIdsByNames(subTema);

                await tx.batik.update({
                    where: { id: batik.id },
                    data: {
                        subTema: {
                            connect: subTemaIds!.map((id) => ({ id })),
                        },
                    },
                });

                await tx.foto.createMany({
                    data: uploadedUrls.map((url) => ({
                        batikId: batik.id,
                        link: url,
                    })),
                });

                console.log(
                    'Data successfully uploaded to Prisma within transaction.'
                );

                return NextResponse.json({
                    message: 'Data successfully uploaded',
                });
            },
            { timeout: 10000 }
        );
    } catch (error) {
        console.error('Error processing data:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const batiks = await prisma.batik.findMany({
            include: {
                foto: true,
                tema: true,
                subTema: true,
            },
        });
        return NextResponse.json(batiks);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { message: 'Server error', error: errorMessage },
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
        const batik = await prisma.batik.findUnique({
            where: { id: numericId },
        });

        if (!batik) {
            return NextResponse.json(
                { message: 'Batik not found' },
                { status: 404 }
            );
        }

        await prisma.batik.delete({
            where: { id: numericId },
        });

        return NextResponse.json({ message: 'Batik deleted successfully' });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { message: 'Server error', error: errorMessage },
            { status: 500 }
        );
    }
}
