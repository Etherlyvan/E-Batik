'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-[#CAC4B8] text-[#3A3A3A] py-8 px-4 md:px-16 w-full font-[Poppins, sans-serif]'>
            <div className='container mx-auto'>
                {/* Logo container with left alignment */}
                <div className='flex flex-col items-start'> {/* Changed to items-start */}
                    <div className='flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8'>
                        {/* Structured Logo Array for Better Control */}
                        {[
                            {
                                src: '/images/LogoApp.png',
                                alt: 'Logo App',
                                width: 200,
                                height: 200,
                                className: 'w-[120px] sm:w-[150px] md:w-[180px]'
                            },
                            {
                                src: '/images/LogoLIH 1.png',
                                alt: 'LIH Logo',
                                width: 150,
                                height: 250,
                                className: 'w-[150px] sm:w-[180px] md:w-[200px]'
                            },
                            {
                                src: '/images/LogoUB.png',
                                alt: 'Universitas Brawijaya',
                                width: 150,
                                height: 200,
                                className: 'w-[120px] sm:w-[150px] md:w-[180px] ml-4 sm:ml-6 md:ml-8'
                            },
                            {
                                src: '/images/LogoRU 1.png',
                                alt: 'Ritsumeikan University',
                                width: 70,
                                height: 50,
                                className: 'w-[60px] sm:w-[80px] md:w-[100px]'
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
            </div>

            {/* Footer Section */}
            <div className='border-t border-[#E1AD01] mt-6 pt-4'>
                <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                    <p className='text-sm mb-4 md:mb-0 text-[#3A3A3A] font-medium'>
                        Copyright &copy; 2025 Batik Sphere. All Rights
                        Reserved.
                    </p>
                    <ul className='flex space-x-6 font-medium'>
                        <li>
                            <Link
                                href='/'
                                className='text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200'
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href='/gallery'
                                className='text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200'
                            >
                                Gallery
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}