'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Hero = () => {
    const { currentLanguage } = useLanguage();
    const [backgroundImages, setBackgroundImages] = useState<string[]>([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchHeroPhotos = async () => {
            try {
                const response = await fetch('/api/hero');
                if (!response.ok) {
                    throw new Error('Failed to fetch hero photos');
                }

                const data = await response.json();
                const imageLinks = data.map(
                    (item: { link: string }) => item.link
                );
                setBackgroundImages(imageLinks);
            } catch (error) {
                console.error('Error fetching hero photos:', error);
            }
        };

        fetchHeroPhotos();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => {
                return backgroundImages.length > 0
                    ? (prevIndex + 1) % backgroundImages.length
                    : 0;
            });
        }, 3000);

        return () => clearInterval(intervalId);
    }, [backgroundImages]);

    const currentImage =
        backgroundImages.length > 0
            ? backgroundImages[currentImageIndex]
            : '/images/gallery-hero-bg.jpg';

            return (
                // Mengubah h-screen menjadi h-[85vh] atau nilai yang lebih kecil
                <div className='relative w-full h-[80vh] overflow-hidden'> 
                    {/* Diagonal overlay */}
                    <div
                        className='absolute top-0 left-0 w-full h-full clip-diagonal'
                        style={{
                            backgroundImage: 'url(/images/corner-patttern-like-the-image.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1,
                        }}
                    >
                        <AnimatePresence mode='wait'>
                            {/* Background with sliding animation */}
                            <motion.div
                                key={currentImage}
                                initial={{ x: '-100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                className='absolute top-0 left-0 w-full h-full clip-diagonal'
                                style={{
                                    backgroundImage: `url(${currentImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    opacity: 1,
                                }}
                            >
                                <div className='absolute inset-0 bg-black opacity-10'></div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
            
                    {/* Content Container */}
                    <div
                        className='relative w-full h-full flex flex-col md:flex-row items-center 
                        justify-end px-4 sm:px-6 md:px-8 lg:px-20'
                        style={{
                            backgroundImage: 'url(/images/corner-patttern-like-the-image.jpg)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 0.9,
                        }}
                    >
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className='flex-1 flex flex-col md:flex-row justify-center items-end w-full 
                            gap-x-4 sm:gap-x-8 lg:gap-x-12 px-2 sm:px-4'
                        >
                            <div className='text-right flex flex-col justify-center items-end w-full
                                py-4 sm:py-6 md:py-8' // Menambahkan padding vertical yang lebih kecil
                            >
                                {/* Welcome Text */}
                                <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                                font-bold text-black mb-1 sm:mb-2 leading-tight tracking-tight'>
                                    {currentLanguage.code === 'id'
                                        ? 'Selamat Datang di'
                                        : 'Welcome to'}
                                </h1>
            
                                {/* Main Title */}
                                <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                                font-extrabold text-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight'>
                                    {currentLanguage.code === 'en' ? (
                                        <>
                                            1<sup className='text-lg sm:text-xl md:text-2xl'>st</sup> Batik Database!
                                        </>
                                    ) : (
                                        'Database Batik Pertama!'
                                    )}
                                </h2>
            
                                {/* Description - Mengurangi margin bottom */}
                                <p className='text-sm sm:text-base md:text-lg lg:text-xl 
                                text-gray-700 mb-1 sm:mb-2 text-right max-w-[280px] sm:max-w-[340px] 
                                md:max-w-[400px] lg:max-w-lg leading-relaxed'>
                                    {currentLanguage.code === 'id'
                                        ? "Dengan ratusan desain Batik dari butik diJawa Timur, kami adalah database Batik terbesar di Indonesia!"
                                        : "With hundreds of Batik designs from boutiques in East Java, we are Indonesia's largest Batik database!"}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            );
};

export default Hero;
