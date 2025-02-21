// import { useEffect, useState } from 'react';

import { useLanguage } from '@/context/LanguageContext';

const InfoDataComponent = () => {
    const { currentLanguage } = useLanguage();

    return (
        <div className='font-sans w-full'>
            <section className='bg-[#5a2b2b] text-white py-16 w-full'>
                <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center'>
                    {/* Logo SVG */}
                    <div className='flex justify-center mb-6'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='#c4a484'
                            className='w-16 h-16'
                        >
                            <path d='M12 2L1.5 21h21L12 2zM12 6l7 13H5l7-13z' />
                        </svg>
                    </div>

                    <h1 className='text-3xl font-bold text-[#e5d0b5]'>
                        {currentLanguage.code === 'id'
                            ? 'Jelajahi Koleksi Batik Kami yang Indah: Sebuah Perjalanan Melalui Seni dan Budaya'
                            : 'Explore Our Exquisite Batik Collections: A Journey Through Art and Culture'}
                    </h1>

                    <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[
                            {
                                title:
                                    currentLanguage.code === 'id'
                                        ? 'Temukan Kekayaan Warisan Batik'
                                        : 'Discover the Rich Heritage of Batik',
                                description:
                                    currentLanguage.code === 'id'
                                        ? 'Rasakan keindahan Batik tradisional dan kontemporer.'
                                        : 'Immerse yourself in the beauty of traditional and contemporary Batik.',
                                linkText:
                                    currentLanguage.code === 'id'
                                        ? 'Lihat'
                                        : 'View',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-5-5h10l-5 5z' />
                                    </svg>
                                ),
                            },
                            {
                                title:
                                    currentLanguage.code === 'id'
                                        ? 'Rasakan Keindahan Seni Batik'
                                        : 'Experience the Artistry of Batik',
                                description:
                                    currentLanguage.code === 'id'
                                        ? 'Setiap motif menceritakan kisah yang mencerminkan budaya Indonesia.'
                                        : 'Each piece tells a story, reflecting the rich culture of Indonesia.',
                                linkText:
                                    currentLanguage.code === 'id'
                                        ? 'Jelajahi'
                                        : 'Explore',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2L1.5 21h21L12 2zm0 3.3L18.6 19H5.4L12 5.3z' />
                                    </svg>
                                ),
                            },
                            {
                                title:
                                    currentLanguage.code === 'id'
                                        ? 'Bergabung dalam Melestarikan Batik'
                                        : 'Join Us in Celebrating Batik',
                                description:
                                    currentLanguage.code === 'id'
                                        ? 'Jadilah bagian dari perjalanan kami dalam melestarikan dan mempromosikan warisan Batik.'
                                        : 'Be part of our journey to preserve and promote Batik heritage.',
                                linkText:
                                    currentLanguage.code === 'id'
                                        ? 'Bergabung'
                                        : 'Join',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-5h4v5h-4zm0-7V8h4v1.5h-4z' />
                                    </svg>
                                ),
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className='text-left flex items-start gap-4'
                            >
                                {item.icon}
                                <div>
                                    <div className='text-lg font-semibold text-[#e5d0b5]'>
                                        {item.title}
                                    </div>
                                    <p className='mt-2 text-md text-[#e5d0b5]'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoDataComponent;
