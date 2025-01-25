'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { IoKeySharp, IoMail } from 'react-icons/io5';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
});

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {}
    );
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        const validationResult = loginSchema.safeParse({ email, password });

        if (!validationResult.success) {
            const errorMessages: { email?: string; password?: string } = {};
            validationResult.error.errors.forEach((error) => {
                if (error.path.includes('email')) {
                    errorMessages.email = error.message;
                }
                if (error.path.includes('password')) {
                    errorMessages.password = error.message;
                }
            });
            setErrors(errorMessages);
            setLoading(false);
            return;
        }

        try {
            await login(email, password);
            router.replace('/');
        } catch (error) {
            alert('Login failed.' + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50'>
            <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
                <h1 className='text-2xl font-bold text-center underline decoration-indigo-600'>
                    Login Page
                </h1>
                <form
                    onSubmit={handleLogin}
                    className='mt-6 space-y-6 flex flex-col w-full'
                >
                    {/* Email Input */}
                    <div>
                        <label htmlFor='email' className='text-md font-bold'>
                            Email
                        </label>
                        <div className='relative mt-1'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <IoMail className='w-5 h-5 text-gray-400' />
                            </div>
                            <input
                                type='email'
                                id='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full h-12 rounded-md border ${
                                    errors.email
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } pl-10 pr-4 text-md focus:outline-none focus:ring-2 ${
                                    errors.email
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-indigo-600'
                                } focus:border-transparent`}
                            />
                        </div>
                        {errors.email && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor='password' className='text-md font-bold'>
                            Password
                        </label>
                        <div className='relative mt-1'>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <IoKeySharp className='w-5 h-5 text-gray-400' />
                            </div>
                            <input
                                type='password'
                                id='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full h-12 rounded-md border ${
                                    errors.password
                                        ? 'border-red-500'
                                        : 'border-gray-300'
                                } pl-10 pr-4 text-md focus:outline-none focus:ring-2 ${
                                    errors.password
                                        ? 'focus:ring-red-500'
                                        : 'focus:ring-indigo-600'
                                } focus:border-transparent`}
                            />
                        </div>
                        {errors.password && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed'
                    >
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
