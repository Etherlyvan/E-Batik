'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/Navbar';
import { BatikForm } from '@/app/components/batik/BatikForm';

export default function BatikFormPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return <p className='text-center p-4'>Loading ...</p>;
    }

    if (!user) return null;

    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <Navbar />
            <BatikForm />
        </div>
    );
}
