// components/museum/MuseumClient.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { Museum3D } from './Museum3D';
import { MuseumControls } from './MuseumControls';
import { MuseumInfo } from './MuseumInfo';
import { FirstPersonPlayer } from './FirstPersonPlayer';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface MuseumClientProps {
  batiks: Batik[];
}

export const Controls = {
  forward: 'forward',
  back: 'back',
  left: 'left',
  right: 'right',
  jump: 'jump',
  run: 'run',
};

const keyboardMap = [
  { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
  { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
  { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  { name: Controls.jump, keys: ['Space'] },
  { name: Controls.run, keys: ['Shift'] },
];

export function MuseumClient({ batiks }: MuseumClientProps) {
  const { currentLanguage } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBatik, setSelectedBatik] = useState<Batik | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showInstructions, setShowInstructions] = useState(true);
  const [viewMode, setViewMode] = useState<'fps' | 'orbit'>('fps');
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Handle pointer lock dengan perbaikan
  useEffect(() => {
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement !== null);
    };

    const handlePointerLockError = (event: Event) => {
      console.warn('Pointer lock failed:', event);
      setIsPointerLocked(false);
    };

    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
    };
  }, []);

  const requestPointerLock = () => {
    if (viewMode === 'fps' && canvasRef.current) {
      // Pastikan canvas sudah dimount dan visible
      if (canvasRef.current.offsetParent !== null) {
        canvasRef.current.requestPointerLock();
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold mb-2">
            {isIndonesian ? 'Memuat Museum 3D...' : 'Loading 3D Museum...'}
          </h2>
          <p className="text-amber-200">
            {isIndonesian ? 'Menyiapkan pengalaman imersif' : 'Preparing immersive experience'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          ref={canvasRef}
          onClick={requestPointerLock}
          style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e, #0f3460)' }}
          camera={{ 
            position: viewMode === 'fps' ? [0, 1.6, 5] : [0, 5, 10],
            fov: 75 
          }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, 10, -10]} intensity={0.5} />
          <spotLight
            position={[0, 15, 0]}
            angle={0.5}
            penumbra={1}
            intensity={1.5}
            castShadow
          />
          
          <Environment preset="warehouse" />
          
          <Museum3D 
            batiks={batiks} 
            onBatikSelect={setSelectedBatik}
            selectedBatik={selectedBatik}
            viewMode={viewMode}
          />
          
          <FirstPersonPlayer 
            viewMode={viewMode}
            isPointerLocked={isPointerLocked}
          />
        </Canvas>
      </KeyboardControls>

      {/* Rest of your UI components... */}
      <MuseumControls 
        onToggleInfo={() => setShowInstructions(!showInstructions)}
        onToggleViewMode={() => setViewMode(viewMode === 'fps' ? 'orbit' : 'fps')}
        viewMode={viewMode}
        isPointerLocked={isPointerLocked}
      />

      {/* Instructions */}
      {showInstructions && (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-6 rounded-lg max-w-md backdrop-blur-sm">
          <h3 className="font-bold mb-3 text-amber-300">
            {isIndonesian ? 'Kontrol Museum 3D:' : '3D Museum Controls:'}
          </h3>
          
          {viewMode === 'fps' ? (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div><strong className="text-amber-200">WASD:</strong><br />{isIndonesian ? 'Bergerak' : 'Move'}</div>
                <div><strong className="text-amber-200">Mouse:</strong><br />{isIndonesian ? 'Lihat sekeliling' : 'Look around'}</div>
                <div><strong className="text-amber-200">Shift:</strong><br />{isIndonesian ? 'Berlari' : 'Run'}</div>
                <div><strong className="text-amber-200">Space:</strong><br />{isIndonesian ? 'Lompat' : 'Jump'}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-600">
                <p className="text-xs text-gray-300">
                  {isIndonesian 
                    ? 'Klik canvas untuk mengunci mouse. Tekan ESC untuk keluar.'
                    : 'Click canvas to lock mouse. Press ESC to exit.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div>• {isIndonesian ? 'Drag untuk memutar kamera' : 'Drag to rotate camera'}</div>
              <div>• {isIndonesian ? 'Scroll untuk zoom' : 'Scroll to zoom'}</div>
              <div>• {isIndonesian ? 'Klik batik untuk detail' : 'Click batik for details'}</div>
            </div>
          )}
          
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-4 text-xs text-amber-300 hover:text-amber-100 bg-amber-800/30 px-3 py-1 rounded"
          >
            {isIndonesian ? 'Tutup' : 'Close'}
          </button>
        </div>
      )}

      {/* View Mode Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
        {viewMode === 'fps' 
          ? (isIndonesian ? '👤 Mode Berjalan' : '👤 Walking Mode')
          : (isIndonesian ? '🎥 Mode Kamera' : '🎥 Camera Mode')
        }
      </div>

      {/* Crosshair for FPS mode */}
      {viewMode === 'fps' && isPointerLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-4 h-4 border border-white/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Batik Info Panel */}
      {selectedBatik && (
        <MuseumInfo 
          batik={selectedBatik} 
          onClose={() => setSelectedBatik(null)} 
        />
      )}
    </div>
  );
}