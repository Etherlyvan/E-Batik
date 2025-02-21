'use client';

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InfoDataComponent = () => {
    const { currentLanguage } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            title: currentLanguage.code === 'id' 
                ? 'Bentuk: Bunga Teratai'
                : 'Form: Lotus Flower',
            description: currentLanguage.code === 'id'
                ? 'Melambangkan regenerasi dan transformasi budaya dalam konteks digital. Teratai berfungsi sebagai medium pelestarian dan pengembangan, memungkinkan batik berevolusi tanpa kehilangan esensi tradisionalnya.'
                : 'Symbolizes cultural regeneration and transformation in a digital context. The lotus serves as a medium for preservation and development, allowing batik to evolve without losing its traditional essence.',
        },
        {
            title: currentLanguage.code === 'id'
                ? 'Elemen Topeng: Identitas dan Kearifan Lokal'
                : 'Mask Element: Identity and Local Wisdom',
            description: currentLanguage.code === 'id'
                ? 'Mencerminkan identitas budaya Nusantara dengan nilai filosofis. Menegaskan bahwa digitalisasi motif batik bukan sekadar dokumentasi, tetapi juga upaya pelestarian budaya.'
                : 'Reflects the cultural identity of the Nusantara with philosophical values. Emphasizes that digitizing batik motifs is not just documentation, but also an effort to preserve culture.',
        },
        {
            title: currentLanguage.code === 'id'
                ? 'Makna Warna: Kedalaman dan Inovasi'
                : 'Color Meaning: Depth and Innovation',
            description: currentLanguage.code === 'id'
                ? 'Warna biru tua melambangkan kedalaman dan kekayaan batik. Warna biru muda merepresentasikan inovasi digital, memungkinkan penyebaran global.'
                : 'Dark blue symbolizes the depth and richness of batik. Light blue represents digital innovation, enabling global dissemination.',
        },
        {
            title: currentLanguage.code === 'id'
                ? 'Struktur Motif'
                : 'Motif Structure',
            description: currentLanguage.code === 'id'
                ? 'Mencerminkan potensi eksplorasi dari berbagai pendekatan multidisipliner untuk mendukung penelitian dan pengembangan keilmuan.'
                : 'Reflects the potential exploration from various multidisciplinary approaches to support research and scientific development.',
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 7000); // Total time including delay
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className='font-sans w-full'>
            <section className='bg-[#5a2b2b] text-white py-16 w-full'>
                <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center'>
                    <div className='flex justify-center mb-6'>
                        <div className='relative w-[90px] h-[90px]'>
                            <Image
                                src='/images/LogoApp.png'
                                alt='Logo'
                                fill
                                className='object-contain'
                                priority
                                sizes="90px"
                            />
                        </div>
                    </div>

                    <div className='mt-8'>
                        <AnimatePresence>
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }} // Smoother easing
                                className='space-y-4'
                            >
                                <h2 className='text-lg font-semibold text-[#e5d0b5]'>
                                    {slides[currentIndex].title}
                                </h2>
                                <p className='text-md text-[#e5d0b5]'>
                                    {slides[currentIndex].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoDataComponent;