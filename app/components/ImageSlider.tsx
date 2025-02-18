import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface ImageSliderProps {
    images: { id: number; link: string }[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className='relative w-full h-full'>
            {/* Gambar */}
            <div
                className='w-full h-full bg-cover bg-center rounded-lg'
                style={{
                    backgroundImage: `url(${images[currentIndex].link})`,
                }}
            ></div>

            {/* Tombol Berikutnya (di luar gambar) */}
            <button
                className='absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 shadow-lg'
                onClick={goToNext}
            >
                <ChevronRight size={24} />
            </button>

            {/* Indikator */}
            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex
                                ? 'bg-white'
                                : 'bg-gray-400'
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
