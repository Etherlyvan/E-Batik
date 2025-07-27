// components/museum/FirstPersonControls.tsx
'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler } from 'three';
import { useMuseumStore } from '@/lib/stores/museumStore';
import * as THREE from 'three';

interface FirstPersonControlsProps {
  speed?: number;
  sensitivity?: number;
}

export function FirstPersonControls({ 
  speed = 5, 
  sensitivity = 0.002 
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree();
  const { currentFloor, setCurrentFloor, totalFloors } = useMuseumStore();
  
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const canJump = useRef(false);
  
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'));
  const isLocked = useRef(false);

  // Mouse movement for looking around
  const onMouseMove = (event: MouseEvent) => {
    if (!isLocked.current) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    euler.current.setFromQuaternion(camera.quaternion);
    euler.current.y -= movementX * sensitivity;
    euler.current.x -= movementY * sensitivity;
    euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x));
    camera.quaternion.setFromEuler(euler.current);
  };

  // Keyboard controls
  const onKeyDown = (event: KeyboardEvent) => {
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
        if (canJump.current) velocity.current.y += 350;
        canJump.current = false;
        break;

      // Floor navigation
      case 'Digit1':
        if (totalFloors >= 1) {
          setCurrentFloor(1);
          camera.position.set(0, 2, 15);
        }
        break;
      case 'Digit2':
        if (totalFloors >= 2) {
          setCurrentFloor(2);
          camera.position.set(0, 8, 15);
        }
        break;
      case 'Digit3':
        if (totalFloors >= 3) {
          setCurrentFloor(3);
          camera.position.set(0, 14, 15);
        }
        break;
      case 'Digit4':
        if (totalFloors >= 4) {
          setCurrentFloor(4);
          camera.position.set(0, 20, 15);
        }
        break;
      case 'Digit5':
        if (totalFloors >= 5) {
          setCurrentFloor(5);
          camera.position.set(0, 26, 15);
        }
        break;

      // Alternative floor navigation
      case 'KeyQ':
        if (currentFloor > 1) {
          const newFloor = currentFloor - 1;
          setCurrentFloor(newFloor);
          camera.position.set(0, (newFloor - 1) * 6 + 2, 15);
        }
        break;
      case 'KeyE':
        if (currentFloor < totalFloors) {
          const newFloor = currentFloor + 1;
          setCurrentFloor(newFloor);
          camera.position.set(0, (newFloor - 1) * 6 + 2, 15);
        }
        break;

      // Toggle mouse lock
      case 'KeyM':
        if (document.pointerLockElement) {
          document.exitPointerLock();
        } else {
          gl.domElement.requestPointerLock();
        }
        break;
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
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
  };

  // Pointer lock handlers
  const onPointerLockChange = () => {
    isLocked.current = document.pointerLockElement === gl.domElement;
  };

  const onPointerLockError = () => {
    console.error('Pointer lock error');
  };

  useEffect(() => {
    const canvas = gl.domElement;
    
    // Auto-enable pointer lock on first click
    const onClick = () => {
      if (!document.pointerLockElement) {
        canvas.requestPointerLock();
      }
    };

    // Event listeners
    canvas.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('pointerlockerror', onPointerLockError);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Set initial camera position
    camera.position.set(0, 2, 15);
    camera.lookAt(0, 2, 0);

    return () => {
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('pointerlockerror', onPointerLockError);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [gl.domElement, camera, sensitivity, totalFloors, currentFloor, setCurrentFloor]);

  useFrame((state, delta) => {
    if (!isLocked.current) return;

    try {
      velocity.current.x -= velocity.current.x * 10.0 * delta;
      velocity.current.z -= velocity.current.z * 10.0 * delta;
      velocity.current.y -= 9.8 * 100.0 * delta; // gravity

      direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
      direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
      direction.current.normalize();

      if (moveForward.current || moveBackward.current) {
        velocity.current.z -= direction.current.z * 400.0 * delta;
      }
      if (moveLeft.current || moveRight.current) {
        velocity.current.x -= direction.current.x * 400.0 * delta;
      }

      // Apply movement
      const moveVector = new Vector3();
      moveVector.setFromMatrixColumn(camera.matrix, 0);
      moveVector.crossVectors(camera.up, moveVector);
      moveVector.multiplyScalar(-velocity.current.z * delta);
      camera.position.add(moveVector);

      const strafeVector = new Vector3();
      strafeVector.setFromMatrixColumn(camera.matrix, 0);
      strafeVector.multiplyScalar(-velocity.current.x * delta);
      camera.position.add(strafeVector);

      // Enhanced boundaries for museum
      const boundary = 25;
      camera.position.x = Math.max(-boundary, Math.min(boundary, camera.position.x));
      camera.position.z = Math.max(-boundary, Math.min(boundary, camera.position.z));

      // Floor height constraints
      const floorHeight = (currentFloor - 1) * 6 + 2;
      const ceilingHeight = (currentFloor - 1) * 6 + 5;
      
      if (camera.position.y < floorHeight) {
        velocity.current.y = 0;
        camera.position.y = floorHeight;
        canJump.current = true;
      }
      
      if (camera.position.y > ceilingHeight) {
        camera.position.y = ceilingHeight;
        velocity.current.y = 0;
      }
    } catch (error) {
      console.warn('Error in FirstPersonControls:', error);
    }
  });

  return null;
}