// app/museum/page.tsx
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { MuseumClient } from '@/components/museum/MuseumClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getBatiks } from '@/lib/actions/batik';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '3D Museum - Batik Sphere',
  description: 'Explore our batik collection in an immersive 3D museum experience',
};

async function MuseumContent() {
  try {
    const batiks = await getBatiks();
    return <MuseumClient batiks={batiks} />;
  } catch (error) {
    console.error('Error loading museum data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            Failed to load museum
          </h2>
          <p className="text-amber-600">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }
}

function MuseumLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">Loading 3D Museum...</p>
          <p className="text-amber-600 text-sm">Preparing immersive experience...</p>
        </div>
      </div>
    </div>
  );
}

export default function MuseumPage() {
  return (
    <PageLayout>
      <Suspense fallback={<MuseumLoading />}>
        <MuseumContent />
      </Suspense>
    </PageLayout>
  );
}