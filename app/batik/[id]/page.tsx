// app/batik/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { BatikDetailWithLoading } from '@/components/batik/BatikDetailWithLoading';

<<<<<<< HEAD
interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const batik = await getBatikById(parseInt(id));
  
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
  const { id } = await params;
  const batik = await getBatikById(parseInt(id));

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

export default async function BatikDetailPage({ params }: Props) {
=======
export default function BatikDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
  return (
    <PageLayout>
      <BatikDetailWithLoading batikId={id} />
    </PageLayout>
  );
}