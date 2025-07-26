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