'use client';

import Hero from '@/app/components/hero';

export default function Home() {
    return (
        <div className='min-h-screen'>
            {' '}
            {/* Menghapus container dan padding */}
            <main className='flex flex-col items-center sm:items-start gap-6'>
                <Hero />
            </main>
        </div>
    );
}
