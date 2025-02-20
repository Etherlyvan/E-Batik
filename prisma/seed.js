import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// import architecture from './TemaMigration/architecture.js';
// import flora from './TemaMigration/flora.js';
// import fauna from './TemaMigration/fauna.js';
// import culture from './TemaMigration/culture.js';

async function main() {
    // First, ensure we have our languages
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const languages = await Promise.all([
        prisma.language.upsert({
            where: { code: 'id' },
            update: {},
            create: {
                code: 'id',
                name: 'Indonesian',
                isDefault: true,
            },
        }),
        prisma.language.upsert({
            where: { code: 'en' },
            update: {},
            create: {
                code: 'en',
                name: 'English',
                isDefault: false,
            },
        }),
    ]);

    // Create themes with translations
    // const temaData = [
    //     {
    //         nama: 'flora',
    //         translations: {
    //             id: 'Flora',
    //             en: 'Flora',
    //         },
    //         subTema: [
    //             {
    //                 nama: 'bunga',
    //                 translations: {
    //                     id: 'Bunga',
    //                     en: 'Flower',
    //                 },
    //             },
    //             {
    //                 nama: 'daun',
    //                 translations: {
    //                     id: 'Daun',
    //                     en: 'Leaf',
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         nama: 'fauna',
    //         translations: {
    //             id: 'Fauna',
    //             en: 'Fauna',
    //         },
    //         subTema: [
    //             {
    //                 nama: 'burung',
    //                 translations: {
    //                     id: 'Burung',
    //                     en: 'Bird',
    //                 },
    //             },
    //             {
    //                 nama: 'kupu-kupu',
    //                 translations: {
    //                     id: 'Kupu-kupu',
    //                     en: 'Butterfly',
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         nama: 'geometris',
    //         translations: {
    //             id: 'Geometris',
    //             en: 'Geometric',
    //         },
    //         subTema: [
    //             {
    //                 nama: 'garis',
    //                 translations: {
    //                     id: 'Garis',
    //                     en: 'Line',
    //                 },
    //             },
    //             {
    //                 nama: 'lingkaran',
    //                 translations: {
    //                     id: 'Lingkaran',
    //                     en: 'Circle',
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         nama: 'alam',
    //         translations: {
    //             id: 'Alam',
    //             en: 'Nature',
    //         },
    //         subTema: [
    //             {
    //                 nama: 'awan',
    //                 translations: {
    //                     id: 'Awan',
    //                     en: 'Cloud',
    //                 },
    //             },
    //             {
    //                 nama: 'gunung',
    //                 translations: {
    //                     id: 'Gunung',
    //                     en: 'Mountain',
    //                 },
    //             },
    //         ],
    //     },
    //     {
    //         nama: 'arsitektur',
    //         translations: {
    //             id: 'Arsitektur',
    //             en: 'Architecture',
    //         },
    //         subTema: [
    //             {
    //                 nama: 'gedung',
    //                 translations: {
    //                     id: 'Gedung',
    //                     en: 'Building',
    //                 },
    //             },
    //             {
    //                 nama: 'jembatan',
    //                 translations: {
    //                     id: 'Jembatan',
    //                     en: 'Bridge',
    //                 },
    //             },
    //         ],
    //     },
    // ];

    const combinedData = [];

    // Create themes and their translations
    for (const tema of combinedData) {
        const createdTema = await prisma.tema.upsert({
            where: { nama: tema.nama },
            update: {}, // Jika sudah ada, biarkan tanpa perubahan
            create: {
                nama: tema.nama,
                translations: {
                    create: [
                        {
                            nama: tema.translations.id,
                            language: { connect: { code: 'id' } },
                        },
                        {
                            nama: tema.translations.en,
                            language: { connect: { code: 'en' } },
                        },
                    ],
                },
            },
        });

        // Buat sub-tema untuk setiap tema
        for (const subTema of tema.subTema) {
            await prisma.subTema.upsert({
                where: { nama: subTema.nama }, // Cek apakah sub-tema sudah ada
                update: {}, // Jika sudah ada, tidak diubah
                create: {
                    nama: subTema.nama,
                    tema: { connect: { id: createdTema.id } },
                    translations: {
                        create: [
                            {
                                nama: subTema.translations.id,
                                language: { connect: { code: 'id' } },
                            },
                            {
                                nama: subTema.translations.en,
                                language: { connect: { code: 'en' } },
                            },
                        ],
                    },
                },
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
