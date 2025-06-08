import { useState } from 'react';
import Image from 'next/image';

interface Foto {
    id: number;
    link: string;
    batikId: number;
}

const ImagePopup = ({ images }: { images: Foto[] }) => {
    const [selectedImage, setSelectedImage] = useState<Foto | null>(null);

    return (
        <div className='relative'>
            {/* Daftar gambar */}
            <div className='flex gap-4 flex-wrap'>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className='cursor-pointer'
                        onClick={() => setSelectedImage(img)}
                    >
                        <Image
                            src={img.link}
                            alt={`Batik ${index}`}
                            width={200}
                            height={150}
                            className='rounded-md hover:opacity-80 transition'
                        />
                    </div>
                ))}
            </div>

            {/* Pop-up gambar full screen */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
                    {/* Tombol X untuk menutup */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className='absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400'
                    >
                        &times;
                    </button>

                    {/* Gambar besar */}
                    <div className='max-w-4xl w-full px-4'>
                        <Image
                            src={selectedImage.link}
                            alt='Full Batik'
                            width={1200}
                            height={800}
                            className='w-full h-auto object-contain rounded-lg'
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImagePopup;
