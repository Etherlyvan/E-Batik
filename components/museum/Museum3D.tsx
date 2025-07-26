// components/museum/Museum3D.tsx
'use client';

import { useRef, useMemo } from 'react';
import { Box, Plane, Text, useTexture } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Group, Vector3, RepeatWrapping } from 'three';
import { BatikFrame } from './BatikFrame';
import type { Batik } from '@/lib/types';

interface Museum3DProps {
  batiks: Batik[];
  onBatikSelect: (batik: Batik | null) => void;
  selectedBatik: Batik | null;
  viewMode: 'fps' | 'orbit';
  currentFloor: number;
}

export function Museum3D({ 
  batiks, 
  onBatikSelect, 
  selectedBatik, 
  viewMode, 
  currentFloor 
}: Museum3DProps) {
  const groupRef = useRef<Group>(null);
  
  const batiksPerFloor = 16;
  const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
  const floorHeight = 12;

  // Load textures menggunakan assets yang sama dengan 3D museum
  const floorTextures = useTexture({
    map: '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K_Color.jpg',
    displacementMap: '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K_Displacement.jpg',
    normalMap: '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K_NormalGL.jpg',
    roughnessMap: '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K_Roughness.jpg',
    aoMap: '/textures/WoodFloor040_4K-JPG/WoodFloor040_4K_AmbientOcclusion.jpg',
  });

  const wallTextures = useTexture({
    normalMap: '/textures/leather_white_4k.gltf/textures/leather_white_nor_gl_4k.jpg',
    roughnessMap: '/textures/leather_white_4k.gltf/textures/leather_white_rough_4k.jpg',
  });

  const ceilingTextures = useTexture({
    map: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_Color.jpg',
    displacementMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_Displacement.jpg',
    aoMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_AmbientOcclusion.jpg',
    emissiveMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_Emission.jpg',
    metalnessMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_Metalness.jpg',
    normalMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_NormalGL.jpg',
    roughnessMap: '/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K_Roughness.jpg',
  });

  // Set texture wrapping
  useMemo(() => {
    Object.values(floorTextures).forEach(texture => {
      if (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(4, 4);
      }
    });

    Object.values(wallTextures).forEach(texture => {
      if (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(2, 2);
      }
    });

    Object.values(ceilingTextures).forEach(texture => {
      if (texture) {
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set(3, 3);
      }
    });
  }, [floorTextures, wallTextures, ceilingTextures]);

  const instanceId = useMemo(() => `museum-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, []);

  const createMuseumLayout = (floorIndex: number) => {
    const yOffset = floorIndex * floorHeight;
    const floorId = `${instanceId}-floor-${floorIndex}`;
    
    return (
      <group key={floorId} position={[0, yOffset, 0]}>
        {/* Floor dengan tekstur kayu yang sama seperti 3D museum */}
        <RigidBody type="fixed" key={`${floorId}-floor`}>
          <Plane
            args={[45, 45]}
            position={[0, -Math.PI, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <meshStandardMaterial
              {...floorTextures}
              displacementScale={0.1}
              side={2}
            />
          </Plane>
          <CuboidCollider args={[22.5, 0.1, 22.5]} position={[0, -Math.PI - 0.1, 0]} />
        </RigidBody>

        {/* Walls dengan tekstur leather seperti 3D museum */}
        {/* Front Wall */}
        <RigidBody type="fixed" key={`${floorId}-front-wall`}>
          <Box args={[80, 20, 0.001]} position={[0, 0, -20]}>
            <meshStandardMaterial
              color="#adadae"
              normalMap={wallTextures.normalMap}
              roughnessMap={wallTextures.roughnessMap}
              side={2}
            />
          </Box>
          <CuboidCollider args={[40, 10, 0.1]} position={[0, 0, -20]} />
        </RigidBody>

        {/* Back Wall */}
        <RigidBody type="fixed" key={`${floorId}-back-wall`}>
          <Box args={[80, 20, 0.001]} position={[0, 0, 20]}>
            <meshStandardMaterial
              color="#adadae"
              normalMap={wallTextures.normalMap}
              roughnessMap={wallTextures.roughnessMap}
              side={2}
            />
          </Box>
          <CuboidCollider args={[40, 10, 0.1]} position={[0, 0, 20]} />
        </RigidBody>

        {/* Left Wall */}
        <RigidBody type="fixed" key={`${floorId}-left-wall`}>
          <Box args={[80, 20, 0.001]} position={[-20, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial
              color="#adadae"
              normalMap={wallTextures.normalMap}
              roughnessMap={wallTextures.roughnessMap}
              side={2}
            />
          </Box>
          <CuboidCollider args={[40, 10, 0.1]} position={[-20, 0, 0]} />
        </RigidBody>

        {/* Right Wall */}
        <RigidBody type="fixed" key={`${floorId}-right-wall`}>
          <Box args={[80, 20, 0.001]} position={[20, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial
              color="#adadae"
              normalMap={wallTextures.normalMap}
              roughnessMap={wallTextures.roughnessMap}
              side={2}
            />
          </Box>
          <CuboidCollider args={[40, 10, 0.1]} position={[20, 0, 0]} />
        </RigidBody>

        {/* Ceiling dengan tekstur office ceiling */}
        <Plane
          key={`${floorId}-ceiling`}
          args={[45, 40]}
          position={[0, 10, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshLambertMaterial
            {...ceilingTextures}
            displacementScale={0.1}
            side={2}
          />
        </Plane>

        {/* Floor Information Panel dengan desain yang lebih sederhana */}
        <group key={`${floorId}-info-panel`} position={[0, 1.5, 18]}>
          <Box args={[8, 3, 0.3]}>
            <meshStandardMaterial color="#2F2F2F" />
          </Box>

          <Text
            position={[0, 0.8, 0.2]}
            fontSize={0.6}
            color="#FFD700"
            anchorX="center"
            anchorY="middle"
            fontWeight="bold"
          >
            LANTAI {floorIndex + 1}
          </Text>
          <Text
            position={[0, 0.2, 0.2]}
            fontSize={0.35}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            Galeri Batik Digital
          </Text>
          <Text
            position={[0, -0.4, 0.2]}
            fontSize={0.25}
            color="lightgray"
            anchorX="center"
            anchorY="middle"
          >
            Koleksi Batik Nusantara
          </Text>
          <Text
            position={[0, -0.9, 0.2]}
            fontSize={0.2}
            color="lightgray"
            anchorX="center"
            anchorY="middle"
          >
            Tekan E/Q untuk ganti lantai • R untuk reset posisi
          </Text>
        </group>
      </group>
    );
  };

  const visibleBatiks = useMemo(() => {
    const floorsToRender = [
      Math.max(0, currentFloor - 1),
      currentFloor,
      Math.min(totalFloors - 1, currentFloor + 1)
    ];
    
    const visible: Array<{
      batik: Batik, 
      position: [number, number, number], 
      rotation: [number, number, number],
      floor: number,
      uniqueKey: string
    }> = [];
    
    floorsToRender.forEach(floor => {
      const startIndex = floor * batiksPerFloor;
      const endIndex = Math.min(startIndex + batiksPerFloor, batiks.length);
      const floorBatiks = batiks.slice(startIndex, endIndex);
      
      // Wall positions sama seperti 3D museum original
      const wallPositions = [
        // Front Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-15 + 10 * i, 2, -19.5] as [number, number, number],
          rot: [0, 0, 0] as [number, number, number],
          wall: 'front',
          position: `front-${i}`
        })),
        // Back Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-15 + 10 * i, 2, 19.5] as [number, number, number],
          rot: [0, Math.PI, 0] as [number, number, number],
          wall: 'back',
          position: `back-${i}`
        })),
        // Left Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [-19.5, 2, -15 + 10 * i] as [number, number, number],
          rot: [0, Math.PI / 2, 0] as [number, number, number],
          wall: 'left',
          position: `left-${i}`
        })),
        // Right Wall (4 batiks)
        ...Array.from({ length: 4 }, (_, i) => ({
          pos: [19.5, 2, -15 + 10 * i] as [number, number, number],
          rot: [0, -Math.PI / 2, 0] as [number, number, number],
          wall: 'right',
          position: `right-${i}`
        }))
      ];
      
      floorBatiks.forEach((batik, index) => {
        if (index < wallPositions.length) {
          const wallPos = wallPositions[index];
          
          const timestamp = Date.now();
          const random = Math.random().toString(36).substr(2, 9);
          const uniqueKey = `${instanceId}-batik-${batik.id}-floor-${floor}-${wallPos.wall}-${wallPos.position}-${index}-${timestamp}-${random}`;
          
          visible.push({ 
            batik, 
            position: [
              wallPos.pos[0], 
              wallPos.pos[1] + (floor * floorHeight), 
              wallPos.pos[2]
            ] as [number, number, number], 
            rotation: wallPos.rot, 
            floor,
            uniqueKey
          });
        }
      });
    });
    
    return visible;
  }, [batiks, currentFloor, batiksPerFloor, totalFloors, floorHeight, instanceId]);

  return (
    <group ref={groupRef}>
      {/* Render visible floors */}
      {Array.from({ length: 3 }).map((_, index) => {
        const floorIndex = Math.max(0, currentFloor - 1) + index;
        if (floorIndex >= totalFloors) return null;
        return createMuseumLayout(floorIndex);
      })}
      
      {/* Render batik frames */}
      {visibleBatiks.map(({ batik, position, rotation, floor, uniqueKey }) => (
        <BatikFrame
          key={uniqueKey}
          batik={batik}
          position={position}
          rotation={rotation}
          isSelected={selectedBatik?.id === batik.id}
          onClick={() => onBatikSelect(batik)}
        />
      ))}
      
      {/* Lighting setup sama seperti 3D museum */}
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* Spotlights untuk setiap dinding */}
      <spotLight
        position={new Vector3(0, 6.7 + (currentFloor * floorHeight), -13)}
        target-position={new Vector3(0, 0 + (currentFloor * floorHeight), -20)}
        intensity={0.948}
        angle={1.57079}
        penumbra={0.2}
        decay={1}
        distance={40}
        color="#ffffff"
        castShadow
      />
      
      <spotLight
        position={new Vector3(0, 6.7 + (currentFloor * floorHeight), 13)}
        target-position={new Vector3(0, 0 + (currentFloor * floorHeight), 20)}
        intensity={0.948}
        angle={1.57079}
        penumbra={0.2}
        decay={1}
        distance={40}
        color="#ffffff"
        castShadow
      />
      
      <spotLight
        position={new Vector3(-13, 6.7 + (currentFloor * floorHeight), 0)}
        target-position={new Vector3(-20, 0 + (currentFloor * floorHeight), 0)}
        intensity={0.948}
        angle={1.57079}
        penumbra={0.2}
        decay={1}
        distance={40}
        color="#ffffff"
        castShadow
      />
      
      <spotLight
        position={new Vector3(13, 6.7 + (currentFloor * floorHeight), 0)}
        target-position={new Vector3(20, 0 + (currentFloor * floorHeight), 0)}
        intensity={0.948}
        angle={1.57079}
        penumbra={0.2}
        decay={1}
        distance={40}
        color="#ffffff"
        castShadow
      />
    </group>
  );
}