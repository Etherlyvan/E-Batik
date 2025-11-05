// components/gallery/GalleryErrorBoundary.tsx
'use client';

import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface GalleryErrorFallbackProps {
  error?: Error;
  resetError: () => void;
}

function GalleryErrorFallback({ error, resetError }: GalleryErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-4">🎨</div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Gallery Error
        </h1>
        
        <p className="text-gray-600 mb-6">
          We&apos;re having trouble loading the gallery. This might be a temporary issue.
        </p>
        
        {error && (
          <details className="mb-6 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              Technical Details
            </summary>
            <pre className="mt-2 text-xs text-red-600 bg-red-50 p-3 rounded border overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="space-y-3">
          <Button onClick={resetError} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export function GalleryWithErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={GalleryErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}