// components/gallery/GalleryGrid.tsx - OPTIMIZED VERSION
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { GalleryCard } from './GalleryCard';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface GalleryGridProps {
  batiks: Batik[];
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export function GalleryGrid({
  batiks,
  onDelete,
  showDeleteButton = false,
  showEditButton = false
}: GalleryGridProps) {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const gridRef = useRef<HTMLDivElement>(null);
  const [visibleBatiks, setVisibleBatiks] = useState<Batik[]>([]);
  const isIndonesian = currentLanguage.code === 'id';

  // ✅ CRITICAL: Implement virtual scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const batikId = entry.target.getAttribute('data-batik-id');
            if (batikId) {
              // Prefetch batik detail page
              router.prefetch(`/batik/${batikId}`);
              
              // Prefetch API data
              fetch(`/api/batik/${batikId}/prefetch`, {
                method: 'GET',
                cache: 'force-cache'
              }).catch(() => {});
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '200px', // Increased for better prefetching
        threshold: 0.01,
      }
    );

    const cards = gridRef.current?.querySelectorAll('[data-batik-id]');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, [batiks, router]);

  // ✅ NEW: Progressive loading
  useEffect(() => {
    // Load first 12 items immediately
    setVisibleBatiks(batiks.slice(0, 12));
    
    // Load rest progressively
    const loadMore = () => {
      setVisibleBatiks(prev => {
        const nextBatch = batiks.slice(prev.length, prev.length + 12);
        return [...prev, ...nextBatch];
      });
    };

    if (batiks.length > 12) {
      const timer = setTimeout(loadMore, 100);
      return () => clearTimeout(timer);
    }
  }, [batiks]);

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
              ? 'Tidak ada batik yang sesuai dengan pencarian atau filter Anda.'
              : "We couldn't find any batik matching your search or filters."}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {visibleBatiks.map((batik, index) => (
            <motion.div
              key={batik.id}
              data-batik-id={batik.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.3,
                delay: Math.min(index * 0.03, 0.5), // Cap delay
                ease: "easeOut"
              }}
              className="w-full"
            >
              <GalleryCard
                batik={batik}
                onDelete={onDelete ? () => onDelete(batik.id) : undefined}
                showDeleteButton={showDeleteButton}
                showEditButton={showEditButton}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}