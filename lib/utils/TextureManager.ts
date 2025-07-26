// lib/utils/TextureManager.ts - Enhanced with progress tracking
import { Texture, TextureLoader } from 'three';

class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, Texture> = new Map();
  private loader: TextureLoader = new TextureLoader();
  private loadingPromises: Map<string, Promise<Texture | null>> = new Map();
  private progressCallbacks: Set<(loaded: number, total: number) => void> = new Set();
  private totalToLoad = 0;
  private totalLoaded = 0;

  static getInstance(): TextureManager {
    if (!TextureManager.instance) {
      TextureManager.instance = new TextureManager();
    }
    return TextureManager.instance;
  }

  onProgress(callback: (loaded: number, total: number) => void): () => void {
    this.progressCallbacks.add(callback);
    return () => this.progressCallbacks.delete(callback);
  }

  private notifyProgress() {
    this.progressCallbacks.forEach(callback => {
      callback(this.totalLoaded, this.totalToLoad);
    });
  }

  async loadTexture(url: string): Promise<Texture | null> {
    // Return cached texture if available
    if (this.textureCache.has(url)) {
      return this.textureCache.get(url)!;
    }

    // Return existing loading promise if already loading
    if (this.loadingPromises.has(url)) {
      return this.loadingPromises.get(url)!;
    }

    // Increment total to load
    this.totalToLoad++;

    // Create new loading promise
    const loadingPromise = new Promise<Texture | null>((resolve) => {
      this.loader.load(
        url,
        (texture) => {
          // Optimize texture settings
          texture.generateMipmaps = false;
          texture.minFilter = 1006; // LinearFilter
          texture.magFilter = 1006; // LinearFilter
          
          this.textureCache.set(url, texture);
          this.loadingPromises.delete(url);
          this.totalLoaded++;
          this.notifyProgress();
          resolve(texture);
        },
        undefined,
        (error) => {
          console.warn('Failed to load texture:', url, error);
          this.loadingPromises.delete(url);
          this.totalLoaded++;
          this.notifyProgress();
          resolve(null);
        }
      );
    });

    this.loadingPromises.set(url, loadingPromise);
    return loadingPromise;
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
    this.totalLoaded = 0;
    this.totalToLoad = 0;
  }

  getCacheSize(): number {
    return this.textureCache.size;
  }

  getProgress(): { loaded: number; total: number } {
    return {
      loaded: this.totalLoaded,
      total: this.totalToLoad
    };
  }
}

export { TextureManager };