// components/museum/Minimap.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { Map, Maximize2, Minimize2, Navigation, Search } from 'lucide-react';

interface MinimapProps {
  size?: 'small' | 'medium' | 'large';
}

export function Minimap({ size = 'medium' }: MinimapProps) {
  const {
    currentFloor,
    cameraPosition,
    showMinimap,
    toggleMinimap,
    getBatiksByFloor,
    selectedBatik,
    setCurrentFloor,
    bookmarkedBatiks,
    totalFloors
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredBatik, setHoveredBatik] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const isIndonesian = currentLanguage.code === 'id';
  const floorBatiks = getBatiksByFloor(currentFloor);

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const expandedSizeClasses = {
    small: 'w-64 h-64',
    medium: 'w-80 h-80',
    large: 'w-96 h-96'
  };

  // Draw minimap on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scale = width / 50; // Museum is 50x50 units

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw museum layout
    drawMuseumLayout(ctx, width, height, scale);
    
    // Draw batik frames
    drawBatikFrames(ctx, scale, width, height);
    
    // Draw player position
    drawPlayerPosition(ctx, scale, width, height);
    
    // Draw bookmarked batiks
    drawBookmarkedBatiks(ctx, scale, width, height);

  }, [currentFloor, cameraPosition, floorBatiks, bookmarkedBatiks, isExpanded]);

  const drawMuseumLayout = (ctx: CanvasRenderingContext2D, width: number, height: number, scale: number) => {
    // Museum walls
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(scale, scale, width - 2 * scale, height - 2 * scale);

    // Internal structure (simplified)
    ctx.strokeStyle = '#D2B48C';
    ctx.lineWidth = 1;
    
    // Draw grid for reference
    for (let i = 1; i < 5; i++) {
      const x = (width / 5) * i;
      const y = (height / 5) * i;
      
      ctx.beginPath();
      ctx.moveTo(x, scale);
      ctx.lineTo(x, height - scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(scale, y);
      ctx.lineTo(width - scale, y);
      ctx.stroke();
    }
  };

  const drawBatikFrames = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    const framePositions = getBatikFramePositions();
    
    framePositions.forEach((position, index) => {
      const batik = floorBatiks[index];
      if (!batik) return;

      const x = ((position.position[0] + 25) / 50) * width;
      const y = ((25 - position.position[2]) / 50) * height;
      
      // Frame background
      ctx.fillStyle = hoveredBatik === batik.id ? '#FFD700' : '#F5E6D3';
      ctx.fillRect(x - 3, y - 3, 6, 6);
      
      // Frame border
      ctx.strokeStyle = selectedBatik?.id === batik.id ? '#FF6B35' : '#8B4513';
      ctx.lineWidth = selectedBatik?.id === batik.id ? 2 : 1;
      ctx.strokeRect(x - 3, y - 3, 6, 6);
      
      // Bookmark indicator
      if (bookmarkedBatiks.includes(batik.id)) {
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.arc(x + 2, y - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  const drawPlayerPosition = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    const x = ((cameraPosition[0] + 25) / 50) * width;
    const y = ((25 - cameraPosition[2]) / 50) * height;
    
    // Player dot
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Player direction indicator (simplified)
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 8);
    ctx.stroke();
  };

  const drawBookmarkedBatiks = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    // Already handled in drawBatikFrames
  };

  const getBatikFramePositions = () => {
    const positions: Array<{ position: [number, number, number] }> = [];
    
    // Back Wall - 8 frames
    for (let i = 0; i < 8; i++) {
      positions.push({
        position: [-17.5 + (i * 5), 0, -24] as [number, number, number]
      });
    }

    // Left Wall - 6 frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-24, 0, -15 + (i * 5)] as [number, number, number]
      });
    }

    // Right Wall - 6 frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [24, 0, -15 + (i * 5)] as [number, number, number]
      });
    }

    return positions;
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to world coordinates
    const worldX = ((x / canvas.width) * 50) - 25;
    const worldZ = 25 - ((y / canvas.height) * 50);
    
    // Check if clicked on a batik frame
    const framePositions = getBatikFramePositions();
    framePositions.forEach((position, index) => {
      const distance = Math.sqrt(
        Math.pow(worldX - position.position[0], 2) + 
        Math.pow(worldZ - position.position[2], 2)
      );
      
      if (distance < 3 && floorBatiks[index]) {
        // Navigate to batik or show details
        console.log('Clicked on batik:', floorBatiks[index].nama);
      }
    });
  };

  if (!showMinimap) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-20 right-4 z-40 bg-black/80 backdrop-blur-sm rounded-xl border border-amber-500 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-amber-900/50">
          <div className="flex items-center space-x-2">
            <Map className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold text-amber-300">
              {isIndonesian ? `Lantai ${currentFloor}` : `Floor ${currentFloor}`}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-amber-800/50 rounded transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-3 h-3 text-amber-300" />
              ) : (
                <Maximize2 className="w-3 h-3 text-amber-300" />
              )}
            </button>
            
            <button
              onClick={toggleMinimap}
              className="p-1 hover:bg-red-800/50 rounded transition-colors"
            >
              <span className="text-xs text-red-300">×</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="p-3">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className={`${isExpanded ? expandedSizeClasses[size] : sizeClasses[size]} cursor-pointer border border-amber-600 rounded`}
            onClick={handleCanvasClick}
            onMouseMove={(e) => {
              // Handle hover effects for batik frames
              const canvas = canvasRef.current;
              if (!canvas) return;
              
              const rect = canvas.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Check if hovering over batik frame
              // Implementation would check frame positions and set hoveredBatik
            }}
            onMouseLeave={() => setHoveredBatik(null)}
          />
        </div>

        {/* Floor Navigation */}
        <div className="p-3 pt-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-300">
              {isIndonesian ? 'Lantai:' : 'Floor:'}
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: totalFloors }, (_, i) => i + 1).map(floor => (
                <button
                  key={floor}
                  onClick={() => setCurrentFloor(floor)}
                  className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                    floor === currentFloor
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-800/50 text-amber-300 hover:bg-amber-700/50'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        {isExpanded && (
          <div className="p-3 pt-0 border-t border-amber-800/50">
            <div className="text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Posisi Anda' : 'Your Position'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-300 rounded"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Frame Batik' : 'Batik Frame'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Bookmark' : 'Bookmarked'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="p-3 pt-0 text-xs text-amber-300">
          <div className="flex justify-between">
            <span>{isIndonesian ? 'Koleksi:' : 'Collection:'}</span>
            <span>{floorBatiks.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{isIndonesian ? 'Bookmark:' : 'Bookmarked:'}</span>
            <span>{bookmarkedBatiks.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}