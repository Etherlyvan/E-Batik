// 🛠️ SHARED UTILITY - Application constants
export const APP_CONFIG = {
  NAME: 'BatikPedia',
  DESCRIPTION: 'Digital Batik Database',
  ITEMS_PER_PAGE: 12,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_BATIK: 10,
} as const;

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  LOGIN: '/login',
  ADD_BATIK: '/add-batik',
  BATIK_DETAIL: (id: string | number) => `/batik/${id}`,
} as const;

export const API_ENDPOINTS = {
  BATIK: '/api/batik',
  UPLOAD: '/api/upload',
  AUTH: '/api/auth',
  THEMES: '/api/themes',
} as const;

export const FILTER_OPTIONS = {
  TECHNIQUES: ['Cap', 'Tulis', 'Kombinasi', 'Printing'],
  DYES: ['Sintetis', 'Alam', 'Kombinasi'],
  SHAPES: ['Geometris', 'Non-Geometris', 'Kombinasi'],
  FABRIC_TYPES: ['Katun', 'Sutra', 'Rayon', 'Linen'],
} as const;

