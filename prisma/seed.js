import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

  ])

  // Create themes with translations
  const temaData = [
    {
      nama: 'flora',
      translations: {
        id: 'Flora',
        en: 'Flora',
      },
      subTema: [
        {
          nama: 'bunga',
          translations: {
            id: 'Bunga',
            en: 'Flower',
          },
        },
        {
          nama: 'daun',
          translations: {
            id: 'Daun',
            en: 'Leaf',
          },
        },
      ],
    },
    {
      nama: 'fauna',
      translations: {
        id: 'Fauna',
        en: 'Fauna',
      },
      subTema: [
        {
          nama: 'burung',
          translations: {
            id: 'Burung',
            en: 'Bird',
          },
        },
        {
          nama: 'kupu-kupu',
          translations: {
            id: 'Kupu-kupu',
            en: 'Butterfly',
          },
        },
      ],
    },
    {
      nama: 'geometris',
      translations: {
        id: 'Geometris',
        en: 'Geometric',
      },
      subTema: [
        {
          nama: 'garis',
          translations: {
            id: 'Garis',
            en: 'Line',
          },
        },
        {
          nama: 'lingkaran',
          translations: {
            id: 'Lingkaran',
            en: 'Circle',
          },
        },
      ],
    },
    {
      nama: 'alam',
      translations: {
        id: 'Alam',
        en: 'Nature',
      },
      subTema: [
        {
          nama: 'awan',
          translations: {
            id: 'Awan',
            en: 'Cloud',
          },
        },
        {
          nama: 'gunung',
          translations: {
            id: 'Gunung',
            en: 'Mountain',
          },
        },
      ],
    },
  ]

  // Create themes and their translations
  for (const tema of temaData) {
    const createdTema = await prisma.tema.create({
      data: {
        nama: tema.nama,
        translations: {
          create: [
            {
              nama: tema.translations.id,
              language: {
                connect: { code: 'id' },
              },
            },
            {
              nama: tema.translations.en,
              language: {
                connect: { code: 'en' },
              },
            },
          ],
        },
      },
    })

    // Create sub-themes for each theme
    for (const subTema of tema.subTema) {
      await prisma.subTema.create({
        data: {
          nama: subTema.nama,
          tema: {
            connect: { id: createdTema.id },
          },
          translations: {
            create: [
              {
                nama: subTema.translations.id,
                language: {
                  connect: { code: 'id' },
                },
              },
              {
                nama: subTema.translations.en,
                language: {
                  connect: { code: 'en' },
                },
              },
            ],
          },
        },
      })
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

