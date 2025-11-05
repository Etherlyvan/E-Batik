// components/gallery/GalleryFilter.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';
import { FILTER_OPTIONS } from '@/lib/utils/constants';
import type { Theme } from '@/lib/types';

interface FilterState {
  themes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

interface GalleryFilterProps {
  themes: Theme[];
  filters: FilterState;
<<<<<<< HEAD
  onFilterChange: (key: keyof FilterState, value: string | string[] | number[]) => void;
=======
  onFilterChange: (key: keyof FilterState, value: string | string[] | number | number[]) => void;
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
  onClearFilters: () => void;
}

// Dropdown component dengan perbaikan z-index dan positioning
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  // Calculate dropdown position to prevent cutoff
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = Math.min(240, options.length * 48); // Estimate dropdown height
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen, options.length]);

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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span className={cn(
          "truncate text-sm",
          !value || (Array.isArray(value) && value.length === 0) 
            ? "text-gray-400" 
            : "text-gray-900"
        )}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform text-gray-400 flex-shrink-0 ml-2",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop untuk mobile */}
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown menu */}
          <div 
            className={cn(
              "absolute w-full bg-white border border-gray-300 rounded-lg shadow-2xl max-h-60 overflow-auto z-50",
              dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
            )}
            style={{
              // Ensure dropdown is always visible
              minWidth: '100%',
              maxWidth: '400px'
            }}
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              <div className="py-1">
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
                        "w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm transition-colors",
                        isSelected && "bg-amber-50 text-amber-700 font-medium"
                      )}
                    >
                      <span className="truncate pr-2">{option.name}</span>
                      {multiple && isSelected && (
                        <div className="w-4 h-4 bg-amber-600 rounded-sm flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-sm" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FilterIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {isIndonesian ? 'Filter Pencarian' : 'Search Filters'}
          </h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 transition-all duration-200"
          >
            <X className="w-4 h-4 mr-1" />
            {isIndonesian ? 'Hapus Semua' : 'Clear All'}
          </Button>
        )}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dropdown
          label={isIndonesian ? 'Tema Batik' : 'Batik Theme'}
          value={filters.themes.map(String)}
          options={themeOptions}
          onChange={(value) => onFilterChange('themes', Array.isArray(value) ? value.map(Number) : [])}
          multiple
          placeholder={isIndonesian ? 'Pilih tema...' : 'Select themes...'}
        />

        <Dropdown
          label={isIndonesian ? 'Tahun Pembuatan' : 'Year Created'}
          value={filters.year}
          options={yearOptions}
          onChange={(value) => onFilterChange('year', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih tahun...' : 'Select year...'}
        />

        <Dropdown
          label={isIndonesian ? 'Teknik Pembuatan' : 'Production Technique'}
          value={filters.technique}
          options={techniqueOptions}
          onChange={(value) => onFilterChange('technique', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih teknik...' : 'Select technique...'}
        />

        <Dropdown
          label={isIndonesian ? 'Jenis Pewarna' : 'Dye Type'}
          value={filters.dye}
          options={dyeOptions}
          onChange={(value) => onFilterChange('dye', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih pewarna...' : 'Select dye...'}
        />

        <Dropdown
          label={isIndonesian ? 'Bentuk Motif' : 'Pattern Shape'}
          value={filters.shape}
          options={shapeOptions}
          onChange={(value) => onFilterChange('shape', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih bentuk...' : 'Select shape...'}
        />

        <Dropdown
          label={isIndonesian ? 'Jenis Kain' : 'Fabric Type'}
          value={filters.fabricType}
          options={fabricOptions}
          onChange={(value) => onFilterChange('fabricType', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih jenis kain...' : 'Select fabric...'}
        />
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600">
              {isIndonesian ? 'Filter Aktif:' : 'Active Filters:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.themes.length > 0 && (
              <div className="inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm border border-amber-200">
                <span className="font-medium">
                  {isIndonesian ? 'Tema:' : 'Themes:'} {filters.themes.length}
                </span>
                <button
                  onClick={() => onFilterChange('themes', [])}
                  className="ml-2 hover:text-amber-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.year && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200">
                <span className="font-medium">
                  {isIndonesian ? 'Tahun:' : 'Year:'} {filters.year}
                </span>
                <button
                  onClick={() => onFilterChange('year', '')}
                  className="ml-2 hover:text-blue-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.technique && (
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm border border-green-200">
                <span className="font-medium">
                  {isIndonesian ? 'Teknik:' : 'Technique:'} {filters.technique}
                </span>
                <button
                  onClick={() => onFilterChange('technique', '')}
                  className="ml-2 hover:text-green-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.dye && (
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm border border-purple-200">
                <span className="font-medium">
                  {isIndonesian ? 'Pewarna:' : 'Dye:'} {filters.dye}
                </span>
                <button
                  onClick={() => onFilterChange('dye', '')}
                  className="ml-2 hover:text-purple-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.shape && (
              <div className="inline-flex items-center bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm border border-pink-200">
                <span className="font-medium">
                  {isIndonesian ? 'Bentuk:' : 'Shape:'} {filters.shape}
                </span>
                <button
                  onClick={() => onFilterChange('shape', '')}
                  className="ml-2 hover:text-pink-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.fabricType && (
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm border border-indigo-200">
                <span className="font-medium">
                  {isIndonesian ? 'Kain:' : 'Fabric:'} {filters.fabricType}
                </span>
                <button
                  onClick={() => onFilterChange('fabricType', '')}
                  className="ml-2 hover:text-indigo-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Statistics */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 text-center">
            {isIndonesian 
              ? `${Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length} filter aktif`
              : `${Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length} active filters`
            }
          </div>
        </div>
      )}
    </div>
  );
}