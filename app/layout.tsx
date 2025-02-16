import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/app/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 w-full mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Menambahkan max-width dan padding yang sama dengan navbar */}
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}

