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
        // Optimize connection pool
        datasourceUrl: process.env.DATABASE_URL + '?connection_limit=10&pool_timeout=20&pool_max=20',
      });

      // Enable query optimization
      DatabaseConnection.instance.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();

        if (process.env.NODE_ENV === 'development') {
          console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
        }

        return result;
      });
    }

    return DatabaseConnection.instance;
  }

  public static async disconnect(): Promise<void> {
    if (DatabaseConnection.instance) {
      await DatabaseConnection.instance.$disconnect();
      DatabaseConnection.instance = null;
    }
  }
}

export const prismaOptimized = DatabaseConnection.getInstance();