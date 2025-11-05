// 🌐 LANGUAGE FEATURE - Language selector dropdown
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';

export function LanguageSelector() {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: typeof currentLanguage) => {
    if (language.code === 'jp') {
      // Show coming soon message for Japanese
      alert('Japanese language support is coming soon!');
      return;
    }
    
    setLanguage(language);
    setIsOpen(false);
  };

  const getFlagSrc = (code: string) => {
    const flagMap: Record<string, string> = {
      'id': '/flags/id.png',
      'en': '/flags/us.png', // Using US flag for English
      'jp': '/flags/jp.png',
    };
    return flagMap[code] || '/flags/default.png';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
          "bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isOpen && "ring-2 ring-blue-500 ring-offset-2"
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="relative w-5 h-5">
            <Image
              src={getFlagSrc(currentLanguage.code)}
              alt={currentLanguage.name}
              fill
              className="object-cover rounded-sm"
              sizes="20px"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage.code.toUpperCase()}
          </span>
        </div>
        
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="py-2">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  disabled={language.code === 'jp'}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors",
                    "hover:bg-gray-50 focus:outline-none focus:bg-gray-50",
                    currentLanguage.code === language.code && "bg-blue-50 text-blue-700",
                    language.code === 'jp' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src={getFlagSrc(language.code)}
                      alt={language.name}
                      fill
                      className="object-cover rounded-sm"
                      sizes="20px"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {language.name}
                      </span>
                      {language.code === 'jp' && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language.code.toUpperCase()}
                    </div>
                  </div>
                  
                  {currentLanguage.code === language.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Globe className="w-3 h-3" />
                <span>Language Settings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}