// components/museum/LoadingScreen.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 mx-auto bg-amber-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-2xl font-bold">🏛️</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {isIndonesian ? 'Museum Batik Digital' : 'Digital Batik Museum'}
          </h1>
          <p className="text-amber-600">
            {isIndonesian ? 'Memuat koleksi batik...' : 'Loading batik collection...'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <div className="bg-amber-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 text-sm text-amber-700">
            {Math.round(progress)}%
          </div>
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-amber-600 space-y-1"
        >
          <div className={progress > 20 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Memuat struktur museum' : 'Loading museum structure'}
          </div>
          <div className={progress > 50 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Menyiapkan koleksi batik' : 'Preparing batik collection'}
          </div>
          <div className={progress > 80 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Mengatur pencahayaan' : 'Setting up lighting'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}