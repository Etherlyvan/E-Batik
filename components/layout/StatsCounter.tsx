// components/layout/StatsCounter.tsx
'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface Stat {
  value: number;
  label: string[];
  icon: string;
  suffix?: string;
}

export function StatsCounter() {
  const { currentLanguage } = useLanguage();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const isIndonesian = currentLanguage.code === 'id';

  const stats: Stat[] = useMemo(() => [
    { 
      value: 500, 
      label: ['Digitalized Batik', 'Batik Terdigitalisasi'],
      icon: '🎨',
      suffix: '+'
    },
    { 
      value: 30, 
      label: ['Batik Boutiques', 'Butik Batik'],
      icon: '🏪',
      suffix: '+'
    },
    { 
      value: 90, 
      label: ['Themes & Subthemes', 'Tema & Subtema'],
      icon: '🏷️',
      suffix: '+'
    },
    { 
      value: 10, 
      label: ['Team Members', 'Anggota Tim'],
      icon: '👥',
      suffix: '+'
    },
  ], []);

  // Animate counters when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCounters(stats.map(stat => Math.ceil(stat.value * easeOutQuart)));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, stats]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isIndonesian ? 'Pencapaian Kami' : 'Our Achievements'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isIndonesian 
              ? 'Angka-angka yang menunjukkan dedikasi kami dalam melestarikan warisan budaya batik Indonesia'
              : 'Numbers that show our dedication to preserving Indonesian batik cultural heritage'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Icon */}
                <div className="text-4xl mb-4">
                  {stat.icon}
                </div>
                
                {/* Counter */}
                <div className="text-4xl sm:text-5xl font-bold text-amber-600 mb-2">
                  {counters[index]}
                  {stat.suffix && (
                    <span className="text-amber-500">{stat.suffix}</span>
                  )}
                </div>
                
                {/* Label */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {stat.label[isIndonesian ? 1 : 0]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            {isIndonesian 
              ? 'Setiap angka mewakili komitmen kami untuk menjaga, mendokumentasikan, dan mempromosikan kekayaan budaya batik Indonesia untuk generasi mendatang.'
              : 'Each number represents our commitment to preserve, document, and promote the richness of Indonesian batik culture for future generations.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}