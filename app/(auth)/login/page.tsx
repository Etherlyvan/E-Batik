// 🔐 AUTH FEATURE - User authentication page
import { LoginForm } from '@/components/forms/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Batik Sphere',
  description: 'Sign in to your Batik Sphere account',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Sign In to Batik Sphere
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}