// 🌐 LANGUAGE FEATURE - Language context provider
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
}

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const availableLanguages: Language[] = [
    { id: 1, code: 'id', name: 'Indonesian', isDefault: true },
    { id: 2, code: 'en', name: 'English', isDefault: false },
    { id: 3, code: 'jp', name: 'Japanese', isDefault: false },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    availableLanguages.find(lang => lang.isDefault) || availableLanguages[0]
  );

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      setLanguage: setCurrentLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}