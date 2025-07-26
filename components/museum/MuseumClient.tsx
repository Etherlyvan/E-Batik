// components/museum/MuseumClient.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Museum3D } from './Museum3D';
import { MuseumControls } from './MuseumControls';
import { MuseumInfo } from './MuseumInfo';
import { FirstPersonPlayer } from './FirstPersonPlayer';
import { MuseumHUD } from './MuseumHUD';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface MuseumClientProps {
  batiks: Batik[];
}

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'back', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['ShiftLeft', 'ShiftRight'] },
];

export function MuseumClient({ batiks }: MuseumClientProps) {
  const { currentLanguage } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBatik, setSelectedBatik] = useState<Batik | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [viewMode, setViewMode] = useState<'fps' | 'orbit'>('fps');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);

  const isIndonesian = currentLanguage.code === 'id';
  const batiksPerFloor = 16;
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);

  // Pointer lock handling (like reference)
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

  // Auto-hide instructions
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleFloorChange = (newFloor: number) => {
    setCurrentFloor(newFloor);
    setSelectedBatik(null);
  };

  const requestPointerLock = () => {
    if (viewMode === 'fps' && canvasRef.current && !isPointerLocked) {
      canvasRef.current.requestPointerLock();
    }
  };

  const toggleViewMode = () => {
    const newMode = viewMode === 'fps' ? 'orbit' : 'fps';
    setViewMode(newMode);
    
    if (newMode === 'orbit' && document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          ref={canvasRef}
          onClick={requestPointerLock}
          style={{ 
            background: 'linear-gradient(to bottom, #2a2a2a, #1a1a1a)',
            cursor: viewMode === 'fps' ? 'none' : 'default'
          }}
          camera={{ 
            position: viewMode === 'fps' ? [0, 1.6, 0] : [0, 15, 15],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          shadows={false}
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
          }}
        >
          <Physics gravity={[0, -30, 0]} debug={false}>
            <Museum3D 
              batiks={batiks} 
              onBatikSelect={setSelectedBatik}
              selectedBatik={selectedBatik}
              viewMode={viewMode}
              currentFloor={currentFloor}
            />
            
            <FirstPersonPlayer 
              viewMode={viewMode}
              isPointerLocked={isPointerLocked}
              onFloorChange={handleFloorChange}
              currentFloor={currentFloor}
            />
          </Physics>
        </Canvas>
      </KeyboardControls>

      {/* HUD */}
      <MuseumHUD 
        currentFloor={currentFloor}
        totalFloors={totalFloors}
        viewMode={viewMode}
        isPointerLocked={isPointerLocked}
      />

      {/* Controls */}
      <MuseumControls 
        onToggleInfo={() => setShowInstructions(!showInstructions)}
        onToggleViewMode={toggleViewMode}
        viewMode={viewMode}
        isPointerLocked={isPointerLocked}
      />

      {/* Instructions */}
      {showInstructions && (
        <div className="absolute top-4 left-4 bg-black/90 text-white p-6 rounded-xl max-w-md backdrop-blur-sm border border-amber-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-amber-300 text-lg">
              🎮 {isIndonesian ? 'Kontrol Museum' : 'Museum Controls'}
            </h3>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div><kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs mr-2">WASD</kbd>Move around</div>
            <div><kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs mr-2">Mouse</kbd>Look around</div>
            <div><kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs mr-2">Shift</kbd>Run</div>
            <div><kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs mr-2">E/Q</kbd>Change floors</div>
            <div><kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs mr-2">R</kbd>Reset position</div>
          </div>
        </div>
      )}

      {/* Crosshair */}
      {viewMode === 'fps' && isPointerLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-6 h-6 border-2 border-white/60 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
          </div>
        </div>
      )}

      {/* Batik Info */}
      {selectedBatik && (
        <MuseumInfo 
          batik={selectedBatik} 
          onClose={() => setSelectedBatik(null)} 
        />
      )}
    </div>
  );
}