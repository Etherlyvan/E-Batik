// lib/types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      image?: string | null;
      role: 'USER' | 'ADMIN' | 'MODERATOR';
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
  }
}