// lib/stores/museumStore.ts
import { create } from 'zustand';
import type { Batik } from '@/lib/types';

interface MuseumState {
  currentFloor: number;
  selectedBatik: Batik | null;
  batiks: Batik[];
  isViewingBatik: boolean;
  floorBatiks: Record<number, Batik[]>;
  totalFloors: number;
  
  setCurrentFloor: (floor: number) => void;
  setSelectedBatik: (batik: Batik | null) => void;
  setBatiks: (batiks: Batik[]) => void;
  setIsViewingBatik: (viewing: boolean) => void;
  getBatiksByFloor: (floor: number) => Batik[];
  getTotalBatiks: () => number;
  getFloorStats: () => Record<number, number>;
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  currentFloor: 1,
  selectedBatik: null,
  batiks: [],
  isViewingBatik: false,
  floorBatiks: {},
  totalFloors: 3,

  setCurrentFloor: (floor) => set({ currentFloor: floor }),
  
  setSelectedBatik: (batik) => set({ 
    selectedBatik: batik,
    isViewingBatik: !!batik 
  }),
  
  setBatiks: (batiks) => {
    // Distribute batiks across floors more evenly
    const floorBatiks: Record<number, Batik[]> = {};
    const batiksPerFloor = 20; // Increased from 12 to 20
    const totalFloors = Math.ceil(batiks.length / batiksPerFloor);
    
    // Initialize all floors
    for (let i = 1; i <= Math.max(3, totalFloors); i++) {
      floorBatiks[i] = [];
    }
    
    // Distribute batiks
    batiks.forEach((batik, index) => {
      const floor = Math.floor(index / batiksPerFloor) + 1;
      if (floorBatiks[floor]) {
        floorBatiks[floor].push(batik);
      }
    });
    
    console.log('Batik distribution:', floorBatiks); // Debug log
    
    set({ 
      batiks, 
      floorBatiks,
      totalFloors: Math.max(3, totalFloors)
    });
  },
  
  setIsViewingBatik: (viewing) => set({ isViewingBatik: viewing }),
  
  getBatiksByFloor: (floor) => {
    const state = get();
    return state.floorBatiks[floor] || [];
  },

  getTotalBatiks: () => {
    const state = get();
    return state.batiks.length;
  },

  getFloorStats: () => {
    const state = get();
    const stats: Record<number, number> = {};
    Object.keys(state.floorBatiks).forEach(floor => {
      stats[parseInt(floor)] = state.floorBatiks[parseInt(floor)].length;
    });
    return stats;
  },
}));