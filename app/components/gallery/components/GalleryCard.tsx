'use client';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Batik, Language } from '@/types';
// import { useTranslation } from '@/app/components/gallery/hooks/useTranslation';

interface GalleryCardProps {
  batik: Batik;
  currentLanguage: Language;
  onDelete?: () => void;
  showDeleteButton?: boolean;
  onClick?: () => void;
}

const GalleryCard = ({
  batik,
  currentLanguage,
  onDelete,
  showDeleteButton = false,
  onClick,
}: GalleryCardProps) => {
  const translation = batik.translations.find(
    (t) => t.languageId === currentLanguage.id
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <div 
      className="relative group overflow-hidden rounded-xl bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        {batik.foto[0] && (
          <Image
            src={batik.foto[0].link}
            alt={batik.nama}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
          {batik.nama}
        </h3>
        <div className="text-sm text-gray-600 mb-1 flex flex-wrap gap-1">
          {batik.tema.map((t) => (
            <span
              key={t.id}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded"
            >
              {t.nama}
            </span>
          ))}
        </div>
        {translation && (
          <p className="text-sm text-gray-600 line-clamp-3">
            {translation.histori}
          </p>
        )}
        <div className="mt-4 flex justify-end">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {currentLanguage.code === 'id' ? 'Tahun' : 'Year'} {batik.tahun}
          </span>
        </div>
      </div>

      {showDeleteButton && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
};

export default GalleryCard;