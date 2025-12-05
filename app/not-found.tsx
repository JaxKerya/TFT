import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { locale } from '@/locales';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="relative">
        <div className="absolute inset-0 bg-accent/20 blur-3xl" />
        <Search className="relative w-20 h-20 text-accent/50" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-neutral-100">
          {locale.notFound.title}
        </h1>
        <p className="text-sm text-neutral-400 max-w-md">
          {locale.notFound.description}
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-glow-sm hover:shadow-glow"
      >
        <Home className="w-4 h-4" />
        {locale.notFound.backHome}
      </Link>
    </div>
  );
}
