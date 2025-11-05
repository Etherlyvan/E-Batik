// components/museum/BatikDetailModal.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Palette, Scissors } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikDetailModalProps {
  batik: Batik;
  onClose: () => void;
}

export function BatikDetailModal({ batik, onClose }: BatikDetailModalProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  // Keyboard controls for modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Escape' || event.code === 'Enter' || event.code === 'Backspace') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-amber-500"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="md:w-1/2 relative bg-black/30">
            <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ESC to close
            </div>
            
            <div className="relative w-full h-64 md:h-full">
              <Image
                src={batik.foto[0]?.link || '/images/placeholder.jpg'}
                alt={batik.nama}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-amber-200 mb-2">
                  {batik.nama}
                </h2>
                {batik.kode && (
                  <div className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {batik.kode}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs text-amber-300">
                      {isIndonesian ? 'Tahun' : 'Year'}
                    </div>
                    <div className="font-medium text-white">{batik.tahun}</div>
                  </div>
                </div>

                {batik.seniman && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Seniman' : 'Artist'}
                      </div>
                      <div className="font-medium text-white">{batik.seniman}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* History */}
              {translation && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Sejarah' : 'History'}
                  </h3>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    {translation.histori}
                  </p>
                </div>
              )}

              {/* Technical Details */}
              {translation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Palette className="w-4 h-4 text-amber-400 mt-1" />
                      <div>
                        <div className="text-xs text-amber-300">
                          {isIndonesian ? 'Warna' : 'Color'}
                        </div>
                        <div className="text-sm text-white">{translation.warna}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Scissors className="w-4 h-4 text-amber-400 mt-1" />
                      <div>
                        <div className="text-xs text-amber-300">
                          {isIndonesian ? 'Teknik' : 'Technique'}
                        </div>
                        <div className="text-sm text-white">{translation.teknik}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Jenis Kain' : 'Fabric Type'}
                      </div>
                      <div className="text-sm text-white">{translation.jenisKain}</div>
                    </div>

                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Pewarna' : 'Dye'}
                      </div>
                      <div className="text-sm text-white">{translation.pewarna}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Themes */}
              {batik.tema.length > 0 && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Tema' : 'Themes'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {batik.tema.map((tema) => {
                      const temaTranslation = tema.translations.find(
                        t => t.languageId === currentLanguage.id
                      ) || tema.translations[0];
                      
                      return (
                        <span
                          key={tema.id}
                          className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm border border-blue-400"
                        >
                          {temaTranslation?.nama || tema.nama}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {batik.dimensi && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Dimensi' : 'Dimensions'}
                  </h3>
                  <div className="bg-black/30 p-3 rounded-lg border border-amber-600">
                    <div className="text-sm font-mono text-amber-200">{batik.dimensi}</div>
                  </div>
                </div>
              )}

              {/* Close instruction */}
              <div className="text-center pt-4 border-t border-amber-600">
                <div className="text-amber-300 text-sm">
                  {isIndonesian 
                    ? 'Tekan ESC atau ENTER untuk kembali'
                    : 'Press ESC or ENTER to return'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}