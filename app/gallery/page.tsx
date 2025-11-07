// app/gallery/page.tsx (SEO Enhanced)
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { getThemes } from '@/lib/actions/themes';
import { GalleryClient } from '@/components/gallery/GalleryClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Batik Gallery - Explore Indonesian Traditional Batik Collection',
  description: 'Browse our comprehensive gallery of Indonesian batik featuring 500+ traditional designs from East Java. Filter by themes, techniques, and cultural significance.',
  keywords: [
    'galeri batik',
    'koleksi batik indonesia',
    'batik tradisional',
    'motif batik nusantara',
    'database batik',
    'seni budaya indonesia',
    'batik jawa timur',
    'warisan budaya',
    'tekstil tradisional',
    'batik heritage'
  ],
  openGraph: {
    title: 'Batik Gallery - Indonesian Traditional Batik Collection',
    description: 'Browse our comprehensive gallery of Indonesian batik featuring 500+ traditional designs from East Java.',
    url: 'https://batikpedia.cloud/gallery',
    images: [
      {
        url: '/images/gallery-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BatikPedia Gallery - Indonesian Batik Collection',
      },
    ],
  },
  alternates: {
    canonical: 'https://batikpedia.cloud/gallery',
  },
};

async function GalleryContent() {
  try {
    const [batiks, themes] = await Promise.all([
      getBatiks(),
      getThemes()
    ]);

    // Structured Data untuk Gallery
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Indonesian Batik Gallery",
      "description": "Comprehensive gallery of traditional Indonesian batik designs",
      "url": "https://batikpedia.cloud/gallery",
      "numberOfItems": batiks.length,
      "image": batiks.slice(0, 10).map(batik => ({
        "@type": "ImageObject",
        "name": batik.nama,
        "description": batik.translations[0]?.histori || '',
        "url": batik.foto[0]?.link,
        "creator": batik.seniman,
        "dateCreated": batik.tahun,
        "contentLocation": batik.alamat,
        "keywords": batik.tema.map(tema => tema.nama).join(', ')
      }))
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <GalleryClient initialBatiks={batiks} themes={themes} />
      </>
    );
  } catch (error) {
    console.error('Error loading gallery data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            Failed to load gallery
          </h2>
          <p className="text-amber-600">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }
}

function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-white/20 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-white/20 rounded w-96 mx-auto mb-8"></div>
            <div className="h-12 bg-white/20 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Content Loading */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" variant="primary" />
            <p className="text-amber-700 text-lg font-medium">Loading gallery...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <PageLayout>
      <Suspense fallback={<GalleryLoading />}>
        <GalleryContent />
      </Suspense>
    </PageLayout>
  );
}