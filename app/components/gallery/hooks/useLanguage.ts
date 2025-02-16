import { create } from 'zustand';
import { Language } from '@/types';

interface LanguageState {
  currentLanguage: Language;
  availableLanguages: Language[];
  setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageState>((set) => ({
  currentLanguage: {
    id: 1,
    code: 'id',
    name: 'Indonesian',
    isDefault: true,
  },
  availableLanguages: [
    {
      id: 1,
      code: 'id',
      name: 'Indonesian',
      isDefault: true,
    },
    {
      id: 2,
      code: 'en',
      name: 'English',
      isDefault: false,
    },
    {
      id: 3,
      code: 'ja',
      name: 'Japanese',
      isDefault: false,
    }
  ],
  setLanguage: (language: Language) => set({ currentLanguage: language }),
}));