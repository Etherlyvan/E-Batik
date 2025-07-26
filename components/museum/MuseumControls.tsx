// components/museum/MuseumControls.tsx
'use client';

import { RotateCcw, Info, Home, Maximize, Camera, User } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface MuseumControlsProps {
  onToggleInfo: () => void;
  onToggleViewMode: () => void;
  viewMode: 'fps' | 'orbit';
  isPointerLocked: boolean;
}

export function MuseumControls({ 
  onToggleInfo, 
  onToggleViewMode, 
  viewMode, 
  isPointerLocked 
}: MuseumControlsProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2">
      <button
        onClick={onToggleViewMode}
        className={`p-3 rounded-lg transition-colors ${
          viewMode === 'fps' 
            ? 'bg-amber-600 hover:bg-amber-700 text-white' 
            : 'bg-black/70 hover:bg-black/90 text-white'
        }`}
        title={isIndonesian 
          ? (viewMode === 'fps' ? 'Mode Kamera' : 'Mode Berjalan')
          : (viewMode === 'fps' ? 'Camera Mode' : 'Walking Mode')
        }
      >
        {viewMode === 'fps' ? <User className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
      </button>
      
      <button
        onClick={onToggleInfo}
        className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-lg transition-colors"
        title={isIndonesian ? 'Toggle Info' : 'Toggle Info'}
      >
        <Info className="w-5 h-5" />
      </button>
      
      <button
        onClick={() => document.documentElement.requestFullscreen()}
        className="bg-black/70 hover:bg-black/90 text-white p-3 rounded-lg transition-colors"
        title={isIndonesian ? 'Layar Penuh' : 'Fullscreen'}
      >
        <Maximize className="w-5 h-5" />
      </button>

      {/* Pointer Lock Status */}
      {viewMode === 'fps' && (
        <div className={`p-2 rounded-lg text-xs ${
          isPointerLocked 
            ? 'bg-green-600 text-white' 
            : 'bg-yellow-600 text-white'
        }`}>
          {isPointerLocked 
            ? (isIndonesian ? 'Terkunci' : 'Locked')
            : (isIndonesian ? 'Klik layar' : 'Click screen')
          }
        </div>
      )}
    </div>
  );
}