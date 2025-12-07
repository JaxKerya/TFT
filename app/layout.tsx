import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { FavoritesProvider } from '@/lib/favorites';
import { LanguageProvider } from '@/lib/language-context';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: 'TFT Item Rehberi',
  description: 'TFT item üretme ve etkileri için premium rehber',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <LanguageProvider>
          <FavoritesProvider>
            <div className="min-h-screen flex flex-col">
              <Navigation />

              {/* Main Content */}
              <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
                {children}
              </main>

              <Footer />
            </div>
          </FavoritesProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
