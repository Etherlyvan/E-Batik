// components/museum/MuseumHUD.tsx
'use client';

import { useLanguage } from '@/lib/contexts/LanguageContext';

interface MuseumHUDProps {
  currentFloor: number;
  totalFloors: number;
  viewMode: 'fps' | 'orbit';
  isPointerLocked: boolean;
}

export function MuseumHUD({ 
  currentFloor, 
  totalFloors, 
  viewMode, 
  isPointerLocked 
}: MuseumHUDProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  return (
    <>
      {/* Floor Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full border border-amber-500/50">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-300">
              {currentFloor + 1}
            </div>
            <div className="text-xs text-gray-300">
              {isIndonesian ? 'Lantai' : 'Floor'}
            </div>
          </div>
          <div className="w-px h-8 bg-gray-600"></div>
          <div className="text-center">
            <div className="text-lg text-white">
              / {totalFloors}
            </div>
            <div className="text-xs text-gray-300">
              {isIndonesian ? 'Total' : 'Total'}
            </div>
          </div>
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
        {viewMode === 'fps' 
          ? (isIndonesian ? '👤 Mode Berjalan' : '👤 Walking Mode')
          : (isIndonesian ? '🎥 Mode Kamera' : '🎥 Camera Mode')
        }
      </div>

      {/* Pointer Lock Status for FPS */}
      {viewMode === 'fps' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isPointerLocked 
              ? 'bg-green-600/80 text-white' 
              : 'bg-yellow-600/80 text-white animate-pulse'
          }`}>
            {isPointerLocked 
              ? (isIndonesian ? '🔒 Mouse Terkunci' : '🔒 Mouse Locked')
              : (isIndonesian ? '👆 Klik layar untuk mengunci mouse' : '👆 Click screen to lock mouse')
            }
          </div>
        </div>
      )}

      {/* Mini Map */}
      <div className="absolute bottom-4 right-4 w-32 h-32 bg-black/80 rounded-lg border border-amber-500/50 p-2">
        <div className="text-xs text-amber-300 mb-1 text-center">
          {isIndonesian ? 'Peta Mini' : 'Mini Map'}
        </div>
        <div className="relative w-full h-24 bg-gray-800 rounded">
          {/* Floor representation */}
          <div className="absolute inset-1 border border-gray-600 rounded">
            {/* Player position indicator */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}