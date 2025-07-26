// components/gallery/GalleryFilter.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';
import { FILTER_OPTIONS } from '@/lib/utils/constants';
import type { Theme } from '@/lib/types';

interface FilterState {
  themes: number[];
  subThemes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

interface GalleryFilterProps {
  themes: Theme[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
}

// Dropdown component
interface DropdownProps {
  label: string;
  value: string | string[];
  options: Array<{ id: string | number; name: string }>;
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

function Dropdown({ 
  label, 
  value, 
  options, 
  onChange, 
  multiple = false, 
  placeholder = "Select..." 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => String(opt.id) === value[0]);
        return option?.name || placeholder;
      }
      return `${value.length} selected`;
    }
    
    if (!value) return placeholder;
    const option = options.find(opt => String(opt.id) === value);
    return option?.name || placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className={cn(
          "truncate",
          !value || (Array.isArray(value) && value.length === 0) 
            ? "text-gray-400" 
            : "text-gray-900"
        )}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => {
            const isSelected = multiple
              ? Array.isArray(value) && value.includes(String(option.id))
              : value === String(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(String(option.id))}
                className={cn(
                  "w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center justify-between",
                  isSelected && "bg-blue-50 text-blue-700"
                )}
              >
                <span>{option.name}</span>
                {multiple && isSelected && (
                  <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function GalleryFilter({ 
  themes, 
  filters, 
  onFilterChange, 
  onClearFilters 
}: GalleryFilterProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const themeOptions = themes.map(theme => ({
    id: theme.id,
    name: theme.translations.find(t => t.languageId === currentLanguage.id)?.nama || theme.nama,
  }));

  const subThemeOptions = themes
    .filter(theme => filters.themes.includes(theme.id))
    .flatMap(theme => 
      theme.subTema?.map(subTheme => ({
        id: subTheme.id,
        name: subTheme.translations.find(t => t.languageId === currentLanguage.id)?.nama || subTheme.nama,
      })) || []
    );

  const yearOptions = Array.from({ length: 25 }, (_, i) => ({
    id: 2000 + i,
    name: String(2000 + i),
  }));

  const techniqueOptions = FILTER_OPTIONS.TECHNIQUES.map(tech => ({
    id: tech,
    name: tech,
  }));

  const dyeOptions = FILTER_OPTIONS.DYES.map(dye => ({
    id: dye,
    name: dye,
  }));

  const shapeOptions = FILTER_OPTIONS.SHAPES.map(shape => ({
    id: shape,
    name: shape,
  }));

  const fabricOptions = FILTER_OPTIONS.FABRIC_TYPES.map(fabric => ({
    id: fabric,
    name: fabric,
  }));

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">
          {isIndonesian ? 'Filter' : 'Filters'}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X className="w-4 h-4 mr-1" />
            {isIndonesian ? 'Hapus Semua' : 'Clear All'}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Dropdown
          label={isIndonesian ? 'Tema' : 'Theme'}
          value={filters.themes.map(String)}
          options={themeOptions}
          onChange={(value) => onFilterChange('themes', Array.isArray(value) ? value.map(Number) : [])}
          multiple
          placeholder={isIndonesian ? 'Pilih tema' : 'Select themes'}
        />

        <Dropdown
          label={isIndonesian ? 'Sub Tema' : 'Sub Theme'}
          value={filters.subThemes.map(String)}
          options={subThemeOptions}
          onChange={(value) => onFilterChange('subThemes', Array.isArray(value) ? value.map(Number) : [])}
          multiple
          placeholder={isIndonesian ? 'Pilih sub tema' : 'Select sub themes'}
        />

        <Dropdown
          label={isIndonesian ? 'Tahun' : 'Year'}
          value={filters.year}
          options={yearOptions}
          onChange={(value) => onFilterChange('year', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih tahun' : 'Select year'}
        />

        <Dropdown
          label={isIndonesian ? 'Teknik' : 'Technique'}
          value={filters.technique}
          options={techniqueOptions}
          onChange={(value) => onFilterChange('technique', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih teknik' : 'Select technique'}
        />

        <Dropdown
          label={isIndonesian ? 'Pewarna' : 'Dye'}
          value={filters.dye}
          options={dyeOptions}
          onChange={(value) => onFilterChange('dye', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih pewarna' : 'Select dye'}
        />

        <Dropdown
          label={isIndonesian ? 'Bentuk' : 'Shape'}
          value={filters.shape}
          options={shapeOptions}
          onChange={(value) => onFilterChange('shape', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih bentuk' : 'Select shape'}
        />

        <Dropdown
          label={isIndonesian ? 'Jenis Kain' : 'Fabric Type'}
          value={filters.fabricType}
          options={fabricOptions}
          onChange={(value) => onFilterChange('fabricType', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih jenis kain' : 'Select fabric'}
        />
      </div>
    </div>
  );
}