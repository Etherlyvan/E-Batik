'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import BatikForm from '@/app/components/BatikForm';

const AddBatikPage: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div>
      <h1>Add a new Batik</h1>
      <BatikForm />
    </div>
  );
};

export default AddBatikPage;
