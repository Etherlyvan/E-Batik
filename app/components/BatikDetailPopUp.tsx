import React from 'react';
import { X } from 'lucide-react'; // Import X icon for close button
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Foto {
    id: number;
    link: string;
    batikId: number;
}
interface Tema {
    id: number;
    nama: string;
}

interface Batik {
    id: number;
    foto: Foto[];
    tema: Tema[];
    nama: string;
    tahun: string;
    warna: string;
    teknik: string;
    jenisKain: string;
    pewarna: string;
    bentuk: string;
    histori: string;
    dimensi: string;
}

interface BatikDetailPopupProps {
    isOpen: boolean;
    onClose: () => void;
    batik: Batik | null;
}

const BatikDetailPopup: React.FC<BatikDetailPopupProps> = ({
    isOpen,
    onClose,
    batik,
}) => {
    if (!isOpen || !batik) return null;

    console.log(batik);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70'
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className='relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto'
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className='absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10'
                    >
                        <X className='w-6 h-6' />
                    </button>

                    <div className='grid md:grid-cols-2 gap-6'>
                        {/* Image Section */}
                        <div className='relative h-[400px] md:h-full'>
                            <Image
                                src={
                                    batik.foto.length > 0
                                        ? batik.foto[0].link
                                        : ''
                                }
                                alt={batik.nama}
                                fill
                                className='object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none'
                                priority
                            />
                        </div>

                        {/* Content Section */}
                        <div className='p-6 pr-8'>
                            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
                                {batik.nama}
                            </h2>

                            {/* Details Grid */}
                            <div className='space-y-4'>
                                {batik.tema.map((t) => (
                                    <DetailItem
                                        key={t.id}
                                        label='Tema'
                                        value={t.nama}
                                    />
                                ))}
                                <DetailItem label='Tahun' value={batik.tahun} />
                                <DetailItem label='Warna' value={batik.warna} />
                                <DetailItem
                                    label='Teknik'
                                    value={batik.teknik}
                                />
                                <DetailItem
                                    label='Jenis Kain'
                                    value={batik.jenisKain}
                                />
                                <DetailItem
                                    label='Pewarna'
                                    value={batik.pewarna}
                                />
                                <DetailItem
                                    label='Bentuk'
                                    value={batik.bentuk}
                                />
                                <DetailItem
                                    label='Dimensi'
                                    value={batik.dimensi}
                                />

                                {/* Histori section with more space */}
                                <div className='pt-4 border-t border-gray-200'>
                                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                                        Histori
                                    </h3>
                                    <p className='text-gray-700 leading-relaxed'>
                                        {batik.histori}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

// Helper component for detail items
const DetailItem = ({ label, value }: { label: string; value: string }) => (
    <div className='flex flex-col'>
        <span className='text-sm font-medium text-gray-500'>{label}</span>
        <span className='text-gray-900'>{value}</span>
    </div>
);

export default BatikDetailPopup;
