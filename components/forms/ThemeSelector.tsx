// 🎨 THEME FEATURE - Theme and sub-theme selector component
'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Theme } from '@/lib/types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedThemes: number[];
  onThemeChange: (themeIds: number[]) => void;
}

export function ThemeSelector({ 
  themes, 
  selectedThemes, 
  onThemeChange 
}: ThemeSelectorProps) {
  const [expandedThemes, setExpandedThemes] = useState<number[]>([]);
  const [selectedSubThemes, setSelectedSubThemes] = useState<number[]>([]);

  // Auto-expand selected themes
  useEffect(() => {
    setExpandedThemes(selectedThemes);
  }, [selectedThemes]);

  const toggleTheme = (themeId: number) => {
    const isSelected = selectedThemes.includes(themeId);
    
    if (isSelected) {
      // Remove theme and its sub-themes
      const newSelectedThemes = selectedThemes.filter(id => id !== themeId);
      const theme = themes.find(t => t.id === themeId);
      const subThemeIds = theme?.subTema?.map(st => st.id) || [];
      const newSelectedSubThemes = selectedSubThemes.filter(
        id => !subThemeIds.includes(id)
      );
      
      setSelectedSubThemes(newSelectedSubThemes);
      onThemeChange(newSelectedThemes);
    } else {
      // Add theme
      const newSelectedThemes = [...selectedThemes, themeId];
      onThemeChange(newSelectedThemes);
    }
  };

  const toggleSubTheme = (subThemeId: number) => {
    const isSelected = selectedSubThemes.includes(subThemeId);
    
    if (isSelected) {
      setSelectedSubThemes(prev => prev.filter(id => id !== subThemeId));
    } else {
      setSelectedSubThemes(prev => [...prev, subThemeId]);
    }
  };

  const toggleExpanded = (themeId: number) => {
    setExpandedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Themes</h3>
      
      <div className="space-y-2">
        {themes.map((theme) => (
          <div key={theme.id} className="border rounded-lg p-3">
            {/* Theme Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`theme-${theme.id}`}
                  checked={selectedThemes.includes(theme.id)}
                  onChange={() => toggleTheme(theme.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`theme-${theme.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {theme.translations[0]?.nama || theme.nama}
                </label>
              </div>
              
              {theme.subTema && theme.subTema.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleExpanded(theme.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedThemes.includes(theme.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Sub-themes */}
            {expandedThemes.includes(theme.id) && 
             theme.subTema && 
             theme.subTema.length > 0 && (
              <div className="mt-3 ml-7 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {theme.subTema.map((subTheme) => (
                    <div key={subTheme.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`subtheme-${subTheme.id}`}
                        checked={selectedSubThemes.includes(subTheme.id)}
                        onChange={() => toggleSubTheme(subTheme.id)}
                        disabled={!selectedThemes.includes(theme.id)}
                        className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <label
                        htmlFor={`subtheme-${subTheme.id}`}
                        className={cn(
                          "text-sm cursor-pointer",
                          !selectedThemes.includes(theme.id) && "text-gray-400"
                        )}
                      >
                        {subTheme.translations[0]?.nama || subTheme.nama}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}