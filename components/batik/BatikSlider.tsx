// components/batik/BatikSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { Batik } from '@/lib/types';

interface BatikSliderProps {
  batiks: Batik[];
}

export function BatikSlider({ batiks }: BatikSliderProps) {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Add the missing isIndonesian variable
  const isIndonesian = currentLanguage.code === 'id';

  // Auto-slide unlimited
  useEffect(() => {
    if (batiks.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % batiks.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [batiks.length, isPaused]);

  if (batiks.length === 0) {
    return null;
  }

  // Create infinite loop array
  const infiniteBatiks = [...batiks, ...batiks, ...batiks];
  const itemsToShow = 5;
  const itemWidth = 280;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + batiks.length) % batiks.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % batiks.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section 
      className="w-full py-16 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/FlowerPattern2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Background Pattern - subtle texture */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
            style={{ 
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
            }}
          >
            {currentLanguage.code === 'id' ? 'Koleksi Batik Nusantara' :
             currentLanguage.code === 'en' ? 'Indonesian Batik Collection' :
             'インドネシアバティックコレクション'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
          >
            {isIndonesian 
              ? 'Jelajahi keindahan dan kekayaan motif batik tradisional Indonesia'
              : 'Explore the beauty and richness of traditional Indonesian batik motifs'}
          </motion.p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={goToPrevious}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <span className="text-white/80 text-sm font-medium">
              {currentIndex + 1} / {batiks.length}
            </span>
          </div>

          <button
            onClick={goToNext}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
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
                <Link href={`/batik/${batik.id}`}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-96 transform hover:scale-105 transition-all duration-300 border border-white/20 group cursor-pointer">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={batik.foto[0]?.link || '/images/placeholder.jpg'}
                        alt={batik.nama}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="256px"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Code Badge */}
                      {batik.kode && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                          {batik.kode}
                        </div>
                      )}

                      {/* Hover View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 text-amber-800 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 shadow-lg">
                          <Eye className="w-4 h-4" />
                          <span>
                            {isIndonesian ? 'Lihat Detail' : 'View Details'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 
                        className="font-bold text-lg mb-2 line-clamp-2 min-h-[3rem] group-hover:text-amber-600 transition-colors duration-300"
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
                        {batik.tema.length > 2 && (
                          <span 
                            className="px-2 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: '#E5E5E5',
                              color: '#666666'
                            }}
                          >
                            +{batik.tema.length - 2}
                          </span>
                        )}
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
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {batiks.slice(0, Math.min(10, batiks.length)).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex % batiks.length
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
          {batiks.length > 10 && (
            <span className="text-white/70 text-xs self-center ml-2">
              +{batiks.length - 10}
            </span>
          )}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {isIndonesian ? 'Jelajahi Semua Koleksi' : 'Explore All Collections'}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16"
        >
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {batiks.length}
            </div>
            <div className="text-white/80 text-sm font-medium">
              {isIndonesian ? 'Total Koleksi' : 'Total Collections'}
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {new Set(batiks.map(b => b.seniman).filter(Boolean)).size}
            </div>
            <div className="text-white/80 text-sm font-medium">
              {isIndonesian ? 'Seniman Batik' : 'Batik Artists'}
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="text-3xl font-bold text-white mb-2">
              {new Set(batiks.flatMap(b => b.tema.map(t => t.id))).size}
            </div>
            <div className="text-white/80 text-sm font-medium">
              {isIndonesian ? 'Tema Unik' : 'Unique Themes'}
            </div>
          </div>
        </motion.div>

        {/* Featured Highlight */}
        {batiks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                {isIndonesian ? 'Batik Pilihan' : 'Featured Batik'}
              </h3>
              <p className="text-white/80">
                {isIndonesian 
                  ? 'Temukan cerita di balik setiap motif batik'
                  : 'Discover the story behind each batik motif'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Featured Image */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image
                  src={batiks[currentIndex]?.foto[0]?.link || '/images/placeholder.jpg'}
                  alt={batiks[currentIndex]?.nama || 'Featured Batik'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Featured Info */}
              <div className="text-white">
                <h4 className="text-xl font-bold mb-3">
                  {batiks[currentIndex]?.nama}
                </h4>
                
                {batiks[currentIndex]?.seniman && (
                  <p className="text-white/80 mb-3">
                    {isIndonesian ? 'Seniman: ' : 'Artist: '}
                    {batiks[currentIndex].seniman}
                  </p>
                )}

                {batiks[currentIndex]?.translations[0] && (
                  <p className="text-white/90 text-sm leading-relaxed line-clamp-3">
                    {batiks[currentIndex].translations[0].histori}
                  </p>
                )}

                <Link
                  href={`/batik/${batiks[currentIndex]?.id}`}
                  className="inline-flex items-center mt-4 bg-white text-amber-800 px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-300"
                >
                  {isIndonesian ? 'Pelajari Lebih Lanjut' : 'Learn More'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Link
            href="/gallery"
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 text-center border border-white/30"
          >
            {isIndonesian ? 'Lihat Galeri Lengkap' : 'View Full Gallery'}
          </Link>

          <Link
            href="/museum"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl"
          >
            {isIndonesian ? 'Kunjungi Museum 3D' : 'Visit 3D Museum'}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}