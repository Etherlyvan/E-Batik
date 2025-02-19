import { useEffect, useState } from 'react';

const InfoDataComponent = () => {
    const stats = [
        { value: 2000, label: 'Batik Terdigitalisasi' },
        { value: 70, label: 'Tempat Batik' },
        { value: 90, label: 'Tema Batik' },
        { value: 120, label: 'Tim Pengembang' },
    ];

    const [counters, setCounters] = useState(stats.map(() => 0));

    useEffect(() => {
        const interval = setInterval(() => {
            setCounters((prevCounters) =>
                prevCounters.map((count, index) =>
                    count < stats[index].value ? count + 10 : stats[index].value
                )
            );
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='font-sans w-full'>
            {/* Stats Section */}
            <section className='w-full py-10'>
                <div className='max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center'>
                    {stats.map((stat, index) => (
                        <div key={index} className='flex flex-col items-center'>
                            <span className='text-4xl font-bold text-[#5a2b2b]'>
                                {counters[index]}
                                <span className='text-[#c4a484]'>+</span>
                            </span>
                            <span className='mt-2 px-4 py-1 bg-[#c4a484] text-[#5a2b2b] rounded-lg text-sm font-medium'>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Hero Section */}
            <section className='bg-[#5a2b2b] text-white py-16 w-full'>
                <div className='max-w-7xl mx-auto px-8 md:px-16 lg:px-24 text-center'>
                    {/* Logo SVG */}
                    <div className='flex justify-center mb-6'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='#c4a484'
                            className='w-16 h-16'
                        >
                            <path d='M12 2L1.5 21h21L12 2zM12 6l7 13H5l7-13z' />
                        </svg>
                    </div>

                    <h1 className='text-3xl font-bold text-[#e5d0b5]'>
                        Explore Our Exquisite Batik Collections: A Journey
                        Through Art and Culture
                    </h1>

                    <div className='mt-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {[
                            {
                                title: 'Discover the Rich Heritage of Batik',
                                description:
                                    'Immerse yourself in the beauty of traditional and contemporary Batik.',
                                linkText: 'View',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-5-5h10l-5 5z' />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Experience the Artistry of Batik',
                                description:
                                    'Each piece tells a story, reflecting the rich culture of Indonesia.',
                                linkText: 'Explore',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2L1.5 21h21L12 2zm0 3.3L18.6 19H5.4L12 5.3z' />
                                    </svg>
                                ),
                            },
                            {
                                title: 'Join Us in Celebrating Batik',
                                description:
                                    'Be part of our journey to preserve and promote Batik heritage.',
                                linkText: 'Join',
                                icon: (
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='w-10 h-10 text-[#c4a484]'
                                        viewBox='0 0 24 24'
                                        fill='currentColor'
                                    >
                                        <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-5h4v5h-4zm0-7V8h4v1.5h-4z' />
                                    </svg>
                                ),
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className='text-left flex items-start gap-4'
                            >
                                {item.icon}
                                <div>
                                    <div className='text-lg font-semibold text-[#e5d0b5]'>
                                        {item.title}
                                    </div>
                                    <p className='mt-2 text-md text-[#e5d0b5]'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InfoDataComponent;
