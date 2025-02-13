'use client';

import ImageSlider from '@/app/components/ImageSlider';
import { useEffect, useState, use } from 'react';

interface Foto {
    id: number;
    link: string;
    batikId: number;
}

interface Tema {
    id: number;
    nama: string;
}

interface SubTema {
    id: number;
    nama: string;
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
}

interface Params {
    id: number;
}

interface BatikDetailProps {
    params: Promise<Params>;
}

export default function BatikDetail({ params }: BatikDetailProps) {
    const { id } = use(params);
    const [batik, setBatik] = useState<Batik | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <ImageSlider images={batik.foto} />
            <div className='mt-6 space-y-4'>
                <h1 className='text-3xl font-bold text-gray-900'>
                    {batik.nama}
                </h1>
                <p className='text-lg text-gray-700'>Tahun: {batik.tahun}</p>

                <div className='grid grid-cols-2 gap-4'>
                    <p className='text-lg font-medium'>
                        Warna:{' '}
                        <span className='font-normal'>{batik.warna}</span>
                    </p>
                    <p className='text-lg font-medium'>
                        Teknik:{' '}
                        <span className='font-normal'>{batik.teknik}</span>
                    </p>
                    <p className='text-lg font-medium'>
                        Jenis Kain:{' '}
                        <span className='font-normal'>{batik.jenisKain}</span>
                    </p>
                    <p className='text-lg font-medium'>
                        Pewarna:{' '}
                        <span className='font-normal'>{batik.pewarna}</span>
                    </p>
                    <p className='text-lg font-medium'>
                        Bentuk:{' '}
                        <span className='font-normal'>{batik.bentuk}</span>
                    </p>
                    <p className='text-lg font-medium'>
                        Dimensi:{' '}
                        <span className='font-normal'>{batik.dimensi}</span>
                    </p>
                </div>

                <p className='text-lg font-medium'>Histori:</p>
                <p className='text-gray-700'>{batik.histori}</p>

                <div className='flex flex-wrap gap-2'>
                    <span className='text-lg font-medium'>Tema:</span>
                    {batik.tema.map((t) => (
                        <span
                            key={t.id}
                            className='px-3 py-1 bg-blue-200 text-blue-800 rounded-md'
                        >
                            {t.nama}
                        </span>
                    ))}
                </div>

                <div className='flex flex-wrap gap-2'>
                    <span className='text-lg font-medium'>Sub Tema:</span>
                    {batik.subTema.map((st) => (
                        <span
                            key={st.id}
                            className='px-3 py-1 bg-green-200 text-green-800 rounded-md'
                        >
                            {st.nama}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
