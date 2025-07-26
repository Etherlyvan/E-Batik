// components/gallery/GalleryClient.tsx
'use client';

import { useState } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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

  const handleDelete = async (id: number) => {
    if (window.confirm(isIndonesian ? 'Apakah Anda yakin ingin menghapus batik ini?' : 'Are you sure you want to delete this batik?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/batik/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'Failed to delete batik');
        }
      } catch (error) {
        console.error('Error deleting batik:', error);
        alert('An error occurred while deleting batik');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white py-20 md:py-24 overflow-hidden"
        style={{
          backgroundImage: "url('/images/gallery-hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {isIndonesian ? 'Database Batik' : 'Batik Database'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-white/95 drop-shadow-md">
              {isIndonesian 
                ? 'Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara'
                : 'Traditional Indonesian batik collection showcasing the beauty and diversity of archipelago culture'}
            </p>
          </motion.div>
          
          {/* Search Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex items-center border border-white/20">
              <div className="flex-1 flex items-center">
                <Search className="ml-4 h-6 w-6 text-gray-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isIndonesian ? 'Cari batik berdasarkan nama, seniman, atau lokasi...' : 'Search batik by name, artist, or location...'}
                  className="flex-1 px-4 py-4 focus:outline-none text-lg text-gray-800 bg-transparent placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    showFilters 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="h-5 w-5 mr-2" />
                  {isIndonesian ? 'Filter' : 'Filters'}
                </button>
                
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-visible gallery-filter-container" // Tambahkan class ini
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
            className="mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Results Info */}
                <div className="flex items-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{totalItems}</div>
                    <div className="text-sm text-gray-600">{isIndonesian ? 'Total Batik' : 'Total Batiks'}</div>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-300" />
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-600">{currentPage}</div>
                    <div className="text-sm text-gray-600">{isIndonesian ? 'Halaman' : 'Page'}</div>
                  </div>
                  
                  <div className="w-px h-12 bg-gray-300" />
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">{totalPages}</div>
                    <div className="text-sm text-gray-600">{isIndonesian ? 'Total Halaman' : 'Total Pages'}</div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clear All Button */}
                  {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== '')) && (
                    <button
                      onClick={handleClearSearch}
                      className="flex items-center text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg border border-gray-300 hover:border-red-300 bg-white hover:bg-red-50"
                    >
                      <X className="w-4 h-4 mr-1" />
                      {isIndonesian ? 'Hapus Semua' : 'Clear All'}
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%` }}
                />
              </div>
              
              {/* Status Text */}
              <div className="mt-3 text-center text-sm text-gray-500">
                {totalItems > 0 ? (
                  isIndonesian 
                    ? `Menampilkan batik ${startIndex + 1}-${endIndex} dari ${totalItems} hasil`
                    : `Showing batiks ${startIndex + 1}-${endIndex} of ${totalItems} results`
                ) : (
                  isIndonesian ? 'Tidak ada hasil ditemukan' : 'No results found'
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <GalleryGrid
            batiks={paginatedItems}
            loading={loading}
            onCardClick={handleCardClick}
            onDelete={user ? handleDelete : undefined}
            showDeleteButton={!!user}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex justify-center"
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