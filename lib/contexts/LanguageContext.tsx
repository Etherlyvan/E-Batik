// 🌐 LANGUAGE FEATURE - Language context provider
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Use fallback languages to prevent hydration mismatch
  const fallbackLanguages: Language[] = [
    { id: 1, code: 'id', name: 'Indonesian', isDefault: true },
    { id: 2, code: 'en', name: 'English', isDefault: false },
    { id: 3, code: 'jp', name: 'Japanese', isDefault: false },
  ];

  const [availableLanguages, setAvailableLanguages] = useState<Language[]>(fallbackLanguages);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const [currentLanguage, setCurrentLanguage] = useState<Language>(fallbackLanguages[0]);

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
        setAvailableLanguages(languages);
        
        // Set default language
        const defaultLang = languages.find(lang => lang.isDefault) || languages[0];
        setCurrentLanguage(defaultLang);
      } catch (error) {
        console.error('Error loading languages:', error);
        // Keep fallback languages
      } finally {
        setLoading(false);
      }
    };

    loadLanguages();
  }, [mounted]);

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