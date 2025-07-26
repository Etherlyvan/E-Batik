// components/museum/MuseumUI.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikDetailModal } from './BatikDetailModal';

export function MuseumUI() {
  const { 
    currentFloor, 
    selectedBatik, 
    setSelectedBatik,
    getBatiksByFloor,
    getTotalBatiks,
    totalFloors
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [showInstructions, setShowInstructions] = useState(true);
  
  const isIndonesian = currentLanguage.code === 'id';
  const currentFloorBatiks = getBatiksByFloor(currentFloor);
  const totalBatiks = getTotalBatiks();

  // Auto-hide instructions after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Hide instructions on any key press
  useEffect(() => {
    const handleKeyPress = () => {
      setShowInstructions(false);
    };

    if (showInstructions) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [showInstructions]);

  return (
    <>
      {/* Minimal Museum Info - Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-amber-500"
        >
          <div className="text-white">
            <div className="text-lg font-bold">
              🏛️ {isIndonesian ? 'Museum Batik Digital' : 'Digital Batik Museum'}
            </div>
            <div className="text-sm text-amber-300">
              {isIndonesian ? `Lantai ${currentFloor}` : `Floor ${currentFloor}`}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Floor Stats - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-amber-500"
        >
          <div className="text-white text-center">
            <div className="text-2xl font-bold text-amber-400">
              {currentFloorBatiks.length}
            </div>
            <div className="text-xs text-amber-300">
              {isIndonesian ? 'Koleksi' : 'Collections'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keyboard Instructions - Bottom Center */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-amber-500"
        >
          <div className="text-white text-center">
            <div className="text-sm font-semibold text-amber-300 mb-2">
              {isIndonesian ? 'Kontrol Keyboard' : 'Keyboard Controls'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-amber-400 font-medium">
                  {isIndonesian ? 'Gerakan:' : 'Movement:'}
                </div>
                <div>WASD</div>
              </div>
              <div>
                <div className="text-amber-400 font-medium">
                  {isIndonesian ? 'Lantai:' : 'Floor:'}
                </div>
                <div>1-{totalFloors}</div>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-300">
              {isIndonesian ? 'Tekan M untuk toggle mouse • ESC untuk keluar' : 'Press M to toggle mouse • ESC to exit'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Initial Instructions Overlay */}
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-4 border border-amber-500"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🏛️</div>
                <h2 className="text-3xl font-bold mb-4 text-amber-200">
                  {isIndonesian ? 'Selamat Datang di Museum Batik Digital' : 'Welcome to Digital Batik Museum'}
                </h2>
                <p className="text-lg mb-6 text-amber-100">
                  {isIndonesian 
                    ? 'Jelajahi koleksi batik tradisional Indonesia dengan kontrol keyboard'
                    : 'Explore traditional Indonesian batik collections with keyboard controls'
                  }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3 text-amber-300">
                      {isIndonesian ? '🎮 Kontrol Gerakan' : '🎮 Movement Controls'}
                    </h3>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-amber-600 rounded text-sm">W</kbd>
                        <span>{isIndonesian ? 'Maju' : 'Forward'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-amber-600 rounded text-sm">S</kbd>
                        <span>{isIndonesian ? 'Mundur' : 'Backward'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-amber-600 rounded text-sm">A</kbd>
                        <span>{isIndonesian ? 'Kiri' : 'Left'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-amber-600 rounded text-sm">D</kbd>
                        <span>{isIndonesian ? 'Kanan' : 'Right'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/30 rounded-lg p-4">
                    <h3 className="text-xl font-semibold mb-3 text-amber-300">
                      {isIndonesian ? '🏢 Navigasi Lantai' : '🏢 Floor Navigation'}
                    </h3>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-blue-600 rounded text-sm">1-{totalFloors}</kbd>
                        <span>{isIndonesian ? 'Pindah Lantai' : 'Go to Floor'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-blue-600 rounded text-sm">Q</kbd>
                        <span>{isIndonesian ? 'Lantai Bawah' : 'Floor Down'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-blue-600 rounded text-sm">E</kbd>
                        <span>{isIndonesian ? 'Lantai Atas' : 'Floor Up'}</span>
                      </div>
                      <div className="flex justify-between">
                        <kbd className="px-3 py-1 bg-green-600 rounded text-sm">M</kbd>
                        <span>{isIndonesian ? 'Toggle Mouse' : 'Toggle Mouse'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-800/50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-amber-200 mb-2">
                    {isIndonesian ? '💡 Tips Penting' : '💡 Important Tips'}
                  </h4>
                  <ul className="text-sm text-amber-100 space-y-1 text-left">
                    <li>• {isIndonesian ? 'Klik layar untuk mengaktifkan kontrol mouse' : 'Click screen to enable mouse control'}</li>
                    <li>• {isIndonesian ? 'Gunakan angka 1-' + totalFloors + ' untuk pindah lantai langsung' : 'Use numbers 1-' + totalFloors + ' to go directly to floors'}</li>
                    <li>• {isIndonesian ? 'Dekati frame batik dan tekan Enter untuk melihat detail' : 'Approach batik frames and press Enter to view details'}</li>
                    <li>• {isIndonesian ? 'Tekan ESC untuk keluar dari pointer lock' : 'Press ESC to exit pointer lock'}</li>
                  </ul>
                </div>

                <div className="text-amber-300 text-sm">
                  {isIndonesian 
                    ? 'Tekan tombol apa saja untuk memulai jelajah museum'
                    : 'Press any key to start exploring the museum'
                  }
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Museum Statistics - Bottom Left */}
      <div className="absolute bottom-6 left-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-amber-500"
        >
          <div className="text-white text-center">
            <div className="text-sm text-amber-300 mb-1">
              {isIndonesian ? 'Total Museum' : 'Total Museum'}
            </div>
            <div className="text-xl font-bold text-amber-400">
              {totalBatiks}
            </div>
            <div className="text-xs text-gray-300">
              {isIndonesian ? 'Koleksi Batik' : 'Batik Collections'}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Batik Detail Modal */}
      <AnimatePresence>
        {selectedBatik && (
          <BatikDetailModal
            batik={selectedBatik}
            onClose={() => setSelectedBatik(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}