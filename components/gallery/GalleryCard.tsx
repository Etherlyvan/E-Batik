// components/gallery/GalleryCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Trash2, Edit } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useBatikPrefetch } from '@/lib/hooks/batik/useBatikPrefetch';
import type { Batik } from '@/lib/types';

interface GalleryCardProps {
  batik: Batik;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  showEditButton?: boolean;
}

export function GalleryCard({ batik, onDelete, showDeleteButton = false, showEditButton = false }: GalleryCardProps) {
  const { currentLanguage } = useLanguage();
  const router = useRouter();
  const { prefetchBatik } = useBatikPrefetch();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };



  const handleMouseEnter = async () => {
    // Prefetch the page on hover for faster navigation
    router.prefetch(`/batik/${batik.id}`);

    // Use optimized prefetch hook
    await prefetchBatik(batik.id);
  };

  return (
    <Link
      href={`/batik/${batik.id}`}
      prefetch={true}
      className="block w-full"
      onMouseEnter={handleMouseEnter}
    >
      <motion.div
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
        }}
        className="relative group overflow-hidden rounded-2xl bg-white cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
      >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        {batik.foto[0] && (
          <Image
            src={batik.foto[0].link}
            alt={batik.nama}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {showDeleteButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}

          {showEditButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/edit-batik/${batik.id}`);
              }}
              className="p-2 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Code Badge */}
        {batik.kode && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {batik.kode}
          </div>
        )}

        {/* Hover Info */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm text-gray-800 font-medium line-clamp-2">
              {(() => {
                const translation = batik.translations.find(
                  t => t.languageId === currentLanguage.id
                ) || batik.translations[0];

                return translation?.histori ||
                       (currentLanguage.code === 'id' ? 'Tidak ada deskripsi tersedia' :
                        currentLanguage.code === 'en' ? 'No description available' :
                        '利用可能な説明がありません');
              })()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {batik.nama}
        </h3>

        {/* Artist and Location */}
        {batik.seniman && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-amber-500" />
            <span className="text-sm line-clamp-1 font-medium">{batik.seniman}</span>
          </div>
        )}

        {batik.alamat && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {batik.alamat}
          </p>
        )}

        {/* Themes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {batik.tema.slice(0, 2).map((tema) => {
            const translation = tema.translations.find(
              t => t.languageId === currentLanguage.id
            ) || tema.translations[0];

            return (
              <span
                key={tema.id}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs rounded-full font-semibold border border-blue-200"
              >
                {translation?.nama || tema.nama}
              </span>
            );
          })}
          {batik.tema.length > 2 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold">
              +{batik.tema.length - 2} {currentLanguage.code === 'id' ? 'lainnya' :
                                        currentLanguage.code === 'en' ? 'more' :
                                        'その他'}
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-amber-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">
              {currentLanguage.code === 'id' ? 'Tahun' :
               currentLanguage.code === 'en' ? 'Year' :
               '年'} {batik.tahun}
            </span>
          </div>

          {batik.dimensi && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              {batik.dimensi}
            </span>
          )}
        </div>
      </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-amber-400 opacity-20 group-hover:opacity-40 transition-opacity" />
      </motion.div>
    </Link>
  );
}