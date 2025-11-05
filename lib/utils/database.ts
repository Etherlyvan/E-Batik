// lib/utils/database.ts
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      // Don't retry for certain types of errors
      if (error instanceof PrismaClientKnownRequestError) {
        // Don't retry for "not found" or validation errors
        if (error.code === 'P2025' || error.code === 'P2002') {
          throw error;
        }
      }
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying (exponential backoff)
      const delay = baseDelay * Math.pow(2, attempt - 1);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      console.log(`Database operation failed, retrying (${attempt}/${maxRetries})...`);
    }
  }
  
  throw lastError || new Error('Operation failed after retries');
}

export function isConnectionError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  
  const errorMessage = error.message.toLowerCase();
  return (
    errorMessage.includes('connection') ||
    errorMessage.includes('timeout') ||
    errorMessage.includes("can't reach database") ||
    errorMessage.includes('econnrefused')
  );
}