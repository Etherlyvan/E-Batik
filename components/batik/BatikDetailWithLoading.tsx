// components/batik/BatikDetailWithLoading.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BatikDetailClient } from './BatikDetailClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikDetailWithLoadingProps {
  batikId: number;
}

export function BatikDetailWithLoading({ batikId }: BatikDetailWithLoadingProps) {
  const [batik, setBatik] = useState<Batik | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentLanguage } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    async function fetchBatik() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/batik/${batikId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Batik not found');
          } else if (response.status >= 500) {
            setError('Database connection error. Please try again.');
          } else {
            setError('Failed to load batik data');
          }
          return;
        }

        const data = await response.json();

        if (!data) {
          setError('Batik not found');
          return;
        }

        setBatik(data);
      } catch (err) {
        console.error('Error fetching batik:', err);
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';

        if (errorMsg.includes('fetch')) {
          setError('Network connection error. Please check your internet connection.');
        } else {
          setError('Failed to load batik data');
        }
      } finally {
        setLoading(false);
      }
    }

    if (batikId && !isNaN(batikId)) {
      fetchBatik();
    } else {
      setError('Invalid batik ID');
      setLoading(false);
    }
  }, [batikId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">
            {currentLanguage.code === 'id'
              ? 'Memuat detail batik...'
              : currentLanguage.code === 'en'
              ? 'Loading batik details...'
              : 'バティック詳細を読み込んでいます...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
        <div className="text-center max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            {currentLanguage.code === 'id'
              ? 'Batik Tidak Ditemukan'
              : currentLanguage.code === 'en'
              ? 'Batik Not Found'
              : 'バティックが見つかりません'}
          </h3>
          <p className="text-amber-600 mb-6">
            {error}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                // Trigger useEffect to refetch
                setBatik(null);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {currentLanguage.code === 'id'
                ? 'Coba Lagi'
                : currentLanguage.code === 'en'
                ? 'Try Again'
                : 'もう一度試す'}
            </button>
            <button
              onClick={() => router.push('/gallery')}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            >
              {currentLanguage.code === 'id'
                ? 'Kembali ke Galeri'
                : currentLanguage.code === 'en'
                ? 'Back to Gallery'
                : 'ギャラリーに戻る'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!batik) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
        <div className="text-center">
          <p className="text-amber-700">
            {currentLanguage.code === 'id'
              ? 'Data batik tidak tersedia'
              : currentLanguage.code === 'en'
              ? 'Batik data not available'
              : 'バティックデータが利用できません'}
          </p>
        </div>
      </div>
    );
  }

  return <BatikDetailClient batik={batik} />;
}