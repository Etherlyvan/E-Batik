'use client';
// import { useEffect } from 'react';
import { BatikForm } from '@/app/components/batik/BatikForm';
import Navbar from '../components/Navbar';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/navigation';

export default function BatikFormPage() {
    // const { user } = useAuth();
    // const router = useRouter();
    // useEffect(() => {
    //     if (!user) {
    //         router.push('/login');
    //     }
    // }, [user, router]);

    // if (!user) return null;

    return (
        <div className='min-h-screen bg-gray-100 py-8'>
            <Navbar />
            <BatikForm />
        </div>
    );
}
