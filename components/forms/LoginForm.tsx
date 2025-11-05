// components/forms/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import { LoginSchema, type LoginData, type FormErrors } from '@/lib/types/auth';
import { z } from 'zod';

export function LoginForm() {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  
  const { signIn, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data
      const validatedData = LoginSchema.parse(formData);
      
      // Attempt sign in
      await signIn(validatedData.email, validatedData.password);
      
      // Redirect on success
      router.push('/gallery');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FormErrors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof FormErrors] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errors.general}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        autoComplete="email"
        placeholder="Enter your email"
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        required
        autoComplete="current-password"
        placeholder="Enter your password"
      />

      <Button type="submit" loading={loading} className="w-full">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      {/* Additional Links */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign up
          </a>
        </p>
        <p className="text-sm">
          <a href="/forgot-password" className="text-blue-600 hover:text-blue-800">
            Forgot your password?
          </a>
        </p>
      </div>
    </form>
  );
}