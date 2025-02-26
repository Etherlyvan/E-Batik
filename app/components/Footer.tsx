'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-[#CAC4B8] text-[#3A3A3A] py-8 px-4 md:px-16 w-full font-[Poppins, sans-serif]'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                {/* Left Section */}
                <div className='flex flex-col items-start'>
                    <h2 className='text-lg font-bold mb-4'>Batik Sphere</h2>
                    <p className='text-sm'>
                        Preserving and celebrating the rich heritage of Indonesian batik through digital innovation and cultural exploration.
                    </p>
                </div>
            </div>

            {/* Structured Logo Section */}
            <div className='flex justify-end items-center mt-8'>
                <div className='flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8'>
                    {[
                        {
                            src: '/images/LogoApp.png',
                            alt: 'Logo App',
                            width: 90,
                            height: 90,
                            className: 'w-[90px] sm:w-[90px] md:w-[80px]'
                        },
                        {
                            src: '/images/LogoLIH 1.png',
                            alt: 'LIH Logo',
                            width: 90,
                            height: 90,
                            className: 'w-[90px] sm:w-[90px] md:w-[60px]'
                        },
                        {
                            src: '/images/LogoUB.png',
                            alt: 'Universitas Brawijaya',
                            width: 60,
                            height: 60,
                            className: 'w-[60px] sm:w-[60px] md:w-[60px]'
                        },
                        {
                            src: '/images/LogoRU 1.png',
                            alt: 'Ritsumeikan University',
                            width: 50,
                            height: 60,
                            className: 'w-[50px] sm:w-[60px] md:w-[30px]'
                        }
                    ].map((logo) => (
                        <div 
                            key={logo.alt}
                            className="relative flex items-center"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={logo.width}
                                height={logo.height}
                                className={`object-contain ${logo.className}`}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Borderline and Footer Section */}
            <div className='border-t border-[#E1AD01] mt-2 pt-4'>
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                    <p className='text-sm mb-4 md:mb-0 text-[#3A3A3A] font-medium'>
                        Copyright &copy; 2025 Batik Sphere. All Rights Reserved.
                    </p>
                    <ul className='flex space-x-6 font-medium'>
                        <li>
                            <Link
                                href='/privacy-policy'
                                className='text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200'
                            >
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/terms'
                                className='text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200'
                            >
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
