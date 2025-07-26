// 🌐 LANGUAGE FEATURE - Server actions for language management
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import type { Language } from '@/lib/types';

/**
 * Fetch all languages
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const languages = await prisma.language.findMany({
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
    });

    return languages as Language[];
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw new Error('Failed to fetch languages');
  }
}

/**
 * Get default language
 */
export async function getDefaultLanguage(): Promise<Language | null> {
  try {
    const defaultLanguage = await prisma.language.findFirst({
      where: { isDefault: true },
    });

    return defaultLanguage as Language | null;
  } catch (error) {
    console.error('Error fetching default language:', error);
    throw new Error('Failed to fetch default language');
  }
}

/**
 * Get language by code
 */
export async function getLanguageByCode(code: string): Promise<Language | null> {
  try {
    const language = await prisma.language.findUnique({
      where: { code },
    });

    return language as Language | null;
  } catch (error) {
    console.error('Error fetching language by code:', error);
    throw new Error('Failed to fetch language');
  }
}

/**
 * Create a new language
 */
export async function createLanguage(data: {
  code: string;
  name: string;
  isDefault?: boolean;
}): Promise<Language> {
  try {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const language = await prisma.language.create({
      data: {
        code: data.code,
        name: data.name,
        isDefault: data.isDefault || false,
      },
    });

    revalidatePath('/add-batik');
    return language as Language;
  } catch (error) {
    console.error('Error creating language:', error);
    throw new Error('Failed to create language');
  }
}

/**
 * Update a language
 */
export async function updateLanguage(
  id: number,
  data: {
    code?: string;
    name?: string;
    isDefault?: boolean;
  }
): Promise<Language> {
  try {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.language.updateMany({
        where: { 
          isDefault: true,
          NOT: { id }
        },
        data: { isDefault: false },
      });
    }

    const language = await prisma.language.update({
      where: { id },
      data,
    });

    revalidatePath('/add-batik');
    return language as Language;
  } catch (error) {
    console.error('Error updating language:', error);
    throw new Error('Failed to update language');
  }
}

/**
 * Delete a language
 */
export async function deleteLanguage(id: number): Promise<void> {
  try {
    // Check if this is the default language
    const language = await prisma.language.findUnique({
      where: { id },
    });

    if (language?.isDefault) {
      throw new Error('Cannot delete the default language');
    }

    // Check if language is being used in translations
    const translationsCount = await prisma.batikTranslation.count({
      where: { languageId: id },
    });

    if (translationsCount > 0) {
      throw new Error('Cannot delete language that is being used in translations');
    }

    await prisma.language.delete({
      where: { id },
    });

    revalidatePath('/add-batik');
  } catch (error) {
    console.error('Error deleting language:', error);
    throw new Error('Failed to delete language');
  }
}

/**
 * Get languages with translation counts
 */
export async function getLanguagesWithStats(): Promise<Array<Language & { translationCount: number }>> {
  try {
    const languages = await prisma.language.findMany({
      include: {
        _count: {
          select: {
            batikTranslations: true,
            temaTranslations: true,
            subTemaTranslations: true,
          },
        },
      },
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
    });

    return languages.map(lang => ({
      ...lang,
      translationCount: lang._count.batikTranslations + 
                       lang._count.temaTranslations + 
                       lang._count.subTemaTranslations,
    })) as Array<Language & { translationCount: number }>;
  } catch (error) {
    console.error('Error fetching languages with stats:', error);
    throw new Error('Failed to fetch languages with statistics');
  }
}