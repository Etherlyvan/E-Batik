'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Batik } from '@/types';
import GalleryCard from '../components/gallery/components/GalleryCard';
import GalleryFilter from '../components/gallery/components/GalleryFilter';
import { useLanguage } from '../components/gallery/hooks/useLanguage';
import { useTranslation } from '../components/gallery/hooks/useTranslation';

const filterOptions = [
    { value: 'all', label: 'Semua Tema' },
    { value: 'Klasik', label: 'Klasik' },
    { value: 'Modern', label: 'Modern' },
    { value: 'Pesisir', label: 'Pesisir' },
    { value: 'Pedalaman', label: 'Pedalaman' },
    { value: 'Keraton', label: 'Keraton' },
];

const GalleryPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { currentLanguage } = useLanguage();
    const { t } = useTranslation();

    const [batiks, setBatiks] = useState<Batik[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        tema: 'all',
        tahun: '',
        teknik: '',
    });

    useEffect(() => {
        const fetchBatiks = async () => {
            try {
                const response = await fetch('/api/batik');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setBatiks(data);
                    console.log('Batiks:', data);
                }
            } catch (error) {
                console.error('Error fetching batiks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBatiks();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm(t('gallery.deleteConfirm'))) {
            try {
                const response = await fetch(`/api/batik?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setBatiks(batiks.filter((batik) => batik.id !== id));
                }
            } catch (error) {
                console.error('Error deleting batik:', error);
            }
        }
    };

    const filteredBatiks = batiks.filter((batik) => {
        const matchesSearchTerm = batik.nama
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesTema =
            activeFilters.tema === 'all' ||
            batik.tema.some((t) => t.nama === activeFilters.tema);

        const translation = batik.translations.find(
            (t) => t.languageId === currentLanguage.id
        );

        const matchesTeknik =
            !activeFilters.teknik ||
            (translation?.teknik
                .toLowerCase()
                .includes(activeFilters.teknik.toLowerCase()) ??
                false);

        const matchesTahun =
            !activeFilters.tahun || batik.tahun.includes(activeFilters.tahun);

        return (
            matchesSearchTerm && matchesTema && matchesTeknik && matchesTahun
        );
    });

    if (isLoading) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <Loader2 className='w-8 h-8 animate-spin text-primary' />
            </div>
        );
    }

    console.log('lang', currentLanguage);

    return (
        <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
            <div className='max-w-7xl mx-auto py-8 px-4'>
                <div className='flex justify-end mb-4'></div>

                <div className='text-center mb-8'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>
                        {t('gallery.title')}
                    </h1>
                    <p className='text-gray-600'>{t('gallery.subtitle')}</p>
                </div>

                <div className='mb-8'>
                    <div className='flex gap-4 mb-4'>
                        <div className='relative flex-1'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <input
                                type='text'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder={t('gallery.search')}
                                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20'
                            />
                        </div>
                        <GalleryFilter
                            showFilters={showFilters}
                            setShowFilters={setShowFilters}
                            activeFilters={activeFilters}
                            setActiveFilters={setActiveFilters}
                            filterOptions={filterOptions}
                        />
                    </div>
                </div>

                <AnimatePresence mode='wait'>
                    {filteredBatiks.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                        >
                            {filteredBatiks.map((batik) => (
                                <GalleryCard
                                    key={batik.id}
                                    batik={batik}
                                    currentLanguage={currentLanguage}
                                    showDeleteButton={!!user}
                                    onDelete={() => handleDelete(batik.id)}
                                    onClick={() =>
                                        router.push(`/batik/${batik.id}`)
                                    }
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='text-center py-12'
                        >
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                {t('gallery.empty.title')}
                            </h3>
                            <p className='text-gray-500'>
                                {t('gallery.empty.message')}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default GalleryPage;
