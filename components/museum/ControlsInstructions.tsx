// components/museum/ControlsInstructions.tsx
'use client';

import { motion } from 'framer-motion';
import { X, Keyboard, Mouse } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ControlsInstructionsProps {
  onClose: () => void;
}

export function ControlsInstructions({ onClose }: ControlsInstructionsProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const controls = [
    {
      category: isIndonesian ? 'Gerakan' : 'Movement',
      icon: <Keyboard className="w-5 h-5" />,
      items: [
        { key: 'W', action: isIndonesian ? 'Maju' : 'Move Forward' },
        { key: 'S', action: isIndonesian ? 'Mundur' : 'Move Backward' },
        { key: 'A', action: isIndonesian ? 'Kiri' : 'Move Left' },
        { key: 'D', action: isIndonesian ? 'Kanan' : 'Move Right' },
        { key: 'Space', action: isIndonesian ? 'Lompat' : 'Jump' },
      ]
    },
    {
      category: isIndonesian ? 'Lantai' : 'Floor',
      icon: <Keyboard className="w-5 h-5" />,
      items: [
        { key: '1', action: isIndonesian ? 'Lantai 1' : 'Floor 1' },
        { key: '2', action: isIndonesian ? 'Lantai 2' : 'Floor 2' },
        { key: '3', action: isIndonesian ? 'Lantai 3' : 'Floor 3' },
        { key: 'Q', action: isIndonesian ? 'Lantai Bawah' : 'Floor Down' },
        { key: 'E', action: isIndonesian ? 'Lantai Atas' : 'Floor Up' },
      ]
    },
    {
      category: isIndonesian ? 'Tampilan' : 'View',
      icon: <Mouse className="w-5 h-5" />,
      items: [
        { key: isIndonesian ? 'Klik' : 'Click', action: isIndonesian ? 'Aktifkan kontrol mouse' : 'Enable mouse control' },
        { key: isIndonesian ? 'Gerak Mouse' : 'Mouse Move', action: isIndonesian ? 'Lihat sekeliling' : 'Look around' },
        { key: 'ESC', action: isIndonesian ? 'Lepas kontrol mouse' : 'Release mouse control' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎮</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-800">
                  {isIndonesian ? 'Kontrol Museum' : 'Museum Controls'}
                </h2>
                <p className="text-amber-600 text-sm">
                  {isIndonesian ? 'Panduan navigasi museum virtual' : 'Virtual museum navigation guide'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {controls.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2 mb-4">
                  {section.icon}
                  <h3 className="font-semibold text-gray-800">
                    {section.category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm min-w-[2rem] text-center">
                        {item.key}
                      </kbd>
                      <span className="text-sm text-gray-600 ml-3 flex-1">
                        {item.action}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <h4 className="font-semibold text-amber-800 mb-2">
              {isIndonesian ? '💡 Tips' : '💡 Tips'}
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• {isIndonesian ? 'Klik di layar untuk mengaktifkan kontrol mouse' : 'Click on screen to enable mouse control'}</li>
              <li>• {isIndonesian ? 'Gunakan tombol 1-3 untuk pindah lantai dengan cepat' : 'Use keys 1-3 to quickly switch floors'}</li>
              <li>• {isIndonesian ? 'Klik pada frame batik untuk melihat detail' : 'Click on batik frames to view details'}</li>
              <li>• {isIndonesian ? 'Tekan ESC untuk melepas kontrol mouse' : 'Press ESC to release mouse control'}</li>
            </ul>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isIndonesian ? 'Mulai Jelajahi Museum' : 'Start Exploring Museum'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}