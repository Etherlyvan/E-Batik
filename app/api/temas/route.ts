import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prismaClient';

// Types for the API
interface TemaTranslation {
  id?: number;
  languageId: number;
  nama: string;
}

interface SubTemaTranslation {
  id?: number;
  languageId: number;
  nama: string;
}

interface SubTema {
  id?: number;
  nama: string;
  translations: SubTemaTranslation[];
}

interface CreateTemaBody {
  nama: string;
  translations: TemaTranslation[];
  subTemas?: SubTema[];
}

interface UpdateTemaBody extends CreateTemaBody {
  id: number;
}

export async function GET() {
  try {
    const temas = await prisma.tema.findMany({
      include: {
        translations: {
          include: {
            language: true
          }
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true
              }
            }
          }
        }
      }
    });

    // Transform the data with proper typing
    const transformedTemas = temas.map((tema) => ({
      id: tema.id,
      nama: tema.nama,
      translations: tema.translations.map((trans) => ({
        id: trans.id,
        temaId: trans.temaId,
        languageId: trans.languageId,
        nama: trans.nama,
        language: {
          id: trans.language.id,
          code: trans.language.code,
          name: trans.language.name
        }
      })),
      subTema: tema.subTema.map((sub) => ({
        id: sub.id,
        nama: sub.nama,
        temaId: sub.temaId,
        translations: sub.translations.map((subTrans) => ({
          id: subTrans.id,
          subTemaId: subTrans.subTemaId,
          languageId: subTrans.languageId,
          nama: subTrans.nama,
          language: {
            id: subTrans.language.id,
            code: subTrans.language.code,
            name: subTrans.language.name
          }
        }))
      }))
    }));

    return NextResponse.json(transformedTemas);
  } catch (error) {
    console.error('Error fetching temas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch temas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: CreateTemaBody = await request.json();
    const { nama, translations, subTemas } = body;

    const tema = await prisma.tema.create({
      data: {
        nama,
        translations: {
          create: translations.map((trans: TemaTranslation) => ({
            languageId: trans.languageId,
            nama: trans.nama
          }))
        },
        subTema: subTemas ? {
          create: subTemas.map((sub: SubTema) => ({
            nama: sub.nama,
            translations: {
              create: sub.translations.map((subTrans) => ({
                languageId: subTrans.languageId,
                nama: subTrans.nama
              }))
            }
          }))
        } : undefined
      },
      include: {
        translations: true,
        subTema: {
          include: {
            translations: true
          }
        }
      }
    });

    return NextResponse.json(tema);
  } catch (error) {
    console.error('Error creating tema:', error);
    return NextResponse.json(
      { error: 'Failed to create tema' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body: UpdateTemaBody = await request.json();
    const { id, nama, translations, subTemas } = body;

    const tema = await prisma.tema.update({
      where: { id },
      data: {
        nama,
        translations: {
          upsert: translations.map((trans: TemaTranslation) => ({
            where: {
              id: trans.id ?? -1
            },
            create: {
              languageId: trans.languageId,
              nama: trans.nama
            },
            update: {
              nama: trans.nama
            }
          }))
        },
        subTema: subTemas ? {
          upsert: subTemas.map((sub: SubTema) => ({
            where: {
              id: sub.id ?? -1
            },
            create: {
              nama: sub.nama,
              translations: {
                create: sub.translations.map((subTrans) => ({
                  languageId: subTrans.languageId,
                  nama: subTrans.nama
                }))
              }
            },
            update: {
              nama: sub.nama,
              translations: {
                upsert: sub.translations.map((subTrans) => ({
                  where: {
                    id: subTrans.id ?? -1
                  },
                  create: {
                    languageId: subTrans.languageId,
                    nama: subTrans.nama
                  },
                  update: {
                    nama: subTrans.nama
                  }
                }))
              }
            }
          }))
        } : undefined
      },
      include: {
        translations: true,
        subTema: {
          include: {
            translations: true
          }
        }
      }
    });

    return NextResponse.json(tema);
  } catch (error) {
    console.error('Error updating tema:', error);
    return NextResponse.json(
      { error: 'Failed to update tema' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Tema ID is required' },
        { status: 400 }
      );
    }

    await prisma.tema.delete({
      where: {
        id: parseInt(id)
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting tema:', error);
    return NextResponse.json(
      { error: 'Failed to delete tema' },
      { status: 500 }
    );
  }
}

