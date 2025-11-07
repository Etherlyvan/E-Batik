// next.config.ts - OPTIMIZED VERSION
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  
  // ✅ CRITICAL: Enable SWC minification
  swcMinify: true,
  
  // ✅ CRITICAL: Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },
  
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react', 
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three'
    ],
    // ✅ NEW: Optimize server components
    serverComponentsExternalPackages: ['sharp', 'prisma'],
  },
  
  // ✅ CRITICAL: Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'], // AVIF first for better compression
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // ✅ NEW: Optimize image loading
    loader: 'default',
    unoptimized: false,
  },
  
  compress: true,
  
  // ✅ CRITICAL: Optimize headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // ✅ NEW: Preconnect to critical origins
          {
            key: 'Link',
            value: '<https://res.cloudinary.com>; rel=preconnect; crossorigin, <https://fonts.googleapis.com>; rel=preconnect'
          }
        ],
      },
      // ✅ CRITICAL: Aggressive caching for static assets
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // ✅ NEW: Cache API responses with stale-while-revalidate
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=300',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/batiks',
        destination: '/gallery',
        permanent: true,
      },
    ];
  },
  
  webpack: (config, { isServer, dev }) => {
    // ✅ CRITICAL: Optimize webpack for production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // ✅ Separate Three.js bundle
            three: {
              name: 'three',
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            // ✅ Separate Framer Motion
            motion: {
              name: 'motion',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
            },
            // ✅ Common vendor bundle
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
            },
            // ✅ Common components
            common: {
              name: 'common',
              minChunks: 2,
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;