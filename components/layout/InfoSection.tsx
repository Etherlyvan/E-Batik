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

  const slides: InfoSlide[] = [
    {
      title: currentLanguage.code === 'id' ? 'Bentuk: Bunga Teratai' :
             currentLanguage.code === 'en' ? 'Form: Lotus Flower' :
             '形: 蓮の花',
      description: currentLanguage.code === 'id'
        ? 'Melambangkan regenerasi dan transformasi budaya dalam konteks digital. Teratai berfungsi sebagai medium pelestarian dan pengembangan, memungkinkan batik berevolusi tanpa kehilangan esensi tradisionalnya.'
        : currentLanguage.code === 'en'
        ? 'Symbolizes cultural regeneration and transformation in a digital context. The lotus serves as a medium for preservation and development, allowing batik to evolve without losing its traditional essence.'
        : 'デジタル文脈での文化的再生と変革を象徴します。蓮は保存と発展の媒体として機能し、バティックが伝統的な本質を失うことなく進化することを可能にします。',
      icon: '🪷'
    },
    {
      title: currentLanguage.code === 'id' ? 'Elemen Topeng: Identitas dan Kearifan Lokal' :
             currentLanguage.code === 'en' ? 'Mask Element: Identity and Local Wisdom' :
             '仮面要素: アイデンティティと地域の知恵',
      description: currentLanguage.code === 'id'
        ? 'Mencerminkan identitas budaya Nusantara dengan nilai filosofis. Menegaskan bahwa digitalisasi motif batik bukan sekadar dokumentasi, tetapi juga upaya pelestarian budaya.'
        : currentLanguage.code === 'en'
        ? 'Reflects the cultural identity of the Nusantara with philosophical values. Emphasizes that digitizing batik motifs is not just documentation, but also an effort to preserve culture.'
        : '哲学的価値を持つヌサンタラの文化的アイデンティティを反映します。バティックモチーフのデジタル化は単なる文書化ではなく、文化保存の努力でもあることを強調しています。',
      icon: '🎭'
    },
    {
      title: currentLanguage.code === 'id' ? 'Makna Warna: Kedalaman dan Inovasi' :
             currentLanguage.code === 'en' ? 'Color Meaning: Depth and Innovation' :
             '色の意味: 深さとイノベーション',
      description: currentLanguage.code === 'id'
        ? 'Warna biru tua melambangkan kedalaman dan kekayaan batik. Warna biru muda merepresentasikan inovasi digital, memungkinkan penyebaran global.'
        : currentLanguage.code === 'en'
        ? 'Dark blue symbolizes the depth and richness of batik. Light blue represents digital innovation, enabling global dissemination.'
        : '濃い青はバティックの深さと豊かさを象徴します。薄い青はデジタルイノベーションを表し、世界的な普及を可能にします。',
      icon: '🎨'
    },
    {
      title: currentLanguage.code === 'id' ? 'Struktur Motif' :
             currentLanguage.code === 'en' ? 'Motif Structure' :
             'モチーフ構造',
      description: currentLanguage.code === 'id'
        ? 'Mencerminkan potensi eksplorasi dari berbagai pendekatan multidisipliner untuk mendukung penelitian dan pengembangan keilmuan.'
        : currentLanguage.code === 'en'
        ? 'Reflects the potential exploration from various multidisciplinary approaches to support research and scientific development.'
        : '研究と科学的発展を支援するための様々な学際的アプローチからの探求の可能性を反映しています。',
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
          {currentLanguage.code === 'id' ? 'Filosofi Batik Sphere' :
           currentLanguage.code === 'en' ? 'Batik Sphere Philosophy' :
           'バティックスフィア哲学'}
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