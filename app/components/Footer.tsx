'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-[#CAC4B8] text-[#3A3A3A] py-8 px-4 md:px-16 w-full font-[Poppins, sans-serif]'>
            <div className='container mx-auto'>
                {/* Centering the images and making them responsive */}
                <div className='flex flex-wrap justify-center items-center gap-6'>
                    <Image
                        src='/images/LogoApp.png'
                        alt='Logo App'
                        className='object-contain'
                        width={200}
                        height={200}
                    />
                    <Image
                        src='/images/LogoLIH.png'
                        alt='LIH Logo'
                        className='object-contain'
                        width={250}
                        height={250}
                    />
                    <Image
                        src='/images/LogoUB.png'
                        alt='Universitas Brawijaya'
                        className='object-contain mr-9'
                        width={200}
                        height={200}
                    />
                    <Image
                        src='/images/LogoRU 1.png'
                        alt='Ritsumeikan University'
                        className='object-contain'
                        width={100}
                        height={100}
                    />
                </div>
            </div>

            {/* Footer Section */}
            <div className='border-t border-[#E1AD01] mt-6 pt-4 text-center text-sm flex flex-col md:flex-row justify-between items-center'>
                <p className='text-sm mb-4 md:mb-0 text-[#3A3A3A] font-medium'>
                    Copyright &copy; 2025 University of Brawijaya. All Rights
                    Reserved.
                </p>
                <ul className='flex flex-wrap justify-center space-x-4 font-medium'>
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
        </footer>
    );
}
