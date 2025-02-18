'use client';

import { useState } from 'react';
import Image from 'next/image'; // Import komponen Image dari Next.js
import { useLanguage } from '../../../../context/LanguageContext';

const LanguageSelector = () => {
    const { currentLanguage, setLanguage, availableLanguages } = useLanguage();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
                <Image
                    src={`/flags/${currentLanguage.code}.png`} // Optimalkan gambar bendera
                    alt={currentLanguage.code}
                    width={20} // Lebar gambar
                    height={20} // Tinggi gambar
                    className="rounded-full"
                />
                <span className="text-sm font-medium text-gray-600">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${
                        isDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {availableLanguages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => {
                                setLanguage(lang);
                                setIsDropdownOpen(false); // Tutup dropdown setelah memilih bahasa
                            }}
                            className={`flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors ${
                                currentLanguage.code === lang.code
                                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                                    : lang.code === 'jp'
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-600 hover:bg-gray-100'
                            }`}
                            disabled={lang.code === 'jp'}
                        >
                            <Image
                                src={`/flags/${lang.code}.png`} // Optimalkan gambar bendera
                                alt={lang.code}
                                width={20} // Lebar gambar
                                height={20} // Tinggi gambar
                                className="rounded-full"
                            />
                            <span>
                                {lang.name} {/* Nama bahasa (misalnya "繁體中文") */}
                            </span>
                            {lang.code === 'jp' && (
                                <span className="ml-1 text-xs">(Coming Soon)</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
