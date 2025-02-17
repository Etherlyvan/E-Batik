'use client';

import { useLanguage } from '../../../../context/LanguageContext';

const LanguageSelector = () => {
    const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

    return (
        <div className='flex items-center gap-2'>
            {availableLanguages.map((lang) => (
                <button
                    key={lang.code}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
            ${
                currentLanguage.code === lang.code
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : lang.code === 'ja'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
                    disabled={lang.code === 'ja'}
                >
                    {lang.code.toUpperCase()}
                    {lang.code === 'ja' && (
                        <span className='ml-1 text-xs'>(Coming Soon)</span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
