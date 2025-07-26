// components/gallery/GalleryCard.tsx (tambahkan onClick handler)
'use client';

import Image from 'next/image';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface GalleryCardProps {
  batik: Batik;
  onClick?: () => void;
}

export function GalleryCard({ batik, onClick }: GalleryCardProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/batik/${batik.id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative group overflow-hidden rounded-xl bg-white cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
      onClick={handleClick}
    >
      <div className="aspect-square relative overflow-hidden">
        {batik.foto[0] && (
          <Image
            src={batik.foto[0].link}
            alt={batik.nama}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Code Badge */}
        {batik.kode && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {batik.kode}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {batik.nama}
        </h3>
        
        {/* Artist and Location */}
        {batik.seniman && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{batik.seniman}</span>
          </div>
        )}

        {batik.alamat && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {batik.alamat}
          </p>
        )}
        
        {/* Themes */}
        <div className="flex flex-wrap gap-1 mb-3">
          {batik.tema.slice(0, 2).map((tema) => {
            const translation = tema.translations.find(
              t => t.languageId === currentLanguage.id
            ) || tema.translations[0];
            
            return (
              <span
                key={tema.id}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                {translation?.nama || tema.nama}
              </span>
            );
          })}
          {batik.tema.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{batik.tema.length - 2} {isIndonesian ? 'lainnya' : 'more'}
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{isIndonesian ? 'Tahun' : 'Year'} {batik.tahun}</span>
          </div>
          
          {batik.dimensi && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {batik.dimensi}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}