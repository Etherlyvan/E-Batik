// lib/hooks/batik/useBatikPrefetch.ts
import { useCallback } from 'react';

export function useBatikPrefetch() {
  const prefetchBatik = useCallback(async (id: number) => {
    // Use both router prefetch and data prefetch
    const promises = [
      // Prefetch the page route
      fetch(`/batik/${id}`, {
        method: 'HEAD',
        cache: 'force-cache'
      }).catch(() => {}),

      // Prefetch the data
      fetch(`/api/batik/${id}/prefetch`, {
        cache: 'force-cache'
      }).catch(() => {}),
    ];

    await Promise.allSettled(promises);
  }, []);

  return { prefetchBatik };
}