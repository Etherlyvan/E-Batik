// components/gallery/GalleryGrid.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryCard } from './GalleryCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface GalleryGridProps {
  batiks: Batik[];
  loading?: boolean;
  onCardClick?: (batik: Batik) => void;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

export function GalleryGrid({ 
  batiks, 
  loading = false, 
  onCardClick, 
  onDelete,
  showDeleteButton = false 
}: GalleryGridProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">
            {isIndonesian ? 'Memuat galeri...' : 'Loading gallery...'}
          </p>
        </div>
      </div>
    );
  }

  if (batiks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-20"
      >
        <div className="text-center max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            {isIndonesian ? 'Tidak Ada Hasil' : 'No Results Found'}
          </h3>
          <p className="text-amber-600 mb-6">
            {isIndonesian
              ? 'Tidak ada batik yang sesuai dengan pencarian atau filter Anda. Coba ubah kriteria pencarian.'
              : "We couldn't find any batik matching your search or filters. Try adjusting your search criteria."}
          </p>
          <div className="text-sm text-amber-500 bg-amber-50 p-3 rounded-lg">
            {isIndonesian
              ? 'Tips: Coba gunakan kata kunci yang lebih umum atau hapus beberapa filter'
              : 'Tip: Try using more general keywords or remove some filters'}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {batiks.map((batik, index) => (
            <motion.div
              key={batik.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ y: -8 }}
              className="w-full"
            >
              <GalleryCard
                batik={batik}
                onClick={() => onCardClick?.(batik)}
                onDelete={onDelete ? () => onDelete(batik.id) : undefined}
                showDeleteButton={showDeleteButton}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}