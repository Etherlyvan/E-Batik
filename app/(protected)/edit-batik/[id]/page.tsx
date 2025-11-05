// app/(protected)/edit-batik/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { EditBatikForm } from '@/components/forms/EditBatikForm';

export default function EditBatikPage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-amber-800 mb-8">
              Edit Batik
            </h1>
            <EditBatikForm batikId={id} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}