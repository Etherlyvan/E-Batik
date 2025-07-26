// components/museum/MuseumLoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface LoadingState {
  phase: 'initializing' | 'loading-textures' | 'building-museum' | 'finalizing' | 'complete';
  progress: number;
  message: string;
  texturesLoaded: number;
  totalTextures: number;
}

interface MuseumLoadingScreenProps {
  loadingState: LoadingState;
  totalFloors: number;
  totalBatiks: number;
}

// Predefined positions to avoid Math.random() hydration issues
const PARTICLE_POSITIONS = [
  { left: 10, top: 20 },
  { left: 85, top: 15 },
  { left: 30, top: 80 },
  { left: 70, top: 60 },
  { left: 50, top: 30 },
  { left: 20, top: 70 },
  { left: 90, top: 40 },
  { left: 15, top: 90 },
  { left: 75, top: 25 },
  { left: 40, top: 85 },
  { left: 60, top: 10 },
  { left: 25, top: 50 },
  { left: 80, top: 75 },
  { left: 35, top: 35 },
  { left: 65, top: 90 },
  { left: 5, top: 55 },
  { left: 95, top: 65 },
  { left: 45, top: 45 },
  { left: 55, top: 5 },
  { left: 75, top: 95 }
];

export function MuseumLoadingScreen({ 
  loadingState, 
  totalFloors, 
  totalBatiks 
}: MuseumLoadingScreenProps) {
  const { currentLanguage } = useLanguage();
  const [dots, setDots] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [mounted, setMounted] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animated dots for loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Show tips after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTips(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const getPhaseIcon = () => {
    switch (loadingState.phase) {
      case 'initializing':
        return '🏗️';
      case 'loading-textures':
        return '🎨';
      case 'building-museum':
        return '🏛️';
      case 'finalizing':
        return '✨';
      default:
        return '🏛️';
    }
  };

  const getPhaseColor = () => {
    switch (loadingState.phase) {
      case 'initializing':
        return 'from-blue-600 to-blue-800';
      case 'loading-textures':
        return 'from-purple-600 to-purple-800';
      case 'building-museum':
        return 'from-amber-600 to-orange-800';
      case 'finalizing':
        return 'from-green-600 to-green-800';
      default:
        return 'from-amber-600 to-orange-800';
    }
  };

  const tips = isIndonesian ? [
    "💡 Gunakan WASD untuk bergerak di dalam museum",
    "🖱️ Gerakkan mouse untuk melihat sekeliling",
    "🏃 Tahan Shift untuk berlari lebih cepat",
    "🦘 Tekan Space untuk melompat",
    "🚪 Tekan E untuk berinteraksi dengan objek",
    "📱 Klik batik untuk melihat detail lengkap",
    "🏢 Museum memiliki beberapa lantai untuk dijelajahi",
    "🎮 Beralih ke mode kamera untuk tampilan yang berbeda"
  ] : [
    "💡 Use WASD to move around the museum",
    "🖱️ Move mouse to look around",
    "🏃 Hold Shift to run faster",
    "🦘 Press Space to jump",
    "🚪 Press E to interact with objects",
    "📱 Click on batik to see full details",
    "🏢 Museum has multiple floors to explore",
    "🎮 Switch to camera mode for different view"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    if (showTips) {
      const interval = setInterval(() => {
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showTips, tips.length]);

  // Don't render particles until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-8xl mb-6">🏛️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isIndonesian ? 'Museum Virtual Batik' : 'Virtual Batik Museum'}
          </h1>
          <p className="text-xl text-gray-300">
            {isIndonesian 
              ? 'Mempersiapkan museum...'
              : 'Preparing museum...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-r from-amber-500/10 to-purple-500/10 animate-pulse" />
        </div>
        
        {/* Animated particles with predefined positions */}
        <div className="absolute top-0 left-0 w-full h-full">
          {PARTICLE_POSITIONS.map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/20 rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.15, // Staggered animation
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Main Loading Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Museum Icon */}
          <motion.div
            className="text-8xl mb-6"
            animate={{ 
              rotateY: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            {getPhaseIcon()}
          </motion.div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {isIndonesian ? 'Museum Virtual Batik' : 'Virtual Batik Museum'}
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8">
            {isIndonesian 
              ? 'Menyiapkan pengalaman museum 3D yang imersif'
              : 'Preparing an immersive 3D museum experience'}
          </p>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          {/* Progress Bar Container */}
          <div className="bg-black/30 rounded-full p-2 mb-4 backdrop-blur-sm border border-white/10">
            <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className={`h-full bg-gradient-to-r ${getPhaseColor()} rounded-full relative`}
                initial={{ width: 0 }}
                animate={{ width: `${loadingState.progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center text-white mb-4">
            <span className="text-lg font-medium">
              {loadingState.message}{dots}
            </span>
            <span className="text-lg font-bold text-amber-400">
              {Math.round(loadingState.progress)}%
            </span>
          </div>

          {/* Detailed Progress Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
              <div className="text-amber-400 font-semibold mb-1">
                {isIndonesian ? 'Koleksi Batik' : 'Batik Collection'}
              </div>
              <div className="text-xl font-bold text-white">{totalBatiks}</div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
              <div className="text-blue-400 font-semibold mb-1">
                {isIndonesian ? 'Lantai Museum' : 'Museum Floors'}
              </div>
              <div className="text-xl font-bold text-white">{totalFloors}</div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-3 border border-white/10">
              <div className="text-green-400 font-semibold mb-1">
                {isIndonesian ? 'Tekstur Dimuat' : 'Textures Loaded'}
              </div>
              <div className="text-xl font-bold text-white">
                {loadingState.texturesLoaded}/{loadingState.totalTextures}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loading Tips */}
        <AnimatePresence mode="wait">
          {showTips && (
            <motion.div
              key={currentTip}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 rounded-lg p-4 backdrop-blur-sm border border-amber-500/30"
            >
              <div className="text-amber-400 font-semibold mb-2 text-sm">
                {isIndonesian ? 'Tips Museum:' : 'Museum Tips:'}
              </div>
              <p className="text-white text-sm leading-relaxed">
                {tips[currentTip]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Animation */}
        <motion.div
          className="mt-8 flex justify-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-amber-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-xs text-gray-400"
        >
          <p>
            {isIndonesian 
              ? 'Batik Sphere - Melestarikan warisan budaya Indonesia melalui teknologi'
              : 'Batik Sphere - Preserving Indonesian cultural heritage through technology'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}