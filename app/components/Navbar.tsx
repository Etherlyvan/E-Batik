'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import LanguageSelector from './gallery/components/LanguageSelector';
import Image from 'next/image';

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#cac4b8] backdrop-blur-md shadow-lg fixed w-full top-0 z-50 py-1"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/vercel.svg"
                            alt="Logo"
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                            priority
                        />

                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex sm:items-center sm:space-x-8">
                    {/* Links (Home, Gallery) */}
                    {[
                        { href: '/', label: 'Home' },
                        { href: '/gallery', label: 'Gallery' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="relative group"
                        >
                            <span
                                className={`text-sm font-medium transition-colors duration-300 ${
                                    isActive(href)
                                        ? 'text-indigo-600'
                                        : 'text-gray-600 hover:text-indigo-600'
                                }`}
                            >
                                {label}
                            </span>
                            <span
                                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 transform origin-left transition-transform duration-300 ${
                                    isActive(href)
                                        ? 'scale-x-100'
                                        : 'scale-x-0 group-hover:scale-x-100'
                                }`}
                            />
                        </Link>
                    ))}

                    {/* Language Selector */}
                    <div className="ml-auto">
                        <LanguageSelector />
                    </div>

                    {/* Logout Button */}
                    {user && (
                        <motion.button
                            onClick={logout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center space-x-2 px-4 py-2 rounded-full
                            bg-gradient-to-r from-indigo-600 to-purple-600
                            text-white font-medium text-sm
                            transition-all duration-300
                            hover:shadow-lg hover:shadow-indigo-500/30
                            active:shadow-none"
                        >
                            <span>Logout</span>
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </motion.button>
                    )}
                </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden flex items-center space-x-4">
                        {user && (
                            <motion.button
                                onClick={logout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center space-x-1 px-3 py-1.5 rounded-full
                          bg-gradient-to-r from-indigo-600 to-purple-600
                          text-white text-sm
                          transition-all duration-300
                          hover:shadow-lg hover:shadow-indigo-500/30
                          active:shadow-none"
                            >
                                <span>Logout</span>
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </motion.button>
                        )}

                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-300"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden bg-white shadow-md border-t border-gray-200">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {[
                            { href: '/', label: 'Home' },
                            { href: '/gallery', label: 'Gallery' },
                        ].map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive(href)
                                        ? 'text-indigo-600 bg-indigo-50'
                                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                                }`}
                            >
                                {label}
                            </Link>
                        ))}

                        <LanguageSelector />
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
