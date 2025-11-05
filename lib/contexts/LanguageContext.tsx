// lib/contexts/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getLanguages } from '@/lib/actions/languages';

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
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fallback languages - must be consistent between server and client
const FALLBACK_LANGUAGES: Language[] = [
  { id: 1, code: 'id', name: 'Indonesian', isDefault: true },
  { id: 2, code: 'en', name: 'English', isDefault: false },
  { id: 3, code: 'jp', name: 'Japanese', isDefault: false },
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>(FALLBACK_LANGUAGES);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(FALLBACK_LANGUAGES[0]);
  const [loading, setLoading] = useState(false);

  // Only run after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load languages from database after mount
  useEffect(() => {
    if (!mounted) return;
    
    const loadLanguages = async () => {
      try {
        setLoading(true);
        const languages = await getLanguages();
        
        if (languages && languages.length > 0) {
          setAvailableLanguages(languages);
          const defaultLang = languages.find(lang => lang.isDefault) || languages[0];
          setCurrentLanguage(defaultLang);
        }
      } catch (error) {
        console.error('Error loading languages:', error);
        // Keep fallback languages
      } finally {
        setLoading(false);
      }
    };

    loadLanguages();
  }, [mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <LanguageContext.Provider value={{
        currentLanguage: FALLBACK_LANGUAGES[0],
        availableLanguages: FALLBACK_LANGUAGES,
        setLanguage: () => {},
        loading: false,
      }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      setLanguage: setCurrentLanguage,
      loading,
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