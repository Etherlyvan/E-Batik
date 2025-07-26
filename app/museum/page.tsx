// app/museum/page.tsx
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { MuseumClient } from '@/components/museum/MuseumClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { getBatiks } from '@/lib/actions/batik';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Museum Virtual Batik 3D - Batik Sphere',
  description: 'Jelajahi koleksi batik Indonesia dalam pengalaman museum virtual 3D yang imersif',
};

async function MuseumContent() {
  try {
    const batiks = await getBatiks();
    return <MuseumClient batiks={batiks} />;
  } catch (error) {
    console.error('Error loading museum data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
        <div className="text-center bg-white rounded-xl p-8 shadow-2xl border-2 border-amber-300">
          <div className="text-6xl mb-4">🏛️</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            Gagal Memuat Museum
          </h2>
          <p className="text-amber-600 mb-6">
            Terjadi kesalahan saat memuat data museum batik
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }
}

function MuseumLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-6 bg-white rounded-xl p-8 shadow-2xl border-2 border-amber-300">
          <div className="text-6xl animate-bounce">🏛️</div>
          <LoadingSpinner size="lg" variant="primary" />
          <div className="text-center">
            <p className="text-amber-700 text-xl font-semibold mb-2">
              Memuat Museum Virtual Batik 3D...
            </p>
            <p className="text-amber-600 text-sm">
              Menyiapkan pengalaman museum yang menakjubkan
            </p>
          </div>
          <div className="flex space-x-2">
            {['🎨', '🦋', '🌸', '🏛️'].map((icon, index) => (
              <div
                key={index}
                className="text-2xl animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {icon}
              </div>
            ))}
          </div>
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