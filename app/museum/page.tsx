// app/museum/page.tsx - OPTIMIZED VERSION
import { Suspense, lazy } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Batik Museum - BatikPedia',
  description: 'Explore Indonesian batik collection in our 3D virtual museum',
};

// ✅ CRITICAL: Lazy load museum component
const Museum = lazy(() => import('@/components/museum/Museum').then(mod => ({ default: mod.Museum })));

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

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Museum batiks={batiks} />
    </Suspense>
  );
}

export default function MuseumPage() {
  return (
    <PageLayout showNavbar={false} showFooter={false}>
      <MuseumContent />
    </PageLayout>
  );
}