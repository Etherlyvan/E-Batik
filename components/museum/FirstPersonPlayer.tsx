// components/museum/FirstPersonPlayer.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider } from '@react-three/rapier';
import { Vector3, Euler } from 'three';

interface FirstPersonPlayerProps {
  viewMode: 'fps' | 'orbit';
  isPointerLocked: boolean;
  onFloorChange: (floor: number) => void;
  currentFloor: number;
}

export function FirstPersonPlayer({ 
  viewMode, 
  isPointerLocked, 
  onFloorChange,
  currentFloor 
}: FirstPersonPlayerProps) {
  const { camera } = useThree();
  
  const playerRef = useRef<any>(null);
  const [, get] = useKeyboardControls();
  
  // Player rotation state
  const rotationRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, z: 0 });
  
  // Movement parameters
  const moveSpeed = 8;
  const sprintMultiplier = 1.8;
  const mouseSensitivity = 0.002;
  const maxVerticalAngle = Math.PI / 2.2;

  // Enhanced mouse movement - PROPER FPS CONTROLS
  useEffect(() => {
    if (viewMode !== 'fps') return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!isPointerLocked) return;

      const { movementX, movementY } = event;
      
      // Apply mouse movement to rotation
      rotationRef.current.y -= movementX * mouseSensitivity;
      rotationRef.current.x -= movementY * mouseSensitivity;
      
      // Clamp vertical rotation
      rotationRef.current.x = Math.max(
        -maxVerticalAngle, 
        Math.min(maxVerticalAngle, rotationRef.current.x)
      );
      
      // Apply rotation to camera immediately for responsive feel
      camera.rotation.x = rotationRef.current.x;
      camera.rotation.y = rotationRef.current.y;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Floor switching with E key
      if (event.key === 'E' || event.key === 'e') {
        switchFloor(1); // Go up
      }
      if (event.key === 'Q' || event.key === 'q') {
        switchFloor(-1); // Go down
      }
      // Reset position
      if (event.key === 'R' || event.key === 'r') {
        resetPlayerPosition();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [viewMode, isPointerLocked, camera]);

  // Floor switching system - ELEVATOR STYLE
  const switchFloor = (direction: number) => {
    const maxFloors = 5; // Adjust based on your batik count
    const newFloor = Math.max(0, Math.min(maxFloors - 1, currentFloor + direction));
    
    if (newFloor !== currentFloor && playerRef.current) {
      const newY = 1.6 + (newFloor * 10); // 10 units between floors
      
      // Smooth transition to new floor
      playerRef.current.setTranslation({ x: 0, y: newY, z: 0 }, true);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      onFloorChange(newFloor);
    }
  };

  // Reset player to center of current floor
  const resetPlayerPosition = () => {
    if (playerRef.current) {
      const currentY = 1.6 + (currentFloor * 10);
      playerRef.current.setTranslation({ x: 0, y: currentY, z: 0 }, true);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      
      // Reset rotation
      rotationRef.current = { x: 0, y: 0 };
      camera.rotation.set(0, 0, 0);
    }
  };

  // PROPER FPS MOVEMENT SYSTEM
  useFrame((state, delta) => {
    if (viewMode !== 'fps' || !playerRef.current) return;

    const { forward, back, left, right, run } = get();
    
    // Get current physics state
    const currentPos = playerRef.current.translation();
    const currentVel = playerRef.current.linvel();
    
    // Check bounds and reset if outside
    if (Math.abs(currentPos.x) > 15 || Math.abs(currentPos.z) > 15 || currentPos.y < -5) {
      resetPlayerPosition();
      return;
    }
    
    // Calculate movement direction based on camera rotation
    const direction = new Vector3(0, 0, 0);
    
    if (forward) direction.z -= 1;
    if (back) direction.z += 1;
    if (left) direction.x -= 1;
    if (right) direction.x += 1;
    
    if (direction.length() > 0) {
      direction.normalize();
      
      // Apply camera Y rotation to movement direction
      const rotationMatrix = new Euler(0, rotationRef.current.y, 0);
      direction.applyEuler(rotationMatrix);
    }
    
    // Calculate speed
    const currentSpeed = run ? moveSpeed * sprintMultiplier : moveSpeed;
    
    // Apply movement with smooth interpolation
    const targetVelocityX = direction.x * currentSpeed;
    const targetVelocityZ = direction.z * currentSpeed;
    
    // Smooth velocity interpolation for better control
    velocityRef.current.x = lerp(velocityRef.current.x, targetVelocityX, delta * 10);
    velocityRef.current.z = lerp(velocityRef.current.z, targetVelocityZ, delta * 10);
    
    // Apply velocity to physics body
    playerRef.current.setLinvel({
      x: velocityRef.current.x,
      y: currentVel.y, // Keep existing Y velocity (gravity)
      z: velocityRef.current.z
    }, true);
    
    // Update camera position to follow player
    const cameraOffset = new Vector3(0, 0.6, 0);
    const newCameraPos = new Vector3(currentPos.x, currentPos.y, currentPos.z).add(cameraOffset);
    
    // Smooth camera following
    camera.position.lerp(newCameraPos, delta * 15);
    
    // Ensure camera rotation is maintained
    camera.rotation.x = rotationRef.current.x;
    camera.rotation.y = rotationRef.current.y;
    camera.rotation.z = 0; // No roll
  });

  // Linear interpolation helper
  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  // Initialize camera and player position
  useEffect(() => {
    if (viewMode === 'fps') {
      const initialY = 1.6 + (currentFloor * 10);
      camera.position.set(0, initialY, 0);
      rotationRef.current = { x: 0, y: 0 };
      camera.rotation.set(0, 0, 0);
    }
  }, [viewMode, camera, currentFloor]);

  if (viewMode !== 'fps') return null;

  return (
    <RigidBody
      ref={playerRef}
      type="dynamic"
      position={[0, 1.6 + (currentFloor * 10), 0]}
      enabledRotations={[false, false, false]}
      lockRotations
      mass={1}
      friction={0.8}
      restitution={0}
    >
      <CapsuleCollider args={[0.8, 0.4]} />
    </RigidBody>
  );
}