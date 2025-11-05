// components/batik/BatikImageSlider.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { Photo } from '@/lib/types';

interface BatikImageSliderProps {
  images: Photo[];
}

export function BatikImageSlider({ images }: BatikImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openPopup = () => setSelectedImage(images[currentIndex]);
  const closePopup = () => setSelectedImage(null);

  return (
    <>
      <div className="relative w-full h-full">
        {/* Main Image */}
        <div
          className="w-full h-full rounded-lg cursor-pointer relative"
          onClick={openPopup}
        >
          <Image
            src={images[currentIndex].link}
            alt={`Batik ${currentIndex}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 shadow-lg"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400"
            aria-label="Close popup"
          >
            &times;
          </button>

          {/* Large Image */}
          <div
            className="max-w-4xl w-full px-4 relative"
            style={{ height: '80vh' }}
          >
            <Image
              src={selectedImage.link}
              alt="Full Batik"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}