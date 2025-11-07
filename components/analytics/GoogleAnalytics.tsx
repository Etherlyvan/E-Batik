// components/analytics/GoogleAnalytics.tsx (Fixed)
'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
  }
}

// Separate component untuk search params tracking
function SearchParamsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!GA_TRACKING_ID || !window.gtag) return;

    // Get search params dari window.location (client-side only)
    const searchParams = new URLSearchParams(window.location.search);
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
      page_path: url,
    });
  }, [pathname]);

  return null;
}

export function GoogleAnalytics() {
  if (!GA_TRACKING_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_TRACKING_ID}', {
            page_title: document.title,
            page_location: window.location.href,
            send_page_view: false
          });
        `}
      </Script>
      <SearchParamsTracker />
    </>
  );
}