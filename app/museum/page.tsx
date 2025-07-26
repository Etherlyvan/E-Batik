// app/museum/page.tsx
import { Suspense } from 'react';
import { Museum } from '@/components/museum/Museum';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Museum - Batik Sphere',
  description: 'Explore traditional Indonesian batik in our virtual 3D museum',
};

async function MuseumContent() {
  const batiks = await getBatiks();
  return <Museum batiks={batiks} />;
}

export default function MuseumPage() {
  return (
    <PageLayout showNavbar={false} showFooter={false}>
      <Suspense fallback={<LoadingScreen />}>
        <MuseumContent />
      </Suspense>
    </PageLayout>
  );
}