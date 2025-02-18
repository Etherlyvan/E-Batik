'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className='bg-[#cac4b8] text-black py-8 px-4 md:px-16 w-full mt-0'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <div className='w-full md:w-3/4 flex flex-col items-start'>
                    <div className='flex flex-wrap justify-center md:justify-start space-x-2 mb-4 gap-10'>
                        <Image
                            src='/vercel.svg'
                            alt='Artwork'
                            className='mb-4'
                            width={128}
                            height={128}
                        />
                        <Image
                            src='/images/LogoUB.png'
                            alt='Artwork'
                            className='mb-4'
                            width={128}
                            height={128}
                        />
                        <Image
                            src='/images/LogoRU.png'
                            alt='Artwork'
                            className='mb-4'
                            width={400}
                            height={400}
                        />
                    </div>
                </div>

                <div className='w-full md:w-1/4 text-center md:text-left mt-4 md:mt-0 ml-3'>
                    <h2 className='font-bold text-lg'>BATIK DIGITALIZATION</h2>
                    <ul className='mt-2 space-y-2'>
                        <li>LOREM IPSUM</li>
                        <li>johndoe@gmail.com</li>
                        <li>08965-3472-2943</li>
                        <li>Jalan Jakarta No. 133</li>
                        <li>Malang</li>
                    </ul>
                </div>
            </div>

            <div className='border-t border-gray-700 mt-6 pt-4 text-center text-sm flex flex-col md:flex-row justify-between items-center'>
                <p className='text-sm mb-4 md:mb-0'>
                    Copyright &copy; 2025 John Doe. All Rights Reserved.
                </p>
                <ul className='flex flex-wrap justify-center space-x-4 mr-3'>
                    <li>
                        <Link href='/' className='hover:text-gray-500'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href='/gallery' className='hover:text-gray-500'>
                            Gallery
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
