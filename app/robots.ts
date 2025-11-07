// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/private/',
        '/*.json$',
        '/*_buildManifest.js$',
        '/*_ssgManifest.js$',
      ],
    },
    sitemap: 'https://batikpedia.cloud/sitemap.xml',
    host: 'https://batikpedia.cloud',
  };
}