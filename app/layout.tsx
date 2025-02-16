import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/app/components/Navbar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <main className="flex-1 w-full mt-16"> {/* Menghapus max-width dan padding */}
            {children}
          </main>
        </body>
      </AuthProvider>
    </html>
  );
}
