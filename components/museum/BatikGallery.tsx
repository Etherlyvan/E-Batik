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
    
    // Debug: Log each batik's photo data
    batiksOnFloor.forEach((batik, index) => {
      console.log(`Batik ${index + 1} (${batik.nama}):`, {
        hasPhotos: batik.foto && batik.foto.length > 0,
        photoCount: batik.foto?.length || 0,
        firstPhotoUrl: batik.foto?.[0]?.link || 'No URL'
      });
    });
    
    return batiksOnFloor;
  }, [currentFloor, getBatiksByFloor]);

  // Adjusted positioning for larger frames
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 3.5; // Slightly higher for larger frames

    // Back Wall - 6 frames with more spacing for larger frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-15 + (i * 6), floorHeight, -24] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
      });
    }

    // Left Wall - 5 frames
    for (let i = 0; i < 5; i++) {
      positions.push({
        position: [-24, floorHeight, -12 + (i * 6)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall - 5 frames  
    for (let i = 0; i < 5; i++) {
      positions.push({
        position: [24, floorHeight, -12 + (i * 6)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Front Wall - 4 frames (if needed)
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [-9 + (i * 6), floorHeight, 24] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  // Debug logging - moved outside JSX to fix the void type error
  useMemo(() => {
    console.log(`🏗️ Positioning ${floorBatiks.length} frames on floor ${currentFloor}`);
    return null;
  }, [floorBatiks.length, currentFloor]);

  if (!floorBatiks || floorBatiks.length === 0) {
    return (
      <group>
        {/* Empty floor message */}
        <mesh position={[0, (currentFloor - 1) * 6 + 3, 0]}>
          <planeGeometry args={[6, 2]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Render Large Batik Frames */}
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData || !batik) {
          console.warn(`❌ Missing frame data or batik for index ${index} on floor ${currentFloor}`);
          return null;
        }

        console.log(`📍 Placing frame ${index + 1}: ${batik.nama} at position`, frameData.position);

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
    </group>
  );
}