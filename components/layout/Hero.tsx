// components/layout/Hero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  backgroundImages?: string[];
}

export function Hero({ backgroundImages = [] }: HeroProps) {
  const { currentLanguage } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  // Memoize preload function
  const preloadImages = useCallback((images: string[]) => {
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedImagesCount = 0;
    const imagePromises = images.map((imageSrc) => {
      return new Promise<void>((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.src = imageSrc;
      });
    });

    Promise.all(imagePromises);
  }, []);

  // Fetch hero images only once
  useEffect(() => {
    let isMounted = true;

    const fetchHeroPhotos = async () => {
      if (isLoading) return; // Prevent multiple calls
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/hero');
        if (!response.ok) {
          throw new Error('Failed to fetch hero photos');
        }

        const data = await response.json();
        if (isMounted) {
          const imageLinks = data.map((item: { link: string }) => item.link);
          setHeroImages(imageLinks);
          preloadImages(imageLinks);
        }
      } catch (error) {
        console.error('Error fetching hero photos:', error);
        if (isMounted) {
          // Use default images if API fails
          const defaultImages = ['/images/gallery-hero-bg.jpg'];
          setHeroImages(defaultImages);
          preloadImages(defaultImages);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (backgroundImages.length > 0) {
      setHeroImages(backgroundImages);
      preloadImages(backgroundImages);
    } else if (heroImages.length === 0) {
      // Only fetch if we don't have images yet
      fetchHeroPhotos();
    }

    return () => {
      isMounted = false;
    };
  }, [backgroundImages, preloadImages, isLoading, heroImages.length]);

  // Auto-rotate background images
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentImage = heroImages.length > 0 
    ? heroImages[currentImageIndex] 
    : '/images/gallery-hero-bg.jpg';

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/corner-patttern-like-the-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dynamic Background Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {imagesLoaded && heroImages.length > 0 && (
            <motion.div
              key={currentImage}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: 'scale(0.5)',
                transformOrigin: 'center right',
                opacity: 0.8,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/corner-patttern-like-the-image.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-end h-full px-4 sm:px-6 md:px-8 lg:px-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col md:flex-row justify-center items-end w-full gap-x-4 sm:gap-x-8 lg:gap-x-12 px-2 sm:px-4"
        >
          <div className="text-right flex flex-col justify-center items-end w-full py-4 sm:py-6 md:py-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2 leading-tight tracking-tight">
              {isIndonesian
                ? 'Selamat Datang di'
                : 'Welcome to'}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight">
              {isIndonesian ? (
                'Database Batik Pertama!'
              ) : (
                <>
                  1<sup className="text-lg sm:text-xl md:text-2xl">st</sup> Batik Database!
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 text-right max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-lg leading-relaxed">
              {isIndonesian
                ? "Dengan ratusan desain Batik dari butik di Jawa Timur, kami adalah database Batik terbesar di Indonesia!"
                : "With hundreds of Batik designs from boutiques in East Java, we are Indonesia's largest Batik database!"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold"
                onClick={() => window.location.href = '/gallery'}
              >
                {isIndonesian ? 'Jelajahi Koleksi' : 'Explore Collection'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="text-black border-2 border-black hover:bg-black hover:text-white px-8 py-4 text-lg font-semibold"
                onClick={() => {
                  const videoElement = document.getElementById('intro-video');
                  if (videoElement) {
                    videoElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Play className="w-5 h-5 mr-2" />
                {isIndonesian ? 'Tonton Video' : 'Watch Video'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center text-black">
          <span className="text-sm mb-2">
            {isIndonesian ? 'Gulir ke bawah' : 'Scroll down'}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-black rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-black rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>

      {/* Image Indicators */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-black' 
                  : 'bg-black/50 hover:bg-black/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}