'use client';

import Link from 'next/link';
import { Layers, Package } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const { locale } = useLanguage();

  return (
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
          <div className="flex items-center gap-4">
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
            </div>
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
