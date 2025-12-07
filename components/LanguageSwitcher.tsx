'use client';

import { useLanguage } from '@/lib/language-context';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-3.5 h-3.5 text-neutral-400" />
      <div className="flex items-center gap-1 bg-zinc-800/50 rounded-lg p-0.5">
        <button
          onClick={() => setLanguage('tr')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            language === 'tr'
              ? 'bg-accent text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          TR
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
            language === 'en'
              ? 'bg-accent text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
}
