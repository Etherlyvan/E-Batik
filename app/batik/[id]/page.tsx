// app/batik/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { BatikDetailWithLoading } from '@/components/batik/BatikDetailWithLoading';

export default function BatikDetailPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  return (
    <PageLayout>
      <BatikDetailWithLoading batikId={id} />
    </PageLayout>
  );
}