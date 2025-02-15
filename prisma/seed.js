// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    // First, clean existing data
    await prisma.subTema.deleteMany({})
    await prisma.tema.deleteMany({})

    // Seed data
    const temaData = [
        {
            nama: 'Flora',
            subTema: [
                { nama: 'Bunga' },
                { nama: 'Daun' },
                { nama: 'Pohon' },
                { nama: 'Tanaman Merambat' }
            ]
        },
        {
            nama: 'Fauna',
            subTema: [
                { nama: 'Burung' },
                { nama: 'Kupu-kupu' },
                { nama: 'Ikan' },
                { nama: 'Gajah' },
                { nama: 'Naga' }
            ]
        },
        {
            nama: 'Geometris',
            subTema: [
                { nama: 'Kawung' },
                { nama: 'Parang' },
                { nama: 'Tumpal' },
                { nama: 'Meander' },
                { nama: 'Swastika' }
            ]
        },
        {
            nama: 'Abstrak',
            subTema: [
                { nama: 'Mega Mendung' },
                { nama: 'Sisik' },
                { nama: 'Api' },
                { nama: 'Awan' }
            ]
        },
        {
            nama: 'Wayang',
            subTema: [
                { nama: 'Pandawa' },
                { nama: 'Punakawan' },
                { nama: 'Ramayana' },
                { nama: 'Mahabharata' }
            ]
        },
        {
            nama: 'Keraton',
            subTema: [
                { nama: 'Sido Mukti' },
                { nama: 'Sido Luhur' },
                { nama: 'Truntum' },
                { nama: 'Semen Rama' }
            ]
        }
    ]

    for (const tema of temaData) {
        const createdTema = await prisma.tema.create({
            data: {
                nama: tema.nama,
                subTema: {
                    create: tema.subTema
                }
            }
        })
        console.log(`Created tema: ${createdTema.nama}`)
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.disconnect()
    })
