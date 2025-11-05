// components/layout/InfoSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface InfoSlide {
  title: string;
  description: string;
  icon: string;
}

export function InfoSection() {
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isIndonesian = currentLanguage.code === 'id';

  const slides: InfoSlide[] = [
    {
      title: isIndonesian ? 'Bentuk: Bunga Teratai' : 'Form: Lotus Flower',
      description: isIndonesian
        ? 'Melambangkan regenerasi dan transformasi budaya dalam konteks digital. Teratai berfungsi sebagai medium pelestarian dan pengembangan, memungkinkan batik berevolusi tanpa kehilangan esensi tradisionalnya.'
        : 'Symbolizes cultural regeneration and transformation in a digital context. The lotus serves as a medium for preservation and development, allowing batik to evolve without losing its traditional essence.',
      icon: '🪷'
    },
    {
      title: isIndonesian ? 'Elemen Topeng: Identitas dan Kearifan Lokal' : 'Mask Element: Identity and Local Wisdom',
      description: isIndonesian
        ? 'Mencerminkan identitas budaya Nusantara dengan nilai filosofis. Menegaskan bahwa digitalisasi motif batik bukan sekadar dokumentasi, tetapi juga upaya pelestarian budaya.'
        : 'Reflects the cultural identity of the Nusantara with philosophical values. Emphasizes that digitizing batik motifs is not just documentation, but also an effort to preserve culture.',
      icon: '🎭'
    },
    {
      title: isIndonesian ? 'Makna Warna: Kedalaman dan Inovasi' : 'Color Meaning: Depth and Innovation',
      description: isIndonesian
        ? 'Warna biru tua melambangkan kedalaman dan kekayaan batik. Warna biru muda merepresentasikan inovasi digital, memungkinkan penyebaran global.'
        : 'Dark blue symbolizes the depth and richness of batik. Light blue represents digital innovation, enabling global dissemination.',
      icon: '🎨'
    },
    {
      title: isIndonesian ? 'Struktur Motif' : 'Motif Structure',
      description: isIndonesian
        ? 'Mencerminkan potensi eksplorasi dari berbagai pendekatan multidisipliner untuk mendukung penelitian dan pengembangan keilmuan.'
        : 'Reflects the potential exploration from various multidisciplinary approaches to support research and scientific development.',
      icon: '🔬'
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-20 h-20">
            <Image
              src="/images/LogoApp.png"
              alt="Batik Sphere Logo"
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-amber-100 text-center"
        >
          {isIndonesian ? 'Filosofi Batik Sphere' : 'Batik Sphere Philosophy'}
        </motion.h2>

        {/* Content */}
        <div className="text-center">
          {/* Slides */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-4"
              >
                <div className="text-5xl mb-6">
                  {slides[currentSlide].icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-amber-200">
                  {slides[currentSlide].title}
                </h3>
                
                <p className="text-base sm:text-lg text-amber-100 leading-relaxed max-w-3xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-amber-300 scale-125' 
                    : 'bg-amber-500/50 hover:bg-amber-400/70'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}