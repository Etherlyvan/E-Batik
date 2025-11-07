// app/layout.tsx
import './globals.css'; 
import { Providers } from '@/lib/contexts/providers';

export const metadata = {
  title: 'BatikPedia - Digital Batik Database',
  description: 'Preserving Indonesian batik heritage through digital innovation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}