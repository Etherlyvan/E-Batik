'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Define props interface
interface Foto {
    id: number;
    link: string;
    batikId: number;
}

interface ImageSliderProps {
    images: Foto[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

    const prevSlide = (): void => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        if (!isHovered) {
            const interval = setInterval(() => {
                nextSlide();
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isHovered]);

    return (
        <div className='relative w-full mx-auto mt-4'>
            <div
                className='relative h-[460px] mx-12 group hover:-translate-y-2'
                onMouseOver={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(true);
                }}
            >
                <Image
                    src={images[currentIndex].link}
                    alt={`Slider Image ${currentIndex + 1}`}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-xl transition-all duration-500 ease-in-out cursor-pointer'
                />
            </div>
            <button
                className='absolute left-0 top-1/2 transform h-[459px] rounded-xl mx-1 -mt-[10px] -translate-y-1/2  text-white p-2 group'
                onClick={prevSlide}
            >
                <ChevronLeft className='text-gray-400 group-hover:text-white' />
            </button>
            <button
                className='absolute right-0 top-1/2 transform h-[459px] rounded-xl mx-1 -mt-[10px] -translate-y-1/2 text-white p-2 group'
                onClick={nextSlide}
            >
                <ChevronRight className='text-gray-400 group-hover:text-white' />
            </button>
            <div className='flex justify-center mt-4'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-10 mx-1 ${
                            index === currentIndex
                                ? 'bg-[#000000] rounded-xl'
                                : 'bg-gray-300 rounded-xl'
                        } transition-all duration-500 ease-in-out`}
                    ></div>
                ))}
            </div>

            {isFullscreen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50'
                    onClick={() => setIsFullscreen(false)}
                >
                    <button
                        className='absolute top-4 right-4 text-white'
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFullscreen(false);
                        }}
                    >
                        <X size={32} />
                    </button>
                    <Image
                        src={images[currentIndex].link}
                        alt={`Slider Image ${currentIndex + 1}`}
                        width={800}
                        height={600}
                        className='rounded-xl'
                    />
                </div>
            )}
        </div>
    );
}
