// app/batik/[id]/metadata.ts
import { getBatikById } from '@/lib/actions/batik';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const batikId = parseInt(id);
  
  try {
    const batik = await getBatikById(batikId);
    
    if (!batik) {
      return {
        title: 'Batik Not Found',
        description: 'The requested batik was not found in our database.',
      };
    }

    const translation = batik.translations[0]; // Default to first translation
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