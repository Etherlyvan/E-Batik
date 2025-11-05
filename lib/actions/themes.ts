// 🎨 THEME FEATURE - Server actions for theme management
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import type { Theme } from '@/lib/types';

/**
 * Fetch all themes with translations and sub-themes
 */
export async function getThemes(): Promise<Theme[]> {
  try {
    const themes = await prisma.tema.findMany({
      include: {
        translations: {
          include: {
            language: true,
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
        nama: 'asc',
      },
    });

    return (themes as Theme[]) || [];
  } catch (error) {
    console.error('Error fetching themes:', error);
    // Return empty array instead of throwing error to prevent 500
    return [];
  }
}

/**
 * Create a new theme
 */
export async function createTheme(data: {
  nama: string;
  translations: Array<{
    languageId: number;
    nama: string;
  }>;
  subTemas?: Array<{
    nama: string;
    translations: Array<{
      languageId: number;
      nama: string;
    }>;
  }>;
}): Promise<Theme> {
  try {
    const theme = await prisma.tema.create({
      data: {
        nama: data.nama,
        translations: {
          create: data.translations,
        },
        subTema: data.subTemas ? {
          create: data.subTemas.map((subTema) => ({
            nama: subTema.nama,
            translations: {
              create: subTema.translations,
            },
          })),
        } : undefined,
      },
      include: {
        translations: {
          include: {
            language: true,
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

    revalidatePath('/add-batik');
    return theme as Theme;
  } catch (error) {
    console.error('Error creating theme:', error);
    throw new Error('Failed to create theme');
  }
}

/**
 * Delete a theme
 */
export async function deleteTheme(id: number): Promise<void> {
  try {
    await prisma.tema.delete({
      where: { id },
    });

    revalidatePath('/add-batik');
  } catch (error) {
    console.error('Error deleting theme:', error);
    throw new Error('Failed to delete theme');
  }
}