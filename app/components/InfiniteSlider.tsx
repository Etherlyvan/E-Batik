'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Batik } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SliderProps {
    batiks: Batik[];
}

export default function InfiniteSlider(props: SliderProps) {
    const { batiks } = props;
    const { currentLanguage } = useLanguage();

    return (
        <section className='w-full py-8'>
            {/* Title */}
            <div className='text-center mb-6'>
                <h2 className='text-2xl font-bold text-[#C76A39] tracking-wide'>
                    {currentLanguage.code === 'en'
                        ? 'Batik Showcase'
                        : 'Pameran Batik'}
                </h2>
                <p className='text-[#3A3A3A] mt-2 font-medium'>
                    {currentLanguage.code === 'en'
                        ? 'Explore stunning collection of Batik artworks.'
                        : 'Jelajahi koleksi karya seni batik yang memukau'}
                </p>
            </div>

            {/* Infinite Sliding Images */}
            <div className='w-full overflow-hidden relative'>
                <motion.div
                    className='flex whitespace-nowrap justify-center px-6'
                    initial={{ x: '0%' }}
                    animate={{ x: '-100%' }} // Arah pergerakan ke kiri
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 20,
                    }}
                >
                    {[...batiks, ...batiks].map((batik, index) => (
                        <div
                            key={index}
                            className='w-[300px] flex-shrink-0 px-3 flex flex-col items-center relative'
                        >
                            <div className='border border-gray-300 rounded-lg shadow-md p-2 bg-white w-full'>
                                <div className='w-full aspect-square relative'>
                                    <Image
                                        src={batik.foto[0].link}
                                        alt={batik.nama}
                                        layout='fill'
                                        objectFit='cover'
                                        className='rounded-lg'
                                    />
                                </div>
                                <p className='mt-2 text-sm font-bold text-gray-700 text-center'>
                                    {batik.nama}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
