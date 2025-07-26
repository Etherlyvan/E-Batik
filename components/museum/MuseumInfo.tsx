// components/museum/MuseumInfo.tsx
'use client';

import { X, Calendar, MapPin, Palette, Scissors, Droplets } from 'lucide-react';
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
    <div className="absolute bottom-4 left-4 max-w-md bg-gradient-to-br from-amber-900 to-orange-900 text-white p-6 rounded-xl border-2 border-yellow-400 shadow-2xl">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🎨</span>
          <h3 className="text-xl font-bold text-yellow-300">{batik.nama}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-yellow-300 hover:text-white transition-colors bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        {batik.seniman && (
          <div className="flex items-center space-x-3 bg-amber-800 bg-opacity-50 rounded-lg p-2">
            <MapPin className="w-4 h-4 text-yellow-400 flex-shrink-0" />
            <div>
              <div className="text-xs text-yellow-200">
                {isIndonesian ? 'Seniman:' : 'Artist:'}
              </div>
              <div className="text-sm font-semibold">{batik.seniman}</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-3 bg-amber-800 bg-opacity-50 rounded-lg p-2">
          <Calendar className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <div>
            <div className="text-xs text-yellow-200">
              {isIndonesian ? 'Tahun:' : 'Year:'}
            </div>
            <div className="text-sm font-semibold">{batik.tahun}</div>
          </div>
        </div>
        
        {translation && (
          <>
            <div className="flex items-start space-x-3 bg-amber-800 bg-opacity-50 rounded-lg p-2">
              <Palette className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-yellow-200 mb-1">
                  {isIndonesian ? 'Detail Teknis:' : 'Technical Details:'}
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>{isIndonesian ? 'Warna:' : 'Color:'}</strong> {translation.warna}</div>
                  <div><strong>{isIndonesian ? 'Teknik:' : 'Technique:'}</strong> {translation.teknik}</div>
                  <div><strong>{isIndonesian ? 'Kain:' : 'Fabric:'}</strong> {translation.jenisKain}</div>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-amber-800 bg-opacity-50 rounded-lg p-2">
              <Droplets className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <div className="text-xs text-yellow-200 mb-1">
                  {isIndonesian ? 'Pewarna & Bentuk:' : 'Dye & Shape:'}
                </div>
                <div className="text-sm space-y-1">
                  <div><strong>{isIndonesian ? 'Pewarna:' : 'Dye:'}</strong> {translation.pewarna}</div>
                  <div><strong>{isIndonesian ? 'Bentuk:' : 'Shape:'}</strong> {translation.bentuk}</div>
                </div>
              </div>
            </div>
          </>
        )}

        {batik.dimensi && (
          <div className="bg-amber-800 bg-opacity-50 rounded-lg p-2">
            <div className="text-xs text-yellow-200">
              {isIndonesian ? 'Dimensi:' : 'Dimensions:'}
            </div>
            <div className="text-sm font-semibold">{batik.dimensi}</div>
          </div>
        )}
        
        {translation?.histori && (
          <div className="mt-4 bg-amber-800 bg-opacity-30 rounded-lg p-3">
            <div className="text-xs text-yellow-200 mb-2">
              {isIndonesian ? 'Sejarah & Makna:' : 'History & Meaning:'}
            </div>
            <p className="text-sm text-yellow-100 line-clamp-4 leading-relaxed">
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
                className="px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-amber-900 text-xs rounded-full font-semibold border border-yellow-300"
              >
                {temaTranslation?.nama || tema.nama}
              </span>
            );
          })}
        </div>

        {/* Indonesian flag decoration */}
        <div className="flex justify-center mt-4 pt-3 border-t border-yellow-400">
          <div className="text-sm text-yellow-200 flex items-center space-x-2">
            <span>🇮🇩</span>
            <span>{isIndonesian ? 'Warisan Budaya Indonesia' : 'Indonesian Cultural Heritage'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}