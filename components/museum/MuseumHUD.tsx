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
      {/* Floor Indicator dengan desain batik */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-800 to-orange-800 text-white px-8 py-4 rounded-2xl border-2 border-yellow-400 shadow-2xl">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-300">
              {currentFloor + 1}
            </div>
            <div className="text-sm text-yellow-100">
              {isIndonesian ? 'Lantai' : 'Floor'}
            </div>
          </div>
          <div className="w-px h-10 bg-yellow-400"></div>
          <div className="text-center">
            <div className="text-xl text-yellow-100">
              / {totalFloors}
            </div>
            <div className="text-sm text-yellow-200">
              {isIndonesian ? 'Total' : 'Total'}
            </div>
          </div>
          <div className="w-px h-10 bg-yellow-400"></div>
          <div className="text-center">
            <div className="text-lg text-yellow-200">
              🎨
            </div>
            <div className="text-xs text-yellow-200">
              Batik
            </div>
          </div>
        </div>
      </div>

      {/* Mode Indicator dengan tema Indonesia */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-full text-sm border border-yellow-400">
        {viewMode === 'fps' 
          ? (isIndonesian ? '🚶 Mode Jelajah' : '🚶 Explore Mode')
          : (isIndonesian ? '🎥 Mode Kamera' : '🎥 Camera Mode')
        }
      </div>

      {/* Pointer Lock Status */}
      {viewMode === 'fps' && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className={`px-6 py-3 rounded-xl text-sm font-medium border-2 ${
            isPointerLocked 
              ? 'bg-green-600 border-green-400 text-white' 
              : 'bg-yellow-600 border-yellow-400 text-white animate-pulse'
          }`}>
            {isPointerLocked 
              ? (isIndonesian ? '🔒 Siap Menjelajah' : '🔒 Ready to Explore')
              : (isIndonesian ? '👆 Klik layar untuk mulai menjelajah' : '👆 Click screen to start exploring')
            }
          </div>
        </div>
      )}

      {/* Museum Info */}
      <div className="absolute bottom-4 right-4 w-40 h-40 bg-gradient-to-br from-amber-800 to-orange-900 rounded-xl border-2 border-yellow-400 p-3 text-white shadow-2xl">
        <div className="text-xs text-yellow-300 mb-2 text-center font-semibold">
          {isIndonesian ? 'Peta Museum' : 'Museum Map'}
        </div>
        <div className="relative w-full h-24 bg-amber-900 rounded border border-yellow-600">
          {/* Floor representation */}
          <div className="absolute inset-1 border border-yellow-500 rounded">
            {/* Player position indicator */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            
            {/* Batik indicators */}
            {[
              [20, 20], [80, 20], [20, 80], [80, 80]
            ].map((pos, index) => (
              <div
                key={index}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                style={{ left: `${pos[0]}%`, top: `${pos[1]}%` }}
              />
            ))}
          </div>
        </div>
        <div className="text-xs text-center mt-2 text-yellow-200">
          Lantai {currentFloor + 1} dari {totalFloors}
        </div>
      </div>

      {/* Indonesian Cultural Elements */}
      <div className="absolute top-4 right-4 text-6xl animate-pulse">
        🇮🇩
      </div>

      {/* Batik Pattern Indicator */}
      <div className="absolute bottom-20 left-4 flex flex-col space-y-2">
        {['🌸', '🦋', '🌿', '🏛️'].map((icon, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full border-2 border-yellow-400 flex items-center justify-center text-xl ${
              index === currentFloor ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-800'
            }`}
          >
            {icon}
          </div>
        ))}
      </div>
    </>
  );
}