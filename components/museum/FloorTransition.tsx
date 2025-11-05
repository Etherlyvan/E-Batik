// components/museum/FloorTransition.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ArrowUp, ArrowDown, Building } from 'lucide-react';

export function FloorTransition() {
  const { 
    currentFloor, 
    totalFloors,
    getFloorStats 
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [showTransition, setShowTransition] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('up');
  const [previousFloor, setPreviousFloor] = useState(currentFloor);
  const [displayFloor, setDisplayFloor] = useState(currentFloor);

  const isIndonesian = currentLanguage.code === 'id';
  const floorStats = getFloorStats();

  // Handle floor changes dengan timeout yang pasti
  useEffect(() => {
    if (currentFloor !== previousFloor) {
      console.log(`🏢 Floor changed: ${previousFloor} → ${currentFloor}`);
      
      // Set display data
      setTransitionDirection(currentFloor > previousFloor ? 'up' : 'down');
      setDisplayFloor(currentFloor);
      setShowTransition(true);
      setPreviousFloor(currentFloor);

      // Force hide after 2 seconds - menggunakan Promise untuk memastikan
      const hideTimer = setTimeout(() => {
        console.log('🏢 Force hiding transition');
        setShowTransition(false);
      }, 2000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [currentFloor, previousFloor]);

  // Emergency cleanup - jika masih showing setelah 3 detik
  useEffect(() => {
    if (showTransition) {
      const emergencyTimer = setTimeout(() => {
        console.log('🚨 Emergency hiding transition');
        setShowTransition(false);
      }, 3000);

      return () => clearTimeout(emergencyTimer);
    }
  }, [showTransition]);

  const getFloorName = (floor: number): string => {
    const floorNames = {
      1: isIndonesian ? 'Lantai Dasar' : 'Ground Floor',
      2: isIndonesian ? 'Lantai Dua' : 'Second Floor', 
      3: isIndonesian ? 'Lantai Tiga' : 'Third Floor',
    };
    return floorNames[floor as keyof typeof floorNames] || `${isIndonesian ? 'Lantai' : 'Floor'} ${floor}`;
  };

  const getFloorDescription = (floor: number): string => {
    const descriptions = {
      1: isIndonesian ? 'Koleksi Batik Klasik' : 'Classic Batik Collection',
      2: isIndonesian ? 'Batik Modern & Kontemporer' : 'Modern & Contemporary Batik',
      3: isIndonesian ? 'Batik Nusantara' : 'Indonesian Regional Batik',
    };
    return descriptions[floor as keyof typeof descriptions] || '';
  };

  // Jangan render jika tidak showing
  if (!showTransition) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`transition-${displayFloor}`} // Key unik untuk setiap transition
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={() => setShowTransition(false)} // Click to dismiss
      >
        <motion.div
          initial={{ scale: 0.8, y: transitionDirection === 'up' ? 100 : -100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: transitionDirection === 'up' ? -100 : 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 border border-amber-500 relative"
          onClick={(e) => e.stopPropagation()} // Prevent close on modal click
        >
          {/* Close Button */}
          <button
            onClick={() => setShowTransition(false)}
            className="absolute top-2 right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-sm transition-colors"
          >
            ×
          </button>

          {/* Direction Indicator */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-600 rounded-full">
              {transitionDirection === 'up' ? (
                <ArrowUp className="w-6 h-6" />
              ) : (
                <ArrowDown className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Floor Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Building className="w-4 h-4 text-amber-300" />
              <h2 className="text-xl font-bold text-amber-200">
                {getFloorName(displayFloor)}
              </h2>
            </div>
            
            <p className="text-amber-100 text-sm mb-4">
              {getFloorDescription(displayFloor)}
            </p>

            {/* Floor Stats */}
            <div className="bg-black/30 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-amber-300">
                    {floorStats[displayFloor] || 0}
                  </div>
                  <div className="text-xs text-amber-200">
                    {isIndonesian ? 'Koleksi' : 'Collection'}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-300">
                    {displayFloor}/{totalFloors}
                  </div>
                  <div className="text-xs text-amber-200">
                    {isIndonesian ? 'Lantai' : 'Floor'}
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-hide progress */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-1 bg-amber-500 rounded-full mb-3"
            />

            <p className="text-amber-300 text-xs">
              {isIndonesian ? 'Klik untuk menutup' : 'Click to close'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}