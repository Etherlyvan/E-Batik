// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { currentLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { 
      href: '/', 
      label: currentLanguage.code === 'id' ? 'Beranda' : 
             currentLanguage.code === 'en' ? 'Home' : 
             'ホーム'
    },
    { 
      href: '/gallery', 
      label: currentLanguage.code === 'id' ? 'Galeri' : 
             currentLanguage.code === 'en' ? 'Gallery' : 
             'ギャラリー'
    },
    { 
      href: '/museum', 
      label: currentLanguage.code === 'id' ? 'Museum 3D' : 
             currentLanguage.code === 'en' ? '3D Museum' : 
             '3Dミュージアム'
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#cac4b8] backdrop-blur-md shadow-lg fixed w-full top-0 z-50 py-1"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/LogoApp.png"
                  alt="Batik Sphere"
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-[#5a2b2b] hidden sm:block">
                Batik Sphere
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Nav Links */}
            <div className="flex items-center space-x-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="relative group">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isActive(href) 
                        ? "text-[#5a2b2b]" 
                        : "text-[#5a2b2b] hover:text-[#c4a484]"
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-[#c4a484] transform origin-left transition-transform duration-300",
                      isActive(href) 
                        ? "scale-x-100" 
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/add-batik">
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-[#5a2b2b] hover:bg-[#c4a484] text-[#e5d0b5] hover:text-[#5a2b2b]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {currentLanguage.code === 'id' ? 'Tambah Batik' : 
                       currentLanguage.code === 'en' ? 'Add Batik' : 
                       'バティック追加'}
                    </Button>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-[#5a2b2b] hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {currentLanguage.code === 'id' ? 'Keluar' : 
                     currentLanguage.code === 'en' ? 'Logout' : 
                     'ログアウト'}
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-[#5a2b2b] hover:bg-[#c4a484] text-[#e5d0b5] hover:text-[#5a2b2b]"
                  >
                    {currentLanguage.code === 'id' ? 'Masuk' : 
                     currentLanguage.code === 'en' ? 'Sign In' : 
                     'ログイン'}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-[#5a2b2b] hover:text-red-600 p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
            
            <LanguageSelector />
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#5a2b2b] hover:text-[#c4a484] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#e5d0b5] shadow-lg border-t border-[#5a2b2b]"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive(href)
                    ? "text-[#5a2b2b] bg-[#c4a484]"
                    : "text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5]"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-[#5a2b2b]">
              {user ? (
                <Link
                  href="/add-batik"
                  className="block px-3 py-2 text-base font-medium text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-4 h-4 mr-2 inline" />
                  {currentLanguage.code === 'id' ? 'Tambah Batik' : 
                   currentLanguage.code === 'en' ? 'Add Batik' : 
                   'バティック追加'}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {currentLanguage.code === 'id' ? 'Masuk' : 
                   currentLanguage.code === 'en' ? 'Sign In' : 
                   'ログイン'}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}