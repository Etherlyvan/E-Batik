// components/gallery/GalleryClient.tsx
'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, X, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryGrid } from './GalleryGrid';
import { GalleryFilter } from './GalleryFilter';
import { useGalleryFilters } from '@/lib/hooks/gallery/useGalleryFilters';
import { usePagination } from '@/lib/hooks/shared/usePagination';
import { Pagination } from '@/components/ui/Pagination';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import type { Batik, Theme } from '@/lib/types';

interface GalleryClientProps {
    initialBatiks: Batik[];
    themes: Theme[];
}

export function GalleryClient({ initialBatiks, themes }: GalleryClientProps) {
    const router = useRouter();
    const { currentLanguage } = useLanguage();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [, setDeleteLoading] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const { filteredBatiks, filters, updateFilter, clearFilters } =
        useGalleryFilters({
            batiks: initialBatiks,
            searchTerm,
        });

    const {
        currentPage,
        totalPages,
        paginatedItems,
        goToPage,
        nextPage,
        prevPage,
        startIndex,
        endIndex,
        totalItems,
    } = usePagination({
        items: filteredBatiks,
        itemsPerPage: 12,
    });

    // Add the missing function
    const handleClearSearch = () => {
        setSearchTerm('');
        clearFilters();
    };

    // Prefetch visible batik pages for faster navigation
    const prefetchBatikPages = useCallback(() => {
        paginatedItems.forEach((batik) => {
            router.prefetch(`/batik/${batik.id}`);
        });
    }, [paginatedItems, router]);

    // Prefetch pages when component mounts or items change
    React.useEffect(() => {
        prefetchBatikPages();
    }, [prefetchBatikPages]);

    // Aggressive prefetching for next page items
    React.useEffect(() => {
        if (currentPage < totalPages) {
            const nextPageStart = currentPage * 12;
            const nextPageItems = filteredBatiks.slice(nextPageStart, nextPageStart + 12);
            nextPageItems.forEach((batik) => {
                router.prefetch(`/batik/${batik.id}`);
            });
        }
    }, [currentPage, totalPages, filteredBatiks, router]);

    const handleDelete = async (id: number) => {
        if (
            window.confirm(
                currentLanguage.code === 'id'
                    ? 'Apakah Anda yakin ingin menghapus batik ini?'
                    : currentLanguage.code === 'en'
                    ? 'Are you sure you want to delete this batik?'
                    : 'このバティックを削除してもよろしいですか？'
            )
        ) {
            setDeleteLoading(true);
            try {
                const response = await fetch(`/api/batik/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    router.push('/gallery');
                } else {
                    const errorData = await response.json();
                    alert(errorData.error || 'Failed to delete batik');
                }
            } catch (error) {
                console.error('Error deleting batik:', error);
                alert('An error occurred while deleting batik');
            } finally {
                setDeleteLoading(false);
            }
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Hero Section - Fixed padding untuk navbar */}
            <div
                className='relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden'
                style={{
                    backgroundImage: "url('/images/gallery-hero-bg.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay',
                }}
            >
                {/* Dark Overlay */}
                <div className='absolute inset-0 bg-black/60' />

                <div className='relative z-10 max-w-7xl mx-auto px-4 text-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg'>
                            {currentLanguage.code === 'id' ? 'BatikSphere' : 
                             currentLanguage.code === 'en' ? 'BatikSphere' : 
                             'BatikSphere'}
                        </h1>
                        <p className='text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed text-white/95 drop-shadow-md px-4'>
                            {currentLanguage.code === 'id'
                                ? 'Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara'
                                : currentLanguage.code === 'en'
                                ? 'Traditional Indonesian batik collection showcasing the beauty and diversity of archipelago culture'
                                : 'インドネシア群島の文化の美しさと多様性を表現する伝統的なインドネシアバティックのコレクション'}
                        </p>
                    </motion.div>

                    {/* Search Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className='max-w-4xl mx-auto px-4'
                    >
                        <div className='bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center border border-white/20'>
                            {/* Search Input */}
                            <div className='flex-1 flex items-center min-w-0'>
                                <Search className='ml-4 h-5 w-5 md:h-6 md:w-6 text-gray-500 flex-shrink-0' />
                                <input
                                    type='text'
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder={
                                        currentLanguage.code === 'id'
                                            ? 'Cari batik berdasarkan nama, seniman, atau lokasi...'
                                            : currentLanguage.code === 'en'
                                            ? 'Search batik by name, artist, or location...'
                                            : '名前、アーティスト、場所でバティックを検索...'
                                    }
                                    className='flex-1 px-3 md:px-4 py-3 md:py-4 focus:outline-none text-base md:text-lg text-gray-900 bg-transparent placeholder-gray-500 min-w-0'
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        className='mr-2 p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0'
                                    >
                                        <X className='h-4 w-4 md:h-5 md:w-5 text-gray-400' />
                                    </button>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className='flex items-center space-x-2 mt-2 sm:mt-0 px-2 sm:px-0'>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                                        showFilters
                                            ? 'bg-amber-600 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    <Filter className='h-4 w-4 md:h-5 md:w-5 mr-2' />
                                    {currentLanguage.code === 'id' ? 'Filter' : 
                                     currentLanguage.code === 'en' ? 'Filters' : 
                                     'フィルター'}
                                </button>

                                <button className='bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl'>
                                    <Search className='h-4 w-4 md:h-5 md:w-5' />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content */}
            <div className='w-full bg-white'>
                <div className='max-w-7xl mx-auto py-6 md:py-8 px-4'>
                    {/* Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className='mb-6 md:mb-8 overflow-visible gallery-filter-container'
                            >
                                <GalleryFilter
                                    themes={themes}
                                    filters={filters}
                                    onFilterChange={updateFilter}
                                    onClearFilters={clearFilters}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Results Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mb-6'
                    >
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6'>
                            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
                                {/* Results Info */}
                                <div className='flex items-center justify-center lg:justify-start space-x-4 md:space-x-8'>
                                    <div className='text-center'>
                                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>
                                            {totalItems}
                                        </div>
                                        <div className='text-xs md:text-sm text-gray-600'>
                                            {currentLanguage.code === 'id'
                                                ? 'Total Batik'
                                                : currentLanguage.code === 'en'
                                                ? 'Total Batiks'
                                                : '合計バティック'}
                                        </div>
                                    </div>

                                    <div className='w-px h-8 md:h-12 bg-gray-300' />

                                    <div className='text-center'>
                                        <div className='text-2xl md:text-3xl font-bold text-amber-600'>
                                            {currentPage}
                                        </div>
                                        <div className='text-xs md:text-sm text-gray-600'>
                                            {currentLanguage.code === 'id' ? 'Halaman' : 
                                             currentLanguage.code === 'en' ? 'Page' : 
                                             'ページ'}
                                        </div>
                                    </div>

                                    <div className='w-px h-8 md:h-12 bg-gray-300' />

                                    <div className='text-center'>
                                        <div className='text-2xl md:text-3xl font-bold text-gray-900'>
                                            {totalPages}
                                        </div>
                                        <div className='text-xs md:text-sm text-gray-600'>
                                            {currentLanguage.code === 'id'
                                                ? 'Total Halaman'
                                                : currentLanguage.code === 'en'
                                                ? 'Total Pages'
                                                : '合計ページ'}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className='flex items-center justify-center lg:justify-end space-x-4'>
                                    {/* View Mode Toggle */}
                                    <div className='flex items-center bg-gray-100 rounded-lg p-1'>
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded-md transition-colors ${
                                                viewMode === 'grid'
                                                    ? 'bg-white text-amber-600 shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            <Grid className='w-4 h-4' />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded-md transition-colors ${
                                                viewMode === 'list'
                                                    ? 'bg-white text-amber-600 shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                            }`}
                                        >
                                            <List className='w-4 h-4' />
                                        </button>
                                    </div>

                                    {/* Clear All Button */}
                                    {(searchTerm ||
                                        Object.values(filters).some((f) =>
                                            Array.isArray(f)
                                                ? f.length > 0
                                                : f !== ''
                                        )) && (
                                        <button
                                            onClick={handleClearSearch}
                                            className='flex items-center text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg border border-gray-300 hover:border-red-300 bg-white hover:bg-red-50 text-sm'
                                        >
                                            <X className='w-4 h-4 mr-1' />
                                            <span className='hidden sm:inline'>
                                                {currentLanguage.code === 'id'
                                                    ? 'Hapus Semua'
                                                    : currentLanguage.code === 'en'
                                                    ? 'Clear All'
                                                    : 'すべてクリア'}
                                            </span>
                                            <span className='sm:hidden'>
                                                {currentLanguage.code === 'id'
                                                    ? 'Hapus'
                                                    : currentLanguage.code === 'en'
                                                    ? 'Clear'
                                                    : 'クリア'}
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className='mt-4 bg-gray-200 rounded-full h-2'>
                                <div
                                    className='bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300'
                                    style={{
                                        width: `${
                                            totalPages > 0
                                                ? (currentPage / totalPages) *
                                                  100
                                                : 0
                                        }%`,
                                    }}
                                />
                            </div>

                            {/* Status Text */}
                            <div className='mt-3 text-center text-xs md:text-sm text-gray-500'>
                                {totalItems > 0
                                    ? currentLanguage.code === 'id'
                                        ? `Menampilkan batik ${
                                              startIndex + 1
                                          }-${endIndex} dari ${totalItems} hasil`
                                        : currentLanguage.code === 'en'
                                        ? `Showing batiks ${
                                              startIndex + 1
                                          }-${endIndex} of ${totalItems} results`
                                        : `バティック ${
                                              startIndex + 1
                                          }-${endIndex} を ${totalItems} 件中表示`
                                    : currentLanguage.code === 'id'
                                    ? 'Tidak ada hasil ditemukan'
                                    : currentLanguage.code === 'en'
                                    ? 'No results found'
                                    : '結果が見つかりません'}
                            </div>
                        </div>
                    </motion.div>

                    {/* Gallery Grid */}
                    <GalleryGrid
                        batiks={paginatedItems}
                        onDelete={user ? handleDelete : undefined}
                        showDeleteButton={!!user}
                        showEditButton={!!user}
                    />

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='mt-6 md:mt-8 flex justify-center'
                        >
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={goToPage}
                                onNext={nextPage}
                                onPrev={prevPage}
                            />
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}