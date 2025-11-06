// lib/db/connection.ts
import { PrismaClient } from '@prisma/client';

// Create a singleton pattern for Prisma Client with optimized settings
class DatabaseConnection {
  private static instance: PrismaClient | null = null;

  public static getInstance(): PrismaClient {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        datasources: {
          db: {
            url: process.env.DATABASE_URL,
          },
        },
      });

      // Connection lifecycle management
      DatabaseConnection.instance.$connect()
        .then(() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Database connected successfully');
          }
        })
        .catch((error) => {
          console.error('❌ Database connection failed:', error);
          throw error;
        });
    }

    return DatabaseConnection.instance;
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect();
      DatabaseConnection.instance = null;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🔌 Database disconnected');
      }
    }
  }

  // Optional: Add query timing for development
  public static logQuery(model: string, action: string, duration: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ Query ${model}.${action} took ${duration}ms`);
    }
  }
}

export const prismaOptimized = DatabaseConnection.getInstance();

// Cleanup on process termination
if (typeof window === 'undefined') {
  process.on('beforeExit', async () => {
    await DatabaseConnection.disconnect();
  });

  process.on('SIGINT', async () => {
    await DatabaseConnection.disconnect();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await DatabaseConnection.disconnect();
    process.exit(0);
  });
}