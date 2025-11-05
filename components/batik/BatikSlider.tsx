// components/batik/BatikSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikSliderProps {
  batiks: Batik[];
}

export function BatikSlider({ batiks }: BatikSliderProps) {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);



  // Auto-slide unlimited
  useEffect(() => {
    if (batiks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % batiks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [batiks.length]);

  if (batiks.length === 0) {
    return null;
  }

  // Create infinite loop array
  const infiniteBatiks = [...batiks, ...batiks, ...batiks];
  const itemsToShow = 5;
  const itemWidth = 280;

  return (
    <section className="w-full py-16 relative overflow-hidden" style={{ backgroundColor: '#A0522D' }}>
      {/* Background Pattern - subtle texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
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

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
            style={{
              color: '#F5E6D3',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px'
            }}
          >
            {currentLanguage.code === 'id' ? 'Koleksi Batik Nusantara' :
             currentLanguage.code === 'en' ? 'Indonesian Batik Collection' :
             'インドネシアバティックコレクション'}
          </motion.h2>
        </div>

        {/* Infinite Sliding Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: -((currentIndex % batiks.length) * itemWidth)
            }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            style={{
              width: `${infiniteBatiks.length * itemWidth}px`
            }}
          >
            {infiniteBatiks.map((batik, index) => (
              <motion.div
                key={`${batik.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: `${itemWidth - 24}px` }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6,
                  delay: (index % itemsToShow) * 0.1
                }}
              >
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-96 transform hover:scale-105 transition-transform duration-300 border border-white/20">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={batik.foto[0]?.link || '/images/placeholder.jpg'}
                      alt={batik.nama}
                      fill
                      className="object-cover"
                      sizes="256px"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Code Badge */}
                    {batik.kode && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                        {batik.kode}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h3 
                      className="font-bold text-lg mb-2 line-clamp-2 min-h-[3rem]"
                      style={{ 
                        color: '#8B4513',
                        fontFamily: 'Georgia, serif'
                      }}
                    >
                      {batik.nama}
                    </h3>

                    {/* Artist */}
                    {batik.seniman && (
                      <p 
                        className="mb-2 text-sm line-clamp-1"
                        style={{ 
                          color: '#A0522D',
                          fontFamily: 'Georgia, serif'
                        }}
                      >
                        {batik.seniman}
                      </p>
                    )}

                    {/* Themes */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {batik.tema.slice(0, 2).map((tema) => {
                        const translation = tema.translations.find(
                          t => t.languageId === currentLanguage.id
                        ) || tema.translations[0];
                        
                        return (
                          <span
                            key={tema.id}
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: '#F5E6D3',
                              color: '#8B4513'
                            }}
                          >
                            {translation?.nama || tema.nama}
                          </span>
                        );
                      })}
                    </div>

                    {/* Year */}
                    <div 
                      className="text-center text-sm font-medium"
                      style={{ color: '#A0522D' }}
                    >
                      {batik.tahun}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Rest of the component remains the same... */}
      </div>
    </section>
  );
}