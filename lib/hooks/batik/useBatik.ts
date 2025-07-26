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