// lib/types/batik.ts
import { z } from 'zod';

// Zod schemas for validation
export const BatikTranslationSchema = z.object({
  languageId: z.number(),
  warna: z.string().min(1, 'Color is required'),
  teknik: z.string().min(1, 'Technique is required'),
  jenisKain: z.string().min(1, 'Fabric type is required'),
  histori: z.string().min(1, 'History is required'),
  pewarna: z.string().min(1, 'Dye is required'),
  bentuk: z.string().min(1, 'Shape is required'),
});

export const CreateBatikSchema = z.object({
  nama: z.string().min(1, 'Name is required'),
  kode: z.string().optional(),
  alamat: z.string().optional(),
  seniman: z.string().optional(),
  pointmap: z.string().optional(),
  tahun: z.string().min(1, 'Year is required'),
  dimensi: z.string().min(1, 'Dimensions are required'),
  translations: z.array(BatikTranslationSchema).min(1, 'At least one translation is required'),
  temaIds: z.array(z.number()).min(1, 'At least one theme is required'),
  subTemaIds: z.array(z.number()).default([]),
  foto: z.array(z.string()).min(1, 'At least one photo is required'),
});

export const UpdateBatikSchema = CreateBatikSchema.partial();

// TypeScript types
export type BatikTranslation = z.infer<typeof BatikTranslationSchema>;
export type CreateBatikData = z.infer<typeof CreateBatikSchema>;
export type UpdateBatikData = z.infer<typeof UpdateBatikSchema>;

// Export Batik type from the main types file
export type { Batik } from './index';