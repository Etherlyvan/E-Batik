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

    // Animation variants for staggered text effects
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    const titleVariants = {
        hidden: { y: -20, opacity: 0 },
        show: { 
            y: 0, 
            opacity: 1,
            transition: { 
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        },
        exit: { 
            y: -10, 
            opacity: 0,
            transition: { 
                duration: 0.3
            }
        }
    };

    const descriptionVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.7,
                ease: [0.43, 0.13, 0.23, 0.96]
            }
        },
        exit: { 
            opacity: 0, 
            y: 10,
            transition: { 
                duration: 0.3
            }
        }
    };




    return (
        <div className='font-sans w-full'>
            <section className='bg-[#5a2b2b] text-white py-16 w-full overflow-hidden'>
                <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center'>
                    <div className='flex justify-center mb-6'>
                        <motion.div 
                            className='relative w-[90px] h-[90px]'
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src='/images/LogoApp.png'
                                alt='Logo'
                                fill
                                className='object-contain'
                                priority
                                sizes="90px"
                            />
                        </motion.div>
                    </div>

                    <div className='mt-8 relative min-h-[160px]'>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                exit="exit"
                                className='space-y-4'
                            >
                                <motion.h2 
                                    variants={titleVariants}
                                    className='text-xl font-semibold text-[#e5d0b5] mb-4'
                                >
                                    {slides[currentIndex].title}
                                </motion.h2>
                                
                                <motion.p 
                                    variants={descriptionVariants}
                                    className='text-md text-[#e5d0b5] max-w-2xl mx-auto leading-relaxed'
                                >
                                    {slides[currentIndex].description}
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>

  

                        {/* Slide indicator dots */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {slides.map((_, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-[#e5d0b5]' : 'bg-[#8a5858]'}`}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        scale: currentIndex === index ? [1, 1.2, 1] : 1,
                                        transition: {
                                            duration: 0.5,
                                            repeat: currentIndex === index ? Infinity : 0,
                                            repeatType: "reverse"
                                        }
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoDataComponent;
