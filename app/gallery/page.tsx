'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Batik, Tema } from '@/types';
import GalleryCard from '../components/gallery/components/GalleryCard';
import GalleryFilter from '../components/gallery/components/GalleryFilter';
import { useLanguage } from '../components/gallery/hooks/useLanguage';
import { useTranslation } from '../components/gallery/hooks/useTranslation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';

const GalleryPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const { currentLanguage } = useLanguage();
    const { t } = useTranslation();

    const [batiks, setBatiks] = useState<Batik[]>([]);
    const [temas, setTemas] = useState<Tema[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(true);
    const [activeFilters, setActiveFilters] = useState({
        tema: [] as string[],
        subTema: [] as string[],
        tahun: '',
        teknik: '',
        pewarna: '',
        bentuk: '',
        jenisKain: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [batiksResponse, temasResponse] = await Promise.all([
                fetch('/api/batik'),
                fetch('/api/tema'),
            ]);

            const batiksData = await batiksResponse.json();
            const temasData = await temasResponse.json();

            if (Array.isArray(batiksData)) {
                setBatiks(batiksData);
            }
            if (Array.isArray(temasData)) {
                setTemas(temasData);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus batik ini?')) {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/batik?id=${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    fetchData();
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Gagal menghapus batik');
                }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                alert('Terjadi kesalahan saat menghapus batik');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const filteredBatiks = batiks.filter((batik) => {
        const matchesSearchTerm = batik.nama
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesTema =
            activeFilters.tema.length === 0 ||
            batik.tema.some((t) =>
                activeFilters.tema.includes(t.id.toString())
            );

        const matchesSubTema =
            activeFilters.subTema.length === 0 ||
            batik.subTema.some((st) =>
                activeFilters.subTema.includes(st.id.toString())
            );

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

        const matchesPewarna =
            !activeFilters.pewarna ||
            (translation?.pewarna
                ?.toLowerCase()
                .includes(activeFilters.pewarna.toLowerCase()) ??
                false);

        const matchesBentuk =
            !activeFilters.bentuk ||
            (translation?.bentuk
                ?.toLowerCase()
                .includes(activeFilters.bentuk.toLowerCase()) ??
                false);

        const matchesJenisKain =
            !activeFilters.jenisKain ||
            (translation?.jenisKain
                ?.toLowerCase()
                .includes(activeFilters.jenisKain.toLowerCase()) ??
                false);

        return (
            matchesSearchTerm &&
            matchesTema &&
            matchesSubTema &&
            matchesTeknik &&
            matchesTahun &&
            matchesPewarna &&
            matchesBentuk &&
            matchesJenisKain
        );
    });

    const paginatedBatiks = filteredBatiks.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredBatiks.length / itemsPerPage);

    return (
        <div className='min-h-screen'>
            <Navbar />

            <div
                className='w-full bg-cover bg-center h-[400px] relative'
                style={{
                    backgroundImage: "url('/images/gallery-hero-bg.jpg')",
                }}
            >
                <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]'></div>

                <div className='absolute inset-0'>
                    <div className='max-w-7xl mx-auto h-full px-4 relative z-10'>
                        <div className='pt-6'></div>

                        <div className='h-full flex flex-col justify-center items-center -mt-16'>
                            <div className='text-center mb-8'>
                                <h1 className='text-4xl font-bold text-white mb-4'>
                                    {t('gallery.title')}
                                </h1>
                                <p className='text-xl text-white/80'>
                                    {t('gallery.subtitle')}
                                </p>
                            </div>

                            <div className='w-full max-w-2xl'>
                                <div className='bg-white rounded-lg shadow-lg p-1 flex items-center'>
                                    <Search className='ml-3 h-5 w-5 text-gray-400' />
                                    <input
                                        type='text'
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        placeholder={t('gallery.search')}
                                        className='flex-1 px-3 py-3 focus:outline-none text-lg'
                                    />
                                    <button className='bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-r-md transition-colors'>
                                        <Search className='h-5 w-5' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full bg-gradient-to-b from-gray-50 to-gray-100'>
                <div className='max-w-7xl mx-auto py-8 px-4'>
                    <GalleryFilter
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        temaOptions={temas}
                    />
                    <AnimatePresence mode='wait'>
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='flex justify-center items-center h-40'
                            >
                                <div className='w-12 h-12 border-4 border-[#5a2b2b] border-t-transparent rounded-full animate-spin'></div>
                            </motion.div>
                        ) : paginatedBatiks.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8'
                                >
                                    {paginatedBatiks.map((batik) => (
                                        <GalleryCard
                                            key={batik.id}
                                            batik={batik}
                                            currentLanguage={currentLanguage}
                                            showDeleteButton={!!user}
                                            onDelete={() =>
                                                handleDelete(batik.id)
                                            }
                                            onClick={() =>
                                                router.push(`/batik/${batik.id}`)
                                            }
                                        />
                                    ))}
                                </motion.div>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    setCurrentPage={setCurrentPage}
                                />
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='text-center py-12 mt-8'
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
            <Footer />
        </div>
    );
};

export default GalleryPage;