// components/seo/SocialMeta.tsx
import Head from 'next/head';

interface SocialMetaProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export function SocialMeta({ 
  title, 
  description, 
  image = '/images/og-default.jpg',
  url = 'https://batikpedia.cloud',
  type = 'website'
}: SocialMetaProps) {
  return (
    <Head>
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="BatikPedia" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:locale:alternate" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@batikpedia" />
      <meta name="twitter:creator" content="@batikpedia" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="author" content="BatikPedia Team" />
      <meta name="publisher" content="BatikPedia" />
      <link rel="canonical" href={url} />
    </Head>
  );
}