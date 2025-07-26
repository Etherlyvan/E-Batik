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
    return getBatiksByFloor(currentFloor);
  }, [currentFloor, getBatiksByFloor]);

  // Enhanced frame positioning for better layout
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 3; // Adjusted for new floor spacing

    // Left Wall (10 frames)
    for (let i = 0; i < 10; i++) {
      positions.push({
        position: [-28, floorHeight, -25 + (i * 5)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall (10 frames)
    for (let i = 0; i < 10; i++) {
      positions.push({
        position: [28, floorHeight, -25 + (i * 5)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  console.log(`Floor ${currentFloor}: ${floorBatiks.length} batiks`); // Debug log

  return (
    <group>
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData) return null;

        return (
          <BatikFrame
            key={`${batik.id}-${currentFloor}-${index}`}
            batik={batik}
            position={frameData.position}
            rotation={frameData.rotation}
            floor={currentFloor}
          />
        );
      })}

      {/* Floor Information Display */}
      <group position={[0, (currentFloor - 1) * 6 + 4, 0]}>
        <mesh>
          <boxGeometry args={[8, 1, 0.1]} />
          <meshStandardMaterial 
            color="#8b4513"
            emissive="#654321"
            emissiveIntensity={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}