// components/layout/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export function Footer() {
  const { currentLanguage } = useLanguage();

  const partnerLogos = [
    { 
      src: '/images/LogoApp.png', 
      alt: 'Batik Sphere',
      width: 90,
      height: 90,
      className: 'w-[90px] sm:w-[90px] md:w-[80px]'
    },
    { 
      src: '/images/LogoLIH 1.png', 
      alt: 'LIH',
      width: 90,
      height: 90,
      className: 'w-[90px] sm:w-[90px] md:w-[60px]'
    },
    { 
      src: '/images/LogoUB.png', 
      alt: 'Universitas Brawijaya',
      width: 60,
      height: 60,
      className: 'w-[60px] sm:w-[60px] md:w-[60px]'
    },
    { 
      src: '/images/LogoRU 1.png', 
      alt: 'Ritsumeikan University',
      width: 50,
      height: 60,
      className: 'w-[50px] sm:w-[60px] md:w-[30px]'
    }
  ];

  return (
    <footer className="bg-[#CAC4B8] text-[#3A3A3A] py-8 px-4 md:px-16 w-full font-[Poppins, sans-serif]">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Left Section */}
          <div className="flex flex-col items-start mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">Batik Sphere</h2>
            <p className="text-sm max-w-md leading-relaxed">
              {currentLanguage.code === 'id'
                ? "Melestarikan dan merayakan warisan budaya batik Indonesia melalui inovasi digital dan eksplorasi budaya."
                : currentLanguage.code === 'en'
                ? "Preserving and celebrating the rich heritage of Indonesian batik through digital innovation and cultural exploration."
                : "デジタルイノベーションと文化探求を通じて、インドネシアバティックの豊かな遺産を保存し祝福します。"
              }
            </p>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={logo.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain ${logo.className}`}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E1AD01] pt-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-[#3A3A3A] font-medium">
              Copyright &copy; 2025 Batik Sphere. All Rights Reserved.
            </p>
            <ul className="flex space-x-6 font-medium">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200 hover:underline"
                >
                  {currentLanguage.code === 'id' ? 'Kebijakan Privasi' : 
                   currentLanguage.code === 'en' ? 'Privacy Policy' : 
                   'プライバシーポリシー'}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200 hover:underline"
                >
                  {currentLanguage.code === 'id' ? 'Syarat Layanan' : 
                   currentLanguage.code === 'en' ? 'Terms of Service' : 
                   '利用規約'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}