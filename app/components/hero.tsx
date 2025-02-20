'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
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
                const imageLinks = data.map((item: { link: string }) => item.link);
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
        <div className="relative w-full h-screen overflow-hidden">
            {/* Diagonal overlay */}
            <div className="absolute top-0 left-0 w-full h-full clip-diagonal"
                    style={{
                        backgroundImage: 'url(/images/backgroundd.svg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        opacity: 1, // Adjust the opacity as needed
                    }}
            >
                <AnimatePresence mode="wait">
                    {/* Background with sliding animation */}
                    <motion.div
                        key={currentImage}
                        initial={{ x: '-100%' }} // Start from the left
                        animate={{ x: 0 }} // Slide to the center
                        exit={{ x: '100%' }} // Slide out to the right
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="absolute top-0 left-0 w-full h-full clip-diagonal"
                        style={{
                            backgroundImage: `url(${currentImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1,
                        }}
                    >
                        <div className="absolute inset-0 bg-black opacity-10"></div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content */}
            <div className="relative max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-end h-full px-4 md:px-20 gap-x-12"
            style={{
                backgroundImage: 'url(/images/backgroundd.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: 0.9, // Adjust the opacity as needed
            }}>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 flex flex-col md:flex-row justify-end items-end w-full gap-x-12"
                >
                    <div className="text-right flex flex-col justify-center items-end">
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 leading-tight">
                            Welcome to
                        </h1>
                        <h2 className="text-5xl md:text-6xl font-extrabold text-black mb-4 leading-tight">
                            1<sup>st</sup> Batik Gallery!
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 mb-2 text-right max-w-lg">
                            With tens of thousands of Batik Database from more than 120 Boutique, we are the Indonesian&apos;s largest database of Batik!
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-2 mt-2 md:mt-0">
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <Image
                                src="/vercel.svg"
                                alt="ABC Logo"
                                width={50}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src="/images/LogoUB.png"
                                alt="NBC Logo"
                                width={50}
                                height={30}
                                className="object-contain"
                            />
                            <Image
                                src="/images/LogoRU 1.png"
                                alt="Fox Logo"
                                width={30}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
