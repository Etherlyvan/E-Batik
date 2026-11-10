// app/glosarium/page.tsx
import { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { GlosariumClient } from '@/components/glosarium/GlosariumClient';
import glosariumData from '@/data/glosarium.json';
import { GlosariumItem } from '@/lib/types/glosarium';

export const metadata: Metadata = {
  title: 'Glosarium Batik - Kamus Istilah, Teknik, & Motif Batik Nusantara',
  description:
    'Jelajahi kamus dan glosarium istilah batik Indonesia terlengkap. Temukan makna motif tradisional, alat pembatikan, bahan pewarna alami, serta filosofi budaya nusantara.',
  keywords: [
    'glosarium batik',
    'kamus istilah batik',
    'motif batik indonesia',
    'alat batik',
    'canting',
    'pewarna alami soga',
    'teknik membatik',
    'filosofi batik malangan',
    'warisan budaya batik',
    'batikpedia'
  ],
  openGraph: {
    title: 'Glosarium Batik - Kamus Istilah & Budaya Batik Indonesia',
    description:
      'Kumpulan kosakata, alat, teknik, dan filosofi ragam hias batik nusantara terlengkap dari BatikPedia.',
    url: 'https://batikpedia.cloud/glosarium',
    type: 'website',
    images: [
      {
        url: 'https://batikpedia.cloud/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Glosarium Batik - BatikPedia'
      }
    ]
  },
  alternates: {
    canonical: 'https://batikpedia.cloud/glosarium'
  }
};

export default function GlosariumPage() {
  const items = glosariumData as GlosariumItem[];

  // Structured Data (Schema.org DefinedTermSet / CollectionPage)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Glosarium Batik Indonesia - BatikPedia',
    description:
      'Kumpulan istilah, kosakata, alat, teknik, dan filosofi motif batik Indonesia terlengkap.',
    url: 'https://batikpedia.cloud/glosarium',
    hasDefinedTerm: items.slice(0, 30).map((item) => ({
      '@type': 'DefinedTerm',
      name: item.istilah,
      description: item.definisi,
      inDefinedTermSet: 'https://batikpedia.cloud/glosarium'
    }))
  };

  return (
    <PageLayout showNavbar={true} showFooter={true} showBreadcrumbs={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GlosariumClient initialItems={items} />
    </PageLayout>
  );
}
