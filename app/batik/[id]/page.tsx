'use client';

import { useEffect, useState, use } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useRouter } from 'next/navigation';
import ImageSlider from '@/app/components/ImageSlider'; // Import ImageSlider
import Navbar from '@/app/components/Navbar';
import LoadingOverlay from '@/app/components/LoadingOverlay';
import Footer from '@/app/components/Footer';

interface Foto {
    id: number;
    link: string;
    batikId: number;
}

interface Tema {
    id: number;
    nama: string;
    translations: {
        id: number;
        languageId: number;
        nama: string;
    }[];
}

interface SubTema {
    id: number;
    nama: string;
    temaId: number;
    translations: {
        id: number;
        languageId: number;
        nama: string;
    }[];
}

interface Batik {
    id: number;
    foto: Foto[];
    tema: Tema[];
    subTema: SubTema[];
    nama: string;
    tahun: string;
    warna: string;
    teknik: string;
    jenisKain: string;
    pewarna: string;
    bentuk: string;
    histori: string;
    dimensi: string;
    seniman?: string; // Optional field for artist
    alamat?: string; // Optional field for address
    endpoint?: string; // Optional field for endpoint
    translations: {
        id: number;
        languageId: number;
        nama: string;
        warna: string;
        teknik: string;
        jenisKain: string;
        pewarna: string;
        bentuk: string;
        histori: string;
        dimensi: string;
    }[];
}

interface Params {
    id: number;
}

interface BatikDetailProps {
    params: Promise<Params>;
}

