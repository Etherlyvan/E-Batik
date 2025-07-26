// lib/utils/MuseumTextureManager.ts
import { TextureLoader } from 'three';
import * as THREE from 'three';

export class MuseumTextureManager {
  private static instance: MuseumTextureManager;
  private textureCache: Map<string, THREE.Texture> = new Map();
  private loader: TextureLoader = new TextureLoader();

  static getInstance(): MuseumTextureManager {
    if (!MuseumTextureManager.instance) {
      MuseumTextureManager.instance = new MuseumTextureManager();
    }
    return MuseumTextureManager.instance;
  }

  async loadTexture(url: string, repeat: [number, number] = [1, 1]): Promise<THREE.Texture | null> {
    const cacheKey = `${url}_${repeat[0]}_${repeat[1]}`;
    
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey)!;
    }

    return new Promise((resolve) => {
      this.loader.load(
        url,
        (texture) => {
          // Configure texture
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(repeat[0], repeat[1]);
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          
          this.textureCache.set(cacheKey, texture);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.warn('Failed to load texture:', url, error);
          resolve(null);
        }
      );
    });
  }

  disposeAll(): void {
    this.textureCache.forEach((texture) => {
      texture.dispose();
    });
    this.textureCache.clear();
  }
}