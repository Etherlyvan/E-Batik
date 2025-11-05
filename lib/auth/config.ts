// lib/auth/config.ts
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/db/prisma';

<<<<<<< HEAD
type UserRole = 'USER' | 'ADMIN' | 'MODERATOR';

interface UserWithRole {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export const authOptions: NextAuthOptions = {
=======
export const authOptions = {
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Find user in database
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role as UserRole, // Type assertion here
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
<<<<<<< HEAD
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as UserWithRole).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as UserWithRole).role = token.role as UserRole;
      }
      return session;
    },
  },
=======
>>>>>>> f4dc652 (feat: japanese translation, virtual gallery, and enhance on pagination)
};