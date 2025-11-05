// components/museum/MuseumBuilding.tsx (Updated)
'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane } from '@react-three/drei';
import { TextureManager } from '@/lib/utils/TextureManager';
import { useMuseumStore } from '@/lib/stores/museumStore';
import * as THREE from 'three';

export function MuseumBuilding() {
  const buildingRef = useRef<THREE.Group>(null);
  const { quality } = useMuseumStore();
  const [textures, setTextures] = useState({
    floor: null as THREE.Texture | null,
    wall: null as THREE.Texture | null,
    ceiling: null as THREE.Texture | null,
  });

  // Load textures based on quality
  useEffect(() => {
    const textureManager = TextureManager.getInstance();
    
    const loadTextures = async () => {
      const qualitySettings = {
        low: { repeat: [5, 5] as [number, number], quality: 'low' as const },
        medium: { repeat: [8, 8] as [number, number], quality: 'medium' as const },
        high: { repeat: [12, 12] as [number, number], quality: 'high' as const },
      };

      const settings = qualitySettings[quality];
      
      try {
        const [floor, wall, ceiling] = await Promise.all([
          textureManager.loadTexture('/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: settings.repeat,
            quality: settings.quality
          }),
          textureManager.loadTexture('/textures/leather_white_4k.gltf/textures/leather_white_rough_4k.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [4, 4] as [number, number],
            quality: settings.quality
          }),
          textureManager.loadTexture('/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: settings.repeat,
            quality: settings.quality
          })
        ]);

        setTextures({ floor, wall, ceiling });
      } catch (error) {
        console.error('Failed to load building textures:', error);
      }
    };

    loadTextures();
  }, [quality]);

  // Optimized materials based on quality
  const materials = useMemo(() => {
    const baseSettings = {
      low: { roughness: 0.8, metalness: 0.1 },
      medium: { roughness: 0.7, metalness: 0.1 },
      high: { roughness: 0.6, metalness: 0.2 },
    };

    const settings = baseSettings[quality];

    return {
      floor: new THREE.MeshStandardMaterial({
        map: textures.floor,
        color: textures.floor ? 0xffffff : 0xd2b48c,
        ...settings,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: textures.wall,
        color: textures.wall ? 0xffffff : 0xf5f5dc,
        ...settings,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        map: textures.ceiling,
        color: textures.ceiling ? 0xffffff : 0xf0f0f0,
        roughness: 0.3,
        metalness: 0.1,
      }),
    };
  }, [textures, quality]);

  // Lighting configuration based on quality
  const lightingConfig = useMemo(() => {
    switch (quality) {
      case 'low':
        return {
          intensity: 0.6,
          distance: 15,
          count: 2, // Fewer lights per floor
        };
      case 'medium':
        return {
          intensity: 0.8,
          distance: 18,
          count: 4,
        };
      case 'high':
        return {
          intensity: 1.0,
          distance: 20,
          count: 6, // More lights for better illumination
        };
    }
  }, [quality]);

  // Animated lighting (subtle)
  useFrame((state) => {
    if (buildingRef.current && quality === 'high') {
      // Subtle breathing effect for high quality
      const time = state.clock.elapsedTime;
      buildingRef.current.children.forEach((child, index) => {
        if (child.type === 'PointLight') {
          const light = child as THREE.PointLight;
          light.intensity = lightingConfig.intensity + Math.sin(time + index) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={buildingRef}>
      {/* Ground Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <Plane 
          args={[50, 50]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <primitive object={materials.floor} />
        </Plane>
      </RigidBody>

      {/* Museum Structure - 3 Floors */}
      {[1, 2, 3].map((floorLevel) => {
        const floorY = (floorLevel - 1) * 6;
        const ceilingY = floorLevel * 6 - 0.5;
        
        return (
          <group key={`floor-${floorLevel}`}>
            {/* Floor */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, floorY, 0]}>
                <primitive object={materials.floor} />
              </Box>
            </RigidBody>

            {/* Ceiling */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, ceilingY, 0]}>
                <primitive object={materials.ceiling} />
              </Box>
            </RigidBody>

          </group>
        );
      })}

      {/* Walls */}
      {[
        { position: [0, 9, -25], args: [50, 18, 1] as [number, number, number] }, // Back
        { position: [0, 9, 25], args: [50, 18, 1] as [number, number, number] },  // Front
        { position: [-25, 9, 0], args: [1, 18, 50] as [number, number, number] }, // Left
        { position: [25, 9, 0], args: [1, 18, 50] as [number, number, number] },  // Right
      ].map((wall, index) => (
        <RigidBody key={`wall-${index}`} type="fixed" colliders="cuboid">
          <Box args={wall.args} position={wall.position as [number, number, number]}>
            <primitive object={materials.wall} />
          </Box>
        </RigidBody>
      ))}

      {/* Optimized Lighting System */}
      {[1, 2, 3].map((floor) => {
        const y = floor * 6 - 2;
        const lightPositions = [];
        
        // Generate light positions based on quality
        const gridSize = lightingConfig.count === 2 ? 1 : lightingConfig.count === 4 ? 2 : 3;
        const spacing = 20 / gridSize;
        
        for (let x = 0; x < gridSize; x++) {
          for (let z = 0; z < gridSize; z++) {
            lightPositions.push([
              -10 + (x * spacing),
              y,
              -10 + (z * spacing)
            ]);
          }
        }
        
        return (
          <group key={`lighting-${floor}`}>
            {lightPositions.map((pos, index) => (
              <pointLight
                key={`light-${floor}-${index}`}
                position={pos as [number, number, number]}
                intensity={lightingConfig.intensity}
                distance={lightingConfig.distance}
                decay={2}
                color="#fff8dc"
                castShadow={quality === 'high'}
              />
            ))}
            
            {/* Ambient lighting for each floor */}
            <ambientLight 
              intensity={quality === 'low' ? 0.3 : 0.2} 
              color="#f0f8ff" 
            />
          </group>
        );
      })}

      {/* Emergency lighting (low quality fallback) */}
      {quality === 'low' && (
        <directionalLight
          position={[10, 20, 10]}
          intensity={0.8}
          color="#fff8dc"
          castShadow={false}
        />
      )}
    </group>
  );
}