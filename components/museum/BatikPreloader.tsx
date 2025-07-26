// components/museum/BatikPreloader.tsx
'use client';

import { useEffect, useState, useMemo } from 'react';
import { TextureManager } from '@/lib/utils/TextureManager';
import type { Batik } from '@/lib/types';

interface BatikPreloaderProps {
  batiks: Batik[];
  currentFloor: number;
  onPreloadComplete: (floor: number) => void;
}

export function BatikPreloader({ batiks, currentFloor, onPreloadComplete }: BatikPreloaderProps) {
  const [preloadedFloors, setPreloadedFloors] = useState<Set<number>>(new Set());
  
  const batiksPerFloor = 12;
  
  // Generate unique instance ID for this preloader
  const instanceId = useMemo(() => `preloader-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, []);
  
  useEffect(() => {
    const preloadFloor = async (floor: number) => {
      // Create unique identifier for this floor
      const floorKey = `${instanceId}-floor-${floor}`;
      
      if (preloadedFloors.has(floor)) return;
      
      const startIndex = floor * batiksPerFloor;
      const endIndex = Math.min(startIndex + batiksPerFloor, batiks.length);
      const floorBatiks = batiks.slice(startIndex, endIndex);
      
      const textureManager = TextureManager.getInstance();
      
      // Preload textures for this floor with unique identifiers
      const promises = floorBatiks.map((batik, index) => {
        const imageUrl = batik.foto[0]?.link;
        const uniqueId = `${floorKey}-batik-${batik.id}-index-${index}`;
        return imageUrl ? textureManager.loadTexture(imageUrl) : Promise.resolve(null);
      });
      
      await Promise.allSettled(promises);
      
      setPreloadedFloors(prev => new Set([...prev, floor]));
      onPreloadComplete(floor);
    };
    
    // Preload current floor and adjacent floors
    const floorsToPreload = [
      currentFloor,
      Math.max(0, currentFloor - 1),
      Math.min(Math.ceil(batiks.length / batiksPerFloor) - 1, currentFloor + 1)
    ];
    
    floorsToPreload.forEach(floor => {
      if (floor >= 0 && floor < Math.ceil(batiks.length / batiksPerFloor)) {
        preloadFloor(floor);
      }
    });
  }, [currentFloor, batiks, batiksPerFloor, preloadedFloors, onPreloadComplete, instanceId]);
  
  return null;
}