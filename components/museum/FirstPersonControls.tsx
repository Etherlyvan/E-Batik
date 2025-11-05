// components/museum/FirstPersonControls.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler, MathUtils } from 'three';
import { useMuseumStore } from '@/lib/stores/museumStore';

interface FirstPersonControlsProps {
  speed?: number;
  sensitivity?: number;
}

export function FirstPersonControls({ 
  speed = 2.5, // Dikurangi dari 5 ke 2.5
  sensitivity = 0.0015, // Dikurangi dari 0.002 ke 0.0015
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree();
  const { 
    currentFloor, 
    setCurrentFloor, 
    totalFloors,
    isTransitioning,
    setCameraPosition,
    quality
  } = useMuseumStore();
  
  // Movement state
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const canJump = useRef(false);
  
  // Physics
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'));
  
  // Control state
  const isLocked = useRef(false);

  // Initialize camera position and rotation
  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.rotation.set(0, 0, 0);
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera]);

  // Mouse movement handler dengan sensitivity yang lebih rendah
  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!isLocked.current) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    euler.current.setFromQuaternion(camera.quaternion);
    
    // Apply horizontal rotation (yaw) - sensitivity dikurangi
    euler.current.y -= movementX * sensitivity;
    
    // Apply vertical rotation (pitch) with limits - sensitivity dikurangi
    euler.current.x -= movementY * sensitivity;
    euler.current.x = MathUtils.clamp(
      euler.current.x, 
      -Math.PI / 2 + 0.1,
      Math.PI / 2 - 0.1
    );
    
    // Reset roll to prevent tilting
    euler.current.z = 0;
    
    camera.quaternion.setFromEuler(euler.current);
  }, [camera, sensitivity]);

  // Keyboard handlers
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      // Movement
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = true;
        break;
      case 'Space':
        event.preventDefault();
        if (canJump.current) {
          velocity.current.y += 200; // Dikurangi dari 350 ke 200
          canJump.current = false;
        }
        break;

      // Floor navigation
      case 'Digit1':
        event.preventDefault();
        if (totalFloors >= 1 && currentFloor !== 1) {
          setCurrentFloor(1);
        }
        break;
      case 'Digit2':
        event.preventDefault();
        if (totalFloors >= 2 && currentFloor !== 2) {
          setCurrentFloor(2);
        }
        break;
      case 'Digit3':
        event.preventDefault();
        if (totalFloors >= 3 && currentFloor !== 3) {
          setCurrentFloor(3);
        }
        break;
      case 'KeyQ':
        event.preventDefault();
        if (currentFloor > 1) {
          setCurrentFloor(currentFloor - 1);
        }
        break;
      case 'KeyE':
        event.preventDefault();
        if (currentFloor < totalFloors) {
          setCurrentFloor(currentFloor + 1);
        }
        break;

      // Reset camera orientation
      case 'KeyR':
        euler.current.set(0, 0, 0);
        camera.quaternion.setFromEuler(euler.current);
        break;
    }
  }, [currentFloor, totalFloors, setCurrentFloor, camera]);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = false;
        break;
    }
  }, []);

  // Pointer lock handlers
  const onPointerLockChange = useCallback(() => {
    isLocked.current = document.pointerLockElement === gl.domElement;
  }, [gl.domElement]);

  // Event listeners setup
  useEffect(() => {
    const canvas = gl.domElement;
    
    const onClick = () => {
      if (!document.pointerLockElement && !isTransitioning) {
        canvas.requestPointerLock();
      }
    };

    canvas.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [gl.domElement, onMouseMove, onKeyDown, onKeyUp, onPointerLockChange, isTransitioning]);

  // Animation loop dengan kecepatan yang dikurangi
  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    
    if (isTransitioning) return;
    if (!isLocked.current) return;

    try {
      // Apply physics dengan damping yang lebih tinggi
      const dampingFactor = quality === 'low' ? 12.0 : 15.0; // Ditingkatkan untuk movement yang lebih terkontrol
      velocity.current.x -= velocity.current.x * dampingFactor * clampedDelta;
      velocity.current.z -= velocity.current.z * dampingFactor * clampedDelta;
      velocity.current.y -= 9.8 * 100.0 * clampedDelta; // Gravity tetap

      // Calculate movement direction
      direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
      direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
      direction.current.normalize();

      // Apply movement forces dengan kecepatan yang dikurangi
      const currentSpeedValue = speed * (quality === 'low' ? 0.6 : 0.8); // Dikurangi lebih banyak
      
      if (moveForward.current || moveBackward.current) {
        velocity.current.z -= direction.current.z * 250.0 * clampedDelta * currentSpeedValue; // Dikurangi dari 400 ke 250
      }
      if (moveLeft.current || moveRight.current) {
        velocity.current.x -= direction.current.x * 250.0 * clampedDelta * currentSpeedValue; // Dikurangi dari 400 ke 250
      }

      // Apply movement to camera dengan smoothing yang lebih halus
      const moveVector = new Vector3();
      moveVector.setFromMatrixColumn(camera.matrix, 0);
      moveVector.crossVectors(camera.up, moveVector);
      moveVector.multiplyScalar(-velocity.current.z * clampedDelta * 0.8); // Ditambah multiplier 0.8
      camera.position.add(moveVector);

      const strafeVector = new Vector3();
      strafeVector.setFromMatrixColumn(camera.matrix, 0);
      strafeVector.multiplyScalar(-velocity.current.x * clampedDelta * 0.8); // Ditambah multiplier 0.8
      camera.position.add(strafeVector);

      // Apply vertical movement
      camera.position.y += velocity.current.y * clampedDelta;

      // Boundary constraints
      const boundary = 23;
      camera.position.x = MathUtils.clamp(camera.position.x, -boundary, boundary);
      camera.position.z = MathUtils.clamp(camera.position.z, -boundary, boundary);

      // Floor constraints
      const floorHeight = (currentFloor - 1) * 6 + 2;
      const ceilingHeight = (currentFloor - 1) * 6 + 4.5;
      
      if (camera.position.y < floorHeight) {
        velocity.current.y = 0;
        camera.position.y = floorHeight;
        canJump.current = true;
      }
      
      if (camera.position.y > ceilingHeight) {
        camera.position.y = ceilingHeight;
        velocity.current.y = 0;
      }

      // Ensure camera stays level (no roll)
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.z = 0;
      camera.quaternion.setFromEuler(euler.current);

      // Update store with current position
      setCameraPosition([camera.position.x, camera.position.y, camera.position.z]);

    } catch (error) {
      console.warn('Error in FirstPersonControls:', error);
    }
  });

  return null;
}