// components/gallery/GalleryClient.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GalleryGrid } from './GalleryGrid';
import { GalleryFilter } from './GalleryFilter';
import { GallerySearch } from './GallerySearch';
import { useGalleryFilters } from '@/lib/hooks/gallery/useGalleryFilters';
import { usePagination } from '@/lib/hooks/shared/usePagination';
import { Pagination } from '@/components/ui/Pagination';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik, Theme } from '@/lib/types';

interface GalleryClientProps {
  initialBatiks: Batik[];
  themes: Theme[];
}

export function GalleryClient({ initialBatiks, themes }: GalleryClientProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  const { filteredBatiks, filters, updateFilter, clearFilters } = useGalleryFilters({
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

  const handleCardClick = (batik: Batik) => {
    setLoading(true);
    router.push(`/batik/${batik.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-20"
        style={{
          backgroundImage: "url('/images/gallery-hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {isIndonesian ? 'Database Batik' : 'Batik Database'}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
            {isIndonesian 
              ? 'Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara'
              : 'Traditional Indonesian batik collection showcasing the beauty and diversity of archipelago culture'}
          </p>
          
          {/* Search Component */}
          <div className="max-w-2xl mx-auto">
            <GallerySearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onToggleFilters={() => setShowFilters(!showFilters)}
              showFilters={showFilters}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filters */}
          {showFilters && (
            <div className="mb-8">
              <GalleryFilter
                themes={themes}
                filters={filters}
                onFilterChange={updateFilter}
                onClearFilters={clearFilters}
              />
            </div>
          )}

          {/* Results Info */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              {isIndonesian 
                ? `Menampilkan ${startIndex + 1}-${endIndex} dari ${totalItems} batik`
                : `Showing ${startIndex + 1}-${endIndex} of ${totalItems} batiks`}
            </p>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {showFilters 
                ? (isIndonesian ? 'Sembunyikan Filter' : 'Hide Filters')
                : (isIndonesian ? 'Tampilkan Filter' : 'Show Filters')
              }
            </button>
          </div>

          {/* Gallery Grid - Pastikan container tidak miring */}
          <div className="w-full">
            <GalleryGrid
              batiks={paginatedItems}
              loading={loading}
              onCardClick={handleCardClick}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}