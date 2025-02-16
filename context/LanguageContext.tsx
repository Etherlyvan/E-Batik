'use client';

import { createContext, useContext, useState } from 'react';

// Definisi tipe bahasa
interface Language {
    id: number;
    code: string;
    name: string;
    isDefault: boolean;
}

// Definisi tipe untuk Context
interface LanguageContextType {
    currentLanguage: Language;
    setLanguage: (language: Language) => void;
    availableLanguages: Language[];
}

// Buat Context
const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

// Provider untuk LanguageContext
export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentLanguage, setCurrentLanguage] = useState<Language>({
        id: 2,
        code: 'en',
        name: 'English',
        isDefault: true,
    });

    const availableLanguages: Language[] = [
        { id: 1, code: 'id', name: 'Indonesian', isDefault: true },
        { id: 2, code: 'en', name: 'English', isDefault: false },
        { id: 3, code: 'ja', name: 'Japanese', isDefault: false },
    ];

    return (
        <LanguageContext.Provider
            value={{
                currentLanguage,
                setLanguage: setCurrentLanguage,
                availableLanguages,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

// Hook untuk mengakses Context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
