// components/gallery/GalleryClient.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, X } from 'lucide-react';
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
          // Refresh the page or update the state
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <div 
        className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white py-20 md:py-24 overflow-hidden"
        style={{
          backgroundImage: "url('/images/gallery-hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">
              {isIndonesian ? 'Database Batik' : 'Batik Database'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed text-orange-100">
              {isIndonesian 
                ? 'Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara'
                : 'Traditional Indonesian batik collection showcasing the beauty and diversity of archipelago culture'}
            </p>
          </motion.div>
          
          {/* Enhanced Search Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex items-center">
              <div className="flex-1 flex items-center">
                <Search className="ml-4 h-6 w-6 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isIndonesian ? 'Cari batik berdasarkan nama...' : 'Search batik by name...'}
                  className="flex-1 px-4 py-4 focus:outline-none text-lg text-gray-800 bg-transparent placeholder-gray-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
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

          {/* Stats Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-center items-center space-x-8 text-orange-100"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="text-sm opacity-80">{isIndonesian ? 'Total Batik' : 'Total Batiks'}</div>
            </div>
            <div className="w-px h-8 bg-orange-300/50" />
            <div className="text-center">
              <div className="text-2xl font-bold">{themes.length}</div>
              <div className="text-sm opacity-80">{isIndonesian ? 'Tema' : 'Themes'}</div>
            </div>
            <div className="w-px h-8 bg-orange-300/50" />
            <div className="text-center">
              <div className="text-2xl font-bold">30+</div>
              <div className="text-sm opacity-80">{isIndonesian ? 'Butik' : 'Boutiques'}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto py-8 px-4">
          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
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

          {/* Results Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {isIndonesian 
                  ? `${startIndex + 1}-${endIndex} dari ${totalItems} batik`
                  : `${startIndex + 1}-${endIndex} of ${totalItems} batiks`}
              </div>
              
              {Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== '') && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4 mr-1" />
                  {isIndonesian ? 'Hapus Filter' : 'Clear Filters'}
                </button>
              )}
            </div>
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showFilters 
                ? (isIndonesian ? 'Sembunyikan Filter' : 'Hide Filters')
                : (isIndonesian ? 'Tampilkan Filter' : 'Show Filters')
              }
            </button>
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
              className="mt-12 flex justify-center"
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onNext={nextPage}
                  onPrev={prevPage}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}