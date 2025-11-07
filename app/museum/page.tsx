// app/museum/page.tsx
import { Suspense } from 'react';
import { Museum } from '@/components/museum/Museum';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Batik Museum - BatikPedia',
  description: 'Explore Indonesian batik collection in our 3D virtual museum',
};

async function MuseumContent() {
  const batiks = await getBatiks();
  
  if (!batiks || batiks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Museum Unavailable</h1>
          <p className="mb-4">No batik collection available</p>
          <a 
            href="/gallery" 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Gallery
          </a>
        </div>
      </div>
    );
  }

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