'use client';

import { useEffect, useState } from 'react';

const StatsCounter = () => {
    const stats = [
        { value: 500, label: 'Batik Terdigitalisasi' },
        { value: 50, label: 'Tempat Batik' },
        { value: 90, label: 'Tema Batik' },
        { value: 10, label: 'Tim Pengembang' },
    ];

    const [counters, setCounters] = useState(stats.map(() => 0));

    useEffect(() => {
        let startTimestamp: number | null = null;
        const duration = 1500;

        function step(timestamp: number) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min(
                (timestamp - startTimestamp) / duration,
                1
            );

            setCounters(stats.map((stat) => Math.ceil(stat.value * progress)));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }, []);

    return (
        <section className='pt-10 w-full'>
            <div className='mx-auto max-w-[1280px] px-4 md:px-[calc(3.5vw+5px)]'>
                <div className='grid grid-cols-2 items-center justify-around gap-4 pb-8 md:grid-cols-4 md:gap-[20px] md:pb-[60px]'>
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className='flex flex-col items-center gap-[20px] text-xl font-semibold md:text-[40px]'
                        >
                            <p className='flex items-center'>
                                <span>{counters[index]}</span>
                                <span className='text-[#c4a484] ml-1'>+</span>
                            </p>
                            <p className='rounded-lg bg-[#c4a484] text-[#5a2b2b] px-2 py-2 text-center text-xs font-medium md:px-[12px] md:py-[8px] md:text-sm'>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
