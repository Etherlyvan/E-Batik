// components/seo/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(segment => segment);
    const breadcrumbs: BreadcrumbItem[] = [
      { 
        label: isIndonesian ? 'Beranda' : 'Home', 
        href: '/' 
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      
      let label = segment;
      
      switch (segment) {
        case 'gallery':
          label = isIndonesian ? 'Galeri' : 'Gallery';
          break;
        case 'museum':
          label = isIndonesian ? 'Museum 3D' : '3D Museum';
          break;
        case 'batik':
          label = isIndonesian ? 'Detail Batik' : 'Batik Detail';
          break;
        case 'add-batik':
          label = isIndonesian ? 'Tambah Batik' : 'Add Batik';
          break;
        default:
          if (segment.match(/^\d+$/)) {
            label = `#${segment}`;
          }
      }

      breadcrumbs.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://batikpedia.cloud${crumb.href}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <nav className="bg-white border-b border-gray-200 py-3" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center">
                {index === 0 && <Home className="w-4 h-4 mr-1" />}
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                )}
                
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-600 font-medium" aria-current="page">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-amber-600 hover:text-amber-800 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}