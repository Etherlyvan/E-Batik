// app/page.tsx
import { Hero } from '@/components/layout/Hero';
import { InfoSection } from '@/components/layout/InfoSection';
import { StatsCounter } from '@/components/layout/StatsCounter';
import { BatikSlider } from '@/components/batik/BatikSlider';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { prisma } from '@/lib/db/prisma';

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

  return (
    <PageLayout>
      <div className="min-h-screen">
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