// lib/utils/TextureManager.ts
import { Texture, TextureLoader } from 'three';
import * as THREE from 'three';

class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, Texture> = new Map();
  private loader: TextureLoader = new TextureLoader();
  private loadingPromises: Map<string, Promise<Texture | null>> = new Map();
  private maxConcurrentLoads = 8;
  private currentLoads = 0;
  private loadQueue: Array<() => void> = [];

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
    const cacheKey = `${url}_${JSON.stringify(options || {})}`;
    
    // Return cached texture if available
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey)!;
    }

    // Return existing loading promise if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Create loading promise with queue management
    const loadingPromise = new Promise<Texture | null>((resolve) => {
      const loadTexture = () => {
        this.currentLoads++;
        
        this.loader.load(
          url,
          (texture) => {
            // Apply options if provided
            if (options) {
              if (options.wrapS) texture.wrapS = options.wrapS;
              if (options.wrapT) texture.wrapT = options.wrapT;
              if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1]);
            }

            // Optimize texture settings
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBAFormat;
            texture.flipY = false;
            
            this.textureCache.set(cacheKey, texture);
            this.loadingPromises.delete(cacheKey);
            this.currentLoads--;
            this.processQueue();
            resolve(texture);
          },
          undefined,
          (error) => {
            console.warn('Failed to load texture:', url, error);
            this.loadingPromises.delete(cacheKey);
            this.currentLoads--;
            this.processQueue();
            resolve(null);
          }
        );
      };

      if (this.currentLoads < this.maxConcurrentLoads) {
        loadTexture();
      } else {
        this.loadQueue.push(loadTexture);
      }
    });

    this.loadingPromises.set(cacheKey, loadingPromise);
    return loadingPromise;
  }

  private processQueue(): void {
    if (this.loadQueue.length > 0 && this.currentLoads < this.maxConcurrentLoads) {
      const nextLoad = this.loadQueue.shift();
      if (nextLoad) {
        nextLoad();
      }
    }
  }

  disposeTexture(url: string): void {
    const texture = this.textureCache.get(url);
    if (texture) {
      texture.dispose();
      this.textureCache.delete(url);
    }
  }

  disposeAll(): void {
    this.textureCache.forEach((texture) => {
      texture.dispose();
    });
    this.textureCache.clear();
    this.loadingPromises.clear();
    this.loadQueue.length = 0;
    this.currentLoads = 0;
  }

  getCacheSize(): number {
    return this.textureCache.size;
  }
}

export { TextureManager };