// components/museum/BatikInfo.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikInfoProps {
  batik: Batik | null;
  onClose: () => void;
}

export function BatikInfo({ batik, onClose }: BatikInfoProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  if (!batik) return null;

  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-5 left-5 bg-black/80 text-white p-6 rounded-xl max-w-sm z-50 backdrop-blur-sm border border-white/20"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-amber-300">{batik.nama}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2 text-sm">
          {batik.seniman && (
            <p><strong>{isIndonesian ? 'Seniman:' : 'Artist:'}</strong> {batik.seniman}</p>
          )}
          <p><strong>{isIndonesian ? 'Tahun:' : 'Year:'}</strong> {batik.tahun}</p>
          {translation && (
            <>
              <p><strong>{isIndonesian ? 'Teknik:' : 'Technique:'}</strong> {translation.teknik}</p>
              <p><strong>{isIndonesian ? 'Warna:' : 'Color:'}</strong> {translation.warna}</p>
            </>
          )}
          {batik.dimensi && (
            <p><strong>{isIndonesian ? 'Dimensi:' : 'Dimensions:'}</strong> {batik.dimensi}</p>
          )}
        </div>

        {translation?.histori && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs text-gray-300 leading-relaxed">
              {translation.histori.substring(0, 150)}...
            </p>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}