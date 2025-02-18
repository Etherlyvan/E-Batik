'use client';

import Hero from '@/app/components/hero';
import Footer from './components/Footer';

export default function Home() {
    return (
        <div className='min-h-screen'>
            <main className='flex flex-col items-center sm:items-start gap-6'>
                <Hero />
                <Footer />
            </main>
        </div>
    );
}
