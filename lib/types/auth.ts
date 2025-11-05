// lib/types/auth.ts
import { z } from 'zod';

// User roles
export type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

// Zod schemas for validation
export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(6, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New passwords don't match",
  path: ["confirmPassword"],
});

// TypeScript types inferred from schemas
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

// User types
export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  avatar?: string | null;
  role: UserRole;
  emailVerified?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthSession {
  user: AuthUser;
  expires: string;
}

// API Response types
export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  session?: AuthSession;
  message?: string;
  error?: string;
}

// Form validation error types
export interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
  newPassword?: string;
  name?: string;
  general?: string;
}

// Permission types
export type Permission = 
  | 'read:batik'
  | 'write:batik'
  | 'delete:batik'
  | 'manage:users'
  | 'manage:themes'
  | 'upload:images';

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
}