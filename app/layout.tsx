import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <LanguageProvider>
                <AuthProvider>
                    <body className='min-h-screen flex flex-col bg-gray-50'>
                        <Navbar />
                        <main className='flex-1 w-full mt-16'>{children}</main>
                    </body>
                </AuthProvider>
            </LanguageProvider>
        </html>
    );
}
