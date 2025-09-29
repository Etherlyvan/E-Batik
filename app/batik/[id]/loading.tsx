// app/batik/[id]/loading.tsx
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { PageLayout } from '@/components/layout/PageLayout';

export default function Loading() {
  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">
            Loading batik details...
          </p>
        </div>
      </div>
    </PageLayout>
  );
}