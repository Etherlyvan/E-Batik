// app/page.tsx (SEO Enhanced)
import { Hero } from '@/components/layout/Hero';
import { InfoSection } from '@/components/layout/InfoSection';
import { StatsCounter } from '@/components/layout/StatsCounter';
import { BatikSlider } from '@/components/batik/BatikSlider';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BatikPedia - Indonesian Batik Digital Database & Virtual Museum',
  description: 'Discover Indonesia\'s largest batik digital database with 500+ traditional designs from East Java boutiques. Explore our 3D virtual museum and learn about batik heritage, culture, and artistry.',
  keywords: [
    'batik indonesia',
    'database batik',
    'museum virtual batik',
    'batik jawa timur',
    'warisan budaya indonesia',
    'koleksi batik tradisional',
    'motif batik nusantara',
    'digitalisasi budaya',
    'preservasi batik',
    'seni batik indonesia'
  ],
  openGraph: {
    title: 'BatikPedia - Indonesian Batik Digital Database',
    description: 'Discover Indonesia\'s largest batik digital database with 500+ traditional designs. Explore our 3D virtual museum.',
    url: 'https://batikpedia.cloud',
    images: [
      {
        url: '/images/homepage-og.jpg',
        width: 1200,
        height: 630,
        alt: 'BatikPedia Homepage - Indonesian Batik Collection',
      },
    ],
  },
  alternates: {
    canonical: 'https://batikpedia.cloud',
  },
};

async function getHeroImages() {
  try {
    const recentPhotos = await prisma.foto.findMany({
      select: {
        link: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });

    return recentPhotos.map(photo => photo.link);
  } catch (error) {
    console.error('Error fetching hero photos:', error);
    return [];
  }
}

export default async function HomePage() {
  const [batiks, heroImages] = await Promise.all([
    getBatiks(),
    getHeroImages()
  ]);

  // Structured Data untuk Homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "BatikPedia - Indonesian Batik Collection",
    "description": "Digital database of traditional Indonesian batik with detailed information about heritage and cultural significance",
    "url": "https://batikpedia.cloud",
    "mainEntity": {
      "@type": "Collection",
      "name": "Indonesian Batik Database",
      "description": "Collection of traditional Indonesian batik designs",
      "size": batiks.length,
      "hasPart": batiks.slice(0, 5).map(batik => ({
        "@type": "CreativeWork",
        "name": batik.nama,
        "creator": batik.seniman,
        "dateCreated": batik.tahun,
        "image": batik.foto[0]?.link,
        "url": `https://batikpedia.cloud/batik/${batik.id}`
      }))
    },
    "provider": {
      "@type": "Organization",
      "name": "BatikPedia",
      "url": "https://batikpedia.cloud"
    }
  };

  return (
    <PageLayout>
      <div className="min-h-screen">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        <main className="flex flex-col">
          <Hero backgroundImages={heroImages} />
          <InfoSection />
          <StatsCounter />
          <BatikSlider batiks={batiks} />
        </main>
      </div>
    </PageLayout>
  );
}