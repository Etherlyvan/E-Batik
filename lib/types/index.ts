// lib/types/index.ts

// Import types dari Supabase dengan alias untuk menghindari conflict
export type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

// Auth types
export type * from './auth';
export type * from './batik';

// Base types
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Language types
export interface Language extends BaseEntity {
  code: string;
  name: string;
  isDefault: boolean;
}

// Translation types
export interface Translation {
  id: number;
  languageId: number;
  nama: string;
  language?: Language;
}

// Photo types
export interface Photo extends BaseEntity {
  link: string;
  batikId: number;
}

// Theme types
export interface ThemeTranslation {
  id: number;
  temaId: number;
  languageId: number;
  nama: string;
  language?: Language;
}

export interface SubThemeTranslation {
  id: number;
  subTemaId: number;
  languageId: number;
  nama: string;
  language?: Language;
}

export interface Theme extends BaseEntity {
  nama: string;
  translations: ThemeTranslation[];
  subTema?: SubTheme[];
}

export interface SubTheme extends BaseEntity {
  nama: string;
  temaId: number;
  translations: SubThemeTranslation[];
}

// Batik types
export interface BatikTranslation {
  id: number;
  batikId: number;
  languageId: number;
  warna: string;
  teknik: string;
  jenisKain: string;
  histori: string;
  pewarna: string;
  bentuk: string;
  language?: Language;
}

export interface Batik extends BaseEntity {
  kode: string | null;
  alamat: string | null;
  seniman: string | null;
  pointmap: string | null;
  nama: string;
  tahun: string;
  dimensi: string;
  translations: BatikTranslation[];
  foto: Photo[];
  tema: Theme[];
  subTema: SubTheme[];
}

// Filter types
export interface FilterState {
  themes: number[];
  subThemes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
}

// Database User type (berbeda dari Supabase User)
export interface DatabaseUser {
  id: string;
  email: string;
  name?: string | null;
  password?: string | null;
  avatar?: string | null;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// NextAuth Session type (berbeda dari Supabase Session)
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  };
  expires: string;
}