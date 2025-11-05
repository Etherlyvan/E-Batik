// components/batik/BatikDetailClient.tsx (tambahkan loading state jika diperlukan)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikImageSlider } from './BatikImageSlider';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Batik } from '@/lib/types';

interface BatikDetailClientProps {
  batik: Batik;
}

export function BatikDetailClient({ batik }: BatikDetailClientProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  // Get translation for current language
  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  const handleBackClick = () => {
    setIsNavigating(true);
    router.push('/gallery');
  };

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-[#E5D387] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="secondary" />
          <p className="text-amber-800 text-lg font-medium">
            {isIndonesian ? 'Kembali ke galeri...' : 'Returning to gallery...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen bg-[#E5D387]">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 z-20 flex items-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 shadow-md transition-colors"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2" />
        {isIndonesian ? 'Kembali ke Galeri' : 'Back to Gallery'}
      </button>

      {/* Rest of the component remains the same... */}
      {/* Image Column */}
      <div className="flex-1">
        <BatikImageSlider images={batik.foto} />
      </div>

      {/* Detail Column */}
      <div
        className={`flex-1 flex flex-col ${
          showDetails ? 'justify-start' : 'justify-center'
        } p-12 bg-gray-100 overflow-y-auto max-h-screen`}
        style={{
          backgroundImage: "url('/images/old-papper-texture-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Rest of your existing detail content... */}
        <div className="pt-8 space-y-6">
          <h1 className="text-3xl font-bold text-amber-900">{batik.nama}</h1>

          {batik.seniman && (
            <div className="bg-amber-50 p-4 rounded-xl shadow-md w-fit border border-amber-200">
              <div className="text-lg text-amber-800">
                <p className="font-medium">{isIndonesian ? 'Dibuat Oleh' : 'Made By'}</p>
                <p className="text-xl font-serif font-semibold border-b-2 border-amber-300 pb-2 mb-4 text-amber-900">
                  📍 {batik.seniman}
                </p>
                {batik.alamat && (
                  <p className="mt-5 text-amber-700">{batik.alamat}</p>
                )}
              </div>
            </div>
          )}

          {translation && (
            <p className="text-lg text-amber-800">{translation.histori}</p>
          )}

          <button
            className="flex items-center bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                {isIndonesian ? 'Sembunyikan Deskripsi' : 'Hide Description'}
                <ArrowLeft className="ml-2" />
              </>
            ) : (
              <>
                {isIndonesian ? 'Deskripsi Lengkap' : 'Full Description'}
                <ArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Full Details section with updated colors */}
        {showDetails && (
          <div className="mt-6 space-y-6">
            {/* Themes and Sub-themes */}
            <div className="space-y-4">
              {batik.tema.map((tema) => {
                const temaTranslation = tema.translations.find(
                  (translation) => translation.languageId === currentLanguage.id
                ) || tema.translations[0];

                const relatedSubTema = batik.subTema.filter(
                  (subTema) => subTema.temaId === tema.id
                );

                return (
                  <div
                    key={tema.id}
                    className="bg-amber-50 shadow-lg rounded-lg p-6 border border-amber-200"
                  >
                    <h3 className="text-xl font-serif font-semibold border-b-2 border-amber-300 pb-2 mb-4 text-amber-900">
                      {isIndonesian ? 'Tema: ' : 'Theme: '}
                      {temaTranslation?.nama || tema.nama}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {relatedSubTema.map((subTema) => {
                        const subTemaTranslation = subTema.translations.find(
                          (translation) => translation.languageId === currentLanguage.id
                        ) || subTema.translations[0];
                        
                        return (
                          <li
                            key={subTema.id}
                            className="bg-white p-3 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow duration-300"
                          >
                            <span className="text-amber-800">
                              {subTemaTranslation?.nama || subTema.nama}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Technical Information with updated colors */}
            {translation && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🎨', label: isIndonesian ? 'Warna: ' : 'Color: ', value: translation.warna },
                  { icon: '🛠️', label: isIndonesian ? 'Teknik: ' : 'Technique: ', value: translation.teknik },
                  { icon: '🧵', label: isIndonesian ? 'Jenis Kain: ' : 'Fabric Type: ', value: translation.jenisKain },
                  { icon: '🌈', label: isIndonesian ? 'Pewarna: ' : 'Dye: ', value: translation.pewarna },
                  { icon: '🔺', label: isIndonesian ? 'Bentuk: ' : 'Shape: ', value: translation.bentuk },
                  { icon: '📏', label: isIndonesian ? 'Dimensi: ' : 'Dimension: ', value: batik.dimensi },
                ].map((item, index) => (
                  <div key={index} className="bg-amber-50 shadow-lg rounded-lg p-6 border border-amber-200 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-serif font-semibold flex items-center text-amber-900">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </h3>
                    <p className="mt-2 text-amber-700">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}