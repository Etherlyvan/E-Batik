// components/museum/BatikGallery.tsx
'use client';

import { useMemo } from 'react';
import { BatikFrame } from './BatikFrame';
import { useMuseumStore } from '@/lib/stores/museumStore';
import type { Batik } from '@/lib/types';

interface BatikGalleryProps {
  batiks: Batik[];
  currentFloor: number;
}

export function BatikGallery({ batiks, currentFloor }: BatikGalleryProps) {
  const { getBatiksByFloor } = useMuseumStore();
  
  const floorBatiks = useMemo(() => {
    const batiksOnFloor = getBatiksByFloor(currentFloor);
    console.log(`🖼️ Floor ${currentFloor}: ${batiksOnFloor.length} batik frames`);
    return batiksOnFloor;
  }, [currentFloor, getBatiksByFloor]);

  // Enhanced frame positioning for museum layout
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 3;

    // Left Wall - 10 frames
    for (let i = 0; i < 10; i++) {
      positions.push({
        position: [-28, floorHeight, -25 + (i * 5)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall - 10 frames  
    for (let i = 0; i < 10; i++) {
      positions.push({
        position: [28, floorHeight, -25 + (i * 5)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  if (!floorBatiks || floorBatiks.length === 0) {
    return (
      <group>
        {/* Empty floor indicator */}
        <mesh position={[0, (currentFloor - 1) * 6 + 3, 0]}>
          <boxGeometry args={[6, 1, 0.1]} />
          <meshStandardMaterial 
            color="#8b4513"
            emissive="#654321"
            emissiveIntensity={0.1}
          />
        </mesh>
        
        {/* Empty floor sign */}
        <group position={[0, (currentFloor - 1) * 6 + 4, 0]}>
          <mesh>
            <planeGeometry args={[4, 1]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
        </group>
      </group>
    );
  }

  return (
    <group>
      {/* Render Batik Frames */}
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData || !batik) return null;

        return (
          <BatikFrame
            key={`batik-${batik.id}-floor-${currentFloor}-${index}`}
            batik={batik}
            position={frameData.position}
            rotation={frameData.rotation}
            floor={currentFloor}
          />
        );
      })}

      {/* Floor Information Display */}
      <group position={[0, (currentFloor - 1) * 6 + 4.5, 0]}>
        <mesh>
          <boxGeometry args={[8, 0.8, 0.1]} />
          <meshStandardMaterial 
            color="#8b4513"
            emissive="#654321"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Floor Number Display */}
      <group position={[0, (currentFloor - 1) * 6 + 5, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.5]} />
          <meshStandardMaterial 
            color="#ffd700"
            emissive="#ffaa00"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}