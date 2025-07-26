// components/museum/FirstPersonPlayer.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { Vector3, Euler } from 'three';

interface FirstPersonPlayerProps {
  viewMode: 'fps' | 'orbit';
  isPointerLocked: boolean;
}

export function FirstPersonPlayer({ viewMode, isPointerLocked }: FirstPersonPlayerProps) {
  const { camera } = useThree();
  
  const [, get] = useKeyboardControls();
  
  // Player state dengan initial values yang benar
  const position = useRef(new Vector3(0, 1.6, 5));
  const velocity = useRef(new Vector3(0, 0, 0));
  const direction = useRef(new Vector3(0, 0, 0));
  const rotation = useRef(new Euler(0, 0, 0));
  const moveSpeed = useRef(8);
  const mouseSensitivity = useRef(0.001); // Kurangi sensitivity
  const isGrounded = useRef(true);

  // Mouse movement handling dengan perbaikan
  useEffect(() => {
    if (viewMode !== 'fps') return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked) return;

      const { movementX, movementY } = event;
      
      // Batasi pergerakan mouse untuk menghindari gerakan berlebihan
      const maxMovement = 100;
      const clampedX = Math.max(-maxMovement, Math.min(maxMovement, movementX));
      const clampedY = Math.max(-maxMovement, Math.min(maxMovement, movementY));
      
      rotation.current.y -= clampedX * mouseSensitivity.current;
      rotation.current.x -= clampedY * mouseSensitivity.current;
      
      // Limit vertical rotation lebih ketat
      rotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotation.current.x));
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [viewMode, isPointerLocked]);

  useFrame((state, delta) => {
    if (viewMode !== 'fps') return;

    const { forward, back, left, right, jump, run } = get();
    
    // Calculate movement direction
    direction.current.set(0, 0, 0);
    
    if (forward) direction.current.z -= 1;
    if (back) direction.current.z += 1;
    if (left) direction.current.x -= 1;
    if (right) direction.current.x += 1;
    
    // Normalize direction
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }
    
    // Apply rotation to movement direction
    direction.current.applyEuler(new Euler(0, rotation.current.y, 0));
    
    // Calculate speed (with running)
    const speed = run ? moveSpeed.current * 1.8 : moveSpeed.current;
    
    // Apply movement dengan smooth delta
    const smoothDelta = Math.min(delta, 0.1); // Cap delta untuk menghindari jump besar
    const newPosition = position.current.clone();
    newPosition.x += direction.current.x * speed * smoothDelta;
    newPosition.z += direction.current.z * speed * smoothDelta;
    
    // Collision detection yang lebih akurat
    const wallLimit = 8.5; // Sedikit lebih kecil dari dinding
    const centerLimit = 1.2; // Hindari pedestal di tengah
    
    // Cek collision dengan dinding
    if (Math.abs(newPosition.x) < wallLimit && Math.abs(newPosition.z) < wallLimit) {
      // Cek collision dengan pedestal di tengah
      if (Math.abs(newPosition.x) > centerLimit || Math.abs(newPosition.z) > centerLimit) {
        position.current.x = newPosition.x;
        position.current.z = newPosition.z;
      }
    }
    
    // Simple gravity and jumping
    if (jump && isGrounded.current) {
      velocity.current.y = 10; // Jump force
      isGrounded.current = false;
    }
    
    // Apply gravity
    velocity.current.y -= 25 * smoothDelta;
    position.current.y += velocity.current.y * smoothDelta;
    
    // Ground collision
    if (position.current.y <= 1.6) {
      position.current.y = 1.6;
      velocity.current.y = 0;
      isGrounded.current = true;
    }
    
    // Update camera dengan smooth interpolation
    camera.position.lerp(position.current, 0.1);
    camera.rotation.x = rotation.current.x;
    camera.rotation.y = rotation.current.y;
    camera.rotation.z = rotation.current.z;
  });

  // Switch camera mode dengan transisi smooth
  useEffect(() => {
    if (viewMode === 'fps') {
      position.current.set(0, 1.6, 5);
      rotation.current.set(0, 0, 0);
      camera.position.set(0, 1.6, 5);
    } else {
      camera.position.set(0, 8, 12);
      camera.lookAt(0, 0, 0);
    }
  }, [viewMode, camera]);

  return null;
}