export default function BatikDetail({ params }: BatikDetailProps) {
    const router = useRouter();
    const { id } = use(params);
    const [batik, setBatik] = useState<Batik | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const { currentLanguage } = useLanguage();

    useEffect(() => {
        const fetchBatikDetail = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/batik`);
                if (!response.ok) throw new Error('Failed to fetch batik');
                const data: Batik[] = await response.json();
                const filteredBatik = data.find((b) => b.id == id);

                if (!filteredBatik) {
                    throw new Error('Batik not found');
                }

                setBatik(filteredBatik);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'An error occurred'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBatikDetail();
    }, [id]);

    if (loading) return <LoadingOverlay bgColor='bg-white' />;
    if (error)
        return (
            <div className='text-center text-red-500 font-semibold'>
                Error: {error}
            </div>
        );
    if (!batik)
        return (
            <div className='text-center text-gray-500 font-semibold'>
                Batik not found
            </div>
        );
    const idx = currentLanguage.code === 'id' ? 0 : 1;

    return (
        <div>
            <div className='relative flex h-screen w-screen bg-[#E5D387]'>
                <Navbar />
                {/* Tombol Back di pojok kiri atas */}
                <button
                    className='absolute top-4 left-4 z-10 flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md'
                    onClick={() => router.push('/gallery')}
                >
                    <ArrowLeft className='mr-2' />
                    {idx === 1 ? 'Back to Gallery' : 'Kembali ke Galeri'}
                </button>

                {/* Kolom Gambar */}
                <div className='flex-1'>
                    <ImageSlider images={batik.foto} />
                </div>

                {/* Kolom Detail */}
                <div
                    className={`flex-1 flex flex-col ${
                        showDetails ? 'justify-start' : 'justify-center'
                    } p-12 bg-gray-100 overflow-y-auto max-h-screen  `}
                    style={{
                        backgroundImage:
                            "url('/images/old-papper-texture-background.png')",
                        backgroundSize: 'cover', // Menyesuaikan gambar agar menutupi seluruh area
                        backgroundPosition: 'center', // Memusatkan gambar
                        backgroundRepeat: 'no-repeat', // Mencegah pengulangan gambar
                    }}
                >
                    <div className='pt-8 space-y-6'>
                        {/* Nama Batik */}
                        <h1 className='text-3xl font-bold'>{batik.nama}</h1>

                        {/* Seniman (jika ada) */}
                        {batik.seniman && (
                            <div className='bg-gray-100 p-4 rounded-xl shadow-md w-fit'>
                                <div className='text-lg text-gray-800'>
                                    <p>
                                        {idx === 1 ? 'Made By' : 'Dibuat Oleh'}
                                    </p>
                                    <p className='text-xl font-serif font-semibold border-b-2 border-[#DEB887] pb-2 mb-4 text-[#8B4513]'>
                                        📍 {batik.seniman}
                                    </p>
                                    <p className='mt-5'>
                                        {batik.alamat} {batik.endpoint}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Histori */}
                        <p className='text-lg'>
                            {batik.translations[idx].histori}
                        </p>

                        {/* Tombol Full Description */}
                        <button
                            className='flex items-center bg-[#391917] text-white px-4 py-2 rounded hover:bg-[#5a2b2b]'
                            onClick={() => setShowDetails(!showDetails)}
                        >
                            {showDetails ? (
                                <>
                                    {idx === 1
                                        ? 'Hide Description'
                                        : 'Sembunyikan Deskripsi'}
                                    <ArrowLeft className='ml-2' />
                                </>
                            ) : (
                                <>
                                    {idx === 1
                                        ? 'Full Description'
                                        : 'Deskripsi Lengkap'}
                                    <ArrowRight className='ml-2' />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Detail Lengkap */}
                    {showDetails && (
                        <div className='mt-6 space-y-6'>
                            {/* Tema dan Subtema */}
                            <div className='space-y-4'>
                                {batik.tema.map((tema) => {
                                    const temaTranslation =
                                        tema.translations.find(
                                            (translation) =>
                                                translation.languageId ===
                                                (idx === 1 ? 2 : 1)
                                        );

                                    const relatedSubTema = batik.subTema.filter(
                                        (subTema) => subTema.temaId === tema.id
                                    );

                                    return (
                                        <div
                                            key={tema.id}
                                            className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887]'
                                        >
                                            <h3 className='text-xl font-serif font-semibold border-b-2 border-[#DEB887] pb-2 mb-4 text-[#8B4513]'>
                                                {idx === 1
                                                    ? 'Theme: '
                                                    : 'Tema: '}
                                                {temaTranslation?.nama ||
                                                    tema.nama}
                                            </h3>
                                            <ul className='grid grid-cols-1 md:grid-cols-2 gap-3 mt-2'>
                                                {relatedSubTema.map(
                                                    (subTema) => {
                                                        const subTemaTranslation =
                                                            subTema.translations.find(
                                                                (translation) =>
                                                                    translation.languageId ===
                                                                    (idx === 1
                                                                        ? 2
                                                                        : 1)
                                                            );
                                                        return (
                                                            <li
                                                                key={subTema.id}
                                                                className='bg-white p-3 rounded-md shadow-md border border-[#DEB887] hover:shadow-lg transition-shadow duration-300'
                                                            >
                                                                {subTemaTranslation?.nama ||
                                                                    subTema.nama}
                                                            </li>
                                                        );
                                                    }
                                                )}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Informasi Tambahan */}
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>🎨</span>
                                        {idx == 1 ? 'Color: ' : 'Warna: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.translations[idx].warna}
                                    </p>
                                </div>

                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>🛠️</span>
                                        {idx == 1 ? 'Technique: ' : 'Teknik: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.translations[idx].teknik}
                                    </p>
                                </div>

                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>🧵</span>
                                        {idx == 1
                                            ? 'Fabric Type: '
                                            : 'Jenis Kain: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.translations[idx].jenisKain}
                                    </p>
                                </div>

                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>🌈</span>
                                        {idx == 1 ? 'Dye: ' : 'Pewarna: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.translations[idx].pewarna}
                                    </p>
                                </div>

                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>🔺</span>
                                        {idx == 1 ? 'Shape: ' : 'Bentuk: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.translations[idx].bentuk}
                                    </p>
                                </div>

                                <div className='bg-[#FDF5E6] shadow-lg rounded-lg p-6 border border-[#DEB887] hover:shadow-xl transition-shadow duration-300'>
                                    <h3 className='text-lg font-serif font-semibold flex items-center text-[#8B4513]'>
                                        <span className='mr-2'>📏</span>
                                        {idx == 1 ? 'Dimension: ' : 'Dimensi: '}
                                    </h3>
                                    <p className='mt-2 text-gray-700'>
                                        {batik.dimensi}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
