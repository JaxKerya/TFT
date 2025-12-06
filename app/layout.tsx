import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Layers, Package, Lollipop } from 'lucide-react';
import { locale } from '@/locales';
import { FavoritesProvider } from '@/lib/favorites';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
  title: locale.site.title,
  description: locale.site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <FavoritesProvider>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-30 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-3">
              <nav className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent-hover rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                    <Layers className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-100 group-hover:text-accent-light transition-colors">
                      {locale.nav.brand}
                    </span>
                    <span className="text-[10px] text-neutral-500 -mt-1">
                      {locale.nav.subtitle}
                    </span>
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <Link
                    href="/"
                    className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    {locale.nav.allItems}
                  </Link>
                  <Link
                    href="/base-items"
                    className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5" />
                    {locale.nav.baseItems}
                  </Link>
                  <Link
                    href="/favorites"
                    className="text-xs font-medium text-neutral-400 hover:text-neutral-200 transition-colors duration-200 flex items-center gap-1.5"
                  >
                    <Lollipop className="w-3.5 h-3.5" />
                    {locale.nav.favorites}
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-zinc-800/50 py-4 mt-12">
            <div className="container mx-auto px-4 text-center">
              <p className="text-[11px] text-neutral-500">
                {locale.footer.builtWith}
              </p>
            </div>
          </footer>
        </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
