import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

interface Foto {
    id: number;
    link: string;
    batikId: number;
}

interface ImageSliderProps {
    images: Foto[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState<Foto | null>(null);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const openPopup = () => setSelectedImage(images[currentIndex]);
    const closePopup = () => setSelectedImage(null);

    return (
        <>
            <div className='relative w-full h-full'>
                {/* Gambar utama dengan onClick buka popup */}
                <div
                    className='w-full h-full rounded-lg cursor-pointer relative'
                    onClick={openPopup}
                >
                    <Image
                        src={images[currentIndex].link}
                        alt={`Batik ${currentIndex}`}
                        fill
                        style={{ objectFit: 'cover', borderRadius: '0.5rem' }}
                        sizes='(max-width: 768px) 100vw, 700px'
                        priority
                    />
                </div>

                {/* Tombol next */}
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

            {/* Popup full screen sesuai style yang kamu mau */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
                    {/* Tombol close */}
                    <button
                        onClick={closePopup}
                        className='absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400'
                        aria-label='Close popup'
                    >
                        &times;
                    </button>

                    {/* Gambar besar */}
                    <div
                        className='max-w-4xl w-full px-4 relative'
                        style={{ height: '80vh' }}
                    >
                        <Image
                            src={selectedImage.link}
                            alt='Full Batik'
                            fill
                            style={{
                                objectFit: 'contain',
                                borderRadius: '0.5rem',
                            }}
                            sizes='(max-width: 1024px) 100vw, 1024px'
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
