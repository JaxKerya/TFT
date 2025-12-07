'use client';

import { useLanguage } from '@/lib/language-context';

export function Footer() {
  const { locale } = useLanguage();

  return (
    <footer className="border-t border-zinc-800/50 py-4 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-[11px] text-neutral-500">
          {locale.footer.builtWith}
        </p>
      </div>
    </footer>
  );
}
