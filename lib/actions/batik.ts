// lib/actions/batik.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import { CreateBatikSchema, UpdateBatikSchema } from '@/lib/types/batik';
import type { Batik } from '@/lib/types';
import type { CreateBatikData, UpdateBatikData } from '@/lib/types/batik';

/**
 * Fetch all batiks with related data
 */
export async function getBatiks(): Promise<Batik[]> {
  try {
    const batiks = await prisma.batik.findMany({
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return batiks as Batik[];
  } catch (error) {
    console.error('Error fetching batiks:', error);
    throw new Error('Failed to fetch batiks');
  }
}

/**
 * Fetch a single batik by ID
 */
export async function getBatikById(id: number): Promise<Batik | null> {
  try {
    const batik = await prisma.batik.findUnique({
      where: { id },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    return batik as Batik | null;
  } catch (error) {
    console.error('Error fetching batik:', error);
    throw new Error('Failed to fetch batik');
  }
}

/**
 * Lightweight batik data for prefetching
 */
export async function prefetchBatikById(id: number): Promise<void> {
  try {
    // Prefetch minimal data to warm up the cache
    await prisma.batik.findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
      },
    });
  } catch {
    // Silently fail for prefetch to avoid disrupting user experience
    console.log('Prefetch failed for batik:', id);
  }
}

/**
 * Create a new batik
 */
export async function createBatik(data: CreateBatikData): Promise<Batik> {
  try {
    // Validate input data
    const validatedData = CreateBatikSchema.parse(data);

    const batik = await prisma.batik.create({
      data: {
        nama: validatedData.nama,
        kode: validatedData.kode,
        alamat: validatedData.alamat,
        seniman: validatedData.seniman,
        pointmap: validatedData.pointmap,
        tahun: validatedData.tahun,
        dimensi: validatedData.dimensi,
        translations: {
          create: validatedData.translations.map((translation) => ({
            languageId: translation.languageId,
            warna: translation.warna,
            teknik: translation.teknik,
            jenisKain: translation.jenisKain,
            histori: translation.histori,
            pewarna: translation.pewarna,
            bentuk: translation.bentuk,
          })),
        },
        foto: {
          create: validatedData.foto.map((fotoUrl) => ({
            link: fotoUrl,
          })),
        },
        tema: {
          connect: validatedData.temaIds.map((id) => ({ id })),
        },
        subTema: {
          connect: validatedData.subTemaIds.map((id) => ({ id })),
        },
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath('/');

    return batik as Batik;
  } catch (error) {
    console.error('Error creating batik:', error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    // If it's a Zod validation error, provide more details
    if (error && typeof error === 'object' && 'issues' in error) {
      console.error('Validation issues:', JSON.stringify((error as { issues: unknown[] }).issues, null, 2));
    }

    throw new Error(`Failed to create batik: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update an existing batik
 */
export async function updateBatik(id: number, data: UpdateBatikData): Promise<Batik> {
  try {
    console.log('Updating batik with data:', JSON.stringify(data, null, 2));

    // Validate input data
    const validatedData = UpdateBatikSchema.parse(data);
    console.log('Validation passed for update');

    const batik = await prisma.batik.update({
      where: { id },
      data: {
        nama: validatedData.nama,
        kode: validatedData.kode,
        alamat: validatedData.alamat,
        seniman: validatedData.seniman,
        pointmap: validatedData.pointmap,
        tahun: validatedData.tahun,
        dimensi: validatedData.dimensi,
        // Update translations
        ...(validatedData.translations && {
          translations: {
            deleteMany: {},
            create: validatedData.translations.map((translation) => ({
              languageId: translation.languageId,
              warna: translation.warna || '',
              teknik: translation.teknik || '',
              jenisKain: translation.jenisKain || '',
              histori: translation.histori || '',
              pewarna: translation.pewarna || '',
              bentuk: translation.bentuk || '',
            })),
          },
        }),
        // Update photos
        ...(validatedData.foto && {
          foto: {
            deleteMany: {},
            create: validatedData.foto.map((fotoUrl) => ({
              link: fotoUrl,
            })),
          },
        }),
        // Update themes
        ...(validatedData.temaIds && {
          tema: {
            set: validatedData.temaIds.map((id) => ({ id })),
          },
        }),
        ...(validatedData.subTemaIds && {
          subTema: {
            set: validatedData.subTemaIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    // Revalidate related pages
    revalidatePath('/gallery');

    return batik as Batik;
  } catch (error) {
    console.error('Error updating batik:', error);
    throw new Error('Failed to update batik');
  }
}

/**
 * Delete a batik
 */
export async function deleteBatik(id: number): Promise<void> {
  try {
    // Delete batik and all related data in transaction
    await prisma.$transaction(async (tx) => {
      // Delete related photos first
      await tx.foto.deleteMany({
        where: { batikId: id },
      });
      
      // Delete related translations
      await tx.batikTranslation.deleteMany({
        where: { batikId: id },
      });
      
      // Disconnect themes and subthemes
      await tx.batik.update({
        where: { id },
        data: {
          tema: { set: [] },
          subTema: { set: [] },
        },
      });
      
      // Finally delete the batik
      await tx.batik.delete({
        where: { id },
      });
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting batik:', error);
    throw new Error('Failed to delete batik');
  }
}

/**
 * Search batiks by name
 */
export async function searchBatiks(query: string): Promise<Batik[]> {
  try {
    const batiks = await prisma.batik.findMany({
      where: {
        nama: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return batiks as Batik[];
  } catch (error) {
    console.error('Error searching batiks:', error);
    throw new Error('Failed to search batiks');
  }
}