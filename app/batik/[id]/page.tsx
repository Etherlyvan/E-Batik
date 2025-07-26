// app/batik/[id]/page.tsx
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatikById } from '@/lib/actions/batik';
import { BatikDetailClient } from '@/components/batik/BatikDetailClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const batik = await getBatikById(parseInt(params.id));
  
  if (!batik) {
    return {
      title: 'Batik Not Found - Batik Sphere',
    };
  }

  return {
    title: `${batik.nama} - Batik Sphere`,
    description: batik.translations[0]?.histori || 'Traditional Indonesian batik',
  };
}

async function BatikDetailContent({ params }: Props) {
  const batik = await getBatikById(parseInt(params.id));

  if (!batik) {
    notFound();
  }

  return <BatikDetailClient batik={batik} />;
}

function BatikDetailLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function BatikDetailPage({ params }: Props) {
  return (
    <PageLayout>
      <Suspense fallback={<BatikDetailLoading />}>
        <BatikDetailContent params={params} />
      </Suspense>
    </PageLayout>
  );
}