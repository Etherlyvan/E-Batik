'use client';

import ImageSlider from '@/app/components/ImageSlider';
import { useEffect, useState, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

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

    const searchParams = useSearchParams();
    const lang = searchParams.get('lang');

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
                console.log('Batik id:', filteredBatik);
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

    if (loading)
        return (
            <div className='text-center text-lg font-semibold'>Loading...</div>
        );
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
    const idx = lang === 'id' ? 0 : 1;

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <div
                className='flex flex-row items-center cursor-pointer  hover:underline mb-5'
                onClick={() => router.back()}
            >
                <ArrowLeft className='w-7 h-7 mr-1' />
                <p>{idx == 1 ? 'Back' : 'Kembali'}</p>
            </div>
            <ImageSlider images={batik.foto} />
            <div className='mt-6 space-y-4'>
                <h1 className='text-3xl font-bold text-gray-900'>
                    {batik.nama}
                </h1>
                <p className='text-lg font-medium text-gray-700'>
                    {idx == 1 ? 'Year ' : 'Tahun '}: {batik.tahun}
                </p>

                <div className='grid grid-cols-2 gap-4'>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Color: ' : 'Warna: '}
                        <span className='font-normal'>
                            {batik.translations[idx].warna}
                        </span>
                    </p>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Technique: ' : 'Teknik: '}
                        <span className='font-normal'>
                            {batik.translations[idx].teknik}
                        </span>
                    </p>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Fabric Type: ' : 'Jenis Kain: '}
                        <span className='font-normal'>
                            {batik.translations[idx].jenisKain}
                        </span>
                    </p>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Dye: ' : 'Pewarna: '}
                        <span className='font-normal'>
                            {batik.translations[idx].pewarna}
                        </span>
                    </p>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Shape: ' : 'Bentuk: '}
                        <span className='font-normal'>
                            {batik.translations[idx].bentuk}
                        </span>
                    </p>
                    <p className='text-lg font-medium'>
                        {idx == 1 ? 'Dimension: ' : 'Dimensi: '}
                        <span className='font-normal'>{batik.dimensi}</span>
                    </p>
                </div>

                <p className='text-lg font-medium'>
                    {idx == 1 ? 'History: ' : 'Histori: '}
                </p>
                <p className='text-gray-700'>
                    {batik.translations[idx].histori}
                </p>

                <p className='text-lg font-medium'>
                    {idx == 1 ? 'Theme and Sub Theme' : 'Tema dan Sub Tema'}
                </p>
                <div className='flex flex-col gap-7'>
                    {batik.tema.map((tema) => (
                        <div key={tema.id}>
                            <span className='font-medium  px-3 py-1 bg-blue-200 text-blue-800 rounded-md'>
                                {tema.translations[(idx + 1) % 2].nama}
                            </span>
                            <div className='flex flex-wrap gap-2 mt-2'>
                                {batik.subTema
                                    .filter((st) => st.temaId === tema.id) // Hanya sub tema yang sesuai
                                    .map((st) => (
                                        <span
                                            key={st.id}
                                            className='px-3 py-1 bg-green-200 text-green-800 rounded-md'
                                        >
                                            {
                                                st.translations[(idx + 1) % 2]
                                                    .nama
                                            }
                                        </span>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
