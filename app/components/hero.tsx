import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const { currentLanguage } = useLanguage();
    const router = useRouter();

    return (
        <div className='max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center py-5'>
            {/* Left side: Welcome message and description */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='flex-1 text-center md:text-left px-4 md:px-0'
            >
                {/* Welcome message */}
                <div className='mt-2 md:mt-6'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className=' text-3xl md:text-7xl font-bold mb-6 leading-tight whitespace-normal pb-4'
                        style={{
                            background:
                                'linear-gradient(to right, #C76A39, #E1AD01)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {currentLanguage.code === 'id' ? (
                            <>
                                <span>Selamat Datang</span>
                                <br />
                                <span>Di Gallery Batik Digital </span>
                            </>
                        ) : (
                            <>
                                <span>Welcome To</span>
                                <br />
                                <span>Digital Batik Gallery </span>
                            </>
                        )}
                    </motion.h2>
                </div>
                {/* Additional message */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className='mt-4 md:mt-6'
                >
                    <h2 className='text-lg md:text-xl tracking-wide leading-relaxed mb-4 text-[#3A3A3A]'>
                        {currentLanguage.code === 'id' ? (
                            <>
                                Jelajahi koleksi Batik dari seluruh Indonesia.
                                <br />
                                Akses mudah kapan saja, di mana saja.
                                <br />
                                Temukan Seni tanpa batas di ujung jari Anda.
                            </>
                        ) : (
                            <>
                                Explore Batik collections from all over
                                Indonesia.
                                <br />
                                Easy access anytime, anywhere.
                                <br />
                                Discover boundless art at your fingertips.
                            </>
                        )}
                    </h2>
                    {/* Call-to-action buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className='mt-6 space-x-4'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-6 py-3 rounded-full bg-gradient-to-r from-[#C76A39] to-[#E1AD01] text-white font-semibold
         shadow-lg hover:shadow-[#E1AD01]/50 transition-all duration-300'
                            onClick={() => router.push('/gallery')}
                        >
                            {currentLanguage.code === 'id'
                                ? 'Mulai Jelajahi'
                                : 'Start Exploring'}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='px-6 py-3 rounded-full border-2 border-[#C76A39] text-[#C76A39] font-semibold
         hover:bg-[#F8F9FA] transition-all duration-300'
                        >
                            {currentLanguage.code === 'id'
                                ? 'Pelajari Lebih Lanjut'
                                : 'Learn More'}
                        </motion.button>
                    </motion.div>
                </motion.div>
            </motion.div>
            {/* Right side: Large image */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='flex justify-center items-center mt-6 md:mt-0'
            >
                <div className='relative'>
                    {/* Decorative background circle */}
                    <div className='absolute -z-10 w-[300px] h-[300px] bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30' />
                    <Image
                        src='/hero_image.svg'
                        alt='Gambar Perpustakaan'
                        width={500}
                        height={333}
                        className='max-w-full h-auto drop-shadow-2xl'
                        priority
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
