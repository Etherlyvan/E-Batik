// components/museum/MuseumClient.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, KeyboardControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { Museum3D } from './Museum3D';
import { MuseumControls } from './MuseumControls';
import { MuseumInfo } from './MuseumInfo';
import { FirstPersonPlayer } from './FirstPersonPlayer';
import { MuseumHUD } from './MuseumHUD';
import { MuseumLoadingScreen } from './MuseumLoadingScreen';
import { TextureManager } from '@/lib/utils/TextureManager';
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
  { name: Controls.run, keys: ['ShiftLeft', 'ShiftRight'] },
];

interface LoadingState {
  phase: 'initializing' | 'loading-textures' | 'building-museum' | 'finalizing' | 'complete';
  progress: number;
  message: string;
  texturesLoaded: number;
  totalTextures: number;
}

export function MuseumClient({ batiks }: MuseumClientProps) {
  const { currentLanguage } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedBatik, setSelectedBatik] = useState<Batik | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [viewMode, setViewMode] = useState<'fps' | 'orbit'>('fps');
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [currentFloor, setCurrentFloor] = useState(0);

  const [loadingState, setLoadingState] = useState<LoadingState>({
    phase: 'initializing',
    progress: 0,
    message: 'Initializing museum...',
    texturesLoaded: 0,
    totalTextures: 0,
  });

  const isIndonesian = currentLanguage.code === 'id';
  const batiksPerFloor = 8; // 8 batiks per floor for better performance
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
  const isLoading = loadingState.phase !== 'complete';

  // Enhanced loading sequence
  useEffect(() => {
    let isMounted = true;
    const textureManager = TextureManager.getInstance();

    const loadMuseum = async () => {
      try {
        // Phase 1: Initializing
        if (isMounted) {
          setLoadingState({
            phase: 'initializing',
            progress: 10,
            message: isIndonesian ? 'Mempersiapkan museum virtual...' : 'Preparing virtual museum...',
            texturesLoaded: 0,
            totalTextures: batiks.length,
          });
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Phase 2: Loading textures
        if (isMounted) {
          setLoadingState(prev => ({
            ...prev,
            phase: 'loading-textures',
            progress: 20,
            message: isIndonesian ? 'Memuat koleksi batik...' : 'Loading batik collection...',
          }));
        }

        // Preload textures in batches to prevent overwhelming
        const batchSize = 3; // Smaller batch size for better performance
        let texturesLoaded = 0;
        
        for (let i = 0; i < batiks.length && isMounted; i += batchSize) {
          const batch = batiks.slice(i, i + batchSize);
          const promises = batch.map(batik => {
            const imageUrl = batik.foto[0]?.link;
            return imageUrl ? textureManager.loadTexture(imageUrl) : Promise.resolve(null);
          });

          await Promise.allSettled(promises);
          texturesLoaded += batch.length;

          if (isMounted) {
            const textureProgress = (texturesLoaded / batiks.length) * 60; // 60% for textures
            setLoadingState(prev => ({
              ...prev,
              progress: 20 + textureProgress,
              texturesLoaded,
              message: isIndonesian 
                ? `Memuat koleksi: ${texturesLoaded}/${batiks.length}`
                : `Loading collection: ${texturesLoaded}/${batiks.length}`,
            }));
          }

          // Small delay between batches to prevent blocking
          await new Promise(resolve => setTimeout(resolve, 150));
        }

        // Phase 3: Building museum
        if (isMounted) {
          setLoadingState(prev => ({
            ...prev,
            phase: 'building-museum',
            progress: 85,
            message: isIndonesian ? 'Membangun ruang pameran...' : 'Building exhibition space...',
          }));
        }

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Phase 4: Finalizing
        if (isMounted) {
          setLoadingState(prev => ({
            ...prev,
            phase: 'finalizing',
            progress: 95,
            message: isIndonesian ? 'Menyelesaikan persiapan...' : 'Finalizing setup...',
          }));
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        // Phase 5: Complete
        if (isMounted) {
          setLoadingState(prev => ({
            ...prev,
            phase: 'complete',
            progress: 100,
            message: isIndonesian ? 'Museum siap dikunjungi!' : 'Museum ready to explore!',
          }));
        }

      } catch (error) {
        console.error('Error loading museum:', error);
        if (isMounted) {
          setLoadingState(prev => ({
            ...prev,
            phase: 'complete',
            progress: 100,
            message: isIndonesian ? 'Museum dimuat dengan peringatan' : 'Museum loaded with warnings',
          }));
        }
      }
    };

    loadMuseum();

    return () => {
      isMounted = false;
    };
  }, [batiks, isIndonesian]);

  // Auto-hide instructions after museum loads
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowInstructions(false);
      }, 10000); // Show for 10 seconds after loading
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Enhanced pointer lock handling
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

  // Cleanup textures on unmount
  useEffect(() => {
    return () => {
      const textureManager = TextureManager.getInstance();
      textureManager.disposeAll();
    };
  }, []);

  // Handle floor changes
  const handleFloorChange = (newFloor: number) => {
    setCurrentFloor(newFloor);
    // Clear selected batik when changing floors
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
    
    // Release pointer lock when switching to orbit mode
    if (newMode === 'orbit' && document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  // Show loading screen while museum is loading
  if (isLoading) {
    return (
      <MuseumLoadingScreen 
        loadingState={loadingState}
        totalFloors={totalFloors}
        totalBatiks={batiks.length}
      />
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          ref={canvasRef}
          onClick={requestPointerLock}
          style={{ 
            background: 'linear-gradient(to bottom, #0f172a, #1e293b, #334155)',
            cursor: viewMode === 'fps' ? 'none' : 'default'
          }}
          camera={{ 
            position: viewMode === 'fps' ? [0, 1.6, 0] : [0, 15, 15],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          shadows
          gl={{ 
            antialias: true,
            alpha: false,
            powerPreference: "high-performance"
          }}
        >
          <Physics gravity={[0, -30, 0]} debug={false}>
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.4} color="#f8fafc" />
            <directionalLight
              position={[20, 30, 10]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={100}
              shadow-camera-left={-20}
              shadow-camera-right={20}
              shadow-camera-top={20}
              shadow-camera-bottom={-20}
            />
            
            <Environment preset="warehouse" />
            
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

      {/* Enhanced HUD */}
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

      {/* Floor Navigation Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-6 py-3 rounded-xl border border-amber-500/30 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-sm mb-1 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-1">E</kbd>
              <span className="text-xs">{isIndonesian ? 'Naik' : 'Up'}</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-1">Q</kbd>
              <span className="text-xs">{isIndonesian ? 'Turun' : 'Down'}</span>
            </div>
            <div className="flex items-center">
              <kbd className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-bold mr-1">R</kbd>
              <span className="text-xs">{isIndonesian ? 'Reset' : 'Reset'}</span>
            </div>
          </div>
          <div className="text-xs text-amber-300">
            {isIndonesian ? '🏢 Sistem Lift Virtual' : '🏢 Virtual Elevator System'}
          </div>
        </div>
      </div>

      {/* Enhanced Instructions Panel */}
      {showInstructions && (
        <div className="absolute top-4 left-4 bg-black/95 text-white p-6 rounded-xl max-w-md backdrop-blur-sm border border-amber-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-amber-300 text-lg flex items-center">
              <span className="mr-2">🎮</span>
              {isIndonesian ? 'Kontrol Museum 3D' : '3D Museum Controls'}
            </h3>
            <button
              onClick={() => setShowInstructions(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          {viewMode === 'fps' ? (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center mb-1">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">W</kbd>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Maju' : 'Forward'}</span>
                </div>
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center mb-1">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">S</kbd>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Mundur' : 'Backward'}</span>
                </div>
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center mb-1">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">A</kbd>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Kiri' : 'Left'}</span>
                </div>
                <div className="bg-gradient-to-r from-amber-900/40 to-orange-900/40 p-3 rounded-lg border border-amber-500/20">
                  <div className="flex items-center mb-1">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">D</kbd>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Kanan' : 'Right'}</span>
                </div>
                <div className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 p-3 rounded-lg border border-blue-500/20">
                  <div className="flex items-center mb-1">
                    <span className="text-blue-300 text-xs font-bold mr-2">🖱️ Mouse</span>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Lihat sekeliling' : 'Look around'}</span>
                </div>
                <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 p-3 rounded-lg border border-green-500/20">
                  <div className="flex items-center mb-1">
                    <kbd className="px-2 py-1 bg-green-600 text-black rounded text-xs font-bold mr-2">Shift</kbd>
                  </div>
                  <span className="text-gray-300 text-xs">{isIndonesian ? 'Berlari' : 'Sprint'}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-600 pt-3">
                <h4 className="text-amber-300 font-semibold mb-2 text-sm">
                  {isIndonesian ? 'Navigasi Lantai:' : 'Floor Navigation:'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">E</kbd>
                    <span className="text-gray-300 text-xs">{isIndonesian ? 'Naik lantai' : 'Go up'}</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-2 py-1 bg-amber-600 text-black rounded text-xs font-bold mr-2">Q</kbd>
                    <span className="text-gray-300 text-xs">{isIndonesian ? 'Turun lantai' : 'Go down'}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-lg border border-blue-500/30">
                <p className="text-xs text-blue-200 flex items-start">
                  <span className="mr-2">💡</span>
                  {isIndonesian 
                    ? 'Klik layar untuk mengunci mouse. Tekan ESC untuk keluar. Klik pada frame batik untuk melihat detail.'
                    : 'Click screen to lock mouse. Press ESC to exit. Click on batik frames to see details.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>{isIndonesian ? 'Drag untuk memutar kamera' : 'Drag to rotate camera'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>{isIndonesian ? 'Scroll untuk zoom' : 'Scroll to zoom'}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-4 h-4 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                  <span>{isIndonesian ? 'Klik batik untuk detail' : 'Click batik for details'}</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowInstructions(false)}
            className="mt-4 w-full text-sm text-amber-300 hover:text-amber-100 bg-gradient-to-r from-amber-800/50 to-orange-800/50 hover:from-amber-700/50 hover:to-orange-700/50 px-4 py-2 rounded-lg transition-all duration-200 border border-amber-500/30"
          >
            {isIndonesian ? '✨ Mulai Jelajahi Museum' : '✨ Start Exploring Museum'}
          </button>
        </div>
      )}

      {/* Crosshair for FPS mode */}
      {viewMode === 'fps' && isPointerLocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-8 h-8 border-2 border-white/80 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-2 h-2 bg-white/80 rounded-full shadow-sm"></div>
          </div>
        </div>
      )}

      {/* Performance Stats (Development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
          <div>Floor: {currentFloor + 1}/{totalFloors}</div>
          <div>Batiks: {Math.min((currentFloor + 1) * batiksPerFloor, batiks.length)}/{batiks.length}</div>
          <div>Mode: {viewMode.toUpperCase()}</div>
          <div>Locked: {isPointerLocked ? 'Yes' : 'No'}</div>
          <div>Camera: {viewMode === 'fps' ? 'FPS' : 'Orbit'}</div>
          <div>WASD: {viewMode === 'fps' && isPointerLocked ? 'Active' : 'Inactive'}</div>
        </div>
      )}

      {/* Batik Info Panel */}
      {selectedBatik && (
        <MuseumInfo 
          batik={selectedBatik} 
          onClose={() => setSelectedBatik(null)} 
        />
      )}

      {/* Loading Overlay for Floor Changes */}
      {/* You can add a subtle loading indicator here when switching floors */}
    </div>
  );
}