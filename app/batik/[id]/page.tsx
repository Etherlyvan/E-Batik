// app/batik/[id]/page.tsx (Fixed dengan SEO)
import { getBatikById } from '@/lib/actions/batik';
import { PageLayout } from '@/components/layout/PageLayout';
import { BatikDetailWithLoading } from '@/components/batik/BatikDetailWithLoading';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Generate metadata untuk SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const batikId = parseInt(id);
  
  if (isNaN(batikId)) {
    return {
      title: 'Invalid Batik ID',
      description: 'The requested batik ID is invalid.',
    };
  }
  
  try {
    const batik = await getBatikById(batikId);
    
    if (!batik) {
      return {
        title: 'Batik Not Found',
        description: 'The requested batik was not found in our database.',
      };
    }

    const translation = batik.translations[0];
    const themes = batik.tema.map(tema => tema.nama).join(', ');
    
    return {
      title: `${batik.nama} - Traditional Indonesian Batik`,
      description: `Discover ${batik.nama}, a traditional Indonesian batik${batik.seniman ? ` created by ${batik.seniman}` : ''} in ${batik.tahun}. ${translation?.histori?.substring(0, 150)}...`,
      keywords: [
        batik.nama,
        batik.seniman || '',
        batik.alamat || '',
        themes,
        'batik indonesia',
        'traditional batik',
        'indonesian heritage',
        translation?.teknik || '',
        translation?.warna || '',
        batik.tahun
      ].filter(Boolean),
      openGraph: {
        title: `${batik.nama} - Traditional Indonesian Batik`,
        description: `Discover ${batik.nama}, a traditional Indonesian batik from ${batik.tahun}. ${translation?.histori?.substring(0, 200)}...`,
        url: `https://batikpedia.cloud/batik/${batik.id}`,
        images: [
          {
            url: batik.foto[0]?.link || '/images/batik-placeholder.jpg',
            width: 800,
            height: 600,
            alt: `${batik.nama} - Traditional Indonesian Batik`,
          },
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${batik.nama} - Traditional Indonesian Batik`,
        description: `Discover ${batik.nama}, created in ${batik.tahun}. ${translation?.histori?.substring(0, 150)}...`,
        images: [batik.foto[0]?.link || '/images/batik-placeholder.jpg'],
      },
      alternates: {
        canonical: `https://batikpedia.cloud/batik/${batik.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Batik Details',
      description: 'Explore traditional Indonesian batik details and cultural heritage.',
    };
  }
}

// Server Component untuk SEO yang lebih baik
export default async function BatikDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const batikId = parseInt(id);

  if (isNaN(batikId)) {
    notFound();
  }

  // Preload data untuk SEO
  let batik;
  try {
    batik = await getBatikById(batikId);
    if (!batik) {
      notFound();
    }
  } catch (error) {
    console.error('Error loading batik:', error);
    notFound();
  }

  const translation = batik.translations[0];

  // Structured Data untuk SEO
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
    <PageLayout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <BatikDetailWithLoading batikId={batikId} />
    </PageLayout>
  );
}