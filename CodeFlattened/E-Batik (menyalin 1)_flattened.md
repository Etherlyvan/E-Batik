Repository Summary:
Files analyzed: 113
Directories scanned: 46
Total size: 360.01 KB (368648 bytes)
Estimated tokens: 92162
Processing time: 0.06 seconds


## Table of Contents

- [Project Summary](#project-summary)
- [Directory Structure](#directory-structure)
- [Files Content](#files-content)
  - Files:
    - [.dockerignore](#_dockerignore)
    - [.env](#_env)
    - [E-Batik (menyalin 1)_flattened.md](#E-Batik_(menyalin_1)_flattened_md)
    - [Dockerfile](#Dockerfile)
    - [Makefile](#Makefile)
    - [README.md](#README_md)
    - [page.tsx](#page_tsx)
    - [page.tsx](#page_tsx)
    - [layout.tsx](#layout_tsx)
    - [route.ts](#route_ts)
    - [route.ts](#route_ts)
    - [route.ts](#route_ts)
    - [route.ts](#route_ts)
    - [route.ts](#route_ts)
    - [route.ts](#route_ts)
    - [and 98 more files...]
- [Dependency Diagram](#dependency-diagram)

## Project Summary <a id="project-summary"></a>

# Project Digest: E-Batik (menyalin 1)
Generated on: Fri Oct 03 2025 11:41:31 GMT+0700 (Waktu Indonesia Barat)
Source: /home/ether/Dokumen/Project/E-Batik (menyalin 1)
Project Directory: /home/ether/Dokumen/Project/E-Batik (menyalin 1)

# Directory Structure
[DIR] .
  [FILE] .dockerignore
  [FILE] .env
  [DIR] CodeFlattened
  [FILE] Dockerfile
  [FILE] Makefile
  [FILE] README.md
  [DIR] app
    [DIR] (auth)
      [DIR] login
        [FILE] page.tsx
    [DIR] (protected)
      [DIR] add-batik
        [FILE] page.tsx
      [FILE] layout.tsx
    [DIR] api
      [DIR] auth
        [DIR] [...nextauth]
          [FILE] route.ts
        [DIR] register
          [FILE] route.ts
        [FILE] route.ts
      [DIR] batik
        [DIR] [id]
          [FILE] route.ts
        [FILE] route.ts
      [DIR] hero
        [FILE] route.ts
      [DIR] upload
        [FILE] route.ts
    [DIR] batik
      [DIR] [id]
        [FILE] page.tsx
    [DIR] gallery
      [FILE] page.tsx
    [FILE] globals.css
    [FILE] layout.tsx
    [DIR] museum
      [FILE] page.tsx
    [FILE] page.tsx
  [DIR] components
    [DIR] batik
      [FILE] BatikDetailClient.tsx
      [FILE] BatikImageSlider.tsx
      [FILE] BatikSlider.tsx
    [DIR] forms
      [FILE] BatikForm.tsx
      [FILE] ImageUpload.tsx
      [FILE] LoginForm.tsx
      [FILE] ThemeSelector.tsx
    [DIR] gallery
      [FILE] GalleryCard.tsx
      [FILE] GalleryClient.tsx
      [FILE] GalleryErrorBoundary.tsx
      [FILE] GalleryFilter.tsx
      [FILE] GalleryGrid.tsx
      [FILE] GallerySearch.tsx
    [DIR] layout
      [FILE] Footer.tsx
      [FILE] Hero.tsx
      [FILE] InfoSection.tsx
      [FILE] LanguageSelector.tsx
      [FILE] Navbar.tsx
      [FILE] PageLayout.tsx
      [FILE] StatsCounter.tsx
    [DIR] museum
      [FILE] BatikDetailModal.tsx
      [FILE] BatikFrame.tsx
      [FILE] BatikGallery.tsx
      [FILE] ControlsInstructions.tsx
      [FILE] FirstPersonControls.tsx
      [FILE] FloorTransition.tsx
      [FILE] LoadingScreen.tsx
      [FILE] Minimap.tsx
      [FILE] Museum.tsx
      [FILE] MuseumBuilding.tsx
      [FILE] MuseumUI.tsx
      [FILE] PerformanceOptimizer.tsx
      [DIR] models
        [FILE] Bench.tsx
        [FILE] CeilingLamp.tsx
        [FILE] ModelErrorBoundary.tsx
        [FILE] PictureFrame.tsx
        [FILE] Statue.tsx
    [DIR] shared
      [FILE] ErrorBoundary.tsx
    [DIR] ui
      [FILE] Button.tsx
      [FILE] Input.tsx
      [FILE] LoadingSpinner.tsx
      [FILE] Pagination.tsx
  [FILE] docker-compose.dev.yml
  [FILE] docker-compose.yml
  [FILE] eslint.config.mjs
  [DIR] lib
    [DIR] actions
      [FILE] batik.ts
      [FILE] languages.ts
      [FILE] themes.ts
    [DIR] auth
      [FILE] config.ts
    [FILE] cloudinary.ts
    [DIR] contexts
      [FILE] AuthContext.tsx
      [FILE] LanguageContext.tsx
      [FILE] providers.tsx
    [DIR] db
      [FILE] prisma.ts
      [FILE] supabase.ts
    [DIR] hooks
      [DIR] auth
        [FILE] useAuth.ts
      [DIR] batik
        [FILE] useBatik.ts
        [FILE] useBatikForm.ts
      [DIR] gallery
        [FILE] useGalleryFilters.ts
      [DIR] shared
        [FILE] usePagination.ts
    [FILE] prismaClient.ts
    [DIR] services
      [FILE] auth.service.ts
      [FILE] batik.service.ts
      [FILE] upload.service.ts
    [DIR] stores
      [FILE] museumStore.ts
    [FILE] supabaseClient.ts
    [DIR] types
      [FILE] auth.ts
      [FILE] batik.ts
      [FILE] index.ts
      [FILE] next-auth.d.ts
    [DIR] utils
      [FILE] MuseumTextureManager.ts
      [FILE] PerformanceMonitor.ts
      [FILE] TextureManager.ts
      [FILE] cn.ts
      [FILE] constants.ts
      [FILE] helpers.ts
  [DIR] locales
    [FILE] translations.json
  [FILE] next-env.d.ts
  [FILE] next.config.ts
  [FILE] nginx.conf
  [FILE] package.json
  [FILE] postcss.config.js
  [DIR] prisma
    [DIR] TemaMigration
      [FILE] architecture.js
      [FILE] culture.js
      [FILE] fauna.js
      [FILE] flora.js
    [DIR] migrations
    [FILE] seed.js
    [FILE] schema.prisma
  [FILE] tailwind.config.ts
  [FILE] tsconfig.json
  [DIR] types
    [FILE] next-connect.d.ts
    [FILE] next.d.ts

# Files Content

## .dockerignore <a id="_dockerignore"></a>

```text
# .dockerignore
.dockerignore
Dockerfile
Dockerfile.dev
docker-compose*.yml
.git
.gitignore
README.md
.env.local
.env.development.local
.env.test.local
.env.production.local
.next
.vercel
node_modules
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
coverage
.nyc_output
.cache
.parcel-cache
.DS_Store
*.pem
```

## .env <a id="_env"></a>

```text
# .env
# Supabase configuration (tetap sama)
NEXT_PUBLIC_SUPABASE_URL=https://mvqwffdptqgzynfpxbco.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12cXdmZmRwdHFnenluZnB4YmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk1OTI1MzgsImV4cCI6MjA1NTE2ODUzOH0.VUNnRyeoNJWhDGi8eRs4ZuwOXktMBMekjvnd1FCkvEQ
DATABASE_URL="postgresql://postgres.mvqwffdptqgzynfpxbco:Eastjavabatik@1@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.mvqwffdptqgzynfpxbco:Eastjavabatik@1@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# Cloudinary configuration (tetap sama)
CLOUDINARY_URL=cloudinary://684197189158486:PqZzFDjMmQ1hp2Po86jY49hSdRQ@dbftqxgwn
CLOUDINARY_CLOUD_NAME=dbftqxgwn
CLOUDINARY_API_KEY=684197189158486
CLOUDINARY_API_SECRET=PqZzFDjMmQ1hp2Po86jY49hSdRQ
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dbftqxgwn
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=preset-BatikDigital

# NextAuth configuration untuk Docker
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-change-this-in-production

# Docker specific
NODE_ENV=production
PORT=3000
```

## CodeFlattened/E-Batik (menyalin 1)_flattened.md <a id="E-Batik_(menyalin_1)_flattened_md"></a>

= Project Digest: E-Batik (menyalin 1) =

Generated on: Fri Oct 03 2025 11:41:31 GMT+0700 (Waktu Indonesia Barat)
Source: /home/ether/Dokumen/Project/E-Batik (menyalin 1)
Project Directory: /home/ether/Dokumen/Project/E-Batik (menyalin 1)

= Directory Structure =

[DIR] .
  [FILE] .dockerignore
  [FILE] .env
  [DIR] CodeFlattened
  [FILE] Dockerfile
  [FILE] Makefile
  [FILE] README.md
  [DIR] app
    [DIR] (auth)
      [DIR] login
        [FILE] page.tsx
    [DIR] (protected)
      [DIR] add-batik
        [FILE] page.tsx
      [FILE] layout.tsx
    [DIR] api
      [DIR] auth
        [DIR] [...nextauth]
          [FILE] route.ts
        [DIR] register
          [FILE] route.ts
        [FILE] route.ts
      [DIR] batik
        [DIR] [id]
          [FILE] route.ts
        [FILE] route.ts
      [DIR] hero
        [FILE] route.ts
      [DIR] upload
        [FILE] route.ts
    [DIR] batik
      [DIR] [id]
        [FILE] page.tsx
    [DIR] gallery
      [FILE] page.tsx
    [FILE] globals.css
    [FILE] layout.tsx
    [DIR] museum
      [FILE] page.tsx
    [FILE] page.tsx
  [DIR] components
    [DIR] batik
      [FILE] BatikDetailClient.tsx
      [FILE] BatikImageSlider.tsx
      [FILE] BatikSlider.tsx
    [DIR] forms
      [FILE] BatikForm.tsx
      [FILE] ImageUpload.tsx
      [FILE] LoginForm.tsx
      [FILE] ThemeSelector.tsx
    [DIR] gallery
      [FILE] GalleryCard.tsx
      [FILE] GalleryClient.tsx
      [FILE] GalleryErrorBoundary.tsx
      [FILE] GalleryFilter.tsx
      [FILE] GalleryGrid.tsx
      [FILE] GallerySearch.tsx
    [DIR] layout
      [FILE] Footer.tsx
      [FILE] Hero.tsx
      [FILE] InfoSection.tsx
      [FILE] LanguageSelector.tsx
      [FILE] Navbar.tsx
      [FILE] PageLayout.tsx
      [FILE] StatsCounter.tsx
    [DIR] museum
      [FILE] BatikDetailModal.tsx
      [FILE] BatikFrame.tsx
      [FILE] BatikGallery.tsx
      [FILE] ControlsInstructions.tsx
      [FILE] FirstPersonControls.tsx
      [FILE] FloorTransition.tsx
      [FILE] LoadingScreen.tsx
      [FILE] Minimap.tsx
      [FILE] Museum.tsx
      [FILE] MuseumBuilding.tsx
      [FILE] MuseumUI.tsx
      [FILE] PerformanceOptimizer.tsx
      [DIR] models
        [FILE] Bench.tsx
        [FILE] CeilingLamp.tsx
        [FILE] ModelErrorBoundary.tsx
        [FILE] PictureFrame.tsx
        [FILE] Statue.tsx
    [DIR] shared
      [FILE] ErrorBoundary.tsx
    [DIR] ui
      [FILE] Button.tsx
      [FILE] Input.tsx
      [FILE] LoadingSpinner.tsx
      [FILE] Pagination.tsx
  [FILE] docker-compose.dev.yml
  [FILE] docker-compose.yml
  [FILE] eslint.config.mjs
  [DIR] lib
    [DIR] actions
      [FILE] batik.ts
      [FILE] languages.ts
      [FILE] themes.ts
    [DIR] auth
      [FILE] config.ts
    [FILE] cloudinary.ts
    [DIR] contexts
      [FILE] AuthContext.tsx
      [FILE] LanguageContext.tsx
      [FILE] providers.tsx
    [DIR] db
      [FILE] prisma.ts
      [FILE] supabase.ts
    [DIR] hooks
      [DIR] auth
        [FILE] useAuth.ts
      [DIR] batik
        [FILE] useBatik.ts
        [FILE] useBatikForm.ts
      [DIR] gallery
        [FILE] useGalleryFilters.ts
      [DIR] shared
        [FILE] usePagination.ts
    [FILE] prismaClient.ts
    [DIR] services
      [FILE] auth.service.ts
      [FILE] batik.service.ts
      [FILE] upload.service.ts
    [DIR] stores
      [FILE] museumStore.ts
    [FILE] supabaseClient.ts
    [DIR] types
      [FILE] auth.ts
      [FILE] batik.ts
      [FILE] index.ts
      [FILE] next-auth.d.ts
    [DIR] utils
      [FILE] MuseumTextureManager.ts
      [FILE] PerformanceMonitor.ts
      [FILE] TextureManager.ts
      [FILE] cn.ts
      [FILE] constants.ts
      [FILE] helpers.ts
  [DIR] locales
    [FILE] translations.json
  [FILE] next-env.d.ts
  [FILE] next.config.ts
  [FILE] nginx.conf
  [FILE] package.json
  [FILE] postcss.config.js
  [DIR] prisma
    [DIR] TemaMigration
      [FILE] architecture.js
      [FILE] culture.js
      [FILE] fauna.js
      [FILE] flora.js
    [DIR] migrations
    [FILE] seed.js
  [FILE] tailwind.config.ts
  [FILE] tsconfig.json
  [DIR] types
    [FILE] next-connect.d.ts
    [FILE] next.d.ts

= Files Content =
## Dockerfile <a id="Dockerfile"></a>

### Dependencies

- `node:18-alpine`
- `base`
- `the`

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci --only=production; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma files
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
```

## Makefile <a id="Makefile"></a>

```makefile
# Makefile
.PHONY: build dev up down logs clean

# Build and run production
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

# Development
dev:
	docker-compose -f docker-compose.dev.yml up

dev-build:
	docker-compose -f docker-compose.dev.yml build

dev-down:
	docker-compose -f docker-compose.dev.yml down

# Logs
logs:
	docker-compose logs -f

logs-app:
	docker-compose logs -f app

# Database operations
db-push:
	docker-compose exec app npx prisma db push

db-seed:
	docker-compose exec app npm run seed

db-studio:
	docker-compose exec app npx prisma studio

# Clean up
clean:
	docker-compose down -v
	docker system prune -f
	docker volume prune -f

# Health check
health:
	curl -f http://localhost/health || exit 1

# Install dependencies
install:
	docker-compose exec app npm install

# Generate Prisma client
generate:
	docker-compose exec app npx prisma generate
```

## README.md <a id="README_md"></a>

This is a Next.js project bootstrapped with create-next-app.

== Getting Started ==

First, run the development server:

--- CODE ---
npm run dev

= or =

yarn dev

= or =

pnpm dev

= or =

bun dev
--- END CODE ---

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

== Learn More ==

To learn more about Next.js, take a look at the following resources:
• Next.js Documentation - learn about Next.js features and API.
• Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

== Deploy on Vercel ==

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.
## app/(protected)/add-batik/page.tsx <a id="page_tsx"></a>

### Dependencies

- `@/components/forms/BatikForm`
- `@/components/layout/PageLayout`
- `@/lib/actions/themes`
- `@/lib/actions/languages`
- `next`

```typescript
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
```

## app/(auth)/login/page.tsx <a id="page_tsx"></a>

### Dependencies

- `@/components/forms/LoginForm`
- `next`

```typescript
// 🔐 AUTH FEATURE - User authentication page
import { LoginForm } from '@/components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Batik Sphere',
  description: 'Sign in to your Batik Sphere account',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign In to Batik Sphere
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
```

## app/api/auth/[...nextauth]/route.ts <a id="route_ts"></a>

### Dependencies

- `next-auth`
- `@/lib/auth/config`

```typescript
// 🔐 AUTH FEATURE - NextAuth API route handler
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/config';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## app/api/auth/register/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `bcrypt`
- `@/lib/db/prisma`
- `@/lib/types/auth`
- `zod`

```typescript
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/prisma';
import { RegisterSchema } from '@/lib/types/auth';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = RegisterSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

## app/api/auth/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `bcrypt`
- `@/lib/db/prisma`
- `@/lib/types/auth`
- `zod`

```typescript
// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/prisma';
import { RegisterSchema } from '@/lib/types/auth';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = RegisterSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
```

## app/api/batik/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `@/lib/actions/batik`
- `next-auth`
- `@/lib/auth/config`
- `@/lib/types/batik`
- `zod`

```typescript
// 🎨 BATIK FEATURE - API endpoints for batik CRUD operations
import { NextRequest, NextResponse } from 'next/server';
import { getBatiks, createBatik } from '@/lib/actions/batik';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { CreateBatikSchema } from '@/lib/types/batik';
import { z } from 'zod';

// GET /api/batik - Fetch all batiks
export async function GET() {
  try {
    const batiks = await getBatiks();
    return NextResponse.json(batiks);
  } catch (error) {
    console.error('Error fetching batiks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batiks' },
      { status: 500 }
    );
  }
}

// POST /api/batik - Create new batik
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate request body
    const body = await request.json();
    const validatedData = CreateBatikSchema.parse(body);

    // Create batik
    const batik = await createBatik(validatedData);
    
    return NextResponse.json(batik, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creating batik:', error);
    return NextResponse.json(
      { error: 'Failed to create batik' },
      { status: 500 }
    );
  }
}
```

## app/api/batik/[id]/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `@/lib/actions/batik`
- `next-auth`
- `@/lib/auth/config`

```typescript
// 🎨 BATIK FEATURE - API endpoints for individual batik operations
import { NextRequest, NextResponse } from 'next/server';
import { getBatikById, updateBatik, deleteBatik } from '@/lib/actions/batik';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

interface Props {
  params: { id: string };
}

// GET /api/batik/[id] - Fetch specific batik
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    const batik = await getBatikById(id);
    if (!batik) {
      return NextResponse.json(
        { error: 'Batik not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(batik);
  } catch (error) {
    console.error('Error fetching batik:', error);
    return NextResponse.json(
      { error: 'Failed to fetch batik' },
      { status: 500 }
    );
  }
}

// DELETE /api/batik/[id] - Delete specific batik
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid batik ID' },
        { status: 400 }
      );
    }

    await deleteBatik(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting batik:', error);
    return NextResponse.json(
      { error: 'Failed to delete batik' },
      { status: 500 }
    );
  }
}
```

## app/api/hero/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `@/lib/db/prisma`

```typescript
// app/api/hero/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

// Cache the response for 5 minutes
export const revalidate = 300;

export async function GET() {
  try {
    const recentPhotos = await prisma.foto.findMany({
      select: {
        link: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });

    if (!recentPhotos || recentPhotos.length === 0) {
      return NextResponse.json(
        { error: 'No photos found' },
        { status: 404 }
      );
    }

    // Add cache headers
    return NextResponse.json(recentPhotos, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching hero photos:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

## app/api/upload/route.ts <a id="route_ts"></a>

### Dependencies

- `next/server`
- `@/lib/services/upload.service`
- `next-auth`
- `@/lib/auth/config`

```typescript
// 🔄 UPLOAD FEATURE - API endpoint for file uploads to Cloudinary
import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/services/upload.service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large' },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(file);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
```

## app/(protected)/layout.tsx <a id="layout_tsx"></a>

### Dependencies

- `next/navigation`
- `next-auth`
- `@/lib/auth/config`

```typescript
// 🛡️ PROTECTED FEATURE - Layout for authenticated users only
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return <>{children}</>;
}
```

## app/batik/[id]/page.tsx <a id="page_tsx"></a>

### Dependencies

- `react`
- `@/components/layout/PageLayout`
- `@/lib/actions/batik`
- `@/components/batik/BatikDetailClient`
- `@/components/ui/LoadingSpinner`
- `next/navigation`
- `next`

```typescript
// app/batik/[id]/page.tsx
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatikById } from '@/lib/actions/batik';
import { BatikDetailClient } from '@/components/batik/BatikDetailClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const batik = await getBatikById(parseInt(params.id));
  
  if (!batik) {
    return {
      title: 'Batik Not Found - Batik Sphere',
    };
  }

  return {
    title: `${batik.nama} - Batik Sphere`,
    description: batik.translations[0]?.histori || 'Traditional Indonesian batik',
  };
}

async function BatikDetailContent({ params }: Props) {
  const batik = await getBatikById(parseInt(params.id));

  if (!batik) {
    notFound();
  }

  return <BatikDetailClient batik={batik} />;
}

function BatikDetailLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E5D387]">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export default function BatikDetailPage({ params }: Props) {
  return (
    <PageLayout>
      <Suspense fallback={<BatikDetailLoading />}>
        <BatikDetailContent params={params} />
      </Suspense>
    </PageLayout>
  );
}
```

## app/gallery/page.tsx <a id="page_tsx"></a>

### Dependencies

- `react`
- `@/components/layout/PageLayout`
- `@/lib/actions/batik`
- `@/lib/actions/themes`
- `@/components/gallery/GalleryClient`
- `@/components/ui/LoadingSpinner`
- `next`

```typescript
// app/gallery/page.tsx
import { Suspense } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { getThemes } from '@/lib/actions/themes';
import { GalleryClient } from '@/components/gallery/GalleryClient';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery - Batik Sphere',
  description: 'Explore our collection of traditional Indonesian batik',
};

async function GalleryContent() {
  try {
    const [batiks, themes] = await Promise.all([
      getBatiks(),
      getThemes()
    ]);

    return <GalleryClient initialBatiks={batiks} themes={themes} />;
  } catch (error) {
    console.error('Error loading gallery data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-amber-800 mb-4">
            Failed to load gallery
          </h2>
          <p className="text-amber-600">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }
}

function GalleryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-white/20 rounded w-64 mx-auto mb-4"></div>
            <div className="h-6 bg-white/20 rounded w-96 mx-auto mb-8"></div>
            <div className="h-12 bg-white/20 rounded w-80 mx-auto"></div>
          </div>
        </div>
      </div>
      
      {/* Content Loading */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" variant="primary" />
            <p className="text-amber-700 text-lg font-medium">Loading gallery...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <PageLayout>
      <Suspense fallback={<GalleryLoading />}>
        <GalleryContent />
      </Suspense>
    </PageLayout>
  );
}
```

## app/museum/page.tsx <a id="page_tsx"></a>

### Dependencies

- `react`
- `@/components/museum/Museum`
- `@/components/layout/PageLayout`
- `@/lib/actions/batik`
- `@/components/museum/LoadingScreen`
- `next`

```typescript
// app/museum/page.tsx
import { Suspense } from 'react';
import { Museum } from '@/components/museum/Museum';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { LoadingScreen } from '@/components/museum/LoadingScreen';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Batik Museum - Batik Sphere',
  description: 'Explore Indonesian batik collection in our 3D virtual museum',
};

async function MuseumContent() {
  const batiks = await getBatiks();
  
  if (!batiks || batiks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-100">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Museum Unavailable</h1>
          <p className="mb-4">No batik collection available</p>
          <a 
            href="/gallery" 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Gallery
          </a>
        </div>
      </div>
    );
  }

  return <Museum batiks={batiks} />;
}

export default function MuseumPage() {
  return (
    <PageLayout showNavbar={false} showFooter={false}>
      <Suspense fallback={<LoadingScreen />}>
        <MuseumContent />
      </Suspense>
    </PageLayout>
  );
}
```

## components/batik/BatikDetailClient.tsx <a id="BatikDetailClient_tsx"></a>

### Dependencies

- `react`
- `next/navigation`
- `lucide-react`
- `@/lib/contexts/LanguageContext`
- `./BatikImageSlider`
- `@/components/ui/LoadingSpinner`
- `@/lib/types`

```typescript
// components/batik/BatikDetailClient.tsx (tambahkan loading state jika diperlukan)
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikImageSlider } from './BatikImageSlider';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Batik } from '@/lib/types';

interface BatikDetailClientProps {
  batik: Batik;
}

export function BatikDetailClient({ batik }: BatikDetailClientProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  // Get translation for current language
  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  const handleBackClick = () => {
    setIsNavigating(true);
    router.push('/gallery');
  };

  if (isNavigating) {
    return (
      <div className="min-h-screen bg-[#E5D387] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="secondary" />
          <p className="text-amber-800 text-lg font-medium">
            {isIndonesian ? 'Kembali ke galeri...' : 'Returning to gallery...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen bg-[#E5D387]">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 z-20 flex items-center bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 shadow-md transition-colors"
        onClick={handleBackClick}
      >
        <ArrowLeft className="mr-2" />
        {isIndonesian ? 'Kembali ke Galeri' : 'Back to Gallery'}
      </button>

      {/* Rest of the component remains the same... */}
      {/* Image Column */}
      <div className="flex-1">
        <BatikImageSlider images={batik.foto} />
      </div>

      {/* Detail Column */}
      <div
        className={`flex-1 flex flex-col ${
          showDetails ? 'justify-start' : 'justify-center'
        } p-12 bg-gray-100 overflow-y-auto max-h-screen`}
        style={{
          backgroundImage: "url('/images/old-papper-texture-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Rest of your existing detail content... */}
        <div className="pt-8 space-y-6">
          <h1 className="text-3xl font-bold text-amber-900">{batik.nama}</h1>

          {batik.seniman && (
            <div className="bg-amber-50 p-4 rounded-xl shadow-md w-fit border border-amber-200">
              <div className="text-lg text-amber-800">
                <p className="font-medium">{isIndonesian ? 'Dibuat Oleh' : 'Made By'}</p>
                <p className="text-xl font-serif font-semibold border-b-2 border-amber-300 pb-2 mb-4 text-amber-900">
                  📍 {batik.seniman}
                </p>
                {batik.alamat && (
                  <p className="mt-5 text-amber-700">{batik.alamat}</p>
                )}
              </div>
            </div>
          )}

          {translation && (
            <p className="text-lg text-amber-800">{translation.histori}</p>
          )}

          <button
            className="flex items-center bg-amber-800 text-white px-4 py-2 rounded hover:bg-amber-900 transition-colors"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                {isIndonesian ? 'Sembunyikan Deskripsi' : 'Hide Description'}
                <ArrowLeft className="ml-2" />
              </>
            ) : (
              <>
                {isIndonesian ? 'Deskripsi Lengkap' : 'Full Description'}
                <ArrowRight className="ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Full Details section with updated colors */}
        {showDetails && (
          <div className="mt-6 space-y-6">
            {/* Themes and Sub-themes */}
            <div className="space-y-4">
              {batik.tema.map((tema) => {
                const temaTranslation = tema.translations.find(
                  (translation) => translation.languageId === currentLanguage.id
                ) || tema.translations[0];

                const relatedSubTema = batik.subTema.filter(
                  (subTema) => subTema.temaId === tema.id
                );

                return (
                  <div
                    key={tema.id}
                    className="bg-amber-50 shadow-lg rounded-lg p-6 border border-amber-200"
                  >
                    <h3 className="text-xl font-serif font-semibold border-b-2 border-amber-300 pb-2 mb-4 text-amber-900">
                      {isIndonesian ? 'Tema: ' : 'Theme: '}
                      {temaTranslation?.nama || tema.nama}
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {relatedSubTema.map((subTema) => {
                        const subTemaTranslation = subTema.translations.find(
                          (translation) => translation.languageId === currentLanguage.id
                        ) || subTema.translations[0];
                        
                        return (
                          <li
                            key={subTema.id}
                            className="bg-white p-3 rounded-md shadow-md border border-amber-200 hover:shadow-lg transition-shadow duration-300"
                          >
                            <span className="text-amber-800">
                              {subTemaTranslation?.nama || subTema.nama}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Technical Information with updated colors */}
            {translation && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🎨', label: isIndonesian ? 'Warna: ' : 'Color: ', value: translation.warna },
                  { icon: '🛠️', label: isIndonesian ? 'Teknik: ' : 'Technique: ', value: translation.teknik },
                  { icon: '🧵', label: isIndonesian ? 'Jenis Kain: ' : 'Fabric Type: ', value: translation.jenisKain },
                  { icon: '🌈', label: isIndonesian ? 'Pewarna: ' : 'Dye: ', value: translation.pewarna },
                  { icon: '🔺', label: isIndonesian ? 'Bentuk: ' : 'Shape: ', value: translation.bentuk },
                  { icon: '📏', label: isIndonesian ? 'Dimensi: ' : 'Dimension: ', value: batik.dimensi },
                ].map((item, index) => (
                  <div key={index} className="bg-amber-50 shadow-lg rounded-lg p-6 border border-amber-200 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-lg font-serif font-semibold flex items-center text-amber-900">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </h3>
                    <p className="mt-2 text-amber-700">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

## components/batik/BatikImageSlider.tsx <a id="BatikImageSlider_tsx"></a>

### Dependencies

- `react`
- `next/image`
- `lucide-react`
- `@/lib/types`

```typescript
// components/batik/BatikImageSlider.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { Photo } from '@/lib/types';

interface BatikImageSliderProps {
  images: Photo[];
}

export function BatikImageSlider({ images }: BatikImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<Photo | null>(null);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const openPopup = () => setSelectedImage(images[currentIndex]);
  const closePopup = () => setSelectedImage(null);

  return (
    <>
      <div className="relative w-full h-full">
        {/* Main Image */}
        <div
          className="w-full h-full rounded-lg cursor-pointer relative"
          onClick={openPopup}
        >
          <Image
            src={images[currentIndex].link}
            alt={`Batik ${currentIndex}`}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 shadow-lg"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentIndex ? 'bg-white' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Popup */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-red-400"
            aria-label="Close popup"
          >
            &times;
          </button>

          {/* Large Image */}
          <div
            className="max-w-4xl w-full px-4 relative"
            style={{ height: '80vh' }}
          >
            <Image
              src={selectedImage.link}
              alt="Full Batik"
              fill
              className="object-contain rounded-lg"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
```

## components/batik/BatikSlider.tsx <a id="BatikSlider_tsx"></a>

### Dependencies

- `react`
- `next/image`
- `framer-motion`
- `@/lib/contexts/LanguageContext`
- `@/lib/types`

```typescript
// components/batik/BatikSlider.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikSliderProps {
  batiks: Batik[];
}

export function BatikSlider({ batiks }: BatikSliderProps) {
  const { currentLanguage } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const isIndonesian = currentLanguage.code === 'id';

  // Auto-slide unlimited
  useEffect(() => {
    if (batiks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % batiks.length);
    }, 3000); // Slide setiap 3 detik

    return () => clearInterval(interval);
  }, [batiks.length]);

  if (batiks.length === 0) {
    return null;
  }

  // Create infinite loop array
  const infiniteBatiks = [...batiks, ...batiks, ...batiks];
  const itemsToShow = 5; // Jumlah item yang terlihat
  const itemWidth = 280; // Lebar setiap item

  return (
    <section className="w-full py-16 relative overflow-hidden" style={{ backgroundColor: '#A0522D' }}>
      {/* Background Pattern - subtle texture */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
     

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-8"
            style={{ 
              color: '#F5E6D3',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.5px'
            }}
          >
            {isIndonesian ? 'Koleksi Batik Nusantara' : 'Indonesian Batik Collection'}
          </motion.h2>

 
        </div>

        {/* Infinite Sliding Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: -((currentIndex % batiks.length) * itemWidth)
            }}
            transition={{
              duration: 1,
              ease: "easeInOut"
            }}
            style={{
              width: `${infiniteBatiks.length * itemWidth}px`
            }}
          >
            {infiniteBatiks.map((batik, index) => {
              const actualIndex = index % batiks.length;
              
              return (
                <motion.div
                  key={`${batik.id}-${index}`}
                  className="flex-shrink-0"
                  style={{ width: `${itemWidth - 24}px` }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: (index % itemsToShow) * 0.1
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-96 transform hover:scale-105 transition-transform duration-300 border border-white/20">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={batik.foto[0]?.link || '/images/placeholder.jpg'}
                        alt={batik.nama}
                        fill
                        className="object-cover"
                        sizes="256px"
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                      
                      {/* Code Badge */}
                      {batik.kode && (
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2 py-1 rounded-full text-xs font-medium shadow-lg">
                          {batik.kode}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Title */}
                      <h3 
                        className="font-bold text-lg mb-2 line-clamp-2 min-h-[3rem]"
                        style={{ 
                          color: '#8B4513',
                          fontFamily: 'Georgia, serif'
                        }}
                      >
                        {batik.nama}
                      </h3>

                      {/* Artist */}
                      {batik.seniman && (
                        <p 
                          className="mb-2 text-sm line-clamp-1"
                          style={{ 
                            color: '#A0522D',
                            fontFamily: 'Georgia, serif'
                          }}
                        >
                          {batik.seniman}
                        </p>
                      )}

                      {/* Themes */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {batik.tema.slice(0, 2).map((tema) => {
                          const translation = tema.translations.find(
                            t => t.languageId === currentLanguage.id
                          ) || tema.translations[0];
                          
                          return (
                            <span
                              key={tema.id}
                              className="px-2 py-1 rounded-full text-xs font-medium"
                              style={{
                                backgroundColor: '#F5E6D3',
                                color: '#8B4513'
                              }}
                            >
                              {translation?.nama || tema.nama}
                            </span>
                          );
                        })}
                      </div>

                      {/* Year */}
                      <div 
                        className="text-center text-sm font-medium"
                        style={{ color: '#A0522D' }}
                      >
                        {batik.tahun}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Sliding Progress Indicator - styled like the image */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {Array.from({ length: Math.min(batiks.length, 4) }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === (currentIndex % 4)
                    ? 'bg-yellow-400 scale-125 shadow-lg' 
                    : 'bg-yellow-600/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/30">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: '#F5E6D3' }}
                >
                  {batiks.length}
                </div>
                <div 
                  className="text-sm"
                  style={{ 
                    color: '#E6D4C1',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {isIndonesian ? 'Koleksi Batik' : 'Batik Collection'}
                </div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: '#F5E6D3' }}
                >
                  {new Set(batiks.flatMap(b => b.tema.map(t => t.id))).size}
                </div>
                <div 
                  className="text-sm"
                  style={{ 
                    color: '#E6D4C1',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {isIndonesian ? 'Tema Unik' : 'Unique Themes'}
                </div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div 
                  className="text-2xl font-bold"
                  style={{ color: '#F5E6D3' }}
                >
                  ∞
                </div>
                <div 
                  className="text-sm"
                  style={{ 
                    color: '#E6D4C1',
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  {isIndonesian ? 'Eksplorasi' : 'Exploration'}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="/gallery"
            className="inline-flex items-center px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl border-2"
            style={{
              backgroundColor: 'rgba(245, 230, 211, 0.2)',
              borderColor: '#F5E6D3',
              color: '#F5E6D3',
              fontFamily: 'Georgia, serif'
            }}
          >
            {isIndonesian ? 'Jelajahi Koleksi Lengkap' : 'Explore Full Collection'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
```

## components/forms/BatikForm.tsx <a id="BatikForm_tsx"></a>

### Dependencies

- `react`
- `next/navigation`
- `@/components/ui/Button`
- `@/components/ui/Input`
- `./ImageUpload`
- `./ThemeSelector`
- `@/lib/hooks/batik/useBatikForm`
- `@/lib/types`

```typescript
// 🎨 BATIK FEATURE - Form for creating/editing batik entries
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from './ImageUpload';
import { ThemeSelector } from './ThemeSelector';
import { useBatikForm } from '@/lib/hooks/batik/useBatikForm';
import type { Theme, Language } from '@/lib/types';

interface BatikFormProps {
  themes: Theme[];
  languages: Language[];
}

export function BatikForm({ themes, languages }: BatikFormProps) {
  const router = useRouter();
  const {
    formData,
    loading,
    errors,
    handleInputChange,
    handleTranslationChange,
    handleThemeChange,
    handleImageUpload,
    submitForm,
  } = useBatikForm();

  const [activeLanguage, setActiveLanguage] = useState(
    languages.find(lang => lang.isDefault)?.id || languages[0]?.id
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await submitForm();
      router.push('/gallery');
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Batik Name"
            name="nama"
            value={formData.nama}
            onChange={handleInputChange}
            error={errors.nama}
            required
          />

          <Input
            label="Batik Code"
            name="kode"
            value={formData.kode}
            onChange={handleInputChange}
            error={errors.kode}
          />

          <Input
            label="Artist"
            name="seniman"
            value={formData.seniman}
            onChange={handleInputChange}
            error={errors.seniman}
          />

          <Input
            label="Location"
            name="alamat"
            value={formData.alamat}
            onChange={handleInputChange}
            error={errors.alamat}
          />

          <Input
            label="Year"
            name="tahun"
            value={formData.tahun}
            onChange={handleInputChange}
            error={errors.tahun}
            required
          />

          <Input
            label="Dimensions"
            name="dimensi"
            value={formData.dimensi}
            onChange={handleInputChange}
            error={errors.dimensi}
            placeholder="e.g., 100cm x 200cm"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Images</h2>
        <ImageUpload
          onUpload={handleImageUpload}
          maxFiles={10}
          error={errors.images}
        />
      </div>

      {/* Language Translations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Translations</h2>
        
        {/* Language Tabs */}
        <div className="flex space-x-2 border-b pb-2 mb-4">
          {languages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => setActiveLanguage(lang.id)}
              className={`px-3 py-1 rounded ${
                activeLanguage === lang.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Translation Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Color"
            value={formData.translations[activeLanguage]?.warna || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'warna', e.target.value)}
            required
          />

          <Input
            label="Technique"
            value={formData.translations[activeLanguage]?.teknik || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'teknik', e.target.value)}
            required
          />

          <Input
            label="Fabric Type"
            value={formData.translations[activeLanguage]?.jenisKain || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'jenisKain', e.target.value)}
            required
          />

          <Input
            label="Dye"
            value={formData.translations[activeLanguage]?.pewarna || ''}
            onChange={(e) => handleTranslationChange(activeLanguage, 'pewarna', e.target.value)}
            required
          />
        </div>
      </div>

      {/* Theme Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <ThemeSelector
          themes={themes}
          selectedThemes={formData.themes}
          onThemeChange={handleThemeChange}
        />
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" loading={loading}>
          Save Batik
        </Button>
      </div>
    </form>
  );
}
```

## components/forms/ImageUpload.tsx <a id="ImageUpload_tsx"></a>

### Dependencies

- `react`
- `lucide-react`
- `@/components/ui/Button`
- `@/components/ui/LoadingSpinner`
- `@/lib/utils/cn`
- `@/lib/utils/helpers`

```typescript
// 📝 FORM FEATURE - Image upload component with drag & drop
'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { cn } from '@/lib/utils/cn';
import { formatFileSize } from '@/lib/utils/helpers';

interface ImageUploadProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: string[];
  error?: string;
}

export function ImageUpload({
  onUpload,
  maxFiles = 10,
  maxFileSize = 5 * 1024 * 1024, // 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  error,
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!acceptedTypes.includes(file.type)) {
      return `File type ${file.type} is not supported`;
    }
    if (file.size > maxFileSize) {
      return `File size exceeds ${formatFileSize(maxFileSize)}`;
    }
    return null;
  };

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      const totalFiles = files.length + validFiles.length;
      if (totalFiles > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      
      setFiles(prev => [...prev, ...validFiles]);
      setPreviews(prev => [...prev, ...newPreviews]);
      onUpload([...files, ...validFiles]);
    }
  }, [files, maxFiles, maxFileSize, acceptedTypes, onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeFile = useCallback((index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
    onUpload(newFiles);
  }, [files, previews, onUpload]);

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
          dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300',
          'hover:border-blue-400 hover:bg-blue-50',
          uploading && 'pointer-events-none opacity-50'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          id="file-upload"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading}
        />

        <div className="flex flex-col items-center space-y-4">
          {uploading ? (
            <LoadingSpinner size="lg" />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}

          <div>
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
            >
              Choose files
            </label>
            <span className="text-gray-500"> or drag and drop</span>
          </div>

          <p className="text-sm text-gray-500">
            PNG, JPG, WebP up to {formatFileSize(maxFileSize)} ({files.length}/{maxFiles})
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFile(index)}
                className="absolute -top-2 -right-2 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </Button>
              
              <div className="mt-1 text-xs text-gray-500 truncate">
                {files[index].name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## app/layout.tsx <a id="layout_tsx"></a>

### Dependencies

- `@/lib/contexts/providers`
- `./globals.css`

```typescript
// app/layout.tsx
import './globals.css'; 
import { Providers } from '@/lib/contexts/providers';

export const metadata = {
  title: 'Batik Sphere - Digital Batik Database',
  description: 'Preserving Indonesian batik heritage through digital innovation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## app/page.tsx <a id="page_tsx"></a>

### Dependencies

- `@/components/layout/Hero`
- `@/components/layout/InfoSection`
- `@/components/layout/StatsCounter`
- `@/components/batik/BatikSlider`
- `@/components/layout/PageLayout`
- `@/lib/actions/batik`
- `@/lib/db/prisma`

```typescript
// app/page.tsx
import { Hero } from '@/components/layout/Hero';
import { InfoSection } from '@/components/layout/InfoSection';
import { StatsCounter } from '@/components/layout/StatsCounter';
import { BatikSlider } from '@/components/batik/BatikSlider';
import { PageLayout } from '@/components/layout/PageLayout';
import { getBatiks } from '@/lib/actions/batik';
import { prisma } from '@/lib/db/prisma';

async function getHeroImages() {
  try {
    const recentPhotos = await prisma.foto.findMany({
      select: {
        link: true,
      },
      orderBy: {
        id: 'desc',
      },
      take: 10,
    });

    return recentPhotos.map(photo => photo.link);
  } catch (error) {
    console.error('Error fetching hero photos:', error);
    return [];
  }
}

export default async function HomePage() {
  const [batiks, heroImages] = await Promise.all([
    getBatiks(),
    getHeroImages()
  ]);

  return (
    <PageLayout>
      <div className="min-h-screen">
        <main className="flex flex-col">
          <Hero backgroundImages={heroImages} />
          <InfoSection />
          <StatsCounter />
          <BatikSlider batiks={batiks} />
        </main>
      </div>
    </PageLayout>
  );
}
```

## app/globals.css <a id="globals_css"></a>

```css
/* app/globals.css - Update */
@tailwind base;
@tailwind components;
@tailwind utilities;

body,
html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    height: 100%;
}

/* Ensure full height layout */
#__next {
    height: 100%;
}

.min-h-screen {
    min-height: 100vh;
}

/* Hero section full height */
.hero-section {
  height: 100vh;
  min-height: 100vh;
  padding-top: 0;
}
.hero-content {
  padding-top: 4rem; /* 64px - navbar height */
  min-height: calc(100vh - 4rem);
  display: flex;
  align-items: center;
}
@media (min-width: 768px) {
  .hero-content {
    padding-top: 5rem; /* 80px - larger navbar on desktop */
    min-height: calc(100vh - 5rem);
  }
}
/* Utility classes */
.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
}

/* Mobile First Approach */
.clip-diagonal {
    clip-path: polygon(0 0, 35% 0, 110% 0%, 0 35%);
    z-index: 1;
    transition: clip-path 0.3s ease-in-out;
}

/* Tablet (portrait) - 768px */
@media screen and (min-width: 768px) {
    .clip-diagonal {
        clip-path: polygon(0 0, 40% 0, 95% 0%, 0 51%);
    }
}

/* Desktop - 1024px */
@media screen and (min-width: 1024px) {
    .clip-diagonal {
        clip-path: polygon(0 0, 50% 0, 66% 0%, 0 100%);
    }
}

/* Smooth scrolling */
html {
    scroll-behavior: smooth;
}

/* Background pattern fixes */
.bg-pattern-overlay {
    position: relative;
}

.bg-pattern-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
}

.bg-pattern-overlay > * {
    position: relative;
    z-index: 2;
}

/* Responsive text sizing */
@media (max-width: 640px) {
  .hero-title {
    font-size: 1.5rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 1.875rem;
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: 0.875rem;
    line-height: 1.4;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .hero-title {
    font-size: 1.875rem;
    line-height: 1.2;
  }
  
  .hero-subtitle {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: 1rem;
    line-height: 1.4;
  }
}

@media (min-width: 769px) {
  .hero-title {
    font-size: 2.5rem;
    line-height: 1.1;
  }
  
  .hero-subtitle {
    font-size: 3.5rem;
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: 1.125rem;
    line-height: 1.4;
  }
}
/* Pastikan semua container gallery lurus */
.gallery-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.gallery-grid {
  display: grid;
  width: 100%;
  max-width: 100%;
}

/* Reset untuk mencegah transform yang tidak diinginkan */
.gallery-card {
  transform: none !important;
  transform-origin: center center;
}

/* Pastikan loading spinner centered */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 200px;
}

/* Fix untuk motion components */
.motion-container {
  width: 100%;
  display: block;
}
/* Loading animations dengan tema warna */
@keyframes spin-amber {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-amber {
  animation: spin-amber 1s linear infinite;
}

/* Skeleton loading dengan warna tema */
@keyframes pulse-amber {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse-amber {
  animation: pulse-amber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Loading overlay dengan tema */
.loading-overlay-amber {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%);
  backdrop-filter: blur(4px);
}
/* Dropdown z-index fixes */
.dropdown-container {
  position: relative;
  z-index: 50;
}

/* Ensure dropdowns are always on top */
[data-dropdown-menu] {
  z-index: 9999 !important;
  position: fixed !important;
}

/* Fix for filter container overflow */
.filter-container {
  overflow: visible !important;
}

/* Prevent dropdown cutoff in containers */
.gallery-filter-container {
  overflow: visible;
  position: relative;
  z-index: 10;
}

.gallery-filter-container .relative {
  overflow: visible;
}

/* Mobile dropdown improvements */
@media (max-width: 768px) {
  .dropdown-menu-mobile {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 90vw !important;
    max-width: 400px !important;
    max-height: 70vh !important;
    z-index: 9999 !important;
  }
}

/* Scrollbar styling for dropdown */
.dropdown-menu::-webkit-scrollbar {
  width: 6px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dropdown-menu::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
/* Navbar height compensation */
.hero-with-navbar {
  padding-top: 4rem; /* 64px - default navbar height */
}

@media (min-width: 768px) {
  .hero-with-navbar {
    padding-top: 4.5rem; /* 72px - larger navbar on desktop */
  }
    html {
    scroll-padding-top: 5rem;
  }
}
/* Button responsive improvements */
.hero-buttons {
  gap: 1rem;
}
@media (min-width: 640px) {
  .hero-buttons {
    gap: 1.5rem;
  }
}
/* Ensure proper z-index stacking */
.hero-background {
  z-index: 1;
}

.hero-content {
  z-index: 10;
}

.hero-indicators {
  z-index: 20;
}


/* Mobile landscape adjustments */
@media (max-height: 600px) and (orientation: landscape) {
  .hero-section {
    min-height: 100vh;
  }
  
  .hero-content {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  
  .hero-title {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .hero-subtitle {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .hero-description {
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
  }
}
/* Ensure proper spacing for fixed navbar */
.page-content {
  margin-top: 0;
}

/* Mobile navbar adjustments */
@media (max-width: 767px) {
  .hero-with-navbar {
    padding-top: 4rem; /* 64px */
  }
  
  .hero-title-mobile {
    font-size: 1.875rem; /* 30px */
    line-height: 1.2;
  }
  
  .hero-subtitle-mobile {
    font-size: 1.125rem; /* 18px */
    line-height: 1.4;
  }
}

/* Search component responsive improvements */
.search-container {
  max-width: 100%;
  overflow: hidden;
}

.search-input {
  min-width: 0;
  flex: 1;
}

/* Filter container spacing */
.gallery-filter-container {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .gallery-filter-container {
    margin-bottom: 2rem;
  }
}

/* Results header responsive */
.results-header {
  padding: 1rem;
}

@media (min-width: 768px) {
  .results-header {
    padding: 1.5rem;
  }
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
  scroll-padding-top: 4rem;
}

@media (min-width: 768px) {
  html {
    scroll-padding-top: 4.5rem;
  }
}

/* app/globals.css (Museum-specific additions) */

/* Museum-specific styles */
.museum-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(135deg, #92400e 0%, #ea580c 100%);
}

/* Performance optimizations */
.museum-canvas {
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Custom scrollbar for museum panels */
.museum-scroll::-webkit-scrollbar {
  width: 6px;
}

.museum-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.museum-scroll::-webkit-scrollbar-thumb {
  background: rgba(245, 158, 11, 0.6);
  border-radius: 3px;
}

.museum-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(245, 158, 11, 0.8);
}

/* Volume slider styling */
.slider {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

.slider::-webkit-slider-track {
  background: #374151;
  height: 4px;
  border-radius: 2px;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #f59e0b;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-track {
  background: #374151;
  height: 4px;
  border-radius: 2px;
  border: none;
}

.slider::-moz-range-thumb {
  background: #f59e0b;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* Keyboard key styling */
kbd {
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 3px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  color: #f3f4f6;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  padding: 2px 4px;
  white-space: nowrap;
}

/* Loading animations */
@keyframes pulse-amber {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse-amber {
  animation: pulse-amber 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Smooth transitions for quality changes */
.quality-transition {
  transition: all 0.3s ease-in-out;
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .museum-ui-mobile {
    font-size: 0.875rem;
  }
  
  .museum-ui-mobile .museum-button {
    padding: 0.5rem;
    min-width: 44px;
    min-height: 44px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .museum-ui {
    border-width: 2px;
    background-color: rgba(0, 0, 0, 0.95);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .museum-transition {
    transition: none;
    animation: none;
  }
}

/* Focus indicators for accessibility */
.museum-button:focus-visible {
  outline: 2px solid #f59e0b;
  outline-offset: 2px;
}

/* Print styles (hide museum UI when printing) */
@media print {
  .museum-ui,
  .museum-controls {
    display: none !important;
  }
}
```

## components/forms/LoginForm.tsx <a id="LoginForm_tsx"></a>

### Dependencies

- `react`
- `next/navigation`
- `@/components/ui/Button`
- `@/components/ui/Input`
- `@/lib/hooks/auth/useAuth`
- `@/lib/types/auth`
- `zod`

```typescript
// 🔐 AUTH FEATURE - Login form component
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import { LoginSchema, type LoginData, type FormErrors } from '@/lib/types/auth';
import { z } from 'zod';

export function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data
      const validatedData = LoginSchema.parse(formData);
      
      // Attempt sign in
      await signIn(validatedData.email, validatedData.password);
      
      // Redirect on success
      router.push('/gallery');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="current-password"
        placeholder="Enter your password"
      />

      <Button type="submit" loading={loading} className="w-full">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up
          </a>
        </p>
        <p className="text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            Forgot your password?
          </a>
        </p>
      </div>
    </form>
  );
}
```

## components/gallery/GalleryCard.tsx <a id="GalleryCard_tsx"></a>

### Dependencies

- `next/image`
- `lucide-react`
- `framer-motion`
- `@/lib/contexts/LanguageContext`
- `@/lib/types`

```typescript
// components/gallery/GalleryCard.tsx
'use client';

import Image from 'next/image';
import { Calendar, MapPin, Trash2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface GalleryCardProps {
  batik: Batik;
  onClick?: () => void;
  onDelete?: () => void;
  showDeleteButton?: boolean;
}

export function GalleryCard({ batik, onClick, onDelete, showDeleteButton = false }: GalleryCardProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.();
  };

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      className="relative group overflow-hidden rounded-2xl bg-white cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden">
        {batik.foto[0] && (
          <Image
            src={batik.foto[0].link}
            alt={batik.nama}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          {showDeleteButton && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </motion.button>
        </div>
        
        {/* Code Badge */}
        {batik.kode && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {batik.kode}
          </div>
        )}

        {/* Hover Info */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
            <p className="text-sm text-gray-800 font-medium line-clamp-2">
              {batik.translations[0]?.histori || 'No description available'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {batik.nama}
        </h3>
        
        {/* Artist and Location */}
        {batik.seniman && (
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-amber-500" />
            <span className="text-sm line-clamp-1 font-medium">{batik.seniman}</span>
          </div>
        )}

        {batik.alamat && (
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            {batik.alamat}
          </p>
        )}
        
        {/* Themes */}
        <div className="flex flex-wrap gap-2 mb-4">
          {batik.tema.slice(0, 2).map((tema) => {
            const translation = tema.translations.find(
              t => t.languageId === currentLanguage.id
            ) || tema.translations[0];
            
            return (
              <span
                key={tema.id}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs rounded-full font-semibold border border-blue-200"
              >
                {translation?.nama || tema.nama}
              </span>
            );
          })}
          {batik.tema.length > 2 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-semibold">
              +{batik.tema.length - 2} {isIndonesian ? 'lainnya' : 'more'}
            </span>
          )}
        </div>

        {/* Footer Info */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-amber-600">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">
              {isIndonesian ? 'Tahun' : 'Year'} {batik.tahun}
            </span>
          </div>
          
          {batik.dimensi && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              {batik.dimensi}
            </span>
          )}
        </div>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-amber-400 opacity-20 group-hover:opacity-40 transition-opacity" />
    </motion.div>
  );
}
```

## components/gallery/GalleryErrorBoundary.tsx <a id="GalleryErrorBoundary_tsx"></a>

### Dependencies

- `@/components/shared/ErrorBoundary`
- `lucide-react`
- `@/components/ui/Button`

```typescript
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
          We're having trouble loading the gallery. This might be a temporary issue.
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
```

## components/gallery/GalleryClient.tsx <a id="GalleryClient_tsx"></a>

### Dependencies

- `react`
- `next/navigation`
- `lucide-react`
- `framer-motion`
- `./GalleryGrid`
- `./GalleryFilter`
- `@/lib/hooks/gallery/useGalleryFilters`
- `@/lib/hooks/shared/usePagination`
- `@/components/ui/Pagination`
- `@/lib/contexts/LanguageContext`
- `@/lib/hooks/auth/useAuth`
- `@/lib/types`

```typescript
// components/gallery/GalleryClient.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, X, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryGrid } from './GalleryGrid';
import { GalleryFilter } from './GalleryFilter';
import { useGalleryFilters } from '@/lib/hooks/gallery/useGalleryFilters';
import { usePagination } from '@/lib/hooks/shared/usePagination';
import { Pagination } from '@/components/ui/Pagination';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import type { Batik, Theme } from '@/lib/types';

interface GalleryClientProps {
  initialBatiks: Batik[];
  themes: Theme[];
}

export function GalleryClient({ initialBatiks, themes }: GalleryClientProps) {
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const isIndonesian = currentLanguage.code === 'id';

  const { filteredBatiks, filters, updateFilter, clearFilters } = useGalleryFilters({
    batiks: initialBatiks,
    searchTerm,
  });

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({
    items: filteredBatiks,
    itemsPerPage: 12,
  });

  const handleCardClick = (batik: Batik) => {
    setLoading(true);
    router.push(`/batik/${batik.id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm(isIndonesian ? 'Apakah Anda yakin ingin menghapus batik ini?' : 'Are you sure you want to delete this batik?')) {
      setLoading(true);
      try {
        const response = await fetch(`/api/batik/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          window.location.reload();
        } else {
          const errorData = await response.json();
          alert(errorData.error || 'Failed to delete batik');
        }
      } catch (error) {
        console.error('Error deleting batik:', error);
        alert('An error occurred while deleting batik');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    clearFilters();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fixed padding untuk navbar */}
      <div 
        className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden"
        style={{
          backgroundImage: "url('/images/gallery-hero-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
              {isIndonesian ? 'Database Batik' : 'Batik Database'}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 max-w-4xl mx-auto leading-relaxed text-white/95 drop-shadow-md px-4">
              {isIndonesian 
                ? 'Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara'
                : 'Traditional Indonesian batik collection showcasing the beauty and diversity of archipelago culture'}
            </p>
          </motion.div>
          
          {/* Search Component */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4"
          >
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center border border-white/20">
              {/* Search Input */}
              <div className="flex-1 flex items-center min-w-0">
                <Search className="ml-4 h-5 w-5 md:h-6 md:w-6 text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isIndonesian ? 'Cari batik berdasarkan nama, seniman, atau lokasi...' : 'Search batik by name, artist, or location...'}
                  className="flex-1 px-3 md:px-4 py-3 md:py-4 focus:outline-none text-base md:text-lg text-gray-800 bg-transparent placeholder-gray-500 min-w-0"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mr-2 p-1 md:p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  </button>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-2 sm:mt-0 px-2 sm:px-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 md:px-6 py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                    showFilters 
                      ? 'bg-amber-600 text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Filter className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  {isIndonesian ? 'Filter' : 'Filters'}
                </button>
                
                <button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                  <Search className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full bg-white">
        <div className="max-w-7xl mx-auto py-6 md:py-8 px-4">
          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 md:mb-8 overflow-visible gallery-filter-container"
              >
                <GalleryFilter
                  themes={themes}
                  filters={filters}
                  onFilterChange={updateFilter}
                  onClearFilters={clearFilters}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Results Info */}
                <div className="flex items-center justify-center lg:justify-start space-x-4 md:space-x-8">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{totalItems}</div>
                    <div className="text-xs md:text-sm text-gray-600">{isIndonesian ? 'Total Batik' : 'Total Batiks'}</div>
                  </div>
                  
                  <div className="w-px h-8 md:h-12 bg-gray-300" />
                  
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-amber-600">{currentPage}</div>
                    <div className="text-xs md:text-sm text-gray-600">{isIndonesian ? 'Halaman' : 'Page'}</div>
                  </div>
                  
                  <div className="w-px h-8 md:h-12 bg-gray-300" />
                  
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{totalPages}</div>
                    <div className="text-xs md:text-sm text-gray-600">{isIndonesian ? 'Total Halaman' : 'Total Pages'}</div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-center lg:justify-end space-x-4">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-amber-600 shadow-sm' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Clear All Button */}
                  {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== '')) && (
                    <button
                      onClick={handleClearSearch}
                      className="flex items-center text-gray-500 hover:text-red-600 transition-colors px-3 py-2 rounded-lg border border-gray-300 hover:border-red-300 bg-white hover:bg-red-50 text-sm"
                    >
                      <X className="w-4 h-4 mr-1" />
                      <span className="hidden sm:inline">{isIndonesian ? 'Hapus Semua' : 'Clear All'}</span>
                      <span className="sm:hidden">{isIndonesian ? 'Hapus' : 'Clear'}</span>
                    </button>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalPages > 0 ? (currentPage / totalPages) * 100 : 0}%` }}
                />
              </div>
              
              {/* Status Text */}
              <div className="mt-3 text-center text-xs md:text-sm text-gray-500">
                {totalItems > 0 ? (
                  isIndonesian 
                    ? `Menampilkan batik ${startIndex + 1}-${endIndex} dari ${totalItems} hasil`
                    : `Showing batiks ${startIndex + 1}-${endIndex} of ${totalItems} results`
                ) : (
                  isIndonesian ? 'Tidak ada hasil ditemukan' : 'No results found'
                )}
              </div>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <GalleryGrid
            batiks={paginatedItems}
            loading={loading}
            onCardClick={handleCardClick}
            onDelete={user ? handleDelete : undefined}
            showDeleteButton={!!user}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 md:mt-8 flex justify-center"
            >
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
              />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## components/forms/ThemeSelector.tsx <a id="ThemeSelector_tsx"></a>

### Dependencies

- `react`
- `lucide-react`
- `@/lib/utils/cn`
- `@/lib/types`

```typescript
// 🎨 THEME FEATURE - Theme and sub-theme selector component
'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import type { Theme } from '@/lib/types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedThemes: number[];
  onThemeChange: (themeIds: number[]) => void;
}

export function ThemeSelector({ 
  themes, 
  selectedThemes, 
  onThemeChange 
}: ThemeSelectorProps) {
  const [expandedThemes, setExpandedThemes] = useState<number[]>([]);
  const [selectedSubThemes, setSelectedSubThemes] = useState<number[]>([]);

  // Auto-expand selected themes
  useEffect(() => {
    setExpandedThemes(selectedThemes);
  }, [selectedThemes]);

  const toggleTheme = (themeId: number) => {
    const isSelected = selectedThemes.includes(themeId);
    
    if (isSelected) {
      // Remove theme and its sub-themes
      const newSelectedThemes = selectedThemes.filter(id => id !== themeId);
      const theme = themes.find(t => t.id === themeId);
      const subThemeIds = theme?.subTema?.map(st => st.id) || [];
      const newSelectedSubThemes = selectedSubThemes.filter(
        id => !subThemeIds.includes(id)
      );
      
      setSelectedSubThemes(newSelectedSubThemes);
      onThemeChange(newSelectedThemes);
    } else {
      // Add theme
      const newSelectedThemes = [...selectedThemes, themeId];
      onThemeChange(newSelectedThemes);
    }
  };

  const toggleSubTheme = (subThemeId: number) => {
    const isSelected = selectedSubThemes.includes(subThemeId);
    
    if (isSelected) {
      setSelectedSubThemes(prev => prev.filter(id => id !== subThemeId));
    } else {
      setSelectedSubThemes(prev => [...prev, subThemeId]);
    }
  };

  const toggleExpanded = (themeId: number) => {
    setExpandedThemes(prev => 
      prev.includes(themeId)
        ? prev.filter(id => id !== themeId)
        : [...prev, themeId]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Themes</h3>
      
      <div className="space-y-2">
        {themes.map((theme) => (
          <div key={theme.id} className="border rounded-lg p-3">
            {/* Theme Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`theme-${theme.id}`}
                  checked={selectedThemes.includes(theme.id)}
                  onChange={() => toggleTheme(theme.id)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`theme-${theme.id}`}
                  className="text-sm font-medium cursor-pointer"
                >
                  {theme.translations[0]?.nama || theme.nama}
                </label>
              </div>
              
              {theme.subTema && theme.subTema.length > 0 && (
                <button
                  type="button"
                  onClick={() => toggleExpanded(theme.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedThemes.includes(theme.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>

            {/* Sub-themes */}
            {expandedThemes.includes(theme.id) && 
             theme.subTema && 
             theme.subTema.length > 0 && (
              <div className="mt-3 ml-7 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {theme.subTema.map((subTheme) => (
                    <div key={subTheme.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`subtheme-${subTheme.id}`}
                        checked={selectedSubThemes.includes(subTheme.id)}
                        onChange={() => toggleSubTheme(subTheme.id)}
                        disabled={!selectedThemes.includes(theme.id)}
                        className="w-3 h-3 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
                      />
                      <label
                        htmlFor={`subtheme-${subTheme.id}`}
                        className={cn(
                          "text-sm cursor-pointer",
                          !selectedThemes.includes(theme.id) && "text-gray-400"
                        )}
                      >
                        {subTheme.translations[0]?.nama || subTheme.nama}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## components/gallery/GalleryGrid.tsx <a id="GalleryGrid_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `./GalleryCard`
- `@/components/ui/LoadingSpinner`
- `@/lib/contexts/LanguageContext`
- `@/lib/types`

```typescript
// components/gallery/GalleryGrid.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryCard } from './GalleryCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface GalleryGridProps {
  batiks: Batik[];
  loading?: boolean;
  onCardClick?: (batik: Batik) => void;
  onDelete?: (id: number) => void;
  showDeleteButton?: boolean;
}

export function GalleryGrid({ 
  batiks, 
  loading = false, 
  onCardClick, 
  onDelete,
  showDeleteButton = false 
}: GalleryGridProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" variant="primary" />
          <p className="text-amber-700 text-lg font-medium">
            {isIndonesian ? 'Memuat galeri...' : 'Loading gallery...'}
          </p>
        </div>
      </div>
    );
  }

  if (batiks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center py-20"
      >
        <div className="text-center max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="text-6xl mb-4">🎨</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            {isIndonesian ? 'Tidak Ada Hasil' : 'No Results Found'}
          </h3>
          <p className="text-amber-600 mb-6">
            {isIndonesian
              ? 'Tidak ada batik yang sesuai dengan pencarian atau filter Anda. Coba ubah kriteria pencarian.'
              : "We couldn't find any batik matching your search or filters. Try adjusting your search criteria."}
          </p>
          <div className="text-sm text-amber-500 bg-amber-50 p-3 rounded-lg">
            {isIndonesian
              ? 'Tips: Coba gunakan kata kunci yang lebih umum atau hapus beberapa filter'
              : 'Tip: Try using more general keywords or remove some filters'}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {batiks.map((batik, index) => (
            <motion.div
              key={batik.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: "easeOut"
              }}
              whileHover={{ y: -8 }}
              className="w-full"
            >
              <GalleryCard
                batik={batik}
                onClick={() => onCardClick?.(batik)}
                onDelete={onDelete ? () => onDelete(batik.id) : undefined}
                showDeleteButton={showDeleteButton}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

## components/gallery/GallerySearch.tsx <a id="GallerySearch_tsx"></a>

### Dependencies

- `lucide-react`
- `@/lib/contexts/LanguageContext`

```typescript
// components/gallery/GallerySearch.tsx
'use client';

import { Search, Filter } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface GallerySearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleFilters: () => void;
  showFilters: boolean;
}

export function GallerySearch({
  searchTerm,
  onSearchChange,
  onToggleFilters,
  showFilters,
}: GallerySearchProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={
              isIndonesian 
                ? "Cari batik berdasarkan nama..." 
                : "Search batik by name..."
            }
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
          />
        </div>
        
        <button
          onClick={onToggleFilters}
          className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
            showFilters 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Filter className="w-5 h-5 mr-2" />
          {isIndonesian ? 'Filter' : 'Filters'}
        </button>
      </div>
    </div>
  );
}
```

## components/layout/Footer.tsx <a id="Footer_tsx"></a>

### Dependencies

- `next/image`
- `next/link`
- `framer-motion`
- `@/lib/contexts/LanguageContext`

```typescript
// components/layout/Footer.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export function Footer() {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const partnerLogos = [
    { 
      src: '/images/LogoApp.png', 
      alt: 'Batik Sphere',
      width: 90,
      height: 90,
      className: 'w-[90px] sm:w-[90px] md:w-[80px]'
    },
    { 
      src: '/images/LogoLIH 1.png', 
      alt: 'LIH',
      width: 90,
      height: 90,
      className: 'w-[90px] sm:w-[90px] md:w-[60px]'
    },
    { 
      src: '/images/LogoUB.png', 
      alt: 'Universitas Brawijaya',
      width: 60,
      height: 60,
      className: 'w-[60px] sm:w-[60px] md:w-[60px]'
    },
    { 
      src: '/images/LogoRU 1.png', 
      alt: 'Ritsumeikan University',
      width: 50,
      height: 60,
      className: 'w-[50px] sm:w-[60px] md:w-[30px]'
    }
  ];

  return (
    <footer className="bg-[#CAC4B8] text-[#3A3A3A] py-8 px-4 md:px-16 w-full font-[Poppins, sans-serif]">
      <div className="container mx-auto">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* Left Section */}
          <div className="flex flex-col items-start mb-6 md:mb-0">
            <h2 className="text-lg font-bold mb-4">Batik Sphere</h2>
            <p className="text-sm max-w-md leading-relaxed">
              {isIndonesian 
                ? "Melestarikan dan merayakan warisan budaya batik Indonesia melalui inovasi digital dan eksplorasi budaya."
                : "Preserving and celebrating the rich heritage of Indonesian batik through digital innovation and cultural exploration."
              }
            </p>
          </div>

          {/* Partner Logos */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
            {partnerLogos.map((logo, index) => (
              <motion.div
                key={logo.alt}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative flex items-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`object-contain ${logo.className}`}
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#E1AD01] pt-4">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm mb-4 md:mb-0 text-[#3A3A3A] font-medium">
              Copyright &copy; 2025 Batik Sphere. All Rights Reserved.
            </p>
            <ul className="flex space-x-6 font-medium">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200 hover:underline"
                >
                  {isIndonesian ? 'Kebijakan Privasi' : 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[#3A3A3A] hover:text-[#C76A39] transition-all duration-200 hover:underline"
                >
                  {isIndonesian ? 'Syarat Layanan' : 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

## components/gallery/GalleryFilter.tsx <a id="GalleryFilter_tsx"></a>

### Dependencies

- `react`
- `lucide-react`
- `@/components/ui/Button`
- `@/lib/contexts/LanguageContext`
- `@/lib/utils/cn`
- `@/lib/utils/constants`
- `@/lib/types`

```typescript
// components/gallery/GalleryFilter.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Filter as FilterIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';
import { FILTER_OPTIONS } from '@/lib/utils/constants';
import type { Theme } from '@/lib/types';

interface FilterState {
  themes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

interface GalleryFilterProps {
  themes: Theme[];
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
}

// Dropdown component dengan perbaikan z-index dan positioning
interface DropdownProps {
  label: string;
  value: string | string[];
  options: Array<{ id: string | number; name: string }>;
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
}

function Dropdown({ 
  label, 
  value, 
  options, 
  onChange, 
  multiple = false, 
  placeholder = "Select..." 
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  // Calculate dropdown position to prevent cutoff
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = Math.min(240, options.length * 48); // Estimate dropdown height
      
      // Check if there's enough space below
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen, options.length]);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter(v => v !== optionValue)
        : [...currentValues, optionValue];
      onChange(newValues);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
  };

  const getDisplayValue = () => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return placeholder;
      if (value.length === 1) {
        const option = options.find(opt => String(opt.id) === value[0]);
        return option?.name || placeholder;
      }
      return `${value.length} selected`;
    }
    
    if (!value) return placeholder;
    const option = options.find(opt => String(opt.id) === value);
    return option?.name || placeholder;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 shadow-sm hover:shadow-md"
      >
        <span className={cn(
          "truncate text-sm",
          !value || (Array.isArray(value) && value.length === 0) 
            ? "text-gray-400" 
            : "text-gray-900"
        )}>
          {getDisplayValue()}
        </span>
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform text-gray-400 flex-shrink-0 ml-2",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop untuk mobile */}
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown menu */}
          <div 
            className={cn(
              "absolute w-full bg-white border border-gray-300 rounded-lg shadow-2xl max-h-60 overflow-auto z-50",
              dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
            )}
            style={{
              // Ensure dropdown is always visible
              minWidth: '100%',
              maxWidth: '400px'
            }}
          >
            {options.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No options available
              </div>
            ) : (
              <div className="py-1">
                {options.map((option) => {
                  const isSelected = multiple
                    ? Array.isArray(value) && value.includes(String(option.id))
                    : value === String(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(String(option.id))}
                      className={cn(
                        "w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between text-sm transition-colors",
                        isSelected && "bg-amber-50 text-amber-700 font-medium"
                      )}
                    >
                      <span className="truncate pr-2">{option.name}</span>
                      {multiple && isSelected && (
                        <div className="w-4 h-4 bg-amber-600 rounded-sm flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 bg-white rounded-sm" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function GalleryFilter({ 
  themes, 
  filters, 
  onFilterChange, 
  onClearFilters 
}: GalleryFilterProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const themeOptions = themes.map(theme => ({
    id: theme.id,
    name: theme.translations.find(t => t.languageId === currentLanguage.id)?.nama || theme.nama,
  }));

  const yearOptions = Array.from({ length: 25 }, (_, i) => ({
    id: 2000 + i,
    name: String(2000 + i),
  }));

  const techniqueOptions = FILTER_OPTIONS.TECHNIQUES.map(tech => ({
    id: tech,
    name: tech,
  }));

  const dyeOptions = FILTER_OPTIONS.DYES.map(dye => ({
    id: dye,
    name: dye,
  }));

  const shapeOptions = FILTER_OPTIONS.SHAPES.map(shape => ({
    id: shape,
    name: shape,
  }));

  const fabricOptions = FILTER_OPTIONS.FABRIC_TYPES.map(fabric => ({
    id: fabric,
    name: fabric,
  }));

  const hasActiveFilters = Object.values(filters).some(value => 
    Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FilterIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {isIndonesian ? 'Filter Pencarian' : 'Search Filters'}
          </h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 hover:border-red-300 transition-all duration-200"
          >
            <X className="w-4 h-4 mr-1" />
            {isIndonesian ? 'Hapus Semua' : 'Clear All'}
          </Button>
        )}
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Dropdown
          label={isIndonesian ? 'Tema Batik' : 'Batik Theme'}
          value={filters.themes.map(String)}
          options={themeOptions}
          onChange={(value) => onFilterChange('themes', Array.isArray(value) ? value.map(Number) : [])}
          multiple
          placeholder={isIndonesian ? 'Pilih tema...' : 'Select themes...'}
        />

        <Dropdown
          label={isIndonesian ? 'Tahun Pembuatan' : 'Year Created'}
          value={filters.year}
          options={yearOptions}
          onChange={(value) => onFilterChange('year', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih tahun...' : 'Select year...'}
        />

        <Dropdown
          label={isIndonesian ? 'Teknik Pembuatan' : 'Production Technique'}
          value={filters.technique}
          options={techniqueOptions}
          onChange={(value) => onFilterChange('technique', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih teknik...' : 'Select technique...'}
        />

        <Dropdown
          label={isIndonesian ? 'Jenis Pewarna' : 'Dye Type'}
          value={filters.dye}
          options={dyeOptions}
          onChange={(value) => onFilterChange('dye', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih pewarna...' : 'Select dye...'}
        />

        <Dropdown
          label={isIndonesian ? 'Bentuk Motif' : 'Pattern Shape'}
          value={filters.shape}
          options={shapeOptions}
          onChange={(value) => onFilterChange('shape', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih bentuk...' : 'Select shape...'}
        />

        <Dropdown
          label={isIndonesian ? 'Jenis Kain' : 'Fabric Type'}
          value={filters.fabricType}
          options={fabricOptions}
          onChange={(value) => onFilterChange('fabricType', Array.isArray(value) ? value[0] : value)}
          placeholder={isIndonesian ? 'Pilih jenis kain...' : 'Select fabric...'}
        />
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center mb-3">
            <span className="text-sm font-medium text-gray-600">
              {isIndonesian ? 'Filter Aktif:' : 'Active Filters:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.themes.length > 0 && (
              <div className="inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm border border-amber-200">
                <span className="font-medium">
                  {isIndonesian ? 'Tema:' : 'Themes:'} {filters.themes.length}
                </span>
                <button
                  onClick={() => onFilterChange('themes', [])}
                  className="ml-2 hover:text-amber-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.year && (
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm border border-blue-200">
                <span className="font-medium">
                  {isIndonesian ? 'Tahun:' : 'Year:'} {filters.year}
                </span>
                <button
                  onClick={() => onFilterChange('year', '')}
                  className="ml-2 hover:text-blue-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.technique && (
              <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm border border-green-200">
                <span className="font-medium">
                  {isIndonesian ? 'Teknik:' : 'Technique:'} {filters.technique}
                </span>
                <button
                  onClick={() => onFilterChange('technique', '')}
                  className="ml-2 hover:text-green-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.dye && (
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm border border-purple-200">
                <span className="font-medium">
                  {isIndonesian ? 'Pewarna:' : 'Dye:'} {filters.dye}
                </span>
                <button
                  onClick={() => onFilterChange('dye', '')}
                  className="ml-2 hover:text-purple-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.shape && (
              <div className="inline-flex items-center bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm border border-pink-200">
                <span className="font-medium">
                  {isIndonesian ? 'Bentuk:' : 'Shape:'} {filters.shape}
                </span>
                <button
                  onClick={() => onFilterChange('shape', '')}
                  className="ml-2 hover:text-pink-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {filters.fabricType && (
              <div className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm border border-indigo-200">
                <span className="font-medium">
                  {isIndonesian ? 'Kain:' : 'Fabric:'} {filters.fabricType}
                </span>
                <button
                  onClick={() => onFilterChange('fabricType', '')}
                  className="ml-2 hover:text-indigo-900 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filter Statistics */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 text-center">
            {isIndonesian 
              ? `${Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length} filter aktif`
              : `${Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== '').length} active filters`
            }
          </div>
        </div>
      )}
    </div>
  );
}
```

## components/layout/Hero.tsx <a id="Hero_tsx"></a>

### Dependencies

- `react`
- `next/image`
- `framer-motion`
- `@/components/ui/Button`
- `@/lib/contexts/LanguageContext`
- `lucide-react`

```typescript
// components/layout/Hero.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  backgroundImages?: string[];
}

export function Hero({ backgroundImages = [] }: HeroProps) {
  const { currentLanguage } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  // Memoize preload function
  const preloadImages = useCallback((images: string[]) => {
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let loadedImagesCount = 0;
    const imagePromises = images.map((imageSrc) => {
      return new Promise<void>((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.onerror = () => {
          loadedImagesCount++;
          if (loadedImagesCount === images.length) {
            setImagesLoaded(true);
          }
          resolve();
        };
        img.src = imageSrc;
      });
    });

    Promise.all(imagePromises);
  }, []);

  // Fetch hero images only once
  useEffect(() => {
    let isMounted = true;

    const fetchHeroPhotos = async () => {
      if (isLoading) return; // Prevent multiple calls
      
      setIsLoading(true);
      try {
        const response = await fetch('/api/hero');
        if (!response.ok) {
          throw new Error('Failed to fetch hero photos');
        }

        const data = await response.json();
        if (isMounted) {
          const imageLinks = data.map((item: { link: string }) => item.link);
          setHeroImages(imageLinks);
          preloadImages(imageLinks);
        }
      } catch (error) {
        console.error('Error fetching hero photos:', error);
        if (isMounted) {
          // Use default images if API fails
          const defaultImages = ['/images/gallery-hero-bg.jpg'];
          setHeroImages(defaultImages);
          preloadImages(defaultImages);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (backgroundImages.length > 0) {
      setHeroImages(backgroundImages);
      preloadImages(backgroundImages);
    } else if (heroImages.length === 0) {
      // Only fetch if we don't have images yet
      fetchHeroPhotos();
    }

    return () => {
      isMounted = false;
    };
  }, [backgroundImages, preloadImages, isLoading, heroImages.length]);

  // Auto-rotate background images
  useEffect(() => {
    if (heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const currentImage = heroImages.length > 0 
    ? heroImages[currentImageIndex] 
    : '/images/gallery-hero-bg.jpg';

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/corner-patttern-like-the-image.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Dynamic Background Images */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          {imagesLoaded && heroImages.length > 0 && (
            <motion.div
              key={currentImage}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage: `url(${currentImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                transform: 'scale(0.5)',
                transformOrigin: 'center right',
                opacity: 0.8,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Corner Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/corner-patttern-like-the-image.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Content Container - Fixed untuk navbar */}
      <div className="relative z-10 flex items-center justify-end min-h-screen px-4 sm:px-6 md:px-8 lg:px-20 pt-16 md:pt-20">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col md:flex-row justify-center items-end w-full gap-x-4 sm:gap-x-8 lg:gap-x-12 px-2 sm:px-4"
        >
          <div className="text-right flex flex-col justify-center items-end w-full py-8 sm:py-12 md:py-16 lg:py-20">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tight">
              {isIndonesian
                ? 'Selamat Datang di'
                : 'Welcome to'}
            </h1>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black mb-4 sm:mb-6 md:mb-8 leading-tight tracking-tight">
              {isIndonesian ? (
                'Database Batik Pertama!'
              ) : (
                <>
                  1<sup className="text-lg sm:text-xl md:text-2xl lg:text-3xl">st</sup> Batik Database!
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-6 sm:mb-8 md:mb-10 text-right max-w-[280px] sm:max-w-[340px] md:max-w-[400px] lg:max-w-lg xl:max-w-xl leading-relaxed">
              {isIndonesian
                ? "Dengan ratusan desain Batik dari butik di Jawa Timur, kami adalah database Batik terbesar di Indonesia!"
                : "With hundreds of Batik designs from boutiques in East Java, we are Indonesia's largest Batik database!"}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/gallery'}
              >
                {isIndonesian ? 'Jelajahi Koleksi' : 'Explore Collection'}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-black border-2 border-black hover:bg-black hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-300"
                onClick={() => {
                  const videoElement = document.getElementById('intro-video');
                  if (videoElement) {
                    videoElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isIndonesian ? 'Tonton Video' : 'Watch Video'}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center text-black">
          <span className="text-xs sm:text-sm mb-2">
            {isIndonesian ? 'Gulir ke bawah' : 'Scroll down'}
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-black rounded-full flex justify-center"
          >
            <div className="w-1 h-2 sm:h-3 bg-black rounded-full mt-2" />
          </motion.div>
        </div>
      </motion.div>

      {/* Image Indicators */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-black scale-125' 
                  : 'bg-black/50 hover:bg-black/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## components/layout/InfoSection.tsx <a id="InfoSection_tsx"></a>

### Dependencies

- `react`
- `next/image`
- `framer-motion`
- `@/lib/contexts/LanguageContext`

```typescript
// components/layout/InfoSection.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface InfoSlide {
  title: string;
  description: string;
  icon: string;
}

export function InfoSection() {
  const { currentLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const isIndonesian = currentLanguage.code === 'id';

  const slides: InfoSlide[] = [
    {
      title: isIndonesian ? 'Bentuk: Bunga Teratai' : 'Form: Lotus Flower',
      description: isIndonesian
        ? 'Melambangkan regenerasi dan transformasi budaya dalam konteks digital. Teratai berfungsi sebagai medium pelestarian dan pengembangan, memungkinkan batik berevolusi tanpa kehilangan esensi tradisionalnya.'
        : 'Symbolizes cultural regeneration and transformation in a digital context. The lotus serves as a medium for preservation and development, allowing batik to evolve without losing its traditional essence.',
      icon: '🪷'
    },
    {
      title: isIndonesian ? 'Elemen Topeng: Identitas dan Kearifan Lokal' : 'Mask Element: Identity and Local Wisdom',
      description: isIndonesian
        ? 'Mencerminkan identitas budaya Nusantara dengan nilai filosofis. Menegaskan bahwa digitalisasi motif batik bukan sekadar dokumentasi, tetapi juga upaya pelestarian budaya.'
        : 'Reflects the cultural identity of the Nusantara with philosophical values. Emphasizes that digitizing batik motifs is not just documentation, but also an effort to preserve culture.',
      icon: '🎭'
    },
    {
      title: isIndonesian ? 'Makna Warna: Kedalaman dan Inovasi' : 'Color Meaning: Depth and Innovation',
      description: isIndonesian
        ? 'Warna biru tua melambangkan kedalaman dan kekayaan batik. Warna biru muda merepresentasikan inovasi digital, memungkinkan penyebaran global.'
        : 'Dark blue symbolizes the depth and richness of batik. Light blue represents digital innovation, enabling global dissemination.',
      icon: '🎨'
    },
    {
      title: isIndonesian ? 'Struktur Motif' : 'Motif Structure',
      description: isIndonesian
        ? 'Mencerminkan potensi eksplorasi dari berbagai pendekatan multidisipliner untuk mendukung penelitian dan pengembangan keilmuan.'
        : 'Reflects the potential exploration from various multidisciplinary approaches to support research and scientific development.',
      icon: '🔬'
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 text-white py-16 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-20 h-20">
            <Image
              src="/images/LogoApp.png"
              alt="Batik Sphere Logo"
              fill
              className="object-contain"
              sizes="80px"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold mb-12 text-amber-100 text-center"
        >
          {isIndonesian ? 'Filosofi Batik Sphere' : 'Batik Sphere Philosophy'}
        </motion.h2>

        {/* Content */}
        <div className="text-center">
          {/* Slides */}
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto px-4"
              >
                <div className="text-5xl mb-6">
                  {slides[currentSlide].icon}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-amber-200">
                  {slides[currentSlide].title}
                </h3>
                
                <p className="text-base sm:text-lg text-amber-100 leading-relaxed max-w-3xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'bg-amber-300 scale-125' 
                    : 'bg-amber-500/50 hover:bg-amber-400/70'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

## components/layout/LanguageSelector.tsx <a id="LanguageSelector_tsx"></a>

### Dependencies

- `react`
- `next/image`
- `lucide-react`
- `framer-motion`
- `@/lib/contexts/LanguageContext`
- `@/lib/utils/cn`

```typescript
// 🌐 LANGUAGE FEATURE - Language selector dropdown
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';

export function LanguageSelector() {
  const { currentLanguage, availableLanguages, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (language: typeof currentLanguage) => {
    if (language.code === 'jp') {
      // Show coming soon message for Japanese
      alert('Japanese language support is coming soon!');
      return;
    }
    
    setLanguage(language);
    setIsOpen(false);
  };

  const getFlagSrc = (code: string) => {
    const flagMap: Record<string, string> = {
      'id': '/flags/id.png',
      'en': '/flags/us.png', // Using US flag for English
      'jp': '/flags/jp.png',
    };
    return flagMap[code] || '/flags/default.png';
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
          "bg-white/90 hover:bg-white border border-gray-200 hover:border-gray-300",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          isOpen && "ring-2 ring-blue-500 ring-offset-2"
        )}
      >
        <div className="flex items-center space-x-2">
          <div className="relative w-5 h-5">
            <Image
              src={getFlagSrc(currentLanguage.code)}
              alt={currentLanguage.name}
              fill
              className="object-cover rounded-sm"
              sizes="20px"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage.code.toUpperCase()}
          </span>
        </div>
        
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden"
          >
            <div className="py-2">
              {availableLanguages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  disabled={language.code === 'jp'}
                  className={cn(
                    "flex items-center space-x-3 w-full px-4 py-3 text-left transition-colors",
                    "hover:bg-gray-50 focus:outline-none focus:bg-gray-50",
                    currentLanguage.code === language.code && "bg-blue-50 text-blue-700",
                    language.code === 'jp' && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src={getFlagSrc(language.code)}
                      alt={language.name}
                      fill
                      className="object-cover rounded-sm"
                      sizes="20px"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {language.name}
                      </span>
                      {language.code === 'jp' && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          Soon
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">
                      {language.code.toUpperCase()}
                    </div>
                  </div>
                  
                  {currentLanguage.code === language.code && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Globe className="w-3 h-3" />
                <span>Language Settings</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

## components/layout/Navbar.tsx <a id="Navbar_tsx"></a>

### Dependencies

- `react`
- `next/link`
- `next/image`
- `next/navigation`
- `framer-motion`
- `lucide-react`
- `@/components/ui/Button`
- `./LanguageSelector`
- `@/lib/hooks/auth/useAuth`
- `@/lib/contexts/LanguageContext`
- `@/lib/utils/cn`

```typescript
// components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Plus, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LanguageSelector } from './LanguageSelector';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { cn } from '@/lib/utils/cn';

export function Navbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { currentLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isIndonesian = currentLanguage.code === 'id';

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const navLinks = [
    { href: '/', label: isIndonesian ? 'Beranda' : 'Home' },
    { href: '/gallery', label: isIndonesian ? 'Galeri' : 'Gallery' },
    { href: '/museum', label: isIndonesian ? 'Museum 3D' : '3D Museum' }, // Tambahkan ini
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#cac4b8] backdrop-blur-md shadow-lg fixed w-full top-0 z-50 py-1"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-12 h-12">
                <Image
                  src="/images/LogoApp.png"
                  alt="Batik Sphere"
                  fill
                  className="object-contain"
                  sizes="48px"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-[#5a2b2b] hidden sm:block">
                Batik Sphere
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {/* Nav Links */}
            <div className="flex items-center space-x-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="relative group">
                  <span
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      isActive(href) 
                        ? "text-[#5a2b2b]" 
                        : "text-[#5a2b2b] hover:text-[#c4a484]"
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-[#c4a484] transform origin-left transition-transform duration-300",
                      isActive(href) 
                        ? "scale-x-100" 
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </div>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/add-batik">
                    <Button
                      variant="primary"
                      size="sm"
                      className="bg-[#5a2b2b] hover:bg-[#c4a484] text-[#e5d0b5] hover:text-[#5a2b2b]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {isIndonesian ? 'Tambah Batik' : 'Add Batik'}
                    </Button>
                  </Link>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSignOut}
                    className="text-[#5a2b2b] hover:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {isIndonesian ? 'Keluar' : 'Logout'}
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-[#5a2b2b] hover:bg-[#c4a484] text-[#e5d0b5] hover:text-[#5a2b2b]"
                  >
                    {isIndonesian ? 'Masuk' : 'Sign In'}
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="text-[#5a2b2b] hover:text-red-600 p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            )}
            
            <LanguageSelector />
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#5a2b2b] hover:text-[#c4a484] focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#e5d0b5] shadow-lg border-t border-[#5a2b2b]"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                  isActive(href)
                    ? "text-[#5a2b2b] bg-[#c4a484]"
                    : "text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5]"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            
            {/* Mobile Auth */}
            <div className="pt-4 border-t border-[#5a2b2b]">
              {user ? (
                <Link
                  href="/add-batik"
                  className="block px-3 py-2 text-base font-medium text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-4 h-4 mr-2 inline" />
                  {isIndonesian ? 'Tambah Batik' : 'Add Batik'}
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="block px-3 py-2 text-base font-medium text-[#5a2b2b] hover:text-[#c4a484] hover:bg-[#e5d0b5] rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {isIndonesian ? 'Masuk' : 'Sign In'}
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
```

## components/layout/PageLayout.tsx <a id="PageLayout_tsx"></a>

### Dependencies

- `react`
- `./Navbar`
- `./Footer`

```typescript
// components/layout/PageLayout.tsx
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  showNavbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

export function PageLayout({
  children,
  showNavbar = true,
  showFooter = true,
  className = '',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavbar && <Navbar />}
      <main className={`flex-1 ${className}`}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}
```

## components/museum/BatikDetailModal.tsx <a id="BatikDetailModal_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `lucide-react`
- `next/image`
- `@/lib/contexts/LanguageContext`
- `@/lib/types`

```typescript
// components/museum/BatikDetailModal.tsx
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Palette, Scissors } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface BatikDetailModalProps {
  batik: Batik;
  onClose: () => void;
}

export function BatikDetailModal({ batik, onClose }: BatikDetailModalProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const translation = batik.translations.find(
    t => t.languageId === currentLanguage.id
  ) || batik.translations[0];

  // Keyboard controls for modal
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Escape' || event.code === 'Enter' || event.code === 'Backspace') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-amber-500"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="md:w-1/2 relative bg-black/30">
            <div className="absolute top-4 right-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              ESC to close
            </div>
            
            <div className="relative w-full h-64 md:h-full">
              <Image
                src={batik.foto[0]?.link || '/images/placeholder.jpg'}
                alt={batik.nama}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h2 className="text-2xl font-bold text-amber-200 mb-2">
                  {batik.nama}
                </h2>
                {batik.kode && (
                  <div className="inline-block bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {batik.kode}
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="text-xs text-amber-300">
                      {isIndonesian ? 'Tahun' : 'Year'}
                    </div>
                    <div className="font-medium text-white">{batik.tahun}</div>
                  </div>
                </div>

                {batik.seniman && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Seniman' : 'Artist'}
                      </div>
                      <div className="font-medium text-white">{batik.seniman}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* History */}
              {translation && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Sejarah' : 'History'}
                  </h3>
                  <p className="text-amber-100 text-sm leading-relaxed">
                    {translation.histori}
                  </p>
                </div>
              )}

              {/* Technical Details */}
              {translation && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Palette className="w-4 h-4 text-amber-400 mt-1" />
                      <div>
                        <div className="text-xs text-amber-300">
                          {isIndonesian ? 'Warna' : 'Color'}
                        </div>
                        <div className="text-sm text-white">{translation.warna}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Scissors className="w-4 h-4 text-amber-400 mt-1" />
                      <div>
                        <div className="text-xs text-amber-300">
                          {isIndonesian ? 'Teknik' : 'Technique'}
                        </div>
                        <div className="text-sm text-white">{translation.teknik}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Jenis Kain' : 'Fabric Type'}
                      </div>
                      <div className="text-sm text-white">{translation.jenisKain}</div>
                    </div>

                    <div>
                      <div className="text-xs text-amber-300">
                        {isIndonesian ? 'Pewarna' : 'Dye'}
                      </div>
                      <div className="text-sm text-white">{translation.pewarna}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Themes */}
              {batik.tema.length > 0 && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Tema' : 'Themes'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {batik.tema.map((tema) => {
                      const temaTranslation = tema.translations.find(
                        t => t.languageId === currentLanguage.id
                      ) || tema.translations[0];
                      
                      return (
                        <span
                          key={tema.id}
                          className="bg-blue-600 text-blue-100 px-3 py-1 rounded-full text-sm border border-blue-400"
                        >
                          {temaTranslation?.nama || tema.nama}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Dimensions */}
              {batik.dimensi && (
                <div>
                  <h3 className="font-semibold text-amber-300 mb-2">
                    {isIndonesian ? 'Dimensi' : 'Dimensions'}
                  </h3>
                  <div className="bg-black/30 p-3 rounded-lg border border-amber-600">
                    <div className="text-sm font-mono text-amber-200">{batik.dimensi}</div>
                  </div>
                </div>
              )}

              {/* Close instruction */}
              <div className="text-center pt-4 border-t border-amber-600">
                <div className="text-amber-300 text-sm">
                  {isIndonesian 
                    ? 'Tekan ESC atau ENTER untuk kembali'
                    : 'Press ESC or ENTER to return'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

## components/layout/StatsCounter.tsx <a id="StatsCounter_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `@/lib/contexts/LanguageContext`

```typescript
// 🏡 HOME FEATURE - Animated statistics counter
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface Stat {
  value: number;
  label: string[];
  icon: string;
  suffix?: string;
}

export function StatsCounter() {
  const { currentLanguage } = useLanguage();
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const isIndonesian = currentLanguage.code === 'id';

  const stats: Stat[] = [
    { 
      value: 500, 
      label: ['Digitalized Batik', 'Batik Terdigitalisasi'],
      icon: '🎨',
      suffix: '+'
    },
    { 
      value: 30, 
      label: ['Batik Boutiques', 'Butik Batik'],
      icon: '🏪',
      suffix: '+'
    },
    { 
      value: 90, 
      label: ['Themes & Subthemes', 'Tema & Subtema'],
      icon: '🏷️',
      suffix: '+'
    },
    { 
      value: 10, 
      label: ['Team Members', 'Anggota Tim'],
      icon: '👥',
      suffix: '+'
    },
  ];

  // Animate counters when in view
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCounters(stats.map(stat => Math.ceil(stat.value * easeOutQuart)));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, hasAnimated, stats]);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {isIndonesian ? 'Pencapaian Kami' : 'Our Achievements'}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isIndonesian 
              ? 'Angka-angka yang menunjukkan dedikasi kami dalam melestarikan warisan budaya batik Indonesia'
              : 'Numbers that show our dedication to preserving Indonesian batik cultural heritage'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Icon */}
                <div className="text-4xl mb-4">
                  {stat.icon}
                </div>
                
                {/* Counter */}
                <div className="text-4xl sm:text-5xl font-bold text-amber-600 mb-2">
                  {counters[index]}
                  {stat.suffix && (
                    <span className="text-amber-500">{stat.suffix}</span>
                  )}
                </div>
                
                {/* Label */}
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {stat.label[isIndonesian ? 1 : 0]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 max-w-3xl mx-auto">
            {isIndonesian 
              ? 'Setiap angka mewakili komitmen kami untuk menjaga, mendokumentasikan, dan mempromosikan kekayaan budaya batik Indonesia untuk generasi mendatang.'
              : 'Each number represents our commitment to preserve, document, and promote the richness of Indonesian batik culture for future generations.'}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

## components/museum/BatikFrame.tsx <a id="BatikFrame_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `@/lib/stores/museumStore`
- `@/lib/contexts/LanguageContext`
- `three`
- `@/lib/types`

```typescript
// components/museum/BatikFrame.tsx (Optimized)
'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Plane } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import * as THREE from 'three';
import type { Batik } from '@/lib/types';

interface BatikFrameProps {
  batik: Batik;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}

export function BatikFrame({ batik, position, rotation = [0, 0, 0], scale = 1 }: BatikFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  
  const { camera } = useThree();
  const { 
    setSelectedBatik, 
    selectedBatik, 
    quality,
    bookmarkedBatiks,
    toggleBookmark 
  } = useMuseumStore();
  const { currentLanguage } = useLanguage();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isNearby, setIsNearby] = useState(false);
  const [distance, setDistance] = useState(100);
  const [batikTexture, setBatikTexture] = useState<THREE.Texture | null>(null);

  const isSelected = selectedBatik?.id === batik.id;
  const isBookmarked = bookmarkedBatiks.includes(batik.id);
  const isIndonesian = currentLanguage.code === 'id';

  // Get current translation
  const translation = useMemo(() => {
    return batik.translations.find(t => t.languageId === currentLanguage.id) || batik.translations[0];
  }, [batik.translations, currentLanguage.id]);

  // Load batik texture with optimization
  useEffect(() => {
    if (batik.foto && batik.foto.length > 0) {
      const loader = new THREE.TextureLoader();
      loader.load(
        batik.foto[0].link,
        (texture) => {
          // Optimize texture based on quality
          if (quality === 'low') {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
          } else {
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = true;
          }
          
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.flipY = false;
          
          setBatikTexture(texture);
        },
        undefined,
        (error) => {
          console.error('Failed to load batik texture:', error);
          setBatikTexture(null);
        }
      );
    }

    // Cleanup texture on unmount
    return () => {
      if (batikTexture) {
        batikTexture.dispose();
      }
    };
  }, [batik.foto, quality]);

  // Distance calculation (optimized)
  useFrame(() => {
    if (!meshRef.current) return;

    const dist = camera.position.distanceTo(meshRef.current.position);
    setDistance(dist);
    setIsNearby(dist < 8);

    // Simple frame animation only when needed
    if (frameRef.current && (isSelected || isHovered) && quality !== 'low') {
      const time = performance.now() * 0.001;
      frameRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.01);
    } else if (frameRef.current) {
      frameRef.current.scale.setScalar(1);
    }
  });

  // Simplified materials
  const materials = useMemo(() => {
    const frameMaterial = new THREE.MeshLambertMaterial({
      color: isBookmarked ? 0xffd700 : 0x8b4513,
    });

    const fabricMaterial = new THREE.MeshLambertMaterial({
      map: batikTexture,
      color: 0xffffff,
    });

    return { frameMaterial, fabricMaterial };
  }, [isBookmarked, batikTexture]);

  // Handle interactions
  const handleClick = (event: any) => {
    event.stopPropagation();
    
    if (event.detail === 2) {
      setSelectedBatik(batik);
    } else if (event.shiftKey) {
      toggleBookmark(batik.id);
    } else {
      setSelectedBatik(isSelected ? null : batik);
    }
  };

  const handlePointerOver = () => {
    setIsHovered(true);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setIsHovered(false);
    document.body.style.cursor = 'auto';
  };

  // LOD - only show details when close
  const shouldShowText = distance < 6;

  // Portrait frame dimensions
  const frameWidth = 2.5;
  const frameHeight = 3.5;
  const frameDepth = 0.2;
  
  const fabricWidth = frameWidth - 0.3;
  const fabricHeight = frameHeight - 0.3;

  return (
    <group 
      ref={meshRef} 
      position={position} 
      rotation={rotation} 
      scale={scale}
    >
      {/* Portrait Frame */}
      <RigidBody type="fixed" colliders="cuboid">
        <Box 
          ref={frameRef}
          args={[frameWidth, frameHeight, frameDepth]} 
          position={[0, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <primitive object={materials.frameMaterial} />
        </Box>
      </RigidBody>

      {/* Batik Fabric */}
      <mesh 
        position={[0, 0, frameDepth/2 + 0.01]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <planeGeometry args={[fabricWidth, fabricHeight]} />
        <primitive object={materials.fabricMaterial} />
      </mesh>

      {/* Bookmark Indicator */}
      {isBookmarked && isNearby && (
        <mesh position={[frameWidth/2 - 0.2, frameHeight/2 - 0.2, frameDepth/2 + 0.1]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial color="#ffd700" />
        </mesh>
      )}

      {/* Information Panel - Only when close */}
      {shouldShowText && (
        <group position={[0, -frameHeight/2 - 0.6, 0.1]}>
          <mesh>
            <planeGeometry args={[frameWidth, 0.8]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>

          <Text
            position={[0, 0.2, 0.01]}
            fontSize={0.1}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={frameWidth - 0.2}
          >
            {batik.nama}
          </Text>

          {batik.seniman && (
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.06}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
              maxWidth={frameWidth - 0.2}
            >
              {batik.seniman}
            </Text>
          )}

          <Text
            position={[0, -0.2, 0.01]}
            fontSize={0.05}
            color="#cccccc"
            anchorX="center"
            anchorY="middle"
          >
            {batik.tahun}
          </Text>
        </group>
      )}
    </group>
  );
}
```

## components/museum/BatikGallery.tsx <a id="BatikGallery_tsx"></a>

### Dependencies

- `react`
- `./BatikFrame`
- `@/lib/stores/museumStore`
- `@/lib/types`

```typescript
// components/museum/BatikGallery.tsx
'use client';

import { useMemo } from 'react';
import { BatikFrame } from './BatikFrame';
import { useMuseumStore } from '@/lib/stores/museumStore';
import type { Batik } from '@/lib/types';

interface BatikGalleryProps {
  batiks: Batik[];
  currentFloor: number;
}

export function BatikGallery({ batiks, currentFloor }: BatikGalleryProps) {
  const { getBatiksByFloor } = useMuseumStore();
  
  const floorBatiks = useMemo(() => {
    const batiksOnFloor = getBatiksByFloor(currentFloor);
    console.log(`🖼️ Floor ${currentFloor}: ${batiksOnFloor.length} batik frames`);
    return batiksOnFloor;
  }, [currentFloor, getBatiksByFloor]);

  // Portrait frame positioning with proper spacing
  const framePositions = useMemo(() => {
    const positions: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
    }> = [];

    const floorHeight = (currentFloor - 1) * 6 + 2.5; // Adjusted for portrait frames
    const frameSpacing = 5.5; // Increased spacing for portrait frames

    // Back Wall - 6 portrait frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-13.75 + (i * frameSpacing), floorHeight, -24] as [number, number, number],
        rotation: [0, 0, 0] as [number, number, number]
      });
    }

    // Left Wall - 4 portrait frames
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [-24, floorHeight, -11 + (i * frameSpacing)] as [number, number, number],
        rotation: [0, Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Right Wall - 4 portrait frames  
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [24, floorHeight, -11 + (i * frameSpacing)] as [number, number, number],
        rotation: [0, -Math.PI / 2, 0] as [number, number, number]
      });
    }

    // Front Wall - 4 portrait frames
    for (let i = 0; i < 4; i++) {
      positions.push({
        position: [-8.25 + (i * frameSpacing), floorHeight, 24] as [number, number, number],
        rotation: [0, Math.PI, 0] as [number, number, number]
      });
    }

    return positions;
  }, [currentFloor]);

  if (!floorBatiks || floorBatiks.length === 0) {
    return (
      <group>
        {/* Empty floor message */}
        <mesh position={[0, (currentFloor - 1) * 6 + 3, 0]}>
          <planeGeometry args={[6, 2]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.8} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      {/* Render Portrait Batik Frames */}
      {floorBatiks.map((batik, index) => {
        const frameData = framePositions[index];
        if (!frameData || !batik) {
          console.warn(`❌ Missing frame data or batik for index ${index} on floor ${currentFloor}`);
          return null;
        }

        console.log(`📍 Placing portrait frame ${index + 1}: ${batik.nama} at position`, frameData.position);

        return (
          <BatikFrame
            key={`${currentFloor}-${batik.id}`}
            batik={batik}
            position={frameData.position}
            rotation={frameData.rotation}
            scale={0.9} // Slightly smaller scale for portrait frames
          />
        );
      })}
    </group>
  );
}
```

## components/museum/ControlsInstructions.tsx <a id="ControlsInstructions_tsx"></a>

### Dependencies

- `framer-motion`
- `lucide-react`
- `@/lib/contexts/LanguageContext`

```typescript
// components/museum/ControlsInstructions.tsx
'use client';

import { motion } from 'framer-motion';
import { X, Keyboard, Mouse } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface ControlsInstructionsProps {
  onClose: () => void;
}

export function ControlsInstructions({ onClose }: ControlsInstructionsProps) {
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  const controls = [
    {
      category: isIndonesian ? 'Gerakan' : 'Movement',
      icon: <Keyboard className="w-5 h-5" />,
      items: [
        { key: 'W', action: isIndonesian ? 'Maju' : 'Move Forward' },
        { key: 'S', action: isIndonesian ? 'Mundur' : 'Move Backward' },
        { key: 'A', action: isIndonesian ? 'Kiri' : 'Move Left' },
        { key: 'D', action: isIndonesian ? 'Kanan' : 'Move Right' },
        { key: 'Space', action: isIndonesian ? 'Lompat' : 'Jump' },
      ]
    },
    {
      category: isIndonesian ? 'Lantai' : 'Floor',
      icon: <Keyboard className="w-5 h-5" />,
      items: [
        { key: '1', action: isIndonesian ? 'Lantai 1' : 'Floor 1' },
        { key: '2', action: isIndonesian ? 'Lantai 2' : 'Floor 2' },
        { key: '3', action: isIndonesian ? 'Lantai 3' : 'Floor 3' },
        { key: 'Q', action: isIndonesian ? 'Lantai Bawah' : 'Floor Down' },
        { key: 'E', action: isIndonesian ? 'Lantai Atas' : 'Floor Up' },
      ]
    },
    {
      category: isIndonesian ? 'Tampilan' : 'View',
      icon: <Mouse className="w-5 h-5" />,
      items: [
        { key: isIndonesian ? 'Klik' : 'Click', action: isIndonesian ? 'Aktifkan kontrol mouse' : 'Enable mouse control' },
        { key: isIndonesian ? 'Gerak Mouse' : 'Mouse Move', action: isIndonesian ? 'Lihat sekeliling' : 'Look around' },
        { key: 'ESC', action: isIndonesian ? 'Lepas kontrol mouse' : 'Release mouse control' },
      ]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🎮</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-amber-800">
                  {isIndonesian ? 'Kontrol Museum' : 'Museum Controls'}
                </h2>
                <p className="text-amber-600 text-sm">
                  {isIndonesian ? 'Panduan navigasi museum virtual' : 'Virtual museum navigation guide'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {controls.map((section, index) => (
              <motion.div
                key={section.category}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-4"
              >
                <div className="flex items-center space-x-2 mb-4">
                  {section.icon}
                  <h3 className="font-semibold text-gray-800">
                    {section.category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs font-mono shadow-sm min-w-[2rem] text-center">
                        {item.key}
                      </kbd>
                      <span className="text-sm text-gray-600 ml-3 flex-1">
                        {item.action}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4"
          >
            <h4 className="font-semibold text-amber-800 mb-2">
              {isIndonesian ? '💡 Tips' : '💡 Tips'}
            </h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• {isIndonesian ? 'Klik di layar untuk mengaktifkan kontrol mouse' : 'Click on screen to enable mouse control'}</li>
              <li>• {isIndonesian ? 'Gunakan tombol 1-3 untuk pindah lantai dengan cepat' : 'Use keys 1-3 to quickly switch floors'}</li>
              <li>• {isIndonesian ? 'Klik pada frame batik untuk melihat detail' : 'Click on batik frames to view details'}</li>
              <li>• {isIndonesian ? 'Tekan ESC untuk melepas kontrol mouse' : 'Press ESC to release mouse control'}</li>
            </ul>
          </motion.div>

          {/* Start Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isIndonesian ? 'Mulai Jelajahi Museum' : 'Start Exploring Museum'}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

## components/museum/FirstPersonControls.tsx <a id="FirstPersonControls_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `three`
- `@/lib/stores/museumStore`

```typescript
// components/museum/FirstPersonControls.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3, Euler, MathUtils } from 'three';
import { useMuseumStore } from '@/lib/stores/museumStore';
import * as THREE from 'three';

interface FirstPersonControlsProps {
  speed?: number;
  sensitivity?: number;
  smoothing?: number;
}

export function FirstPersonControls({ 
  speed = 2.5, // Dikurangi dari 5 ke 2.5
  sensitivity = 0.0015, // Dikurangi dari 0.002 ke 0.0015
  smoothing = 0.15 // Ditingkatkan dari 0.1 ke 0.15 untuk movement yang lebih smooth
}: FirstPersonControlsProps) {
  const { camera, gl } = useThree();
  const { 
    currentFloor, 
    setCurrentFloor, 
    totalFloors,
    cameraPosition,
    isTransitioning,
    setCameraPosition,
    quality
  } = useMuseumStore();
  
  // Movement state
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const canJump = useRef(false);
  
  // Physics
  const velocity = useRef(new Vector3());
  const direction = useRef(new Vector3());
  const euler = useRef(new Euler(0, 0, 0, 'YXZ'));
  
  // Control state
  const isLocked = useRef(false);
  const minPolarAngle = useRef(0);
  const maxPolarAngle = useRef(Math.PI);

  // Initialize camera position and rotation
  useEffect(() => {
    camera.position.set(0, 2, 15);
    camera.rotation.set(0, 0, 0);
    euler.current.setFromQuaternion(camera.quaternion);
  }, [camera]);

  // Mouse movement handler dengan sensitivity yang lebih rendah
  const onMouseMove = useCallback((event: MouseEvent) => {
    if (!isLocked.current) return;

    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;

    euler.current.setFromQuaternion(camera.quaternion);
    
    // Apply horizontal rotation (yaw) - sensitivity dikurangi
    euler.current.y -= movementX * sensitivity;
    
    // Apply vertical rotation (pitch) with limits - sensitivity dikurangi
    euler.current.x -= movementY * sensitivity;
    euler.current.x = MathUtils.clamp(
      euler.current.x, 
      -Math.PI / 2 + 0.1,
      Math.PI / 2 - 0.1
    );
    
    // Reset roll to prevent tilting
    euler.current.z = 0;
    
    camera.quaternion.setFromEuler(euler.current);
  }, [camera, sensitivity]);

  // Keyboard handlers
  const onKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      // Movement
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = true;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = true;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = true;
        break;
      case 'Space':
        event.preventDefault();
        if (canJump.current) {
          velocity.current.y += 200; // Dikurangi dari 350 ke 200
          canJump.current = false;
        }
        break;

      // Floor navigation
      case 'Digit1':
        event.preventDefault();
        if (totalFloors >= 1 && currentFloor !== 1) {
          setCurrentFloor(1);
        }
        break;
      case 'Digit2':
        event.preventDefault();
        if (totalFloors >= 2 && currentFloor !== 2) {
          setCurrentFloor(2);
        }
        break;
      case 'Digit3':
        event.preventDefault();
        if (totalFloors >= 3 && currentFloor !== 3) {
          setCurrentFloor(3);
        }
        break;
      case 'KeyQ':
        event.preventDefault();
        if (currentFloor > 1) {
          setCurrentFloor(currentFloor - 1);
        }
        break;
      case 'KeyE':
        event.preventDefault();
        if (currentFloor < totalFloors) {
          setCurrentFloor(currentFloor + 1);
        }
        break;

      // Reset camera orientation
      case 'KeyR':
        euler.current.set(0, 0, 0);
        camera.quaternion.setFromEuler(euler.current);
        break;
    }
  }, [currentFloor, totalFloors, setCurrentFloor, camera]);

  const onKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward.current = false;
        break;
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft.current = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        moveBackward.current = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        moveRight.current = false;
        break;
    }
  }, []);

  // Pointer lock handlers
  const onPointerLockChange = useCallback(() => {
    isLocked.current = document.pointerLockElement === gl.domElement;
  }, [gl.domElement]);

  // Event listeners setup
  useEffect(() => {
    const canvas = gl.domElement;
    
    const onClick = () => {
      if (!document.pointerLockElement && !isTransitioning) {
        canvas.requestPointerLock();
      }
    };

    canvas.addEventListener('click', onClick);
    document.addEventListener('pointerlockchange', onPointerLockChange);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    return () => {
      canvas.removeEventListener('click', onClick);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [gl.domElement, onMouseMove, onKeyDown, onKeyUp, onPointerLockChange, isTransitioning]);

  // Animation loop dengan kecepatan yang dikurangi
  useFrame((state, delta) => {
    const clampedDelta = Math.min(delta, 0.1);
    
    if (isTransitioning) return;
    if (!isLocked.current) return;

    try {
      // Apply physics dengan damping yang lebih tinggi
      const dampingFactor = quality === 'low' ? 12.0 : 15.0; // Ditingkatkan untuk movement yang lebih terkontrol
      velocity.current.x -= velocity.current.x * dampingFactor * clampedDelta;
      velocity.current.z -= velocity.current.z * dampingFactor * clampedDelta;
      velocity.current.y -= 9.8 * 100.0 * clampedDelta; // Gravity tetap

      // Calculate movement direction
      direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
      direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
      direction.current.normalize();

      // Apply movement forces dengan kecepatan yang dikurangi
      const currentSpeedValue = speed * (quality === 'low' ? 0.6 : 0.8); // Dikurangi lebih banyak
      
      if (moveForward.current || moveBackward.current) {
        velocity.current.z -= direction.current.z * 250.0 * clampedDelta * currentSpeedValue; // Dikurangi dari 400 ke 250
      }
      if (moveLeft.current || moveRight.current) {
        velocity.current.x -= direction.current.x * 250.0 * clampedDelta * currentSpeedValue; // Dikurangi dari 400 ke 250
      }

      // Apply movement to camera dengan smoothing yang lebih halus
      const moveVector = new Vector3();
      moveVector.setFromMatrixColumn(camera.matrix, 0);
      moveVector.crossVectors(camera.up, moveVector);
      moveVector.multiplyScalar(-velocity.current.z * clampedDelta * 0.8); // Ditambah multiplier 0.8
      camera.position.add(moveVector);

      const strafeVector = new Vector3();
      strafeVector.setFromMatrixColumn(camera.matrix, 0);
      strafeVector.multiplyScalar(-velocity.current.x * clampedDelta * 0.8); // Ditambah multiplier 0.8
      camera.position.add(strafeVector);

      // Apply vertical movement
      camera.position.y += velocity.current.y * clampedDelta;

      // Boundary constraints
      const boundary = 23;
      camera.position.x = MathUtils.clamp(camera.position.x, -boundary, boundary);
      camera.position.z = MathUtils.clamp(camera.position.z, -boundary, boundary);

      // Floor constraints
      const floorHeight = (currentFloor - 1) * 6 + 2;
      const ceilingHeight = (currentFloor - 1) * 6 + 4.5;
      
      if (camera.position.y < floorHeight) {
        velocity.current.y = 0;
        camera.position.y = floorHeight;
        canJump.current = true;
      }
      
      if (camera.position.y > ceilingHeight) {
        camera.position.y = ceilingHeight;
        velocity.current.y = 0;
      }

      // Ensure camera stays level (no roll)
      euler.current.setFromQuaternion(camera.quaternion);
      euler.current.z = 0;
      camera.quaternion.setFromEuler(euler.current);

      // Update store with current position
      setCameraPosition([camera.position.x, camera.position.y, camera.position.z]);

    } catch (error) {
      console.warn('Error in FirstPersonControls:', error);
    }
  });

  return null;
}
```

## components/museum/LoadingScreen.tsx <a id="LoadingScreen_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `@/lib/contexts/LanguageContext`

```typescript
// components/museum/LoadingScreen.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const { currentLanguage } = useLanguage();
  const isIndonesian = currentLanguage.code === 'id';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center z-50">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-24 h-24 mx-auto bg-amber-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-2xl font-bold">🏛️</span>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {isIndonesian ? 'Museum Batik Digital' : 'Digital Batik Museum'}
          </h1>
          <p className="text-amber-600">
            {isIndonesian ? 'Memuat koleksi batik...' : 'Loading batik collection...'}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <div className="bg-amber-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-amber-500 to-orange-600 h-full rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-2 text-sm text-amber-700">
            {Math.round(progress)}%
          </div>
        </motion.div>

        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-sm text-amber-600 space-y-1"
        >
          <div className={progress > 20 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Memuat struktur museum' : 'Loading museum structure'}
          </div>
          <div className={progress > 50 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Menyiapkan koleksi batik' : 'Preparing batik collection'}
          </div>
          <div className={progress > 80 ? 'text-green-600' : ''}>
            ✓ {isIndonesian ? 'Mengatur pencahayaan' : 'Setting up lighting'}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

## components/museum/FloorTransition.tsx <a id="FloorTransition_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `@/lib/stores/museumStore`
- `@/lib/contexts/LanguageContext`
- `lucide-react`

```typescript
// components/museum/FloorTransition.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { ArrowUp, ArrowDown, Building } from 'lucide-react';

export function FloorTransition() {
  const { 
    currentFloor, 
    totalFloors,
    getFloorStats 
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [showTransition, setShowTransition] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<'up' | 'down'>('up');
  const [previousFloor, setPreviousFloor] = useState(currentFloor);
  const [displayFloor, setDisplayFloor] = useState(currentFloor);

  const isIndonesian = currentLanguage.code === 'id';
  const floorStats = getFloorStats();

  // Handle floor changes dengan timeout yang pasti
  useEffect(() => {
    if (currentFloor !== previousFloor) {
      console.log(`🏢 Floor changed: ${previousFloor} → ${currentFloor}`);
      
      // Set display data
      setTransitionDirection(currentFloor > previousFloor ? 'up' : 'down');
      setDisplayFloor(currentFloor);
      setShowTransition(true);
      setPreviousFloor(currentFloor);

      // Force hide after 2 seconds - menggunakan Promise untuk memastikan
      const hideTimer = setTimeout(() => {
        console.log('🏢 Force hiding transition');
        setShowTransition(false);
      }, 2000);

      return () => {
        clearTimeout(hideTimer);
      };
    }
  }, [currentFloor, previousFloor]);

  // Emergency cleanup - jika masih showing setelah 3 detik
  useEffect(() => {
    if (showTransition) {
      const emergencyTimer = setTimeout(() => {
        console.log('🚨 Emergency hiding transition');
        setShowTransition(false);
      }, 3000);

      return () => clearTimeout(emergencyTimer);
    }
  }, [showTransition]);

  const getFloorName = (floor: number): string => {
    const floorNames = {
      1: isIndonesian ? 'Lantai Dasar' : 'Ground Floor',
      2: isIndonesian ? 'Lantai Dua' : 'Second Floor', 
      3: isIndonesian ? 'Lantai Tiga' : 'Third Floor',
    };
    return floorNames[floor as keyof typeof floorNames] || `${isIndonesian ? 'Lantai' : 'Floor'} ${floor}`;
  };

  const getFloorDescription = (floor: number): string => {
    const descriptions = {
      1: isIndonesian ? 'Koleksi Batik Klasik' : 'Classic Batik Collection',
      2: isIndonesian ? 'Batik Modern & Kontemporer' : 'Modern & Contemporary Batik',
      3: isIndonesian ? 'Batik Nusantara' : 'Indonesian Regional Batik',
    };
    return descriptions[floor as keyof typeof descriptions] || '';
  };

  // Jangan render jika tidak showing
  if (!showTransition) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`transition-${displayFloor}`} // Key unik untuk setiap transition
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={() => setShowTransition(false)} // Click to dismiss
      >
        <motion.div
          initial={{ scale: 0.8, y: transitionDirection === 'up' ? 100 : -100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: transitionDirection === 'up' ? -100 : 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-br from-amber-900 to-orange-900 text-white rounded-2xl shadow-2xl p-6 max-w-sm mx-4 border border-amber-500 relative"
          onClick={(e) => e.stopPropagation()} // Prevent close on modal click
        >
          {/* Close Button */}
          <button
            onClick={() => setShowTransition(false)}
            className="absolute top-2 right-2 w-6 h-6 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-sm transition-colors"
          >
            ×
          </button>

          {/* Direction Indicator */}
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-amber-600 rounded-full">
              {transitionDirection === 'up' ? (
                <ArrowUp className="w-6 h-6" />
              ) : (
                <ArrowDown className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Floor Info */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Building className="w-4 h-4 text-amber-300" />
              <h2 className="text-xl font-bold text-amber-200">
                {getFloorName(displayFloor)}
              </h2>
            </div>
            
            <p className="text-amber-100 text-sm mb-4">
              {getFloorDescription(displayFloor)}
            </p>

            {/* Floor Stats */}
            <div className="bg-black/30 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-xl font-bold text-amber-300">
                    {floorStats[displayFloor] || 0}
                  </div>
                  <div className="text-xs text-amber-200">
                    {isIndonesian ? 'Koleksi' : 'Collection'}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-amber-300">
                    {displayFloor}/{totalFloors}
                  </div>
                  <div className="text-xs text-amber-200">
                    {isIndonesian ? 'Lantai' : 'Floor'}
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-hide progress */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2, ease: "linear" }}
              className="h-1 bg-amber-500 rounded-full mb-3"
            />

            <p className="text-amber-300 text-xs">
              {isIndonesian ? 'Klik untuk menutup' : 'Click to close'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

## components/museum/Minimap.tsx <a id="Minimap_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `@/lib/stores/museumStore`
- `@/lib/contexts/LanguageContext`
- `lucide-react`

```typescript
// components/museum/Minimap.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { Map, Maximize2, Minimize2, Navigation, Search } from 'lucide-react';

interface MinimapProps {
  size?: 'small' | 'medium' | 'large';
}

export function Minimap({ size = 'medium' }: MinimapProps) {
  const {
    currentFloor,
    cameraPosition,
    showMinimap,
    toggleMinimap,
    getBatiksByFloor,
    selectedBatik,
    setCurrentFloor,
    bookmarkedBatiks,
    totalFloors
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredBatik, setHoveredBatik] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const isIndonesian = currentLanguage.code === 'id';
  const floorBatiks = getBatiksByFloor(currentFloor);

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  const expandedSizeClasses = {
    small: 'w-64 h-64',
    medium: 'w-80 h-80',
    large: 'w-96 h-96'
  };

  // Draw minimap on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const scale = width / 50; // Museum is 50x50 units

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw museum layout
    drawMuseumLayout(ctx, width, height, scale);
    
    // Draw batik frames
    drawBatikFrames(ctx, scale, width, height);
    
    // Draw player position
    drawPlayerPosition(ctx, scale, width, height);
    
    // Draw bookmarked batiks
    drawBookmarkedBatiks(ctx, scale, width, height);

  }, [currentFloor, cameraPosition, floorBatiks, bookmarkedBatiks, isExpanded]);

  const drawMuseumLayout = (ctx: CanvasRenderingContext2D, width: number, height: number, scale: number) => {
    // Museum walls
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2;
    ctx.strokeRect(scale, scale, width - 2 * scale, height - 2 * scale);

    // Internal structure (simplified)
    ctx.strokeStyle = '#D2B48C';
    ctx.lineWidth = 1;
    
    // Draw grid for reference
    for (let i = 1; i < 5; i++) {
      const x = (width / 5) * i;
      const y = (height / 5) * i;
      
      ctx.beginPath();
      ctx.moveTo(x, scale);
      ctx.lineTo(x, height - scale);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(scale, y);
      ctx.lineTo(width - scale, y);
      ctx.stroke();
    }
  };

  const drawBatikFrames = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    const framePositions = getBatikFramePositions();
    
    framePositions.forEach((position, index) => {
      const batik = floorBatiks[index];
      if (!batik) return;

      const x = ((position.position[0] + 25) / 50) * width;
      const y = ((25 - position.position[2]) / 50) * height;
      
      // Frame background
      ctx.fillStyle = hoveredBatik === batik.id ? '#FFD700' : '#F5E6D3';
      ctx.fillRect(x - 3, y - 3, 6, 6);
      
      // Frame border
      ctx.strokeStyle = selectedBatik?.id === batik.id ? '#FF6B35' : '#8B4513';
      ctx.lineWidth = selectedBatik?.id === batik.id ? 2 : 1;
      ctx.strokeRect(x - 3, y - 3, 6, 6);
      
      // Bookmark indicator
      if (bookmarkedBatiks.includes(batik.id)) {
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.arc(x + 2, y - 2, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  };

  const drawPlayerPosition = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    const x = ((cameraPosition[0] + 25) / 50) * width;
    const y = ((25 - cameraPosition[2]) / 50) * height;
    
    // Player dot
    ctx.fillStyle = '#00FF00';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Player direction indicator (simplified)
    ctx.strokeStyle = '#00FF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - 8);
    ctx.stroke();
  };

  const drawBookmarkedBatiks = (ctx: CanvasRenderingContext2D, scale: number, width: number, height: number) => {
    // Already handled in drawBatikFrames
  };

  const getBatikFramePositions = () => {
    const positions: Array<{ position: [number, number, number] }> = [];
    
    // Back Wall - 8 frames
    for (let i = 0; i < 8; i++) {
      positions.push({
        position: [-17.5 + (i * 5), 0, -24] as [number, number, number]
      });
    }

    // Left Wall - 6 frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [-24, 0, -15 + (i * 5)] as [number, number, number]
      });
    }

    // Right Wall - 6 frames
    for (let i = 0; i < 6; i++) {
      positions.push({
        position: [24, 0, -15 + (i * 5)] as [number, number, number]
      });
    }

    return positions;
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to world coordinates
    const worldX = ((x / canvas.width) * 50) - 25;
    const worldZ = 25 - ((y / canvas.height) * 50);
    
    // Check if clicked on a batik frame
    const framePositions = getBatikFramePositions();
    framePositions.forEach((position, index) => {
      const distance = Math.sqrt(
        Math.pow(worldX - position.position[0], 2) + 
        Math.pow(worldZ - position.position[2], 2)
      );
      
      if (distance < 3 && floorBatiks[index]) {
        // Navigate to batik or show details
        console.log('Clicked on batik:', floorBatiks[index].nama);
      }
    });
  };

  if (!showMinimap) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed top-20 right-4 z-40 bg-black/80 backdrop-blur-sm rounded-xl border border-amber-500 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-amber-900/50">
          <div className="flex items-center space-x-2">
            <Map className="w-4 h-4 text-amber-300" />
            <span className="text-sm font-semibold text-amber-300">
              {isIndonesian ? `Lantai ${currentFloor}` : `Floor ${currentFloor}`}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-amber-800/50 rounded transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="w-3 h-3 text-amber-300" />
              ) : (
                <Maximize2 className="w-3 h-3 text-amber-300" />
              )}
            </button>
            
            <button
              onClick={toggleMinimap}
              className="p-1 hover:bg-red-800/50 rounded transition-colors"
            >
              <span className="text-xs text-red-300">×</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="p-3">
          <canvas
            ref={canvasRef}
            width={200}
            height={200}
            className={`${isExpanded ? expandedSizeClasses[size] : sizeClasses[size]} cursor-pointer border border-amber-600 rounded`}
            onClick={handleCanvasClick}
            onMouseMove={(e) => {
              // Handle hover effects for batik frames
              const canvas = canvasRef.current;
              if (!canvas) return;
              
              const rect = canvas.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              
              // Check if hovering over batik frame
              // Implementation would check frame positions and set hoveredBatik
            }}
            onMouseLeave={() => setHoveredBatik(null)}
          />
        </div>

        {/* Floor Navigation */}
        <div className="p-3 pt-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-amber-300">
              {isIndonesian ? 'Lantai:' : 'Floor:'}
            </span>
            <div className="flex space-x-1">
              {Array.from({ length: totalFloors }, (_, i) => i + 1).map(floor => (
                <button
                  key={floor}
                  onClick={() => setCurrentFloor(floor)}
                  className={`w-6 h-6 rounded text-xs font-bold transition-colors ${
                    floor === currentFloor
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-800/50 text-amber-300 hover:bg-amber-700/50'
                  }`}
                >
                  {floor}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        {isExpanded && (
          <div className="p-3 pt-0 border-t border-amber-800/50">
            <div className="text-xs space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Posisi Anda' : 'Your Position'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-300 rounded"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Frame Batik' : 'Batik Frame'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-amber-200">
                  {isIndonesian ? 'Bookmark' : 'Bookmarked'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="p-3 pt-0 text-xs text-amber-300">
          <div className="flex justify-between">
            <span>{isIndonesian ? 'Koleksi:' : 'Collection:'}</span>
            <span>{floorBatiks.length}</span>
          </div>
          <div className="flex justify-between">
            <span>{isIndonesian ? 'Bookmark:' : 'Bookmarked:'}</span>
            <span>{bookmarkedBatiks.length}</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
```

## components/museum/Museum.tsx <a id="Museum_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `@react-three/rapier`
- `@react-three/drei`
- `react-error-boundary`
- `./MuseumBuilding`
- `./BatikFrame`
- `./FirstPersonControls`
- `./MuseumUI`
- `@/lib/stores/museumStore`
- `@/lib/contexts/LanguageContext`
- `@/components/ui/LoadingSpinner`
- `@/lib/types`

```typescript
// components/museum/Museum.tsx (Performance Optimized)
'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import { MuseumBuilding } from './MuseumBuilding';
import { BatikFrame } from './BatikFrame';
import { FirstPersonControls } from './FirstPersonControls';
import { MuseumUI } from './MuseumUI';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import type { Batik } from '@/lib/types';

interface MuseumProps {
  batiks: Batik[];
}

// Keyboard controls mapping
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'reset', keys: ['KeyR'] },
];

function MuseumContent({ batiks }: { batiks: Batik[] }) {
  const { 
    setBatiks, 
    getBatiksByFloor, 
    quality,
    setLoading,
    setQuality
  } = useMuseumStore();

  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-detect performance and adjust quality
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    
    if (gl) {
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      const renderer = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : '';
      
      // Simple performance detection
      if (renderer.includes('Intel') || renderer.includes('Integrated')) {
        setQuality('low');
      } else if (renderer.includes('GTX') || renderer.includes('RTX') || renderer.includes('RX')) {
        setQuality('high');
      } else {
        setQuality('medium');
      }
    }
  }, [setQuality]);

  // Initialize museum data
  useEffect(() => {
    setLoading(true, 0);
    setBatiks(batiks);
    setIsInitialized(true);
    setLoading(false, 100);
  }, [batiks, setBatiks, setLoading]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-orange-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-white mt-4">Loading museum...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows={quality === 'high'}
          camera={{ 
            fov: 75, 
            near: 0.1, 
            far: 1000, 
            position: [0, 2, 15] 
          }}
          gl={{ 
            antialias: quality !== 'low',
            powerPreference: "high-performance",
            alpha: false,
            depth: true,
            stencil: false,
           
          }}
          performance={{ min: 0.5 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#87CEEB'); // Sky blue background
          }}
        >
          <Suspense fallback={null}>
            {/* Lighting - Simplified */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />

            {/* Physics World */}
            <Physics 
              gravity={[0, -9.81, 0]}
              debug={false}
              timeStep={1/60}
            >
              {/* Museum Building */}
              <MuseumBuilding />

              {/* Batik Frames - Only current floor for performance */}
              {(() => {
                const currentFloor = useMuseumStore.getState().currentFloor;
                const floorBatiks = getBatiksByFloor(currentFloor);
                const framePositions = generateFramePositions(currentFloor);
                
                return floorBatiks.slice(0, 16).map((batik, index) => {
                  const frameData = framePositions[index];
                  if (!frameData) return null;

                  return (
                    <BatikFrame
                      key={`${currentFloor}-${batik.id}`}
                      batik={batik}
                      position={frameData.position}
                      rotation={frameData.rotation}
                      scale={0.9}
                    />
                  );
                });
              })()}

              {/* First Person Controls */}
                <FirstPersonControls 
                    speed={quality === 'low' ? 2 : 2.5} // Dikurangi dari 4-5 ke 2-2.5
                    sensitivity={0.0015} // Dikurangi dari 0.002
                    smoothing={0.15} // Ditingkatkan untuk movement yang lebih smooth
                />
            </Physics>
          </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* UI Overlay */}
      <MuseumUI />
    </div>
  );
}

// Generate frame positions
function generateFramePositions(floor: number) {
  const positions: Array<{ position: [number, number, number]; rotation: [number, number, number] }> = [];
  const yOffset = (floor - 1) * 6 + 2.5;

  // Back Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-9 + (i * 6), yOffset, -24] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number]
    });
  }

  // Left Wall - 4 frames  
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-24, yOffset, -9 + (i * 6)] as [number, number, number],
      rotation: [0, Math.PI / 2, 0] as [number, number, number]
    });
  }

  // Right Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [24, yOffset, -9 + (i * 6)] as [number, number, number],
      rotation: [0, -Math.PI / 2, 0] as [number, number, number]
    });
  }

  // Front Wall - 4 frames
  for (let i = 0; i < 4; i++) {
    positions.push({
      position: [-9 + (i * 6), yOffset, 24] as [number, number, number],
      rotation: [0, Math.PI, 0] as [number, number, number]
    });
  }

  return positions;
}

export function Museum({ batiks }: MuseumProps) {
  return (
    <ErrorBoundary
      FallbackComponent={({ resetErrorBoundary }) => (
        <div className="min-h-screen bg-red-100 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Museum Error</h2>
            <button
              onClick={resetErrorBoundary}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
      onReset={() => window.location.reload()}
    >
      <MuseumContent batiks={batiks} />
    </ErrorBoundary>
  );
}
```

## components/museum/MuseumBuilding.tsx <a id="MuseumBuilding_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `@react-three/rapier`
- `@react-three/drei`
- `@/lib/utils/TextureManager`
- `@/lib/stores/museumStore`
- `three`

```typescript
// components/museum/MuseumBuilding.tsx (Updated)
'use client';

import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Box, Plane } from '@react-three/drei';
import { TextureManager } from '@/lib/utils/TextureManager';
import { useMuseumStore } from '@/lib/stores/museumStore';
import * as THREE from 'three';

export function MuseumBuilding() {
  const buildingRef = useRef<THREE.Group>(null);
  const { quality } = useMuseumStore();
  const [textures, setTextures] = useState({
    floor: null as THREE.Texture | null,
    wall: null as THREE.Texture | null,
    ceiling: null as THREE.Texture | null,
  });

  // Load textures based on quality
  useEffect(() => {
    const textureManager = TextureManager.getInstance();
    
    const loadTextures = async () => {
      const qualitySettings = {
        low: { repeat: [5, 5] as [number, number], quality: 'low' as const },
        medium: { repeat: [8, 8] as [number, number], quality: 'medium' as const },
        high: { repeat: [12, 12] as [number, number], quality: 'high' as const },
      };

      const settings = qualitySettings[quality];
      
      try {
        const [floor, wall, ceiling] = await Promise.all([
          textureManager.loadTexture('/textures/WoodFloor040_4K-JPG/WoodFloor040_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: settings.repeat,
            quality: settings.quality
          }),
          textureManager.loadTexture('/textures/leather_white_4k.gltf/textures/leather_white_rough_4k.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: [4, 4] as [number, number],
            quality: settings.quality
          }),
          textureManager.loadTexture('/textures/OfficeCeiling005_4K-JPG/OfficeCeiling005_4K-JPG_Color.jpg', {
            wrapS: THREE.RepeatWrapping,
            wrapT: THREE.RepeatWrapping,
            repeat: settings.repeat,
            quality: settings.quality
          })
        ]);

        setTextures({ floor, wall, ceiling });
      } catch (error) {
        console.error('Failed to load building textures:', error);
      }
    };

    loadTextures();
  }, [quality]);

  // Optimized materials based on quality
  const materials = useMemo(() => {
    const baseSettings = {
      low: { roughness: 0.8, metalness: 0.1 },
      medium: { roughness: 0.7, metalness: 0.1 },
      high: { roughness: 0.6, metalness: 0.2 },
    };

    const settings = baseSettings[quality];

    return {
      floor: new THREE.MeshStandardMaterial({
        map: textures.floor,
        color: textures.floor ? 0xffffff : 0xd2b48c,
        ...settings,
      }),
      wall: new THREE.MeshStandardMaterial({
        map: textures.wall,
        color: textures.wall ? 0xffffff : 0xf5f5dc,
        ...settings,
      }),
      ceiling: new THREE.MeshStandardMaterial({
        map: textures.ceiling,
        color: textures.ceiling ? 0xffffff : 0xf0f0f0,
        roughness: 0.3,
        metalness: 0.1,
      }),
    };
  }, [textures, quality]);

  // Lighting configuration based on quality
  const lightingConfig = useMemo(() => {
    switch (quality) {
      case 'low':
        return {
          intensity: 0.6,
          distance: 15,
          count: 2, // Fewer lights per floor
        };
      case 'medium':
        return {
          intensity: 0.8,
          distance: 18,
          count: 4,
        };
      case 'high':
        return {
          intensity: 1.0,
          distance: 20,
          count: 6, // More lights for better illumination
        };
    }
  }, [quality]);

  // Animated lighting (subtle)
  useFrame((state) => {
    if (buildingRef.current && quality === 'high') {
      // Subtle breathing effect for high quality
      const time = state.clock.elapsedTime;
      buildingRef.current.children.forEach((child, index) => {
        if (child.type === 'PointLight') {
          const light = child as THREE.PointLight;
          light.intensity = lightingConfig.intensity + Math.sin(time + index) * 0.1;
        }
      });
    }
  });

  return (
    <group ref={buildingRef}>
      {/* Ground Floor */}
      <RigidBody type="fixed" colliders="cuboid">
        <Plane 
          args={[50, 50]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, 0, 0]}
        >
          <primitive object={materials.floor} />
        </Plane>
      </RigidBody>

      {/* Museum Structure - 3 Floors */}
      {[1, 2, 3].map((floorLevel) => {
        const floorY = (floorLevel - 1) * 6;
        const ceilingY = floorLevel * 6 - 0.5;
        
        return (
          <group key={`floor-${floorLevel}`}>
            {/* Floor */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, floorY, 0]}>
                <primitive object={materials.floor} />
              </Box>
            </RigidBody>

            {/* Ceiling */}
            <RigidBody type="fixed" colliders="cuboid">
              <Box args={[48, 0.2, 48]} position={[0, ceilingY, 0]}>
                <primitive object={materials.ceiling} />
              </Box>
            </RigidBody>

          </group>
        );
      })}

      {/* Walls */}
      {[
        { position: [0, 9, -25], args: [50, 18, 1] as [number, number, number] }, // Back
        { position: [0, 9, 25], args: [50, 18, 1] as [number, number, number] },  // Front
        { position: [-25, 9, 0], args: [1, 18, 50] as [number, number, number] }, // Left
        { position: [25, 9, 0], args: [1, 18, 50] as [number, number, number] },  // Right
      ].map((wall, index) => (
        <RigidBody key={`wall-${index}`} type="fixed" colliders="cuboid">
          <Box args={wall.args} position={wall.position as [number, number, number]}>
            <primitive object={materials.wall} />
          </Box>
        </RigidBody>
      ))}

      {/* Optimized Lighting System */}
      {[1, 2, 3].map((floor) => {
        const y = floor * 6 - 2;
        const lightPositions = [];
        
        // Generate light positions based on quality
        const gridSize = lightingConfig.count === 2 ? 1 : lightingConfig.count === 4 ? 2 : 3;
        const spacing = 20 / gridSize;
        
        for (let x = 0; x < gridSize; x++) {
          for (let z = 0; z < gridSize; z++) {
            lightPositions.push([
              -10 + (x * spacing),
              y,
              -10 + (z * spacing)
            ]);
          }
        }
        
        return (
          <group key={`lighting-${floor}`}>
            {lightPositions.map((pos, index) => (
              <pointLight
                key={`light-${floor}-${index}`}
                position={pos as [number, number, number]}
                intensity={lightingConfig.intensity}
                distance={lightingConfig.distance}
                decay={2}
                color="#fff8dc"
                castShadow={quality === 'high'}
              />
            ))}
            
            {/* Ambient lighting for each floor */}
            <ambientLight 
              intensity={quality === 'low' ? 0.3 : 0.2} 
              color="#f0f8ff" 
            />
          </group>
        );
      })}

      {/* Emergency lighting (low quality fallback) */}
      {quality === 'low' && (
        <directionalLight
          position={[10, 20, 10]}
          intensity={0.8}
          color="#fff8dc"
          castShadow={false}
        />
      )}
    </group>
  );
}
```

## components/museum/MuseumUI.tsx <a id="MuseumUI_tsx"></a>

### Dependencies

- `react`
- `framer-motion`
- `@/lib/stores/museumStore`
- `@/lib/contexts/LanguageContext`
- `./BatikDetailModal`
- `./Minimap`
- `./FloorTransition`
- `@/lib/utils/PerformanceMonitor`

```typescript
// components/museum/MuseumUI.tsx (Simplified - Remove Tutorial & Audio)
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Settings, 
  Map, 
  Search,
  Bookmark,
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';
import { useMuseumStore } from '@/lib/stores/museumStore';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import { BatikDetailModal } from './BatikDetailModal';
import { Minimap } from './Minimap';
import { FloorTransition } from './FloorTransition';
import { PerformanceMonitor } from '@/lib/utils/PerformanceMonitor';

interface PerformanceStats {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  textures: number;
}

export function MuseumUI() {
  const { 
    currentFloor, 
    selectedBatik, 
    setSelectedBatik,
    getBatiksByFloor,
    getTotalBatiks,
    showMinimap,
    toggleMinimap,
    showPerformanceStats,
    togglePerformanceStats,
    searchQuery,
    setSearchQuery,
    bookmarkedBatiks,
    quality
  } = useMuseumStore();
  
  const { currentLanguage } = useLanguage();
  const [showSettings, setShowSettings] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [performanceStats, setPerformanceStats] = useState<PerformanceStats>({
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    textures: 0
  });
  
  const isIndonesian = currentLanguage.code === 'id';
  const currentFloorBatiks = getBatiksByFloor(currentFloor);
  const totalBatiks = getTotalBatiks();

  // Performance monitoring
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    const unsubscribe = monitor.subscribe((metrics) => {
      setPerformanceStats(metrics);
    });

    return unsubscribe;
  }, []);

  const handleExitMuseum = () => {
    if (window.confirm(isIndonesian ? 'Keluar dari museum?' : 'Exit museum?')) {
      window.location.href = '/gallery';
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="fixed top-4 left-4 right-4 z-30 flex items-center justify-between">
        {/* Museum Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg shadow-lg p-3 border border-amber-500"
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏛️</div>
            <div>
              <div className="text-white font-bold text-lg">
                {isIndonesian ? 'Museum Batik Digital' : 'Digital Batik Museum'}
              </div>
              <div className="text-amber-300 text-sm">
                {isIndonesian ? `Lantai ${currentFloor}` : `Floor ${currentFloor}`} • 
                <span className="ml-1">
                  {currentFloorBatiks.length} {isIndonesian ? 'koleksi' : 'collections'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-3 rounded-lg transition-colors ${
              showSearch ? 'bg-blue-600' : 'bg-black/70 hover:bg-black/80'
            } text-white border border-amber-500`}
            title={isIndonesian ? 'Cari Batik' : 'Search Batik'}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={toggleMinimap}
            className={`p-3 rounded-lg transition-colors ${
              showMinimap ? 'bg-blue-600' : 'bg-black/70 hover:bg-black/80'
            } text-white border border-amber-500`}
            title={isIndonesian ? 'Minimap' : 'Minimap'}
          >
            <Map className="w-5 h-5" />
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-black/70 hover:bg-black/80 text-white rounded-lg transition-colors border border-amber-500"
            title={isIndonesian ? 'Pengaturan' : 'Settings'}
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* Exit */}
          <button
            onClick={handleExitMuseum}
            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            title={isIndonesian ? 'Keluar Museum' : 'Exit Museum'}
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Search Panel */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-30"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-amber-500 max-w-md mx-auto">
              <div className="flex items-center space-x-3 mb-3">
                <Search className="w-5 h-5 text-amber-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isIndonesian ? 'Cari batik...' : 'Search batik...'}
                  className="flex-1 bg-transparent text-white placeholder-amber-300 outline-none"
                  autoFocus
                />
              </div>
              
              {searchQuery && (
                <div className="text-amber-300 text-sm">
                  {isIndonesian ? 'Tekan Enter untuk mencari di museum' : 'Press Enter to search in museum'}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 right-4 z-30 w-80"
          >
            <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-amber-500 overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-amber-900/50">
                <h3 className="text-white font-semibold flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  {isIndonesian ? 'Pengaturan' : 'Settings'}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-amber-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {/* Performance Stats Toggle */}
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 text-sm">
                    {isIndonesian ? 'Statistik Performa' : 'Performance Stats'}
                  </span>
                  <button
                    onClick={togglePerformanceStats}
                    className={`p-2 rounded transition-colors ${
                      showPerformanceStats ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    {showPerformanceStats ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                {/* Bookmarks */}
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 text-sm">
                    {isIndonesian ? 'Bookmark Tersimpan' : 'Saved Bookmarks'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-4 h-4 text-amber-400" />
                    <span className="text-white">{bookmarkedBatiks.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Performance Stats */}
      <AnimatePresence>
        {showPerformanceStats && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-4 left-4 z-30"
          >
            <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-500 text-xs">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 font-semibold">Performance</span>
              </div>
              <div className="space-y-1 text-white">
                <div className="flex justify-between">
                  <span>FPS:</span>
                  <span className={performanceStats.fps < 30 ? 'text-red-400' : 'text-green-400'}>
                    {performanceStats.fps}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Memory:</span>
                  <span>{performanceStats.memory}MB</span>
                </div>
                <div className="flex justify-between">
                  <span>Quality:</span>
                  <span className="capitalize text-amber-300">{quality}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floor Stats */}
      <div className="fixed bottom-4 right-4 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/70 backdrop-blur-sm rounded-lg p-4 border border-amber-500"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-400 mb-1">
              {currentFloorBatiks.length}
            </div>
            <div className="text-amber-300 text-sm mb-2">
              {isIndonesian ? 'Koleksi Lantai Ini' : 'Floor Collections'}
            </div>
            <div className="text-xs text-gray-300">
              {isIndonesian ? `Total: ${totalBatiks} batik` : `Total: ${totalBatiks} batiks`}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keyboard Hints */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-amber-500"
        >
          <div className="text-white text-center text-sm">
            <div className="font-semibold text-amber-300 mb-2">
              {isIndonesian ? 'Kontrol Cepat' : 'Quick Controls'}
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-amber-400">WASD:</span> {isIndonesian ? 'Bergerak' : 'Move'}
              </div>
              <div>
                <span className="text-amber-400">1-3:</span> {isIndonesian ? 'Lantai' : 'Floors'}
              </div>
              <div>
                <span className="text-amber-400">M:</span> {isIndonesian ? 'Minimap' : 'Minimap'}
              </div>
              <div>
                <span className="text-amber-400">ESC:</span> {isIndonesian ? 'Lepas Mouse' : 'Release Mouse'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Components */}
      {showMinimap && <Minimap />}
      <FloorTransition />

      {/* Batik Detail Modal */}
      <AnimatePresence>
        {selectedBatik && (
          <BatikDetailModal
            batik={selectedBatik}
            onClose={() => setSelectedBatik(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
```

## components/museum/PerformanceOptimizer.tsx <a id="PerformanceOptimizer_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `@/lib/utils/PerformanceMonitor`
- `three`

```typescript
// components/museum/PerformanceOptimizer.tsx (Fixed)
'use client';

import { useEffect, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerformanceMonitor } from '@/lib/utils/PerformanceMonitor';
import * as THREE from 'three';

interface PerformanceOptimizerProps {
  onQualityChange?: (quality: 'low' | 'medium' | 'high') => void;
}

export function PerformanceOptimizer({ onQualityChange }: PerformanceOptimizerProps) {
  const { gl, scene } = useThree();
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium');
  const [monitor] = useState(() => PerformanceMonitor.getInstance());

  useEffect(() => {
    const unsubscribe = monitor.subscribe((metrics: any) => {
      const recommendedQuality = monitor.getQualityRecommendation();
      
      if (recommendedQuality !== quality) {
        setQuality(recommendedQuality);
        onQualityChange?.(recommendedQuality);
        
        // Apply quality settings to renderer
        applyQualitySettings(recommendedQuality);
      }
    });

    return unsubscribe;
  }, [monitor, quality, onQualityChange]);

  const applyQualitySettings = (newQuality: 'low' | 'medium' | 'high') => {
    switch (newQuality) {
      case 'low':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1));
        gl.shadowMap.enabled = false;
        // Note: antialias is read-only, set during context creation
        break;
      case 'medium':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
        break;
      case 'high':
        gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFSoftShadowMap;
        // Note: antialias is read-only, set during context creation
        break;
    }
  };

  useFrame(() => {
    monitor.updateMetrics(gl, scene);
  });

  return null;
}
```

## components/museum/models/Bench.tsx <a id="Bench_tsx"></a>

### Dependencies

- `react`
- `@react-three/rapier`
- `@react-three/drei`
- `./ModelErrorBoundary`
- `three`

```typescript
// components/museum/models/Bench.tsx
'use client';

import { useRef, Suspense } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface BenchProps {
  position: [number, number, number];
  rotation?: [number, number, number];
}

function BenchModel({ position, rotation = [0, 0, 0] }: BenchProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  let gltf;
  try {
    gltf = useGLTF('/models/modern_bench_1/scene.gltf');
  } catch (error) {
    console.error('Failed to load modern bench model:', error);
    // Fallback to simple geometry
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          {/* Modern bench fallback */}
          <mesh>
            <boxGeometry args={[2.5, 0.1, 1]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
          {/* Legs */}
          <mesh position={[-1, -0.3, -0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[1, -0.3, -0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[-1, -0.3, 0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[1, -0.3, 0.4]}>
            <boxGeometry args={[0.1, 0.5, 0.1]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.4, -0.45]}>
            <boxGeometry args={[2.5, 0.8, 0.1]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      </RigidBody>
    );
  }
  
  if (!gltf || !gltf.scene) {
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          <mesh>
            <boxGeometry args={[2.5, 0.5, 1]} />
            <meshStandardMaterial color="#2c3e50" />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group ref={meshRef} position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={[1, 1, 1]} />
      </group>
    </RigidBody>
  );
}

function BenchFallback() {
  return (
    <mesh>
      <boxGeometry args={[2.5, 0.5, 1]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function Bench(props: BenchProps) {
  return (
    <ModelErrorBoundary modelName="modern-bench">
      <Suspense fallback={<BenchFallback />}>
        <BenchModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

// Preload model
try {
  useGLTF.preload('/models/modern_bench_1/scene.gltf');
} catch (error) {
  console.warn('Failed to preload modern bench model:', error);
}
```

## components/museum/models/CeilingLamp.tsx <a id="CeilingLamp_tsx"></a>

### Dependencies

- `react`
- `@react-three/drei`
- `./ModelErrorBoundary`
- `three`

```typescript
// components/museum/models/CeilingLamp.tsx
'use client';

import { useRef, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface CeilingLampProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  lightIntensity?: number;
  lightColor?: string;
}

function CeilingLampModel({ 
  position, 
  rotation = [0, 0, 0], 
  lightIntensity = 1.0,
  lightColor = "#fff8dc"
}: CeilingLampProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  let gltf;
  try {
    gltf = useGLTF('/models/ceiling_lamp_-_11mb/scene.gltf');
  } catch (error) {
    console.error('Failed to load ceiling lamp model:', error);
    // Modern ceiling lamp fallback
    return (
      <group ref={meshRef} position={position} rotation={rotation}>
        {/* Modern pendant lamp */}
        <mesh>
          <cylinderGeometry args={[0.4, 0.6, 1.2, 12]} />
          <meshStandardMaterial 
            color="#f8f9fa" 
            emissive="#fff3cd" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
        
        {/* Lamp cord */}
        <mesh position={[0, 1, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
          <meshStandardMaterial color="#2c3e50" />
        </mesh>
        
        {/* Ceiling mount */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.2, 8]} />
          <meshStandardMaterial color="#34495e" />
        </mesh>
        
        <pointLight
          position={[0, -0.8, 0]}
          intensity={lightIntensity}
          distance={15}
          decay={2}
          color={lightColor}
        />
        
        <spotLight
          position={[0, -0.5, 0]}
          angle={Math.PI / 2.5}
          penumbra={0.3}
          intensity={lightIntensity * 0.9}
          distance={18}
          decay={2}
          color={lightColor}
          target-position={[0, -10, 0]}
        />
      </group>
    );
  }
  
  if (!gltf || !gltf.scene) {
    return (
      <group ref={meshRef} position={position} rotation={rotation}>
        <mesh>
          <cylinderGeometry args={[0.4, 0.6, 1.2, 12]} />
          <meshStandardMaterial color="#f8f9fa" />
        </mesh>
        <pointLight
          position={[0, -0.8, 0]}
          intensity={lightIntensity}
          distance={15}
          decay={2}
          color={lightColor}
        />
      </group>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      <primitive object={clonedScene} scale={[1, 1, 1]} />
      
      {/* Enhanced lighting for modern lamp */}
      <pointLight
        position={[0, -0.8, 0]}
        intensity={lightIntensity}
        distance={15}
        decay={2}
        color={lightColor}
      />
      
      <spotLight
        position={[0, -0.5, 0]}
        angle={Math.PI / 2.5}
        penumbra={0.3}
        intensity={lightIntensity * 0.9}
        distance={18}
        decay={2}
        color={lightColor}
        target-position={[0, -10, 0]}
      />
    </group>
  );
}

function CeilingLampFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.4, 0.6, 1.2, 12]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function CeilingLamp(props: CeilingLampProps) {
  return (
    <ModelErrorBoundary modelName="ceiling-lamp-11mb">
      <Suspense fallback={<CeilingLampFallback />}>
        <CeilingLampModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/ceiling_lamp_-_11mb/scene.gltf');
} catch (error) {
  console.warn('Failed to preload ceiling lamp model:', error);
}
```

## components/museum/models/ModelErrorBoundary.tsx <a id="ModelErrorBoundary_tsx"></a>

### Dependencies

- `react-error-boundary`
- `react`

```typescript
// components/museum/models/ModelErrorBoundary.tsx
'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { ReactNode } from 'react';

interface ModelErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
  modelName: string;
}

function ModelErrorFallback({ error, resetErrorBoundary, modelName }: ModelErrorFallbackProps) {
  console.error(`Failed to load model: ${modelName}`, error);
  
  return (
    <mesh>
      <boxGeometry args={[2, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}

interface ModelErrorBoundaryProps {
  children: ReactNode;
  modelName: string;
}

export function ModelErrorBoundary({ children, modelName }: ModelErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={(props) => <ModelErrorFallback {...props} modelName={modelName} />}
      onError={(error) => console.error(`Model loading error for ${modelName}:`, error)}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## components/museum/models/PictureFrame.tsx <a id="PictureFrame_tsx"></a>

### Dependencies

- `react`
- `@react-three/rapier`
- `@react-three/drei`
- `./ModelErrorBoundary`
- `three`

```typescript
// components/museum/models/PictureFrame.tsx
'use client';

import { useRef, Suspense } from 'react';
import { RigidBody } from '@react-three/rapier';
import { useGLTF } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface PictureFrameProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  imageUrl?: string;
}

function PictureFrameModel({ 
  position, 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  imageUrl = '/images/placeholder.jpg'
}: PictureFrameProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  let gltf;
  try {
    gltf = useGLTF('/models/wooden_picture_frame/scene.gltf');
  } catch (error) {
    console.error('Failed to load wooden picture frame model:', error);
    // Wooden frame fallback
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          {/* Frame border */}
          <mesh>
            <boxGeometry args={[3.2, 2.4, 0.3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
          
          {/* Inner frame */}
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[2.8, 2, 0.1]} />
            <meshStandardMaterial color="#654321" />
          </mesh>
          
          {/* Picture area */}
          <mesh position={[0, 0, 0.16]}>
            <planeGeometry args={[2.6, 1.8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          
          {/* Glass */}
          <mesh position={[0, 0, 0.17]}>
            <planeGeometry args={[2.7, 1.9]} />
            <meshStandardMaterial 
              transparent 
              opacity={0.1} 
              color="#ffffff"
            />
          </mesh>
        </group>
      </RigidBody>
    );
  }
  
  if (!gltf || !gltf.scene) {
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group ref={meshRef} position={position} rotation={rotation}>
          <mesh>
            <boxGeometry args={[3.2, 2.4, 0.3]} />
            <meshStandardMaterial color="#8b4513" />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group ref={meshRef} position={position} rotation={rotation}>
        <primitive object={clonedScene} scale={scale} />
        
        {/* Ambient lighting for frame */}
        <pointLight
          position={[0, 0, 1]}
          intensity={0.4}
          distance={5}
          decay={2}
          color="#fff8dc"
        />
      </group>
    </RigidBody>
  );
}

function PictureFrameFallback() {
  return (
    <mesh>
      <boxGeometry args={[3.2, 2.4, 0.3]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function PictureFrame(props: PictureFrameProps) {
  return (
    <ModelErrorBoundary modelName="wooden-picture-frame">
      <Suspense fallback={<PictureFrameFallback />}>
        <PictureFrameModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/wooden_picture_frame/scene.gltf');
} catch (error) {
  console.warn('Failed to preload wooden picture frame model:', error);
}
```

## components/museum/models/Statue.tsx <a id="Statue_tsx"></a>

### Dependencies

- `react`
- `@react-three/fiber`
- `@react-three/rapier`
- `@react-three/drei`
- `./ModelErrorBoundary`
- `three`

```typescript
// components/museum/models/Statue.tsx
'use client';

import { useRef, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { useGLTF, Html } from '@react-three/drei';
import { ModelErrorBoundary } from './ModelErrorBoundary';
import * as THREE from 'three';

interface StatueProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  title?: string;
  description?: string;
}

function StatueModel({ 
  position, 
  rotation = [0, 0, 0], 
  scale = [1, 1, 1],
  title = "Aphrodite Kallipygos",
  description = "Ancient Greek statue of Aphrodite"
}: StatueProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  let gltf;
  try {
    gltf = useGLTF('/models/aphrodite_kallipygos_statue/scene.gltf');
  } catch (error) {
    console.error('Failed to load Aphrodite statue model:', error);
    // Classical statue fallback
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group 
          ref={meshRef} 
          position={position} 
          rotation={rotation}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          {/* Classical statue base */}
          <mesh position={[0, -0.5, 0]}>
            <cylinderGeometry args={[0.8, 1, 0.3, 8]} />
            <meshStandardMaterial color="#e8e8e8" />
          </mesh>
          
          {/* Main body */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.4, 0.5, 2, 12]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {/* Head */}
          <mesh position={[0, 1.8, 0]}>
            <sphereGeometry args={[0.35, 12, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {/* Arms */}
          <mesh position={[-0.6, 1, 0]} rotation={[0, 0, -0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          <mesh position={[0.6, 1, 0]} rotation={[0, 0, 0.3]}>
            <cylinderGeometry args={[0.1, 0.12, 1.2, 8]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
          
          {hovered && (
            <Html position={[0, 3, 0]} center>
              <div className="bg-black/80 text-white p-3 rounded-lg max-w-xs">
                <h3 className="font-bold text-amber-300">{title}</h3>
                <p className="text-sm text-gray-200">{description}</p>
              </div>
            </Html>
          )}
          
          <pointLight
            position={[0, 2, 2]}
            intensity={0.6}
            distance={10}
            decay={2}
            color="#ffd700"
          />
        </group>
      </RigidBody>
    );
  }
  
  if (!gltf || !gltf.scene) {
    return (
      <RigidBody type="fixed" colliders="cuboid">
        <group position={position} rotation={rotation}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.3, 2.5, 12]} />
            <meshStandardMaterial color="#f5f5f5" />
          </mesh>
        </group>
      </RigidBody>
    );
  }

  const clonedScene = gltf.scene.clone();
  
  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });
  
  return (
    <RigidBody type="fixed" colliders="trimesh">
      <group 
        ref={meshRef} 
        position={position} 
        rotation={rotation}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={clonedScene} scale={scale} />
        
        {hovered && (
          <Html position={[0, 4, 0]} center>
            <div className="bg-black/80 text-white p-4 rounded-lg max-w-sm shadow-2xl border border-amber-500">
              <h3 className="font-bold text-amber-300 text-lg mb-2">{title}</h3>
              <p className="text-sm text-gray-200 leading-relaxed">{description}</p>
              <div className="mt-2 text-xs text-amber-400">
                🏛️ Classical Greek Art
              </div>
            </div>
          </Html>
        )}
        
        {/* Enhanced statue lighting */}
        <pointLight
          position={[0, 3, 2]}
          intensity={0.8}
          distance={12}
          decay={2}
          color="#ffd700"
        />
        
        <spotLight
          position={[2, 4, 2]}
          angle={Math.PI / 4}
          penumbra={0.5}
          intensity={0.6}
          distance={15}
          decay={2}
          color="#ffffff"
          target-position={position}
        />
      </group>
    </RigidBody>
  );
}

function StatueFallback() {
  return (
    <mesh>
      <cylinderGeometry args={[0.5, 0.3, 2.5, 12]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}

export function Statue(props: StatueProps) {
  return (
    <ModelErrorBoundary modelName="aphrodite-statue">
      <Suspense fallback={<StatueFallback />}>
        <StatueModel {...props} />
      </Suspense>
    </ModelErrorBoundary>
  );
}

try {
  useGLTF.preload('/models/aphrodite_kallipygos_statue/scene.gltf');
} catch (error) {
  console.warn('Failed to preload Aphrodite statue model:', error);
}
```

## components/shared/ErrorBoundary.tsx <a id="ErrorBoundary_tsx"></a>

### Dependencies

- `react`
- `lucide-react`
- `@/components/ui/Button`

```typescript
// 🛠️ SHARED UTILITY - Error boundary component
'use client';

import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
      }

      return <DefaultErrorFallback error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-6">
          We're sorry, but something unexpected happened. Please try again.
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

export { ErrorBoundary, DefaultErrorFallback };
```

## components/ui/Button.tsx <a id="Button_tsx"></a>

### Dependencies

- `react`
- `@/lib/utils/cn`
- `./LoadingSpinner`

```typescript
// 🎛️ SHARED UI - Reusable button component with variants
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    className, 
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner size="sm" className="mr-2" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
```

## components/ui/Input.tsx <a id="Input_tsx"></a>

### Dependencies

- `react`
- `@/lib/utils/cn`

```typescript
// 🎛️ SHARED UI - Reusable input component with validation states
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2 border rounded-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'disabled:bg-gray-50 disabled:text-gray-500',
            error ? 'border-red-500' : 'border-gray-300',
            className
          )}
          {...props}
        />
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
```

## components/ui/LoadingSpinner.tsx <a id="LoadingSpinner_tsx"></a>

### Dependencies

- `@/lib/utils/cn`

```typescript
// components/ui/LoadingSpinner.tsx
import { cn } from '@/lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'white';
}

const LoadingSpinner = ({ 
  size = 'md', 
  className,
  variant = 'primary' 
}: LoadingSpinnerProps) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const variants = {
    primary: 'border-amber-200 border-t-amber-600',
    secondary: 'border-orange-200 border-t-orange-600', 
    white: 'border-white/30 border-t-white',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={cn(
          'border-4 rounded-full animate-spin',
          sizes[size],
          variants[variant],
          className
        )}
      />
    </div>
  );
};

export { LoadingSpinner };
```

## docker-compose.dev.yml <a id="docker-compose_dev_yml"></a>

```yaml
# docker-compose.dev.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - DIRECT_URL=${DIRECT_URL}
      - CLOUDINARY_URL=${CLOUDINARY_URL}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      - NEXTAUTH_URL=http://localhost:3000
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    command: npm run dev
    restart: unless-stopped
```

## components/ui/Pagination.tsx <a id="Pagination_tsx"></a>

### Dependencies

- `lucide-react`
- `@/lib/utils/cn`

```typescript
// components/ui/Pagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  className,
}: PaginationProps) {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Add first page if not in range
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis-start" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "px-3 py-2 text-sm rounded transition-colors",
            i === currentPage
              ? "bg-amber-500 text-white"
              : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
          )}
        >
          {i}
        </button>
      );
    }

    // Add last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis-end" className="px-2 text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center space-x-1 bg-white border border-gray-200 rounded-lg p-2", className)}>
      {/* Previous Button */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded transition-colors",
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
        )}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Previous
      </button>
      
      {/* Page Numbers */}
      {renderPageNumbers()}
      
      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center px-3 py-2 text-sm rounded transition-colors",
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
        )}
      >
        Next
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </div>
  );
}
```

## docker-compose.yml <a id="docker-compose_yml"></a>

### Dependencies

- `redis:7-alpine`
- `nginx:alpine`

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      # Supabase configuration (tetap menggunakan Supabase yang ada)
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
      - DATABASE_URL=${DATABASE_URL}
      - DIRECT_URL=${DIRECT_URL}
      # Cloudinary configuration
      - CLOUDINARY_URL=${CLOUDINARY_URL}
      - CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
      - CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
      - CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
      - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=${NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
      - NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=${NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      # NextAuth
      - NEXTAUTH_URL=${NEXTAUTH_URL:-http://localhost:3000}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    env_file:
      - .env
    volumes:
      - ./public:/app/public
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./public:/usr/share/nginx/html/public
    depends_on:
      - app
    restart: unless-stopped

volumes:
  redis_data:
```

## eslint.config.mjs <a id="eslint_config_mjs"></a>

### Dependencies

- `path`
- `url`
- `@eslint/eslintrc`

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

## lib/actions/batik.ts <a id="batik_ts"></a>

### Dependencies

- `next/cache`
- `@/lib/db/prisma`
- `@/lib/types/batik`
- `@/lib/types`

```typescript
// lib/actions/batik.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import { CreateBatikSchema, UpdateBatikSchema } from '@/lib/types/batik';
import type { Batik } from '@/lib/types';
import type { CreateBatikData, UpdateBatikData } from '@/lib/types/batik';

/**
 * Fetch all batiks with related data
 */
export async function getBatiks(): Promise<Batik[]> {
  try {
    const batiks = await prisma.batik.findMany({
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return batiks as Batik[];
  } catch (error) {
    console.error('Error fetching batiks:', error);
    throw new Error('Failed to fetch batiks');
  }
}

/**
 * Fetch a single batik by ID
 */
export async function getBatikById(id: number): Promise<Batik | null> {
  try {
    const batik = await prisma.batik.findUnique({
      where: { id },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    return batik as Batik | null;
  } catch (error) {
    console.error('Error fetching batik:', error);
    throw new Error('Failed to fetch batik');
  }
}

/**
 * Create a new batik
 */
export async function createBatik(data: CreateBatikData): Promise<Batik> {
  try {
    // Validate input data
    const validatedData = CreateBatikSchema.parse(data);

    const batik = await prisma.batik.create({
      data: {
        nama: validatedData.nama,
        kode: validatedData.kode,
        alamat: validatedData.alamat,
        seniman: validatedData.seniman,
        pointmap: validatedData.pointmap,
        tahun: validatedData.tahun,
        dimensi: validatedData.dimensi,
        translations: {
          create: validatedData.translations.map((translation) => ({
            languageId: translation.languageId,
            warna: translation.warna,
            teknik: translation.teknik,
            jenisKain: translation.jenisKain,
            histori: translation.histori,
            pewarna: translation.pewarna,
            bentuk: translation.bentuk,
          })),
        },
        foto: {
          create: validatedData.foto.map((fotoUrl) => ({
            link: fotoUrl,
          })),
        },
        tema: {
          connect: validatedData.temaIds.map((id) => ({ id })),
        },
        subTema: {
          connect: validatedData.subTemaIds.map((id) => ({ id })),
        },
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath('/');

    return batik as Batik;
  } catch (error) {
    console.error('Error creating batik:', error);
    throw new Error('Failed to create batik');
  }
}

/**
 * Update an existing batik
 */
export async function updateBatik(id: number, data: UpdateBatikData): Promise<Batik> {
  try {
    // Validate input data
    const validatedData = UpdateBatikSchema.parse(data);

    const batik = await prisma.batik.update({
      where: { id },
      data: {
        nama: validatedData.nama,
        kode: validatedData.kode,
        alamat: validatedData.alamat,
        seniman: validatedData.seniman,
        pointmap: validatedData.pointmap,
        tahun: validatedData.tahun,
        dimensi: validatedData.dimensi,
        // Update translations
        ...(validatedData.translations && {
          translations: {
            deleteMany: {},
            create: validatedData.translations.map((translation) => ({
              languageId: translation.languageId,
              warna: translation.warna,
              teknik: translation.teknik,
              jenisKain: translation.jenisKain,
              histori: translation.histori,
              pewarna: translation.pewarna,
              bentuk: translation.bentuk,
            })),
          },
        }),
        // Update photos
        ...(validatedData.foto && {
          foto: {
            deleteMany: {},
            create: validatedData.foto.map((fotoUrl) => ({
              link: fotoUrl,
            })),
          },
        }),
        // Update themes
        ...(validatedData.temaIds && {
          tema: {
            set: validatedData.temaIds.map((id) => ({ id })),
          },
        }),
        ...(validatedData.subTemaIds && {
          subTema: {
            set: validatedData.subTemaIds.map((id) => ({ id })),
          },
        }),
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath(`/batik/${id}`);
    revalidatePath('/');

    return batik as Batik;
  } catch (error) {
    console.error('Error updating batik:', error);
    throw new Error('Failed to update batik');
  }
}

/**
 * Delete a batik
 */
export async function deleteBatik(id: number): Promise<void> {
  try {
    await prisma.batik.delete({
      where: { id },
    });

    // Revalidate related pages
    revalidatePath('/gallery');
    revalidatePath('/');
  } catch (error) {
    console.error('Error deleting batik:', error);
    throw new Error('Failed to delete batik');
  }
}

/**
 * Search batiks by name
 */
export async function searchBatiks(query: string): Promise<Batik[]> {
  try {
    const batiks = await prisma.batik.findMany({
      where: {
        nama: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        foto: true,
        tema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return batiks as Batik[];
  } catch (error) {
    console.error('Error searching batiks:', error);
    throw new Error('Failed to search batiks');
  }
}
```

## lib/actions/themes.ts <a id="themes_ts"></a>

### Dependencies

- `next/cache`
- `@/lib/db/prisma`
- `@/lib/types`

```typescript
// 🎨 THEME FEATURE - Server actions for theme management
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import type { Theme } from '@/lib/types';

/**
 * Fetch all themes with translations and sub-themes
 */
export async function getThemes(): Promise<Theme[]> {
  try {
    const themes = await prisma.tema.findMany({
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
      orderBy: {
        nama: 'asc',
      },
    });

    return themes as Theme[];
  } catch (error) {
    console.error('Error fetching themes:', error);
    throw new Error('Failed to fetch themes');
  }
}

/**
 * Create a new theme
 */
export async function createTheme(data: {
  nama: string;
  translations: Array<{
    languageId: number;
    nama: string;
  }>;
  subTemas?: Array<{
    nama: string;
    translations: Array<{
      languageId: number;
      nama: string;
    }>;
  }>;
}): Promise<Theme> {
  try {
    const theme = await prisma.tema.create({
      data: {
        nama: data.nama,
        translations: {
          create: data.translations,
        },
        subTema: data.subTemas ? {
          create: data.subTemas.map((subTema) => ({
            nama: subTema.nama,
            translations: {
              create: subTema.translations,
            },
          })),
        } : undefined,
      },
      include: {
        translations: {
          include: {
            language: true,
          },
        },
        subTema: {
          include: {
            translations: {
              include: {
                language: true,
              },
            },
          },
        },
      },
    });

    revalidatePath('/add-batik');
    return theme as Theme;
  } catch (error) {
    console.error('Error creating theme:', error);
    throw new Error('Failed to create theme');
  }
}

/**
 * Delete a theme
 */
export async function deleteTheme(id: number): Promise<void> {
  try {
    await prisma.tema.delete({
      where: { id },
    });

    revalidatePath('/add-batik');
  } catch (error) {
    console.error('Error deleting theme:', error);
    throw new Error('Failed to delete theme');
  }
}
```

## lib/auth/config.ts <a id="config_ts"></a>

### Dependencies

- `next-auth`
- `@next-auth/prisma-adapter`
- `next-auth/providers/credentials`
- `bcrypt`
- `@/lib/db/prisma`

```typescript
// lib/auth/config.ts
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
};
```

## lib/actions/languages.ts <a id="languages_ts"></a>

### Dependencies

- `next/cache`
- `@/lib/db/prisma`
- `@/lib/types`

```typescript
// 🌐 LANGUAGE FEATURE - Server actions for language management
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db/prisma';
import type { Language } from '@/lib/types';

/**
 * Fetch all languages
 */
export async function getLanguages(): Promise<Language[]> {
  try {
    const languages = await prisma.language.findMany({
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
    });

    return languages as Language[];
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw new Error('Failed to fetch languages');
  }
}

/**
 * Get default language
 */
export async function getDefaultLanguage(): Promise<Language | null> {
  try {
    const defaultLanguage = await prisma.language.findFirst({
      where: { isDefault: true },
    });

    return defaultLanguage as Language | null;
  } catch (error) {
    console.error('Error fetching default language:', error);
    throw new Error('Failed to fetch default language');
  }
}

/**
 * Get language by code
 */
export async function getLanguageByCode(code: string): Promise<Language | null> {
  try {
    const language = await prisma.language.findUnique({
      where: { code },
    });

    return language as Language | null;
  } catch (error) {
    console.error('Error fetching language by code:', error);
    throw new Error('Failed to fetch language');
  }
}

/**
 * Create a new language
 */
export async function createLanguage(data: {
  code: string;
  name: string;
  isDefault?: boolean;
}): Promise<Language> {
  try {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.language.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      });
    }

    const language = await prisma.language.create({
      data: {
        code: data.code,
        name: data.name,
        isDefault: data.isDefault || false,
      },
    });

    revalidatePath('/add-batik');
    return language as Language;
  } catch (error) {
    console.error('Error creating language:', error);
    throw new Error('Failed to create language');
  }
}

/**
 * Update a language
 */
export async function updateLanguage(
  id: number,
  data: {
    code?: string;
    name?: string;
    isDefault?: boolean;
  }
): Promise<Language> {
  try {
    // If this is set as default, unset other defaults
    if (data.isDefault) {
      await prisma.language.updateMany({
        where: { 
          isDefault: true,
          NOT: { id }
        },
        data: { isDefault: false },
      });
    }

    const language = await prisma.language.update({
      where: { id },
      data,
    });

    revalidatePath('/add-batik');
    return language as Language;
  } catch (error) {
    console.error('Error updating language:', error);
    throw new Error('Failed to update language');
  }
}

/**
 * Delete a language
 */
export async function deleteLanguage(id: number): Promise<void> {
  try {
    // Check if this is the default language
    const language = await prisma.language.findUnique({
      where: { id },
    });

    if (language?.isDefault) {
      throw new Error('Cannot delete the default language');
    }

    // Check if language is being used in translations
    const translationsCount = await prisma.batikTranslation.count({
      where: { languageId: id },
    });

    if (translationsCount > 0) {
      throw new Error('Cannot delete language that is being used in translations');
    }

    await prisma.language.delete({
      where: { id },
    });

    revalidatePath('/add-batik');
  } catch (error) {
    console.error('Error deleting language:', error);
    throw new Error('Failed to delete language');
  }
}

/**
 * Get languages with translation counts
 */
export async function getLanguagesWithStats(): Promise<Array<Language & { translationCount: number }>> {
  try {
    const languages = await prisma.language.findMany({
      include: {
        _count: {
          select: {
            batikTranslations: true,
            temaTranslations: true,
            subTemaTranslations: true,
          },
        },
      },
      orderBy: [
        { isDefault: 'desc' },
        { name: 'asc' },
      ],
    });

    return languages.map(lang => ({
      ...lang,
      translationCount: lang._count.batikTranslations + 
                       lang._count.temaTranslations + 
                       lang._count.subTemaTranslations,
    })) as Array<Language & { translationCount: number }>;
  } catch (error) {
    console.error('Error fetching languages with stats:', error);
    throw new Error('Failed to fetch languages with statistics');
  }
}
```

## lib/cloudinary.ts <a id="cloudinary_ts"></a>

### Dependencies

- `cloudinary`

```typescript
// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

```

## lib/db/prisma.ts <a id="prisma_ts"></a>

### Dependencies

- `@prisma/client`

```typescript
// 🗄️ DATABASE - Prisma client configuration
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

## lib/db/supabase.ts <a id="supabase_ts"></a>

### Dependencies

- `@supabase/supabase-js`

```typescript
// 🗄️ DATABASE - Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
```

## lib/contexts/AuthContext.tsx <a id="AuthContext_tsx"></a>

### Dependencies

- `react`
- `@supabase/supabase-js`
- `@/lib/db/supabase`
- `@/lib/services/auth.service`

```typescript
// 🔐 AUTH FEATURE - Authentication context provider
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/db/supabase';
import { signIn as signInService, signOut as signOutService } from '@/lib/services/auth.service';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInService(email, password);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await signOutService();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
```

## lib/contexts/LanguageContext.tsx <a id="LanguageContext_tsx"></a>

### Dependencies

- `react`

```typescript
// 🌐 LANGUAGE FEATURE - Language context provider
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Language {
  id: number;
  code: string;
  name: string;
  isDefault: boolean;
}

interface LanguageContextType {
  currentLanguage: Language;
  availableLanguages: Language[];
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const availableLanguages: Language[] = [
    { id: 1, code: 'id', name: 'Indonesian', isDefault: true },
    { id: 2, code: 'en', name: 'English', isDefault: false },
    { id: 3, code: 'jp', name: 'Japanese', isDefault: false },
  ];

  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    availableLanguages.find(lang => lang.isDefault) || availableLanguages[0]
  );

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      availableLanguages,
      setLanguage: setCurrentLanguage,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
```

## lib/contexts/providers.tsx <a id="providers_tsx"></a>

### Dependencies

- `./AuthContext`
- `./LanguageContext`

```typescript
// 🌐 CONTEXT PROVIDERS - Combined providers for the application
'use client';

import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
}
```

## lib/hooks/auth/useAuth.ts <a id="useAuth_ts"></a>

### Dependencies

- `react`
- `@/lib/contexts/AuthContext`

```typescript
// 🔐 AUTH FEATURE - Custom hook for authentication
'use client';

import { useContext } from 'react';
import { AuthContext } from '@/lib/contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
```

## lib/hooks/batik/useBatik.ts <a id="useBatik_ts"></a>

### Dependencies

- `react`
- `next/navigation`
- `@/lib/types`
- `@/lib/services/batik.service`
- `@/lib/types/batik`

```typescript
// 🎨 BATIK FEATURE - Custom hook for batik operations
'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Batik } from '@/lib/types';
import { BatikAPI } from '@/lib/services/batik.service';
import type { CreateBatikData } from '@/lib/types/batik';

export function useBatik() {
  const [batiks, setBatiks] = useState<Batik[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchBatiks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await BatikAPI.getAll();
      setBatiks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBatikById = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const data = await BatikAPI.getById(id);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createBatik = useCallback(async (data: CreateBatikData) => {
    setLoading(true);
    setError(null);

    try {
      const newBatik = await BatikAPI.create(data);
      setBatiks(prev => [newBatik, ...prev]);
      return newBatik;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBatik = useCallback(async (id: number, data: Partial<CreateBatikData>) => {
    setLoading(true);
    setError(null);

    try {
      const updatedBatik = await BatikAPI.update(id, data);
      setBatiks(prev => prev.map(batik => 
        batik.id === id ? updatedBatik : batik
      ));
      return updatedBatik;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteBatik = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await BatikAPI.delete(id);
      setBatiks(prev => prev.filter(batik => batik.id !== id));
      
      // Refresh the page to update the UI
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [router]);

  const searchBatiks = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await BatikAPI.search(query);
      setBatiks(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    batiks,
    loading,
    error,
    fetchBatiks,
    fetchBatikById,
    createBatik,
    updateBatik,
    deleteBatik,
    searchBatiks,
    setBatiks,
    setError,
  };
}
```

## lib/hooks/batik/useBatikForm.ts <a id="useBatikForm_ts"></a>

### Dependencies

- `react`
- `@/lib/actions/batik`
- `@/lib/services/upload.service`
- `@/lib/types/batik`

```typescript
// 🎨 BATIK FEATURE - Custom hook for batik form management
'use client';

import { useState, useCallback } from 'react';
import { createBatik } from '@/lib/actions/batik';
import { uploadToCloudinary } from '@/lib/services/upload.service';
import type { CreateBatikData, BatikTranslation } from '@/lib/types/batik';

interface BatikFormData {
  nama: string;
  kode: string;
  alamat: string;
  seniman: string;
  pointmap: string;
  tahun: string;
  dimensi: string;
  translations: Record<number, BatikTranslation>;
  themes: number[];
  subThemes: number[];
  images: File[];
}

export function useBatikForm() {
  const [formData, setFormData] = useState<BatikFormData>({
    nama: '',
    kode: '',
    alamat: '',
    seniman: '',
    pointmap: '',
    tahun: '',
    dimensi: '',
    translations: {},
    themes: [],
    subThemes: [],
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleTranslationChange = useCallback((
    languageId: number,
    field: keyof BatikTranslation,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [languageId]: {
          ...prev.translations[languageId],
          languageId,
          [field]: value,
        },
      },
    }));
  }, []);

  const handleThemeChange = useCallback((themes: number[]) => {
    setFormData(prev => ({ ...prev, themes }));
  }, []);

  const handleImageUpload = useCallback((files: File[]) => {
    setFormData(prev => ({ ...prev, images: files }));
  }, []);

  const submitForm = useCallback(async () => {
    setLoading(true);
    setErrors({});

    try {
      // Upload images first
      const uploadedImages = await Promise.all(
        formData.images.map(file => uploadToCloudinary(file))
      );

      // Prepare data for submission
      const createData: CreateBatikData = {
        nama: formData.nama,
        kode: formData.kode || undefined,
        alamat: formData.alamat || undefined,
        seniman: formData.seniman || undefined,
        pointmap: formData.pointmap || undefined,
        tahun: formData.tahun,
        dimensi: formData.dimensi,
        translations: Object.values(formData.translations),
        temaIds: formData.themes,
        subTemaIds: formData.subThemes,
        foto: uploadedImages.map(img => img.secure_url),
      };

      // Create batik
      await createBatik(createData);

      // Reset form
      setFormData({
        nama: '',
        kode: '',
        alamat: '',
        seniman: '',
        pointmap: '',
        tahun: '',
        dimensi: '',
        translations: {},
        themes: [],
        subThemes: [],
        images: [],
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ general: 'Failed to save batik. Please try again.' });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return {
    formData,
    loading,
    errors,
    handleInputChange,
    handleTranslationChange,
    handleThemeChange,
    handleImageUpload,
    submitForm,
  };
}
```

## lib/hooks/gallery/useGalleryFilters.ts <a id="useGalleryFilters_ts"></a>

### Dependencies

- `react`
- `@/lib/contexts/LanguageContext`
- `@/lib/types`

```typescript
// lib/hooks/gallery/useGalleryFilters.ts
'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';
import type { Batik } from '@/lib/types';

interface FilterState {
  themes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

interface UseGalleryFiltersProps {
  batiks: Batik[];
  searchTerm: string;
}

export function useGalleryFilters({ batiks, searchTerm }: UseGalleryFiltersProps) {
  const { currentLanguage } = useLanguage();
  
  const [filters, setFilters] = useState<FilterState>({
    themes: [],
    year: '',
    technique: '',
    dye: '',
    shape: '',
    fabricType: '',
  });

  const filteredBatiks = useMemo(() => {
    return batiks.filter((batik) => {
      // Search term filter
      const matchesSearch = !searchTerm || 
        batik.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batik.seniman?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        batik.alamat?.toLowerCase().includes(searchTerm.toLowerCase());

      // Theme filters
      const matchesTheme = filters.themes.length === 0 ||
        batik.tema.some(tema => filters.themes.includes(tema.id));

      // Year filter
      const matchesYear = !filters.year || batik.tahun.includes(filters.year);

      // Translation-based filters
      const translation = batik.translations.find(
        t => t.languageId === currentLanguage.id
      ) || batik.translations[0];
      
      if (!translation) return matchesSearch && matchesTheme && matchesYear;

      const matchesTechnique = !filters.technique || 
        translation.teknik.toLowerCase().includes(filters.technique.toLowerCase());
      const matchesDye = !filters.dye || 
        translation.pewarna.toLowerCase().includes(filters.dye.toLowerCase());
      const matchesShape = !filters.shape || 
        translation.bentuk.toLowerCase().includes(filters.shape.toLowerCase());
      const matchesFabricType = !filters.fabricType || 
        translation.jenisKain.toLowerCase().includes(filters.fabricType.toLowerCase());

      return matchesSearch && matchesTheme && matchesYear && 
             matchesTechnique && matchesDye && matchesShape && matchesFabricType;
    });
  }, [batiks, searchTerm, filters, currentLanguage.id]);

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      themes: [],
      year: '',
      technique: '',
      dye: '',
      shape: '',
      fabricType: '',
    });
  };

  return {
    filteredBatiks,
    filters,
    updateFilter,
    clearFilters,
  };
}
```

## lib/hooks/shared/usePagination.ts <a id="usePagination_ts"></a>

### Dependencies

- `react`

```typescript
// lib/hooks/shared/usePagination.ts
'use client';

import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
  initialPage?: number;
}

export function usePagination<T>({ 
  items, 
  itemsPerPage = 12, 
  initialPage = 1 
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Reset to page 1 when items change
  useMemo(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1,
    startIndex: (currentPage - 1) * itemsPerPage,
    endIndex: Math.min(currentPage * itemsPerPage, items.length),
    totalItems: items.length,
  };
}
```

## lib/prismaClient.ts <a id="prismaClient_ts"></a>

### Dependencies

- `@prisma/client`

```typescript
// lib/prismaClient.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export { prisma };
```

## lib/services/auth.service.ts <a id="auth_service_ts"></a>

### Dependencies

- `@/lib/db/supabase`

```typescript
// 🔐 AUTH FEATURE - Authentication service for Supabase
import { supabase } from '@/lib/db/supabase';

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { success: true, data };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error(error.message);
  }

  return user;
}
```

## lib/services/batik.service.ts <a id="batik_service_ts"></a>

### Dependencies

- `@/lib/types`
- `@/lib/types/batik`

```typescript
// 🎨 BATIK FEATURE - Batik API service
import type { Batik } from '@/lib/types';
import type { CreateBatikData } from '@/lib/types/batik';

export class BatikAPI {
  private static baseUrl = '/api/batik';

  static async getAll(): Promise<Batik[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch batiks');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching batiks:', error);
      throw new Error('Failed to fetch batiks');
    }
  }

  static async getById(id: number): Promise<Batik> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Batik not found');
        }
        throw new Error('Failed to fetch batik');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching batik:', error);
      throw error;
    }
  }

  static async create(data: CreateBatikData): Promise<Batik> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create batik');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating batik:', error);
      throw error;
    }
  }

  static async update(id: number, data: Partial<CreateBatikData>): Promise<Batik> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update batik');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating batik:', error);
      throw error;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete batik');
      }
    } catch (error) {
      console.error('Error deleting batik:', error);
      throw error;
    }
  }

  static async search(query: string): Promise<Batik[]> {
    try {
      const response = await fetch(`${this.baseUrl}?search=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to search batiks');
      }

      return response.json();
    } catch (error) {
      console.error('Error searching batiks:', error);
      throw new Error('Failed to search batiks');
    }
  }

  static async getByTheme(themeId: number): Promise<Batik[]> {
    try {
      const response = await fetch(`${this.baseUrl}?theme=${themeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch batiks by theme');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching batiks by theme:', error);
      throw new Error('Failed to fetch batiks by theme');
    }
  }
}
```

## lib/services/upload.service.ts <a id="upload_service_ts"></a>

### Dependencies

- `cloudinary`

```typescript
// 🔄 UPLOAD FEATURE - File upload service for Cloudinary
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(file: File): Promise<{
  secure_url: string;
  public_id: string;
}> {
  try {
    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'batik-uploads',
          transformation: [
            { width: 800, height: 800, crop: 'limit' },
            { quality: 'auto' },
            { format: 'webp' },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Failed to delete image');
  }
}
```

## lib/stores/museumStore.ts <a id="museumStore_ts"></a>

### Dependencies

- `zustand`
- `@/lib/types`

```typescript
// lib/stores/museumStore.ts
import { create } from 'zustand';
import type { Batik } from '@/lib/types';

interface MuseumState {
  // Core museum state
  currentFloor: number;
  selectedBatik: Batik | null;
  batiks: Batik[];
  isViewingBatik: boolean;
  floorBatiks: Record<number, Batik[]>;
  totalFloors: number;
  
  // UI state
  showMinimap: boolean;
  showPerformanceStats: boolean;
  searchQuery: string;
  bookmarkedBatiks: number[];
  quality: 'low' | 'medium' | 'high';
  
  // Camera state
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  isTransitioning: boolean;
  
  // Loading state
  loading: boolean;
  loadingProgress: number;
  
  // Actions
  setCurrentFloor: (floor: number) => void;
  setSelectedBatik: (batik: Batik | null) => void;
  setBatiks: (batiks: Batik[]) => void;
  setIsViewingBatik: (viewing: boolean) => void;
  getBatiksByFloor: (floor: number) => Batik[];
  getTotalBatiks: () => number;
  getFloorStats: () => Record<number, number>;
  
  // UI actions
  toggleMinimap: () => void;
  togglePerformanceStats: () => void;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (batikId: number) => void;
  setQuality: (quality: 'low' | 'medium' | 'high') => void;
  
  // Camera actions
  setCameraPosition: (position: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
  setTransitioning: (transitioning: boolean) => void;
  
  // Loading actions
  setLoading: (loading: boolean, progress?: number) => void;
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  // Core museum state
  currentFloor: 1,
  selectedBatik: null,
  batiks: [],
  isViewingBatik: false,
  floorBatiks: {},
  totalFloors: 3,
  
  // UI state
  showMinimap: false,
  showPerformanceStats: false,
  searchQuery: '',
  bookmarkedBatiks: [],
  quality: 'medium',
  
  // Camera state
  cameraPosition: [0, 2, 15],
  cameraTarget: [0, 0, 0],
  isTransitioning: false,
  
  // Loading state
  loading: false,
  loadingProgress: 0,

  // Core actions
  setCurrentFloor: (floor) => {
        const state = get();
        
        // Validate floor number
        if (floor < 1 || floor > state.totalFloors || floor === state.currentFloor) {
            console.log(`🏢 Invalid floor change: current=${state.currentFloor}, requested=${floor}`);
            return;
        }

        console.log(`🏢 Changing floor: ${state.currentFloor} → ${floor}`);
        
        // Simple state update - tidak perlu timer di sini
        set({ 
            currentFloor: floor,
            cameraPosition: [0, (floor - 1) * 6 + 2, 15],
            isTransitioning: true
        });
        
        // Reset transitioning setelah delay singkat
        setTimeout(() => {
            set({ isTransitioning: false });
        }, 500);
    },
  
  setSelectedBatik: (batik) => set({ 
    selectedBatik: batik,
    isViewingBatik: !!batik 
  }),
  
  setBatiks: (batiks) => {
    if (!batiks || batiks.length === 0) {
      set({ 
        batiks: [], 
        floorBatiks: {},
        totalFloors: 3
      });
      return;
    }

    const floorBatiks: Record<number, Batik[]> = {};
    const batiksPerFloor = 20;
    const calculatedFloors = Math.max(3, Math.ceil(batiks.length / batiksPerFloor));
    
    // Initialize all floors
    for (let i = 1; i <= calculatedFloors; i++) {
      floorBatiks[i] = [];
    }
    
    // Distribute batiks evenly across floors
    batiks.forEach((batik, index) => {
      const floor = Math.floor(index / batiksPerFloor) + 1;
      if (floorBatiks[floor]) {
        floorBatiks[floor].push(batik);
      }
    });
    
    set({ 
      batiks, 
      floorBatiks,
      totalFloors: calculatedFloors
    });
  },
  
  setIsViewingBatik: (viewing) => set({ isViewingBatik: viewing }),
  
  getBatiksByFloor: (floor) => {
    const state = get();
    return state.floorBatiks[floor] || [];
  },

  getTotalBatiks: () => {
    const state = get();
    return state.batiks.length;
  },

  getFloorStats: () => {
    const state = get();
    const stats: Record<number, number> = {};
    Object.keys(state.floorBatiks).forEach(floor => {
      const floorNum = parseInt(floor);
      stats[floorNum] = state.floorBatiks[floorNum]?.length || 0;
    });
    return stats;
  },

  // UI actions
  toggleMinimap: () => set(state => ({ showMinimap: !state.showMinimap })),
  togglePerformanceStats: () => set(state => ({ showPerformanceStats: !state.showPerformanceStats })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleBookmark: (batikId) => set(state => ({
    bookmarkedBatiks: state.bookmarkedBatiks.includes(batikId)
      ? state.bookmarkedBatiks.filter(id => id !== batikId)
      : [...state.bookmarkedBatiks, batikId]
  })),
  setQuality: (quality) => set({ quality }),

  // Camera actions
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

  // Loading actions
  setLoading: (loading, progress = 0) => set({ loading, loadingProgress: progress }),
}));
```

## lib/supabaseClient.ts <a id="supabaseClient_ts"></a>

### Dependencies

- `@supabase/supabase-js`

```typescript
// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});
```

## lib/types/auth.ts <a id="auth_ts"></a>

### Dependencies

- `zod`

```typescript
// lib/types/auth.ts
import { z } from 'zod';

// User roles
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

// Zod schemas for validation
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

// TypeScript types inferred from schemas
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

// User types
export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  role: UserRole;
  emailVerified?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

// API Response types
export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  session?: AuthSession;
  message?: string;
  error?: string;
}

// Form validation error types
export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
  name?: string;
  general?: string;
}

// Permission types
export type Permission = 
  | 'read:batik'
  | 'write:batik'
  | 'delete:batik'
  | 'manage:users'
  | 'manage:themes'
  | 'upload:images';

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}
```

## lib/types/batik.ts <a id="batik_ts"></a>

### Dependencies

- `zod`

```typescript
// lib/types/batik.ts
import { z } from 'zod';

// Zod schemas for validation
export const BatikTranslationSchema = z.object({
  languageId: z.number(),
  warna: z.string().min(1, 'Color is required'),
  teknik: z.string().min(1, 'Technique is required'),
  jenisKain: z.string().min(1, 'Fabric type is required'),
  histori: z.string().min(1, 'History is required'),
  pewarna: z.string().min(1, 'Dye is required'),
  bentuk: z.string().min(1, 'Shape is required'),
});

export const CreateBatikSchema = z.object({
  nama: z.string().min(1, 'Name is required'),
  kode: z.string().optional(),
  alamat: z.string().optional(),
  seniman: z.string().optional(),
  pointmap: z.string().optional(),
  tahun: z.string().min(1, 'Year is required'),
  dimensi: z.string().min(1, 'Dimensions are required'),
  translations: z.array(BatikTranslationSchema).min(1, 'At least one translation is required'),
  temaIds: z.array(z.number()).min(1, 'At least one theme is required'),
  subTemaIds: z.array(z.number()).default([]),
  foto: z.array(z.string()).min(1, 'At least one photo is required'),
});

export const UpdateBatikSchema = CreateBatikSchema.partial();

// TypeScript types
export type BatikTranslation = z.infer<typeof BatikTranslationSchema>;
export type CreateBatikData = z.infer<typeof CreateBatikSchema>;
export type UpdateBatikData = z.infer<typeof UpdateBatikSchema>;

// Export Batik type from the main types file
export type { Batik } from './index';
```

## lib/types/index.ts <a id="index_ts"></a>

```typescript
// lib/types/index.ts

// Import types dari Supabase dengan alias untuk menghindari conflict
export type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

// Auth types
export type * from './auth';
export type * from './batik';

// Base types
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Language types
export interface Language extends BaseEntity {
  code: string;
  name: string;
  isDefault: boolean;
}

// Translation types
export interface Translation {
  id: number;
  languageId: number;
  nama: string;
  language?: Language;
}

// Photo types
export interface Photo extends BaseEntity {
  link: string;
  batikId: number;
}

// Theme types
export interface ThemeTranslation {
  id: number;
  temaId: number;
  languageId: number;
  nama: string;
  language?: Language;
}

export interface SubThemeTranslation {
  id: number;
  subTemaId: number;
  languageId: number;
  nama: string;
  language?: Language;
}

export interface Theme extends BaseEntity {
  nama: string;
  translations: ThemeTranslation[];
  subTema?: SubTheme[];
}

export interface SubTheme extends BaseEntity {
  nama: string;
  temaId: number;
  translations: SubThemeTranslation[];
}

// Batik types
export interface BatikTranslation {
  id: number;
  batikId: number;
  languageId: number;
  warna: string;
  teknik: string;
  jenisKain: string;
  histori: string;
  pewarna: string;
  bentuk: string;
  language?: Language;
}

export interface Batik extends BaseEntity {
  kode: string | null;
  alamat: string | null;
  seniman: string | null;
  pointmap: string | null;
  nama: string;
  tahun: string;
  dimensi: string;
  translations: BatikTranslation[];
  foto: Photo[];
  tema: Theme[];
  subTema: SubTheme[];
}

// Filter types
export interface FilterState {
  themes: number[];
  year: string;
  technique: string;
  dye: string;
  shape: string;
  fabricType: string;
}

// Pagination types
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationState;
}

// Database User type (berbeda dari Supabase User)
export interface DatabaseUser {
  id: string;
  email: string;
  name?: string | null;
  password?: string | null;
  avatar?: string | null;
  role: 'USER' | 'ADMIN' | 'MODERATOR';
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// NextAuth Session type (berbeda dari Supabase Session)
export interface AuthSession {
  user: {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  };
  expires: string;
}


```

## lib/types/next-auth.d.ts <a id="next-auth_d_ts"></a>

### Dependencies

- `next-auth`

```typescript
// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: 'USER' | 'ADMIN' | 'MODERATOR';
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  }
}
```

## lib/utils/MuseumTextureManager.ts <a id="MuseumTextureManager_ts"></a>

### Dependencies

- `three`

```typescript
// lib/utils/MuseumTextureManager.ts
import { TextureLoader } from 'three';
import * as THREE from 'three';

export class MuseumTextureManager {
  private static instance: MuseumTextureManager;
  private textureCache: Map<string, THREE.Texture> = new Map();
  private loader: TextureLoader = new TextureLoader();

  static getInstance(): MuseumTextureManager {
    if (!MuseumTextureManager.instance) {
      MuseumTextureManager.instance = new MuseumTextureManager();
    }
    return MuseumTextureManager.instance;
  }

  async loadTexture(url: string, repeat: [number, number] = [1, 1]): Promise<THREE.Texture | null> {
    const cacheKey = `${url}_${repeat[0]}_${repeat[1]}`;
    
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey)!;
    }

    return new Promise((resolve) => {
      this.loader.load(
        url,
        (texture) => {
          // Configure texture
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.repeat.set(repeat[0], repeat[1]);
          texture.generateMipmaps = true;
          texture.minFilter = THREE.LinearMipmapLinearFilter;
          texture.magFilter = THREE.LinearFilter;
          
          this.textureCache.set(cacheKey, texture);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.warn('Failed to load texture:', url, error);
          resolve(null);
        }
      );
    });
  }

  disposeAll(): void {
    this.textureCache.forEach((texture) => {
      texture.dispose();
    });
    this.textureCache.clear();
  }
}
```

## lib/utils/PerformanceMonitor.ts <a id="PerformanceMonitor_ts"></a>

```typescript
// lib/utils/PerformanceMonitor.ts (Fixed)
'use client';

interface PerformanceMetrics {
  fps: number;
  memory: number;
  drawCalls: number;
  triangles: number;
  textures: number;
}

// Extend Performance interface for Chrome's memory API
interface ExtendedPerformance extends Performance {
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: PerformanceMetrics = {
    fps: 0,
    memory: 0,
    drawCalls: 0,
    triangles: 0,
    textures: 0,
  };
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];
  private lastTime = 0;
  private frameCount = 0;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  updateMetrics(renderer: any, scene: any) {
    const now = performance.now();
    this.frameCount++;

    // Update FPS every second
    if (now - this.lastTime >= 1000) {
      this.metrics.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
      this.frameCount = 0;
      this.lastTime = now;
    }

    // Update renderer info
    if (renderer && renderer.info) {
      this.metrics.drawCalls = renderer.info.render.calls;
      this.metrics.triangles = renderer.info.render.triangles;
    }

    // Memory usage (approximate) - Fixed type assertion
    const extendedPerf = performance as ExtendedPerformance;
    if (extendedPerf.memory) {
      this.metrics.memory = Math.round(extendedPerf.memory.usedJSHeapSize / 1024 / 1024);
    }

    // Notify callbacks
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) this.callbacks.splice(index, 1);
    };
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  getQualityRecommendation(): 'low' | 'medium' | 'high' {
    if (this.metrics.fps < 30 || this.metrics.memory > 500) return 'low';
    if (this.metrics.fps < 50 || this.metrics.memory > 300) return 'medium';
    return 'high';
  }
}
```

## lib/utils/TextureManager.ts <a id="TextureManager_ts"></a>

### Dependencies

- `three`

```typescript
// lib/utils/TextureManager.ts (Updated)
import { Texture, TextureLoader, LinearFilter, LinearMipmapLinearFilter } from 'three';
import * as THREE from 'three';

interface TextureOptions {
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  repeat?: [number, number];
  quality?: 'low' | 'medium' | 'high';
}

interface CachedTexture {
  texture: Texture;
  lastUsed: number;
  references: number;
}

class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, CachedTexture> = new Map();
  private loader: TextureLoader = new TextureLoader();
  private loadingPromises: Map<string, Promise<Texture | null>> = new Map();
  private maxCacheSize = 100;
  private maxMemoryMB = 200;
  private currentMemoryMB = 0;

  static getInstance(): TextureManager {
    if (!TextureManager.instance) {
      TextureManager.instance = new TextureManager();
    }
    return TextureManager.instance;
  }

  async loadTexture(url: string, options: TextureOptions = {}): Promise<Texture | null> {
    if (!url) return null;

    const cacheKey = `${url}_${JSON.stringify(options)}`;
    
    // Return cached texture
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.lastUsed = Date.now();
      cached.references++;
      return cached.texture;
    }

    // Return existing loading promise
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Create new loading promise
    const loadingPromise = this.createLoadingPromise(url, options, cacheKey);
    this.loadingPromises.set(cacheKey, loadingPromise);

    return loadingPromise;
  }

  private async createLoadingPromise(
    url: string, 
    options: TextureOptions, 
    cacheKey: string
  ): Promise<Texture | null> {
    return new Promise((resolve) => {
      // Check memory before loading
      if (this.currentMemoryMB > this.maxMemoryMB) {
        this.cleanupOldTextures();
      }

      this.loader.load(
        url,
        (texture) => {
          try {
            this.configureTexture(texture, options);
            
            // Estimate texture memory usage
            const memoryMB = this.estimateTextureMemory(texture);
            this.currentMemoryMB += memoryMB;

            // Cache the texture
            this.textureCache.set(cacheKey, {
              texture,
              lastUsed: Date.now(),
              references: 1
            });

            this.loadingPromises.delete(cacheKey);
            resolve(texture);
          } catch (error) {
            console.error('Error configuring texture:', error);
            this.loadingPromises.delete(cacheKey);
            resolve(null);
          }
        },
        undefined,
        (error) => {
          console.error('Failed to load texture:', url, error);
          this.loadingPromises.delete(cacheKey);
          resolve(null);
        }
      );
    });
  }

  private configureTexture(texture: Texture, options: TextureOptions) {
    // Apply options
    if (options.wrapS) texture.wrapS = options.wrapS;
    if (options.wrapT) texture.wrapT = options.wrapT;
    if (options.repeat) texture.repeat.set(options.repeat[0], options.repeat[1]);

    // Quality settings
    const quality = options.quality || 'medium';
    switch (quality) {
      case 'low':
        texture.minFilter = LinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = false;
        break;
      case 'medium':
        texture.minFilter = LinearMipmapLinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = true;
        break;
      case 'high':
        texture.minFilter = LinearMipmapLinearFilter;
        texture.magFilter = LinearFilter;
        texture.generateMipmaps = true;
        texture.anisotropy = 4;
        break;
    }

    texture.flipY = false;
    texture.needsUpdate = true;
  }

  private estimateTextureMemory(texture: Texture): number {
    const image = texture.image;
    if (!image) return 0;
    
    const width = image.width || 512;
    const height = image.height || 512;
    const bytesPerPixel = 4; // RGBA
    
    return (width * height * bytesPerPixel) / (1024 * 1024); // MB
  }

  private cleanupOldTextures() {
    const entries = Array.from(this.textureCache.entries());
    entries.sort((a, b) => a[1].lastUsed - b[1].lastUsed);

    // Remove oldest textures until memory is under limit
    for (const [key, cached] of entries) {
      if (this.currentMemoryMB <= this.maxMemoryMB * 0.8) break;
      if (cached.references <= 0) {
        this.disposeTexture(key);
      }
    }
  }

  releaseTexture(url: string, options: TextureOptions = {}) {
    const cacheKey = `${url}_${JSON.stringify(options)}`;
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.references = Math.max(0, cached.references - 1);
    }
  }

  private disposeTexture(cacheKey: string) {
    const cached = this.textureCache.get(cacheKey);
    if (cached) {
      cached.texture.dispose();
      this.currentMemoryMB -= this.estimateTextureMemory(cached.texture);
      this.textureCache.delete(cacheKey);
    }
  }

  disposeAll() {
    this.textureCache.forEach((cached, key) => {
      cached.texture.dispose();
    });
    this.textureCache.clear();
    this.loadingPromises.clear();
    this.currentMemoryMB = 0;
  }

  getStats() {
    return {
      cachedTextures: this.textureCache.size,
      memoryUsageMB: this.currentMemoryMB,
      loadingTextures: this.loadingPromises.size,
    };
  }
}

export { TextureManager };
```

## lib/utils/cn.ts <a id="cn_ts"></a>

### Dependencies

- `clsx`
- `tailwind-merge`

```typescript
// 🛠️ SHARED UTILITY - Class name utility function
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## lib/utils/constants.ts <a id="constants_ts"></a>

```typescript
// 🛠️ SHARED UTILITY - Application constants
export const APP_CONFIG = {
  NAME: 'Batik Sphere',
  DESCRIPTION: 'Digital Batik Database',
  ITEMS_PER_PAGE: 12,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  MAX_IMAGES_PER_BATIK: 10,
} as const;

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  LOGIN: '/login',
  ADD_BATIK: '/add-batik',
  BATIK_DETAIL: (id: string | number) => `/batik/${id}`,
} as const;

export const API_ENDPOINTS = {
  BATIK: '/api/batik',
  UPLOAD: '/api/upload',
  AUTH: '/api/auth',
  THEMES: '/api/themes',
} as const;

export const FILTER_OPTIONS = {
  TECHNIQUES: ['Cap', 'Tulis', 'Kombinasi', 'Printing'],
  DYES: ['Sintetis', 'Alam', 'Kombinasi'],
  SHAPES: ['Geometris', 'Non-Geometris', 'Kombinasi'],
  FABRIC_TYPES: ['Katun', 'Sutra', 'Rayon', 'Linen'],
} as const;


```

## lib/utils/helpers.ts <a id="helpers_ts"></a>

```typescript
// 🛠️ SHARED UTILITY - Helper functions
/**
 * Format date to Indonesian locale
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Generate slug from text
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Format file size to human readable format
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
```

## next-env.d.ts <a id="next-env_d_ts"></a>

```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

## nginx.conf <a id="nginx_conf"></a>

```conf
# nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream app {
        server app:3000;
    }

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    server {
        listen 80;
        server_name localhost;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Referrer-Policy "strict-origin-when-cross-origin";

        # Gzip compression
        gzip on;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

        # Static files
        location /public/ {
            alias /usr/share/nginx/html/public/;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # API routes with rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Login endpoint with stricter rate limiting
        location /api/auth/ {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # All other requests
        location / {
            proxy_pass http://app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

## locales/translations.json <a id="translations_json"></a>

```json
{
  "id": {
    "gallery": {
      "title": "Database Batik",
      "subtitle": "Koleksi batik tradisional Indonesia yang menampilkan keindahan dan keragaman budaya nusantara",
      "search": "Cari batik berdasarkan nama...",
      "filters": {
        "title": "Filter",
        "tema": "Tema Batik",
        "subTema": "Sub-tema Batik",
        "tahun": "Tahun Pembuatan",
        "teknik": "Teknik Pembuatan",
        "pewarna": "Pewarna",
        "bentuk": "Bentuk",
        "jenisKain": "Jenis Kain",
        "select": "Pilih",
        "reset": "Reset semua filter",
        "teknikOptions": {
          "cap": "Cap",
          "tulis": "Tulis",
          "kombinasi": "Kombinasi",
          "printing": "Printing"
        },
        "pewarnaOptions": {
          "sintetis": "Sintetis",
          "alam": "Alami",
          "kombinasi": "Kombinasi"
        },
        "bentukOptions": {
          "geometris": "Geometris",
          "nonGeometris": "Non-Geometris",
          "kombinasi": "Kombinasi"
        },
        "jenisKainOptions": {
          "katun": "Katun",
          "sutra": "Sutra",
          "rayon": "Rayon",
          "linen": "Linen"
        }
      },
      "results": "Menampilkan {start}-{end} dari {total} batik",
      "empty": {
        "title": "Koleksi Kosong",
        "message": "Belum ada data batik yang tersedia. Mulai tambahkan koleksi batik pertama Anda."
      }
    }
  },
  "en": {
    "gallery": {
      "title": "Batik Database",
      "subtitle": "Collection of traditional Indonesian batik showcasing the beauty and diversity of archipelago culture",
      "search": "Search batik by name...",
      "filters": {
        "title": "Filter",
        "tema": "Batik Theme",
        "subTema": "Batik Sub-theme",
        "tahun": "Year Created",
        "teknik": "Production Technique",
        "pewarna": "Dye",
        "bentuk": "Shape",
        "jenisKain": "Fabric Type",
        "select": "Select",
        "reset": "Reset all filters",
        "teknikOptions": {
          "cap": "Stamp",
          "tulis": "Hand Drawn",
          "kombinasi": "Combination",
          "printing": "Printing"
        },
        "pewarnaOptions": {
          "sintetis": "Synthetic",
          "alam": "Natural",
          "kombinasi": "Combination"
        },
        "bentukOptions": {
          "geometris": "Geometric",
          "nonGeometris": "Non-Geometric",
          "kombinasi": "Combination"
        },
        "jenisKainOptions": {
          "katun": "Cotton",
          "sutra": "Silk",
          "rayon": "Rayon",
          "linen": "Linen"
        }
      },
      "results": "Showing {start}-{end} of {total} batiks",
      "empty": {
        "title": "Empty Collection",
        "message": "No batik data available yet. Start adding your first batik collection."
      }
    }
  },
  "jp": {
    "gallery": {
      "comingSoon": "近日公開",
      "filters": {
        "teknikOptions": {
          "cap": "キャップ",
          "tulis": "手描き",
          "kombinasi": "組み合わせ",
          "printing": "印刷"
        },
        "pewarnaOptions": {
          "sintetis": "合成",
          "alam": "自然",
          "kombinasi": "組み合わせ"
        },
        "bentukOptions": {
          "geometris": "幾何学的",
          "nonGeometris": "非幾何学的",
          "kombinasi": "組み合わせ"
        },
        "jenisKainOptions": {
          "katun": "綿",
          "sutra": "絹",
          "rayon": "レーヨン",
          "linen": "リネン"
        }
      }
    }
  }
}

```

## next.config.ts <a id="next_config_ts"></a>

### Dependencies

- `next`

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  },
  
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
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Experimental features for better performance
  experimental: {
    optimizeCss: true,
    gzipSize: true,
  },
  
  // Webpack optimization for Docker
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
    }
    return config;
  },
};

export default nextConfig;
```

## package.json <a id="package_json"></a>

```json
{
    "name": "batik-app",
    "version": "0.1.0",
    "private": true,
    "type": "module",
    "scripts": {
        "dev": "next dev --turbopack",
        "build": "prisma generate && next build",
        "start": "next start",
        "lint": "next lint",
        "seed": "node prisma/seed.js",
        "postinstall": "prisma generate"
    },
    "dependencies": {
        "@next-auth/prisma-adapter": "^1.0.7",
        "@prisma/client": "^6.4.0",
        "@react-three/drei": "^10.6.1",
        "@react-three/fiber": "^9.2.0",
        "@react-three/rapier": "^2.1.0",
        "@supabase/supabase-js": "^2.47.12",
        "@types/express": "^5.0.0",
        "@types/multer": "^1.4.12",
        "@types/three": "^0.178.1",
        "axios": "^1.7.9",
        "bcrypt": "^5.1.1",
        "class-variance-authority": "^0.7.1",
        "cloudinary": "^2.5.1",
        "clsx": "^2.1.1",
        "dotenv": "^16.4.7",
        "flag-icon-css": "^4.1.7",
        "formidable": "^3.5.2",
        "framer-motion": "^11.18.2",
        "heic2any": "^0.0.4",
        "lucide-react": "^0.471.2",
        "multer": "^1.4.5-lts.1",
        "next": "15.1.4",
        "next-auth": "^4.24.11",
        "next-connect": "^1.0.0",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-error-boundary": "^6.0.0",
        "react-icons": "^5.4.0",
        "tailwind-merge": "^3.0.1",
        "three": "^0.178.0",
        "zod": "^3.25.56",
        "zustand": "^5.0.3"
    },
    "devDependencies": {
        "@eslint/eslintrc": "^3",
        "@shadcn/ui": "^0.0.4",
        "@types/bcrypt": "^5.0.2",
        "@types/formidable": "^3.4.5",
        "@types/node": "^20.17.12",
        "@types/react": "^19",
        "@types/react-dom": "^19",
        "autoprefixer": "^10.4.21",
        "eslint": "^9",
        "eslint-config-next": "15.1.4",
        "postcss": "^8.5.6",
        "prisma": "^6.4.0",
        "tailwindcss": "^3.4.17",
        "ts-node": "^10.9.2",
        "typescript": "^5.7.3"
    },
    "prisma": {
        "seed": "ts-node prisma/seed.js"
    }
}

```

## postcss.config.js <a id="postcss_config_js"></a>

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## prisma/TemaMigration/architecture.js <a id="architecture_js"></a>

```javascript
const architecture = {
    nama: 'arsitektur',
    translations: {
        id: 'Arsitektur',
        en: 'Architecture',
    },
    subTema: [
        {
            nama: 'monumen-malang',
            translations: {
                id: 'Monumen Malang',
                en: 'Malang Monument',
            },
        },
        {
            nama: 'candi-badut',
            translations: {
                id: 'Candi Badut',
                en: 'Badut Temple',
            },
        },
        {
            nama: 'balai-kota-malang',
            translations: {
                id: 'Balai Kota Malang',
                en: 'Malang Town Hall',
            },
        },
        {
            nama: 'candi-jago',
            translations: {
                id: 'Candi Jago',
                en: 'Jago Temple',
            },
        },
        {
            nama: 'candi-singosari',
            translations: {
                id: 'Candi Singosari',
                en: 'Singosari Temple',
            },
        },
        {
            nama: 'jalan-berbatu',
            translations: {
                id: 'Jalan Berbatu',
                en: 'Stone Paved Road',
            },
        },
    ],
};

export default architecture;

```

## prisma/TemaMigration/culture.js <a id="culture_js"></a>

```javascript
const culture = {
    nama: 'budaya',
    translations: {
        id: 'Budaya',
        en: 'Culture',
    },
    subTema: [
        {
            nama: 'topeng-kantil',
            translations: {
                id: 'Topeng Kantil',
                en: 'Kantil Mask',
            },
        },
        {
            nama: 'wayang-rama-sinta',
            translations: {
                id: 'Wayang Rama Sinta',
                en: 'Rama Sinta Puppet',
            },
        },
        {
            nama: 'pakaian-adat-jawa',
            translations: {
                id: 'Pakaian Adat Jawa',
                en: 'Traditional Javanese Attire',
            },
        },
        {
            nama: 'eyang-patik',
            translations: {
                id: 'Eyang Patik',
                en: 'Adhiluhung Batik Symbol',
            },
        },
        {
            nama: 'parang-junjung',
            translations: {
                id: 'Parang Junjung',
                en: 'Parang Junjung',
            },
        },
        {
            nama: 'perisai',
            translations: {
                id: 'Perisai',
                en: 'Shield',
            },
        },
        {
            nama: 'motif-kawung',
            translations: {
                id: 'Motif Kawung',
                en: 'Kawung Pattern',
            },
        },
        {
            nama: 'topeng',
            translations: {
                id: 'Topeng',
                en: 'Mask',
            },
        },
        { nama: 'kawung', translations: { id: 'Kawung', en: 'Kawung' } },
        { nama: 'parang', translations: { id: 'Parang', en: 'Parang' } },
        { nama: 'truntum', translations: { id: 'Truntum', en: 'Truntum' } },
        {
            nama: 'perahu-cadik',
            translations: { id: 'Perahu Cadik', en: 'Cadik Boat' },
        },
        {
            nama: 'aliran-air',
            translations: { id: 'Aliran Air', en: 'Watercourse' },
        },
        { nama: 'mahkota', translations: { id: 'Mahkota', en: 'Crown' } },
        { nama: 'srikandi', translations: { id: 'Srikandi', en: 'Srikandi' } },
    ],
};

export default culture;

```

## prisma/TemaMigration/fauna.js <a id="fauna_js"></a>

```javascript
const fauna = {
    nama: 'fauna',
    translations: {
        id: 'Fauna',
        en: 'Fauna',
    },
    subTema: [
        {
            nama: 'singa',
            translations: {
                id: 'Singa',
                en: 'Lion',
            },
        },
        {
            nama: 'burung-penenun',
            translations: {
                id: 'Burung Penenun',
                en: 'Weaver Bird',
            },
        },
        {
            nama: 'banteng',
            translations: {
                id: 'Banteng',
                en: 'Bull',
            },
        },
        {
            nama: 'ikan-mas',
            translations: {
                id: 'Ikan Mas',
                en: 'Goldfish',
            },
        },
        {
            nama: 'kura-kura',
            translations: {
                id: 'Kura-Kura',
                en: 'Turtle',
            },
        },
        {
            nama: 'gurita',
            translations: {
                id: 'Gurita',
                en: 'Octopus',
            },
        },
        {
            nama: 'kupu-kupu',
            translations: {
                id: 'Kupu-Kupu',
                en: 'Butterfly',
            },
        },
        {
            nama: 'ayam-jantan',
            translations: {
                id: 'Ayam Jantan',
                en: 'Rooster',
            },
        },
        {
            nama: 'ikan-nila',
            translations: {
                id: 'Ikan Nila',
                en: 'Tilapia Fish',
            },
        },
        {
            nama: 'sepasang-merak',
            translations: {
                id: 'Sepasang Merak',
                en: 'Pair of Peacocks',
            },
        },
        {
            nama: 'burung-bangau',
            translations: {
                id: 'Burung Bangau',
                en: 'Stork',
            },
        },
        {
            nama: 'burung-merak',
            translations: {
                id: 'Burung Merak',
                en: 'Peacock',
            },
        },
        {
            nama: 'ikan-koi',
            translations: {
                id: 'Ikan Koi',
                en: 'Koi Fish',
            },
        },
        {
            nama: 'sayap-burung',
            translations: {
                id: 'Sayap Burung',
                en: 'Bird Wings',
            },
        },
        {
            nama: 'burung-pipit',
            translations: {
                id: 'Burung Pipit',
                en: 'Sparrow',
            },
        },
        {
            nama: 'burung-dara',
            translations: {
                id: 'Burung Dara',
                en: 'Turtledove',
            },
        },
        {
            nama: 'penyu',
            translations: {
                id: 'Penyu',
                en: 'Sea Turtle',
            },
        },
        {
            nama: 'burung-lovebird',
            translations: {
                id: 'Burung Lovebird',
                en: 'Love Bird',
            },
        },
        {
            nama: 'keong',
            translations: {
                id: 'Keong',
                en: 'Snail',
            },
        },
        {
            nama: 'burung-foniks',
            translations: {
                id: 'Burung Foniks',
                en: 'Phoenix Bird',
            },
        },
        {
            nama: 'sarang-lebah',
            translations: {
                id: 'Sarang Lebah',
                en: 'Beehive',
            },
        },
        {
            nama: 'burung-hong',
            translations: {
                id: 'Burung Hong',
                en: 'Phoenix Bird',
            },
        },
        {
            nama: 'burung-cendrawasih',
            translations: {
                id: 'Burung Cendrawasih',
                en: 'Cendrawasih Bird',
            },
        },
        {
            nama: 'lebah',
            translations: {
                id: 'Lebah',
                en: 'Bee',
            },
        },
        {
            nama: 'ikan-mujair',
            translations: { id: 'Ikan Mujair', en: 'Tilapia Fish' },
        },
        {
            nama: 'burung-cendrawasih',
            translations: { id: 'Burung Cendrawasih', en: 'Bird of Paradise' },
        },
        {
            nama: 'ikan-mujair',
            translations: { id: 'Ikan Mujair', en: 'Tilapia Fish' },
        },
        {
            nama: 'burung-cendrawasih',
            translations: { id: 'Burung Cendrawasih', en: 'Bird of Paradise' },
        },
    ],
};

export default fauna;

```

## prisma/TemaMigration/flora.js <a id="flora_js"></a>

```javascript
const flora = {
    nama: 'flora',
    translations: {
        id: 'Flora',
        en: 'Flora',
    },
    subTema: [
        {
            nama: 'lotus',
            translations: {
                id: 'Bunga Teratai',
                en: 'Lotus',
            },
        },
        {
            nama: 'rain-tree',
            translations: {
                id: 'Pohon Trembesi',
                en: 'Rain Tree',
            },
        },
        {
            nama: 'bamboo',
            translations: {
                id: 'Bambu',
                en: 'Bamboo',
            },
        },
        {
            nama: 'apple',
            translations: {
                id: 'Apel',
                en: 'Apple',
            },
        },
        {
            nama: 'frangipani',
            translations: {
                id: 'Bunga Kamboja',
                en: 'Frangipani',
            },
        },
        {
            nama: 'rose',
            translations: {
                id: 'Bunga Mawar',
                en: 'Rose',
            },
        },
        {
            nama: 'jasmine',
            translations: {
                id: 'Bunga Melati',
                en: 'Jasmine',
            },
        },
        {
            nama: 'sea-plants',
            translations: {
                id: 'Tanaman Laut',
                en: 'Sea Plants',
            },
        },
        {
            nama: 'rice-plant',
            translations: {
                id: 'Tanaman Padi',
                en: 'Rice Plant',
            },
        },
        {
            nama: 'hibiscus',
            translations: {
                id: 'Bunga Sepatu',
                en: 'Hibiscus',
            },
        },
        {
            nama: 'flower',
            translations: {
                id: 'Bunga',
                en: 'Flower',
            },
        },
        {
            nama: 'cotton',
            translations: {
                id: 'Kapas',
                en: 'Cotton',
            },
        },
        {
            nama: 'banyan-tree',
            translations: {
                id: 'Pohon Beringin',
                en: 'Banyan Tree',
            },
        },
        {
            nama: 'bamboo-leaf',
            translations: {
                id: 'Daun Bambu',
                en: 'Bamboo Leaf',
            },
        },
        {
            nama: 'breadfruit',
            translations: {
                id: 'Buah Sukun',
                en: 'Breadfruit',
            },
        },
        {
            nama: 'breadfruit-leaf',
            translations: {
                id: 'Daun Sukun',
                en: 'Breadfruit Leaf',
            },
        },
        {
            nama: 'breadfruit-root',
            translations: {
                id: 'Akar Sukun',
                en: 'Breadfruit Root',
            },
        },
        {
            nama: 'bird-of-paradise',
            translations: {
                id: 'Bunga Cendrawasih',
                en: 'Bird of Paradise',
            },
        },
        {
            nama: 'coffee-cup',
            translations: {
                id: 'Cangkir Kopi',
                en: 'Coffee Cup',
            },
        },
        {
            nama: 'trumpet-flower',
            translations: {
                id: 'Bunga Terompet',
                en: 'Trumpet Flower',
            },
        },
        {
            nama: 'trumpet-flower-leaf',
            translations: {
                id: 'Daun Bunga Terompet',
                en: 'Trumpet Flower Leaf',
            },
        },
        {
            nama: 'trumpet-flower-stem',
            translations: {
                id: 'Batang Bunga Terompet',
                en: 'Trumpet Flower Stem',
            },
        },
        {
            nama: 'ploso-flower',
            translations: {
                id: 'Bunga Ploso',
                en: 'Ploso Flower',
            },
        },
        {
            nama: 'hibiscus-leaf',
            translations: {
                id: 'Daun Bunga Sepatu',
                en: 'Hibiscus Leaf',
            },
        },
        {
            nama: 'hibiscus-twig',
            translations: {
                id: 'Ranting Bunga Sepatu',
                en: 'Hibiscus Twig',
            },
        },
        {
            nama: 'coffee-beans',
            translations: {
                id: 'Biji Kopi',
                en: 'Coffee Beans',
            },
        },
        {
            nama: 'ukel-ukel',
            translations: {
                id: 'Ukel-Ukel',
                en: 'Ukel-Ukel',
            },
        },
        {
            nama: 'chili-plant',
            translations: {
                id: 'Tanaman Cabai',
                en: 'Chili Plant',
            },
        },
        {
            nama: 'succulent-plant',
            translations: {
                id: 'Tanaman Sukulen',
                en: 'Succulent Plant',
            },
        },
        {
            nama: 'truntum',
            translations: {
                id: 'Truntum',
                en: 'Truntum',
            },
        },
        {
            nama: 'shield-leaf',
            translations: {
                id: 'Daun Perisai',
                en: 'Shield Leaf',
            },
        },
        {
            nama: 'monstera-deliciosa',
            translations: {
                id: 'Monstera Deliciosa',
                en: 'Monstera Deliciosa',
            },
        },
        {
            nama: 'fern-plants',
            translations: {
                id: 'Tanaman Pakis',
                en: 'Fern Plants',
            },
        },
        {
            nama: 'orchid-flower',
            translations: {
                id: 'Bunga Anggrek',
                en: 'Orchid Flower',
            },
        },
        {
            nama: 'teak-leaf',
            translations: {
                id: 'Daun Jati',
                en: 'Teak Leaf',
            },
        },
        {
            nama: 'wijaya-kusuma-flower',
            translations: {
                id: 'Bunga Wijaya Kusuma',
                en: 'Wijaya Kusuma Flower',
            },
        },
        {
            nama: 'sunflower',
            translations: {
                id: 'Bunga Matahari',
                en: 'Sunflower',
            },
        },
        {
            nama: 'bamboo-tree',
            translations: {
                id: 'Pohon Bambu',
                en: 'Bamboo Tree',
            },
        },
        {
            nama: 'rafflesia-arnoldii',
            translations: {
                id: 'Rafflesia Arnoldii',
                en: 'Rafflesia Arnoldii',
            },
        },
        {
            nama: 'coffee-plant',
            translations: {
                id: 'Tanaman Kopi',
                en: 'Coffee Plant',
            },
        },
        {
            nama: 'palm-tree',
            translations: {
                id: 'Pohon Palem',
                en: 'Palm Tree',
            },
        },
        {
            nama: 'bougainvillea',
            translations: {
                id: 'Bougenville',
                en: 'Bougainvillea',
            },
        },
        {
            nama: 'white-walnut',
            translations: {
                id: 'Kenari Putih',
                en: 'White Walnut',
            },
        },
        {
            nama: 'pine',
            translations: {
                id: 'Pohon Cemara',
                en: 'Pine Tree',
            },
        },

        {
            nama: 'daun-sukun',
            translations: { id: 'Daun pohon Sukun', en: 'Breadfruit Leaf' },
        },
        {
            nama: 'buah-sukun',
            translations: { id: 'Buah pohon Sukun', en: 'Breadfruit' },
        },
        {
            nama: 'akar-sukun',
            translations: { id: 'Akar pohon Sukun', en: 'Breadfruit Root' },
        },
        { nama: 'ukel', translations: { id: 'Ukel', en: 'Ukel' } },
        {
            nama: 'tumbuhan-laut',
            translations: { id: 'Tumbuhan Laut', en: 'Sea Plants' },
        },
        { nama: 'teratai', translations: { id: 'Teratai', en: 'Lotus' } },
        { nama: 'trembesi', translations: { id: 'Trembesi', en: 'Rain Tree' } },
        {
            nama: 'bunga-sukun',
            translations: { id: 'Bunga pohon Sukun', en: 'Breadfruit Flower' },
        },
    ],
};

export default flora;

```

## prisma/seed.js <a id="seed_js"></a>

### Dependencies

- `@prisma/client`
- `bcrypt`

```javascript
// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create languages
  const languages = await Promise.all([
    prisma.language.upsert({
      where: { code: 'id' },
      update: {},
      create: {
        code: 'id',
        name: 'Indonesian',
        isDefault: true,
      },
    }),
    prisma.language.upsert({
      where: { code: 'en' },
      update: {},
      create: {
        code: 'en',
        name: 'English',
        isDefault: false,
      },
    }),
  ]);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@batiksphere.com' },
    update: {},
    create: {
      email: 'admin@batiksphere.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ languages, adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## prisma/schema.prisma<a id="schema.prisma"></a>

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model Batik {
  nama         String
  tahun        String
  dimensi      String
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
  id           Int                @id @default(autoincrement())
  kode         String?
  alamat       String?
  pointmap     String?
  seniman      String?
  translations BatikTranslation[]
  foto         Foto[]
  subTema      SubTema[]          @relation("BatikSubTema")
  tema         Tema[]             @relation("BatikTema")
}

model BatikTranslation {
  id         Int      @id @default(autoincrement())
  batikId    Int
  languageId Int
  warna      String
  teknik     String
  jenisKain  String
  pewarna    String
  bentuk     String
  histori    String
  batik      Batik    @relation(fields: [batikId], references: [id], onDelete: Cascade)
  language   Language @relation(fields: [languageId], references: [id])

  @@unique([batikId, languageId])
}

model Foto {
  id      Int    @id @default(autoincrement())
  link    String
  batikId Int
  batik   Batik  @relation(fields: [batikId], references: [id])
}

model TemaTranslation {
  id         Int      @id @default(autoincrement())
  temaId     Int
  languageId Int
  nama       String
  language   Language @relation(fields: [languageId], references: [id])
  tema       Tema     @relation(fields: [temaId], references: [id], onDelete: Cascade)

  @@unique([temaId, languageId])
}

model SubTemaTranslation {
  id         Int      @id @default(autoincrement())
  subTemaId  Int
  languageId Int
  nama       String
  language   Language @relation(fields: [languageId], references: [id])
  subTema    SubTema  @relation(fields: [subTemaId], references: [id], onDelete: Cascade)

  @@unique([subTemaId, languageId])
}

model Tema {
  id           Int               @id @default(autoincrement())
  nama         String            @unique
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt
  subTema      SubTema[]
  translations TemaTranslation[]
  batiks       Batik[]           @relation("BatikTema")
}

model SubTema {
  id           Int                  @id @default(autoincrement())
  nama         String               @unique
  temaId       Int
  createdAt    DateTime             @default(now())
  updatedAt    DateTime             @updatedAt
  tema         Tema                 @relation(fields: [temaId], references: [id])
  translations SubTemaTranslation[]
  batiks       Batik[]              @relation("BatikSubTema")

  @@unique([nama, temaId])
}

model Language {
  id                  Int                  @id @default(autoincrement())
  code                String               @unique
  name                String
  isDefault           Boolean              @default(false)
  createdAt           DateTime             @default(now())
  updatedAt           DateTime             @updatedAt
  batikTranslations   BatikTranslation[]
  subTemaTranslations SubTemaTranslation[]
  temaTranslations    TemaTranslation[]
}

// Tambahkan ini di prisma/schema.prisma (jangan hapus yang lama)

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  password      String?
  avatar        String?
  role          UserRole  @default(USER)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verificationtokens")
}

enum UserRole {
  USER
  ADMIN
  MODERATOR
}
```
## tsconfig.json <a id="tsconfig_json"></a>

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "prisma/seed.js"],
  "exclude": ["node_modules"]
}

```

## tailwind.config.ts <a id="tailwind_config_ts"></a>

### Dependencies

- `tailwindcss`

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-clip-text',
    'text-transparent',
    'gallery-grid'
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      }
    },
  },
  plugins: [],
} satisfies Config;
```

## types/next-connect.d.ts <a id="next-connect_d_ts"></a>

### Dependencies

- `next`

```typescript
declare module 'next-connect' {
    import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
  
    export interface NextConnectOptions<Req = NextApiRequest, Res = NextApiResponse> {
      onError?: (err: unknown, req: Req, res: Res, next: (err?: unknown) => void) => void;
      onNoMatch?: (req: Req, res: Res) => void;
    }
  
    export interface Middleware<Req = NextApiRequest, Res = NextApiResponse> {
      (req: Req, res: Res, next: (err?: unknown) => void): void;
    }
  
    type NextConnectMiddleware<Req = NextApiRequest, Res = NextApiResponse> = (
      req: Req,
      res: Res,
      next: (err?: unknown) => void
    ) => void;
  
    export default function nextConnect<Req = NextApiRequest, Res = NextApiResponse>(
      options?: NextConnectOptions<Req, Res>
    ): {
      use: (...middlewares: Array<Middleware<Req, Res> | NextApiHandler<Req, Res>>) => NextConnectMiddleware<Req, Res>;
      get: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      post: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      put: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      delete: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      patch: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      options: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
      head: (handler: NextApiHandler<Req, Res>) => NextConnectMiddleware<Req, Res>;
    };
  }
  
```

## types/next.d.ts <a id="next_d_ts"></a>

### Dependencies

- `next`
- `multer`

```typescript
// types/next.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from 'next';
import { File } from 'multer';

declare module 'next' {
  interface NextApiRequest {
    file?: File;
  }
}

```

## Dependency Diagram

Below is a visualization of file dependencies in the codebase:

```mermaid
graph TD
  F1_E-Batik (menyalin 1)_.dockerignore[".dockerignore"]
  F2_E-Batik (menyalin 1)_.env[".env"]
  F3_CodeFlattened_E-Batik (menyalin 1)_flattened.md["E-Batik (menyalin 1)_flattened.md"]
  F4_E-Batik (menyalin 1)_Dockerfile["Dockerfile"]
  F5_E-Batik (menyalin 1)_Makefile["Makefile"]
  F6_E-Batik (menyalin 1)_README.md["README.md"]
  F7_add-batik_page.tsx["page.tsx"]
  F8_login_page.tsx["page.tsx"]
  F9_[...nextauth]_route.ts["route.ts"]
  F10_register_route.ts["route.ts"]
  F11_auth_route.ts["route.ts"]
  F12_batik_route.ts["route.ts"]
  F13_[id]_route.ts["route.ts"]
  F14_hero_route.ts["route.ts"]
  F15_upload_route.ts["route.ts"]
  F16_(protected)_layout.tsx["layout.tsx"]
  F17_[id]_page.tsx["page.tsx"]
  F18_gallery_page.tsx["page.tsx"]
  F19_museum_page.tsx["page.tsx"]
  F20_batik_BatikDetailClient.tsx["BatikDetailClient.tsx"]
  F21_batik_BatikImageSlider.tsx["BatikImageSlider.tsx"]
  F22_batik_BatikSlider.tsx["BatikSlider.tsx"]
  F23_forms_BatikForm.tsx["BatikForm.tsx"]
  F24_forms_ImageUpload.tsx["ImageUpload.tsx"]
  F25_app_layout.tsx["layout.tsx"]
  F26_app_page.tsx["page.tsx"]
  F27_app_globals.css["globals.css"]
  F28_forms_LoginForm.tsx["LoginForm.tsx"]
  F29_gallery_GalleryCard.tsx["GalleryCard.tsx"]
  F30_gallery_GalleryErrorBoundary.tsx["GalleryErrorBoundary.tsx"]
  F31_gallery_GalleryClient.tsx["GalleryClient.tsx"]
  F32_forms_ThemeSelector.tsx["ThemeSelector.tsx"]
  F33_gallery_GalleryGrid.tsx["GalleryGrid.tsx"]
  F34_gallery_GallerySearch.tsx["GallerySearch.tsx"]
  F35_layout_Footer.tsx["Footer.tsx"]
  F36_gallery_GalleryFilter.tsx["GalleryFilter.tsx"]
  F37_layout_Hero.tsx["Hero.tsx"]
  F38_layout_InfoSection.tsx["InfoSection.tsx"]
  F39_layout_LanguageSelector.tsx["LanguageSelector.tsx"]
  F40_layout_Navbar.tsx["Navbar.tsx"]
  F41_layout_PageLayout.tsx["PageLayout.tsx"]
  F42_museum_BatikDetailModal.tsx["BatikDetailModal.tsx"]
  F43_layout_StatsCounter.tsx["StatsCounter.tsx"]
  F44_museum_BatikFrame.tsx["BatikFrame.tsx"]
  F45_museum_BatikGallery.tsx["BatikGallery.tsx"]
  F46_museum_ControlsInstructions.tsx["ControlsInstructions.tsx"]
  F47_museum_FirstPersonControls.tsx["FirstPersonControls.tsx"]
  F48_museum_LoadingScreen.tsx["LoadingScreen.tsx"]
  F49_museum_FloorTransition.tsx["FloorTransition.tsx"]
  F50_museum_Minimap.tsx["Minimap.tsx"]
  F51_museum_Museum.tsx["Museum.tsx"]
  F52_museum_MuseumBuilding.tsx["MuseumBuilding.tsx"]
  F53_museum_MuseumUI.tsx["MuseumUI.tsx"]
  F54_museum_PerformanceOptimizer.tsx["PerformanceOptimizer.tsx"]
  F55_models_Bench.tsx["Bench.tsx"]
  F56_models_CeilingLamp.tsx["CeilingLamp.tsx"]
  F57_models_ModelErrorBoundary.tsx["ModelErrorBoundary.tsx"]
  F58_models_PictureFrame.tsx["PictureFrame.tsx"]
  F59_models_Statue.tsx["Statue.tsx"]
  F60_shared_ErrorBoundary.tsx["ErrorBoundary.tsx"]
  F61_ui_Button.tsx["Button.tsx"]
  F62_ui_Input.tsx["Input.tsx"]
  F63_ui_LoadingSpinner.tsx["LoadingSpinner.tsx"]
  F64_E-Batik (menyalin 1)_docker-compose.dev.yml["docker-compose.dev.yml"]
  F65_ui_Pagination.tsx["Pagination.tsx"]
  F66_E-Batik (menyalin 1)_docker-compose.yml["docker-compose.yml"]
  F67_E-Batik (menyalin 1)_eslint.config.mjs["eslint.config.mjs"]
  F68_actions_batik.ts["batik.ts"]
  F69_actions_themes.ts["themes.ts"]
  F70_auth_config.ts["config.ts"]
  F71_actions_languages.ts["languages.ts"]
  F72_lib_cloudinary.ts["cloudinary.ts"]
  F73_db_prisma.ts["prisma.ts"]
  F74_db_supabase.ts["supabase.ts"]
  F75_contexts_AuthContext.tsx["AuthContext.tsx"]
  F76_contexts_LanguageContext.tsx["LanguageContext.tsx"]
  F77_contexts_providers.tsx["providers.tsx"]
  F78_auth_useAuth.ts["useAuth.ts"]
  F79_batik_useBatik.ts["useBatik.ts"]
  F80_batik_useBatikForm.ts["useBatikForm.ts"]
  F81_gallery_useGalleryFilters.ts["useGalleryFilters.ts"]
  F82_shared_usePagination.ts["usePagination.ts"]
  F83_lib_prismaClient.ts["prismaClient.ts"]
  F84_services_auth.service.ts["auth.service.ts"]
  F85_services_batik.service.ts["batik.service.ts"]
  F86_services_upload.service.ts["upload.service.ts"]
  F87_stores_museumStore.ts["museumStore.ts"]
  F88_lib_supabaseClient.ts["supabaseClient.ts"]
  F89_types_auth.ts["auth.ts"]
  F90_types_batik.ts["batik.ts"]
  F91_types_index.ts["index.ts"]
  F92_types_next-auth.d.ts["next-auth.d.ts"]
  F93_utils_MuseumTextureManager.ts["MuseumTextureManager.ts"]
  F94_utils_PerformanceMonitor.ts["PerformanceMonitor.ts"]
  F95_utils_TextureManager.ts["TextureManager.ts"]
  F96_utils_cn.ts["cn.ts"]
  F97_utils_constants.ts["constants.ts"]
  F98_utils_helpers.ts["helpers.ts"]
  F99_E-Batik (menyalin 1)_next-env.d.ts["next-env.d.ts"]
  F100_E-Batik (menyalin 1)_nginx.conf["nginx.conf"]
  F101_locales_translations.json["translations.json"]
  F102_E-Batik (menyalin 1)_next.config.ts["next.config.ts"]
  F103_E-Batik (menyalin 1)_package.json["package.json"]
  F104_E-Batik (menyalin 1)_postcss.config.js["postcss.config.js"]
  F105_TemaMigration_architecture.js["architecture.js"]
  F106_TemaMigration_culture.js["culture.js"]
  F107_TemaMigration_fauna.js["fauna.js"]
  F108_TemaMigration_flora.js["flora.js"]
  F109_prisma_seed.js["seed.js"]
  F110_E-Batik (menyalin 1)_tsconfig.json["tsconfig.json"]
  F111_E-Batik (menyalin 1)_tailwind.config.ts["tailwind.config.ts"]
  F112_types_next-connect.d.ts["next-connect.d.ts"]
  F113_types_next.d.ts["next.d.ts"]
  F4_E-Batik (menyalin 1)_Dockerfile --> F74_db_supabase.ts
  F4_E-Batik (menyalin 1)_Dockerfile --> F1_E-Batik (menyalin 1)_.dockerignore
  F7_add-batik_page.tsx --> F9_[...nextauth]_route.ts
  F8_login_page.tsx --> F9_[...nextauth]_route.ts
  F9_[...nextauth]_route.ts --> F92_types_next-auth.d.ts
  F12_batik_route.ts --> F92_types_next-auth.d.ts
  F13_[id]_route.ts --> F92_types_next-auth.d.ts
  F15_upload_route.ts --> F92_types_next-auth.d.ts
  F16_(protected)_layout.tsx --> F92_types_next-auth.d.ts
  F17_[id]_page.tsx --> F9_[...nextauth]_route.ts
  F18_gallery_page.tsx --> F9_[...nextauth]_route.ts
  F19_museum_page.tsx --> F9_[...nextauth]_route.ts
  F70_auth_config.ts --> F92_types_next-auth.d.ts
  F72_lib_cloudinary.ts --> F72_lib_cloudinary.ts
  F86_services_upload.service.ts --> F72_lib_cloudinary.ts
  F92_types_next-auth.d.ts --> F92_types_next-auth.d.ts
  F102_E-Batik (menyalin 1)_next.config.ts --> F9_[...nextauth]_route.ts
  F112_types_next-connect.d.ts --> F9_[...nextauth]_route.ts
  F113_types_next.d.ts --> F9_[...nextauth]_route.ts
```

