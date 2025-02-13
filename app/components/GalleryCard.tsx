import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Foto } from '@prisma/client/edge';

interface Tema {
    id: number;
    nama: string;
}

interface GalleryCardProps {
    foto: Foto[];
    nama: string;
    tema: Tema[];
    tahun: string;
    histori: string;
    onDelete: () => void;
    showDeleteButton: boolean;
}

const GalleryCard = ({
    foto,
    nama,
    tema,
    tahun,
    histori,
    onDelete,
    showDeleteButton,
}: GalleryCardProps) => {
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <div className='relative group overflow-hidden rounded-xl bg-white'>
            <div className='aspect-square relative overflow-hidden'>
                <Image
                    src={foto[0].link}
                    alt={nama}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>

            <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-1'>
                    {nama}
                </h3>
                <p className='text-sm text-gray-600 mb-1 flex flex-wrap gap-1'>
                    {tema.map((t) => (
                        <span
                            key={t.id}
                            className='bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2 py-1 dark:bg-blue-900 dark:text-blue-300'
                        >
                            {t.nama}
                        </span>
                    ))}
                </p>
                <p>
                    {histori.length > 100
                        ? `${histori.slice(0, 100)}...`
                        : histori}
                </p>
                <div className='mt-5 flex flex-row justify-end'>
                    <span className='bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300'>
                        Tahun {tahun}
                    </span>
                </div>
            </div>

            {showDeleteButton && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className='absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'
                >
                    <Trash2 className='w-4 h-4' />
                </motion.button>
            )}
        </div>
    );
};

export default GalleryCard;
