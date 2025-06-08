'use client';

import Hero from '@/app/components/hero';
import InfiniteSlider from './components/InfiniteSlider';
import { useEffect, useState } from 'react';
import { Batik } from '@/types';
import InfoDataComponent from './components/InfoDataComponent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import StatsCounter from './components/StatsCounter';

export default function Home() {
    const [batiks, setBatiks] = useState<Batik[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const batiksResponse = await fetch('/api/batik');

                const batiksData = await batiksResponse.json();

                if (Array.isArray(batiksData)) {
                    setBatiks(batiksData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='min-h-screen'>
            <Navbar />
            <main className='flex flex-col items-center sm:items-start'>
                <Hero />
                <InfoDataComponent />
                <StatsCounter />
                <InfiniteSlider batiks={batiks} />
            </main>
            <Footer />
        </div>
    );
}
