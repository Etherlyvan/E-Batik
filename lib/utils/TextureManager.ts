// lib/utils/TextureManager.ts
import { Texture, TextureLoader } from 'three';
import * as THREE from 'three';

class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, Texture> = new Map();
  private loader: TextureLoader = new TextureLoader();
  private loadingPromises: Map<string, Promise<Texture | null>> = new Map();

  static getInstance(): TextureManager {
    if (!TextureManager.instance) {
      TextureManager.instance = new TextureManager();
    }
    return TextureManager.instance;
  }

  async loadTexture(url: string, options?: {
    wrapS?: THREE.Wrapping;
    wrapT?: THREE.Wrapping;
    repeat?: [number, number];
  }): Promise<Texture | null> {
    if (!url) {
      console.warn('TextureManager: Empty URL provided');
      return null;
    }

    const cacheKey = `${url}_${JSON.stringify(options || {})}`;
    
    // Return cached texture if available
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey)!;
    }

    // Return existing loading promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Create loading promise
    const loadingPromise = new Promise<Texture | null>((resolve) => {
      this.loader.load(
        url,
        (texture) => {
          try {
            // Apply options if provided
            if (options) {
              if (options.wrapS) texture.wrapS = options.wrapS;
              if (options.wrapT) texture.wrapT = options.wrapT;
              if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1]);
            }

            // Optimize texture settings
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            texture.flipY = false;
            
            this.textureCache.set(cacheKey, texture);
            this.loadingPromises.delete(cacheKey);
            resolve(texture);
          } catch (error) {
            console.error('Error processing texture:', url, error);
            this.loadingPromises.delete(cacheKey);
            resolve(null);
          }
        },
        undefined,
        (error) => {
          console.warn('Failed to load texture:', url, error);
          this.loadingPromises.delete(cacheKey);
          resolve(null);
        }
      );
    });

    this.loadingPromises.set(cacheKey, loadingPromise);
    return loadingPromise;
  }

  disposeAll(): void {
    this.textureCache.forEach((texture) => {
      try {
        texture.dispose();
      } catch (error) {
        console.warn('Error disposing texture:', error);
      }
    });
    this.textureCache.clear();
    this.loadingPromises.clear();
  }

  getCacheSize(): number {
    return this.textureCache.size;
  }
}

export { TextureManager };