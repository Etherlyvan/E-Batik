// components/museum/MuseumInfo.tsx
'use client';

import { X, Calendar, MapPin, Palette } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface MuseumInfoProps {
  batik: Batik;
  onClose: () => void;
}

export function MuseumInfo({ batik, onClose }: MuseumInfoProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  return (
    <div className="absolute bottom-4 left-4 max-w-md bg-black/90 text-white p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-amber-300">{batik.nama}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-3">
        {batik.seniman && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span className="text-sm">{batik.seniman}</span>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span className="text-sm">{batik.tahun}</span>
        </div>
        
        {translation && (
          <div className="flex items-start space-x-2">
            <Palette className="w-4 h-4 text-amber-400 mt-1" />
            <div className="text-sm">
              <p><strong>{isIndonesian ? 'Warna:' : 'Color:'}</strong> {translation.warna}</p>
              <p><strong>{isIndonesian ? 'Teknik:' : 'Technique:'}</strong> {translation.teknik}</p>
            </div>
          </div>
        )}
        
        {translation?.histori && (
          <div className="mt-4">
            <p className="text-sm text-gray-300 line-clamp-3">
              {translation.histori}
            </p>
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mt-4">
          {batik.tema.slice(0, 3).map((tema) => {
            const temaTranslation = tema.translations.find(
              t => t.languageId === currentLanguage.id
            ) || tema.translations[0];
            
            return (
              <span
                key={tema.id}
                className="px-2 py-1 bg-amber-600 text-white text-xs rounded-full"
              >
                {temaTranslation?.nama || tema.nama}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}