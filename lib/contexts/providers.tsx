// 🌐 CONTEXT PROVIDERS - Combined providers for the application
'use client';

import { AuthProvider } from './AuthContext';
import { LanguageProvider } from './LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LanguageProvider>
  );
}