// components/gallery/GallerySearch.tsx
'use client';

import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface GallerySearchProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onToggleFilters: () => void;
    showFilters: boolean;
}

export function GallerySearch({
    searchTerm,
    onSearchChange,
    onToggleFilters,
    showFilters,
}: GallerySearchProps) {
    const { currentLanguage } = useLanguage();
    const isIndonesian = currentLanguage.code === 'id';

    return (
        <div className='w-full max-w-2xl mx-auto'>
            <div className='flex items-center space-x-2'>
                <div className='flex-1 relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={
                            isIndonesian
                                ? 'Cari batik berdasarkan nama...'
                                : 'Search batik by name...'
                        }
                        className='w-fullzz pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500'
                    />
                </div>

                <button
                    onClick={onToggleFilters}
                    className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
                        showFilters
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                >
                    <Filter className='w-5 h-5 mr-2' />
                    {isIndonesian ? 'Filter' : 'Filters'}
                </button>
            </div>
        </div>
    );
}
