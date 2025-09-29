// lib/hooks/gallery/useGalleryFilters.ts
'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface FilterState {
  themes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

interface UseGalleryFiltersProps {
  batiks: Batik[];
  searchTerm: string;
}

export function useGalleryFilters({ batiks, searchTerm }: UseGalleryFiltersProps) {
  const { currentLanguage } = useLanguage();
  
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    year: '',
    technique: '',
    dye: '',
    shape: '',
    fabricType: '',
  });

  const filteredBatiks = useMemo(() => {
    return batiks.filter((batik) => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        batik.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batik.seniman?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batik.alamat?.toLowerCase().includes(searchTerm.toLowerCase());

      // Theme filters
      const matchesTheme = filters.themes.length === 0 ||
        batik.tema.some(tema => filters.themes.includes(tema.id));

      // Year filter
      const matchesYear = !filters.year || batik.tahun.includes(filters.year);

      // Translation-based filters
      const translation = batik.translations.find(
        t => t.languageId === currentLanguage.id
      ) || batik.translations[0];
      
      if (!translation) return matchesSearch && matchesTheme && matchesYear;

      const matchesTechnique = !filters.technique || 
        translation.teknik.toLowerCase().includes(filters.technique.toLowerCase());
      const matchesDye = !filters.dye || 
        translation.pewarna.toLowerCase().includes(filters.dye.toLowerCase());
      const matchesShape = !filters.shape || 
        translation.bentuk.toLowerCase().includes(filters.shape.toLowerCase());
      const matchesFabricType = !filters.fabricType || 
        translation.jenisKain.toLowerCase().includes(filters.fabricType.toLowerCase());

      return matchesSearch && matchesTheme && matchesYear && 
             matchesTechnique && matchesDye && matchesShape && matchesFabricType;
    });
  }, [batiks, searchTerm, filters, currentLanguage.id]);

  const updateFilter = (key: keyof FilterState, value: string | string[] | number | number[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      themes: [],
      year: '',
      technique: '',
      dye: '',
      shape: '',
      fabricType: '',
    });
  };

  return {
    filteredBatiks,
    filters,
    updateFilter,
    clearFilters,
  };
}