// app/layout.tsx (Final SEO Version)
import './globals.css';
import { Providers } from '@/lib/contexts/providers';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'BatikPedia - Indonesian Batik Digital Database',
    template: '%s | BatikPedia'
  },
  description: 'Explore Indonesia\'s largest digital batik database with 500+ traditional designs from East Java boutiques. Discover heritage, culture, and artistry through our virtual museum.',
  keywords: [
    'batik indonesia',
    'database batik',
    'museum virtual batik',
    'batik jawa timur',
    'warisan budaya indonesia',
    'koleksi batik tradisional',
    'motif batik nusantara',
    'digitalisasi budaya',
    'preservasi batik',
    'seni batik indonesia'
  ],
  authors: [{ name: 'BatikPedia Team' }],
  creator: 'BatikPedia',
  publisher: 'BatikPedia',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US', 'ja_JP'],
    url: 'https://batikpedia.cloud',
    siteName: 'BatikPedia',
    title: 'BatikPedia - Indonesian Batik Digital Database',
    description: 'Explore Indonesia\'s largest digital batik database with 500+ traditional designs from East Java boutiques.',
    images: [
      {
        url: 'https://batikpedia.cloud/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BatikPedia - Indonesian Batik Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@batikpedia',
    creator: '@batikpedia',
    title: 'BatikPedia - Indonesian Batik Digital Database',
    description: 'Explore Indonesia\'s largest digital batik database with 500+ traditional designs.',
    images: ['https://batikpedia.cloud/images/twitter-card.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico?v=2.0', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://batikpedia.cloud',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect untuk performance */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://mvqwffdptqgzynfpxbco.supabase.co" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Structured Data untuk Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BatikPedia",
              "url": "https://batikpedia.cloud",
              "description": "Indonesian Batik Digital Database",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://batikpedia.cloud/gallery?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "BatikPedia",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://batikpedia.cloud/images/LogoApp.png",
                  "width": "200",
                  "height": "200"
                },
                "url": "https://batikpedia.cloud",
                "sameAs": [
                  "https://www.facebook.com/batikpedia",
                  "https://www.instagram.com/batikpedia",
                  "https://twitter.com/batikpedia"
                ]
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {children}
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}