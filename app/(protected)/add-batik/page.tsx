// 🎨 BATIK FEATURE - Form page for adding new batik
import { BatikForm } from '@/components/forms/BatikForm';
import { PageLayout } from '@/components/layout/PageLayout';
import { getThemes } from '@/lib/actions/themes';
import { getLanguages } from '@/lib/actions/languages';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add New Batik - Batik Sphere',
  description: 'Add a new batik to the digital collection',
};

export default async function AddBatikPage() {
  // Pre-fetch required data for the form
  const [themes, languages] = await Promise.all([
    getThemes(),
    getLanguages(),
  ]);

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Add New Batik</h1>
          <BatikForm themes={themes} languages={languages} />
        </div>
      </div>
    </PageLayout>
  );
}