// components/batik/BatikDetailClient.tsx (tambahkan loading state jika diperlukan)
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikImageSlider } from './BatikImageSlider';
import type { Batik } from '@/lib/types';

interface BatikDetailClientProps {
  batik: Batik;
}

export function BatikDetailClient({ batik }: BatikDetailClientProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  // Get translation for current language with memoization
  const translation = useMemo(() => {
    return batik.translations.find(
      t => t.languageId === currentLanguage.id
    ) || batik.translations[0];
  }, [batik.translations, currentLanguage.id]);

  const handleBackClick = () => {
    router.push('/gallery');
  };

  // Structured Data untuk batik detail
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": batik.nama,
    "description": translation?.histori || '',
    "image": batik.foto.map(foto => foto.link),
    "creator": {
      "@type": "Person",
      "name": batik.seniman || 'Unknown Artist'
    },
    "dateCreated": batik.tahun,
    "locationCreated": {
      "@type": "Place",
      "name": batik.alamat || 'Indonesia'
    },
    "material": translation?.jenisKain || '',
    "technique": translation?.teknik || '',
    "artMedium": "Textile Art",
    "artform": "Batik",
    "genre": "Traditional Indonesian Art",
    "inLanguage": ["id-ID", "en-US"],
    "keywords": [
      batik.nama,
      batik.seniman,
      translation?.teknik,
      translation?.warna,
      ...batik.tema.map(tema => tema.nama)
    ].filter(Boolean).join(', '),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://batikpedia.cloud/batik/${batik.id}`
    },
    "provider": {
      "@type": "Organization",
      "name": "BatikPedia",
      "url": "https://batikpedia.cloud"
    }
  };
  return (
    <div className="relative flex h-screen w-screen bg-[#E5D387]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 z-20 flex items-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 shadow-md transition-colors"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2" />
        {currentLanguage.code === 'id' ? 'Kembali ke Galeri' : 
         currentLanguage.code === 'en' ? 'Back to Gallery' : 
         'ギャラリーに戻る'}
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
                <p className="font-medium">
                  {currentLanguage.code === 'id' ? 'Dibuat Oleh' : 
                   currentLanguage.code === 'en' ? 'Made By' : 
                   '作者'}
                </p>
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
                {currentLanguage.code === 'id' ? 'Sembunyikan Deskripsi' : 
                 currentLanguage.code === 'en' ? 'Hide Description' : 
                 '説明を隠す'}
                <ArrowLeft className="ml-2" />
              </>
            ) : (
              <>
                {currentLanguage.code === 'id' ? 'Deskripsi Lengkap' : 
                 currentLanguage.code === 'en' ? 'Full Description' : 
                 '完全な説明'}
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
                      {currentLanguage.code === 'id' ? 'Tema: ' : 
                       currentLanguage.code === 'en' ? 'Theme: ' : 
                       'テーマ: '}
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
                  { 
                    icon: '🎨', 
                    label: currentLanguage.code === 'id' ? 'Warna: ' : 
                           currentLanguage.code === 'en' ? 'Color: ' : 
                           '色: ', 
                    value: translation.warna 
                  },
                  { 
                    icon: '🛠️', 
                    label: currentLanguage.code === 'id' ? 'Teknik: ' : 
                           currentLanguage.code === 'en' ? 'Technique: ' : 
                           '技法: ', 
                    value: translation.teknik 
                  },
                  { 
                    icon: '🧵', 
                    label: currentLanguage.code === 'id' ? 'Jenis Kain: ' : 
                           currentLanguage.code === 'en' ? 'Fabric Type: ' : 
                           '生地の種類: ', 
                    value: translation.jenisKain 
                  },
                  { 
                    icon: '🌈', 
                    label: currentLanguage.code === 'id' ? 'Pewarna: ' : 
                           currentLanguage.code === 'en' ? 'Dye: ' : 
                           '染料: ', 
                    value: translation.pewarna 
                  },
                  { 
                    icon: '🔺', 
                    label: currentLanguage.code === 'id' ? 'Bentuk: ' : 
                           currentLanguage.code === 'en' ? 'Shape: ' : 
                           '形状: ', 
                    value: translation.bentuk 
                  },
                  { 
                    icon: '📏', 
                    label: currentLanguage.code === 'id' ? 'Dimensi: ' : 
                           currentLanguage.code === 'en' ? 'Dimension: ' : 
                           '寸法: ', 
                    value: batik.dimensi 
                  },
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